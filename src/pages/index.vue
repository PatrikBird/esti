<template>
  <div class="mx-auto max-w-7xl px-6 py-24 sm:pb-32">
    <div class="mx-auto max-w-2xl">
      <!-- <img class="h-28" src="/esti.svg" alt="Esti Logo"> -->
      <h1 class="text-6xl font-bold tracking-tight dark:bg-gradient-to-r dark:from-emerald-400 dark:via-sky-500 dark:to-blue-600 dark:bg-clip-text dark:text-transparent">
        <span class="text-blue-600">esti</span>mate
        <br>
        <span class="text-4xl">effortless estimations</span>
      </h1>
      <p class="mt-6 text-lg leading-8">
        Free, no ads, no distractions, no tracking and open source.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink to="/new" class="rounded-md bg-blue-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Create session
        </RouterLink>
        <RouterLink to="/join" class="text-base font-semibold leading-7 dark:text-white">
          Join session <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
    <!-- <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
      <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <div class="-m-2 rounded-xl bg-zinc-900/5 p-2 ring-1 ring-inset ring-zinc-900/10 dark:bg-gradient-to-tr dark:from-emerald-400/50 dark:via-sky-500/50 dark:to-blue-600/50 dark:ring-sky-500/50 lg:-m-4 lg:rounded-2xl lg:p-4">
          <img src="https://tailwindui.com/img/component-images/project-app-screenshot.png" alt="App screenshot" width="2432" height="1442" class="w-[76rem] rounded-md shadow-2xl ring-1 ring-zinc-900/10">
        </div>
      </div>
    </div> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
