import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SessionState {
  isRevealed: boolean
  lastVoteReset: string | null
  lastVoteReveal: string | null
}

export interface User {
  isObserver: boolean
  lastVote: string | null
  name: string
  voteValue: string | null
}
export interface Users {
  [key: string]: User
}

export interface State {
  sessionState: SessionState
  users: Users
}

// export interface SessionData {
//   [sessionId: string]: {
//     sessionState: SessionState
//     users: User[]
//   }
// }
