'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';

interface ScrollVelocityProps {
  texts: string[];
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({ texts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const position1 = useMotionValue(0);
  const position2 = useMotionValue(0);
  const lastScrollY = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocity = useMotionValue(0);
  
  // Track scroll position
  const { scrollY } = useScroll();
  
  // Smooth velocity using spring
  const smoothVelocity = useSpring(velocity, {
    stiffness: 50,
    damping: 30,
    mass: 0.5,
  });

  // Base speed multiplier
  const baseSpeed = 0.03;

  // Calculate velocity from scroll position
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const now = performance.now();
      const timeDelta = (now - lastTimeRef.current) / 1000; // Convert to seconds
      
      if (timeDelta > 0) {
        const scrollDelta = latest - lastScrollY.current;
        const calculatedVelocity = scrollDelta / timeDelta;
        velocity.set(calculatedVelocity);
        lastScrollY.current = latest;
        lastTimeRef.current = now;
      }
    });

    return () => unsubscribe();
  }, [scrollY, velocity]);

  // Accumulate position based on velocity using animation frame
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    lastTimeRef.current = startTime;

    const updatePosition = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = currentTime;

      const velocity = smoothVelocity.get();
      
      // Accumulate position based on velocity
      // Positive velocity (scrolling down) = move right for row 1, left for row 2
      position1.set(position1.get() + velocity * baseSpeed * deltaTime * 60); // Scale by 60 for frame rate normalization
      position2.set(position2.get() - velocity * baseSpeed * deltaTime * 60);

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [smoothVelocity, position1, position2, baseSpeed]);

  // Repeat text for seamless marquee
  const repeatText = (text: string, times: number = 4) => {
    return Array(times).fill(text).join(' · ');
  };

  return (
    <div ref={containerRef} className="parallax w-full relative overflow-hidden py-4 md:py-6">
      {/* Row 1 - Scrolls right on scroll down */}
      <motion.div
        className="scroller"
        style={{
          x: position1,
        }}
      >
        <span className="text-[2.25rem] md:text-[5rem] font-black uppercase tracking-[-0.02em] text-white whitespace-nowrap">
          {repeatText(texts[0] || '', 4)}
        </span>
      </motion.div>

      {/* Row 2 - Scrolls left on scroll down */}
      <motion.div
        className="scroller"
        style={{
          x: position2,
        }}
      >
        <span className="text-[2.25rem] md:text-[5rem] font-black uppercase tracking-[-0.02em] text-white whitespace-nowrap">
          {repeatText(texts[1] || '', 4)}
        </span>
      </motion.div>
    </div>
  );
};

