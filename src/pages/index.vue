<template>
  <!-- <section class="bg-white dark:bg-slate-900"> -->
  <div class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
    <div class="mr-auto place-self-center lg:col-span-7">
      <h1 class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
        Esti - A Simple Story Estimation Tool
      </h1>
      <p class="mb-6 max-w-2xl font-light text-slate-500 dark:text-slate-400 md:text-lg lg:mb-8 lg:text-xl">
        No ads, no tracking, no banner.
      </p>
      <a href="#" class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium focus:ring-4">
        Join Session
        <svg class="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
      </a>
      <a href="#" class="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-center text-base font-medium text-slate-900 hover:bg-emerald-200 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-emerald-500 dark:focus:ring-slate-800">
        Create Session
      </a>
    </div>
    <div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
      <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup">
    </div>
  </div>
  <!-- </section> -->
</template>

<route lang="yaml">
meta:
  layout: home
</route>
