'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableTilt || (!enableMobileTilt && window.innerWidth < 768)) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [enableTilt, enableMobileTilt]);

  return (
    <div
      ref={cardRef}
      className="profile-card relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      style={{
        transform: enableTilt
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'none',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative bg-transparent rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-4 flex items-center justify-center w-full">
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 80px, (max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
            />
          </div>
          {/* Status indicator */}
          {status === 'Online' && (
            <div className="absolute bottom-1 right-1 w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-[#020203]"></div>
          )}
        </div>

        {/* User Info */}
        {showUserInfo && (
          <div className="space-y-2 w-full text-center">
            <h3 className="text-lg xs:text-xl md:text-2xl font-bold text-white break-words">{name}</h3>
            <p className="text-xs xs:text-sm md:text-base text-white/70 break-words">{title}</p>
            <p className="text-[11px] xs:text-xs md:text-sm text-white/50 break-words">komarivenkataramana4@gmail.com</p>
            <div className="pt-2">
              <a
                href="mailto:komarivenkataramana4@gmail.com"
                className="text-xs xs:text-sm md:text-sm text-white/80 hover:text-white transition-colors border border-white/20 rounded-full px-3 py-2 md:px-4 md:py-2 hover:border-white/40 block text-center"
              >
                {contactText}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

