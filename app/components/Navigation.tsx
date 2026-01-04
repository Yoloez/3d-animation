"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavigationProps {
  show: boolean;
}

export default function Navigation({ show }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className={`mx-auto max-w-7xl transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        <div
          className={`mx-4 rounded-2xl backdrop-blur-md bg-primary/30 border border-secondary shadow-xl transition-all duration-300 ${scrolled ? "bg-primary/80" : ""}`}
          style={{
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Image src="/assets/images/club/fc-barcelona.svg" alt="FC Barcelona" width={24} height={24} />
              </div>
              <span className="text-white font-bold text-lg hidden sm:block group-hover:text-secondary transition-colors duration-300">BARÇA</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#team" className="text-white/90 hover:text-secondary transition-colors duration-300 font-medium relative group">
                Team
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#matches" className="text-white/90 hover:text-secondary transition-colors duration-300 font-medium relative group">
                Matches
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#news" className="text-white/90 hover:text-secondary transition-colors duration-300 font-medium relative group">
                News
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#gallery" className="text-white/90 hover:text-secondary transition-colors duration-300 font-medium relative group">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                href={"https://www.fcbarcelona.com/"}
                target="_blank"
                className="hidden sm:block px-6 py-2 bg-primary text-white rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer border-accent border-2"
              >
                Visit Official
              </Link>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
