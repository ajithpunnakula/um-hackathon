import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import DynamicDialog from 'primevue/dynamicdialog'
import StyleClass from 'primevue/styleclass'
import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/tailwind.css'
import './assets/base.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Make router globally available
app.config.globalProperties.$router = router

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

app.directive('styleclass', StyleClass)
app.component('DynamicDialog', DynamicDialog)

app.mount('#app')
