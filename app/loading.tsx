"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-primary overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      {/* Rotating Ring */}
      <div className="absolute w-48 h-48 md:w-64 md:h-64">
        <div
          className="absolute inset-0 rounded-full border-4 border-secondary/20"
          style={{
            borderTopColor: "var(--secondary)",
            borderRightColor: "var(--accent)",
            animation: "spin-slow 2s linear infinite",
          }}
        />
        <div
          className="absolute inset-2 rounded-full border-4 border-accent/20"
          style={{
            borderBottomColor: "var(--secondary)",
            borderLeftColor: "var(--accent)",
            animation: "spin-slow 3s linear infinite reverse",
          }}
        />
        <div
          className="absolute inset-4 rounded-full border-2 border-secondary/30"
          style={{
            borderTopColor: "var(--accent)",
            animation: "spin-slow 1.5s linear infinite",
          }}
        />
      </div>
      {/* 3D Logo Container */}
      <div
        className="relative w-32 h-32 md:w-40 md:h-40"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="logo-3d-flip w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            animation: "logo-3d-rotate 3s ease-in-out infinite",
          }}
        >
          <Image
            src="/assets/images/club/fc-barcelona.svg"
            alt="FC Barcelona"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 30px rgba(252, 197, 43, 0.6)) drop-shadow(0 0 60px rgba(153, 0, 64, 0.4))",
            }}
            priority
          />
        </div>
      </div>
      {/* Loading Text */}
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
        <h3 className=" text-secondary/60 tracking-wider text-6xl">Press F11 For Better Experience</h3>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 h-1 bg-secondary/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-secondary via-accent to-secondary rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: "0 0 20px rgba(252, 197, 43, 0.6)",
            }}
          />
        </div>

        <p className="text-secondary/60 text-sm tracking-wider animate-pulse">Press F11 For Better Experience</p>
      </div>
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? "var(--secondary)" : "var(--accent)",
              left: `${10 + i * 7}%`,
              top: `${20 + i * 5}%`,
              opacity: 0.4,
              animation: `float-particle ${3 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes logo-3d-rotate {
          0%,
          100% {
            transform: rotateY(0deg) rotateX(0deg) scale(1);
          }
          25% {
            transform: rotateY(15deg) rotateX(10deg) scale(1.05);
          }
          50% {
            transform: rotateY(0deg) rotateX(0deg) scale(1.1);
          }
          75% {
            transform: rotateY(-15deg) rotateX(-10deg) scale(1.05);
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

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) translateX(10px) scale(1.5);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
