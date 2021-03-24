import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'select2/dist/css/select2.css'
import 'select2/dist/js/select2'
import './assets/css/main.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';






import router from "@/router";
const app = createApp(App)
app.use(VueSweetalert2)
app.use(router)
app.mount('#app')

