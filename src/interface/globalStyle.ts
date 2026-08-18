// 全局样式（主题）接口，对齐猫步简历 resume-design 的 GLOBAL_STYLE
interface IGlobalStyle {
  themeColor: string // 主题色
  firstTitleFontSize: string // 一级标题字号
  secondTitleFontSize: string // 二级标题字号
  textFontSize: string // 正文字号
  secondTitleColor: string // 二级标题字体颜色
  textFontColor: string // 正文字体颜色
  secondTitleWeight: number // 二级标题字体粗细
  textFontWeight: number // 正文字体粗细
  pTop: string // 页面上下内边距
  pBottom: string
  pLeftRight: string // 页面左右内边距
  modelMarginTop: string // 模块上边距
  modelMarginBottom: string // 模块下边距
  leftWidth: string // 左右布局：左侧宽度
  rightWidth: string // 左右布局：右侧宽度
  leftThemeColor: string // 左右布局：左侧背景色
  rightThemeColor: string // 左右布局：右侧背景色
}

export default IGlobalStyle
