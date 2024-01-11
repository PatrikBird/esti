<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { voteSystems } from '../utils/voteSystemProvider'
import type { VoteSystem } from '~/types'

const emit = defineEmits<{
  (e: 'selectedVoteSystem', selectedVoteSystem: { name: VoteSystem, values: string[] }): void
  (e: 'isCoffeeChecked', isCoffeeChecked: boolean): void
  (e: 'isQuestionMarkChecked', isQuestionMarkChecked: boolean): void
}>()

const selectedVoteSystem = ref(voteSystems[0])
const isCoffeeChecked = ref(true)
const isQuestionMarkChecked = ref(true)

// watchEffect(() => {
//   emit('selectedVoteSystem', selectedVoteSystem.value)
//   emit('isCoffeeChecked', isCoffeeChecked.value)
//   emit('isQuestionMarkChecked', isQuestionMarkChecked.value)
// })

// TODO: sort array before matching
const matchingVoteSystem = computed(() => {
  return voteSystems.find((voteSystem) => {
    return JSON.stringify(voteSystem.values) === JSON.stringify(props.availableVotes)
  })
})

// function addCustomVotesIfNotPresent() {
//   if (questionMarkChecked.value && !availableVotes.value.includes('?'))
//     availableVotes.value.push('?')
//   else if (!questionMarkChecked.value && availableVotes.value.includes('?'))
//     availableVotes.value = availableVotes.value.filter(vote => vote !== '?')

//   if (coffeeChecked.value && !availableVotes.value.includes('coffee'))
//     availableVotes.value.push('coffee')
//   else if (!coffeeChecked.value && availableVotes.value.includes('coffee'))
//     availableVotes.value = availableVotes.value.filter(vote => vote !== 'coffee')
// }

// watch([selectedVoteSystem, coffeeChecked, questionMarkChecked], ([newSelectedVoteSystem]) => {
//   if (newSelectedVoteSystem.name === VoteSystem.TShirtSizes)
//     isShirtMode.value = true
//   else
//     isShirtMode.value = false

//   // Update availableVotes with voteSystem values based on user choice
//   availableVotes.value = newSelectedVoteSystem.values

//   // Add '?' or 'coffee' based on checkbox values
//   addCustomVotesIfNotPresent()
// }, { immediate: true })
</script>

<template>
  <label
    class="block w-full py-1 text-left text-sm font-medium"
  >Vote System
    <div class="w-full">
      <Listbox v-model="selectedVoteSystem">
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded bg-white py-2 pl-3
            pr-10 text-left shadow focus:outline-none cursor-pointer
            focus-visible:(border-indigo-500 ring-2 ring-white/75 ring-offset-2 ring-offset-orange-300)
            sm:text-sm"
          >
            <span class="block truncate">{{ selectedVoteSystem.name }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <span i-heroicons:chevron-up-down />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white
              py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none
              sm:text-sm"
            >
              <ListboxOption
                v-for="voteSystem in voteSystems"
                v-slot="{ active, selected }"
                :key="voteSystem.name"
                :value="voteSystem"
                as="template"
              >
                <li
                  class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                  :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900']"
                >
                  <span class="block truncate text-left">{{ voteSystem.name }}</span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <span i-material-symbols:check-circle-outline />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </label>
  <div class="flex gap4">
    <input id="questionMarkCheckbox" v-model="isQuestionMarkChecked" type="checkbox">
    <label for="questionMarkCheckbox">Question Mark</label>

    <input id="coffeeCheckbox" v-model="isCoffeeChecked" type="checkbox">
    <label for="coffeeCheckbox">Coffee</label>
  </div>
</template>
