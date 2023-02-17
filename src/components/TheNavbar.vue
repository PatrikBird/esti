<script setup lang='ts'>
const mainStore = useMainStore()

const lastSessionLink = computed(() =>
  mainStore.session.id === '' ? false : `/session/${mainStore.session.id}`,
)
</script>

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
                  <ul class="flex rounded-full px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-white/10">
                    <li>
                      <RouterLink
                        to="/"
                        active-class="text-blue-600"
                        class="relative block px-3 py-2 transition hover:text-blue-600"
                      >
                        Home
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/about"
                        active-class="text-blue-600"
                        class="relative block px-3 py-2 transition hover:text-blue-600"
                      >
                        About
                      </RouterLink>
                    </li>
                    <li v-if="lastSessionLink">
                      <RouterLink
                        :to="lastSessionLink"
                        active-class="text-blue-600"
                        title="Back to last session"
                        class="relave block px-3 py-2 transition hover:text-blue-600"
                      >
                        Session
                      </RouterLink>
                    </li>
                  </ul>
                </nav>
                <div class="pointer-events-auto">
                  <button
                    type="button"
                    aria-label="Toggle dark mode"
                    title="Toggle dark mode"
                    class="group rounded-full px-3 py-2 text-blue-600 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 hover:text-blue-700 dark:ring-white/10 dark:hover:ring-white/20"
                    @click="toggleDark()"
                  >
                    <icon:line-md:sunny-filled-loop v-if="!isDark" class="h-[1.3rem] w-[1.3rem] " />
                    <icon:line-md:sunny-filled-loop-to-moon-filled-loop-transition v-else class="h-[1.35rem] w-[1.35rem]" />
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
