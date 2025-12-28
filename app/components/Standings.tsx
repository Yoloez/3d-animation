"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// LaLiga Standings Data
const standingsData = [
  { pos: 1, club: "Barcelona", logo: "/assets/images/club/fc-barcelona.svg", mp: 38, w: 28, d: 4, l: 6, gf: 102, ga: 39, gd: 63, pts: 88, form: ["W", "W", "W", "L", "W"], zone: "champions" },
  { pos: 2, club: "Real Madrid", logo: "⚪", mp: 38, w: 26, d: 6, l: 6, gf: 78, ga: 38, gd: 40, pts: 84, form: ["W", "L", "W", "W", "W"], zone: "champions" },
  { pos: 3, club: "Atlético Madrid", logo: "🔴⚪", mp: 38, w: 22, d: 10, l: 6, gf: 68, ga: 30, gd: 38, pts: 76, form: ["D", "L", "W", "W", "W"], zone: "champions" },
  { pos: 4, club: "Athletic Club", logo: "🔴⚪", mp: 38, w: 19, d: 13, l: 6, gf: 54, ga: 29, gd: 25, pts: 70, form: ["D", "W", "W", "W", "L"], zone: "champions" },
  { pos: 5, club: "Villarreal", logo: "🟡", mp: 38, w: 20, d: 10, l: 8, gf: 71, ga: 51, gd: 20, pts: 70, form: ["W", "W", "W", "W", "W"], zone: "europa" },
  { pos: 6, club: "Real Betis", logo: "🟢⚪", mp: 38, w: 16, d: 12, l: 10, gf: 57, ga: 50, gd: 7, pts: 60, form: ["W", "D", "D", "L", "D"], zone: "europa" },
  { pos: 7, club: "Celta Vigo", logo: "💙", mp: 38, w: 16, d: 7, l: 15, gf: 59, ga: 57, gd: 2, pts: 55, form: ["L", "W", "W", "L", "W"], zone: "conference" },
];

const getZoneColor = (zone: string) => {
  switch (zone) {
    case "champions":
      return "before:bg-green-500";
    case "europa":
      return "before:bg-blue-500";
    case "conference":
      return "before:bg-yellow-500";
    default:
      return "before:bg-transparent";
  }
};

const FormIndicator = ({ result }: { result: string }) => {
  const bgColor = result === "W" ? "bg-green-500" : result === "L" ? "bg-red-500" : "bg-gray-500";
  return <div className={`w-7 h-7 rounded-full ${bgColor} flex items-center justify-center text-white text-xs font-bold shadow-lg hover:scale-125 transition-transform duration-200`}>{result}</div>;
};

const Standings = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const table = tableRef.current;
    const rows = rowsRef.current.filter(Boolean);

    if (!container || !header || !table || rows.length === 0) return;

    // Set initial 3D perspective with better settings
    gsap.set(container, { 
      perspective: 1500,
      transformStyle: "preserve-3d" 
    });

    // Header 3D entrance animation
    gsap.fromTo(
      header,
      {
        opacity: 0,
        y: -80,
        rotationX: -25,
        z: -200,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        z: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      }
    );

    // Table container 3D animation
    gsap.fromTo(
      table,
      {
        opacity: 0,
        rotationX: 15,
        y: 50,
        z: -100,
      },
      {
        opacity: 1,
        rotationX: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: table,
          start: "top 80%",
          end: "top 40%",
          scrub: 1.5,
          toggleActions: "play none none reverse",
        },
      }
    );

    // Rows 3D stagger animation
    gsap.fromTo(
      rows,
      {
        opacity: 0,
        x: -80,
        rotationY: -20,
        z: -50,
      },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        z: 0,
        duration: 0.6,
        stagger: {
          amount: 0.5,
          from: "start",
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: table,
          start: "top 75%",
          end: "top 30%",
          scrub: 2,
          toggleActions: "play none none reverse",
        },
      }
    );

    // Lightweight hover animations
    rows.forEach((row) => {
      if (!row) return;

      const hoverTimeline = gsap.timeline({ paused: true });

      hoverTimeline.to(row, {
        scale: 1.03,
        z: 30,
        rotationY: 2,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });

      row.addEventListener("mouseenter", () => hoverTimeline.play());
      row.addEventListener("mouseleave", () => hoverTimeline.reverse());
    });

    // Parallax effect on mouse move (lightweight)
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth parallax animation with throttled updates
    let animationId: number;
    const animateParallax = () => {
      gsap.to(table, {
        rotationY: mouseX * 2,
        rotationX: -mouseY * 2,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Use throttled animation for better performance
    const throttledParallax = () => {
      animateParallax();
      animationId = requestAnimationFrame(throttledParallax);
    };
    throttledParallax();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-accent py-20 px-4 overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16" style={{ transformStyle: "preserve-3d" }}>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full"></div>
              <h1 className="relative text-5xl md:text-7xl font-black text-white tracking-tight bg-clip-text">LaLiga Standings</h1>
            </div>
          </div>
          <div className="inline-block px-6 py-2 bg-accent/30 rounded-full border border-secondary/30 backdrop-blur-sm">
            <p className="text-white/90 text-lg font-medium">2024/2025 Season</p>
          </div>
        </div>

        {/* Table Container */}
        <div ref={tableRef} className="backdrop-blur-2xl bg-white/5 rounded-3xl p-4 md:p-8 shadow-2xl border border-white/10 overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 pointer-events-none rounded-3xl"></div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[60px_1fr_60px_60px_60px_60px_80px_80px_80px_90px_180px] gap-3 px-8 py-5 bg-gradient-to-r from-accent/40 to-accent/20 rounded-2xl mb-4 text-white font-bold text-sm border border-secondary/10 shadow-lg backdrop-blur-sm">
            <div className="text-center">POS</div>
            <div>CLUB</div>
            <div className="text-center">MP</div>
            <div className="text-center">W</div>
            <div className="text-center">D</div>
            <div className="text-center">L</div>
            <div className="text-center">GF</div>
            <div className="text-center">GA</div>
            <div className="text-center">GD</div>
            <div className="text-center">PTS</div>
            <div className="text-center">FORM</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {standingsData.map((team, index) => (
              <div
                key={team.pos}
                ref={(el) => {
                  rowsRef.current[index] = el;
                }}
                className={`
                  group relative grid md:grid-cols-[60px_1fr_60px_60px_60px_60px_80px_80px_80px_90px_180px] gap-3 
                  px-8 py-6 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-2xl
                  hover:from-secondary/15 hover:via-accent/10 hover:to-transparent
                  transition-all duration-300 cursor-pointer
                  border border-white/10 hover:border-secondary/30
                  shadow-lg hover:shadow-2xl
                  before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l-2xl
                  ${getZoneColor(team.zone)}
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

                {/* Position */}
                <div className="flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary via-yellow-500 to-yellow-600 flex items-center justify-center font-black text-primary text-lg shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {team.pos}
                  </div>
                </div>

                {/* Club */}
                <div className="flex items-center gap-4 relative z-10">
                  <span className="text-white font-bold text-lg group-hover:text-secondary transition-colors">{team.club}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center text-white/90 font-semibold text-base relative z-10">{team.mp}</div>
                <div className="flex items-center justify-center text-green-400 font-semibold text-base relative z-10">{team.w}</div>
                <div className="flex items-center justify-center text-gray-400 font-semibold text-base relative z-10">{team.d}</div>
                <div className="flex items-center justify-center text-red-400 font-semibold text-base relative z-10">{team.l}</div>
                <div className="flex items-center justify-center text-white/90 font-semibold text-base relative z-10">{team.gf}</div>
                <div className="flex items-center justify-center text-white/90 font-semibold text-base relative z-10">{team.ga}</div>
                <div className={`flex items-center justify-center font-bold text-base relative z-10 ${team.gd > 0 ? "text-green-400" : team.gd < 0 ? "text-red-400" : "text-gray-400"}`}>
                  {team.gd > 0 ? "+" : ""}
                  {team.gd}
                </div>

                {/* Points */}
                <div className="flex items-center justify-center relative z-10">
                  <div className="px-5 py-3 bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-xl text-white font-black text-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 border border-secondary/20">
                    {team.pts}
                  </div>
                </div>

                {/* Form */}
                <div className="flex items-center justify-center gap-1.5 relative z-10">
                  {team.form.map((result, i) => (
                    <FormIndicator key={i} result={result} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-8 justify-center text-sm">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
              <span className="text-white/90 font-medium">Champions League</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
              <span className="text-white/90 font-medium">Europa League</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
              <span className="text-white/90 font-medium">Conference League</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standings;
