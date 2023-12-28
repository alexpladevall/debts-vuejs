// Composables
import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticatedGuard from '@/guards/auth.guard';

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('@/views/Auth/SignUp.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('@/views/Auth/SignIn.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
