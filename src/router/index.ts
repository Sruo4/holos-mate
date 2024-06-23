import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'


import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import SearchIndex from '../views/SearchIndex.vue'
import ProfileView from '../views/ProfileView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchIndex
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsPage.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/DetailPage.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesPage.vue')
    },
  ]
})

// 如果用户未登录，则重定向到登录页面
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name !== 'login' && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
