<script setup lang='ts'>
const route = useRoute()
const mainStore = useMainStore()

const collectionID = ref(route.params.sessionID as string)
mainStore.session.id = collectionID.value

const {
  sessionStatePending,
  sessionStateError,
  isVoteRevealed,
  isShirtMode,
  availableVotes,
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

provide('availableVotes', availableVotes)
</script>

<template>
  <SessionNotFound v-if="showSessionNotFound || sessionStateError || userStateError" />
  <LoadingSpinner v-else-if="sessionStatePending || userStatePending" />
  <div v-else>
    <UserConnection
      v-if="!currentUserData && userIDNotInDB" :users="userState"
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
