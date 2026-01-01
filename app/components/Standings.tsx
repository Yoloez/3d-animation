import React, { useState, useEffect } from "react";
import Image from "next/image";

const standingsData = [
  { pos: 1, club: "Barcelona", logo: "/assets/images/club/fc-barcelona.svg", mp: 38, w: 28, d: 4, l: 6, gf: 102, ga: 39, gd: 63, pts: 88, form: ["W", "W", "W", "L", "W"], zone: "champions" },
  { pos: 2, club: "Real Madrid", logo: "/assets/images/club/rm.svg", mp: 38, w: 26, d: 6, l: 6, gf: 78, ga: 38, gd: 40, pts: 84, form: ["W", "L", "W", "W", "W"], zone: "europa" },
  { pos: 3, club: "Atlético Madrid", logo: "/assets/images/club/atm.svg", mp: 38, w: 22, d: 10, l: 6, gf: 68, ga: 30, gd: 38, pts: 76, form: ["D", "L", "W", "W", "W"], zone: "conference" },
  // { pos: 4, club: "Athletic Club", logo: "🦁", mp: 38, w: 19, d: 13, l: 6, gf: 54, ga: 29, gd: 25, pts: 70, form: ["D", "W", "W", "W", "L"], zone: "champions" },
  // { pos: 5, club: "Villarreal", logo: "🟡", mp: 38, w: 20, d: 10, l: 8, gf: 71, ga: 51, gd: 20, pts: 70, form: ["W", "W", "W", "W", "W"], zone: "europa" },
  // { pos: 6, club: "Real Betis", logo: "🟢", mp: 38, w: 16, d: 12, l: 10, gf: 57, ga: 50, gd: 7, pts: 60, form: ["W", "D", "D", "L", "D"], zone: "europa" },
  // { pos: 7, club: "Celta Vigo", logo: "💙", mp: 38, w: 16, d: 7, l: 15, gf: 59, ga: 57, gd: 2, pts: 55, form: ["L", "W", "W", "L", "W"], zone: "conference" },
];

const FormIndicator = ({ result }) => {
  const bgColor = result === "W" ? "bg-third text-blue-600 " : result === "L" ? "bg-red-500 text-white" : "bg-gray-400 text-white";
  return <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full ${bgColor} flex items-center justify-center text-xs font-bold shadow-lg transition-transform hover:scale-125`}>{result}</div>;
};

const Standings = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getZoneBorder = (zone) => {
    switch (zone) {
      case "champions":
        return "border-b-4 border-b-accent/50";
      case "europa":
        return "border-b-4 border-b-white";
      case "conference":
        return "border-b-4 border-b-blue-900/80";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-primary via-primary/90 to-accent pt-30 py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <h1 className="text-5xl md:text-4xl font-black text-white mb-4 tracking-tight">LaLiga Standings</h1>
          <div className="inline-block px-6 py-2 bg-primary rounded-full border border-third backdrop-blur-sm">
            <p className="text-white/90 text-lg font-medium">2024/2025 Season</p>
          </div>
        </div>

        {/* Table Container */}
        <div
          className={`backdrop-blur-xl bg-white/5 rounded-3xl p-4 md:p-6 shadow-2xl border border-white/10 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{
            transform: `perspective(1500px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          {/* Desktop Header */}
          <div className="hidden lg:grid grid-cols-12 gap-2 px-6 py-4 bg-accent rounded-2xl mb-3 text-white font-bold text-xs border border-purple-400/20">
            <div className="col-span-1 text-center">RANK</div>
            <div className="col-span-3">CLUB</div>
            <div className="col-span-1 text-center">MP</div>
            <div className="col-span-1 text-center">W</div>
            <div className="col-span-1 text-center">D</div>
            <div className="col-span-1 text-center">L</div>
            <div className="col-span-1 text-center">GD</div>
            <div className="col-span-1 text-center">PTS</div>
            <div className="col-span-2 text-center">LAST 5 GAMES</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {standingsData.map((team, index) => (
              <div
                key={team.pos}
                className={`
                  group relative rounded-2xl transition-all duration-300 cursor-pointer
                  ${getZoneBorder(team.zone)}
                  ${hoveredRow === index ? "bg-white/15 shadow-2xl scale-[1.02]" : "bg-white/5 hover:bg-white/10"}
                  border border-white/10 hover:border-secondary
                `}
                style={{
                  transform: hoveredRow === index ? `perspective(1000px) translateZ(30px) rotateY(${mousePos.x * 0.5}deg)` : "none",
                  transition: "all 0.3s ease-out",
                  transitionDelay: `${index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `slideIn 0.5s ease-out ${index * 0.1}s forwards` : "none",
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-12 gap-2 px-6 py-5 items-center">
                  {/* Position */}
                  <div className="col-span-1 flex justify-center">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-accent text-base shadow-lg group-hover:scale-110 transition-transform">{team.pos}</div>
                  </div>

                  {/* Club */}
                  <div className="col-span-3 flex items-center gap-3">
                    <Image src={team.logo} alt={team.club} width={22} height={22} className="w-8 h-8  object-contain" />
                    <span className="text-white font-bold text-base group-hover:text-purple-300 transition-colors">{team.club}</span>
                  </div>

                  {/* Stats */}
                  <div className="col-span-1 text-center text-white/90 font-semibold">{team.mp}</div>
                  <div className="col-span-1 text-center text-third font-semibold">{team.w}</div>
                  <div className="col-span-1 text-center text-gray-400 font-semibold">{team.d}</div>
                  <div className="col-span-1 text-center text-red-400 font-semibold">{team.l}</div>
                  <div className={`col-span-1 text-center font-bold ${team.gd > 0 ? "text-third" : team.gd < 0 ? "text-red-400" : "text-gray-400"}`}>
                    {team.gd > 0 ? "+" : ""}
                    {team.gd}
                  </div>

                  {/* Points */}
                  <div className="col-span-1 flex justify-center">
                    <div className="px-4 py-2 bg-primary rounded-xl text-secondary font-black text-lg shadow-lg group-hover:scale-110 transition-all">{team.pts}</div>
                  </div>

                  {/* Form */}
                  <div className="col-span-2 flex justify-center gap-1">
                    {team.form.map((result, i) => (
                      <FormIndicator key={i} result={result} />
                    ))}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden px-4 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-black text-slate-900 shadow-lg">{team.pos}</div>
                      <div className="flex items-center gap-2">
                        <Image src={team.logo} alt={team.club} width={22} height={22} className="w-8 h-8  object-contain" />
                        <span className="text-white font-bold">{team.club}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-primary rounded-xl text-white font-black text-lg shadow-lg">{team.pts}</div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">
                      MP: <span className="text-white font-semibold">{team.mp}</span>
                    </span>
                    <span className="text-white/70">
                      W: <span className="text-third font-semibold">{team.w}</span>
                    </span>
                    <span className="text-white/70">
                      D: <span className="text-gray-400 font-semibold">{team.d}</span>
                    </span>
                    <span className="text-white/70">
                      L: <span className="text-red-400 font-semibold">{team.l}</span>
                    </span>
                    <span className="text-white/70">
                      GD:{" "}
                      <span className={`font-semibold ${team.gd > 0 ? "text-third" : team.gd < 0 ? "text-red-400" : "text-gray-400"}`}>
                        {team.gd > 0 ? "+" : ""}
                        {team.gd}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-1.5 justify-center">
                    {team.form.map((result, i) => (
                      <FormIndicator key={i} result={result} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px) rotateY(-15deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Standings;
