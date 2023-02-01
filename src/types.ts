import { type ViteSSGContext } from 'vite-ssg'

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
}

export interface SessionState {
  // createdOn: TimeStamp
  isVoteRevealed: boolean
  lastRevealOn: string | null
  lastResetOn: string | null
}

// interface TimeStamp {
//   seconds: number
//   nanoseconds: number
// }
