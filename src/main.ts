import './styles/main.css'
import './styles/tailwind.css'

import enJson from './locales/en.json'

import { createHead } from '@unhead/vue/client'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

i18next.init({
  lng: 'en',
  ns: 'translation',
  showSupportNotice: false,
  resources: { en: { translation: enJson } },
})

createApp(App)
  .use(router)
  .use(I18NextVue, { i18next })
  .use(createPinia())
  .use(createHead())
  .mount('#app')
