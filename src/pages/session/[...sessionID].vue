<script setup lang='ts'>
const mainStore = useMainStore()

const { collectionID } = useCollectionID()
mainStore.session.id = collectionID

const {
  sessionStatePending,
  sessionStateError,
  isVoteRevealed,
  isShirtMode,
  // availableVotes,
} = useSessionState(collectionID)

const showSessionNotFound = ref(false)
const { isSessionIDValid } = await useSessionExists(collectionID)
if (!isSessionIDValid.value) {
  console.error('Session ID is not valid!')
  showSessionNotFound.value = true
}

const {
  userState,
  userStatePending,
  userStateError,
  userIDNotInDB,
  currentUserData,
  observers,
  voters,
  allVotersHaveVoted,
} = useUserState(collectionID)

const availableVotes: Ref<string[]> = ref([])
watchEffect(() => {
  if (isShirtMode.value) {
    availableVotes.value = [
      'XS',
      'S',
      'M',
      'L',
      'XL',
      '?',
      'coffee',
    ]
  }
  else {
    availableVotes.value = [
      '0',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '20',
      '40',
      '100',
      '?',
      'coffee',
    ]
  }
})
provide('availableVotes', availableVotes)
provide('allUsers', userState)
</script>

<template>
  <SessionNotFound v-if="showSessionNotFound || sessionStateError || userStateError" />
  <LoadingSpinner v-else-if="sessionStatePending || userStatePending" />
  <div v-else>
    <BaseModal
      v-if="!currentUserData && userIDNotInDB"
    />
    <div v-else class="mt-5">
      <VoteCards
        :available-votes="availableVotes"
        :is-vote-revealed="isVoteRevealed"
      />
      <div class="mx-auto max-w-3xl">
        <TheButtons
          :is-vote-revealed="isVoteRevealed"
          :all-voters-have-voted="allVotersHaveVoted"
        />
        <div v-if="!isVoteRevealed">
          <LoadingTable v-if="!userState" />
          <TheTable v-else :voters="voters" />
          <TheObservers :observers="observers" />
        </div>
        <VoteResults
          v-else
          :voters="voters"
          :is-shirt-mode="isShirtMode"
        />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: lay-session
</route>
