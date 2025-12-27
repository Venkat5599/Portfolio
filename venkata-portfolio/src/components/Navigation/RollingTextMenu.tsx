'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RollingTextProps {
  text: string;
  index: number;
}

const RollingTextItem: React.FC<RollingTextProps> = ({ text, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chars = text.split('');
  const totalChars = chars.length;
  const centerIndex = Math.floor(totalChars / 2);

  return (
    <motion.a
      href="#"
      initial="rest"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer relative overflow-hidden block py-2 md:py-3 text-white"
    >
      <div className="relative">
        {/* Original text layer */}
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-none">
          {chars.map((char, charIndex) => {
            const distance = Math.abs(charIndex - centerIndex);
            const staggerDelay = distance * 0.02;

            return (
              <motion.span
                key={`original-${charIndex}`}
                initial={{ y: 0 }}
                animate={isHovered ? { y: '-100%' } : { y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: staggerDelay,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </div>

        {/* Sliding in text layer from below */}
        <div className="absolute top-0 left-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-none">
          {chars.map((char, charIndex) => {
            const distance = Math.abs(charIndex - centerIndex);
            const staggerDelay = distance * 0.02;

            return (
              <motion.span
                key={`sliding-${charIndex}`}
                initial={{ y: '100%' }}
                animate={isHovered ? { y: 0 } : { y: '100%' }}
                transition={{
                  duration: 0.35,
                  delay: staggerDelay,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.a>
  );
};

export const RollingTextMenu = () => {
  const menuItems = [
    'Home',
    'Projects',
    'About Me',
    'Contact Me',
  ];

  return (
    <section className="w-screen min-h-screen flex items-center justify-center overflow-hidden py-20">
      <nav className="flex flex-col items-center justify-center">
        {menuItems.map((item, index) => (
          <RollingTextItem key={item} text={item} index={index} />
        ))}
      </nav>
    </section>
  );
};
