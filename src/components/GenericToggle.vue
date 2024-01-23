<script setup lang="ts">
const props = defineProps<{
  options: [string, string]
}>()

const emits = defineEmits<{
  (e: 'optionSelected', selectedOption: string): void
}>()

const selectedOption = ref(props.options[0])

function updateValue(value: string) {
  selectedOption.value = value
}

watchEffect(() => {
  emits('optionSelected', selectedOption.value)
})
</script>

<template>
  <div class="flex items-center space-x-3">
    <label class="label">
      {{ props.options[0] }}
      <input
        type="radio"
        :name="props.options[0]"
        class="radio"
        :checked="selectedOption === props.options[0]"
        @change="updateValue(props.options[0])"
      >
    </label>

    <label class="label flex-row-reverse">
      {{ options[1] }}
      <input
        type="radio"
        :name="props.options[1]"
        class="radio"
        :checked="selectedOption === props.options[1]"
        @change="updateValue(props.options[1])"
      >
    </label>
  </div>
</template>

<style scoped lang="postcss">
.label {
  @apply cursor-pointer flex gap-2 text-sm items-center
}

.radio {
  @apply h-6 w-6 cursor-pointer appearance-none rounded-full
  border border-blue-600 border-opacity-30;

  &:checked,
  &[aria-checked="true"] {
    @apply bg-blue-600;
    /* background-image: none; */
    animation: radiomark .2s ease-out forwards;
    box-shadow:
      0 0 0 4px var(--radio-bg) inset,
      0 0 0 4px var(--radio-bg) inset;
  }

  &:disabled {
    @apply cursor-not-allowed opacity-20;
  }
}

@keyframes radiomark {
  0% {
    box-shadow:
      0 0 0 12px var(--radio-bg) inset,
      0 0 0 12px var(--radio-bg) inset;
  }

  50% {
    box-shadow:
      0 0 0 3px var(--radio-bg) inset,
      0 0 0 3px var(--radio-bg) inset;
  }

  100% {
    box-shadow:
      0 0 0 4px var(--radio-bg) inset,
      0 0 0 4px var(--radio-bg) inset;
  }
}
</style>
