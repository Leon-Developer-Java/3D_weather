import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import Cesium CSS
import 'cesium/Build/Cesium/Widgets/widgets.css'

// Import and register vue-echarts
import ECharts from 'vue-echarts'

// Set Cesium base URL
;(window as any).CESIUM_BASE_URL = '/cesium/'

const app = createApp(App)

// Register vue-echarts component globally
app.component('v-chart', ECharts)

app.use(createPinia())
app.use(router)

app.mount('#app')