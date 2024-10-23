import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),  // 配置 @ 指向 src 目录
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        // 支持通过配置解析不同 CSS 文件
        additionalData: `@import "element-plus/theme-chalk/index.css";`,
      },
    },
  },
  server: {
    proxy: {
      '/admin': {
        target: 'http://43.138.213.55:8080', // 后端服务的地址
        changeOrigin: true, // 支持虚拟托管
        logLevel: 'debug', // 添加日志级别
        // rewrite: (path) => path.replace(/^\/admin/, ''), // 重写路径
      },
      '/cdcStaff': {
        target: 'http://43.138.213.55:8080', // 后端服务的地址
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/medicalStaff': {
        target: 'http://43.138.213.55:8080', // 后端服务的地址
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/common': {
        target: 'http://43.138.213.55:8080', // 后端服务的地址
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/user': {
        target: 'http://43.138.213.55:8080', // 后端服务的地址
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
});
