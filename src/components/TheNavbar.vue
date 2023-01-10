<template>
  <div class="top-0 z-40 text-primary-800">
    <nav class="dark:bg-primary-800">
      <div class="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-6">
            <RouterLink class="icon-btn mx-2" to="/" title="Home">
              Home
            </RouterLink>
            <RouterLink class="icon-btn mx-2" to="/about" title="About">
              About
            </RouterLink>
            <a
              href="https://github.com/PatrikBird/esti"
              target="_blank"
              title="GitHub"
              class="opacity-75 hover:opacity-100 dark:text-primary-100"
            >
              <icon:line-md:github-loop class="w-6 h-6" />
            </a>
            <button
              class="opacity-75 hover:opacity-100 dark:text-primary-100" title="Toggle color mode"
              @click="toggleDark()"
            >
              <icon:line-md:sunny-filled-loop v-if="!isDark" class="w-6 h-6" />
              <icon:line-md:sunny-filled-loop-to-moon-filled-loop-transition v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
