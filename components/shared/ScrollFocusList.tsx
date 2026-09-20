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
    // How many viewport heights the section takes while pinned
    const scrollDistance = totalItems * 80; // 80vh per item

    // Set initial state: first item focused, rest blurred
    itemsRef.current.forEach((item, idx) => {
      if (!item) return;
      if (idx === 0) {
        gsap.set(item, { opacity: 1, filter: "blur(0px)", scale: 1 });
      } else {
        gsap.set(item, {
          opacity: 0.3,
          filter: "blur(4px)",
          scale: 0.98,
        });
      }
    });

    // Subtle parallax on image
    if (stickyImageRef.current) {
      gsap.fromTo(
        stickyImageRef.current,
        { y: 0 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${scrollDistance}vh`,
            scrub: 2,
          },
        }
      );
    }

    // Per-item focus animation driven by scroll progress
    itemsRef.current.forEach((item, activeIdx) => {
      if (!item) return;

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}vh`,
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress; // 0 → 1
          // Which item index should be "active" at this scroll position
          const activeProgress = progress * (totalItems - 1);
          const distance = Math.abs(activeProgress - activeIdx);

          // Blur: 0 when active, up to 5px when far
          const blurAmount = Math.min(5, distance * 2.5);
          // Opacity: 1 when active, down to 0.2 when far
          const opacity = Math.max(0.2, 1 - distance * 0.35);
          // Scale: 1 when active, slightly smaller when far
          const scale = Math.max(0.96, 1 - distance * 0.015);

          gsap.to(item, {
            opacity,
            filter: `blur(${blurAmount}px)`,
            scale,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        },
      });

      return () => trigger.kill();
    });

    // Pin the section while scrolling through items
    const pin = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance}vh`,
      pin: true,
      anticipatePin: 1,
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === container)
        .forEach((t) => t.kill());
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
      } flex flex-col justify-center space-y-10 py-12 lg:py-0`}
    >
      {/* Chapter / Heading */}
      {(chapterLabel || heading) && (
        <div className="space-y-3 mb-4">
          {chapterLabel && (
            <span className="text-xs uppercase tracking-widest text-babyBlue-500 dark:text-babyBlue-300 font-sans font-medium">
              {chapterLabel}
            </span>
          )}
          {heading && (
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 dark:text-white font-semibold tracking-tight leading-tight">
              {heading}
            </h2>
          )}
          <div className="w-10 h-0.5 bg-gradient-to-r from-babyBlue-300 to-softPink-300 rounded-full" />
        </div>
      )}

      {/* Items list */}
      <div className="space-y-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => { itemsRef.current[idx] = el; }}
            className="focus-item flex items-start gap-5 will-change-[opacity,filter,transform]"
          >
            {item.number && (
              <span className="flex-shrink-0 font-sans text-xs font-bold uppercase tracking-widest text-babyBlue-400 dark:text-babyBlue-300 pt-1 w-8">
                {item.number}
              </span>
            )}
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal-900 dark:text-white font-medium leading-snug">
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
      className="relative w-full min-h-screen bg-grain dark:bg-charcoal-950 transition-colors duration-500"
    >
      {/* Mobile image (above text on small screens) */}
      {imageUrl && (
        <div className="lg:hidden w-full aspect-[16/9] overflow-hidden relative">
          <img
            src={getAssetPath(imageUrl)}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-grain dark:to-charcoal-950 pointer-events-none" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full min-h-screen grid grid-cols-12 gap-12 items-center">
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
