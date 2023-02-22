<script setup lang='ts'>
const emit = defineEmits<{
  (e: 'update:modelValue', username: string): void
}>()

const enteredName = ref('')
const { enteredNameTooLong } = useNameValidator(enteredName)

watch(enteredName, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div>
    <label
      for="username"
      class="block text-left text-sm font-medium"
      :class="{ 'text-red-500': enteredNameTooLong }"
    >Name</label>
    <input
      id="username"
      v-model.trim="enteredName"
      name="username"
      type="text"
      required
      class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700/5 dark:bg-zinc-800 dark:focus:border-blue-500"
      :class="{ '!border-red-500': enteredNameTooLong }"
      autofocus
    >
    <p v-visible="enteredNameTooLong" class="text-left text-sm text-red-500">
      Are you writing a novel?
    </p>
  </div>
</template>
