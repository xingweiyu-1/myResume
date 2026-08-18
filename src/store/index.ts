import { initResetFun } from '@/utils/storeTools'
import { useLoadingStore } from './loading'
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume'
import { useUuidStore } from './uuid'

export interface IAppStore {
  useLoadingStore: ReturnType<typeof useLoadingStore>
  useUuidStore: ReturnType<typeof useUuidStore>
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>
}

const appStore: IAppStore = {} as IAppStore

/** 注册 app 状态库（在 main.ts 中调用一次） */
export const registerStore = () => {
  appStore.useLoadingStore = useLoadingStore()
  appStore.useUuidStore = useUuidStore()
  appStore.useSelectMaterialStore = useSelectMaterialStore()
  appStore.useResumeJsonNewStore = useResumeJsonNewStore()
  initResetFun(appStore)
}

export default appStore
