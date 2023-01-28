import { acceptHMRUpdate, defineStore } from 'pinia'

const route = useRoute()
// create regex to match /session/1674887163002 wit hexact number of digits
// const regex = /\/session\/\d{13}/
// check if route.path matches regex
// if (regex.test(route.path)) {
//   console.log('regex.test(route.path) === true')
// }

export const useMainStore = defineStore('main', () => {
  // check if route contains /session/1674887163002
  // if so, set sessionID in localStorage
  console.log(route)

  // if (route.params?.sessionID) {
  //   useLocalStorage('sessionID', route.params.sessionID)
  // }

  const session = ref({
    id: useLocalStorage('sessionID', ''),
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
