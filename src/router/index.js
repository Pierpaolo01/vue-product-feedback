import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feedback from '../views/Feedback.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedback/:id',
    name: 'Feedback',
    component: Feedback,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
