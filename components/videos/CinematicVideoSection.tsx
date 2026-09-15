"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO_ITEMS, getAssetPath } from "@/data/memories";
import { Play, Pause, Volume2, VolumeX, Sparkles, Film } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const currentVideo = VIDEO_ITEMS[activeVideoIdx];

  useEffect(() => {
    const container = containerRef.current;
    const frame = videoFrameRef.current;
    if (!container || !frame) return;

    const ctx = gsap.context(() => {
      // Pin & Expand Video Frame from small card to wide cinematic screen on scroll
      gsap.fromTo(
        frame,
        { scale: 0.8, borderRadius: "2.5rem" },
        {
          scale: 1.0,
          borderRadius: "1rem",
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoElementRef.current) return;
    if (isPlaying) {
      videoElementRef.current.pause();
      setIsPlaying(false);
    } else {
      videoElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoElementRef.current) return;
    videoElementRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="videos"
      ref={containerRef}
      className="h-[150vh] w-full bg-charcoal-950 text-white relative overflow-hidden flex flex-col justify-center py-12"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-babyBlue-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs uppercase tracking-widest text-babyBlue-300 font-sans font-medium flex items-center justify-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>Chapter 05 — Motion Memories</span>
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-white">
            Cinematic Moment Reels
          </h2>
        </div>

        {/* Expanding Video Frame */}
        <div
          ref={videoFrameRef}
          className="relative w-full max-w-5xl aspect-[16/9] bg-black overflow-hidden shadow-2xl border border-white/20 group"
        >
          <video
            ref={videoElementRef}
            src={getAssetPath(currentVideo.src)}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Video Control Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity flex flex-col justify-between p-6 md:p-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-sans uppercase tracking-widest font-medium text-white border border-white/20">
                {currentVideo.date}
              </span>

              <button
                onClick={toggleMute}
                aria-label="Toggle sound"
                className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-babyBlue-300" />}
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl md:text-4xl text-white font-semibold">
                  {currentVideo.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm font-sans mt-1">
                  {currentVideo.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="px-5 py-2.5 rounded-full bg-white text-charcoal-900 font-sans font-medium text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-babyBlue-100 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-charcoal-900" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-charcoal-900" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Selector Thumbnails */}
        <div className="flex gap-3 mt-8 overflow-x-auto max-w-full pb-2 no-scrollbar">
          {VIDEO_ITEMS.map((vid, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveVideoIdx(idx);
                setIsPlaying(true);
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeVideoIdx === idx
                  ? "bg-babyBlue-400 text-white shadow-lg scale-105"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {vid.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
