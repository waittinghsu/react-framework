import React from 'react';
import PropTypes from 'prop-types';
import TransparentHeader from './components/TransparentHeader.jsx';
import Footer from './components/Footer.jsx';
import './styles/MainLayout.scss';

const MainLayout = ({ children }) => (
  <div>
    <TransparentHeader />
    <main className="main-container">{children}</main>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
