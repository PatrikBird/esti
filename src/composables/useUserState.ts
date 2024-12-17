import type { MaybeRef } from 'vue'
import type { User } from '~/types'
import { collection, doc, query, where } from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'
import { db } from '~/modules/firebase'

const mainStore = useMainStore()

export function useUserState(collectionID: MaybeRef<string>) {
  const collectionIDValue = toValue(collectionID)

  const { data: userState, pending: userStatePending, error: userStateError } = useCollection<User>(
    query(
      collection(db, collectionIDValue),
      where('name', '!=', null),
    ),
  )

  const userIDNotInDB = computed(() => {
    return !userState.value?.find(u => u.id === mainStore.user.id)
  })

  const userIDIfSet = computed(() => {
    if (mainStore.user.id.length === 0)
      return '12345' // TODO: lol?

    return mainStore.user.id
  })

  const { data: currentUserData } = useDocument<User>(
    doc(collection(db, collectionIDValue), userIDIfSet.value),
  )

  const observers = computed(() => userState.value.filter(u => u.isObserver === true))
  const voters = computed(() => userState.value.filter(u => u.isObserver === false))

  const allVotersHaveVoted = computed(() => {
    if (voters.value.length < 1)
      return false
    return voters.value.every(v => v.voteValue !== undefined && v.voteValue !== null)
  })

  return {
    userState,
    userStatePending,
    userStateError,
    userIDNotInDB,
    currentUserData,
    observers,
    voters,
    allVotersHaveVoted,
  }
}
