import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useArrayNumbers } from '../../src/composables/useArrayNumbers'

describe('useArrayNumbersFilter', () => {
  it('should filter out non-number values from an reactive array', () => {
    const array = ref([1, 'two', 3, 'four', 5])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([1, 3, 5])
  })

  it('should filter out non-number values from an ordinary array', () => {
    const array = [1, 'two', 3, 'four', 5]
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([1, 3, 5])
  })

  it('should return the array if only numbers were present', () => {
    const array = ref([5, 4, 3, 2, 1])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([5, 4, 3, 2, 1])
  })

  it('should return an empty array if the input array is empty', () => {
    const array = ref([])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([])
  })

  it('should return an empty array if the input array does not contain any numbers', () => {
    const array = ref(['one', 'two', 'three'])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([])
  })

  it('should filter out emojis from the array', () => {
    const array = ref(['🍎', '🍌', '🍇', '🍓', '🍉'])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([])
  })

  it('should filter out special characters from the array', () => {
    const array = ref(['!', '@', '#', '$', '%'])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([])
  })

  it('should filter out mixed values from the array', () => {
    const array = ref([1, 'two', '🍎', 3, '🍌', 'four', 5, '🍇'])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([1, 3, 5])
  })

  it('should filter out null values from the array', () => {
    const array = ref([1, null, 3, null, 5])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([1, 3, 5])
  })

  it('should filter out undefined values from the array', () => {
    const array = ref([1, undefined, 3, undefined, 5])
    const { filteredArray } = useArrayNumbers(array)

    expect(filteredArray.value).toEqual([1, 3, 5])
  })
})

describe('useArrayNumbersSort', () => {
  it('should sort the array in ascending order', () => {
    const array = ref([5, 4, 3, 2, 1])
    const { sortedArray } = useArrayNumbers(array)

    expect(sortedArray.value).toEqual([1, 2, 3, 4, 5])
  })

  // it('should sort the array in ascending order', () => {
  //   const array = ref([1, 2, 3, 4, 5])
  //   const { sortedArray } = useArrayNumbers(array)

  //   expect(sortedArray.value).toEqual([1, 2, 3, 4, 5])
  // })
})
