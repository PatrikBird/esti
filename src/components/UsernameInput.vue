<script setup lang='ts'>
const emit = defineEmits<{
  (e: 'update:modelValue', username: string): void
}>()

const mainStore = useMainStore()

const enteredName = ref(mainStore.user.name)
const { enteredNameTooLong } = useNameValidator(enteredName)

onMounted(() => {
  watch(enteredName, (newValue) => {
    emit('update:modelValue', newValue)
  }, { immediate: true })
})
</script>

<template>
  <div>
    <label
      for="username"
      class="block py-1 text-left text-sm font-medium"
      :class="{ 'text-rose-400': enteredNameTooLong }"
    >Name</label>
    <input
      id="username"
      v-model.trim="enteredName"
      class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm
      focus:(border-blue-500 outline-none)
      dark:(border-zinc-700/5 bg-zinc-700 focus:border-blue-500)"
      :class="{ '!border-rose-400': enteredNameTooLong }"
      name="username"
      type="text"
      required
      autofocus
    >
    <p v-visible="enteredNameTooLong" class="text-left text-sm text-rose-400">
      Are you writing a novel?
    </p>
  </div>
</template>
