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

export enum VoteSystem {
  ModifiedFibonacci = 'Modified Fibonacci (0,½,1,2,3,5,8,13,20,40,100)',
  Fibonacci = 'Fibonacci (0,1,2,3,5,8,13,21,34,55,89)',
  TShirtSizes = 'T-Shirt Sizes (XS,S,M,L,XL)',
}
