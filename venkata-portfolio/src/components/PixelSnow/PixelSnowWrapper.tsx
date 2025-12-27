'use client';

import dynamic from 'next/dynamic';

const PixelSnow = dynamic(
  () => import('./PixelSnow').then((mod) => ({ default: mod.PixelSnow })),
  { ssr: false }
);

export const PixelSnowWrapper = () => {
  return <PixelSnow />;
};
