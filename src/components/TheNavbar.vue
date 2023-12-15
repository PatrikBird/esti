<script setup lang='ts'>
const mainStore = useMainStore()
const route = useRoute()

const lastSessionLink = computed(() =>
  mainStore.session.id === '' ? false : `/session/${mainStore.session.id}`,
)

const source = computed(() => `${window.location.origin}${route.path}`)
const { copy, copied } = useClipboard({ source })

const routeContainsSession = computed(() => route.path.includes('session'))
</script>

<template>
  <nav class="top-0 z-10 h-16 pt-6">
    <div class="w-full sm:px-8">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8">
          <div class="mx-auto max-w-2xl">
            <div class="relative flex gap-4">
              <div class="flex flex-1 justify-center gap-3 md:justify-center">
                <nav class="pointer-events-auto block">
                  <ul class="list-none flex rounded-full bg-white px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-white/10">
                    <li>
                      <RouterLink
                        to="/"
                        active-class="text-blue-600 dark:text-blue-500"
                        class="relative block px-3 py-0.6rem transition hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        Home
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/about"
                        active-class="text-blue-600 dark:text-blue-500"
                        class="relative block px-3 py-0.6rem transition hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        About
                      </RouterLink>
                    </li>
                    <li v-if="lastSessionLink">
                      <RouterLink
                        :to="lastSessionLink"
                        active-class="text-blue-600 dark:text-blue-500"
                        title="Back to last session"
                        class="relave block px-3 py-0.6rem transition hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        Session
                      </RouterLink>
                    </li>
                  </ul>
                </nav>
                <button
                  type="button"
                  aria-label="Toggle dark mode"
                  title="Toggle dark mode"
                  class="group rounded-full px-3 py-2 bg-white shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 hover:text-blue-500
                dark:(bg-zinc-800 text-blue-500 ring-white/10 hover:text-blue-400 hover:ring-white/20)"
                  @click="toggleDark()"
                >
                  <span v-if="!isDark" i-line-md:sunny-filled-loop class="h-[1.3rem] w-[1.3rem]" />
                  <span v-else i-line-md:sunny-filled-loop-to-moon-filled-loop-transition class="h-[1.35rem] w-[1.35rem]" />
                </button>
                <VDropdown
                  v-if="routeContainsSession"
                  :distance="7"
                  :triggers="[]"
                  :shown="copied"
                  :auto-hide="false"
                  title="Copy URL to clipboard"
                  aria-label="Copy URL to clipboard"
                >
                  <button
                    type="button"
                    class="group rounded-full px-3 py-2 bg-white shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 hover:text-blue-500
                  dark:(bg-zinc-800 text-white ring-white/10 hover:text-blue-400 hover:ring-white/20)"
                    :class="copied ? 'text-blue-500 dark:text-blue-500!' : 'text-zinc-900 dark:text-zinc-200'"
                    @click="copy()"
                  >
                    <span v-if="!copied" i-fluent:clipboard-24-regular class="h-[1.3rem] w-[1.3rem]" />
                    <span v-else i-fluent:clipboard-checkmark-24-regular class="h-[1.3rem] w-[1.3rem]" />
                  </button>
                  <template #popper>
                    <p class="p2 text-xs bg-zinc-800 text-white dark:(text-zinc-800 bg-zinc-100)">
                      URL Copied!
                    </p>
                  </template>
                </VDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
.v-popper__wrapper
.v-popper__arrow-container
.v-popper__arrow-inner {
  @apply border-zinc-800 dark:border-zinc-100;
}
</style>
