<script setup lang="ts">
import { useDatabaseList } from 'vuefire'
import { ref as dbRef, getDatabase, ref, set } from 'firebase/database'

const db = getDatabase()
// set(ref(db, `users/${123}`), {
//   username: 'whatever',
//   email: 'whatever@menubar.com',
// })
const users = useDatabaseList(ref(db, 'users'))
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <p>user id: {{ user.id }}</p>
      <p>user name: {{ user.username }}</p>
      <p>user email: {{ user.email }}</p>
    </li>
  </ul>
</template>
