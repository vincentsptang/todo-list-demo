import './assets/main.css'

import { createApp, type Component } from 'vue'
import { createPinia } from 'pinia'

// element plus dependency and its css file
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const appComponent: Component = App
const app = createApp(appComponent)

app.use(createPinia())
app.use(router)

// use element plus UI library
app.use(ElementPlus)

app.mount('#app')
