import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const session = ref({
    id: useLocalStorage('sessionID', ''),
  })

  const user = ref({
    id: useLocalStorage('userID', ''),
    name: useLocalStorage('username', ''),
  })

  return { session, user }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
