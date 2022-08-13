<template>
    <div class="p-4 xl:w-1/4 md:w-1/2 hover:bg-gray-300" @click="movieDetail" @keydown="movieDetail">
        <div class="p-6 bg-gray-100 rounded-lg">
            <object type="image/png" :data=movie.posterUrl :title="movie.title">
                <img src="https://i.pinimg.com/736x/8b/9a/ab/8b9aabc3524870c8821d00aa1190f858.jpg"
                    alt="alternative image" />
            </object>

            <h3 class="text-xs font-medium tracking-widest text-green-500 ">TITLE</h3>
            <h2 class="mb-4 text-lg font-medium text-gray-900 ">{{ movie.title }}</h2>
            <p class="text-base leading-relaxed">{{ movie.plot }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IMovie } from '../stores/AppState'
import { useRouter } from 'vue-router';

const router = useRouter()

interface Props {
    movie: IMovie,
}

const props = defineProps<Props>();


const movieDetail = () => {
    router.push('/movie/' + props.movie.id)
}

</script>
