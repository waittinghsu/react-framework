import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './DefaultPage.scss';
import SectionFactory from '@/pages/DefaultPage/components/SectionFactory.jsx';
import SectionOne from '@/pages/DefaultPage/components/SectionOne.jsx';
import SectionTwo from '@/pages/DefaultPage/components/SectionTwo.jsx';
import SectionThree from '@/pages/DefaultPage/components/SectionThree.jsx';
import SectionFour from '@/pages/DefaultPage/components/SectionFour/SectionFour.tsx';
import SectionFive from '@/pages/DefaultPage/components/SectionFive/SectionFive.jsx';

const DefaultPage = () => {
  const {
    data: { token },
  } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log('omega');
  });

  return (
    <div className="default-page">
      <SectionFactory
        className="section-one"
        pictureType="sport"
        title="泳渡人生 Swimming Life"
      >
        <h2 className="text-2xl font-bold mb-4">Default Page {token}</h2>
        <SectionOne></SectionOne>
      </SectionFactory>
      <SectionFactory
        className="section-two"
        pictureType="housing"
        title="AIR BNB"
      >
        <SectionTwo></SectionTwo>
      </SectionFactory>
      <SectionFactory
        className="section-three"
        pictureType="car"
        title="Cybertruck"
      >
        <SectionThree></SectionThree>
      </SectionFactory>
      <SectionFactory
        className="section-four"
        pictureType="travel"
        title="Travel"
      >
        <SectionFour></SectionFour>
      </SectionFactory>
      <SectionFactory
        className="section-five"
        pictureType="empty"
        title="練習ＣＳＳ區塊"
      >
        <SectionFive></SectionFive>
      </SectionFactory>
    </div>
  );
};

export default DefaultPage;
