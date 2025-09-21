import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue y estilos
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'           // ← Añadir esto
import ConfirmationService from 'primevue/confirmationservice' // ← Añadir esto

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)        // ← Añadir esto
app.use(ConfirmationService) // ← Añadir esto

app.mount('#app')