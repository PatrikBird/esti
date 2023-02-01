// @ts-expect-error-error
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

export function generateIDs() {
  const newSessionID = nanoid()
  const newUserID = nanoid()

  return { newSessionID, newUserID }
}
