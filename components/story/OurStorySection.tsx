"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Calendar } from "lucide-react";
import { getAssetPath } from "@/data/memories";

gsap.registerPlugin(ScrollTrigger);

const STORY_CHAPTERS = [
  {
    year: "2024",
    subtitle: "THE BEGINNING",
    title: "The Moment Our Paths Crossed",
    description:
      "It started with a single conversation that felt like we had known each other forever. Everything changed from that day on.",
    image: "/jpeg/IMG_6397.jpg",
    date: "Late 2024",
  },
  {
    year: "2025",
    subtitle: "GROWING TOGETHER",
    title: "Unforgettable Adventures & Laughter",
    description: "Roadtrips, spontaneous beach days, late-night dinners, and discovering all the little things that make us whole.",
    image: "/jpeg/IMG_5807.jpg",
    date: "Throughout 2025",
  },
  {
    year: "2025",
    subtitle: "STILL GROWING",
    title: "Autumn Walks & Quiet Closeness",
    description: "The season changed, but what never changed was how right it always felt to simply be near you.",
    image: "/jpeg/IMG_5089.jpg",
    date: "Autumn 2025",
  },
  {
    year: "2026",
    subtitle: "WHERE WE ARE NOW",
    title: "Building Our Beautiful Tomorrow",
    description: "Stronger than ever, writing new memories every day, and looking forward to an endless future together.",
    image: "/jpeg/hero2.png",
    date: "Present Day",
  },
];


export default function OurStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".story-card");

    cards.forEach((card, index) => {
      const img = card.querySelector(".story-img");
      const text = card.querySelector(".story-text");

      gsap.fromTo(
        img,
        { x: index % 2 === 0 ? -60 : 60, opacity: 0.2, scale: 1.1 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        text,
        { x: index % 2 === 0 ? 60 : -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="py-32 px-6 md:px-12 bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-white relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Decorative Typography */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[15vw] font-serif font-bold text-charcoal-900/[0.03] dark:text-white/[0.03] select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap">
        OUR STORY
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24 space-y-3">
          <span className="text-xs uppercase tracking-widest text-babyBlue-500 font-sans font-medium">
            Chapter 02 — Timeline
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-charcoal-900 dark:text-white font-semibold tracking-tight">
            How Our Journey Unfolded
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-babyBlue-300 to-softPink-300 mx-auto rounded-full" />
        </div>

        {/* Timeline Chapters */}
        <div className="space-y-32">
          {STORY_CHAPTERS.map((chapter, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={chapter.year}
                className={`story-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/20 bg-charcoal-950 group">
                    <div className="story-img aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={getAssetPath(chapter.image)}
                        alt={chapter.title}
                        style={
                          chapter.image.includes("hero1") || chapter.image.includes("hero2")
                            ? { filter: "grayscale(100%) contrast(106%)" }
                            : undefined
                        }
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          chapter.image.includes("hero1") || chapter.image.includes("hero2")
                            ? "grayscale"
                            : ""
                        }`}
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-sans font-medium text-charcoal-900 dark:text-white flex items-center gap-1.5 shadow-sm border border-white/20">
                      <Calendar className="w-3.5 h-3.5 text-babyBlue-500" />
                      <span>{chapter.date}</span>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div
                  className={`story-text lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-6xl md:text-7xl font-bold text-babyBlue-400">
                      {chapter.year}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-charcoal-900/50 dark:text-white/60 font-sans font-semibold border-l border-babyBlue-200 dark:border-babyBlue-400/40 pl-4 py-1">
                      {chapter.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-5xl text-charcoal-900 dark:text-white font-semibold leading-tight">
                    {chapter.title}
                  </h3>

                  <p className="text-charcoal-900/70 dark:text-white/80 text-base md:text-lg font-sans leading-relaxed">
                    {chapter.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-sans text-babyBlue-600 dark:text-babyBlue-300 font-medium uppercase tracking-wider">
                    <Heart className="w-4 h-4 fill-babyBlue-200 text-babyBlue-500" />
                    <span>A Moment Saved Forever</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
