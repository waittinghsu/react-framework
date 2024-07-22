import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

const RollingBall = ({ containerRef }) => {
  const ballRef = useRef(null);
  const gsapRaf = useRef(gsap.timeline());
  useEffect(() => {
    const {
      // x: containerX,
      // y: containerY,
      height: containerHeight,
      width: containerWidth,
    } = containerRef.current.getBoundingClientRect();
    const ballSize = 24; // 球的大小为24px
    const maxDistanceX = containerWidth - ballSize - 24;
    const maxDistanceY = containerHeight - ballSize - 24;

    const getRandomPosition = () => ({
      x: gsap.utils.random(0, maxDistanceX),
      y: gsap.utils.random(0, maxDistanceY),
    });
    // 初始随机位置
    const moveBall = () => {
      if (!ballRef.current) return false;
      const { x, y } = getRandomPosition();
      const randomDuration = gsap.utils.random(3, 6);

      gsapRaf.current.to(ballRef.current, {
        x,
        y,
        duration: randomDuration,
        ease: 'power1.inOut',
        onComplete: moveBall, // 完成后继续移动到新的随机位置
      });
    };

    moveBall();
    // destroy 揍這裡
    return () => {
      gsapRaf.current.kill();
      gsap.killTweensOf(ballRef.current);
    };
  }, [containerRef]);

  return (
    <div
      ref={ballRef}
      className="w-6 h-6 bg-green-400 rounded-full absolute z-10"
    ></div>
  );
};

// 使用 prop-types 对 props 进行类型检查
RollingBall.propTypes = {
  containerRef: PropTypes.object.isRequired,
};

export default RollingBall;
