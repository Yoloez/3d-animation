"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface PageLoaderProps {
  children: React.ReactNode;
  minLoadTime?: number;
  onLoadComplete?: () => void;
}

export default function PageLoader({ children, minLoadTime = 2000, onLoadComplete }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 12;
      });
    }, 150);

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        setProgress(100);
        clearInterval(progressInterval);

        setTimeout(() => {
          setIsExiting(true);
          setShowContent(true);

          setTimeout(() => {
            setIsLoading(false);
            onLoadComplete?.();
          }, 600);
        }, 300);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", handleLoad);
    };
  }, [minLoadTime, onLoadComplete]);

  return (
    <>
      {/* Always render children - visibility controlled by showContent */}
      <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ visibility: showContent ? "visible" : "hidden" }}>
        {children}
      </div>

      {/* Loader Screen - only show while loading */}
      {isLoading && (
        <div className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-primary overflow-hidden transition-all duration-600 ${isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}>
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          {/* Rotating Rings */}
          <div className="absolute w-48 h-48 md:w-64 md:h-64">
            <div
              className="absolute inset-0 rounded-full border-4 border-secondary/20 animate-spin"
              style={{
                borderTopColor: "var(--secondary)",
                borderRightColor: "var(--accent)",
                animationDuration: "2s",
              }}
            />
            <div
              className="absolute inset-3 rounded-full border-4 border-accent/20"
              style={{
                borderBottomColor: "var(--secondary)",
                borderLeftColor: "var(--accent)",
                animation: "spin 3s linear infinite reverse",
              }}
            />
            <div
              className="absolute inset-6 rounded-full border-2 border-secondary/30 animate-spin"
              style={{
                borderTopColor: "var(--accent)",
                animationDuration: "1.5s",
              }}
            />
          </div>

          {/* 3D Logo Container */}
          <div
            className="relative w-32 h-32 md:w-40 md:h-40 z-10"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                animation: "logo-wobble 3s ease-in-out infinite",
              }}
            >
              <Image
                src="/assets/images/club/fc-barcelona.svg"
                alt="FC Barcelona"
                fill
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(252, 197, 43, 0.6)) drop-shadow(0 0 60px rgba(153, 0, 64, 0.4))",
                }}
                priority
              />
            </div>
          </div>

          {/* Loading Text & Progress */}
          <div className="mt-12 flex flex-col items-center gap-4 z-10">
            <h2
              className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-secondary via-accent to-secondary tracking-widest"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            >
              FC BARCELONA
            </h2>

            {/* Progress Bar */}
            <div className="w-48 md:w-64 h-1.5 bg-secondary/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-linear-to-r from-secondary via-accent to-secondary rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  boxShadow: "0 0 20px rgba(252, 197, 43, 0.6), 0 0 40px rgba(153, 0, 64, 0.4)",
                }}
              />
            </div>

            <p className="text-secondary/60 text-sm tracking-wider">{progress < 100 ? "Press F11 For Better Experience" : "Welcome!"}</p>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${4 + (i % 3) * 2}px`,
                  height: `${4 + (i % 3) * 2}px`,
                  background: i % 2 === 0 ? "var(--secondary)" : "var(--accent)",
                  left: `${5 + i * 6}%`,
                  top: `${15 + i * 5}%`,
                  opacity: 0.3 + (i % 3) * 0.2,
                  animation: `float-up ${4 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          <style jsx>{`
            @keyframes logo-wobble {
              0%,
              100% {
                transform: rotateY(0deg) rotateX(0deg) scale(1);
              }
              25% {
                transform: rotateY(20deg) rotateX(10deg) scale(1.08);
              }
              50% {
                transform: rotateY(0deg) rotateX(0deg) scale(1.12);
              }
              75% {
                transform: rotateY(-20deg) rotateX(-10deg) scale(1.08);
              }
            }

            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }

            @keyframes float-up {
              0%,
              100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0.3;
              }
              50% {
                transform: translateY(-40px) translateX(15px) scale(1.3);
                opacity: 0.7;
              }
            }

            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
