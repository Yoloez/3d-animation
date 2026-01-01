"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaInstagram, FaYoutube, FaTiktok, FaFacebookF } from "react-icons/fa6";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="relative text-secondary/70 hover:text-secondary transition-colors duration-300 text-sm group">
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-px bg-secondary group-hover:w-full transition-all duration-300" />
    </Link>
  );
};

const SocialIcon = ({ href, children, label }: { href: string; children: React.ReactNode; label: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-primary/50 border border-secondary/20 hover:border-secondary/60 transition-all duration-300 hover:scale-110"
      style={{ transformStyle: "preserve-3d", perspective: "500px" }}
    >
      <span className="text-secondary/70 group-hover:text-secondary transition-colors duration-300 group-hover:scale-110 transform">{children}</span>
      <span className="absolute inset-0 rounded-xl bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </Link>
  );
};

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 30, y: y * -30 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 group">
                <Image src="/assets/images/club/fc-barcelona.svg" alt="FC Barcelona" fill className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div>
                <h3 className="text-secondary font-bold text-xl tracking-wide">FC BARCELONA</h3>
                <p className="text-secondary/50 text-sm">Més que un club</p>
              </div>
            </div>
            <p className="text-secondary/60 text-sm leading-relaxed max-w-md">Experience the passion, history, and glory of FC Barcelona. Join millions of culés worldwide in celebrating the beautiful game.</p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="https://twitter.com/FCBarcelona" label="Twitter">
                <FaXTwitter size={18} />
              </SocialIcon>
              <SocialIcon href="https://instagram.com/fcbarcelona" label="Instagram">
                <FaInstagram size={18} />
              </SocialIcon>
              <SocialIcon href="https://youtube.com/fcbarcelona" label="YouTube">
                <FaYoutube size={18} />
              </SocialIcon>
              <SocialIcon href="https://tiktok.com/@fcbarcelona" label="TikTok">
                <FaTiktok size={18} />
              </SocialIcon>
              <SocialIcon href="https://facebook.com/fcbarcelona" label="Facebook">
                <FaFacebookF size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Club */}
            <div className="space-y-4">
              <h4 className="text-secondary font-semibold text-sm uppercase tracking-wider">Club</h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/history">History</FooterLink>
                <FooterLink href="/stadium">Camp Nou</FooterLink>
                <FooterLink href="/foundation">Foundation</FooterLink>
              </nav>
            </div>

            {/* Team */}
            <div className="space-y-4">
              <h4 className="text-secondary font-semibold text-sm uppercase tracking-wider">Team</h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/first-team">First Team</FooterLink>
                <FooterLink href="/la-masia">La Masía</FooterLink>
                <FooterLink href="/women">Women&apos;s Team</FooterLink>
                <FooterLink href="/coaches">Coaching Staff</FooterLink>
              </nav>
            </div>

            {/* Fans */}
            <div className="space-y-4">
              <h4 className="text-secondary font-semibold text-sm uppercase tracking-wider">Fans</h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/membership">Membership</FooterLink>
                <FooterLink href="/tickets">Tickets</FooterLink>
                <FooterLink href="/shop">Official Store</FooterLink>
                <FooterLink href="/tours">Stadium Tours</FooterLink>
              </nav>
            </div>
          </div>
        </div>

        {/* 3D Animated Title */}
        <div className="relative py-12 border-t border-secondary/10">
          <div className="flex justify-center items-center" style={{ perspective: "1000px" }}>
            <h2
              ref={titleRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={handleMouseLeave}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-linear-to-br from-secondary via-accent to-secondary cursor-pointer select-none transition-all duration-200 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: `
                  rotateX(${mousePosition.y}deg) 
                  rotateY(${mousePosition.x}deg) 
                  translateZ(${isHovering ? "50px" : "0px"})
                `,
                textShadow: isHovering
                  ? `
                    0 0 40px rgba(252, 197, 43, 0.5),
                    0 0 80px rgba(153, 0, 64, 0.3),
                    0 20px 60px rgba(0, 0, 0, 0.5)
                  `
                  : "none",
                filter: isHovering ? "drop-shadow(0 0 30px rgba(252, 197, 43, 0.4))" : "none",
              }}
            >
              FC BARCELONA
            </h2>
          </div>

          {/* Decorative Lines */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center gap-2">
            <div className="w-20 h-[2px] bg-linear-to-r from-transparent to-secondary/50" />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="w-20 h-[2px] bg-linear-to-l from-transparent to-secondary/50" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-secondary/10">
          <p className="text-secondary/40 text-sm">© {currentYear} FC Barcelona. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Settings</FooterLink>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-accent/10 to-transparent pointer-events-none" />

      <style jsx>{`
        h2 {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </footer>
  );
}
