'use client';

import React, { useState } from 'react';

interface LogoLoopProps {
  logoHeight?: number;
  gap?: number;
  fadeOut?: boolean;
  scaleOnHover?: boolean;
}

interface TechLogo {
  name: string;
  iconName: string;
  alt: string;
}

// Tech stack logos with multiple CDN sources for reliability
const techLogos: TechLogo[] = [
  { name: 'Ethereum', iconName: 'ethereum', alt: 'Ethereum' },
  { name: 'Solidity', iconName: 'solidity', alt: 'Solidity' },
  { name: 'Web3.js', iconName: 'web3dotjs', alt: 'Web3.js' },
  { name: 'Ethers.js', iconName: 'ethersdotjs', alt: 'Ethers.js' },
  { name: 'Hardhat', iconName: 'hardhat', alt: 'Hardhat' },
  { name: 'Foundry', iconName: 'foundry', alt: 'Foundry' },
  { name: 'IPFS', iconName: 'ipfs', alt: 'IPFS' },
  { name: 'MetaMask', iconName: 'metamask', alt: 'MetaMask' },
  { name: 'React', iconName: 'react', alt: 'React' },
  { name: 'Next.js', iconName: 'nextdotjs', alt: 'Next.js' },
];

// Logo component using Simple Icons CDN with white color
const LogoImage: React.FC<{ iconName: string; alt: string; height: number }> = ({ iconName, alt, height }) => {
  // Use Simple Icons CDN with white color
  const logoUrl = `https://cdn.simpleicons.org/${iconName}/ffffff`;
  
  return (
    <img
      src={logoUrl}
      alt={alt}
      height={height}
      width={height}
      style={{
        height: `${height}px`,
        width: 'auto',
        minWidth: `${height}px`,
        objectFit: 'contain',
        opacity: 0.9,
      }}
      loading="lazy"
      onError={(e) => {
        // Try alternative source if first fails
        const target = e.target as HTMLImageElement;
        const fallbackUrl = `https://api.iconify.design/simple-icons:${iconName}.svg?color=%23ffffff`;
        if (target.src !== fallbackUrl) {
          target.src = fallbackUrl;
        } else {
          // Final fallback - show text
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="color: white; font-size: ${height * 0.6}px; font-weight: bold; white-space: nowrap;">${alt}</span>`;
          }
        }
      }}
    />
  );
};

export const LogoLoop: React.FC<LogoLoopProps> = ({
  logoHeight = 26,
  gap = 28,
  fadeOut = true,
  scaleOnHover = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <div
      className="logo-loop-container relative w-full overflow-hidden mt-6 md:mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      {/* Fade edges */}
      {fadeOut && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" 
            style={{
              background: 'linear-gradient(to right, rgba(2, 2, 3, 1), rgba(2, 2, 3, 0))'
            }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(2, 2, 3, 1), rgba(2, 2, 3, 0))'
            }}
          />
        </>
      )}

      {/* Scrolling container */}
      <div
        className="logo-loop flex items-center"
        style={{
          gap: `${gap}px`,
          width: 'max-content',
          animation: `logoScroll ${isHovered ? '8s' : '6s'} linear infinite`,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="logo-item flex items-center justify-center flex-shrink-0"
            style={{
              height: `${logoHeight}px`,
              width: 'auto',
              transition: scaleOnHover ? 'transform 0.3s ease' : 'none',
              transform: scaleOnHover && isHovered ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            <LogoImage iconName={logo.iconName} alt={logo.alt} height={logoHeight} />
          </div>
        ))}
      </div>
    </div>
  );
};

