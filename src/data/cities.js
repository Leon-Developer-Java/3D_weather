// 中国主要城市数据
export const cities = [
  {
    id: 'beijing',
    name: '北京',
    province: '北京市',
    longitude: 116.4074,
    latitude: 39.9042,
    landmark: '天安门广场',
    flyHeight: 80000
  },
  {
    id: 'shanghai',
    name: '上海',
    province: '上海市',
    longitude: 121.4737,
    latitude: 31.2304,
    landmark: '外滩',
    flyHeight: 60000
  },
  {
    id: 'guangzhou',
    name: '广州',
    province: '广东省',
    longitude: 113.2644,
    latitude: 23.1291,
    landmark: '珠江',
    flyHeight: 50000
  },
  {
    id: 'shenzhen',
    name: '深圳',
    province: '广东省',
    longitude: 114.0579,
    latitude: 22.5431,
    landmark: '深圳湾',
    flyHeight: 45000
  },
  {
    id: 'hangzhou',
    name: '杭州',
    province: '浙江省',
    longitude: 120.1551,
    latitude: 30.2741,
    landmark: '西湖',
    flyHeight: 40000
  },
  {
    id: 'nanjing',
    name: '南京',
    province: '江苏省',
    longitude: 118.7969,
    latitude: 32.0603,
    landmark: '中山陵',
    flyHeight: 40000
  },
  {
    id: 'wuhan',
    name: '武汉',
    province: '湖北省',
    longitude: 114.2985,
    latitude: 30.5844,
    landmark: '黄鹤楼',
    flyHeight: 45000
  },
  {
    id: 'chengdu',
    name: '成都',
    province: '四川省',
    longitude: 104.0668,
    latitude: 30.5728,
    landmark: '宽窄巷子',
    flyHeight: 50000
  },
  {
    id: 'xian',
    name: '西安',
    province: '陕西省',
    longitude: 108.9402,
    latitude: 34.3416,
    landmark: '兵马俑',
    flyHeight: 45000
  },
  {
    id: 'chongqing',
    name: '重庆',
    province: '重庆市',
    longitude: 106.5516,
    latitude: 29.5630,
    landmark: '洪崖洞',
    flyHeight: 50000
  },
  {
    id: 'tianjin',
    name: '天津',
    province: '天津市',
    longitude: 117.1901,
    latitude: 39.1235,
    landmark: '天津之眼',
    flyHeight: 40000
  },
  {
    id: 'qingdao',
    name: '青岛',
    province: '山东省',
    longitude: 120.3826,
    latitude: 36.0671,
    landmark: '栈桥',
    flyHeight: 35000
  },
  {
    id: 'dalian',
    name: '大连',
    province: '辽宁省',
    longitude: 121.6147,
    latitude: 38.9140,
    landmark: '星海广场',
    flyHeight: 35000
  },
  {
    id: 'xiamen',
    name: '厦门',
    province: '福建省',
    longitude: 118.1689,
    latitude: 24.4797,
    landmark: '鼓浪屿',
    flyHeight: 30000
  },
  {
    id: 'kunming',
    name: '昆明',
    province: '云南省',
    longitude: 102.8329,
    latitude: 24.8801,
    landmark: '滇池',
    flyHeight: 45000
  },
  {
    id: 'harbin',
    name: '哈尔滨',
    province: '黑龙江省',
    longitude: 126.5358,
    latitude: 45.8023,
    landmark: '中央大街',
    flyHeight: 40000
  },
  {
    id: 'changsha',
    name: '长沙',
    province: '湖南省',
    longitude: 112.9388,
    latitude: 28.2282,
    landmark: '橘子洲',
    flyHeight: 40000
  },
  {
    id: 'zhengzhou',
    name: '郑州',
    province: '河南省',
    longitude: 113.6254,
    latitude: 34.7466,
    landmark: '少林寺',
    flyHeight: 40000
  },
  {
    id: 'jinan',
    name: '济南',
    province: '山东省',
    longitude: 117.0009,
    latitude: 36.6758,
    landmark: '趵突泉',
    flyHeight: 35000
  },
  {
    id: 'taiyuan',
    name: '太原',
    province: '山西省',
    longitude: 112.5489,
    latitude: 37.8706,
    landmark: '晋祠',
    flyHeight: 35000
  }
]

// 根据ID获取城市信息
export function getCityById(id) {
  return cities.find(city => city.id === id)
}

// 根据名称获取城市信息
export function getCityByName(name) {
  return cities.find(city => city.name === name)
}

// 模糊搜索城市
export function searchCities(query) {
  if (!query || query.trim() === '') {
    return cities
  }
  
  const searchTerm = query.toLowerCase().trim()
  return cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm) ||
    city.province.toLowerCase().includes(searchTerm) ||
    city.landmark.toLowerCase().includes(searchTerm)
  )
}

// 获取随机城市
export function getRandomCity() {
  const randomIndex = Math.floor(Math.random() * cities.length)
  return cities[randomIndex]
}

// 获取指定省份的城市
export function getCitiesByProvince(province) {
  return cities.filter(city => city.province === province)
}

// 获取所有省份列表
export function getProvinces() {
  const provinces = [...new Set(cities.map(city => city.province))]
  return provinces.sort()
}