import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import type { MaybeRef } from 'vue'
import type { SessionState } from '~/types'
import { db } from '~/modules/firebase'

export function useSessionState(collectionID: MaybeRef<string>) {
  const collectionIDValue = toValue(collectionID)

  const {
    data: sessionState,
    pending: sessionStatePending,
    error: sessionStateError,
  } = useDocument<SessionState>(
    doc(collection(db, collectionIDValue), 'sessionState'),
  )

  const isVoteRevealed = computed(() => sessionState.value?.isVoteRevealed)
  const isShirtMode = computed(() => sessionState.value?.isShirtMode)
  // const availableVotes = computed(() => sessionState.value?.availableVotes)

  return {
    sessionState,
    sessionStatePending,
    sessionStateError,
    isVoteRevealed,
    isShirtMode,
    // availableVotes,
  }
}
