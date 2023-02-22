export function useNameValidator(enteredName: Ref<string>) {
  const onlyWhiteSpaces = /^\s*$/
  const nameIsValid = computed(() => {
    return !onlyWhiteSpaces.test(enteredName.value)
  })

  const enteredNameTooLong = computed(() => {
    return enteredName.value.length > 25
  })

  return { nameIsValid, enteredNameTooLong }
}
