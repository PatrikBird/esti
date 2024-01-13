<script setup lang='ts'>
const props = defineProps<{ error: boolean }>()
const modelValue = defineModel<string>()
</script>

<template>
  <div>
    <label
      for="username"
      class="block py-1 text-left text-sm font-medium"
      :class="{ 'text-rose-400': props.error }"
    >Name
      <input
        id="username"
        v-model.trim="modelValue"
        class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm
        focus:(border-blue-500 outline-none)
        dark:(border-zinc-700/5 bg-zinc-700 focus:border-blue-500)"
        :class="{ '!border-rose-400': props.error }"
        name="username"
        type="text"
        required
        autofocus
      >
      <p v-visible="props.error" class="text-left text-sm text-rose-400">
        That is a very long name.
      </p>
    </label>
  </div>
</template>
