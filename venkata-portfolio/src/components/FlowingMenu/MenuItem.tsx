"use client";

import React, { useRef } from "react";
import Link from "next/link";
// GSAP will be imported and used only in useEffect (client-only)

interface MenuItemProps {
  text: string;
  link: string;
  image: string;
  description: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, link, description }) => {
  return (
    <Link href={link} className="group block w-full">
      <div
        className="menu__item relative flex flex-col items-center justify-center px-0 cursor-pointer min-h-[140px]"
        style={{ overflow: 'visible' }}
      >
        {/* Animated title */}
        <div className="w-full flex items-center justify-center overflow-hidden">
          <span
            className="marquee__inner text-white text-3xl md:text-5xl font-extrabold uppercase tracking-tight transition-colors duration-300 group-hover:text-cyan-300"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              animation: 'marquee-title 4s linear infinite',
              animationPlayState: 'paused',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.animation = 'none';
              // Force reflow to restart animation
              void e.currentTarget.offsetWidth;
              e.currentTarget.style.animation = 'marquee-title 4s linear infinite';
              e.currentTarget.style.animationPlayState = 'running';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
          >
            {text}
          </span>
        </div>
        {/* Description reveal on hover */}
        <div
          className="w-full flex items-center justify-center mt-4"
        >
          <span
            className="text-white/80 text-base md:text-lg font-medium text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
            style={{ maxWidth: 600 }}
          >
            {description}
          </span>
        </div>
      </div>
    </Link>
  );
};


export default MenuItem;
