"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Sparkles, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Slow photograph zoom on scroll
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1 },
          {
            scale: 1.15,
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // Reveal text
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-charcoal-950 text-white relative overflow-hidden flex flex-col justify-between py-20 px-6 md:px-12"
    >
      {/* Dark Ambient Glowing Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] rounded-full bg-babyBlue-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-softPink-300/10 blur-[100px] pointer-events-none" />

      {/* Chapter Label */}
      <div className="max-w-7xl mx-auto w-full text-center z-10 pt-12">
        <span className="text-xs uppercase tracking-widest text-babyBlue-300 font-sans font-medium inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter 10 — Eternal Finale</span>
        </span>
      </div>

      {/* Central Movie Ending Typography & Photo Frame */}
      <div className="max-w-5xl mx-auto w-full text-center space-y-12 my-auto z-10">
        <div ref={textRef} className="space-y-6">
          <h2 className="font-serif text-4xl md:text-7xl lg:text-8xl text-white font-semibold tracking-tight leading-[0.95]">
            AND THIS IS ONLY <br />
            <span className="italic font-serif font-normal text-babyBlue-300">
              THE BEGINNING.
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-xl font-sans max-w-lg mx-auto font-light leading-relaxed">
            Every day is a new page. Every year is a new book. <br />
            I love you endlessly.
          </p>
        </div>

        {/* Featured Photo Frame with Slow Zoom */}
        <div className="relative max-w-2xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black">
          <img
            ref={imgRef}
            src="/jpeg/hero1.png"
            alt="Endless Love"
            style={{ filter: "grayscale(100%) contrast(106%)" }}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80">
            <span className="text-xs font-sans uppercase tracking-widest">
              S & A — Our Love Story
            </span>
            <Heart className="w-5 h-5 text-softPink-200 fill-softPink-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-12 border-t border-white/10 text-xs font-sans text-white/40 uppercase tracking-widest z-10">
        <span>OUR DIGITAL LOVE STORY — 2026</span>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 hover:text-babyBlue-300 transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4 text-babyBlue-300" />
        </button>

        <span>MADE WITH ENDLESS LOVE</span>
      </div>
    </section>
  );
}
