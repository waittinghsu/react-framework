import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const RollingBall = ({ containerWidth, containerHeight }) => {
  const ballRef = useRef(null);

  useEffect(() => {
    const ballSize = 24; // 球的大小为24px
    const maxDistanceX = containerWidth - ballSize - 48;
    const maxDistanceY = containerHeight - ballSize - 48;

    const getRandomPosition = () => ({
      x: gsap.utils.random(0, maxDistanceX),
      y: gsap.utils.random(0, maxDistanceY),
    });

    const moveBall = () => {
      const { x, y } = getRandomPosition();
      const randomDuration = gsap.utils.random(3, 6);

      gsap.to(ballRef.current, {
        x,
        y,
        duration: randomDuration,
        ease: 'power1.inOut',
        onComplete: moveBall, // 完成后继续移动到新的随机位置
      });
    };

    moveBall();
  }, [containerWidth, containerHeight]);

  return (
    <div
      ref={ballRef}
      className="w-6 h-6 bg-green-400 rounded-full absolute z-10"
    ></div>
  );
};

export default RollingBall;
