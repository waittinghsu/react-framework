import React from 'react';
import PropTypes from 'prop-types';
import FullPictureFactory from '@/pages/DefaultPage/components/FullPictureFactory/FullPictureFactory.jsx';

const SectionFactory = ({ children, title, pictureType }) => {
  return (
    <div className="block-layout h-screen">
      <section className="one-page relative">
        <div className="absolute inset-0 h-screen">
          <FullPictureFactory category={pictureType}></FullPictureFactory>
        </div>
        <div className="absolute inset-0 flex flex-col items-center">
          <div className="text-white text-4xl font-bold mt-36">
            <div className="uppercase">{title}</div>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
};
SectionFactory.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  pictureType: PropTypes.string,
  children: PropTypes.node,
};
export default SectionFactory;
