import { defineStore } from "pinia";


interface Login {
    loggedIn: boolean,
    token: string,
    favorites: number[],
}

export const setupLogin = defineStore('login', {
    state: (): Login => {
        return {
            loggedIn: false,
            token: "",
            favorites: [],
        }
    },

    actions: {
        bootLogin() {
            const tmpLog = localStorage.getItem('loginToken')
            if (tmpLog) {
                this.token = tmpLog
                this.loggedIn = true
                fetch('/likes', {
                    method: 'GET',
                    headers: {
                        authorization: JSON.stringify(this.token)
                    }
                })
                    .then(resp => resp.json())
                    .then(prods => { this.favorites = prods })
            }
        },

        setOn() {
            this.loggedIn = true;
            const tmpLog = localStorage.getItem('loginToken')
            if (tmpLog) this.token = tmpLog
            fetch('/likes', {
                method: 'GET',
                headers: {
                    authorization: JSON.stringify(this.token)
                }
            })
                .then(resp => resp.json())
                .then(prods => this.favorites = prods)
        },

        turnOff() {
            this.loggedIn = false
            this.token = ""
            this.favorites = []
            localStorage.removeItem('loginToken')
        },

        addMovieToFavorites(ID: number) {
            fetch('/likes', {
                method: 'POST',
                headers: {
                    authorization: JSON.stringify(this.token)
                },
                body: JSON.stringify(ID)
            })
                .then(e => {
                    if (e.status === 200) window.alert('Movie added to your favorites!')
                    else window.alert('Sorry, something went wrong...')
                })
        },

        // this is not a solution, was just an idea to a feature! 
        removeMovie(ID: number) {
            this.favorites = this.favorites.filter(e => e !== ID)
        }
    }
})