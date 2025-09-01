<template>
  <div class="weather-dashboard" :class="{ 'light-theme': !isDarkTheme }">
    <!-- 顶部导航栏 -->
    <HeaderBar 
      @refresh-data="handleRefreshData"
      @toggle-theme="handleToggleTheme"
      @location-change="handleLocationChange"
      @city-change="handleCityChange"
      :current-temperature="weatherData.current.temperature"
      :weather-description="getCurrentWeatherDescription()"
      :weather-icon="getCurrentWeatherIcon()"
    />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 全屏3D地球 -->
      <section class="cesium-container">
        <CesiumViewer ref="cesiumRef" height="100%" />
        
        <!-- 左侧滑出面板控制按钮 -->
        <div class="panel-trigger" @click="togglePanelDrawer">
          <div class="trigger-button" :class="{ active: showPanelDrawer }">
            <div class="trigger-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <!-- 滑出式面板容器 -->
         <div class="panel-drawer" :class="{ open: showPanelDrawer }">
           <div class="drawer-content">
             <!-- 温度趋势 & 降水量 -->
             <div class="section-title">温度趋势 & 降水量</div>
             <div class="chart-section">
               <div class="mini-charts">
                 <div class="mini-chart">
                   <h4>温度(°C)</h4>
                   <div class="chart-data">
                     <div class="data-points">
                       <span v-for="(temp, index) in weatherData.temperature.slice(-4)" :key="index" 
                             class="data-point" :style="{ height: (temp / 30 * 100) + '%' }">
                         {{ temp }}
                       </span>
                     </div>
                   </div>
                 </div>
                 <div class="mini-chart">
                   <h4>降水量(mm)</h4>
                   <div class="chart-data">
                     <div class="data-bars">
                       <span v-for="(rain, index) in weatherData.precipitation.slice(-4)" :key="index" 
                             class="data-bar" :style="{ height: (rain / 10 * 100) + '%' }">
                         {{ rain }}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             <!-- 实时气象数据 -->
             <div class="section-title">实时气象数据</div>
             <div class="weather-cards">
               <div class="weather-card">
                 <div class="card-icon">🌡️</div>
                 <div class="card-content">
                   <div class="card-title">温度</div>
                   <div class="card-value">{{ weatherData.current.temperature }}°C</div>
                   <div class="card-trend" :class="temperatureTrend.class">{{ temperatureTrend.text }}</div>
                 </div>
               </div>
               
               <div class="weather-card">
                 <div class="card-icon">💧</div>
                 <div class="card-content">
                   <div class="card-title">湿度</div>
                   <div class="card-value">{{ weatherData.current.humidity.toFixed(2) }}%</div>
                   <div class="card-description">{{ getHumidityDescription(weatherData.current.humidity) }}</div>
                 </div>
               </div>
               
               <div class="weather-card">
                 <div class="card-icon">📊</div>
                 <div class="card-content">
                   <div class="card-title">气压</div>
                   <div class="card-value">{{ weatherData.current.pressure }} hPa</div>
                   <div class="card-description">正常</div>
                 </div>
               </div>
               
               <div class="weather-card">
                 <div class="card-icon">👁️</div>
                 <div class="card-content">
                   <div class="card-title">能见度</div>
                   <div class="card-value">{{ weatherData.current.visibility }} km</div>
                   <div class="card-description">良好</div>
                 </div>
               </div>
             </div>
             
             <!-- 风速风向 -->
             <div class="section-title">风速风向</div>
             <div class="wind-info">
               <div class="wind-display">
                 <div class="wind-compass">🧭</div>
                 <div class="wind-details">
                   <div class="wind-speed">风速: {{ weatherData.current.windSpeed }} m/s</div>
                   <div class="wind-direction">风向: {{ weatherData.current.windDirection }}</div>
                   <div class="wind-description">{{ getWindDescription(weatherData.current.windSpeed) }}</div>
                 </div>
               </div>
             </div>
             
             <!-- 温湿度变化 -->
             <div class="section-title">温湿度变化</div>
             <div class="humidity-info">
               <div class="temp-humidity-display">
                 <div class="temp-section">
                   <span class="label">温度</span>
                   <span class="value">{{ weatherData.current.temperature }}°C</span>
                 </div>
                 <div class="humidity-section">
                   <span class="label">湿度</span>
                   <span class="value">{{ weatherData.current.humidity.toFixed(2) }}%</span>
                 </div>
               </div>
               <div class="comfort-index">舒适度: {{ getHumidityDescription(weatherData.current.humidity) }}</div>
               <div class="update-time">{{ weatherData.updateTime }}</div>
             </div>
           </div>
         </div>
      </section>
    </main>
    
    <!-- 加载遮罩 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>正在加载气象数据...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import CesiumViewer from './components/CesiumViewer.vue'
import { getCityWeatherData, generateHourlyData } from './data/mockWeatherData.js'

// 组件引用
const cesiumRef = ref()

// 状态管理
const isDarkTheme = ref(true)
const isLoading = ref(true)

// 滑出面板控制状态
const showPanelDrawer = ref(false)

// 气象数据状态
const weatherData = reactive({
  // 温度趋势数据
  hours: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  temperature: [12, 10, 8, 15, 22, 25, 20, 16],
  precipitation: [0, 2, 5, 1, 0, 3, 8, 4],
  
  // 实时气象数据
  current: {
    temperature: 22,
    humidity: 65,
    windSpeed: 3.5,
    pressure: 1013,
    visibility: 15,
    uvIndex: 6,
    windDirection: '东北风',
    weather: '晴',
    weatherCode: 'sunny'
  },
  
  // 更新时间
  updateTime: ''
})

// 计算属性
const temperatureTrend = computed(() => {
  const current = weatherData.current.temperature
  const previous = weatherData.temperature[weatherData.temperature.length - 2] || current
  const diff = current - previous
  if (diff > 1) return { text: '↗ 上升', class: 'trend-up' }
  if (diff < -1) return { text: '↘ 下降', class: 'trend-down' }
  return { text: '→ 稳定', class: 'trend-stable' }
})

const getHumidityDescription = (humidity: number): string => {
  if (humidity < 30) return '干燥'
  if (humidity < 60) return '舒适'
  if (humidity < 80) return '潮湿'
  return '非常潮湿'
}

const getWindDescription = (windSpeed: number): string => {
  if (windSpeed < 2) return '无风'
  if (windSpeed < 6) return '微风'
  if (windSpeed < 12) return '和风'
  if (windSpeed < 20) return '强风'
  return '大风'
}

// 切换滑出面板显示
const togglePanelDrawer = () => {
  showPanelDrawer.value = !showPanelDrawer.value
}

// 处理数据刷新
const handleRefreshData = () => {
  console.log('刷新气象数据')
  // 这里可以调用各个组件的刷新方法
  // 模拟数据加载
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

// 处理主题切换
const handleToggleTheme = (theme: string) => {
  isDarkTheme.value = theme === 'dark'
  console.log('切换主题:', theme)
}

// 处理位置变化
const handleLocationChange = (location: string) => {
  console.log('位置变化:', location)
  // 这里可以更新地图视角到新位置
}

// 处理城市变化
const handleCityChange = (city: any) => {
  console.log('城市变化:', city)
  
  // 关闭左侧信息栏
  showPanelDrawer.value = false
  
  // 更新天气数据
  updateWeatherDataForCity(city)
  
  // 调用Cesium组件的飞行方法
  if (cesiumRef.value && cesiumRef.value.flyToCity) {
    cesiumRef.value.flyToCity(city)
  }
}

// 更新气象数据
const updateWeatherData = () => {
  // 模拟数据更新
  const baseTemp = weatherData.current.temperature
  weatherData.current.temperature = Math.round((baseTemp + (Math.random() - 0.5) * 4) * 10) / 10
  weatherData.current.humidity = Math.max(20, Math.min(90, weatherData.current.humidity + (Math.random() - 0.5) * 10))
  weatherData.current.windSpeed = Math.max(0, Math.round((weatherData.current.windSpeed + (Math.random() - 0.5) * 2) * 10) / 10)
  
  // 更新时间
  const now = new Date()
  weatherData.updateTime = `更新时间: ${now.toLocaleTimeString()}`
}

// 更新时间
const updateCurrentTime = () => {
  const now = new Date()
  weatherData.updateTime = `更新时间: ${now.toLocaleTimeString()}`
}

// 根据城市更新天气数据
const updateWeatherDataForCity = (city: any) => {
  const cityData = getCityWeatherData(city.id)
  const hourlyData = generateHourlyData(city.id)
  
  if (cityData) {
    // 更新当前天气数据
    weatherData.current.temperature = cityData.temperature
    weatherData.current.humidity = cityData.humidity
    weatherData.current.windSpeed = cityData.windSpeed
    weatherData.current.pressure = cityData.pressure
    weatherData.current.visibility = cityData.visibility
    weatherData.current.uvIndex = cityData.uvIndex
    weatherData.current.windDirection = getWindDirectionText(cityData.windDirection)
    
    // 存储原始天气信息用于显示
    weatherData.current.weather = cityData.weather
    weatherData.current.weatherCode = cityData.weatherCode
    
    // 更新温度趋势和降水量数据
    weatherData.hours = hourlyData.hours
    weatherData.temperature = hourlyData.temperature
    weatherData.precipitation = hourlyData.precipitation
    
    // 更新时间戳
    updateCurrentTime()
    
    console.log(`已更新${city.name}的天气数据:`, cityData)
  }
}

// 风向转换
const getWindDirectionText = (direction: string) => {
  const windMap: { [key: string]: string } = {
    'N': '北风',
    'NE': '东北风', 
    'E': '东风',
    'SE': '东南风',
    'S': '南风',
    'SW': '西南风',
    'W': '西风',
    'NW': '西北风'
  }
  return windMap[direction] || '无风向'
}

// 获取当前天气描述
const getCurrentWeatherDescription = () => {
  // 优先使用实际天气数据
  if (weatherData.current.weather) {
    return weatherData.current.weather
  }
  
  // 备用：根据温度返回描述
  const temp = weatherData.current.temperature
  if (temp >= 30) return '炎热'
  if (temp >= 25) return '温暖'
  if (temp >= 20) return '舒适'
  if (temp >= 15) return '凉爽'
  if (temp >= 10) return '寒冷'
  return '严寒'
}

// 获取当前天气图标
const getCurrentWeatherIcon = () => {
  // 天气图标映射
  const weatherIcons: { [key: string]: string } = {
    sunny: '☀️',
    cloudy: '⛅',
    overcast: '☁️',
    rainy: '🌧️',
    'heavy-rain': '⛈️',
    snow: '❄️',
    fog: '🌫️',
    windy: '💨'
  }
  
  // 优先使用实际天气代码
  if (weatherData.current.weatherCode && weatherIcons[weatherData.current.weatherCode]) {
    return weatherIcons[weatherData.current.weatherCode]
  }
  
  // 备用：根据温度和湿度判断
  const temp = weatherData.current.temperature
  const humidity = weatherData.current.humidity
  
  if (humidity > 80) return '🌧️'
  if (humidity > 60) return '☁️'
  if (temp >= 25) return '☀️'
  if (temp >= 15) return '⛅'
  return '❄️'
}



// 键盘快捷键
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'F11':
      event.preventDefault()
      // 全屏切换已在HeaderBar中处理
      break
    case 'r':
    case 'R':
      if (event.ctrlKey) {
        event.preventDefault()
        handleRefreshData()
      }
      break

  }
}

// 组件挂载
onMounted(() => {
  // 初始化时间
  updateCurrentTime()
  
  // 模拟初始加载
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)
  
  // 定时更新数据
  setInterval(updateWeatherData, 10000) // 每10秒更新数据
  setInterval(updateCurrentTime, 1000) // 每秒更新时间
})

// 组件卸载
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
  font-family: 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}

#app {
  height: 100%;
}
</style>

<style scoped>
.weather-dashboard {
  height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.weather-dashboard.light-theme {
  background: linear-gradient(135deg, #f0f2f5 0%, #e6e9ed 50%, #f0f2f5 100%);
}

.main-content {
  flex: 1;
  height: calc(100vh - 60px);
  overflow: hidden;
}

.cesium-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 左侧触发按钮 */
.panel-trigger {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1001;
  cursor: pointer;
}

.trigger-button {
  background: rgba(0, 20, 40, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.2);
  border-left: none;
  border-radius: 0 12px 12px 0;
  padding: 16px 10px;
  transition: all 0.4s ease;
  backdrop-filter: blur(8px);
}

.trigger-button:hover {
  background: rgba(0, 150, 255, 0.15);
  border-color: rgba(0, 150, 255, 0.4);
  transform: translateX(3px);
}

.trigger-lines {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 18px;
}

.trigger-lines span {
  height: 2px;
  background: rgba(0, 212, 255, 0.7);
  border-radius: 1px;
  transition: all 0.3s ease;
}

.trigger-lines span:nth-child(1) {
  width: 100%;
}

.trigger-lines span:nth-child(2) {
  width: 75%;
}

.trigger-lines span:nth-child(3) {
  width: 50%;
}

.trigger-button.active .trigger-lines span {
  background: rgba(255, 100, 100, 0.8);
}

.trigger-button.active .trigger-lines span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.trigger-button.active .trigger-lines span:nth-child(2) {
  opacity: 0;
}

.trigger-button.active .trigger-lines span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
  width: 100%;
}

/* 滑出面板容器 */
.panel-drawer {
  position: absolute;
  top: 0;
  left: -380px;
  width: 360px;
  height: 100%;
  background: rgba(0, 30, 60, 0.75);
  border-right: 1px solid rgba(100, 180, 255, 0.4);
  backdrop-filter: blur(15px);
  transition: left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1000;
  overflow: hidden;
}

.panel-drawer.open {
  left: 0;
}

.drawer-content {
  padding: 25px 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* 分区标题样式 */
.section-title {
  color: #66ccff;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 15px 0;
  padding: 10px 15px;
  background: rgba(100, 180, 255, 0.15);
  border-left: 4px solid #66ccff;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 8px rgba(100, 180, 255, 0.1);
}

/* 图表区域 */
.chart-section {
  background: rgba(50, 120, 180, 0.2);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid rgba(100, 180, 255, 0.3);
  margin-bottom: 10px;
}

.mini-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.mini-chart {
  text-align: center;
}

.mini-chart h4 {
  color: #66ccff;
  font-size: 12px;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.chart-data {
  height: 80px;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 8px;
}

.data-points, .data-bars {
  display: flex;
  align-items: end;
  gap: 6px;
  height: 100%;
}

.data-point {
  background: linear-gradient(to top, #ff6b6b, #ff8e8e);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px 3px 0 0;
  min-height: 20px;
  display: flex;
  align-items: end;
  justify-content: center;
  width: 25px;
  transition: all 0.3s ease;
}

.data-bar {
  background: linear-gradient(to top, #4ecdc4, #44a08d);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px 3px 0 0;
  min-height: 15px;
  display: flex;
  align-items: end;
  justify-content: center;
  width: 25px;
  transition: all 0.3s ease;
}

/* 气象卡片 */
.weather-cards {
  display: grid;
  gap: 10px;
}

.weather-card {
  background: rgba(50, 120, 180, 0.2);
  border-radius: 8px;
  padding: 12px;
  border: 1px solid rgba(100, 180, 255, 0.3);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.weather-card:hover {
  background: rgba(100, 180, 255, 0.2);
  transform: translateX(3px);
}

.card-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 30px;
  text-align: center;
}

.card-content {
  flex: 1;
}

.card-title {
  color: #ccc;
  font-size: 11px;
  margin-bottom: 4px;
}

.card-value {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}

.card-description {
  color: #aaa;
  font-size: 10px;
}

.card-trend {
  font-size: 10px;
  font-weight: 500;
}

.trend-up {
  color: #ff6b6b;
}

.trend-down {
  color: #4ecdc4;
}

.trend-stable {
  color: #feca57;
}

/* 风速湿度区域 */
.wind-humidity-section {
  background: rgba(50, 120, 180, 0.2);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid rgba(100, 180, 255, 0.3);
  margin-bottom: 10px;
}

.wind-humidity-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.wind-item, .humidity-item {
  text-align: center;
  padding: 10px;
  background: rgba(80, 150, 200, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(100, 180, 255, 0.2);
}

.wind-item h4, .humidity-item h4 {
  color: #66ccff;
  font-size: 12px;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.wind-value, .humidity-value {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.wind-direction, .humidity-description {
  color: #aaa;
  font-size: 11px;
  margin-bottom: 8px;
}

.compass {
  font-size: 18px;
  margin: 4px 0;
}

.wind-info, .humidity-info {
  background: rgba(50, 120, 180, 0.2);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid rgba(100, 180, 255, 0.3);
  margin-bottom: 10px;
}

.wind-display {
  display: flex;
  align-items: center;
  gap: 15px;
}

.wind-compass {
  font-size: 24px;
}

.wind-details {
  flex: 1;
  text-align: left;
}

.wind-speed, .wind-direction, .wind-description {
  color: #fff;
  font-size: 13px;
  margin: 4px 0;
}

.temp-humidity-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.temp-section, .humidity-section {
  text-align: center;
}

.temp-section .label, .humidity-section .label {
  color: #aaa;
  font-size: 11px;
  display: block;
  margin-bottom: 4px;
}

.temp-section .value, .humidity-section .value {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.comfort-index {
  color: #66ccff;
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
}

.update-time {
  color: #aaa;
  font-size: 10px;
  text-align: center;
}

/* 加载遮罩 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: #00ffff;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 255, 255, 0.3);
  border-top: 3px solid #00ffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  font-size: 16px;
  margin: 0;
}
</style>