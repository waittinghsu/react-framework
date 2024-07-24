import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const FullPictureFactory = ({ category }) => {
  const [imageSrcObj, setImageSrcObj] = useState({
    sport: {},
    housing: {},
    car: {},
    travel: {},
  });

  const sportComponent = (imageObj) => {
    return (
      <picture className="">
        <img
          src={imageObj.swimming}
          alt="Beautiful scenery"
          className="inset-0 w-full h-full object-cover"
        />
      </picture>
    );
  };
  const housingComponent = (imageObj) => {
    return (
      <picture className="">
        <picture className="">
          <source
            srcSet={imageObj['housing-mobile']}
            media="(max-width: 599px)"
          />
          <source
            srcSet={imageObj['housing-desktop']}
            media="(min-width: 600px)"
          />
          <source
            srcSet={imageObj['housing-mobile-l']}
            media="(min-width: 600px) and (orientation:portrait)"
          />
          <img
            src={imageObj['housing-desktop']}
            srcSet={imageObj['housing-desktop']}
            alt="Ranch style home powered by Tesla solar panels and Powerwall"
            className="inset-0 w-full h-full object-cover"
          />
        </picture>
      </picture>
    );
  };
  const carComponent = (imageObj) => {
    return (
      <picture className="">
        <picture className="tcl-react-image tcl-react-media dx-hero-media">
          <source
            srcSet={imageObj['Cybertruck-Mobile']}
            media="(max-width: 599px) and (orientation: portrait)"
          />
          <source
            srcSet={imageObj['Cybertruck-Mobile-Landscape']}
            media="(max-height: 599px) and (orientation: landscape)"
          />
          <source
            srcSet={imageObj['Cybertruck-Desktop-Tablet']}
            media="(min-width: 600px) and (orientation: portrait)"
          />
          <source
            srcSet={imageObj['Cybertruck-Desktop']}
            media="(min-width: 900px) and (orientation: landscape)"
          />
          <img
            src={imageObj['Cybertruck-Desktop']}
            className="inset-0 w-full h-full object-cover"
            alt="Cybertruck"
          />
        </picture>
      </picture>
    );
  };
  const travelComponent = (imageObj) => {
    return (
      <picture className="">
        <picture className="tcl-react-image tcl-react-media dx-hero-media">
          <source
            srcSet={imageObj['travel-desktop']}
            media="(min-width: 600px) and (orientation: portrait)"
          />
          <source
            srcSet={imageObj['travel-mobile']}
            media="(min-width: 900px) and (orientation: landscape)"
          />
          <img
            src={imageObj['travel-desktop']}
            className="inset-0 w-full h-full object-cover"
            alt="Cybertruck"
          />
        </picture>
      </picture>
    );
  };

  const [imageComponents] = useState({
    sport: sportComponent,
    housing: housingComponent,
    car: carComponent,
    travel: travelComponent,
  });

  // 通用函数：加载图片路径并返回对象
  const loadImages = async (imageFiles) => {
    const entries = await Promise.all(
      Object.keys(imageFiles).map(async (path) => {
        const [fileName] = path.split('/').pop().split('.');
        const imgModule = await imageFiles[path]();
        return [fileName, imgModule.default];
      })
    );
    return Object.fromEntries(entries);
  };
  // 讀取所有圖片
  const loadAllImage = async (key, images) => {
    const imagesObj = await loadImages(images);
    setImageSrcObj({
      ...imageSrcObj,
      [key]: imagesObj,
    });
  };

  useEffect(() => {
    switch (category) {
      case 'sport': {
        const sportImages = import.meta.glob(
          '@/assets/DefaultPage/sport/*.jpeg'
        );
        loadAllImage(category, sportImages).then();
        break;
      }
      case 'housing': {
        const housingImages = import.meta.glob(
          '@/assets/DefaultPage/housing/*.webp'
        );
        loadAllImage(category, housingImages).then();
        break;
      }
      case 'car': {
        const carImages = import.meta.glob('@/assets/DefaultPage/car/*.avif');
        loadAllImage(category, carImages).then();
        break;
      }
      case 'travel': {
        const travelImages = import.meta.glob(
          '@/assets/DefaultPage/travel/*.webp'
        );
        loadAllImage(category, travelImages).then();
        break;
      }
    }
  });

  return (
    imageSrcObj[category] && imageComponents[category](imageSrcObj[category])
  );
};

FullPictureFactory.propTypes = {
  category: PropTypes.oneOf(['sport', 'housing', 'car', 'travel']).isRequired, // 使用 oneOf 来限制 category 的值
};

export default FullPictureFactory;
