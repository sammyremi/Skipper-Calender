"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MapPin } from "lucide-react";
import { getAssetPath } from "@/data/memories";

gsap.registerPlugin(ScrollTrigger);

const HORIZONTAL_ITEMS = [
  {
    src: "/jpeg/IMG_0396.jpg",
    title: "Late Night Conversations",
    subtitle: "When hours felt like minutes",
    tag: "Summer 2026",
  },
  {
    src: "/jpeg/IMG_2717.jpg",
    title: "City Walks & Sunshine",
    subtitle: "Every street was a new adventure with you",
    tag: "July 2026",
  },
  {
    src: "/jpeg/IMG_2719.jpg",
    title: "Spontaneous Escapes",
    subtitle: "Driving nowhere in particular, just together",
    tag: "June 2026",
  },
  {
    src: "/jpeg/IMG_3414.jpg",
    title: "Café Smiles",
    subtitle: "My absolute favorite coffee date view",
    tag: "May 2026",
  },
  {
    src: "/jpeg/IMG_3996.jpg",
    title: "Spring Blossoms",
    subtitle: "Colors faded in comparison to you",
    tag: "April 2026",
  },
  {
    src: "/jpeg/IMG_4019.jpg",
    title: "Cozy Afternoons",
    subtitle: "Warm tea, soft blankets, and your warmth",
    tag: "March 2026",
  },
  {
    src: "/jpeg/IMG_4600.jpg",
    title: "Holiday Season Together",
    subtitle: "The warmth of December with you by my side",
    tag: "December 2025",
  },
];


export default function HorizontalMemories() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const track = trackRef.current;
    if (!target || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top top",
          end: () => `+=${totalWidth + 600}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, target);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="memories"
      ref={targetRef}
      className="h-screen w-full bg-charcoal-950 text-white relative overflow-hidden flex flex-col justify-between py-12"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-babyBlue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-softPink-300/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-babyBlue-300 font-sans font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter 03 — Film Strip</span>
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-white mt-1">
            Horizontal Memory Stream
          </h2>
        </div>
        <div className="hidden md:block text-xs uppercase tracking-widest text-white/40 font-sans">
          Scroll vertically to pan film strip →
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="w-full overflow-hidden my-auto py-6">
        <div ref={trackRef} className="flex gap-8 md:gap-12 px-6 md:px-12 w-max items-center">
          {HORIZONTAL_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="w-[80vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-charcoal-900">
                <img
                  src={getAssetPath(item.src)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-sans text-white uppercase tracking-widest font-medium border border-white/20">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm font-sans font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between text-xs font-sans text-white/30 uppercase tracking-widest z-10">
        <span>CINEMATIC SEQUENCE</span>
        <span>CHAPTER 03 / 10</span>
      </div>
    </section>
  );
}
