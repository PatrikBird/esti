import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SessionState {
  isRevealed: boolean
  lastVoteReset: string | null
  lastVoteReveal: string | null
  createdOn: Date
}

export interface User {
  isObserver: boolean
  lastVoteOn: string | null
  name: string
  voteValue: string | null
}

export interface State {
  sessionState: SessionState
  users: { [userId: string]: User }
}
