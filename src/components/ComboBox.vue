<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import type { Ref } from 'vue'
import { Person } from '~/types'
import type { User } from '~/types'

const props = defineProps<{ users: User[] }>()
const emit = defineEmits<{
  (e: 'selectedChanged', person: Person): void
}>()

const people = computed<Person[]>(() => {
  return props.users.map((u) => {
    return { id: u.id, name: u.name }
  })
})

const selected: Ref<Person> = ref(people.value[0])
const query = ref('')

const filteredPeople = computed<Person[]>(() =>
  query.value === ''
    ? people.value
    : people.value.filter(user =>
      user.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, '')),
    ),
)

watchEffect(() => {
  emit('selectedChanged', selected.value)
})
</script>

<template>
  <Combobox
    v-model="selected"
    :disabled="people.length === 0"
  >
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm"
      >
        <ComboboxInput
          class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0"
          :display-value="(person) => (person as Person).name"
          :disabled="people.length === 0"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <icon:line-md:chevron-left class="-rotate-90" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-zinc-700 sm:text-sm"
        >
          <div
            v-if="filteredPeople.length === 0"
            class="relative cursor-default select-none py-2 px-4 text-zinc-700 dark:text-white"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in filteredPeople"
            :key="person.id"
            v-slot="{ selected, active }"
            as="template"
            :value="person"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-emerald-600 text-white': active,
                'text-zinc-900, dark:text-white': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ person.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-emerald-600': !active }"
              >
                <icon:mdi:check-circle-outline class="h-5 w-5" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
