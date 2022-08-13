# **🍿 Movies Night**

## **Installation**

Make sure you have `node` and `npm` installed and run the following command:

```bash
npm install
```

## **Run the project**

Run the following command:

```bash
npm run dev
```

**NOTE:** This app uses Typescript, Tailwind CSS, Vue.js framework and JWT (JSON Web Token). 

## **Key features of the site**:

### *Homepage*

- When opening the site you should see the list of movies (poster + name)
- You should be able to filter movies by genre
- You can sort my movies by name, run time, year
- You should see a list of your favorite movies

### *Movie details page*

- If you click on a movie you're be redirected to the movie page
- In the movie details page you can see all info about the movie (genres, director, actors, run time, description, poster, title)

### *Login Page*

- You can login to the site with your username and password (possible usernames and passwords for testing purposes are available on server's database)
- Login action will create and store a token on local storage used to assess user's rights when accessing certain pages.

### *Favorite movies*

- To add a movie to your favorites, there's fave a button in the Movies details page.