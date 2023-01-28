<template>
  <div class="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:flex lg:py-10 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:shrink-0 lg:pt-8">
      <img class="h-11" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="My Logo">
      <h1 class="mt-10 text-4xl font-bold tracking-tight dark:bg-gradient-to-r dark:from-emerald-400 dark:via-cyan-500 dark:to-indigo-600 dark:bg-clip-text dark:text-transparent sm:text-6xl">
        Esti - effortless estimations
      </h1>
      <p class="mt-6 text-lg leading-8">
        No ads, no distractions, no tracking, open source and free.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink to="/new" class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Create session
        </RouterLink>
        <RouterLink to="/join" class="text-base font-semibold leading-7 dark:text-white">
          Join session <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
    <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
      <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <div class="-m-2 rounded-xl bg-zinc-900/5 p-2 ring-1 ring-inset ring-zinc-900/10 dark:bg-gradient-to-tr dark:from-emerald-400/50 dark:via-cyan-500/50 dark:to-indigo-600/50 dark:ring-emerald-500/75 lg:-m-4 lg:rounded-2xl lg:p-4">
          <img src="https://tailwindui.com/img/component-images/project-app-screenshot.png" alt="App screenshot" width="2432" height="1442" class="w-[76rem] rounded-md shadow-2xl ring-1 ring-zinc-900/10">
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
