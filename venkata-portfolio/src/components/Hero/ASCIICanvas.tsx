'use client';

import React, { useEffect, useRef } from 'react';

interface ASCIICanvasProps {
  text: string;
}

const ASCII_CHARS = '@%#*+=-:. ';

export const ASCIICanvas: React.FC<ASCIICanvasProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    updateSize();

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / width;
      mouseRef.current.y = event.clientY / height;
    };

    const draw = () => {
      const time = timeRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Clear canvas with transparent background (pixel snow shows through)
      ctx.clearRect(0, 0, width, height);
      
      // Calculate responsive font size
      const fontSize = Math.max(8, Math.min(width / 80, 16));
      const charWidth = fontSize * 0.6;
      const charHeight = fontSize * 1.2;
      
      // Create offscreen canvas for text rendering
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;
      
      offscreen.width = width;
      offscreen.height = height;
      
      // Draw the name text large on offscreen canvas
      offCtx.fillStyle = '#ffffff';
      const textSize = Math.min(width * 0.12, height * 0.2, 200);
      offCtx.font = `900 ${textSize}px "Arial Black", Arial, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, width / 2, height / 2);
      
      // Get image data from offscreen canvas
      const imageData = offCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Calculate hue based on mouse position
      const baseHue = (mouseX + mouseY) * 180;
      
      // Draw ASCII characters
      const cols = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / charHeight);
      
      ctx.font = `bold ${fontSize}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * charWidth + charWidth / 2;
          const y = row * charHeight + charHeight / 2;
          
          // Sample pixel from offscreen canvas
          const px = Math.min(Math.floor(x), width - 1);
          const py = Math.min(Math.floor(y), height - 1);
          const idx = (py * width + px) * 4;
          
          const r = pixels[idx] || 0;
          const g = pixels[idx + 1] || 0;
          const b = pixels[idx + 2] || 0;
          const brightness = (r + g + b) / 3 / 255;
          
          // Apply wave distortion
          const wave = Math.sin(y * 0.015 + time * 1.5) * 0.5 + 0.5;
          const distortedBrightness = brightness * (0.7 + wave * 0.6);
          
          // Get ASCII character based on brightness
          const charIndex = Math.floor(distortedBrightness * (ASCII_CHARS.length - 1));
          const char = ASCII_CHARS[Math.min(Math.max(charIndex, 0), ASCII_CHARS.length - 1)];
          
          if (brightness > 0.01) {
            // Color with animated hue shift - brighter for dark background
            const charHue = baseHue + Math.sin(time * 0.5 + x * 0.005 + y * 0.005) * 60;
            const saturation = 60 + brightness * 30;
            const lightness = 65 + brightness * 30;
            
            ctx.fillStyle = `hsl(${charHue}, ${saturation}%, ${lightness}%)`;
            ctx.fillText(char, x, y);
          }
        }
      }
      
      timeRef.current += 0.016;
      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateSize);
    
    // Start animation
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};
