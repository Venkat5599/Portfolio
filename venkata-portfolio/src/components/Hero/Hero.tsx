'use client';

import React from 'react';
import { TextType } from './TextType';

import { LogoLoop } from './LogoLoop';
import { ProfileCard } from './ProfileCard';


export const Hero = () => {
  return (
    <section
      className="hero relative z-10 min-h-[70vh]"
    >
      <div className="container grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-[4rem] items-center min-h-[70vh]">
        {/* ProfileCard left */}
        <div className="flex justify-center items-center h-full md:justify-end">
          <ProfileCard
            name="Venkata Ramana"
            title="Web3 Developer"
            handle="venkataramana"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/avatar.jpg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
          />
        </div>
        {/* Name + identity right */}
        <div className="flex flex-col justify-center items-start h-full w-full">
          <TextType
            text="Venkata Ramana"
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={1500}
            loop={false}
            showCursor={true}
            hideCursorWhileTyping={false}
            cursorCharacter="|"
            className="hero-name text-white text-4xl md:text-6xl font-extrabold mb-4 text-left"
          />
          {/* LogoLoop immediately under the name */}
          <div style={{maxWidth:520, width:'100%'}}>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-20">
        <div className="text-xs tracking-[0.3em] text-white/50 animate-pulse uppercase">
          Scroll
        </div>
      </div>
    </section>
  );
};
