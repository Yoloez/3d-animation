"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import trio from "@/public/assets/images/trio-barca.webp";
import Navigation from "./components/Navigation";
import About from "./components/About";
import type {} from "gsap/ScrollTrigger";
import ScrollVelocity from "@/components/ScrollVelocity";
import Standings from "./components/Standings";
import BackgroundMusic from "./components/BackgroundMusic";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import Thropy from "./components/Thropy";

export default function Home() {
  // Refs for 3D scroll animation
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [showNav, setShowNav] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);

  // Callback when PageLoader finishes
  const handleLoadComplete = () => {
    setIsPageReady(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wait for page to be ready
    const initAnimations = () => {
      // Kill ONLY hero animation ScrollTriggers (not all, to preserve other components)
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "hero-3d-animation") {
          trigger.kill();
        }
      });

      // Main scroll animation timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: false,
          anticipatePin: 1,
          id: "hero-3d-animation",
          onEnter: () => setShowNav(false),
          onLeave: () => setShowNav(true),
          onEnterBack: () => setShowNav(false),
          onLeaveBack: () => setShowNav(true),
        },
      });

      // FRAME ANIMATION - Scales up and fades out (moving backward on z-axis)
      if (frameRef.current) {
        gsap.set(frameRef.current, {
          scale: 1,
          opacity: 1,
          transformPerspective: 1200,
          transformOrigin: "center center",
        });

        mainTl.to(
          frameRef.current,
          {
            scale: 1.8,
            opacity: 0,
            z: -200,
            ease: "power2.out",
            duration: 0.6,
          },
          0
        );
      }

      // BACKGROUND IMAGE - Zooms in (moving closer to viewer)
      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, {
          scale: 1,
          transformPerspective: 1200,
          transformOrigin: "center center",
        });

        mainTl.to(
          backgroundRef.current,
          {
            scale: 1.5,
            ease: "power2.out",
            duration: 1,
          },
          0
        );
      }

      // TEXT ANIMATION - Fades in and translates up
      if (textRef.current) {
        gsap.set(textRef.current, {
          opacity: 0,
          y: 60,
        });

        mainTl.to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.5,
          },
          0.3
        );
      }

      // TITLE ANIMATION - Zoom out effect
      if (titleRef.current) {
        mainTl.to(
          titleRef.current,
          {
            scale: 0.6,
            opacity: 0,
            y: -80,
            filter: "blur(8px)",
            ease: "power2.inOut",
            duration: 0.5,
          },
          0
        );
      }

      // SUBTITLE ANIMATION - Delayed fade out
      if (subtitleRef.current) {
        mainTl.to(
          subtitleRef.current,
          {
            opacity: 0,
            y: -40,
            ease: "power2.out",
            duration: 0.4,
          },
          0.1
        );
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initAnimations, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "hero-3d-animation") {
          trigger.kill();
        }
      });
    };
  }, [isPageReady]);

  return (
    <PageLoader minLoadTime={2500} onLoadComplete={handleLoadComplete}>
      <Navigation show={showNav} />

      {/* 3D Scroll Animation Section */}
      <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen w-screen overflow-hidden bg-primary">
          {/* Perspective Container */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "center center",
            }}
          >
            {/* Background Image - Zooms in on scroll */}
            <div
              ref={backgroundRef}
              className="absolute inset-0 z-10"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Image src="/assets/images/parade.webp" alt="Camp Nou Stadium" fill priority className="object-cover" sizes="100vw" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-primary" />
            </div>

            {/* Decorative Border Frame - Foreground with higher z-index */}
            <div
              ref={frameRef}
              className="absolute inset-8 md:inset-16 lg:inset-24 z-30 pointer-events-none"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Frame Border */}
              <div className="absolute inset-0 border-4 md:border-8 border-secondary/80 rounded-3xl shadow-2xl">
                {/* Corner Decorations */}
                <div className="absolute -top-2 -left-2 w-8 h-8 md:w-12 md:h-12 border-t-4 border-l-4 border-secondary rounded-tl-xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 md:w-12 md:h-12 border-t-4 border-r-4 border-secondary rounded-tr-xl" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 md:w-12 md:h-12 border-b-4 border-l-4 border-secondary rounded-bl-xl" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-12 md:h-12 border-b-4 border-r-4 border-secondary rounded-br-xl" />
              </div>

              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-3xl shadow-inner opacity-50" style={{ boxShadow: "inset 0 0 100px rgba(252, 197, 43, 0.3)" }} />
            </div>

            {/* Main Title - Center of frame */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-wider text-center drop-shadow-2xl"
                style={{
                  textShadow: "0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(252, 197, 43, 0.3)",
                }}
              >
                FC BARCELONA
              </h1>
              <p ref={subtitleRef} className="mt-4 text-lg md:text-2xl text-secondary font-medium tracking-widest">
                MÉS QUE UN CLUB
              </p>
            </div>

            {/* Scroll-revealed Text Content */}
            <div ref={textRef} className="absolute bottom-16 md:bottom-24 left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <p className="text-base md:text-xl text-white/90 max-w-2xl leading-relaxed">Experience the passion, glory, and legacy of the world&apos;s greatest football club</p>
              <div className="mt-6 flex items-center gap-2 text-secondary/80">
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-sm tracking-wider">Scroll to explore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Gradient */}
      <div className="relative z-100000 h-50 bg-linear-to-b from-primary to-primary">
        <Image src="/assets/images/club/fc-barcelona.svg" alt="Camp Nou Stadium" width={120} height={120} priority className="absolute top-1/2 left-1/2 animate-[flip-horizontal_2s_ease-in-out_infinite]" />
      </div>

      {/* Hero Section - Trio Image */}
      <section id="trio-hero" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-b from-primary/90 h-10 via-black/40 to-transparent" />
        <Image src={trio} alt="Barca" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-primary" />
        <div className="relative z-10 flex h-full items-end justify-center pb-24 text-white">
          <ScrollVelocity texts={["FC Barcelona", "Crazy Season"]} velocity={70} className="custom-scroll-text" />
        </div>
      </section>

      <About onScrollStateChange={setShowNav} />
      <Standings />
      <BackgroundMusic />
      <Footer />

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }

        @keyframes flip-horizontal {
          0% {
            transform: translate(-50%, -50%) scaleX(1);
          }
          50% {
            transform: translate(-50%, -50%) scaleX(-1);
          }
          100% {
            transform: translate(-50%, -50%) scaleX(1);
          }
        }
      `}</style>
    </PageLoader>
  );
}
