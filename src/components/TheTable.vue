<script setup lang="ts">
const users = [
  {
    name: 'Voter',
    people: [
      { id: '1234567', name: 'Lindsay Walton', voteValue: '3' },
      { id: '7654321', name: 'Courtney Henry', voteValue: '5' },
    ],
  },
  {
    name: 'Observer',
    people: [
      { id: '5555555', name: 'Kirsten Dunst', voteValue: 'obs' },
      { id: '8888888', name: 'Pope Franziskus XII', voteValue: 'obs' },
    ],
  },
]
</script>

<template>
  <div class="px-4 max-w-4xl mx-auto sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-white dark:bg-gray-800">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6" />
                  <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold">
                    Status
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800">
                <template v-for="role in users" :key="role.name">
                  <tr class="border-t border-gray-200 dark:border-gray-600">
                    <th colspan="3" scope="colgroup" class="bg-gray-50 dark:bg-gray-700 px-4 py-2 text-left text-sm font-semibold sm:px-6">
                      {{ role.name }}
                    </th>
                  </tr>
                  <tr v-for="person in role.people" :key="person.name" class="border-t border-gray-200 dark:border-gray-700">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left sm:pl-6">
                      {{ person.name }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-center">
                      {{ person.voteValue }}
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#">Edit<span class="sr-only">, {{ person.name }}</span></a>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
