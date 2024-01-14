export function useCollectionID() {
  const route = useRoute()
  const collectionID = route.params.sessionID as string

  return { collectionID }
}
