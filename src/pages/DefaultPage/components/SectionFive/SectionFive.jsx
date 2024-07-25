import React from 'react';
import './SectionFive.scss';
// import PropTypes from 'prop-types';

const SectionFive = () => {
  return (
    <>
      <div className="w-full flex flex-wrap mt-12">
        <div className="frame mr-4">
          <div className="center">
            <div className="text-anim-box">
              <div className="loading-circle"></div>
              <div className="loading-line"></div>
              <div className="text-ele-wrapper">
                <h4>COLLECT</h4>
                <div className="main-text">
                  <h2>MOMENTS</h2>
                  <div className="angle-braces brace-left"></div>
                  <div className="angle-braces brace-right"></div>
                </div>
                <h4>NOT THINGS</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="omega-day-23 flex justify-center items-center mr-4">
          <div className="relative text-center">
            <div className="absolute loading-circle"></div>
            <div className="absolute loading-line"></div>
            <h4 className="collect">COLLECT</h4>
            <div className="main-text relative">
              <h2 className="moment">MOMENTS</h2>
              <div className="absolute bracket bracket-right"></div>
              <div className="absolute bracket bracket-left"></div>
            </div>
            <h4 className="nothing">NOT THINGS</h4>
          </div>
        </div>
        {/*<div className="relative">*/}
        {/*  <div className="frame2">*/}
        {/*    <input type="checkbox" id="button" className="hidden" />*/}
        {/*    <label htmlFor="button" className="button">*/}
        {/*      Durex*/}
        {/*      <img*/}
        {/*        src="https://100dayscss.com/codepen/checkmark-green.svg"*/}
        {/*        alt="checkmark"*/}
        {/*      />*/}
        {/*    </label>*/}
        {/*    <svg className="circle">*/}
        {/*      <circle cx="30" cy="30" r="29" />*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="relative">
          <div className="frame3">
            <input type="checkbox" id="button" className="hidden" />
            <label htmlFor="button" className="button">
              Finish
              <img src="https://100dayscss.com/codepen/checkmark-green.svg" />
            </label>
            <svg className="circle">
              <circle cx="30" cy="30" r="29" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
SectionFive.propTypes = {
  // children: PropTypes.node,
};
export default SectionFive;
