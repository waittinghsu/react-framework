import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import NavBar from './NavBar.jsx';
import '../styles/Header.scss';

const BDHeader = () => {
  const items = [
    {
      label: <Link to="/demo/default-page">Default Page</Link>,
      key: 'default',
    },
    {
      label: <Link to="/demo/color">Color</Link>,
      key: 'color',
    },
    {
      label: <Link to="/demo/icon">Icon</Link>,
      key: 'icon',
    },
  ];

  return (
    <header className="header">
      <NavBar />
    </header>
  );
};

export default BDHeader;
