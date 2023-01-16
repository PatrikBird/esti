import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface User {
  id: string
  name: string
  voteValue: string
  isObserver: boolean
  lastVote: Date
}

export interface SessionState {
  id: string
  voting: boolean
  isRevealed: boolean
  lastVoteReaveal: Date
  lastVoteReset: Date
}
