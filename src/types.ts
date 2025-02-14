import type { Timestamp } from 'firebase/firestore'
import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SessionData {
  users: User[]
  sessionState: SessionState
}

export interface SessionState {
  createdOn: Timestamp
  isVoteRevealed: boolean
  isShirtMode: boolean
  lastRevealOn: string | null
  lastResetOn: string | null
}

export interface Person {
  id: string
  name: string
}

export interface User extends Person {
  isObserver: boolean
  lastVoteOn: Timestamp | null
  voteValue: string | null
  joinedOn: Timestamp
}
