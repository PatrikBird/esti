<script setup lang="ts">
const users = [
  {
    name: 'Voter',
    people: [
      { name: 'Lindsay Walton', status: 'voted' },
      { name: 'Courtney Henry', status: 'not voted' },
    ],
  },
  {
    name: 'Observer',
    people: [
      { name: 'Kirsten Dunst', status: 'obs' },
      { name: 'Pope Franziskus XII', status: 'obs' },
    ],
  },
]
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Users
        </h1>
        <p class="mt-2 text-sm">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          Add user
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-white dark:bg-gray-800">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6" />
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
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
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      {{ person.name }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      {{ person.status }}
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
