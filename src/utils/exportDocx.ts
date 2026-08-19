// Word 导出：把简历 JSON 映射为真正的 .docx（docx.js），可二次编辑
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx'
import { saveAs } from 'file-saver'
import { formatDate } from './common'

const FONT = 'Microsoft YaHei' // 微软雅黑，中文友好

const txt = (text: string, opts: any = {}) =>
  new TextRun({
    text,
    font: FONT,
    size: opts.size || 21, // 半磅：21 = 10.5pt
    bold: !!opts.bold,
    color: opts.color || '#333333',
  })

// 模块标题（如"工作经历"）
const sectionTitle = (text: string, themeColor: string) =>
  new Paragraph({
    spacing: { before: 240, after: 120 },
    keepNext: true,
    keepLines: true,
    children: [
      txt(text, { size: 28, bold: true, color: themeColor || '#000000' }), // 14pt
    ],
  })

// 一条经历的标题行：左标题 + 右日期
const entryTitle = (title: string, date: string, themeColor: string) =>
  new Paragraph({
    spacing: { before: 120, after: 60 },
    keepNext: true,
    keepLines: true,
    children: [
      txt(title, { size: 24, bold: true, color: '#222222' }), // 12pt
      ...(date
        ? [
            new TextRun({
              text: `    ${date}`,
              font: FONT,
              size: 21,
              color: '#888888',
            }),
          ]
        : []),
    ],
  })

// 正文行 / 列表项
const bodyLine = (text: string, indent = false) =>
  new Paragraph({
    spacing: { after: 40 },
    keepLines: true,
    children: [txt(text)],
    bullet: indent ? { level: 0 } : undefined,
  })

const pushLines = (children: any[], text: string, indent = false) => {
  String(text || '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => children.push(bodyLine(line, indent)))
}

// 基本信息
function buildBaseInfo(children: any[], d: any, gs: any) {
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [txt(d.name || '姓名', { size: 44, bold: true, color: '#111111' })], // 22pt
    })
  )
  if (d.isShow?.abstract && d.abstract) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [txt(d.abstract, { size: 22, color: '#666666' })],
      })
    )
  }
  // 联系方式一行
  const infos: string[] = []
  if (d.isShow?.phoneNumber && d.phoneNumber) infos.push(d.phoneNumber)
  if (d.isShow?.email && d.email) infos.push(d.email)
  if (d.isShow?.address && d.address) infos.push(d.address)
  if (d.isShow?.age) infos.push(`${d.age}岁`)
  if (d.isShow?.workService) infos.push(`${d.workService}年经验`)
  if (infos.length) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [txt(infos.join('  |  '), { size: 21, color: '#555555' })],
      })
    )
  }
}

// 求职意向
function buildJobIntention(children: any[], d: any) {
  children.push(sectionTitle(d.title || '求职意向', ''))
  const parts: string[] = []
  if (d.isShow?.intendedPositions && d.intendedPositions) parts.push(`意向岗位：${d.intendedPositions}`)
  if (d.isShow?.intendedCity && d.intendedCity) parts.push(`意向城市：${d.intendedCity}`)
  if (d.isShow?.expectSalary && d.expectSalary) parts.push(`期望薪资：${d.expectSalary}`)
  if (d.isShow?.jobStatus && d.jobStatus) parts.push(`求职状态：${d.jobStatus}`)
  if (d.isShow?.jobSearchType && d.jobSearchType) parts.push(`求职类型：${d.jobSearchType}`)
  children.push(bodyLine(parts.join('　')))
}

// 教育背景
function buildEdu(children: any[], d: any) {
  children.push(sectionTitle(d.title || '教育背景', ''))
  d.LIST?.forEach((item: any) => {
    children.push(
      entryTitle(
        `${item.schoolName || ''}${item.specialized ? ' · ' + item.specialized : ''}${
          item.degree ? '（' + item.degree + '）' : ''
        }`,
        formatDate(item.date),
        ''
      )
    )
    if (d.isShow?.majorCourse && item.majorCourse) children.push(bodyLine(`主修课程：${item.majorCourse}`))
  })
}

// 技能特长
function buildSkill(children: any[], d: any) {
  children.push(sectionTitle(d.title || '技能特长', ''))
  d.LIST?.forEach((item: any) => {
    let line = item.skillName || ''
    if (item.proficiency) line += `（${item.proficiency}）`
    if (item.introduce) line += `：${item.introduce}`
    children.push(bodyLine(line, true))
  })
}

// 经历类：工作 / 项目 / 实习 / 校园
function buildExperience(children: any[], d: any, type: string, gs: any) {
  children.push(sectionTitle(d.title || type, gs.themeColor))
  const contentKey =
    type === '项目经历' ? 'projectContent' : type === '校园经历' ? 'campusContent' : 'jobContent'
  d.LIST?.forEach((item: any) => {
    const titleParts: string[] = []
    if (type === '项目经历') {
      if (item.projectName) titleParts.push(item.projectName)
      if (item.posts) titleParts.push(`｜${item.posts}`)
    } else {
      if (item.companyName) titleParts.push(item.companyName)
      if (item.posts) titleParts.push(`｜${item.posts}`)
    }
    children.push(entryTitle(titleParts.join(''), formatDate(item.date), gs.themeColor))
    // 校园经历是单字段描述
    if (type === '校园经历') {
      if (d.isShow?.campusDuty && item.campusDuty) pushLines(children, `职责：${item.campusDuty}`)
      if (d.isShow?.campusContent && item.campusContent) pushLines(children, item.campusContent)
    } else {
      const contentArr =
        type === '项目经历' ? item.projectContent : type === '实习经历' ? item.jobContent : item.jobContent
      contentArr?.forEach((c: any) => {
        if (c.content) pushLines(children, c.content, true)
      })
    }
  })
}

// 荣誉奖项
function buildAwards(children: any[], d: any) {
  children.push(sectionTitle(d.title || '荣誉奖项', ''))
  d.LIST?.forEach((item: any) => {
    const line = [item.awardsName, item.awardsGrade, item.date].filter(Boolean).join('　')
    children.push(bodyLine(line, true))
  })
}

// 简单文本模块：自我评价 / 兴趣爱好 / 自定义
function buildSimple(children: any[], d: any, defaultTitle: string) {
  children.push(sectionTitle(d.title || defaultTitle, ''))
  if (d.content) pushLines(children, d.content)
}

function buildCustom(children: any[], d: any) {
  children.push(sectionTitle(d.title || '自定义模块', ''))
  if (d.name) pushLines(children, d.name, true)
  if (d.abstract) pushLines(children, d.abstract, true)
}

// 作品展示
function buildWorks(children: any[], d: any) {
  children.push(sectionTitle(d.title || '作品展示', ''))
  d.LIST?.forEach((item: any) => {
    let line = item.worksName || ''
    if (item.worksLink) line += `（${item.worksLink}）`
    if (item.worksIntroduce) line += `：${item.worksIntroduce}`
    children.push(bodyLine(line, true))
  })
}

/** 导出 .docx（从 JSON 生成，不含编辑器分页参考线） */
export const exportDocx = async (resume: any) => {
  const gs = resume.GLOBAL_STYLE || {}
  const children: any[] = []

  for (const comp of resume.COMPONENTS || []) {
    if (comp.show === false) continue
    const d = comp.data || {}
    switch (comp.model) {
      case 'BASE_INFO':
        buildBaseInfo(children, d, gs)
        break
      case 'JOB_INTENTION':
        buildJobIntention(children, d)
        break
      case 'EDU_BACKGROUND':
        buildEdu(children, d)
        break
      case 'SKILL_SPECIALTIES':
        buildSkill(children, d)
        break
      case 'WORK_EXPERIENCE':
        buildExperience(children, d, '工作经历', gs)
        break
      case 'PROJECT_EXPERIENCE':
        buildExperience(children, d, '项目经历', gs)
        break
      case 'INTERNSHIP_EXPERIENCE':
        buildExperience(children, d, '实习经历', gs)
        break
      case 'CAMPUS_EXPERIENCE':
        buildExperience(children, d, '校园经历', gs)
        break
      case 'AWARDS':
        buildAwards(children, d)
        break
      case 'HOBBIES':
        buildSimple(children, d, '兴趣爱好')
        break
      case 'SELF_EVALUATION':
        buildSimple(children, d, '自我评价')
        break
      case 'WORKS_DISPLAY':
        buildWorks(children, d)
        break
      case 'RESUME_TITLE':
        break // 标题已由基本信息覆盖
      case 'CUSTOM':
        buildCustom(children, d)
        break
      default:
        break
    }
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 21, color: '#333333' },
        },
      },
    },
    sections: [
      {
        properties: {},
        children,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${resume.TITLE || '个人简历'}.docx`)
}
