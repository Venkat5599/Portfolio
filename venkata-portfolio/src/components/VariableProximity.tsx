"use client";

import React, { useRef } from 'react';

// Roboto Flex must be loaded in your global CSS or _document.js
// Example: @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,wdth@8..144,300..700,100..120&display=swap');

interface VariableProximityProps {
  text: string;
  radius?: number;
  falloff?: 'linear' | 'ease';
  from?: { wght: number; wdth: number };
  to?: { wght: number; wdth: number };
  className?: string;
}

export const VariableProximity: React.FC<VariableProximityProps> = ({
  text,
  radius = 70,
  falloff = 'linear',
  from = { wght: 300, wdth: 100 },
  to = { wght: 700, wdth: 120 },
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const letterRect = el.getBoundingClientRect();
      const letterX = letterRect.left + letterRect.width / 2 - rect.left;
      const letterY = letterRect.top + letterRect.height / 2 - rect.top;
      const dx = mouseX - letterX;
      const dy = mouseY - letterY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let t = Math.max(0, 1 - dist / radius);
      if (falloff === 'ease') t = t * t;
      const wght = from.wght + (to.wght - from.wght) * t;
      const wdth = from.wdth + (to.wdth - from.wdth) * t;
      el.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`;
    });
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;
    Array.from(container.children).forEach((child) => {
      const el = child as HTMLElement;
      el.style.fontVariationSettings = `'wght' ${from.wght}, 'wdth' ${from.wdth}`;
    });
  };

  return (
    <span
      ref={containerRef}
      className={`variable-proximity inline-block ${className}`}
      style={{ fontFamily: '"Roboto Flex", sans-serif', color: '#e5e7eb', lineHeight: '1.7' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            transition: 'font-variation-settings 0.18s',
            fontVariationSettings: `'wght' ${from.wght}, 'wdth' ${from.wdth}`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
