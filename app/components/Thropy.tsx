"use client";
import React from "react";
import Image from "next/image";

const Thropy = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <iframe
          width="640"
          height="480"
          src="https://sketchfab.com/playlists/embed?collection=cc37ac2ff9ec4d23848cbcdd9447d5cb&autostart=0"
          title="Desailly"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
        ></iframe>
        <div className="sketchfab-embed-wrapper">
          <iframe
            title="LaLiga🇪🇸 Trophy 3D"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            src="https://sketchfab.com/models/ce3b291b1d4e4468a3c159f97ae8e746/embed?ui_theme=dark"
          >
            {" "}
          </iframe>{" "}
        </div>
      </div>
    </>
  );
};

export default Thropy;
