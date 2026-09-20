"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/data/memories";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFocusItem {
  number?: string;
  text: string;
}

interface ScrollFocusListProps {
  items: ScrollFocusItem[];
  imageUrl?: string;
  imageAlt?: string;
  sectionId?: string;
  /** If true, image is on the right side (default: left) */
  imageRight?: boolean;
  /** Chapter label shown above the heading */
  chapterLabel?: string;
  /** Main heading */
  heading?: string;
}

export default function ScrollFocusList({
  items,
  imageUrl,
  imageAlt = "Memory",
  sectionId,
  imageRight = false,
  chapterLabel,
  heading,
}: ScrollFocusListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyImageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Make all items fully visible with no blur for accessibility
      itemsRef.current.forEach((item) => {
        if (item) gsap.set(item, { opacity: 1, filter: "blur(0px)", scale: 1 });
      });
      return;
    }

    const totalItems = items.length;
    if (totalItems === 0) return;

    const isMobile = window.innerWidth < 768;
    // Ultra-slow cinematic scroll pacing: 280vh per item on desktop, 200vh on mobile
    const vhPerItem = isMobile ? 200 : 280;
    const scrollDistance = totalItems * vhPerItem;

    const maxBlur = isMobile ? 2.5 : 4.0;
    const minOpacity = 0.35;
    const minScale = 0.97;

    // Set initial deterministic state: item 0 focused, rest softly blurred
    itemsRef.current.forEach((item, idx) => {
      if (!item) return;
      if (idx === 0) {
        gsap.set(item, { opacity: 1, filter: "blur(0px)", scale: 1 });
      } else {
        gsap.set(item, {
          opacity: minOpacity,
          filter: `blur(${maxBlur}px)`,
          scale: minScale,
        });
      }
    });

    // Single master ScrollTrigger with synchronous gsap.set() rendering (zero flicker)
    const masterTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance}vh`,
      pin: true,
      anticipatePin: 1,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // Continuous 0.0 to 1.0
        const step = totalItems > 1 ? 1 / (totalItems - 1) : 1;
        // Extended hold phase radius: 35% of step width for dedicated reading window
        const holdR = step * 0.35;
        // Transition radius: 70% of step width for smooth cross-fade
        const transR = step * 0.70;

        itemsRef.current.forEach((item, idx) => {
          if (!item) return;

          const targetP = totalItems > 1 ? idx / (totalItems - 1) : 0;
          const diff = Math.abs(progress - targetP);

          let t = 0;
          if (diff <= holdR) {
            // Stage 2: FOCUS / HOLD — 100% focused, sharp, fully visible
            t = 0;
          } else if (diff >= transR) {
            // Out of range: softly blurred and reduced opacity
            t = 1;
          } else {
            // Stage 1 / Stage 3: ENTER & EXIT — smoothstep interpolation
            const rawT = (diff - holdR) / (transR - holdR);
            t = rawT * rawT * (3 - 2 * rawT);
          }

          const blurVal = (t * maxBlur).toFixed(2);
          const opacityVal = (1 - t * (1 - minOpacity)).toFixed(3);
          const scaleVal = (1 - t * (1 - minScale)).toFixed(3);

          // Synchronous inline style update via gsap.set (prevents tween creation & flicker)
          gsap.set(item, {
            opacity: Number(opacityVal),
            filter: `blur(${blurVal}px)`,
            scale: Number(scaleVal),
          });
        });

        // Subtle, steady parallax on sticky image
        if (stickyImageRef.current) {
          gsap.set(stickyImageRef.current, {
            y: -progress * 25,
          });
        }
      },
    });

    return () => {
      masterTrigger.kill();
    };
  }, [items]);

  const imageColumn = imageUrl ? (
    <div
      className={`hidden lg:flex lg:col-span-5 items-center justify-center ${
        imageRight ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <div
        ref={stickyImageRef}
        className="relative w-full aspect-[3/4] max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-charcoal-950"
      >
        <img
          src={getAssetPath(imageUrl)}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent pointer-events-none" />
        {/* Subtle editorial corner glow */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal-950/60 to-transparent pointer-events-none" />
      </div>
    </div>
  ) : null;

  const textColumn = (
    <div
      className={`col-span-12 ${imageUrl ? "lg:col-span-7" : "lg:col-span-10 lg:col-start-2"} ${
        imageRight ? "lg:order-1" : "lg:order-2"
      } flex flex-col justify-center space-y-8 md:space-y-10 py-8 lg:py-0 w-full max-w-full min-w-0`}
    >
      {/* Chapter / Heading */}
      {(chapterLabel || heading) && (
        <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
          {chapterLabel && (
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-babyBlue-500 dark:text-babyBlue-300 font-sans font-medium">
              {chapterLabel}
            </span>
          )}
          {heading && (
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-charcoal-900 dark:text-white font-semibold tracking-tight leading-tight">
              {heading}
            </h2>
          )}
          <div className="w-10 h-0.5 bg-gradient-to-r from-babyBlue-300 to-softPink-300 rounded-full" />
        </div>
      )}

      {/* Items list */}
      <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
        {items.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => { itemsRef.current[idx] = el; }}
            className="focus-item flex items-start gap-3 sm:gap-4 md:gap-5 w-full max-w-full min-w-0"
          >
            {item.number && (
              <span className="flex-shrink-0 font-sans text-xs font-bold uppercase tracking-widest text-babyBlue-500 dark:text-babyBlue-300 pt-1 w-6 sm:w-8">
                {item.number}
              </span>
            )}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal-900 dark:text-white font-medium leading-relaxed sm:leading-snug break-words max-w-full min-w-0">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      id={sectionId}
      className="relative w-full min-h-screen bg-grain dark:bg-charcoal-950 transition-colors duration-500 overflow-x-hidden"
    >
      {/* Mobile image (above text on small screens) */}
      {imageUrl && (
        <div className="lg:hidden w-full aspect-[16/9] max-h-[35vh] overflow-hidden relative">
          <img
            src={getAssetPath(imageUrl)}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-grain dark:to-charcoal-950 pointer-events-none" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-full min-h-screen grid grid-cols-12 gap-6 md:gap-12 items-center">
        {imageUrl ? (
          imageRight ? (
            <>
              {textColumn}
              {imageColumn}
            </>
          ) : (
            <>
              {imageColumn}
              {textColumn}
            </>
          )
        ) : (
          textColumn
        )}
      </div>
    </div>
  );
}
