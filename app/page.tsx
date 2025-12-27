"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import trio from "@/public/assets/images/trio-barca.webp";
import Navigation from "./components/Navigation";
import React from "react";
import About from "./components/About";
import type {} from "gsap/ScrollTrigger";
import ScrollVelocity from "@/components/ScrollVelocity";
import Logo from "./components/Logo";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const animationFrameRef = useRef<number>();

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
    <>
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
            src="/assets/videos/try-again.mp4"
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

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        </div>
      </div>

      {/* Hero Section */}
      <section id="trio-hero" className="relative h-screen overflow-hidden">
        <Image src={trio} alt="Barca" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-primary" />
        <div className="relative z-10 flex h-full items-end justify-center pb-24 text-white">
          <ScrollVelocity texts={["FC Barcelona", "Crazy Season"]} velocity={70} className="custom-scroll-text" />
        </div>
      </section>
      <About />
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

        html {
          scroll-behavior: smooth;
        }

        video {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
      `}</style>
    </>
  );
}
