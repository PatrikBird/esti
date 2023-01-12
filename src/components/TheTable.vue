<script setup lang="ts">
const transactions = [
  {
    name: 'SomeCrayLongNameWhoHatesUI',
    status: 'Icon',
    whatever: 'IdontKnowyet',
  },
  {
    name: 'hi',
    status: 'Icon',
    whatever: 'IdontKnowyet',
  },
  {
    name: 'oha',
    status: 'Icon',
    whatever: 'IdontKnowyet',
  },
]
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Transactions
        </h1>
        <p class="mt-2 text-sm">
          A table of placeholder stock market data that does not make any sense.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          Export
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-slate-300 dark:divide-slate-800 text-right">
              <thead class="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-6">
                    Name
                  </th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-sm font-semibold">
                    Status
                  </th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-sm font-semibold">
                    Whatever
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-700">
                <tr v-for="transaction in transactions" :key="transaction.name">
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-6">
                    {{ transaction.name }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium">
                    {{ transaction.status }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm">
                    {{ transaction.whatever }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
