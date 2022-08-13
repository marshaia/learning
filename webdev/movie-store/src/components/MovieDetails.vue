<template>
    <button class="float-right h-8 mt-4 mr-4 font-medium text-white uppercase bg-green-500 w-28 hover:bg-green-900"
        @click="$router.push({ name: 'home' })">home</button>

    <div v-if="movie">
        <div class="flex items-center min-h-screen bg-gray-50">
            <div class="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                <div class="flex flex-col md:flex-row">
                    <div class="h-32 md:h-auto md:w-1/2">
                        <object type="image/png" :data=movie.posterUrl :title="movie.title">
                            <img src="https://i.pinimg.com/736x/8b/9a/ab/8b9aabc3524870c8821d00aa1190f858.jpg"
                                alt="alternative image" />
                        </object>
                    </div>
                    <div class="flex items-center justify-center p-6 sm:p-12 ">
                        <div class="w-full">
                            <div class="flex justify-start">
                                <h2 class="text-lg font-bold tracking-widest text-green-500 ">TITLE</h2>
                                <h2 class="mb-4 ml-2 text-lg font-bold text-gray-900 ">{{ movie.title }} ({{ movie.year
                                }})
                                </h2>
                            </div>
                            <div class="flex justify-start">
                                <h3 class="text-lg font-bold tracking-widest text-green-500 ">PLOT</h3>
                                <h3 class="mb-4 ml-2 text-sm font-normal text-gray-900 ">{{ movie.plot }}</h3>
                            </div>

                            <div class="flex justify-start">
                                <h3 class="text-xs font-bold tracking-widest text-green-500 ">ACTORS</h3>
                                <h3 class="mb-4 ml-2 text-sm font-normal text-gray-900 ">{{ movie.actors }}</h3>
                            </div>

                            <div class="flex justify-start">
                                <h3 class="text-xs font-bold tracking-widest text-green-500 ">Director</h3>
                                <h3 class="mb-4 ml-2 text-sm font-normal text-gray-900 ">{{ movie.director }}</h3>
                            </div>

                            <div class="flex justify-start">
                                <h3 class="text-xs font-bold tracking-widest text-green-500 ">Runtime</h3>
                                <h3 class="mb-4 ml-2 text-sm font-normal text-gray-900 ">{{ movie.runtime }} min</h3>
                            </div>

                            <div class="flex justify-start">
                                <h3 class="text-xs font-bold tracking-widest text-green-500 ">Genres</h3>
                                <h3 v-for="genre in movie.genres" :key="genre"
                                    class="mb-4 ml-2 text-sm font-normal text-gray-900 ">
                                    {{ genre }} </h3>
                            </div>


                        </div>
                    </div>
                    <div class="float-right">
                        <button v-if="!log.favorites.includes(Number(idObj))"
                            class="mt-4 mr-4 font-medium text-white uppercase w-28"
                            @click="log.addMovieToFavorites(Number(idObj))">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="favoritesButton"
                                class="w-8 h-8" /></button>
                        <button v-else class="mt-4 mr-4 font-medium text-white uppercase w-28"
                            @click="log.removeMovie(Number(idObj))">
                            <img src="https://cdn-icons.flaticon.com/png/512/484/premium/484662.png?token=exp=1656681183~hmac=42b6db23368721a54a0e958b06a49e46"
                                alt="removeFavoritesButton" class="w-8 h-8" /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="mt-20 font-bold text-center text-black ">
        SORRY! movie not found...
    </div>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { appState } from '../stores/AppState'
import { setupLogin } from '../stores/loginStore'
import { useRoute } from 'vue-router';

const idObj = useRoute().params.id.toString()
const app = appState()
const movie = computed(() => {
    return app.products.find(product => product.id === Number(idObj))
})
const log = setupLogin()
</script>

