import { describe, expect, it } from 'vitest'
import { useNameValidator } from '../../src/composables/nameValidator'

describe('nameValidator', () => {
  it('nameIsValid should return true for valid names', () => {
    const validNames = [
      ',',
      '.',
      'J',
      'John',
      'Jane Doe',
      'John Doe Jr.',
      'A very long name that is valid',
      'l33t n4m3',
      '떡볶이',
      '🍕',
    ]

    validNames.forEach((name) => {
      const { nameIsValid } = useNameValidator(name)

      expect(nameIsValid.value).toBe(true)
    })
  })

  it('nameIsValid should return false for invalid names', () => {
    const invalidNames = [
      '',
      ' ',
    ]
    invalidNames.forEach((name) => {
      const { nameIsValid } = useNameValidator(name)

      expect(nameIsValid.value).toBe(false)
    })
  })

  it('enteredNameTooLong should return true for very long names', () => {
    const invalidNames = [
      'this is a very long name 123',
      'thisAlsoisAVeryLongName',
    ]
    invalidNames.forEach((name) => {
      const { enteredNameTooLong } = useNameValidator(name)

      expect(enteredNameTooLong.value).toBe(true)
    })
  })

  it('enteredNameTooLong should return false for short names', () => {
    const invalidNames = [
      ',',
      '.',
      'J',
      'John',
      'Jane Doe',
      'John Doe Jr.',
      'l33t n4m3',
      '떡볶이',
      '🍕',
    ]
    invalidNames.forEach((name) => {
      const { enteredNameTooLong } = useNameValidator(name)

      expect(enteredNameTooLong.value).toBe(false)
    })
  })
})
