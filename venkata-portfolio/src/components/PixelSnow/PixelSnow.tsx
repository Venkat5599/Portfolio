'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

export const PixelSnow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const snowflakesRef = useRef<Snowflake[]>([]);

  const createSnowflakes = useCallback((width: number, height: number) => {
    const flakes: Snowflake[] = [];
    const count = Math.floor((width * height) / 2500);
    
    for (let i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        drift: (Math.random() - 0.5) * 0.5,
      });
    }
    return flakes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      snowflakesRef.current = createSnowflakes(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = performance.now();
    
    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16;
      lastTime = currentTime;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.fillStyle = '#020203';
      ctx.fillRect(0, 0, width, height);

      snowflakesRef.current.forEach((flake) => {
        flake.y += flake.speed * deltaTime;
        flake.x += flake.drift * deltaTime + Math.sin(currentTime * 0.001 + flake.x * 0.01) * 0.3;

        if (flake.y > height + flake.size) {
          flake.y = -flake.size;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + flake.size) flake.x = -flake.size;
        if (flake.x < -flake.size) flake.x = width + flake.size;

        const pixelSize = Math.ceil(flake.size);
        const px = Math.floor(flake.x / pixelSize) * pixelSize;
        const py = Math.floor(flake.y / pixelSize) * pixelSize;

        ctx.fillStyle = `rgba(200, 210, 220, ${flake.opacity})`;
        ctx.fillRect(px, py, pixelSize, pixelSize);
      });

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createSnowflakes]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
