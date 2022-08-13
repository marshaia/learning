import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      name: 'home',
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      name: 'login',
    },
    {
      path: '/movie/:id',
      component: () => import('@/components/MovieDetails.vue'),
      name: 'moviedetail',
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('loginToken')
        if (!token) next('/login')
        else next()
      }
    },
    {
      path: '/favorites',
      component: () => import('@/components/Favorites.vue'),
      name: 'favorites',
    },
  ],
});

export default router;