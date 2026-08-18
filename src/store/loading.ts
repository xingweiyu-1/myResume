import { defineStore } from 'pinia'

// 全局等待层（纯前端版保留最简实现，避免过多改动）
export const useLoadingStore = defineStore('loadingStore', () => {
  const loading = ref<boolean>(false)
  function changLoading(status: boolean) {
    loading.value = status
  }
  return {
    loading,
    changLoading,
  }
})
