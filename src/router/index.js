import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GenerarRFC from '../views/GenerarRFC.vue'
import PuntoDeVenta from '../views/PuntoDeVenta.vue'
import EmpleadoView from '@/views/EmpleadoView.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/rfc', component: GenerarRFC },
  { path: '/ventas', component: PuntoDeVenta },
  { path: '/empleados', component: EmpleadoView }  // 👈 Nueva ruta
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
