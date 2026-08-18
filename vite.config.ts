import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'

// 纯前端工具：base 设为 './'，构建产物可放到任意目录/静态托管直接打开
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入 Vue API（移植自猫步简历的素材组件依赖此能力）
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局注入样式变量（移植自猫步简历的素材组件依赖这些 SCSS 变量）
        additionalData: '@use "@/style/global.scss" as *;',
      },
    },
  },
})
