import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'src/mock', // 指定存放 mock 文件的目录
      localEnabled: true,   // 这个选项设置为 true 以在开发时启用 mock
      prodEnabled: true,   // 在生产环境中禁用 mock
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
