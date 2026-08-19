/** 导出时给 body 加上该类，隐藏分页参考线、模块选中框等编辑辅助 UI */
export const EXPORTING_CLASS = 'is-exporting'

export const beginExportMode = () => {
  document.body.classList.add(EXPORTING_CLASS)
}

export const endExportMode = () => {
  document.body.classList.remove(EXPORTING_CLASS)
}

/** 进入导出模式 → 等一帧让样式生效 → 执行导出 → 恢复 */
export const withExportMode = async <T>(fn: () => Promise<T> | T): Promise<T> => {
  beginExportMode()
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
  try {
    return await fn()
  } finally {
    endExportMode()
  }
}
