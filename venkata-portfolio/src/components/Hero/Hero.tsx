'use client';

import React from 'react';
import { TextType } from './TextType';

import { LogoLoop } from './LogoLoop';
import { ProfileCard } from './ProfileCard';


export const Hero = () => {
  return (
    <section className="hero relative z-10 min-h-[70vh] w-full px-2 sm:px-4 md:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-[4rem] items-center min-h-[70vh] w-full">
        {/* ProfileCard left */}
        <div className="flex justify-center items-center h-full md:justify-end w-full md:w-auto mb-8 md:mb-0">
          <ProfileCard
            name="Venkata Ramana"
            title="Web3 Developer"
            handle="venkataramana"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/avatar.jpg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
          />
        </div>
        {/* Name + identity right */}
        <div className="flex flex-col justify-center items-center md:items-start h-full w-full">
          <TextType
            text="Venkata Ramana"
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={1500}
            loop={false}
            showCursor={true}
            hideCursorWhileTyping={false}
            cursorCharacter="|"
            className="hero-name text-white text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 text-center md:text-left"
          />
          {/* LogoLoop immediately under the name */}
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
            <LogoLoop
              logoHeight={26}
              gap={28}
              fadeOut={true}
              scaleOnHover={true}
            />
          </div>
          {/* Optionally, add ScrollVelocity or about text here */}
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-20">
        <div className="text-xs tracking-[0.3em] text-white/50 animate-pulse uppercase">
          Scroll
        </div>
      </div>
    </section>
  );
};
