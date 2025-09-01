// 模拟的城市气象数据
export const cityWeatherData = {
  beijing: {
    id: 'beijing',
    name: '北京',
    temperature: 22,
    humidity: 65,
    windSpeed: 3.5,
    windDirection: 'NE',
    pressure: 1013,
    visibility: 15,
    uvIndex: 6,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 85,
      level: '良',
      pm25: 35,
      pm10: 55
    }
  },
  shanghai: {
    id: 'shanghai',
    name: '上海',
    temperature: 26,
    humidity: 78,
    windSpeed: 2.8,
    windDirection: 'SE',
    pressure: 1015,
    visibility: 12,
    uvIndex: 7,
    weather: '多云',
    weatherCode: 'cloudy',
    airQuality: {
      aqi: 92,
      level: '良',
      pm25: 42,
      pm10: 68
    }
  },
  guangzhou: {
    id: 'guangzhou',
    name: '广州',
    temperature: 29,
    humidity: 82,
    windSpeed: 1.5,
    windDirection: 'S',
    pressure: 1008,
    visibility: 8,
    uvIndex: 9,
    weather: '小雨',
    weatherCode: 'rainy',
    airQuality: {
      aqi: 78,
      level: '良',
      pm25: 28,
      pm10: 45
    }
  },
  shenzhen: {
    id: 'shenzhen',
    name: '深圳',
    temperature: 28,
    humidity: 80,
    windSpeed: 2.2,
    windDirection: 'SE',
    pressure: 1009,
    visibility: 10,
    uvIndex: 8,
    weather: '阴',
    weatherCode: 'overcast',
    airQuality: {
      aqi: 72,
      level: '良',
      pm25: 25,
      pm10: 42
    }
  },
  hangzhou: {
    id: 'hangzhou',
    name: '杭州',
    temperature: 24,
    humidity: 72,
    windSpeed: 2.0,
    windDirection: 'E',
    pressure: 1012,
    visibility: 14,
    uvIndex: 5,
    weather: '多云',
    weatherCode: 'cloudy',
    airQuality: {
      aqi: 88,
      level: '良',
      pm25: 38,
      pm10: 58
    }
  },
  nanjing: {
    id: 'nanjing',
    name: '南京',
    temperature: 23,
    humidity: 68,
    windSpeed: 3.2,
    windDirection: 'NE',
    pressure: 1014,
    visibility: 16,
    uvIndex: 6,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 82,
      level: '良',
      pm25: 32,
      pm10: 52
    }
  },
  wuhan: {
    id: 'wuhan',
    name: '武汉',
    temperature: 25,
    humidity: 75,
    windSpeed: 2.5,
    windDirection: 'SW',
    pressure: 1011,
    visibility: 11,
    uvIndex: 7,
    weather: '阴',
    weatherCode: 'overcast',
    airQuality: {
      aqi: 95,
      level: '良',
      pm25: 45,
      pm10: 72
    }
  },
  chengdu: {
    id: 'chengdu',
    name: '成都',
    temperature: 21,
    humidity: 85,
    windSpeed: 1.2,
    windDirection: 'W',
    pressure: 1006,
    visibility: 6,
    uvIndex: 4,
    weather: '雾',
    weatherCode: 'fog',
    airQuality: {
      aqi: 105,
      level: '轻度污染',
      pm25: 55,
      pm10: 85
    }
  },
  xian: {
    id: 'xian',
    name: '西安',
    temperature: 20,
    humidity: 58,
    windSpeed: 4.2,
    windDirection: 'NW',
    pressure: 1016,
    visibility: 18,
    uvIndex: 5,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 98,
      level: '良',
      pm25: 48,
      pm10: 75
    }
  },
  chongqing: {
    id: 'chongqing',
    name: '重庆',
    temperature: 27,
    humidity: 88,
    windSpeed: 1.8,
    windDirection: 'S',
    pressure: 1005,
    visibility: 7,
    uvIndex: 6,
    weather: '小雨',
    weatherCode: 'rainy',
    airQuality: {
      aqi: 89,
      level: '良',
      pm25: 36,
      pm10: 58
    }
  },
  tianjin: {
    id: 'tianjin',
    name: '天津',
    temperature: 21,
    humidity: 62,
    windSpeed: 3.8,
    windDirection: 'N',
    pressure: 1014,
    visibility: 13,
    uvIndex: 5,
    weather: '多云',
    weatherCode: 'cloudy',
    airQuality: {
      aqi: 91,
      level: '良',
      pm25: 41,
      pm10: 65
    }
  },
  qingdao: {
    id: 'qingdao',
    name: '青岛',
    temperature: 19,
    humidity: 76,
    windSpeed: 5.2,
    windDirection: 'E',
    pressure: 1018,
    visibility: 20,
    uvIndex: 4,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 65,
      level: '良',
      pm25: 22,
      pm10: 38
    }
  },
  dalian: {
    id: 'dalian',
    name: '大连',
    temperature: 18,
    humidity: 74,
    windSpeed: 4.8,
    windDirection: 'NE',
    pressure: 1019,
    visibility: 22,
    uvIndex: 4,
    weather: '多云',
    weatherCode: 'cloudy',
    airQuality: {
      aqi: 68,
      level: '良',
      pm25: 24,
      pm10: 42
    }
  },
  xiamen: {
    id: 'xiamen',
    name: '厦门',
    temperature: 26,
    humidity: 79,
    windSpeed: 3.5,
    windDirection: 'SE',
    pressure: 1010,
    visibility: 15,
    uvIndex: 8,
    weather: '多云',
    weatherCode: 'cloudy',
    airQuality: {
      aqi: 58,
      level: '良',
      pm25: 18,
      pm10: 32
    }
  },
  kunming: {
    id: 'kunming',
    name: '昆明',
    temperature: 22,
    humidity: 55,
    windSpeed: 2.8,
    windDirection: 'SW',
    pressure: 1012,
    visibility: 25,
    uvIndex: 7,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 45,
      level: '优',
      pm25: 15,
      pm10: 28
    }
  },
  harbin: {
    id: 'harbin',
    name: '哈尔滨',
    temperature: 15,
    humidity: 52,
    windSpeed: 4.5,
    windDirection: 'NW',
    pressure: 1020,
    visibility: 18,
    uvIndex: 3,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 78,
      level: '良',
      pm25: 28,
      pm10: 48
    }
  },
  changsha: {
    id: 'changsha',
    name: '长沙',
    temperature: 26,
    humidity: 81,
    windSpeed: 2.2,
    windDirection: 'S',
    pressure: 1009,
    visibility: 9,
    uvIndex: 6,
    weather: '小雨',
    weatherCode: 'rainy',
    airQuality: {
      aqi: 86,
      level: '良',
      pm25: 34,
      pm10: 55
    }
  },
  zhengzhou: {
    id: 'zhengzhou',
    name: '郑州',
    temperature: 24,
    humidity: 64,
    windSpeed: 3.0,
    windDirection: 'NE',
    pressure: 1013,
    visibility: 12,
    uvIndex: 6,
    weather: '多云',
    weatherCode: 'cloudy',
    airQuality: {
      aqi: 102,
      level: '轻度污染',
      pm25: 52,
      pm10: 78
    }
  },
  jinan: {
    id: 'jinan',
    name: '济南',
    temperature: 23,
    humidity: 59,
    windSpeed: 3.5,
    windDirection: 'N',
    pressure: 1015,
    visibility: 14,
    uvIndex: 5,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 88,
      level: '良',
      pm25: 38,
      pm10: 62
    }
  },
  taiyuan: {
    id: 'taiyuan',
    name: '太原',
    temperature: 19,
    humidity: 48,
    windSpeed: 4.8,
    windDirection: 'NW',
    pressure: 1017,
    visibility: 16,
    uvIndex: 4,
    weather: '晴',
    weatherCode: 'sunny',
    airQuality: {
      aqi: 115,
      level: '轻度污染',
      pm25: 62,
      pm10: 95
    }
  }
}

// 24小时历史数据模板
export const hourlyDataTemplate = {
  hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', 
          '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
          '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
  temperature: [],
  humidity: [],
  windSpeed: [],
  precipitation: []
}

// 7天天气预报模板
export const weeklyForecast = {
  dates: [],
  maxTemperature: [],
  minTemperature: [],
  weather: [],
  weatherCodes: []
}

// 天气图标映射
export const weatherIcons = {
  sunny: '☀️',
  cloudy: '⛅',
  overcast: '☁️',
  rainy: '🌧️',
  'heavy-rain': '⛈️',
  snow: '❄️',
  fog: '🌫️',
  windy: '💨'
}

// 空气质量等级映射
export const airQualityLevels = {
  '优': { color: '#00e400', range: [0, 50] },
  '良': { color: '#ffff00', range: [51, 100] },
  '轻度污染': { color: '#ff7e00', range: [101, 150] },
  '中度污染': { color: '#ff0000', range: [151, 200] },
  '重度污染': { color: '#8f3f97', range: [201, 300] },
  '严重污染': { color: '#7e0023', range: [301, 500] }
}

// 生成随机天气数据
export function generateRandomWeatherData(baseData) {
  const variation = 0.1 // 10%的变化幅度
  
  return {
    ...baseData,
    temperature: Math.round((baseData.temperature * (1 + (Math.random() - 0.5) * variation)) * 10) / 10,
    humidity: Math.max(20, Math.min(95, Math.round(baseData.humidity * (1 + (Math.random() - 0.5) * variation)))),
    windSpeed: Math.max(0, Math.round((baseData.windSpeed * (1 + (Math.random() - 0.5) * variation)) * 10) / 10),
    pressure: Math.round(baseData.pressure * (1 + (Math.random() - 0.5) * 0.02)),
    visibility: Math.max(1, Math.round(baseData.visibility * (1 + (Math.random() - 0.5) * 0.3)))
  }
}

// 获取城市天气数据
export function getCityWeatherData(cityId) {
  const data = cityWeatherData[cityId]
  if (!data) {
    console.warn(`未找到城市 ${cityId} 的天气数据`)
    return null
  }
  
  // 返回带有随机变化的数据
  return generateRandomWeatherData(data)
}

// 获取天气图标
export function getWeatherIcon(weatherCode) {
  return weatherIcons[weatherCode] || '❓'
}

// 生成每小时数据（简化版，只生成8小时）
export function generateHourlyData(cityCode) {
  const baseData = cityWeatherData[cityCode] || cityWeatherData.beijing
  const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
  const temperature = []
  const precipitation = []
  
  // 生成温度数据（基于当前温度的变化）
  for (let i = 0; i < 8; i++) {
    const variation = (Math.random() - 0.5) * 8 // ±4度变化
    temperature.push(Math.round((baseData.temperature + variation) * 10) / 10)
  }
  
  // 生成降水数据
  for (let i = 0; i < 8; i++) {
    if (baseData.weatherCode === 'rainy' || baseData.weatherCode === 'heavy-rain') {
      precipitation.push(Math.round(Math.random() * 10 * 10) / 10) // 0-10mm
    } else if (baseData.weatherCode === 'cloudy') {
      precipitation.push(Math.round(Math.random() * 3 * 10) / 10) // 0-3mm
    } else {
      precipitation.push(0)
    }
  }
  
  return {
    hours,
    temperature,
    precipitation
  }
}

// 生成7天预报数据
export function generateWeeklyForecast(cityCode) {
  const baseData = cityWeatherData[cityCode] || cityWeatherData.beijing
  const forecast = {
    dates: [],
    maxTemperature: [],
    minTemperature: [],
    weather: [],
    weatherCodes: []
  }
  
  const today = new Date()
  const weatherTypes = ['sunny', 'cloudy', 'overcast', 'rainy']
  const weatherNames = ['晴', '多云', '阴', '小雨']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    forecast.dates.push(date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }))
    
    // 生成最高最低温度
    const baseTemp = baseData.temperature + (Math.random() - 0.5) * 6
    const maxTemp = Math.round((baseTemp + Math.random() * 5) * 10) / 10
    const minTemp = Math.round((baseTemp - Math.random() * 8) * 10) / 10
    
    forecast.maxTemperature.push(maxTemp)
    forecast.minTemperature.push(minTemp)
    
    // 随机天气
    const weatherIndex = Math.floor(Math.random() * weatherTypes.length)
    forecast.weatherCodes.push(weatherTypes[weatherIndex])
    forecast.weather.push(weatherNames[weatherIndex])
  }
  
  return forecast
}