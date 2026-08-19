// 一键下载 PDF（截图）：html2canvas + jspdf
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { ElMessage } from 'element-plus'
import { withExportMode } from './exportMode'
import { applyAvoidPageSplit, findSafeSplitY } from './paginateResume'

const isEditorChrome = (element: Element) => {
  const cls = element.classList
  return cls.contains('lines') || cls.contains('edit-box')
}

const A4_PT_WIDTH = 595.28
const A4_PT_HEIGHT = 841.89

const sliceCanvasPages = (canvas: HTMLCanvasElement): HTMLCanvasElement[] => {
  const pageCanvasHeight = (canvas.width / A4_PT_WIDTH) * A4_PT_HEIGHT
  const pages: HTMLCanvasElement[] = []
  let y = 0
  const searchRange = Math.max(16, Math.round(pageCanvasHeight * 0.03))

  while (y < canvas.height - 1) {
    const remain = canvas.height - y
    let sliceH = Math.min(pageCanvasHeight, remain)
    if (remain > pageCanvasHeight + 2) {
      const splitY = findSafeSplitY(canvas, y + pageCanvasHeight, searchRange)
      sliceH = Math.max(24, splitY - y)
    }
    const page = document.createElement('canvas')
    page.width = canvas.width
    page.height = Math.min(sliceH, remain)
    const ctx = page.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, page.width, page.height)
      ctx.drawImage(canvas, 0, y, canvas.width, page.height, 0, 0, canvas.width, page.height)
    }
    pages.push(page)
    y += page.height
  }
  return pages.length ? pages : [canvas]
}

export const exportPdfByImage = async (el: HTMLElement, pdfName: string) => {
  if (!el) {
    ElMessage.error('未找到简历内容')
    return
  }
  try {
    await withExportMode(async () => {
      const restoreSplit = applyAvoidPageSplit(el)
      try {
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          ignoreElements: isEditorChrome,
          onclone: (clonedDoc) => {
            clonedDoc.querySelectorAll('.lines, .edit-box').forEach((node) => node.remove())
            clonedDoc.querySelectorAll('.material-model-box, .mode-item').forEach((node) => {
              const html = node as HTMLElement
              html.style.borderColor = 'transparent'
              html.style.boxShadow = 'none'
            })
          },
        })

        const pages = sliceCanvasPages(canvas)
        const pdf = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
        pages.forEach((page, index) => {
          if (index > 0) pdf.addPage()
          const imgHeight = (page.height / page.width) * A4_PT_WIDTH
          pdf.addImage(page.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, A4_PT_WIDTH, imgHeight)
        })
        pdf.save(`${pdfName}.pdf`)
      } finally {
        restoreSplit()
      }
    })
  } catch (e) {
    console.error('导出 PDF 失败', e)
    ElMessage.error('导出 PDF 失败，请重试')
  }
}
