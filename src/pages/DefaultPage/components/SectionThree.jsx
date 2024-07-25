import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthData } from '@/store/slices/authSlice.js';
// import PropTypes from 'prop-types';

const SectionThree = () => {
  const dispatch = useDispatch();
  const handleSignUp = () => {
    dispatch(fetchAuthData());
  };

  return (
    <>
      <div className="text-center">
        <button
          className="my-4 w-24 h-12 text-white bg-blue-600 rounded-full"
          onClick={handleSignUp}
        >
          Sign In
        </button>
      </div>
      <div className="flex flex-wrap w-50vw">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="w-[33.33%]">
              <div className="aspect-w-1 aspect-h-1 bg-gray-500">
                <span>omega</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
SectionThree.propTypes = {
  // children: PropTypes.node,
};
export default SectionThree;
