"use client";

import { useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/backsound.mp3" type="audio/mpeg" />
      </audio>

      <button onClick={toggleMusic} className="fixed bottom-4 right-4 z-50 rounded-full bg-black px-4 py-2 text-white">
        {playing ? "🔇 Mute" : "🔊 Play"}
      </button>
    </>
  );
}
