import React from 'react';
import PropTypes from 'prop-types';
import BDHeader from './components/BDHeader.jsx';
import Footer from './components/Footer.jsx';
import './styles/BDLayout.scss';

const BDLayout = ({ children }) => (
  <div>
    <BDHeader />
    <main className="bd-container">{children}</main>
    <Footer />
  </div>
);

BDLayout.propTypes = {
  children: PropTypes.node,
};

export default BDLayout;
