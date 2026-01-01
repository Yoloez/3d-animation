import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const standingsData = [
  { pos: 1, club: "Barcelona", mp: 38, w: 28, d: 4, l: 6, gf: 102, ga: 39, gd: 63, pts: 88, form: ["W", "W", "W", "L", "W"], zone: "champions" },
  { pos: 2, club: "Real Madrid", mp: 38, w: 26, d: 6, l: 6, gf: 78, ga: 38, gd: 40, pts: 84, form: ["W", "L", "W", "W", "W"], zone: "europa" },
  { pos: 3, club: "Atlético Madrid", mp: 38, w: 22, d: 10, l: 6, gf: 68, ga: 30, gd: 38, pts: 76, form: ["D", "L", "W", "W", "W"], zone: "conference" },
  { pos: 4, club: "Sevilla", mp: 38, w: 20, d: 8, l: 10, gf: 62, ga: 45, gd: 17, pts: 68, form: ["W", "D", "W", "L", "W"], zone: "conference" },
  { pos: 5, club: "Real Sociedad", mp: 38, w: 18, d: 12, l: 8, gf: 55, ga: 38, gd: 17, pts: 66, form: ["D", "W", "W", "W", "D"], zone: "normal" },
];

const FormIndicator = ({ result }) => {
  const bgColor = result === "W" ? "bg-third" : result === "L" ? "bg-accent" : "bg-secondary";
  const textColor = result === "W" ? "text-primary" : "text-white";
  return <div className={`w-7 h-7 rounded-full ${bgColor} ${textColor} flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300`}>{result}</div>;
};

const Standings = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const rowRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Initial animations
    gsap.fromTo(titleRef.current, { opacity: 0, y: -100, scale: 0.8, rotationX: -90 }, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "power4.out" });

    gsap.fromTo(headerRef.current, { opacity: 0, y: 50, rotationX: 45 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });

    rowRefs.current.forEach((row, index) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -100, rotationY: -25 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          delay: 0.5 + index * 0.1,
          ease: "power3.out",
        }
      );
    });

    // Mouse parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });

      gsap.to(containerRef.current, {
        rotationY: x * 0.3,
        rotationX: -y * 0.3,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleRowHover = (index, isEnter) => {
    const row = rowRefs.current[index];
    if (isEnter) {
      gsap.to(row, {
        scale: 1.05,
        z: 50,
        rotationY: mousePos.x * 0.5,
        boxShadow: "0 25px 50px -12px rgba(153, 0, 64, 0.5)",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(row, {
        scale: 1,
        z: 0,
        rotationY: 0,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const getZoneBorder = (zone) => {
    switch (zone) {
      case "champions":
        return "border-l-4 border-l-secondary";
      case "europa":
        return "border-l-4 border-l-accent";
      case "conference":
        return "border-l-4 border-l-third";
      default:
        return "border-l-4 border-l-primary/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-accent/80 py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto perspective-[2000px]">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black text-secondary mb-4 tracking-tight drop-shadow-2xl">LaLiga Standings</h1>
          <div className="inline-block px-8 py-3 bg-accent rounded-full border-2 border-secondary shadow-2xl">
            <p className="text-secondary text-xl font-bold">2024/2025 Season</p>
          </div>
        </div>

        {/* Table Container */}
        <div ref={containerRef} className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 shadow-2xl border-2 border-secondary/30" style={{ transformStyle: "preserve-3d" }}>
          {/* Desktop Header */}
          <div ref={headerRef} className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-accent rounded-2xl mb-4 shadow-xl border-2 border-secondary">
            <div className="col-span-1 text-center text-secondary font-black text-sm">RANK</div>
            <div className="col-span-3 text-secondary font-black text-sm">CLUB</div>
            <div className="col-span-1 text-center text-secondary font-black text-sm">MP</div>
            <div className="col-span-1 text-center text-secondary font-black text-sm">W</div>
            <div className="col-span-1 text-center text-secondary font-black text-sm">D</div>
            <div className="col-span-1 text-center text-secondary font-black text-sm">L</div>
            <div className="col-span-1 text-center text-secondary font-black text-sm">GD</div>
            <div className="col-span-1 text-center text-secondary font-black text-sm">PTS</div>
            <div className="col-span-2 text-center text-secondary font-black text-sm">FORM</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {standingsData.map((team, index) => (
              <div
                key={team.pos}
                ref={(el) => (rowRefs.current[index] = el)}
                className={`
                  relative rounded-2xl transition-all duration-300 cursor-pointer
                  ${getZoneBorder(team.zone)}
                  bg-gradient-to-r from-primary/60 to-primary/40 backdrop-blur-md
                  border-2 border-secondary/20 hover:border-secondary
                  shadow-xl
                `}
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={() => handleRowHover(index, true)}
                onMouseLeave={() => handleRowHover(index, false)}
              >
                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-5 items-center">
                  {/* Position */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-black text-secondary text-xl shadow-lg border-2 border-secondary">{team.pos}</div>
                  </div>

                  {/* Club */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-2xl border-2 border-secondary">⚽</div>
                    <span className="text-white font-bold text-lg">{team.club}</span>
                  </div>

                  {/* Stats */}
                  <div className="col-span-1 text-center text-white font-bold text-base">{team.mp}</div>
                  <div className="col-span-1 text-center text-third font-bold text-base">{team.w}</div>
                  <div className="col-span-1 text-center text-secondary font-bold text-base">{team.d}</div>
                  <div className="col-span-1 text-center text-accent font-bold text-base">{team.l}</div>
                  <div className={`col-span-1 text-center font-bold text-base ${team.gd > 0 ? "text-third" : team.gd < 0 ? "text-accent" : "text-secondary"}`}>
                    {team.gd > 0 ? "+" : ""}
                    {team.gd}
                  </div>

                  {/* Points */}
                  <div className="col-span-1 flex justify-center">
                    <div className="px-5 py-2 bg-secondary rounded-xl text-primary font-black text-xl shadow-lg border-2 border-accent">{team.pts}</div>
                  </div>

                  {/* Form */}
                  <div className="col-span-2 flex justify-center gap-2">
                    {team.form.map((result, i) => (
                      <FormIndicator key={i} result={result} />
                    ))}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden px-4 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-black text-secondary shadow-lg border-2 border-secondary">{team.pos}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xl border-2 border-secondary">⚽</div>
                        <span className="text-white font-bold text-base">{team.club}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-secondary rounded-xl text-primary font-black text-lg shadow-lg border-2 border-accent">{team.pts}</div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div className="text-center">
                      <div className="text-white/70 text-xs">MP</div>
                      <div className="text-white font-bold">{team.mp}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/70 text-xs">W</div>
                      <div className="text-third font-bold">{team.w}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/70 text-xs">D</div>
                      <div className="text-secondary font-bold">{team.d}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/70 text-xs">L</div>
                      <div className="text-accent font-bold">{team.l}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/70 text-xs">GD</div>
                      <div className={`font-bold ${team.gd > 0 ? "text-third" : team.gd < 0 ? "text-accent" : "text-secondary"}`}>
                        {team.gd > 0 ? "+" : ""}
                        {team.gd}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center">
                    {team.form.map((result, i) => (
                      <FormIndicator key={i} result={result} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/60 rounded-lg border-2 border-secondary/30">
              <div className="w-4 h-4 bg-secondary rounded"></div>
              <span className="text-white font-semibold">Champions League</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/60 rounded-lg border-2 border-accent/30">
              <div className="w-4 h-4 bg-accent rounded"></div>
              <span className="text-white font-semibold">Europa League</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/60 rounded-lg border-2 border-third/30">
              <div className="w-4 h-4 bg-third rounded"></div>
              <span className="text-white font-semibold">Conference League</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-[2000px] {
          perspective: 2000px;
        }
      `}</style>
    </div>
  );
};

export default Standings;
