import { defineStore } from "pinia";

export const appState = defineStore('store', {
    state: (): StoreState => {
        return {
            products: [],
        }
    },

    actions: {
        bootStore() {
            fetch('/movies', { method: 'GET' })
                .then(resp => resp.json())
                .then(prods => this.products = prods)
        },
        orderByName(mode: string): void {
            if (mode === 'a') this.products.sort((a: IMovie, b: IMovie) => a.title.localeCompare(b.title))
            else this.products.sort((a: IMovie, b: IMovie) => b.title.localeCompare(a.title))
        },
        orderByRunTime(mode: string): void {
            if (mode === 'a') this.products.sort((a: IMovie, b: IMovie) => a.runtime - b.runtime)
            else this.products.sort((a: IMovie, b: IMovie) => b.runtime - a.runtime)
        },
        orderByYear(mode: string): void {
            if (mode === 'a') this.products.sort((a: IMovie, b: IMovie) => a.year - b.year)
            else this.products.sort((a: IMovie, b: IMovie) => b.year - a.year)
        },
        filterMovies(event: Event, filter: string): void {
            event.preventDefault();
            this.products = this.products.filter(e => e.genres.includes(filter))
        },
    }
})


interface StoreState {
    products: IMovie[]
}


export interface IMovie {
    id: number,
    title: string,
    year: number,
    runtime: number,
    genres: string[],
    director: string,
    actors: string,
    plot: string,
    posterUrl: string,
}