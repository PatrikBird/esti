<script setup lang='ts'>
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import { ref as dbRef, getDatabase } from 'firebase/database'

const db = getDatabase()
const route = '1234-session-ID-56789'

const todos = useDatabaseList(dbRef(db, route))
const someTodo = useDatabaseObject(dbRef(db, route))
const whatever = useDatabaseObject(dbRef(db))
</script>

<template>
  <div>
    <p class="my-6">
      root:
    </p>  {{ whatever }}
    <p class="my-6">
      some todo:
    </p>
    {{ someTodo }}
    <ul>
      <p class="my-6">
        list:
      </p>
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo }}</span>
      </li>
    </ul>
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
