import { beginExportMode, endExportMode } from './exportMode'
import { applyAvoidPageSplit } from './paginateResume'

// PDF 打印导出：调用浏览器打印对话框，由 @media print 样式渲染高质量矢量 PDF
export const exportPdfByPrint = (title: string) => {
  const prevTitle = document.title
  document.title = title || '简历'
  beginExportMode()

  const root = document.querySelector<HTMLElement>('.design-content')
  const restoreSplit = root ? applyAvoidPageSplit(root) : () => {}

  let restored = false
  const restore = () => {
    if (restored) return
    restored = true
    restoreSplit()
    endExportMode()
    document.title = prevTitle
    window.removeEventListener('afterprint', restore)
  }
  window.addEventListener('afterprint', restore)

  requestAnimationFrame(() => {
    window.print()
    if (!('onafterprint' in window)) restore()
  })
}
