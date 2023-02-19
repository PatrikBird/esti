import type { MaybeRef } from '@vueuse/core'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '~/modules/firebase'

export async function useSessionExists(sessionID: MaybeRef<string>) {
  const sessionIDValue = unref(sessionID)
  const isSessionIDValid = ref(false)

  const querySnapshot = await getDocs(collection(db, sessionIDValue))
  isSessionIDValid.value = !querySnapshot.empty

  return {
    isSessionIDValid,
  }
}
