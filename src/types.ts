import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface User {
  id: number
  name: string
  voteValue: string
  isObserver: boolean
  lastVote: Date
}

export interface SessionState {
  id: number
  voting: boolean
  isRevealed: boolean
  lastVoteReaveal: Date
  lastVoteReset: Date
}
