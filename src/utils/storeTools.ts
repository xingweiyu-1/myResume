// Pinia setup 模式不支持 $reset，这里手动补一个 reset 方法
import { IAppStore } from '@/store'

export const initResetFun = (appStore: IAppStore) => {
  Object.values(appStore).forEach((item) => {
    const initState = {} as Record<string, any>
    Object.entries(item.$state).forEach(([key, value]) => {
      initState[key] = value
    })
    item.reset = () => {
      Object.keys(item.$state).forEach((state) => {
        item.$state[state] = initState[state]
      })
    }
  })
}
