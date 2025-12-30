import React from "react";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
import Logo from "./Logo";

const About = ({ onScrollStateChange }: { onScrollStateChange?: (isScrolling: boolean) => void }) => {
  return (
    <>
      <div id="gallery" className="bg-primary">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-10 z-20 py-8 pt-20 px-4 md:px-8 flex-row bg-primary">
          <h2 className="text-3xl md:text-2xl font-bold text-white text-center">2024/2025</h2>
        </div>

        {/* Logo Component - Horizontal Scroll Container */}
        <Logo onScrollStateChange={onScrollStateChange} />
      </div>

      {/* Scroll Indicator - Outside the pinned section */}
    </>
  );
};

export default About;
