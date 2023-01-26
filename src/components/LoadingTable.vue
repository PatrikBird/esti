<template>
  <div class="mt-8 flex animate-pulse flex-col">
    <div class="inline-block min-w-full py-2 align-middle">
      <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-slate-700 md:rounded-lg">
        <table class="min-w-full divide-y divide-slate-300 dark:divide-slate-700 dark:bg-slate-800 dark:text-slate-400">
          <thead>
            <tr>
              <th scope="col" class="invisible whitespace-nowrap px-2 py-3.5 text-right font-medium">
                Name
              </th>
              <th scope="col" class="invisible whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Vote
              </th>
              <th scope="col" class="invisible select-none whitespace-nowrap px-2 py-3.5 text-center font-medium">
                Edit
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="index in 5" :key="index">
              <td class="invisible whitespace-nowrap p-2 text-right text-sm">
                invisible
              </td>
              <td class="invisible whitespace-nowrap p-2 text-center text-sm">
                invisible
              </td>
              <td class="invisible text-center">
                invisible
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
