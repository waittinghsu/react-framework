import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './router';
import 'antd/dist/reset.css'; // 引入 Ant Design 的樣式文件
import './styles/index.scss'; // 引入 Tailwind CSS 的 SCSS 文件

// 取得根節點
const container = document.getElementById('root');
const root = createRoot(container);

// 使用 createRoot 初始化應用
root.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
);
