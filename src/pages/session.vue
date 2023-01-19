<script setup lang='ts'>
import { useCollection, useDatabaseList, useDatabaseObject, useDocument } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'
import { collection, doc, getFirestore } from 'firebase/firestore'
import { FSdb } from '../modules/firebase'

const coll = useCollection(collection(FSdb, 'someID'))
const docc = useDocument(doc(collection(FSdb, 'someID'), 'voteState'))
// console.log(coll)
// console.log(docc)

// const route = '1234-session-ID-56789'
// const db = getDatabase()
// const todos = useDatabaseList(dbRef(db, route))
// const someTodo = useDatabaseObject(dbRef(db, route))

// console.log(todos)
// console.log(someTodo)
</script>

<template>
  <div>
    <p>something here?</p>
    <p>whole collection: {{ coll }}</p>
    <p>just a single doc: {{ docc }}</p>
  </div>
  <VoteCards
    :available-votes="[
      '0',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '20',
      '40',
      '100',
      '?',
    ]"
    :coffee="true"
  />
  <TheButtons />
  <TheTable />
</template>
