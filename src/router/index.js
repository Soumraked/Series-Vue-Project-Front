import Vue from 'vue'
import VueRouter from 'vue-router'
import Serie from '../views/Serie.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'LastChapter',
    component: () => import('../views/LastChapter.vue')
  },
  {
    path: '/anime',
    name: 'Serie',
    component: Serie
  },
  {
    path: '/serie/:id',
    name: 'SerieDetails',
    component: () => import('../views/SerieDetails.vue')
  },
  {
    path: '/serie/:id/:number',
    name: 'SerieVideo',
    component: () => import('../views/SerieVideo.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/admin2',
    name: 'Admin2',
    component: () => import('../views/Admin2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
