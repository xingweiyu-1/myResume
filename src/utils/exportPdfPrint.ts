// PDF 打印导出：调用浏览器打印对话框，由 @media print 样式渲染高质量矢量 PDF
export const exportPdfByPrint = (title: string) => {
  document.title = title || '简历'
  // 交给打印样式渲染；异步延时确保界面状态稳定
  setTimeout(() => {
    window.print()
  }, 50)
}
