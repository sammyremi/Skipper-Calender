"use client";

import { Heart } from "lucide-react";
import ScrollFocusList from "@/components/shared/ScrollFocusList";
import { THINGS_I_LOVE } from "@/data/memories";

const focusItems = THINGS_I_LOVE.map((text, idx) => ({
  number: `0${idx + 1}`,
  text,
}));

export default function ThingsILoveSection() {
  return (
    <section id="things-i-love" className="relative overflow-hidden">
      {/* Section label — visible before the pinned scroll section */}
      <div className="text-center pt-24 pb-8 px-6 bg-grain dark:bg-charcoal-950 transition-colors duration-500">
        <span className="text-xs uppercase tracking-widest text-babyBlue-500 dark:text-babyBlue-300 font-sans font-medium inline-flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-softPink-300 fill-softPink-300" />
          <span>Chapter 07 — Heartfelt Words</span>
        </span>
      </div>

      {/* Cinematic ScrollFocusList */}
      <ScrollFocusList
        items={focusItems}
        imageUrl="/jpeg/IMG_5855.jpg"
        imageAlt="A moment captured between us"
        imageRight={false}
        heading="Things I Love About You"
      />
    </section>
  );
}
