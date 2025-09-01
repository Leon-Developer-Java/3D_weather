<template>
  <header class="header-bar" :class="{ 'light-theme': !isDarkTheme }">
    <!-- 左侧：时间和位置 -->
    <div class="header-left">
      <div class="time-display">
        <span class="current-time">{{ currentTime }}</span>
        <span class="current-date">{{ currentDate }}</span>
      </div>
      <div class="location-info">
        <span class="location-icon">📍</span>
        <span class="location-text">{{ currentLocation }}</span>
      </div>
    </div>
    
    <!-- 中间：城市选择和天气摘要 -->
    <div class="header-center">
      <div class="city-selector" @click="toggleCityDropdown">
        <span class="city-name">{{ selectedCity.name }}</span>
        <span class="dropdown-arrow" :class="{ 'open': showCityDropdown }">▼</span>
        
        <!-- 城市下拉菜单 -->
        <div class="city-dropdown" v-show="showCityDropdown">
          <div class="dropdown-search">
            <input 
              type="text" 
              v-model="citySearchQuery" 
              placeholder="搜索城市..."
              @input="filterCities"
              class="search-input"
            />
          </div>
          <div class="dropdown-list">
            <div 
              v-for="city in filteredCities" 
              :key="city.id"
              class="dropdown-item"
              :class="{ 'active': city.id === selectedCity.id }"
              @click="selectCity(city)"
            >
              <span class="city-name">{{ city.name }}</span>
              <span class="city-province">{{ city.province }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="weather-summary">
        <span class="weather-icon">{{ weatherIcon }}</span>
        <span class="temperature">{{ currentTemperature }}°C</span>
        <span class="weather-desc">{{ weatherDescription }}</span>
      </div>
    </div>
    
    <!-- 右侧：控制按钮 -->
    <div class="header-right">
      <button class="control-btn" @click="handleRefresh" title="刷新数据">
        <span class="btn-icon">🔄</span>
      </button>
      
      <button class="control-btn" @click="toggleTheme" title="切换主题">
        <span class="btn-icon">{{ isDarkTheme ? '🌙' : '☀️' }}</span>
      </button>
      
      <button class="control-btn" @click="toggleFullscreen" title="全屏">
        <span class="btn-icon">{{ isFullscreen ? '🗗' : '🗖' }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { cities, getCityById, searchCities } from '../data/cities.js'

// Props
interface Props {
  currentTemperature?: number
  weatherDescription?: string
  weatherIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentTemperature: 22,
  weatherDescription: '晴',
  weatherIcon: '☀️'
})

// Emits
const emit = defineEmits<{
  'refresh-data': []
  'toggle-theme': [theme: string]
  'location-change': [location: string]
  'city-change': [city: any]
}>()

// 状态管理
const isDarkTheme = ref(true)
const isFullscreen = ref(false)
const currentTime = ref('')
const currentDate = ref('')
const currentLocation = ref('中国')

// 城市选择相关状态
const showCityDropdown = ref(false)
const citySearchQuery = ref('')
const selectedCity = ref(getCityById('beijing') || cities[0])
const filteredCities = ref(cities)

// 计算属性
const weatherIcon = computed(() => props.weatherIcon)
const currentTemperature = computed(() => props.currentTemperature)
const weatherDescription = computed(() => props.weatherDescription)

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 切换城市下拉菜单
const toggleCityDropdown = () => {
  showCityDropdown.value = !showCityDropdown.value
  if (showCityDropdown.value) {
    citySearchQuery.value = ''
    filteredCities.value = cities
  }
}

// 过滤城市
const filterCities = () => {
  if (!citySearchQuery.value.trim()) {
    filteredCities.value = cities
  } else {
    filteredCities.value = searchCities(citySearchQuery.value)
  }
}

// 选择城市
const selectCity = (city: any) => {
  selectedCity.value = city
  showCityDropdown.value = false
  citySearchQuery.value = ''
  emit('city-change', city)
}

// 刷新数据
const handleRefresh = () => {
  emit('refresh-data')
}

// 切换主题
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  emit('toggle-theme', isDarkTheme.value ? 'dark' : 'light')
}

// 全屏切换
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (!target.closest('.city-selector')) {
    showCityDropdown.value = false
  }
}

// 组件挂载
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  
  // 监听全屏事件
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  
  // 监听点击外部事件
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.header-bar {
  height: 60px;
  background: rgba(0, 20, 40, 0.95);
  border-bottom: 1px solid rgba(0, 150, 255, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-bar.light-theme {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

/* 左侧区域 */
.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.time-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.current-time {
  color: #00d4ff;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.current-date {
  color: #aaa;
  font-size: 12px;
  margin-top: 2px;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ccc;
  font-size: 14px;
}

.location-icon {
  font-size: 16px;
}

/* 中间区域 */
.header-center {
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 2;
  justify-content: center;
}

.city-selector {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 100, 200, 0.2);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.city-selector:hover {
  background: rgba(0, 150, 255, 0.3);
  border-color: rgba(0, 150, 255, 0.5);
}

.city-name {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.dropdown-arrow {
  color: #00d4ff;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.city-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 30, 60, 0.95);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 8px;
  margin-top: 4px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  max-height: 300px;
  overflow: hidden;
}

.dropdown-search {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 150, 255, 0.2);
}

.search-input {
  width: 100%;
  background: rgba(0, 50, 100, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 4px;
  padding: 6px 10px;
  color: #fff;
  font-size: 12px;
  outline: none;
}

.search-input::placeholder {
  color: #aaa;
}

.search-input:focus {
  border-color: rgba(0, 150, 255, 0.6);
  background: rgba(0, 50, 100, 0.5);
}

.dropdown-list {
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(0, 150, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-item:hover {
  background: rgba(0, 150, 255, 0.2);
}

.dropdown-item.active {
  background: rgba(0, 150, 255, 0.3);
}

.dropdown-item .city-name {
  color: #fff;
  font-size: 13px;
}

.dropdown-item .city-province {
  color: #aaa;
  font-size: 11px;
}

.weather-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 100, 200, 0.2);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 8px;
  padding: 8px 15px;
}

.weather-icon {
  font-size: 20px;
}

.temperature {
  color: #00d4ff;
  font-size: 18px;
  font-weight: 600;
}

.weather-desc {
  color: #ccc;
  font-size: 14px;
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
}

.control-btn {
  background: rgba(0, 100, 200, 0.2);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(0, 150, 255, 0.3);
  border-color: rgba(0, 150, 255, 0.5);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 16px;
  color: #00d4ff;
}

/* 浅色主题适配 */
.header-bar.light-theme .current-time {
  color: #0066cc;
}

.header-bar.light-theme .current-date,
.header-bar.light-theme .location-info,
.header-bar.light-theme .weather-desc {
  color: #666;
}

.header-bar.light-theme .city-selector,
.header-bar.light-theme .weather-summary,
.header-bar.light-theme .control-btn {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.1);
}

.header-bar.light-theme .city-name,
.header-bar.light-theme .temperature {
  color: #333;
}

.header-bar.light-theme .dropdown-arrow,
.header-bar.light-theme .btn-icon {
  color: #0066cc;
}
</style>