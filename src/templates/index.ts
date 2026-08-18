// 本地模板注册表：模板 = LAYOUT + GLOBAL_STYLE + COMPONENTS 预设
// COMPONENTS 由 materialList 的默认样式 + modelData 的默认数据组合而成
import { cloneDeep } from 'lodash'
import MODEL_DATA_JSON from '@/schema/modelData'
import { MATERIAL_JSON } from '@/schema/materialList'
import { getUuid } from '@/utils/common'

// 构建一个模块组件项
const comp = (model: string, cptName: string, layout: string = 'center'): any => {
  const m =
    MATERIAL_JSON[model]?.find((i: any) => i.cptName === cptName) || MATERIAL_JSON[model]?.[0]
  const data = cloneDeep(MODEL_DATA_JSON[model] || { model, title: model })
  return { ...cloneDeep(m), keyId: getUuid(), data, layout }
}

// 深色侧边栏：把左侧模块的文字调成浅色，保证可读
const lightText = (item: any) => {
  if (!item.style) item.style = {}
  item.style.titleColor = '#ffffff'
  item.style.textColor = '#e2e8f0'
  item.style.themeColor = '#ffffff'
  item.style.backgroundColor = 'transparent'
  return item
}

// 默认全局样式（可被各模板覆盖）
const baseStyle: any = {
  themeColor: '#2b6cb0',
  firstTitleFontSize: '20px',
  secondTitleFontSize: '14px',
  textFontSize: '14px',
  secondTitleColor: '#333333',
  textFontColor: '#555555',
  secondTitleWeight: 600,
  textFontWeight: 500,
  pTop: '0',
  pBottom: '0',
  pLeftRight: '40px',
  modelMarginTop: '0px',
  modelMarginBottom: '36px',
  leftWidth: '210px',
  rightWidth: '610px',
  leftThemeColor: '#eef3f8',
  rightThemeColor: '#ffffff',
}

export interface ITemplate {
  ID: string
  NAME: string
  TITLE: string
  LAYOUT: string
  GLOBAL_STYLE: any
  COMPONENTS: any[]
}

export const TEMPLATES: ITemplate[] = [
  // ========== 1. 经典商务蓝（单栏） ==========
  {
    ID: 'classic-blue',
    NAME: '经典商务蓝',
    TITLE: '个人简历',
    LAYOUT: 'classical',
    GLOBAL_STYLE: { ...baseStyle, themeColor: '#2b6cb0', pLeftRight: '40px' },
    COMPONENTS: [
      comp('RESUME_TITLE', 'RESUME_TITLE_1'),
      comp('BASE_INFO', 'BASE_INFO_1'),
      comp('JOB_INTENTION', 'JOB_INTENTION_1'),
      comp('EDU_BACKGROUND', 'EDU_BACKGROUND_1'),
      comp('WORK_EXPERIENCE', 'WORK_EXPERIENCE_1'),
      comp('PROJECT_EXPERIENCE', 'PROJECT_EXPERIENCE_1'),
      comp('SKILL_SPECIALTIES', 'SKILL_SPECIALTIES_1'),
      comp('AWARDS', 'AWARDS_1'),
      comp('SELF_EVALUATION', 'SELF_EVALUATION_1'),
    ],
  },
  // ========== 2. 现代双栏（浅色侧边） ==========
  {
    ID: 'modern-split',
    NAME: '现代双栏',
    TITLE: '个人简历',
    LAYOUT: 'leftRight',
    GLOBAL_STYLE: {
      ...baseStyle,
      themeColor: '#0ea5a4',
      leftThemeColor: '#eef3f8',
      leftWidth: '230px',
      rightWidth: '590px',
      pLeftRight: '28px',
    },
    COMPONENTS: [
      comp('BASE_INFO', 'BASE_INFO_3', 'left'),
      comp('SKILL_SPECIALTIES', 'SKILL_SPECIALTIES_2', 'left'),
      comp('HOBBIES', 'HOBBIES_1', 'left'),
      comp('SELF_EVALUATION', 'SELF_EVALUATION_1', 'left'),
      comp('JOB_INTENTION', 'JOB_INTENTION_1', 'right'),
      comp('EDU_BACKGROUND', 'EDU_BACKGROUND_2', 'right'),
      comp('WORK_EXPERIENCE', 'WORK_EXPERIENCE_2', 'right'),
      comp('PROJECT_EXPERIENCE', 'PROJECT_EXPERIENCE_2', 'right'),
      comp('AWARDS', 'AWARDS_1', 'right'),
    ],
  },
  // ========== 3. 简约清新绿（单栏） ==========
  {
    ID: 'fresh-green',
    NAME: '简约清新绿',
    TITLE: '个人简历',
    LAYOUT: 'classical',
    GLOBAL_STYLE: { ...baseStyle, themeColor: '#3d9e6f', pLeftRight: '44px' },
    COMPONENTS: [
      comp('RESUME_TITLE', 'RESUME_TITLE_1'),
      comp('BASE_INFO', 'BASE_INFO_2'),
      comp('JOB_INTENTION', 'JOB_INTENTION_2'),
      comp('EDU_BACKGROUND', 'EDU_BACKGROUND_2'),
      comp('WORK_EXPERIENCE', 'WORK_EXPERIENCE_2'),
      comp('PROJECT_EXPERIENCE', 'PROJECT_EXPERIENCE_2'),
      comp('SKILL_SPECIALTIES', 'SKILL_SPECIALTIES_2'),
      comp('HOBBIES', 'HOBBIES_1'),
    ],
  },
  // ========== 4. 深色侧边商务风（双栏） ==========
  {
    ID: 'dark-sidebar',
    NAME: '深色侧边商务',
    TITLE: '个人简历',
    LAYOUT: 'leftRight',
    GLOBAL_STYLE: {
      ...baseStyle,
      themeColor: '#c9a227',
      leftThemeColor: '#2f4156',
      leftWidth: '230px',
      rightWidth: '590px',
      pLeftRight: '26px',
    },
    COMPONENTS: [
      lightText(comp('BASE_INFO', 'BASE_INFO_4', 'left')),
      lightText(comp('SKILL_SPECIALTIES', 'SKILL_SPECIALTIES_3', 'left')),
      lightText(comp('HOBBIES', 'HOBBIES_1', 'left')),
      lightText(comp('SELF_EVALUATION', 'SELF_EVALUATION_1', 'left')),
      comp('JOB_INTENTION', 'JOB_INTENTION_3', 'right'),
      comp('EDU_BACKGROUND', 'EDU_BACKGROUND_3', 'right'),
      comp('WORK_EXPERIENCE', 'WORK_EXPERIENCE_3', 'right'),
      comp('PROJECT_EXPERIENCE', 'PROJECT_EXPERIENCE_3', 'right'),
      comp('AWARDS', 'AWARDS_2', 'right'),
    ],
  },
  // ========== 5. 暖橙活力（单栏） ==========
  {
    ID: 'warm-orange',
    NAME: '暖橙活力',
    TITLE: '个人简历',
    LAYOUT: 'classical',
    GLOBAL_STYLE: { ...baseStyle, themeColor: '#e67e22', pLeftRight: '42px' },
    COMPONENTS: [
      comp('RESUME_TITLE', 'RESUME_TITLE_1'),
      comp('BASE_INFO', 'BASE_INFO_5'),
      comp('JOB_INTENTION', 'JOB_INTENTION_4'),
      comp('EDU_BACKGROUND', 'EDU_BACKGROUND_4'),
      comp('WORK_EXPERIENCE', 'WORK_EXPERIENCE_4'),
      comp('PROJECT_EXPERIENCE', 'PROJECT_EXPERIENCE_4'),
      comp('SKILL_SPECIALTIES', 'SKILL_SPECIALTIES_4'),
      comp('SELF_EVALUATION', 'SELF_EVALUATION_2'),
    ],
  },
  // ========== 6. 极简高级灰（单栏） ==========
  {
    ID: 'minimal-gray',
    NAME: '极简高级灰',
    TITLE: '个人简历',
    LAYOUT: 'classical',
    GLOBAL_STYLE: { ...baseStyle, themeColor: '#4a5568', pLeftRight: '46px' },
    COMPONENTS: [
      comp('RESUME_TITLE', 'RESUME_TITLE_1'),
      comp('BASE_INFO', 'BASE_INFO_6'),
      comp('JOB_INTENTION', 'JOB_INTENTION_5'),
      comp('EDU_BACKGROUND', 'EDU_BACKGROUND_5'),
      comp('WORK_EXPERIENCE', 'WORK_EXPERIENCE_5'),
      comp('PROJECT_EXPERIENCE', 'PROJECT_EXPERIENCE_5'),
      comp('SKILL_SPECIALTIES', 'SKILL_SPECIALTIES_5'),
      comp('AWARDS', 'AWARDS_3'),
      comp('HOBBIES', 'HOBBIES_2'),
      comp('SELF_EVALUATION', 'SELF_EVALUATION_3'),
    ],
  },
]

export const getTemplateById = (id?: string): ITemplate => {
  return TEMPLATES.find((t) => t.ID === id) || TEMPLATES[0]
}
