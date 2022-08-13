/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from 'msw';
import moviesDB from './db';

const USER_MOVIES_LIKES_KEY = 'USER_MOVIES_LIKES_KEY';

const initialLikesState = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};

const savedLikes = localStorage.getItem(USER_MOVIES_LIKES_KEY);

const userLikes = savedLikes ? JSON.parse(savedLikes) : initialLikesState;

function parseJwt(token: string): Record<any, any> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const getMovies = () => {
  return rest.get('/movies', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesDB.movies));
  });
};

const getGenres = () => {
  return rest.get('/genres', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesDB.genres));
  });
};

const getLogin = () => {
  return rest.post('/login', (req, res, ctx) => {
    if (!req.body) {
      return res(ctx.status(400));
    }

    const { username, password } = req.body as any;

    const user = moviesDB.users.find(
      (user) => user.name === username && user.pwd === password
    );

    if (!user) {
      return res(ctx.status(401));
    }

    return res(ctx.status(200), ctx.json(user));
  });
};

const likeMovie = () => {
  return rest.post('/likes', (req, res, ctx) => {
    const token = req.headers.get('authorization');

    if (!req.body || !token) {
      return res(ctx.status(400));
    }

    const parsedToken = parseJwt(token);

    if (!parsedToken || !parsedToken.id) {
      return res(ctx.status(400));
    }

    const user = moviesDB.users.find(
      (user) => user.id === Number(parsedToken.id)
    );

    if (!user) {
      return res(ctx.status(400));
    }

    const movieId = req.body as any;

    if (!userLikes[user.id]) {
      userLikes[user.id] = [];
    }

    const movie = moviesDB.movies.find((movie) => movie.id === Number(movieId));

    if (!movie) {
      return res(ctx.status(400));
    }

    userLikes[user.id] = [...new Set([...userLikes[user.id], Number(movieId)])];

    localStorage.setItem(USER_MOVIES_LIKES_KEY, JSON.stringify(userLikes));

    return res(ctx.status(200), ctx.json(userLikes[user.id]));
  });
};

const getMyLikes = () => {
  return rest.get('/likes', (req, res, ctx) => {
    const token = req.headers.get('authorization');

    if (!token) {
      return res(ctx.status(400));
    }

    const parsedToken = parseJwt(token);

    if (!parsedToken || !parsedToken.id) {
      return res(ctx.status(400));
    }

    const user = moviesDB.users.find(
      (user) => user.id === Number(parsedToken.id)
    );

    if (!user) {
      return res(ctx.status(400));
    }

    return res(ctx.status(200), ctx.json(userLikes[user.id]));
  });
};

export const handlers = [
  getMovies(),
  getGenres(),
  getLogin(),
  likeMovie(),
  getMyLikes(),
];
