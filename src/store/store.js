import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice.js';
import menu from './slices/menuSlice.js';

// 使用 import.meta.globEager 來同步加載所有 slice 文件
// 使用 import.meta.glob 動態加載所有 slice 文件
// const modules = import.meta.glob('./slices/*.js');
//
// // reducers 存儲所有的 reducer
// const reducers = {};
//
// // 為每個動態加載的模塊創建一個 Promise
// const promises = Object.keys(modules).map((path) => {
//   // 加載模塊
//   return modules[path]().then((module) => {
//     const sliceName = path.match(/\.\/slices\/(.*)\.js$/)[1];
//     reducers[sliceName] = module.default;
//   });
// });
// console.log(reducers);

export const store = configureStore({
  reducer: {
    auth,
    menu,
  },
});
