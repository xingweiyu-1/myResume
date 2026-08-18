// 简历 JSON 顶层结构，对齐猫步简历 resume-design 的 IRESUMEJSON
interface IRESUMEJSON {
  ID: string // 模板 id
  NAME: string // 模板名
  TITLE: string // 简历标题
  LAYOUT: string // 布局：classical 单栏 / leftRight 左右双栏 / custom 自定义导入
  COMPONENTS: Array<any> // 模块组件列表
  GLOBAL_STYLE: any // 全局样式
}

export default IRESUMEJSON
