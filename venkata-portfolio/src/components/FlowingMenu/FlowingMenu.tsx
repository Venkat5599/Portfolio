"use client";

import React from "react";
import MenuItem from "./MenuItem";

interface FlowingMenuProps {
  items: Array<{ text: string; link: string; image: string; description: React.ReactNode }>;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items }) => {
  // GSAP logic will be added in MenuItem for hover effect
  return (
    <div className="flowing-menu w-full flex flex-col divide-y divide-white/10">
      {items.map((item, idx) => (
        <MenuItem key={idx} {...item} />
      ))}
    </div>
  );
};

export default FlowingMenu;
