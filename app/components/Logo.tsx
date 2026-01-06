"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    title: "vs Real Madrid (0-4)",
    description: "Relive the best moments from the match.",
    staticImage: "/assets/images/vs-madrid-4-0.webp",
    youtubeEmbedId: "AfpItQBKl04",
  },
  {
    id: 6,
    title: "vs Inter Milan 1st Leg (3-3)",
    description: "Relive the best moments from the match.",
    staticImage: "/assets/images/vs-inter-milan.webp",
    youtubeEmbedId: "tg-MWRmAJqE",
  },
  {
    id: 7,
    title: "vs Inter Milan 2nd Leg (3-4)",
    description: "Relive the best moments from the match.",
    staticImage: "/assets/images/lose-inter-milan.webp",
    youtubeEmbedId: "aNiPmGUpQC0",
  },
  {
    id: 8,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-75 p-4" onClick={onClose}>
      <div className="relative w-full max-w-5xl bg-transparent rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center bg-accent justify-between p-4 border-b-2 border-secondary">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-neutral-800">
            <X size={24} className="text-secondary" />
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
      className="group w-full cursor-pointer overflow-hidden relative h-180 rounded-md shadow-xl flex flex-col justify-end border border-secondary dark:border-neutral-800 transition-all duration-500 hover:shadow-2xl"
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
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-20" />

      {/* Content */}
      <div className="relative z-50 p-4">
        <h1 className="font-bold text-xl md:text-3xl text-gray-50">{title}</h1>
        <p className="font-normal text-base text-gray-50 my-4">{description}</p>
      </div>
    </div>
  );
}

// Main Component
export default function Logo({ onScrollStateChange }: { onScrollStateChange?: (isScrolling: boolean) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<(typeof cardData)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    if (!container || !cards) return;

    // Cleanup ONLY this component's ScrollTrigger
    const cleanup = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };

    cleanup();

    // Setup animation with delay to allow page animations to initialize first
    const setupAnimation = () => {
      // Double-check cleanup before creating new trigger
      cleanup();

      // Calculate total scroll amount
      const getScrollAmount = () => {
        const cardsWidth = cards.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(cardsWidth - windowWidth);
      };

      const scrollAmount = getScrollAmount();

      // Create animation
      const animation = gsap.to(cards, {
        x: scrollAmount,
        ease: "none",
      });

      // Create ScrollTrigger dan simpan referensinya
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${Math.abs(scrollAmount) + 100}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: animation,
        // Tambahkan ID unik untuk tracking
        id: "horizontal-scroll-gallery",
        onEnter: () => onScrollStateChange?.(false),
        onLeave: () => onScrollStateChange?.(true),
        onEnterBack: () => onScrollStateChange?.(false),
        onLeaveBack: () => onScrollStateChange?.(true),
      });
    };

    // Delay lebih lama untuk menghindari konflik dengan animasi page.tsx
    const timer = setTimeout(setupAnimation, 500);

    // Handle window resize
    const handleResize = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      cleanup();
    };
  }, [onScrollStateChange]);

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
      <div ref={containerRef} className="relative h-screen overflow-hidden bg-primary">
        {/* Horizontal scrolling cards container */}
        <div ref={cardsRef} className="absolute top-0 left-0 h-full flex items-center gap-6 pl-8" style={{ willChange: "transform" }}>
          {cardData.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0"
              style={{
                width: "clamp(280px, 70vw, 450px)",
              }}
            >
              <HoverCard title={card.title} description={card.description} staticImage={card.staticImage} youtubeEmbedId={card.youtubeEmbedId} onClick={() => handleCardClick(card)} />
            </div>
          ))}

          {/* End spacer untuk padding akhir */}
          <div className="flex-shrink-0 w-8" />
        </div>
      </div>

      {/* Modal */}
      {selectedCard && <VideoModal isOpen={modalOpen} onClose={handleCloseModal} title={selectedCard.title} youtubeEmbedId={selectedCard.youtubeEmbedId} />}
    </>
  );
}
