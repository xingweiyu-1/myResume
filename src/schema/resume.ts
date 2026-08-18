// 默认简历 JSON（模板预设会提供完整 COMPONENTS，这里只给骨架 + 全局样式）
const RESUME_JSON: any = {
  ID: '',
  NAME: '',
  TITLE: '个人简历',
  LAYOUT: 'classical', // classical 单栏 / leftRight 左右双栏
  COMPONENTS: [],
  GLOBAL_STYLE: {
    themeColor: '#2b6cb0', // 主题色
    firstTitleFontSize: '20px', // 一级标题（模块标题）
    secondTitleFontSize: '14px', // 二级标题（条目标题）
    textFontSize: '14px', // 正文
    secondTitleColor: '#333333', // 二级标题颜色
    textFontColor: '#555555', // 正文颜色
    secondTitleWeight: 600,
    textFontWeight: 500,
    pTop: '0',
    pBottom: '0',
    pLeftRight: '40px', // 模块左右内边距
    modelMarginTop: '0px',
    modelMarginBottom: '36px',
    leftWidth: '200px', // 左右布局：左侧宽度
    rightWidth: '620px', // 左右布局：右侧宽度
    leftThemeColor: '#2b4a6f', // 左右布局：左侧背景色
    rightThemeColor: '#ffffff', // 左右布局：右侧背景色
  },
}

export default RESUME_JSON
