import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import RollingBall from '@/pages/DefaultPage/components/RollingBall.jsx';
// import PropTypes from 'prop-types';

const SectionOne = () => {
  const [balls, setBalls] = useState([]);
  const yellowBox = useRef(null);
  const handleMakeBalls = () => {
    setBalls((prevBalls) => [...prevBalls, prevBalls.length + 1]);
  };
  const handleClearBalls = () => {
    setBalls([]);
  };

  return (
    <>
      <div className="text-center my-4">
        <Button
          className="mx-4 w-24 h-8 text-white bg-blue-600 hover:bg-blue-500 rounded-full"
          onClick={handleMakeBalls}
        >
          Make Ball
        </Button>
        <button
          className="w-24 h-8 text-white bg-red-600 hover:bg-red-500 rounded-full"
          onClick={handleClearBalls}
        >
          Kill Ball
        </button>
      </div>
      <div className="yellow-box relative w-full py-10">
        <div className="w-50vw mx-auto">
          {balls.map((_, index) => (
            <RollingBall key={index} containerRef={yellowBox} />
          ))}
          <div ref={yellowBox} className="flex flex-wrap">
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-[33.33%]">
                  <div className={`relative bg-amber-${index + 1}00 pb-[100%]`}>
                    <div
                      className={`absolute flex items-center justify-center inset-0 ${index === 4 ? 'animate-blink' : ''}`}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
SectionOne.propTypes = {
  // children: PropTypes.node,
};
export default SectionOne;
