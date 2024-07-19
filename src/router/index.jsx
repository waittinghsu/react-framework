import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultPage from '../pages/DefaultPage';
import ColorPage from '../pages/ColorPage';
import IconPage from '../pages/IconPage';
import MainLayout from '../layouts/MainLayout';

const AppRouter = () => (
		<Router>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Navigate to="demo/default-page" />} />
					<Route path="demo/default-page" element={<DefaultPage />} />
					<Route path="demo/color" element={<ColorPage />} />
					<Route path="demo/icon" element={<IconPage />} />
				</Routes>
			</MainLayout>
		</Router>
);

export default AppRouter;
