<template>
  <div class="top-0 z-10 h-16 pt-6">
    <div
      class="w-full sm:px-8"
    >
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8">
          <div class="mx-auto max-w-2xl">
            <div class="relative flex gap-4">
              <div class="flex flex-1 justify-center gap-3 md:justify-center">
                <nav class="pointer-events-auto block">
                  <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                    <li>
                      <RouterLink to="/" class="relative block px-3 py-2 transition hover:text-emerald-500 dark:hover:text-emerald-400" href="/about">
                        Home
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/about" class="relative block px-3 py-2 transition hover:text-emerald-500 dark:hover:text-emerald-400" href="/articles">
                        About
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/" class="relative block px-3 py-2 transition hover:text-emerald-500 dark:hover:text-emerald-400" href="/projects">
                        Session
                      </RouterLink>
                    </li>
                  </ul>
                </nav>
                <div class="pointer-events-auto">
                  <button
                    type="button" aria-label="Toggle dark mode"
                    class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                    @click="toggleDark()"
                  >
                    <icon:line-md:sunny-filled-loop v-if="!isDark" class="h-[1.3rem] w-[1.3rem] hover:text-emerald-500" />
                    <icon:line-md:sunny-filled-loop-to-moon-filled-loop-transition v-else class="h-[1.35rem] w-[1.35rem] text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
