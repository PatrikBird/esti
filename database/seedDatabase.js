/* eslint-disable antfu/no-top-level-await */
/* eslint-disable no-undef */
import {
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore'

await setDoc(doc(db, '1111111111111', 'sessionState'), {
  isVoteRevealed: false,
  isShirtMode: false,
  lastRevealOn: null,
  lastResetOn: null,
  createdOn: Timestamp.fromDate(new Date()),
})

// eslint-disable-next-line no-console
console.log('Data seeded successfully!')
