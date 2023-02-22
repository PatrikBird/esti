<script setup lang='ts'>
const props = defineProps<{
  btnText: string
  formSending: boolean
  nameIsValid: boolean
  enteredNameTooLong: boolean
}>()
</script>

<template>
  <button
    type="submit"
    class="flex w-full justify-center rounded-md border border-transparent
    bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm
    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:ring-offset-2 disabled:bg-blue-600/50 disabled:hover:bg-blue-600/50"
    :disabled="formSending || !nameIsValid || enteredNameTooLong"
  >
    <icon:line-md:loading-twotone-loop v-if="formSending" class="mr-1 h-5 w-5" />
    {{ formSending ? 'Loading...' : props.btnText }}
  </button>
</template>
