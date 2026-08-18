// 素材（模块）项接口，对齐猫步简历 resume-design 的 IMATERIALITEM
interface IMATERIALITEM {
  keyId: string
  model: string // 模块类型，如 BASE_INFO / WORK_EXPERIENCE
  cptName: string // 渲染组件名
  cptOptionsName: string // 属性设置面板组件名
  cptTitle: string // 展示标题
  cptX: number
  cptY: number
  cptZ: number
  cptHeight: string
  cptWidth: string
  layout: string // leftRight 布局时在左还是右
  show: boolean // 是否显示
  style: any
  data: any // 模块数据（对应 schema/modelData 里的结构）
}

// 物料左侧列表：按模块类型分组的可选素材
interface IMSTERIALLISTJSON {
  [propName: string]: Array<IMATERIALITEM>
}

export type { IMSTERIALLISTJSON, IMATERIALITEM }
