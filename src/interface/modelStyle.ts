// 模块级样式接口（对齐猫步简历 resume-design 的 IMODELSTYLE）
interface IMODELSTYLE {
  themeColor: string // 主题色
  firstTitleFontSize: string // 一级标题
  textColor: string
  textFontSize: string
  textFontWeight: number
  titleColor: string
  titleFontSize: string
  titleFontWeight: number
  backgroundColor: string
  pLeftRight: string // 左右内边距
  pTop: string // 上内边距
  pBottom: string // 下内边距
  mBottom: string
  mTop: string
}

export default IMODELSTYLE
