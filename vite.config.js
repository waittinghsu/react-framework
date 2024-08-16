import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
const __dirname = path.resolve();

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/react-framework/' : '/', //這邊換成你的專案名
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'src/mock', // 指定存放 mock 文件的目录
        localEnabled: mode === 'development', // 这个选项设置为 true 以在开发时启用 mock
        prodEnabled: mode === 'production', // 在生产环境中禁用 mock
        injectFile: 'src/main.js', // 將代碼注入到 main.js 確保生產環境可用
        injectCode: `
          import { setupProdMockServer } from './mock';
          setupProdMockServer();
        `,
        delay: 3000, // 设置响应延迟时间，单位为毫秒
      }),
    ],
    server: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    preview: {
      port: 9527,
      historyApiFallback: true,
    },
  };
});
