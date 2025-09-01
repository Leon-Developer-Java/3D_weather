# 3D Weather Dashboard

基于 Vue 3 + Cesium 的3D气象数据可视化大屏系统

## 项目特性

- 🌍 基于 Cesium 的3D地球展示
- 🌤️ 实时气象数据可视化
- 🎨 现代化UI设计，支持深色/浅色主题
- 📱 响应式布局，适配多种屏幕
- 🚀 Vue 3 + TypeScript + Vite 技术栈
- 📊 ECharts 图表集成

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **3D引擎**: Cesium
- **构建工具**: Vite
- **语言**: TypeScript
- **状态管理**: Pinia
- **路由**: Vue Router
- **图表**: Vue-ECharts
- **样式**: CSS3 + 渐变动画

## 项目设置

```sh
npm install
```

### 开发环境运行

```sh
npm run dev
```

### 类型检查

```sh
npm run type-check
```

### 生产构建

```sh
npm run build
```

### 单元测试

```sh
npm run test:unit
```

### 代码检查

```sh
npm run lint
```

## 功能特性

### 🌍 3D地球视图
- 基于Cesium的高性能3D地球渲染
- 支持地形、建筑物、卫星影像
- 流畅的相机控制和飞行动画
- 城市标记和天气信息展示

### 🌤️ 气象数据
- 多城市实时天气数据
- 温度、湿度、风速、气压等指标
- 24小时历史数据趋势
- 7天天气预报
- 空气质量指数

### 🎨 用户界面
- 科技感十足的深色主题
- 流畅的动画效果
- 响应式设计
- 全屏模式支持
- 实时时间显示

### 📊 数据可视化
- 温度趋势图表
- 降水量柱状图
- 实时数据卡片
- 风速风向指示器

## 项目结构

```
src/
├── components/          # Vue组件
│   ├── HeaderBar.vue   # 顶部导航栏
│   └── CesiumViewer.vue # 3D地球组件
├── data/               # 数据文件
│   ├── cities.js       # 城市数据
│   └── mockWeatherData.js # 模拟气象数据
├── router/             # 路由配置
├── stores/             # Pinia状态管理
└── App.vue            # 主应用组件
```

## 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 开发说明

### Cesium配置
项目已配置Cesium静态资源复制，构建时会自动将Cesium资源复制到dist目录。

### 环境变量
- `CESIUM_BASE_URL`: Cesium资源基础路径

### 性能优化
- 使用Vite的代码分割
- Cesium单独打包
- 静态资源预加载

## 许可证

MIT License