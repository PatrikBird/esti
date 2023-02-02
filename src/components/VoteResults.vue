<!-- eslint-disable antfu/if-newline -->
<script setup lang="ts">
// const props = defineProps<{ voters: User[] }>()

// const validVoters = computed(() =>
//   props.voters.filter(u => u.voteValue !== null && u.voteValue !== '?' && u.voteValue !== 'break'),
// )

// const maxVote = computed(() =>
//   validVoters.value.reduce((max, v) => Math.max(max, +v.voteValue!), 0),
// )

// const sortedVoters = computed(() => {
//   const voters = props.voters.slice()
//   voters.sort((a, b) => {
//     if (a.voteValue === null) return -1
//     if (b.voteValue === null) return 1
//     if (a.voteValue === '?') return 1
//     if (b.voteValue === '?') return -1
//     if (a.voteValue === 'break') return 1
//     if (b.voteValue === 'break') return -1
//     return +a.voteValue! - +b.voteValue!
//   })
//   return voters
// })
</script>

<template>
  <div class="pt-11">
    <!-- <div class="inline-block min-w-full py-2 align-middle">
      <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-zinc-700 md:rounded-lg">
        <div class="min-w-full divide-y divide-zinc-300 dark:divide-zinc-700 dark:bg-zinc-800"> -->
    <progress-bar />
    <!-- <average-value :voters="validVoters" /> -->
    <!-- <progress-bar
            v-for="{ id, name, voteValue } in sortedVoters"
            :key="id"
            :name="name"
            :vote="voteValue"
            :max-vote="maxVote"
            /> -->
    <!-- </div>
            </div>
          </div> -->
  </div>
</template>
