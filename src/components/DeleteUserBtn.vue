<script setup lang='ts'>
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{ userId: string }>()
const hoveredUserID = ref('')
const mainStore = useMainStore()

function removeUser(userID: string) {
  deleteDoc(doc(db, mainStore.session.id, userID))
}
</script>

<template>
  <table-action-btn
    title="Delete User"
    @click="removeUser(userId)"
    @mouseover="hoveredUserID = userId"
    @mouseleave="hoveredUserID = ''"
  >
    <icon:mdi:delete
      v-show="hoveredUserID !== userId"
      class="inline-block h-5 w-5"
    />
    <icon:mdi:delete-forever
      v-show="hoveredUserID === userId"
      class="inline-block h-5 w-5"
    />
  </table-action-btn>
</template>
