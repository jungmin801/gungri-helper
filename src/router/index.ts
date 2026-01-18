
import DetailView from '@/components/deatils/DetailView.vue'
import HelpView from '@/components/help/HelpView.vue'
import ListView from '@/components/list/ListView.vue'
import HomeView from '@/components/practice/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   { path: '/', redirect: '/practice' },  
  {
    path:'/practice',
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
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView,
  }],
})

export default router
