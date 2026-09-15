"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_IMAGES } from "@/data/memories";
import { Sparkles, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".gallery-item");

    items.forEach((item) => {
      const img = item.querySelector("img");
      const mask = item.querySelector(".curtain-mask");

      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.5,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 1,
            },
          }
        );
      }

      if (mask) {
        gsap.to(mask, {
          height: "0%",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
          },
        });
      }
    });
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="py-32 px-6 md:px-12 bg-grain relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-babyBlue-200/60 dark:border-white/10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-babyBlue-500 dark:text-babyBlue-300 font-sans font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chapter 04 — Editorial Curation</span>
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-charcoal-900 dark:text-white font-semibold tracking-tight">
              Captured Moments
            </h2>
          </div>
          <p className="text-charcoal-900/60 dark:text-white/70 text-sm font-sans max-w-sm italic">
            An asymmetric editorial showcase of real frames from our daily life and adventures.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {GALLERY_IMAGES.map((img, idx) => {
            // Calculate asymmetric column spans
            const colSpan =
              idx % 5 === 0
                ? "md:col-span-8"
                : idx % 5 === 1
                ? "md:col-span-4"
                : idx % 5 === 2
                ? "md:col-span-4"
                : idx % 5 === 3
                ? "md:col-span-4"
                : "md:col-span-4";

            return (
              <div
                key={idx}
                onClick={() => setActivePhoto(img)}
                className={`gallery-item ${colSpan} relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group cursor-pointer`}
              >
                {/* Curtain Reveal Overlay */}
                <div className="curtain-mask absolute inset-0 bg-babyBlue-100 z-10 pointer-events-none" />

                <div className={`relative ${img.aspect} w-full overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={
                      img.src.includes("hero1") || img.src.includes("hero2")
                        ? { filter: "grayscale(100%) contrast(106%)" }
                        : undefined
                    }
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      img.src.includes("hero1") || img.src.includes("hero2")
                        ? "grayscale"
                        : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-semibold">{img.title}</h4>
                      <p className="text-xs font-sans text-white/80">{img.caption}</p>
                    </div>
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Inspector Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-charcoal-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/20 flex flex-col md:flex-row"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-3/4 h-[50vh] md:h-auto bg-black flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  style={
                    activePhoto.src.includes("hero1") || activePhoto.src.includes("hero2")
                      ? { filter: "grayscale(100%) contrast(106%)" }
                      : undefined
                  }
                  className={`max-h-full max-w-full object-contain ${
                    activePhoto.src.includes("hero1") || activePhoto.src.includes("hero2")
                      ? "grayscale"
                      : ""
                  }`}
                />
              </div>

              <div className="md:w-1/4 p-6 md:p-8 bg-charcoal-900 text-white flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-babyBlue-300 font-sans">
                    Gallery Detail
                  </span>
                  <h3 className="font-serif text-3xl font-semibold mt-2">{activePhoto.title}</h3>
                  <p className="text-white/70 text-sm font-sans mt-3 leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-full py-3 rounded-xl bg-white text-charcoal-900 font-sans font-medium text-xs uppercase tracking-wider hover:bg-babyBlue-100 transition-colors mt-6 cursor-pointer"
                >
                  Close Photo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
