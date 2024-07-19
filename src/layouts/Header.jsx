import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './styles/Header.scss';

const Header = () => {
	return (
			<header className="header">
				<Menu mode="horizontal" theme="dark">
					<Menu.Item key="default">
						<Link to="/demo/default-page">Default Page</Link>
					</Menu.Item>
					<Menu.Item key="color">
						<Link to="/demo/color">Color</Link>
					</Menu.Item>
					<Menu.Item key="icon">
						<Link to="/demo/icon">Icon</Link>
					</Menu.Item>
				</Menu>
			</header>
	);
};

export default Header;
