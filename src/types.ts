import { type ViteSSGContext } from 'vite-ssg'
import type { Timestamp } from 'firebase/firestore'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SessionData {
  users: User[]
  sessionState: SessionState
}

export interface User {
  id: string
  isObserver: boolean
  lastVoteOn: string | null
  name: string
  voteValue: string | null
  joinedOn: Timestamp
}

export interface SessionState {
  createdOn: Timestamp
  isVoteRevealed: boolean
  lastRevealOn: string | null
  lastResetOn: string | null
}
