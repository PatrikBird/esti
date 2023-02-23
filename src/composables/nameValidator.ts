import type { MaybeRef } from '@vueuse/core'

export function useNameValidator(enteredName: MaybeRef<string>) {
  const onlyWhiteSpaces = /^\s*$/
  const name = ref(enteredName)

  const nameIsValid = computed(() => {
    return !onlyWhiteSpaces.test(name.value)
  })

  const enteredNameTooLong = computed(() => {
    return name.value.length > 18
  })

  return { nameIsValid, enteredNameTooLong }
}
