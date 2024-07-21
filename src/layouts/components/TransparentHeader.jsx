import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import logo from '@/icons/logo.svg';
const { SubMenu } = Menu;

const navLinks = [
  { path: '/demo/default-page', label: 'Omega Page' },
  { path: '/demo/color', label: 'Color Page' },
  { path: '/demo/icon', label: 'Icon Page' },
];

const TransparentHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-[1px] p-4 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* 左侧标题或 Logo */}
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-8 w-24 mr-4" />
        </div>

        {/* 中间的导航栏 */}
        <nav className="hidden md:flex justify-center flex-grow">
          <ul className="flex space-x-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-lg hover:text-green-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 右侧用户头像 */}
        <div className="hidden md:flex items-center">
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>
    </header>
  );
};

export default TransparentHeader;
