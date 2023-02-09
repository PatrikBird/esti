<script setup lang='ts'>
const showTooltip = ref(false)
</script>

<template>
  <div
    class="relative"
    @mouseover="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <div
      class="relative m-1 inline-block select-none rounded-lg border border-zinc-200 p-2 text-center shadow-md dark:border-zinc-900 dark:bg-zinc-800"
    >
      <slot />
    </div>
    <div
      v-show="showTooltip"
      class="absolute left-0 z-20 -mt-16 ml-10 w-64 rounded bg-white/90 p-4 shadow-lg"
    >
      <svg
        class="absolute inset-y-0 left-0 -ml-2 h-full" width="9px" height="16px" viewBox="0 0 9 16"
        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#FFFFFF">
            <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
              <g id="Group-2" transform="translate(24.000000, 0.000000)">
                <polygon
                  id="Triangle" transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                  points="4.5 57.5 12.5 66.5 -3.5 66.5"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
      <p class="pb-1 text-sm font-bold text-zinc-800">
        Closest Vote
      </p>
      <p class="pb-3 text-xs leading-4 text-zinc-600">
        Bla bla bla.
      </p>
    </div>
  </div>
</template>
