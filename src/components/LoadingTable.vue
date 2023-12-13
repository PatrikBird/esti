<template>
  <div class="mt-8 flex animate-pulse flex-col">
    <div class="inline-block min-w-full py-2 align-middle">
      <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-zinc-700 md:rounded-lg">
        <table class="min-w-full divide-y divide-zinc-300 dark:divide-zinc-700 dark:bg-zinc-800">
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
          <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
            <tr v-for="idx in 5" :key="idx">
              <td class="invisible whitespace-nowrap p-2 text-right text-sm">
                Whatever Name
              </td>
              <td class="whitespace-nowrap p-2 text-center text-sm">
                <span i-line-md:loading-twotone-loop class="inline-block h-5 w-5" />
              </td>
              <td class="text-center">
                <span i-ic:baseline-settings class="inline-block h-5 w-5 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
