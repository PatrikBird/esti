import { acceptHMRUpdate, defineStore } from 'pinia'
// import type { Ref } from 'vue'
// import type { User } from '../types'

export const useMainStore = defineStore('main', () => {
  const user = reactive({
    id: useLocalStorage('id', ''),
    name: useLocalStorage('name', ''),
    voteValue: useLocalStorage('voteValue', 'null'),
    isObserver: useLocalStorage('isObserver', Boolean),
    lastVote: useLocalStorage('lastVote', Date),
  })

  return { user }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
