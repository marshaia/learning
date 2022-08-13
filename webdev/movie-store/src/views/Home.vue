<template>
  <section class="text-gray-600 ">
    <div v-if="!log.loggedIn">
      <button class="float-right h-8 mt-4 mr-4 font-medium text-white uppercase bg-green-500 w-28 hover:bg-green-900"
        @click="$router.push({ name: 'login' })">LOGIN</button>
    </div>
    <div v-else>
      <button class="float-right h-8 mt-4 mr-4 font-medium text-white uppercase bg-red-500 w-28 hover:bg-red-900"
        @click="log.turnOff">LOGOUT</button>
      <button class="float-right w-8 h-8 mt-4 mr-4 font-medium text-white uppercase hover:bg-gray-200"
        @click="$router.push({ name: 'favorites' })">
        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="favoritesButton"
          class="w-8 h-8" /></button>
    </div>


    <div class="container px-5 py-10 mx-auto">

      <div class="flex flex-wrap w-full mb-2">
        <div class="w-full mb-6 lg:w-1/2 lg:mb-0">
          <h1 class="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl">Welcome to Movies Night 🍿
          </h1>
          <div class="h-1 bg-green-500 rounded w-96"></div>
        </div>
      </div>


      <div class="flex mb-10">
        <h1 class="mt-2 ml-4 text-xl font-bold">Sort By:</h1>

        <button
          class="justify-center h-8 mt-4 ml-6 font-medium text-white uppercase duration-75 bg-blue-600 hover:bg-blue-900 w-28"
          @click.prevent="app.orderByName('a')">
          NAME ↑
        </button>
        <button
          class="justify-center w-10 h-8 mt-4 font-medium text-white uppercase duration-75 bg-blue-600 hover:bg-blue-900"
          @click.prevent="app.orderByName('d')">
          ↓
        </button>

        <button
          class="justify-center h-8 mt-4 ml-6 font-medium text-white uppercase bg-orange-600 w-28 hover:bg-orange-900"
          @click.prevent="app.orderByRunTime('a')">
          RUNTIME ↑
        </button>
        <button
          class="justify-center w-10 h-8 mt-4 font-medium text-white uppercase duration-75 bg-orange-600 hover:bg-orange-900"
          @click.prevent="app.orderByRunTime('b')">
          ↓
        </button>

        <button class="justify-center h-8 mt-4 ml-6 font-medium text-white uppercase bg-pink-600 w-28 hover:bg-pink-900"
          @click.prevent="app.orderByYear('a')"> YEAR ↑
        </button>
        <button
          class="justify-center w-10 h-8 mt-4 font-medium text-white uppercase duration-75 bg-pink-600 hover:bg-pink-900"
          @click.prevent="app.orderByYear('b')">
          ↓
        </button>


        <form id="filterForm" action="#" @submit="app.filterMovies($event, filter)">
          <label for="cheese"></label>
          <input id="filterFormInput" v-model="filter" type="text" class="h-8 mt-4 ml-20 border-2 border-green-600 "
            placeholder="  Filter by Genre">
        </form>
        <button class="justify-center h-8 mt-4 font-medium text-white uppercase bg-green-600 w-28 hover:bg-green-900"
          @click.prevent="app.bootStore"> reset
        </button>

      </div>


      <div v-if="app.products !== null" class="flex flex-wrap -m-4">
        <Movie v-for="movie in app.products" :key="movie.id" :movie="movie" />
      </div>
      <div v-else class="w-full leading-relaxed text-gray-500 lg:w-1/2">
        No movies available right now :(
      </div>

    </div>
  </section>
</template>



<script setup lang="ts">
import { appState } from '../stores/AppState'
import { setupLogin } from '../stores/loginStore'
import Movie from '../components/Movie.vue'
import { ref } from 'vue'

const app = appState()
const log = setupLogin()
const filter = ref('')

</script>
