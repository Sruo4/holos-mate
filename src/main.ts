import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSeedling, faPersonWalking, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// fontawesome
library.add(faSeedling, faPersonWalking, faHeartCircleCheck)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
