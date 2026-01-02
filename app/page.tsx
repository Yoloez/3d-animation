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

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTargetRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    gsap.registerPlugin(ScrollTrigger);

    // iOS video activation helper
    const once = (el: HTMLElement | Document, event: string, fn: EventListener) => {
      const onceFn = (e: Event) => {
        el.removeEventListener(event, onceFn);
        fn(e);
      };
      el.addEventListener(event, onceFn);
      return onceFn;
    };

    // Activate video on iOS
    once(document.documentElement, "touchstart", () => {
      video.play();
      video.pause();
    });

    // Setup ultra-smooth ScrollTrigger animation
    const setupScrollTrigger = () => {
      // Kill any existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      let targetTime = 0;
      let currentTime = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Lebih responsive untuk video pendek
          pin: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => setShowNav(false),
          onLeave: () => setShowNav(true),
          onEnterBack: () => setShowNav(false),
          onLeaveBack: () => setShowNav(true),
          markers: false,
          refreshPriority: 1,
        },
      });

      // Animate title dengan zoom out dan fade out
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          scale: 3,
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "80% top",
            scrub: 1,
            markers: false,
          },
        });
      }

      // Animate menggunakan dummy object untuk kontrol yang lebih smooth
      const obj = { progress: 0 };

      tl.to(obj, {
        progress: 1,
        ease: "none",
        duration: 1,
        onUpdate: function () {
          targetTime = this.progress() * video.duration;
        },
      });

      // RequestAnimationFrame untuk interpolasi smooth
      const updateVideoTime = () => {
        if (!video) return;

        // Smooth lerp (linear interpolation) untuk menghindari jitter
        const lerpFactor = 0.1; // Semakin kecil = semakin smooth
        currentTime += (targetTime - currentTime) * lerpFactor;

        // Update video time hanya jika perbedaannya signifikan
        if (Math.abs(video.currentTime - currentTime) > 0.02) {
          video.currentTime = currentTime;
        }

        animationFrameRef.current = requestAnimationFrame(updateVideoTime);
      };

      updateVideoTime();
      setIsVideoLoaded(true);

      // Modern 3D Logo Animation
      if (logoRef.current && logoTargetRef.current) {
        // Set initial 3D perspective styles
        gsap.set(logoRef.current, {
          transformPerspective: 1000,
          transformOrigin: "center center",
          z: 0,
        });

        // Create epic 3D flight animation timeline
        const logoTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: 1.5,
            markers: false,
          },
        });

        // Get target position
        const targetRect = logoTargetRef.current.getBoundingClientRect();
        const startRect = logoRef.current.getBoundingClientRect();

        const deltaX = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2);
        const deltaY = targetRect.top + targetRect.height / 2 - (startRect.top + startRect.height / 2);

        // Phase 1: Lift off with 3D rotation and glow
        logoTl.to(logoRef.current, {
          scale: 1.8,
          rotateY: 180,
          rotateX: 15,
          z: 300,
          filter: "drop-shadow(0 0 30px rgba(255, 204, 0, 0.8)) drop-shadow(0 0 60px rgba(164, 22, 35, 0.6))",
          duration: 0.3,
          ease: "power2.out",
        });

        // Phase 2: Flying arc motion with continuous rotation
        logoTl.to(logoRef.current, {
          x: deltaX,
          y: deltaY + window.innerHeight * 0.8,
          scale: 0.6,
          rotateY: 540,
          rotateX: -10,
          rotateZ: 360,
          z: 150,
          filter: "drop-shadow(0 0 50px rgba(255, 204, 0, 1)) drop-shadow(0 0 100px rgba(164, 22, 35, 0.8))",
          duration: 0.5,
          ease: "power1.inOut",
        });

        // Phase 3: Landing with bounce effect
        logoTl.to(logoRef.current, {
          scale: 0.8,
          rotateY: 720,
          rotateX: 0,
          rotateZ: 0,
          z: 0,
          filter: "drop-shadow(0 0 20px rgba(255, 204, 0, 0.5)) drop-shadow(0 0 40px rgba(164, 22, 35, 0.4))",
          duration: 0.2,
          ease: "back.out(1.7)",
        });
      }
    };

    // Handle video metadata load
    const handleMetadataLoad = () => {
      setupScrollTrigger();
    };

    // Handle video can play through
    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
    };

    if (video.readyState >= 1) {
      setupScrollTrigger();
    } else {
      video.addEventListener("loadedmetadata", handleMetadataLoad);
      video.addEventListener("canplaythrough", handleCanPlayThrough);
    }

    // Optimize video loading with blob
    const src = video.currentSrc || video.src;
    const loadAsBlob = async () => {
      if ((window.fetch as any) && src) {
        try {
          const response = await fetch(src);
          const blob = await response.blob();
          const blobURL = URL.createObjectURL(blob);
          const currentTime = video.currentTime;

          once(document.documentElement, "touchstart", () => {
            video.play();
            video.pause();
          });

          video.src = blobURL;
          video.currentTime = currentTime + 0.01;
          return blobURL;
        } catch (err) {
          console.error("Error loading video blob:", err);
        }
      }
      return null;
    };

    let blobURL: string | null = null;
    const blobTimeout = setTimeout(async () => {
      blobURL = await loadAsBlob();
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(blobTimeout);
      if (blobURL) {
        URL.revokeObjectURL(blobURL);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.removeEventListener("loadedmetadata", handleMetadataLoad);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <PageLoader minLoadTime={2500}>
      <Navigation show={showNav} />

      {/* Video Scroll Section */}
      <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
        <div className="sticky top-0 h-screen w-screen overflow-hidden bg-black">
          {!isVideoLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
                <p className="text-sm text-white/80">Loading video...</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            src="/assets/videos/bg-gsap-test.mp4"
            muted
            playsInline
            className="h-full w-full object-cover transition-opacity duration-700"
            style={{
              opacity: isVideoLoaded ? 1 : 0.3,
              transform: "translateZ(0)",
              willChange: "transform",
            }}
            preload="auto"
            webkit-playsinline="true"
            x5-playsinline="true"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            crossOrigin="anonymous"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-primary" />

          {/* FC Barcelona Title */}
          <div ref={titleRef} className="absolute inset-0 z-20 flex items-center flex-col justify-center pointer-events-none">
            <h1 className="text-4xl md:text-9xl font-black text-white tracking-wider">FC BARCELONA</h1>
            <div
              ref={logoRef}
              className="logo-3d-container"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <Image src={"/assets/images/club/fc-barcelona.svg"} alt="barca" height={100} width={100} className="logo-3d z-1000" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      {/* Logo Target Container */}
      <div
        ref={logoTargetRef}
        className="h-50 bg-linear-to-b from-primary to-primary relative flex items-center justify-center "
        id="logo"
        style={{
          perspective: "1000px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: "1000px" }}>
          <div className="logo-flip-3d">
            <Image src={"/assets/images/club/fc-barcelona.svg"} alt="barca" height={100} width={100} className="z-1000" />
          </div>
        </div>
      </div>
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
      {/* <Logo /> */}

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
          animation: fade-up 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        video {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        .logo-3d-container {
          transform-style: preserve-3d;
          backface-visibility: visible;
          will-change: transform, filter;
        }

        .logo-3d {
          transform-style: preserve-3d;
          backface-visibility: visible;
          transition: filter 0.1s ease;
        }

        /* 3D FLIP ROTATION - Depan ke Belakang (Horizontal) */
        @keyframes logo-flip-3d {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        /* 3D FLIP ROTATION - Atas ke Bawah (Vertical) */
        @keyframes logo-flip-vertical {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(360deg);
          }
        }

        /* 3D TUMBLE - Diagonal */
        @keyframes logo-tumble {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }

        .logo-flip-3d {
          animation: logo-flip-3d 3s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .logo-flip-vertical {
          animation: logo-flip-vertical 3s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .logo-tumble {
          animation: logo-tumble 4s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        @keyframes logo-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(255, 204, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(255, 204, 0, 0.8)) drop-shadow(0 0 50px rgba(164, 22, 35, 0.6));
          }
        }

        .logo-3d-container:hover .logo-3d {
          animation: logo-glow 1.5s ease-in-out infinite;
        }
      `}</style>
    </PageLoader>
  );
}
