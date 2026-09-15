"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RomanticCalendar from "@/components/calendar/RomanticCalendar";
import { Sparkles, ArrowDown, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Single configuration variable for Hero image rotation timing (in milliseconds)
const HERO_INTERVAL = 10000; // 10 seconds per image

const HERO_IMAGES = [
  { src: "/jpeg/hero1.png", alt: "Hero Moment 1" },
  { src: "/jpeg/hero2.png", alt: "Hero Moment 2" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const calendarPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  // Automatic slow cinematic crossfade interval between hero1 and hero2
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, HERO_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  // GSAP Parallax depth effect on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background photograph: slow parallax
      if (bgWrapperRef.current) {
        tl.to(bgWrapperRef.current, {
          y: 80,
          scale: 1.05,
          ease: "none",
        }, 0);
      }

      // Left calendar panel: medium movement
      if (calendarPanelRef.current) {
        tl.to(calendarPanelRef.current, {
          y: -40,
          opacity: 0.85,
          ease: "none",
        }, 0);
      }

      // Minimal text: faster movement
      if (textRef.current) {
        tl.to(textRef.current, {
          y: -80,
          opacity: 0.2,
          ease: "none",
        }, 0);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-charcoal-950 flex flex-col justify-between"
    >
      {/* FULL-SCREEN BLACK & WHITE BACKGROUND PHOTOGRAPHY */}
      <div ref={bgWrapperRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {HERO_IMAGES.map((img, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={img.src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  filter: "grayscale(100%) contrast(106%) brightness(94%)",
                }}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[12000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}

        {/* Readability Gradients & Ambient Overlays (keeps photos visible while ensuring text/calendar legibility) */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/75 via-charcoal-950/35 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-charcoal-950/40 z-20 pointer-events-none" />
      </div>

      {/* TOP FLOATING MINIMAL HEADER BADGE */}
      <div
        ref={textRef}
        className="relative z-30 pt-28 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest uppercase font-sans font-medium">
          <Sparkles className="w-3.5 h-3.5 text-babyBlue-300" />
          <span>Our Private Love Story</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-white/60 text-xs font-sans tracking-widest uppercase">
          <Heart className="w-3.5 h-3.5 text-softPink-300 fill-softPink-300" />
          <span>Every Second With You</span>
        </div>
      </div>

      {/* MAIN HERO CONTENT: CALENDAR FLOATING ON THE LEFT SIDE */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
        {/* Left Column (25-35% of Desktop Viewport): Translucent Romantic Calendar Overlay */}
        <div
          ref={calendarPanelRef}
          className="lg:col-span-5 xl:col-span-5 max-w-md lg:max-w-full"
        >
          <RomanticCalendar className="bg-white/85 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl" />
        </div>

        {/* Right Column: Subtle Minimal Editorial Title overlay over background photo */}
        <div className="hidden lg:flex lg:col-span-7 flex-col items-start justify-center pl-8 text-white space-y-4">
          <span className="text-xs uppercase tracking-widest text-babyBlue-300 font-sans font-semibold border-b border-babyBlue-300/40 pb-1">
            Monochrome Visual Journal
          </span>
          <h1 className="font-serif text-5xl xl:text-7xl font-semibold tracking-tight leading-[0.95] drop-shadow-md">
            Moments Frozen <br />
            <span className="italic font-serif font-normal text-babyBlue-200">
              In Time.
            </span>
          </h1>
          <p className="text-white/80 font-sans text-sm xl:text-base max-w-md font-light leading-relaxed drop-shadow-sm">
            Interactive calendar & memory archive celebrating our real photographs and moments together.
          </p>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full pb-8 flex items-center justify-between text-xs font-sans text-white/50 uppercase tracking-widest border-t border-white/10 pt-4">
        <span>SCROLL TO EXPLORE</span>
        <div className="flex items-center gap-2 animate-bounce text-babyBlue-300">
          <span>CHAPTER 01</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
        <span>MONOCHROME HERO</span>
      </div>
    </section>
  );
}
