import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HomeView from '@/views/HomeView.vue'
import DetalleView from '@/views/DetalleView.vue'
import AboutView from '@/views/AboutView.vue'

import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import FavoritosView from '../views/FavoritosView.vue'
import PerfilView from '../views/PerfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/detalle/:id',
      name: 'detalle',
      component: DetalleView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }
})


export default router
