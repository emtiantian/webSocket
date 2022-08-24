import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app =createApp(App)
app.mount('#app')

if (process.env.NODE_ENV === 'development') {
  app.config.performance = true;
}