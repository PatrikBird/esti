import { inject, provide } from 'vue'
import type { MaybeRef, Ref } from 'vue'

export function useSessionStateInjector(collectionID: MaybeRef<string>) {
  const isShirtMode: Ref<boolean> | undefined = inject('isShirtMode') as Ref<boolean>
  const availableVotes: Ref<number> | undefined = inject('availableVotes') as Ref<number>
  const sessionState = useSessionState(collectionID)

  if (!isShirtMode?.value)
    provide('isShirtMode', sessionState.isShirtMode)

  if (!availableVotes?.value)
    provide('availableVotes', sessionState.availableVotes)

  return { isShirtMode, availableVotes }
}
