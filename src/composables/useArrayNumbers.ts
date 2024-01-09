import type { MaybeRef } from 'vue'

export function useArrayNumbers(array: MaybeRef<unknown[]>) {
  const filteredArray = ref<number[]>([])
  const arrayValue = toValue(array)

  for (const element of arrayValue) {
    if (element !== null && (typeof element === 'number' || !Number.isNaN(Number(element))))
      filteredArray.value.push(Number(element))
  }

  const sortedArray = useSorted(filteredArray)

  return { filteredArray, sortedArray }
}
