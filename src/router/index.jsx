import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import DefaultPage from '../pages/DefaultPage/DefaultPage.jsx';
import ColorPage from '../pages/ColorPage';
import IconPage from '../pages/IconPage';
import DayOne from '../pages/DayOne/DayOne';
import MainLayout from '../layouts/MainLayout';
import BDLayout from '../layouts/BDLayout';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="demo/default-page" />} />

      {/* 使用 MainLayout 的頁面 */}
      <Route path="demo" element={<MainLayoutWrapper />}>
        <Route index path="default-page" element={<DefaultPage />} />
        <Route path="day-one" element={<DayOne />} />
      </Route>

      {/* 使用 BDLayout 的頁面 */}
      <Route path="demo" element={<BDLayoutWrapper />}>
        <Route path="color" element={<ColorPage />} />
        <Route path="icon" element={<IconPage />} />
      </Route>
    </Routes>
  </Router>
);

const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const BDLayoutWrapper = () => (
  <BDLayout>
    <Outlet />
  </BDLayout>
);

export default AppRouter;
