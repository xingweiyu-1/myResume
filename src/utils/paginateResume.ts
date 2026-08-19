/** 预览稿宽度 820px，按 A4 比例对应一页高度 */
export const A4_WIDTH_PX = 820
export const A4_HEIGHT_PX = Math.round((820 * 297) / 210) // 1160

const relativeTop = (root: HTMLElement, el: HTMLElement) => {
  const rootRect = root.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return elRect.top - rootRect.top
}

/**
 * 导出前把会跨页的模块整体推到下一页，避免文字从中间被切开。
 * 返回恢复函数，导出结束后必须调用。
 */
export const applyAvoidPageSplit = (root: HTMLElement, pageHeight = A4_HEIGHT_PX): (() => void) => {
  const modules = Array.from(root.querySelectorAll<HTMLElement>('.material-model-box'))
  const prevMargin = modules.map((el) => ({ el, marginTop: el.style.marginTop }))
  const prevHeight = root.style.height
  root.style.height = 'auto'

  modules.forEach((el) => {
    el.style.marginTop = '0px'
  })

  modules.forEach((el) => {
    const height = el.offsetHeight
    if (height <= 0 || height >= pageHeight - 4) return
    const top = relativeTop(root, el)
    if (top < 0) return
    const offsetInPage = top % pageHeight
    const spaceLeft = pageHeight - offsetInPage
    if (height > spaceLeft) {
      el.style.marginTop = `${spaceLeft}px`
    }
  })

  return () => {
    prevMargin.forEach(({ el, marginTop }) => {
      el.style.marginTop = marginTop
    })
    root.style.height = prevHeight
  }
}

/** 在切片位置附近找一行尽量空白的像素，避免从汉字中间切开 */
export const findSafeSplitY = (
  canvas: HTMLCanvasElement,
  approxY: number,
  searchRange: number
): number => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return Math.round(approxY)
  const maxY = canvas.height
  const y0 = Math.round(Math.max(1, approxY - searchRange))
  const y1 = Math.round(Math.min(maxY - 1, approxY + searchRange))
  let bestY = Math.round(Math.min(maxY, Math.max(1, approxY)))
  let bestInk = Number.POSITIVE_INFINITY
  const { width } = canvas

  for (let y = y0; y <= y1; y++) {
    const data = ctx.getImageData(0, y, width, 1).data
    let ink = 0
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) ink++
    }
    if (ink < bestInk) {
      bestInk = ink
      bestY = y
      if (ink === 0) break
    }
  }
  return bestY
}
