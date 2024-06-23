import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 配置根路径
  base: './',
  plugins: [
    vue(),
    
  ],
  // 配置开发服务器, 代理请求到后端服务
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173, // 可以自定义端口号，确保它没有被其他应用占用
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
