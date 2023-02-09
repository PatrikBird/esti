<script setup lang='ts'>
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

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
    <icon:mdi:delete class="inline-block h-5 w-5" />
  </table-action-btn>
</template>
