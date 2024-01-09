import type { MaybeRef } from 'vue'

export function useArrayNumbersFilter(array: MaybeRef<unknown[]>): Ref<number[]> {
  const filteredArray = ref<number[]>([])
  const arrayValue = toValue(array)

  for (const element of arrayValue) {
    if (element !== null && (typeof element === 'number' || !Number.isNaN(Number(element))))
      filteredArray.value.push(Number(element))
  }

  return filteredArray
}
