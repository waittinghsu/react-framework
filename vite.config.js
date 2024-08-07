import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
const __dirname = path.resolve();

export default defineConfig({
  // base: '', //這邊換成你的專案名
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'src/mock', // 指定存放 mock 文件的目录
      localEnabled: true, // 这个选项设置为 true 以在开发时启用 mock
      prodEnabled: true, // 在生产环境中禁用 mock
      delay: 3000, // 设置响应延迟时间，单位为毫秒
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
