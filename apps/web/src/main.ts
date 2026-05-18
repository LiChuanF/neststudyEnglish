import './assets/base.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import elementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import focusPlugin from './directives/focus'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(elementPlus, {
    locale: zhCn,
})
app.use(router)
app.use(focusPlugin) // 使用 focus 指令
app.mount('#app')
