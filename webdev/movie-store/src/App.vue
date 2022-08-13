<script setup lang="ts">
import { appState } from './stores/AppState'
import { setupLogin } from './stores/loginStore'

const app = appState()
app.bootStore()

const log = setupLogin()
log.bootLogin()

</script>

<template>
  <main>
    <router-view> </router-view>
  </main>
</template>
