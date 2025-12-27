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
      className="profile-card relative z-10"
      style={{
        transform: enableTilt
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'none',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative bg-transparent rounded-2xl p-6 md:p-8">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
          {/* Status indicator */}
          {status === 'Online' && (
            <div className="absolute bottom-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-[#020203]"></div>
          )}
        </div>

        {/* User Info */}
        {showUserInfo && (
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-white">{name}</h3>
            <p className="text-sm md:text-base text-white/70">{title}</p>
            <p className="text-xs md:text-sm text-white/50">komarivenkataramana4@gmail.com</p>
            <div className="pt-2">
              <a
                href="mailto:komarivenkataramana4@gmail.com"
                className="text-xs md:text-sm text-white/80 hover:text-white transition-colors border border-white/20 rounded-full px-4 py-2 hover:border-white/40 block text-center"
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

