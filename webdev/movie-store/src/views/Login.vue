<template>
  <!-- template from: https://tailwindcomponents.com/component/login-form-20 -->
  <div class='flex items-center justify-center w-screen h-screen bg-gray-200'>
    <div class="w-64 px-6 py-3 border rounded">
      <div class="flex flex-col items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="green"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h2 class="text-2xl font-bold text-green-700">Login</h2>
      </div>
      <form action="#" method="POST">
        <!-- username -->
        <div class="flex flex-col my-2">
          <label for="username" class="text-xs text-gray-400">Username</label>
          <div :class="`flex items-center justify-between text-xs text-red-400 ${error ? '' : 'hidden'}`">
            <span>
              <b>Error: </b>
              wrong username !
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <input v-model="user" name="username" class="px-3 py-1 mt-2 border rounded" type="text"
            placeholder="username" />
        </div>
        <div class="flex flex-col my-2">
          <label for="password" class="text-xs text-gray-400">Password</label>
          <input v-model="pass" name="password" class="px-3 py-1 mt-2 border rounded" type="password"
            placeholder="password" />
        </div>
        <div class="flex flex-col items-center justify-center my-3">
          <button class="w-full py-1 my-3 text-white bg-green-400 rounded hover:bg-green-900" @click="submitLogin">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setupLogin } from '../stores/loginStore'

const log = setupLogin()
const error = ref<boolean>(false);
const token = ref<string>("")
const user = ref<string>('')
const pass = ref<string>('')
const router = useRouter()



const submitLogin = (e: Event) => {
  e.preventDefault();
  login(user.value, pass.value)
}


function login(user: string, pass: string) {
  fetch('/login', {
    method: 'POST',
    headers: { "content-type": "aplication/json" },
    body: JSON.stringify({
      username: user,
      password: pass
    })
  })
    .then(e => {
      // Authentication didnt work
      if (e.status == 401) { error.value = true }

      else if (e.status == 200) { // Worked just fine
        e.json().then(tk => {
          token.value = tk.token
          localStorage.setItem('loginToken', JSON.stringify(token.value))
          log.setOn()
          router.push({ name: 'home' })
        })
      }
    })
    .catch(error => { console.log(error) })
}

</script>
