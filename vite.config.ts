import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/Cesium/**/*',
          dest: 'cesium'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium/')
  },
  assetsInclude: ['**/*.gltf', '**/*.glb'],
  server: {
    fs: {
      allow: ['..', 'node_modules/cesium']
    }
  },
  optimizeDeps: {
    include: ['cesium']
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          cesium: ['cesium']
        }
      }
    }
  }
})