import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GenerarRFC from '../views/GenerarRFC.vue'
import PuntoDeVenta from '../views/PuntoDeVenta.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/rfc', component: GenerarRFC },
  { path: '/ventas', component: PuntoDeVenta },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
