"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { THINGS_I_LOVE } from "@/data/memories";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ThingsILoveSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll(".love-line");

    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-40 px-6 md:px-12 bg-grain relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-babyBlue-500 font-sans font-medium flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-softPink-300 fill-softPink-300" />
            <span>Chapter 07 — Heartfelt Words</span>
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal-900 font-semibold tracking-tight">
            Things I Love About You
          </h2>
        </div>

        {/* Scroll Typography List */}
        <div className="space-y-16">
          {THINGS_I_LOVE.map((text, idx) => (
            <div key={idx} className="love-line space-y-2 border-l-2 border-babyBlue-200 pl-6 md:pl-10">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-babyBlue-400">
                0{idx + 1}
              </span>
              <p className="font-serif text-2xl md:text-4xl text-charcoal-900 font-medium leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
