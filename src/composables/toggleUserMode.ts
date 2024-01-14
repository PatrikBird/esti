import { doc, updateDoc } from 'firebase/firestore'
import { useCollectionID } from './useCollectionID'
import { db } from '~/modules/firebase'

export function useUserModeToggle() {
  const { collectionID } = useCollectionID()

  function toggleUserMode(userID: string, isObserver: boolean) {
    updateDoc(doc(db, collectionID, userID), {
      isObserver,
      voteValue: null,
    })
  }

  return {
    toggleUserMode,
  }
}
