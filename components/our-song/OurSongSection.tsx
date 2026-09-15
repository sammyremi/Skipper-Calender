"use client";

import { useState } from "react";
import { Music, Play, Pause, Disc, Heart, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

export default function OurSongSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-babyBlue-500 font-sans font-medium flex items-center justify-center gap-1.5">
            <Music className="w-3.5 h-3.5" />
            <span>Chapter 08 — Our Melody</span>
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 font-semibold tracking-tight">
            Our Special Song
          </h2>
        </div>

        {/* Custom Audio Player Deck */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-xl border border-babyBlue-200">
          {/* Rotating Vinyl Record */}
          <div className="relative flex-shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-charcoal-950 border-4 border-charcoal-900 shadow-2xl flex items-center justify-center relative overflow-hidden"
            >
              {/* Record Grooves */}
              <div className="w-32 h-32 rounded-full border border-white/10" />
              <div className="w-24 h-24 rounded-full border border-white/10" />
              <div className="w-16 h-16 rounded-full border border-white/10" />

              {/* Record Label Center */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-babyBlue-300 to-softPink-300 flex items-center justify-center shadow-inner z-10">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
            </motion.div>
          </div>

          {/* Song Information & Controls */}
          <div className="flex-grow space-y-6 w-full text-center md:text-left">
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-babyBlue-500">
                Forever Playlist
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-charcoal-900 font-semibold">
                Lover & Soundtrack
              </h3>
              <p className="text-charcoal-900/60 text-sm font-sans mt-1">
                Our Anthem — Taylor Swift / Custom Romantic Selection
              </p>
            </div>

            {/* Audio Visualizer Waves */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 h-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [6, 24, 10, 30, 8][i % 5] : 6,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.05,
                    repeatType: "reverse",
                  }}
                  className="w-1 bg-babyBlue-400 rounded-full"
                />
              ))}
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-charcoal-900 text-white flex items-center justify-center hover:bg-babyBlue-500 transition-colors shadow-lg cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>

              <div className="text-left font-sans text-xs text-charcoal-900/60">
                <div className="font-medium text-charcoal-900">
                  {isPlaying ? "Playing Romantic Track..." : "Click to Play"}
                </div>
                <div className="italic">Custom audio track can be placed in public/audio/</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
