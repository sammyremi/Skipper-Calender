"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LoveLetterSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paragraphs = container.querySelectorAll(".letter-p");

    paragraphs.forEach((p) => {
      gsap.fromTo(
        p,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: p,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="letter"
      ref={containerRef}
      className="py-40 px-6 md:px-12 bg-grain relative overflow-hidden"
    >
      {/* Soft Romantic Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-softPink-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-babyBlue-500 font-sans font-medium flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-softPink-300 fill-softPink-300" />
            <span>Chapter 09 — Intimate Letter</span>
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-charcoal-900 font-semibold tracking-tight">
            FOR YOU
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-babyBlue-300 to-softPink-300 mx-auto rounded-full" />
        </div>

        {/* Letter Body */}
        <div className="glass-panel rounded-3xl p-8 md:p-14 space-y-8 shadow-xl border border-white">
          <p className="letter-p font-serif text-2xl md:text-3xl text-charcoal-900 leading-relaxed font-normal italic">
            "My dearest,"
          </p>

          <p className="letter-p text-charcoal-900/80 text-base md:text-xl font-sans leading-relaxed">
            Looking back through all of our photos, videos, and memories gathered in this digital journal,
            I am reminded of just how blessed I am to share this journey with you.
          </p>

          <p className="letter-p text-charcoal-900/80 text-base md:text-xl font-sans leading-relaxed">
            Every single date on this calendar carries a spark of your laughter, every photo holds a quiet moment of happiness,
            and every video captures the motion of a love that grows deeper with each passing day.
          </p>

          <p className="letter-p text-charcoal-900/80 text-base md:text-xl font-sans leading-relaxed">
            Thank you for being my anchor, my favorite smile, my biggest comfort, and my best friend.
          </p>

          <div className="letter-p pt-6 border-t border-babyBlue-100 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-charcoal-900/40 font-sans block">
                Forever & Always
              </span>
              <span className="font-serif text-2xl text-charcoal-900 font-semibold">
                Yours, Forever.
              </span>
            </div>
            <Heart className="w-6 h-6 text-babyBlue-500 fill-babyBlue-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
