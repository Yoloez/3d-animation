"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavigationProps {
  show: boolean;
}

export default function Navigation({ show }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes or clicking outside
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#team", label: "Team" },
    { href: "#matches", label: "Matches" },
    { href: "#news", label: "News" },
    { href: "#gallery", label: "Gallery" },
  ];

  return (
    <>
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

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-white/90 hover:text-secondary transition-colors duration-300 font-medium relative group">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>

              {/* CTA Button & Mobile Menu */}
              <div className="flex items-center space-x-4">
                <Link
                  href={"https://www.fcbarcelona.com/"}
                  target="_blank"
                  className="hidden sm:block px-6 py-2 bg-primary text-white rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer border-accent border-2"
                >
                  Visit Official
                </Link>

                {/* Hamburger Menu Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 relative z-60" aria-label="Toggle menu">
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-0" : ""}`} />
                    <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={closeMenu} />

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-primary border-l border-secondary/30 shadow-2xl transition-transform duration-500 ease-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button onClick={closeMenu} className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300" aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col items-center justify-center h-[calc(100%-120px)] gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-2xl font-bold text-white hover:text-secondary transition-all duration-300 text-center relative group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.label}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href={"https://www.fcbarcelona.com/"}
            target="_blank"
            onClick={closeMenu}
            className="mt-8 px-8 py-3 bg-accent text-white rounded-full font-bold hover:scale-105 hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-center"
          >
            Visit Official Site
          </Link>
        </nav>

        {/* Decorative Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-secondary/10 to-transparent pointer-events-none" />
      </div>
    </>
  );
}
