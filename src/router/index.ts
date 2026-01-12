import DetailView from '@/components/DetailView.vue'
import HomeView from '@/components/HomeView.vue'
import ListView from '@/components/ListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path:'/records/new',
    name: 'new',
    component: HomeView
  },
  {
    path:'/records',
    name: 'list',
    component: ListView
  },
  {
    path: '/records/:id',
    name: 'detail',
    component: DetailView,
    props:true,
  },
  {
    path: '/records/:id/edit',
    name: 'edit',
    component: HomeView,
    props:true,

  }],
})

export default router
