'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface KineticTextProps {
  text: string;
  variant: 'horizontal' | 'vertical' | 'floating';
}

interface KineticCharacterProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  variant: 'horizontal' | 'vertical' | 'floating';
}

const KineticCharacter: React.FC<KineticCharacterProps> = ({ 
  char, 
  index, 
  total, 
  scrollYProgress, 
  variant 
}) => {
  const distance = Math.abs(index - total / 2);
  const maxDistance = total / 2 || 1;
  const normalizedDistance = distance / maxDistance;
  const direction = index < total / 2 ? -1 : 1;

  const xHorizontal = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [direction * normalizedDistance * 200, 0, direction * normalizedDistance * -100]
  );

  const rotateXHorizontal = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-20, 0, 20]
  );

  const opacityHorizontal = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  const yVertical = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [normalizedDistance * 150, 0, normalizedDistance * -80]
  );

  const scaleVertical = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.5, 1, 0.8]
  );

  const xVertical = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [direction * 50, 0, direction * -30]
  );

  const yFloating = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [normalizedDistance * 100, 0, normalizedDistance * -200]
  );

  const xFloating = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [direction * normalizedDistance * 80, 0, direction * normalizedDistance * -50]
  );

  const rotateFloating = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [direction * 30, 0, direction * -20]
  );

  const scaleFloating = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 1, 0.6]
  );

  if (variant === 'horizontal') {
    return (
      <motion.span
        style={{ 
          x: xHorizontal, 
          rotateX: rotateXHorizontal, 
          opacity: opacityHorizontal,
          transformPerspective: 1000,
          display: 'inline-block'
        }}
      >
        {char}
      </motion.span>
    );
  }

  if (variant === 'vertical') {
    return (
      <motion.span
        style={{ 
          y: yVertical, 
          x: xVertical,
          scale: scaleVertical,
          display: 'inline-block'
        }}
      >
        {char}
      </motion.span>
    );
  }

  // floating variant
  return (
    <motion.span
      style={{ 
        y: yFloating, 
        x: xFloating, 
        rotate: rotateFloating, 
        scale: scaleFloating, 
        transformPerspective: 1000,
        display: 'inline-block'
      }}
    >
      {char}
    </motion.span>
  );
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  variant,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const chars = text.split('');

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: '200vh', marginTop: '-50vh' }}
    >
      <div 
        className="sticky top-0 flex items-center justify-center w-full"
        style={{ height: '100vh' }}
      >
        <div className="text-center px-4">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none text-white">
            {chars.map((char, index) => (
              <KineticCharacter
                key={`${index}-${char}`}
                char={char === ' ' ? '\u00A0' : char}
                index={index}
                total={chars.length}
                scrollYProgress={scrollYProgress}
                variant={variant}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
