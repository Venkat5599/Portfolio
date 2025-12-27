"use client";

import React from "react";
import Link from "next/link";

interface ProjectBannerProps {
  title: string;
  subtitle: string;
  tag?: string;
  image: string;
  link: string;
}

const ProjectBanner: React.FC<ProjectBannerProps> = ({ title, subtitle, tag, image, link }) => {
  return (
    <Link href={link} className="block group w-full" prefetch={false}>
      <div
        className="relative w-full flex items-center justify-center overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-cyan-400/30 cursor-pointer"
        style={{ minHeight: '45vh', height: '60vh', maxHeight: '70vh' }}
      >
        {/* Background image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.7)' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10" style={{
          background: 'linear-gradient(120deg, #0a2540 60%, transparent 100%)',
          opacity: 0.85
        }} />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-6">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
            {title}
          </h2>
          <p className="text-cyan-300 text-lg md:text-2xl font-medium mb-2 drop-shadow-md">
            {subtitle}
          </p>
          {tag && (
            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-cyan-900/60 text-cyan-200 text-xs md:text-sm font-semibold tracking-wider">
              {tag}
            </span>
          )}
        </div>
        {/* Glow on hover */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-30" />
      </div>
    </Link>
  );
};

export default ProjectBanner;
