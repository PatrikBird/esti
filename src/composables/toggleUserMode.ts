import { doc, updateDoc } from 'firebase/firestore'
import { useCollectionId } from './useCollectionId'
import { db } from '~/modules/firebase'

export function useUserModeToggle() {
  const { collectionID } = useCollectionId()

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
