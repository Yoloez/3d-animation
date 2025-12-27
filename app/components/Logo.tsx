"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Data yang dapat di-mapping
const cardData = [
  {
    id: 1,
    title: "vs Benfica (4-5)",
    description: "Amazing Comeback from 3-1 down.",
    staticImage: "/assets/images/vs-benfica.webp",
    youtubeEmbedId: "sAhOZLCMR7w",
  },
  {
    id: 2,
    title: "vs Real Madrid (2-3)",
    description: "Hover to see the amazing celebration moment in action.",
    staticImage: "/assets/images/vs-madrid.webp",
    youtubeEmbedId: "oYHdKBfTwbE",
  },
  {
    id: 3,
    title: "vs Atletico Madrid (2-4)",
    description: "Experience the thrill of victory with this dynamic card.",
    staticImage: "/assets/images/vs-atletico.webp",
    youtubeEmbedId: "nuyuCSRx8sI",
  },
  {
    id: 4,
    title: "vs Real Madrid (2-5)",
    description: "Experience the thrill of victory with this dynamic card.",
    staticImage: "/assets/images/vs-madrid-5-2.webp",
    youtubeEmbedId: "MFb7LCqm6FE",
  },
  {
    id: 5,
    title: "vs Real Madrid (4-3)",
    description: "Relive the best moments from the match.",
    staticImage: "/assets/images/vs-madrid-4-3.webp",
    youtubeEmbedId: "fra9Ps3xzKM",
  },
];

// Modal Component
function VideoModal({ isOpen, onClose, title, youtubeEmbedId }: { isOpen: boolean; onClose: () => void; title: string; youtubeEmbedId: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
      <div className="relative w-full max-w-5xl bg-neutral-900 rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-neutral-800">
            <X size={24} />
          </button>
        </div>

        {/* Video Content */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeEmbedId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// Card Component
function HoverCard({ title, description, staticImage, youtubeEmbedId, onClick }: { title: string; description: string; staticImage: string; youtubeEmbedId: string; onClick: () => void }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className="group w-full h-[500px] cursor-pointer overflow-hidden relative rounded-xl shadow-2xl flex flex-col justify-end border-2 border-primary/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(165,42,42,0.4)] hover:border-primary/60 hover:scale-[1.02]"
      onMouseEnter={() => setShowVideo(true)}
      onMouseLeave={() => setShowVideo(false)}
      onClick={onClick}
      style={{
        backgroundImage: showVideo ? "none" : `url('${staticImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* YouTube Video overlay on hover */}
      {showVideo && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeEmbedId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeEmbedId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-20" />

      {/* Click indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <div className="bg-primary/30 backdrop-blur-sm rounded-full p-6 border-2 border-primary/60 transform group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-50 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h1 className="font-bold text-2xl md:text-3xl text-white drop-shadow-lg">{title}</h1>
        <p className="font-normal text-sm md:text-base text-gray-200 mt-2 line-clamp-2">{description}</p>
        
        {/* Decorative line */}
        <div className="mt-4 h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
      </div>
    </div>
  );
}

// Main Component
export default function Logo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<(typeof cardData)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const cards = cardsRef.current;
    
    if (!container || !cards) return;

    // Calculate scroll distance
    const getScrollAmount = () => {
      const cardsWidth = cards.scrollWidth;
      return -(cardsWidth - window.innerWidth);
    };

    // Create horizontal scroll animation
    const tween = gsap.to(cards, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${cards.scrollWidth - window.innerWidth}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      animation: tween,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleCardClick = (card: (typeof cardData)[0]) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Header dengan gradient */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent py-8 px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
            Unforgettable Moments
          </h2>
          <p className="text-center text-white/80 mt-2 text-sm md:text-base">
            Scroll to explore Barcelona's greatest victories
          </p>
        </div>

        {/* Horizontal scrolling cards container */}
        <div 
          ref={cardsRef} 
          className="absolute top-0 left-0 h-full flex items-center gap-8 px-8"
          style={{ willChange: "transform" }}
        >
          {cardData.map((card, index) => (
            <div 
              key={card.id} 
              className="flex-shrink-0"
              style={{ 
                width: "clamp(300px, 80vw, 500px)",
                animationDelay: `${index * 0.1}s`
              }}
            >
              <HoverCard
                title={card.title}
                description={card.description}
                staticImage={card.staticImage}
                youtubeEmbedId={card.youtubeEmbedId}
                onClick={() => handleCardClick(card)}
              />
            </div>
          ))}
          
          {/* End spacer */}
          <div className="flex-shrink-0 w-8" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <p className="text-sm font-medium">Scroll Down</p>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && <VideoModal isOpen={modalOpen} onClose={handleCloseModal} title={selectedCard.title} youtubeEmbedId={selectedCard.youtubeEmbedId} />}
    </>
  );
}
