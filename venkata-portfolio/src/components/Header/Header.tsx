'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeaderItemProps {
  text: string;
  href?: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ text, href = '#' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chars = text.split('');
  const totalChars = chars.length;
  const centerIndex = Math.floor(totalChars / 2);
  const router = useRouter();
  const pathname = usePathname();

  // Special handling for PROJECTS link (anchor to #my-work)
  if (href === '#my-work') {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname === '/') {
        const el = document.getElementById('my-work');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push('/#my-work');
      }
    };
    return (
      <a href="/#my-work" className="block" onClick={handleClick}>
        <motion.span
          initial="rest"
          whileHover="hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer relative overflow-hidden block text-white"
          style={{ display: 'block' }}
        >
          <div className="relative">
            {/* Original text layer */}
            <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
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
            <div className="absolute top-0 left-0 text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
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
        </motion.span>
      </a>
    );
  }
  // For all other links, use Link with a <motion.span> child (new API)
  return (
    <Link href={href}>
      <motion.span
        initial="rest"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer relative overflow-hidden block text-white"
        style={{ display: 'block' }}
      >
        <div className="relative">
          {/* Original text layer */}
          <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
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
          <div className="absolute top-0 left-0 text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
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
      </motion.span>
    </Link>
  );
};

export const Header = () => {
  const menuItems = [
    { text: 'HOME', href: '/' },
    { text: 'PROJECTS', href: '#my-work' },
    { text: 'ABOUT ME', href: '/about' },
    { text: 'CONTACT ME', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-2 sm:px-4 md:px-12 py-3 sm:py-4 md:py-8 bg-black/90 backdrop-blur-md">
      <div className="flex flex-nowrap items-center gap-3 sm:gap-6 md:gap-12 overflow-x-auto scrollbar-none w-full max-w-full">
        {menuItems.map((item) => (
          <div
            key={item.text}
            className="min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex-shrink-0 text-center"
          >
            <HeaderItem text={item.text} href={item.href} />
          </div>
        ))}
      </div>
    </nav>
  );
};

