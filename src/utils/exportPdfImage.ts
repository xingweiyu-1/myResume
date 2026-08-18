// 一键下载 PDF（截图）：html2canvas + jspdf，与猫步简历同方案
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { ElMessage } from 'element-plus'

export const exportPdfByImage = async (el: HTMLElement, pdfName: string) => {
  if (!el) {
    ElMessage.error('未找到简历内容')
    return
  }
  try {
    const canvas = await html2canvas(el, {
      scale: 2, // 高清
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    })

    const contentWidth = canvas.width
    const contentHeight = canvas.height
    // A4 尺寸（pt）
    const pageWidth = 595.28
    const pageHeight = 841.89
    // 一页 PDF 能放下的 canvas 高度
    const pageCanvasHeight = (contentWidth / pageWidth) * pageHeight
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = pageWidth
    const imgHeight = (pageWidth / contentWidth) * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 0.95)

    const pdf = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
    if (leftHeight < pageCanvasHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageCanvasHeight
        position -= pageHeight
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.save(`${pdfName}.pdf`)
  } catch (e) {
    console.error('导出 PDF 失败', e)
    ElMessage.error('导出 PDF 失败，请重试')
  }
}
