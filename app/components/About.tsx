import React from "react";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
import Logo from "./Logo";

const About = ({ onScrollStateChange }: { onScrollStateChange?: (isScrolling: boolean) => void }) => {
  return (
    <>
      <div className="bg-primary">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-10 z-20 py-8 px-4 md:px-8 pt-12 flex-row bg-primary">
          <h2 className="text-3xl md:text-2xl font-bold text-white text-center">2024/2025</h2>
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <p className="text-sm font-medium">Scroll Down</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Logo Component - Horizontal Scroll Container */}
        <Logo onScrollStateChange={onScrollStateChange} />
      </div>

      {/* Scroll Indicator - Outside the pinned section */}
    </>
  );
};

export default About;
