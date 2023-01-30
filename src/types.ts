import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

// needs parsing and mapping
export interface SessionState {
  sessionId?: string
  isRevealed: boolean
  lastVoteReveal: string
  lastVoteReset: string
}

export interface User {
  id?: string
  name: string
  voteValue: string | null
  isObserver: boolean
  lastVote: string | null
}

export interface SessionData {
  [sessionId: string]: {
    sessionState: SessionState
    users: User[]
  }
}
