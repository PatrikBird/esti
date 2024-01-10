import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

export function useUserModeSwitch() {
  function switchUserMode(userID: string, isObserver: boolean) {
    const { collectionID } = useCollectionId()

    updateDoc(doc(db, collectionID, userID), {
      isObserver,
      voteValue: null,
    })
  }

  return {
    switchUserMode,
  }
}
