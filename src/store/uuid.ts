import { getUuid } from '@/utils/common'
import { defineStore } from 'pinia'

export const useUuidStore = defineStore('uuidStore', () => {
  const refreshUuid = ref<string>(getUuid())
  function setUuid() {
    refreshUuid.value = getUuid()
  }
  return {
    refreshUuid,
    setUuid,
  }
})
