<template>
  <div class="cesium-container">
    <div ref="cesiumContainer" class="cesium-viewer" :style="{ height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as Cesium from 'cesium'
import { cities } from '../data/cities.js'

// Props
interface Props {
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '100%'
})

// 组件引用
const cesiumContainer = ref<HTMLElement>()
let viewer: Cesium.Viewer | null = null

// 初始化Cesium
const initCesium = () => {
  if (!cesiumContainer.value) return

  // 创建Cesium Viewer
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    // 基础配置
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    
    // 地形和影像
    terrainProvider: Cesium.createWorldTerrain(),
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/'
    }),
    
    // 场景配置
    skyBox: new Cesium.SkyBox({
      sources: {
        positiveX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        negativeX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        positiveY: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        negativeY: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        positiveZ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        negativeZ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      }
    }),
    
    // 禁用默认的双击行为
    cesiumWidget: {
      creditContainer: undefined
    }
  })

  // 设置初始相机位置（鹰眼效果）
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(104.0, 35.0, 15000000), // 中国中心上空
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-90), // 俯视角度
      roll: 0.0
    }
  })

  // 禁用默认的相机控制器
  viewer.scene.screenSpaceCameraController.enableRotate = true
  viewer.scene.screenSpaceCameraController.enableTranslate = true
  viewer.scene.screenSpaceCameraController.enableZoom = true
  viewer.scene.screenSpaceCameraController.enableTilt = true
  viewer.scene.screenSpaceCameraController.enableLook = true

  // 添加OSM建筑物
  const osmBuildings = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(96188)
    })
  )

  // 添加城市标记
  addCityMarkers()

  console.log('Cesium初始化完成')
}

// 添加城市标记
const addCityMarkers = () => {
  if (!viewer) return

  cities.forEach(city => {
    const position = Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude, 1000)
    
    // 为北京添加特殊的五角星标记
    if (city.id === 'beijing') {
      viewer!.entities.add({
        position: position,
        point: {
          pixelSize: 15,
          color: Cesium.Color.YELLOW,
          outlineColor: Cesium.Color.RED,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
        label: {
          text: `⭐ ${city.name}`,
          font: '14pt sans-serif',
          fillColor: Cesium.Color.YELLOW,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -50),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
    } else {
      // 其他城市使用普通圆点
      viewer!.entities.add({
        position: position,
        point: {
          pixelSize: 10,
          color: Cesium.Color.CYAN,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
        label: {
          text: city.name,
          font: '12pt sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -30),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
    }
  })
}

// 飞行到指定城市
const flyToCity = (city: any) => {
  if (!viewer) return

  const destination = Cesium.Cartesian3.fromDegrees(
    city.longitude, 
    city.latitude, 
    city.flyHeight || 50000
  )

  viewer.camera.flyTo({
    destination: destination,
    orientation: {
      heading: 0.0,
      pitch: Cesium.Math.toRadians(-45),
      roll: 0.0
    },
    duration: 3.0
  })

  console.log(`飞行到${city.name}`)
}

// 暴露方法给父组件
defineExpose({
  flyToCity
})

// 组件挂载
onMounted(() => {
  // 延迟初始化，确保DOM已渲染
  setTimeout(() => {
    initCesium()
  }, 100)
})

// 组件卸载
onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
})
</script>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.cesium-viewer {
  width: 100%;
  height: 100%;
}

/* 隐藏Cesium的版权信息 */
:deep(.cesium-widget-credits) {
  display: none !important;
}

/* 隐藏Cesium的logo */
:deep(.cesium-viewer-bottom) {
  display: none !important;
}
</style>