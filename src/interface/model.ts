// 模块数据接口定义（对齐猫步简历 resume-design 的 JSON 结构，MIT 许可）
// 出处：https://github.com/Hacker233/resume-design

/** 样式接口 */
interface ISTYLE {
  height?: string
  width?: string
  titleColor?: string
  textColor?: string
  titleFontSize?: string
  textFontSize?: string
  titleFontWeight?: number
  textFontWeight?: number
  backgroundColor?: string
  align?: string
  mTop?: string
  mRight?: string
  mLeft?: string
  mBottom?: string
  pTop?: string
  pRight?: string
  pLeft?: string
  pBottom?: string
}

/** 简历标题 */
interface IRESUMETITLE {
  model: string
  show: boolean
  title: string
  [propName: string]: any
}

/** 基本资料 */
interface IBASEINFO {
  iconfont: string
  model: string
  show: boolean
  title: string
  name: string
  age: number
  address: string // 所在地址
  avatar: string // 头像地址
  workService: number // 工作年限
  phoneNumber: string // 联系电话
  email: string // 邮箱
  abstract: string // 简介
  degree: string
  isShow: {
    age: boolean
    address: boolean
    avatar: boolean
    workService: boolean
    phoneNumber: boolean
    email: boolean
    abstract: boolean
    degree: boolean
  }
  [propName: string]: any
}

/** 求职意向 */
interface IJOBINTENTION {
  iconfont: string
  model: string
  show: boolean
  title: string
  intendedPositions: string // 意向岗位
  intendedCity: string // 意向城市
  expectSalary: string // 期望薪资
  jobStatus: string // 求职状态
  jobSearchType: string // 求职类型
  isShow: {
    intendedPositions: boolean
    intendedCity: boolean
    expectSalary: boolean
    jobStatus: boolean
    jobSearchType: boolean
  }
  [propName: string]: any
}

/** 教育背景 */
interface IEDUBACKGROUND {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    date: Array<string>
    schoolName: string // 学校名称
    specialized: string // 专业
    degree: string // 学历
    majorCourse: string // 主修课程
  }>
  isShow: {
    date: boolean
    schoolName: boolean
    specialized: boolean
    degree: boolean
    majorCourse: boolean
  }
  [propName: string]: any
}

/** 技能特长 */
interface ISKILLSPECIALTIES {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    skillName: string // 技能名称
    proficiency: string // 熟练度
    introduce: string // 介绍
  }>
  [propName: string]: any
}

/** 校园经历 */
interface ICAMPUSEXPERIENCE {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    date: Array<string> // 经历时间
    campusBriefly: string
    campusDuty: string
    campusContent: string
  }>
  isShow: {
    date: boolean
    campusBriefly: boolean
    campusDuty: boolean
    campusContent: boolean
  }
  [propName: string]: any
}

/** 实习经验 */
interface IINTERNSHIPEXPERIENCE {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    date: Array<string> // 实习时间
    companyName: string // 公司名称
    posts: string // 职位
    jobContent: Array<{ content: string }>
  }>
  isShow: {
    date: boolean
    companyName: boolean
    posts: boolean
    jobContent: boolean
  }
  [propName: string]: any
}

/** 工作经验 */
interface IWORKEXPERIENCE {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    date: Array<string> // 工作时间
    companyName: string // 公司名称
    posts: string // 职位
    jobContent: Array<{ content: string }>
  }>
  isShow: {
    date: boolean
    companyName: boolean
    posts: boolean
  }
  [propName: string]: any
}

/** 项目经验 */
interface IPROJECTEXPERIENCE {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    date: Array<string> // 项目时间
    projectName: string // 项目名称
    posts: string // 项目职责
    projectContent: Array<{ content: string }>
  }>
  isShow: {
    date: boolean
    projectName: boolean
    posts: boolean
  }
  [propName: string]: any
}

/** 所获奖项 */
interface IAWARDS {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    date: string // 获奖时间
    awardsName: string
    awardsGrade: string
  }>
  isShow: {
    date: boolean
    awardsName: boolean
    awardsGrade: boolean
  }
  [propName: string]: any
}

/** 兴趣爱好 */
interface IHOBBIES {
  iconfont: string
  model: string
  show: boolean
  title: string
  content: string
  style?: ISTYLE
  [propName: string]: any
}

/** 自我评价 */
interface ISELFEVALUATION {
  iconfont: string
  model: string
  show: boolean
  title: string
  content: string
  [propName: string]: any
}

/** 作品展示 */
interface IWORKSDISPLAY {
  iconfont: string
  model: string
  show: boolean
  title: string
  LIST: Array<{
    worksName: string
    worksLink: string
    worksIntroduce: string
  }>
  [propName: string]: any
}

/** 自定义模块 */
interface ICUSTOM {
  iconfont: string
  model: string
  show: boolean
  title: string
  name: string
  abstract: string
  [propName: string]: any
}

/** 自定义模块（兼容猫步简历的 CUSTOM_1 / CUSTOM_2 类型名） */
type ICUSTOM1 = ICUSTOM
type ICUSTOM2 = ICUSTOM

export type {
  ISTYLE,
  IRESUMETITLE,
  IBASEINFO,
  IJOBINTENTION,
  IEDUBACKGROUND,
  ISKILLSPECIALTIES,
  ICAMPUSEXPERIENCE,
  IWORKEXPERIENCE,
  IPROJECTEXPERIENCE,
  IINTERNSHIPEXPERIENCE,
  IAWARDS,
  IHOBBIES,
  ISELFEVALUATION,
  IWORKSDISPLAY,
  ICUSTOM,
  ICUSTOM1,
  ICUSTOM2,
}
