"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading progress count up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Small pause at 100%
          return 100;
        }
        // Random incremental steps for realistic feel
        return Math.min(100, prev + Math.floor(Math.random() * 15) + 5);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 bg-charcoal-950 text-white flex flex-col justify-between p-8 md:p-14 overflow-hidden select-none"
        >
          {/* Ambient Background Radial Glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vh] rounded-full bg-babyBlue-500/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-softPink-300/10 blur-[120px] pointer-events-none" />

          {/* Top Header Badge */}
          <div className="flex items-center justify-between z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest uppercase font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5 text-babyBlue-300" />
              <span>Our Digital Chapter</span>
            </div>

            <span className="text-xs font-sans text-white/50 tracking-widest uppercase">
              EST. 2024 — 2026
            </span>
          </div>

          {/* Center Monogram & Title */}
          <div className="my-auto text-center space-y-6 z-10 max-w-md mx-auto">
            {/* Heart Badge Icon */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mx-auto shadow-2xl"
            >
              <Heart className="w-7 h-7 text-softPink-300 fill-softPink-300" />
            </motion.div>

            {/* Editorial Title */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold tracking-tight">
                S & A
              </h1>
              <p className="text-white/60 text-xs md:text-sm font-sans tracking-widest uppercase italic">
                Unfolding Our Memories...
              </p>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full max-w-xs mx-auto space-y-2 pt-4">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-babyBlue-400 via-softPink-200 to-babyBlue-300 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-sans text-white/50 tracking-widest uppercase">
                <span>Loading Journal</span>
                <span className="font-medium text-white">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Label */}
          <div className="flex items-center justify-between text-[11px] font-sans text-white/40 uppercase tracking-widest z-10 border-t border-white/10 pt-4">
            <span>CINEMATIC ARCHIVE</span>
            <span>MADE WITH ENDLESS LOVE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
