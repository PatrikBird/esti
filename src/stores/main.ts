import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const route = useRoute()

  const session = ref({
    id: useLocalStorage('sessionID', route.params.sessionID as string),
  })

  const user = ref({
    id: useLocalStorage('userID', ''),
    name: useLocalStorage('username', ''),
    isObserver: useLocalStorage('isObserver', Boolean),
  })

  return { session, user }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
