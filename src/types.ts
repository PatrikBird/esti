import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SessionData {
  users: User[]
  sessionState: SessionState
}

export interface User {
  isObserver: boolean
  lastVoteOn: string
  name: string
  voteValue: string | null
}

export interface SessionState {
  createdOn: string
  isVoteRevealed: boolean
  lastRevealOn: string
  lastResetOn: string
}
