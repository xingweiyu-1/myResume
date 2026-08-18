// JSON 导出 / 导入
import { saveAs } from 'file-saver'
import { cloneDeep } from 'lodash'
import { getUuid } from './common'

export const exportJson = (resume: any) => {
  const data = cloneDeep(resume)
  data.ID = getUuid()
  const blob = new Blob([JSON.stringify(data, null, 4)], {
    type: 'application/json',
  })
  saveAs(blob, `${resume.TITLE || '个人简历'}.json`)
}
