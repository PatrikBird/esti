import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

export function useUserModeSwitch() {
  const route = useRoute()

  function switchUserMode(userID: string, isObserver: boolean) {
    const collectionID = ref(route.params.sessionID as string)

    updateDoc(doc(db, collectionID.value, userID), { isObserver, voteValue: null })
  }

  return {
    switchUserMode,
  }
}
