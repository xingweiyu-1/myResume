// 通用工具函数（原生实现，不依赖 vue-uuid / moment）

/** px 字符串转数字 */
export const pxTonumber = (value: string | undefined): number => {
  if (value) {
    return Number(value.split('px')[0])
  } else {
    return 0
  }
}

/** 熟练度文字转数值 */
export const textToNumber = (value: string): number => {
  let number = 0
  switch (value) {
    case '了解':
      number = 25
      break
    case '一般':
      number = 50
      break
    case '熟悉':
      number = 75
      break
    case '精通':
      number = 100
      break
  }
  return number
}

/** 数值转熟练度文字 */
export const numberToText = (value: number): string => {
  if (value <= 25) {
    return '一般'
  } else if (value <= 50) {
    return '掌握'
  } else if (value <= 75) {
    return '熟练'
  } else {
    return '精通'
  }
}

/** 生成 32 位随机 id（优先 crypto.randomUUID） */
export const getUuid = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '')
  }
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/** 'YYYY-M' 或 'YYYY-M-D' → 'YYYY.MM' */
const formatYearMonth = (dateStr: string): string => {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}.${m}`
}

/** 时间数组 ['2015-5','2019-6'] → '2015.05-2019.06'；单个日期串 → '2015.05'；支持 '至今' */
export const formatDate = (dataArray: Array<string> | string): string => {
  if (Array.isArray(dataArray)) {
    const startDate = formatYearMonth(dataArray[0])
    let endDate: string
    if (dataArray[1] === '至今') {
      endDate = '至今'
    } else {
      endDate = formatYearMonth(dataArray[1] || '')
    }
    return `${startDate}-${endDate}`
  } else {
    return formatYearMonth(dataArray)
  }
}

/** 日期字符串 → 'YYYY 年 MM 月 DD 日' */
export const formatDateToYMD = (dateString: string): string => {
  if (dateString) {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return `${d.getFullYear()} 年 ${String(d.getMonth() + 1).padStart(2, '0')} 月 ${String(
      d.getDate()
    ).padStart(2, '0')} 日`
  }
  return '暂无数据'
}

/** 判断字符串是否是 JSON */
export const isJSON = (str: string): boolean => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }
  return false
}

/** 本地草稿版本号，版本变更时清掉旧结构数据 */
export const checkVersion = () => {
  const version = localStorage.getItem('myresume-version')
  const DRAFT_KEY = 'myresume-draft'
  if (!version) {
    localStorage.removeItem(DRAFT_KEY)
  } else if (Number(version) !== 1) {
    localStorage.removeItem(DRAFT_KEY)
  }
  localStorage.setItem('myresume-version', '1')
}
