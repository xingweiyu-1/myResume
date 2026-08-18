// 各模块的默认数据（占位示例，用户在编辑器里替换为自己的真实信息）
// 结构对齐猫步简历 resume-design 的 MODEL_DATA_JSON

const MODEL_DATA_JSON: any = {
  RESUME_TITLE: {
    iconfont: 'icon-biaoti',
    model: 'RESUME_TITLE',
    show: true,
    title: '个人简历',
  },
  BASE_INFO: {
    iconfont: 'icon-jibenziliao',
    model: 'BASE_INFO',
    show: true,
    title: '基本资料',
    name: '张伟',
    age: 26,
    address: '广东深圳',
    avatar: '',
    workService: 4,
    phoneNumber: '138 0000 0000',
    email: 'zhangwei@example.com',
    abstract: '前端开发工程师，4 年 Web 开发经验，专注性能优化与工程化建设。',
    degree: '本科',
    isShow: {
      age: true,
      address: true,
      avatar: true,
      workService: true,
      phoneNumber: true,
      email: true,
      abstract: true,
      degree: true,
    },
  },
  JOB_INTENTION: {
    iconfont: 'icon-yixianggangwei',
    model: 'JOB_INTENTION',
    show: true,
    title: '求职意向',
    intendedPositions: '前端开发工程师',
    intendedCity: '深圳',
    expectSalary: '15K-20K',
    jobStatus: '在职，月内到岗',
    jobSearchType: '全职',
    isShow: {
      intendedPositions: true,
      intendedCity: true,
      expectSalary: true,
      jobStatus: true,
      jobSearchType: true,
    },
  },
  EDU_BACKGROUND: {
    iconfont: 'icon-education-1-copy',
    model: 'EDU_BACKGROUND',
    show: true,
    title: '教育背景',
    LIST: [
      {
        date: ['2018-09', '2022-06'],
        schoolName: '华南理工大学',
        specialized: '软件工程',
        degree: '本科',
        majorCourse: '数据结构、操作系统、计算机网络、数据库原理',
      },
    ],
    isShow: {
      date: true,
      schoolName: true,
      specialized: true,
      degree: true,
      majorCourse: true,
    },
  },
  SKILL_SPECIALTIES: {
    iconfont: 'icon-zhuanyezhishijineng',
    model: 'SKILL_SPECIALTIES',
    show: true,
    title: '技能特长',
    LIST: [
      {
        skillName: 'Vue / React',
        proficiency: '精通',
        introduce: '熟练使用 Vue3 / React 及其生态，主导过多个大型项目前端架构。',
      },
      {
        skillName: 'TypeScript',
        proficiency: '熟练',
        introduce: '在项目中全面使用 TS，编写类型安全的业务代码与公共库。',
      },
      {
        skillName: '工程化',
        proficiency: '熟练',
        introduce: '掌握 Vite / Webpack、CI/CD、代码规范与自动化测试落地。',
      },
      {
        skillName: 'Node.js',
        proficiency: '了解',
        introduce: '能开发 CLI 工具与简单服务端接口，熟悉中间层 BFF 实践。',
      },
    ],
  },
  CAMPUS_EXPERIENCE: {
    iconfont: 'icon-jiatimianban_timu',
    model: 'CAMPUS_EXPERIENCE',
    show: true,
    title: '校园经历',
    LIST: [
      {
        date: ['2019-09', '2021-06'],
        campusBriefly: '校计算机协会 · 技术部部长',
        campusDuty: '组织校内技术分享会',
        campusContent: '统筹 8 场技术讲座，累计参与 500+ 人次；维护社团公众号与官网。',
      },
    ],
    isShow: {
      date: true,
      campusBriefly: true,
      campusDuty: true,
      campusContent: true,
    },
  },
  INTERNSHIP_EXPERIENCE: {
    iconfont: 'icon-biyeshixi',
    model: 'INTERNSHIP_EXPERIENCE',
    show: true,
    title: '实习经历',
    LIST: [
      {
        date: ['2021-07', '2021-12'],
        companyName: '某某科技有限公司',
        posts: '前端开发实习生',
        jobContent: [
          { content: '参与公司官网与后台管理系统的前端开发，负责 3 个核心页面实现。' },
          { content: '使用 Vue3 + TypeScript 重构了数据可视化模块，首屏加载时间降低 40%。' },
        ],
      },
    ],
    isShow: {
      date: true,
      companyName: true,
      posts: true,
      jobContent: true,
    },
  },
  WORK_EXPERIENCE: {
    iconfont: 'icon-gongzuojingyan',
    model: 'WORK_EXPERIENCE',
    show: true,
    title: '工作经历',
    LIST: [
      {
        date: ['2023-03', '至今'],
        companyName: '某某互联网科技有限公司',
        posts: '前端开发工程师',
        jobContent: [
          { content: '负责核心业务中台系统的前端架构与开发，主导微前端拆分，服务 20+ 条业务线。' },
          { content: '建立统一组件库与工程化规范，发布 npm 包 6 个，团队开发效率提升约 30%。' },
          { content: '推动 Web 性能优化专项，核心页面 LCP 从 3.2s 优化至 1.5s。' },
        ],
      },
      {
        date: ['2022-02', '2023-02'],
        companyName: '某某信息技术有限公司',
        posts: '前端开发工程师',
        jobContent: [
          { content: '负责电商小程序与 H5 商城开发，日活峰值 10w+，参与秒杀大促活动保障。' },
          { content: '设计并实现埋点上报 SDK，为运营活动提供数据支撑。' },
        ],
      },
    ],
    isShow: {
      date: true,
      companyName: true,
      posts: true,
    },
  },
  PROJECT_EXPERIENCE: {
    iconfont: 'icon-xiangmu',
    model: 'PROJECT_EXPERIENCE',
    show: true,
    title: '项目经历',
    LIST: [
      {
        date: ['2024-01', '至今'],
        projectName: '数据中台可视化平台',
        posts: '前端负责人',
        projectContent: [
          { content: '负责平台整体前端架构设计，采用 Vue3 + Vite + TypeScript，落地微前端子应用 5 个。' },
          { content: '封装通用图表组件与主题系统，接入 ECharts / AntV，覆盖 30+ 可视化场景。' },
        ],
      },
      {
        date: ['2023-04', '2023-10'],
        projectName: '企业级低代码平台',
        posts: '核心开发',
        projectContent: [
          { content: '参与表单渲染引擎与页面设计器开发，支持拖拽式生成业务表单，交付效率提升 50%。' },
          { content: '实现 JSON Schema 驱动的动态表单与校验体系，沉淀 20+ 通用组件。' },
        ],
      },
    ],
    isShow: {
      date: true,
      projectName: true,
      posts: true,
    },
  },
  AWARDS: {
    iconfont: 'icon-rongyu1',
    model: 'AWARDS',
    show: true,
    title: '荣誉奖项',
    LIST: [
      {
        date: '2023-12',
        awardsName: '公司年度优秀员工',
        awardsGrade: '年度',
      },
      {
        date: '2022-06',
        awardsName: '优秀毕业论文',
        awardsGrade: '校级',
      },
    ],
    isShow: {
      date: true,
      awardsName: true,
      awardsGrade: true,
    },
  },
  HOBBIES: {
    iconfont: 'icon-xingquaihao',
    model: 'HOBBIES',
    show: true,
    title: '兴趣爱好',
    content: '阅读 · 摄影 · 篮球 · 开源社区贡献',
    style: {
      textColor: '#555555',
      textFontSize: '14px',
      textFontWeight: 500,
      mBottom: '0px',
      mTop: '0px',
    },
  },
  SELF_EVALUATION: {
    iconfont: 'icon-ziwopingjia',
    model: 'SELF_EVALUATION',
    show: true,
    title: '自我评价',
    content:
      '5 年 Web 前端开发经验，具备扎实的工程化与性能优化能力，擅长推动复杂项目落地；有良好的代码习惯与文档意识，乐于技术分享，能高效与产品、设计、后端协作。',
  },
  WORKS_DISPLAY: {
    iconfont: 'icon-zhuanyezhishijineng',
    model: 'WORKS_DISPLAY',
    show: true,
    title: '作品展示',
    LIST: [
      {
        worksName: '个人技术博客',
        worksLink: 'https://blog.example.com',
        worksIntroduce: '记录前端工程化与性能优化实践，月访问 5w+。',
      },
    ],
  },
  CUSTOM: {
    iconfont: 'icon-jibenziliao',
    model: 'CUSTOM',
    show: true,
    title: '自定义模块',
    name: '开源贡献',
    abstract: '活跃于开源社区，参与维护若干工具库，累计获得 200+ Star。',
    isShow: {
      abstract: true,
      name: true,
    },
  },
}

export default MODEL_DATA_JSON
