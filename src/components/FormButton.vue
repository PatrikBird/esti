<script setup lang='ts'>
const props = withDefaults(defineProps<{
  btnText: string
  formSending: boolean
  nameOrUserIsValid: boolean
  enteredNameTooLong?: boolean
}>(), {
  enteredNameTooLong: false,
})
</script>

<template>
  <button
    type="submit"
    class="flex w-full justify-center rounded-md border border-transparent
    bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm
    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:ring-offset-2 disabled:bg-blue-600/50 disabled:hover:bg-blue-600/50"
    :disabled="formSending || !nameOrUserIsValid || enteredNameTooLong"
  >
    <span
      v-if="formSending" i-line-md:loading-twotone-loop
      class="mr-1 h-5 w-5"
    />
    {{ formSending ? 'Loading...' : props.btnText }}
  </button>
</template>
