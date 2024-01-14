<script setup lang='ts'>
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/modules/firebase'

const props = defineProps<{ userID: string }>()
const hoveredUserID = ref('')
const mainStore = useMainStore()

function removeUser(userID: string) {
  deleteDoc(doc(db, mainStore.session.id, userID))
}
</script>

<template>
  <table-action-btn
    title="Delete User"
    @click="removeUser(props.userID)"
    @mouseover="hoveredUserID = props.userID"
    @mouseleave="hoveredUserID = ''"
  >
    <span
      v-show="hoveredUserID !== props.userID"
      i-mdi:delete
      class="inline-block h-5 w-5"
    />
    <span
      v-show="hoveredUserID === props.userID"
      i-mdi:delete-forever
      class="inline-block h-5 w-5"
    />
  </table-action-btn>
</template>
