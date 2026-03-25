import { createRouter, createWebHistory } from 'vue-router'
import PlayView from '../views/PlayView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/play',
      name: 'play',
      component: PlayView
    }
  ]
})

export default router