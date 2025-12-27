'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TextPressureProps {
  text?: string;
  textColor?: string;
  minFontSize?: number;
}

const FONT_URL = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581878911/fonts/Compressa-VF_ytkbjj.woff2';
const FONT_FAMILY = 'Compressa VF';

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Venkata Ramana',
  textColor = '#ffffff',
  minFontSize = 48,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const fontLoadSuccessRef = useRef(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontLoadSuccess, setFontLoadSuccess] = useState(false);
  const [fontSize, setFontSize] = useState(minFontSize);

  // Load variable font
  useEffect(() => {
    const loadFont = async () => {
      try {
        const font = new FontFace(FONT_FAMILY, `url(${FONT_URL})`);
        
        // Add timeout to prevent hanging
        const loadPromise = font.load();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Font load timeout')), 10000)
        );
        
        const loaded = await Promise.race([loadPromise, timeoutPromise]) as FontFace;
        document.fonts.add(loaded);
        fontLoadSuccessRef.current = true;
        setFontLoadSuccess(true);
        setFontLoaded(true);
      } catch (err) {
        // Silently handle font loading errors - fallback to system fonts
        // The error is caught and handled, so we still show the text
        fontLoadSuccessRef.current = false;
        setFontLoadSuccess(false);
        setFontLoaded(true);
      }
    };
    loadFont();
  }, []);

  // Calculate responsive font size
  useEffect(() => {
    const calculateSize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      // Keep text compact - not edge to edge
      const targetWidth = containerWidth * 0.85;
      const charCount = text.replace(/\s/g, '').length + (text.split(' ').length - 1) * 0.3;
      const calculated = Math.floor(targetWidth / (charCount * 0.55));
      setFontSize(Math.max(minFontSize, Math.min(calculated, 140)));
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [text, minFontSize]);

  // Direct mouse tracking - no smoothing for immediate response
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const chars = charsRef.current;
      const { x: mx, y: my } = mousePos.current;

      chars.forEach((char) => {
        if (!char) return;

        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Pressure radius - closer = stronger effect
        const radius = 180;
        const proximity = Math.max(0, 1 - dist / radius);
        
        // Cubic easing for snappy, elastic feel
        const pressure = proximity * proximity * proximity;

        // Variable font axes: weight, width, italic
        // wght: 100 (thin) to 900 (black)
        // wdth: 50 (condensed) to 200 (expanded)
        // ital: 0 to 1
        // Only apply font variation settings if the variable font loaded successfully
        if (fontLoadSuccessRef.current) {
          const wght = Math.round(100 + pressure * 800);
          const wdth = Math.round(50 + pressure * 150);
          const ital = (pressure * 1).toFixed(2);
          char.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const characters = text.split('');

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center select-none"
      style={{
        fontFamily: fontLoadSuccess ? `'${FONT_FAMILY}', sans-serif` : `'Arial Black', 'Arial', sans-serif`,
        opacity: fontLoaded ? 1 : 0,
        transition: 'opacity 0.4s ease',
        cursor: 'default',
      }}
    >
      <h1
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: fontLoadSuccess ? `'${FONT_FAMILY}', sans-serif` : `'Arial Black', 'Arial', sans-serif`,
          color: textColor,
          display: 'inline-flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          lineHeight: 1,
          margin: 0,
          padding: 0,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {characters.map((char, i) => (
          <span
            key={i}
            ref={(el) => { charsRef.current[i] = el; }}
            style={{
              display: 'inline-block',
              ...(fontLoadSuccess && {
                fontVariationSettings: "'wght' 100, 'wdth' 50, 'ital' 0",
                willChange: 'font-variation-settings',
              }),
              ...(char === ' ' && { width: '0.25em' }),
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
