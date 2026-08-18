import { defineStore } from 'pinia'
import IRESUMEJSON from '@/interface/resume'
import RESUME_JSON from '@/schema/resume'
import { IMATERIALITEM } from '@/interface/material'
import { cloneDeep } from 'lodash'

// 简历数据 store
export const useResumeJsonNewStore = defineStore('resumeJsonNew', () => {
  const resume_json = cloneDeep(RESUME_JSON)
  const importJson = ref<IRESUMEJSON>(resume_json)
  const resumeJsonNewStore = ref<IRESUMEJSON>(resume_json)

  function changeResumeJsonData(obj: IRESUMEJSON) {
    const data = cloneDeep(obj)
    // 健壮性：保证 GLOBAL_STYLE / COMPONENTS 始终存在，避免属性面板崩溃
    if (!data.GLOBAL_STYLE) data.GLOBAL_STYLE = cloneDeep(RESUME_JSON.GLOBAL_STYLE)
    if (!Array.isArray(data.COMPONENTS)) data.COMPONENTS = []
    resumeJsonNewStore.value = data
  }
  function changeImportJsonData(obj: IRESUMEJSON) {
    importJson.value = cloneDeep(obj)
  }
  function pushComponent(data: IMATERIALITEM) {
    resumeJsonNewStore.value.COMPONENTS.push(data)
  }
  function resetResumeJson() {
    resumeJsonNewStore.value = cloneDeep(RESUME_JSON)
  }

  return {
    resumeJsonNewStore,
    importJson,
    changeResumeJsonData,
    changeImportJsonData,
    pushComponent,
    resetResumeJson,
  }
})

// 选中模块 store
export const useSelectMaterialStore = defineStore('selectMaterialStore', () => {
  const cptName = ref<string>('') // 选中的模块名称
  const cptOptionsName = ref<string>('') // 选中的属性面板名称
  const cptTitle = ref<string>('全局主题设置') // 选中的模块展示名
  const cptKeyId = ref<string>('') // 选中的模块 keyId

  function updateSelectModel(
    cptNameTxt: string,
    cptOptionsNameTxt: string,
    cptTitleTxt: string,
    cptKeyIdTxt: string
  ) {
    cptName.value = cptNameTxt
    cptOptionsName.value = cptOptionsNameTxt
    cptTitle.value = cptTitleTxt
    cptKeyId.value = cptKeyIdTxt
  }
  function resetSelectModel() {
    cptName.value = ''
    cptOptionsName.value = ''
    cptTitle.value = '全局主题设置'
    cptKeyId.value = ''
  }
  return {
    cptName,
    cptOptionsName,
    cptTitle,
    cptKeyId,
    updateSelectModel,
    resetSelectModel,
  }
})
