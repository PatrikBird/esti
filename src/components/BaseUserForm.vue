<script setup lang='ts'>
const formIsSending = ref(false)

function sentForm() {
  formIsSending.value = true
  console.log('sentForm')
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-14 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-2xl font-bold tracking-tight">
        <span class="text-blue-600">esti</span>mate
      </h1>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
        <slot name="headline" />
      </h2>
      <p class="mt-2 text-center text-sm">
        Or
        <slot name="link" />
        <!-- <RouterLink to="/new" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-400">
          create a new session
        </RouterLink> -->
      </p>
    </div>

    <div class="mx-auto mt-8 w-full max-w-md">
      <div class="rounded-lg bg-zinc-50 py-8 px-10 shadow-xl dark:bg-zinc-700">
        <form class="space-y-6" @submit.prevent="sentForm">
          <div>
            <slot name="formInput" />
            <!-- <label for="id" class="block text-left text-sm font-medium">Session ID</label>
            <div class="mt-1">
              <input
                id="id"
                v-model="mainStore.session.id"
                name="id"
                type="text"
                required
                class="block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700/5 dark:bg-zinc-800 dark:focus:border-blue-500"
              >
            </div>
            <UsernameInput v-model="enteredName" class="mt-1" /> -->
          </div>

          <div class="flex items-center justify-center">
            <!-- <GenericToggle off="Voter" on="Observer" @is-active="(e) => isObserver = e" /> -->
            <slot name="formToggle" />
          </div>

          <!-- <FormButton
            btn-text="Join session"
            :form-sending="formIsSending"
            :name-is-valid="nameIsValid"
            :entered-name-too-long="enteredNameTooLong"
          /> -->
          <slot name="formButton" />
        </form>
      </div>
    </div>
  </div>
</template>
