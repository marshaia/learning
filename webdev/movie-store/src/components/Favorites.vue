<template>
    <section class="text-gray-600 ">

        <button class="float-right h-8 mt-4 mr-4 font-medium text-white uppercase bg-green-500 w-28 hover:bg-green-900"
            @click="$router.push({ name: 'home' })">BACK</button>

        <div class="container px-5 py-10 mx-auto">

            <div class="flex flex-wrap w-full mb-10">
                <div class="w-full lg:w-1/2 lg:mb-0">
                    <h1 class="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl">My Favorites</h1>
                    <div class="h-1 bg-green-500 rounded w-44"></div>
                </div>
            </div>

            <div v-if="log.favorites.length !== 0" class="flex flex-wrap -m-4">
                <Movie v-for="id in log.favorites" :key="id" :movie="app.products.find(e => e.id === id)" />
            </div>

            <div v-else class="w-full leading-relaxed text-gray-500 lg:w-1/2">
                You have no favs :(
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import Movie from './Movie.vue'
import { setupLogin } from '../stores/loginStore'
import { appState } from '../stores/appState'

const app = appState()
const log = setupLogin()
log.bootLogin()

</script>