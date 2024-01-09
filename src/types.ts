import type { ViteSSGContext } from 'vite-ssg'
import type { Timestamp } from 'firebase/firestore'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SessionData {
  users: User[]
  sessionState: SessionState
}

export interface SessionState {
  createdOn: Timestamp
  isVoteRevealed: boolean
  availableVotes: string[]
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
