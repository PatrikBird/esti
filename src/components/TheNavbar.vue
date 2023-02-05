<template>
  <div class="text-primary-800 top-0 z-40">
    <nav class="dark:bg-primary-800">
      <div class="mx-auto max-w-none px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center space-x-6">
            <RouterLink class="icon-btn mx-2" to="/" title="Home">
              Home
            </RouterLink>
            <RouterLink class="icon-btn mx-2" to="/about" title="About">
              About
            </RouterLink>
            <RouterLink class="icon-btn mx-2" to="/dummy-session" title="Session">
              Session
            </RouterLink>
            <a
              href="https://github.com/PatrikBird/esti"
              target="_blank"
              title="GitHub"
              class="dark:text-primary-100 opacity-75 hover:opacity-100"
            >
              <icon:line-md:github-loop class="h-6 w-6" />
            </a>
            <a
              href="https://www.buymeacoffee.com/patbird"
              target="_blank"
              title="Buy Me A Coffee"
              class="dark:text-primary-100 opacity-75 hover:opacity-100"
            >
              <BuyMeACoffeeDark v-if="isDark" />
              <BuyMeACoffee v-else />
            </a>
            <button
              class="dark:text-primary-100 opacity-75 hover:opacity-100" title="Toggle color mode"
              @click="toggleDark()"
            >
              <icon:line-md:sunny-filled-loop v-if="!isDark" class="h-6 w-6" />
              <icon:line-md:sunny-filled-loop-to-moon-filled-loop-transition v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
