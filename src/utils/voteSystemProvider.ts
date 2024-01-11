import { VoteSystem } from '../types'

export const voteSystems = [
  { name: VoteSystem.ModifiedFibonacci, values: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'] },
  { name: VoteSystem.Fibonacci, values: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'] },
  { name: VoteSystem.TShirtSizes, values: ['XS', 'S', 'M', 'L', 'XL'] },
]
