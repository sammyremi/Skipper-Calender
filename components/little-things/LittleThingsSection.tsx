"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LITTLE_THINGS } from "@/data/memories";
import { Sparkles, Heart, Smile, Coffee, Bookmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LittleThingsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".little-card");

    cards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: idx * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Soft Background Accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-softPink-100/40 dark:bg-softPink-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-babyBlue-100/40 dark:bg-babyBlue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-babyBlue-500 dark:text-babyBlue-300 font-sans font-medium flex items-center justify-center gap-1.5">
            <Smile className="w-3.5 h-3.5" />
            <span>Chapter 06 — Micro Moments</span>
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal-900 dark:text-white font-semibold tracking-tight">
            The Little Things
          </h2>
          <p className="text-charcoal-900/60 dark:text-white/70 text-sm font-sans">
            The unscripted habits, quiet inside jokes, and daily details that make us, us.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LITTLE_THINGS.map((item, idx) => (
            <div
              key={idx}
              className="little-card glass-panel rounded-3xl p-8 space-y-4 hover:-translate-y-2 hover:border-babyBlue-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-babyBlue-50 dark:bg-white/10 text-babyBlue-600 dark:text-babyBlue-300 text-[10px] uppercase font-sans tracking-widest font-semibold">
                  {item.category}
                </span>
                <Heart className="w-4 h-4 text-softPink-300 group-hover:text-softPink-500 group-hover:fill-softPink-300 transition-colors" />
              </div>

              <p className="font-serif text-xl md:text-2xl text-charcoal-900 dark:text-white leading-snug font-medium">
                "{item.quote}"
              </p>

              <div className="pt-2 text-[11px] font-sans uppercase tracking-widest text-charcoal-900/40 dark:text-white/40 flex items-center gap-1">
                <span>Memory Note #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
