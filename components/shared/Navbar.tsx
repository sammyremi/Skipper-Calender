"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX, Calendar as CalendarIcon } from "lucide-react";

interface NavbarProps {
  onOpenCalendarModal?: () => void;
}

export default function Navbar({ onOpenCalendarModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-charcoal-950/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Monogram Badge */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-softPink-300 transition-all duration-300">
            <Heart className="w-4 h-4 text-white fill-white/40 transition-colors group-hover:text-softPink-300 group-hover:fill-softPink-300" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg tracking-wider text-white font-semibold leading-tight group-hover:text-softPink-300 group-hover:scale-105 origin-left transition-all duration-300">
              S & A
            </span>
            <span className="text-[10px] tracking-widest text-white/70 uppercase font-sans group-hover:text-softPink-200 transition-colors duration-300">
              Our Digital Chapter
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-medium text-white">
          <button
            onClick={() => scrollToSection("story")}
            className="hover:text-softPink-300 hover:scale-115 transition-all duration-300 cursor-pointer origin-center inline-block"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollToSection("memories")}
            className="hover:text-softPink-300 hover:scale-115 transition-all duration-300 cursor-pointer origin-center inline-block"
          >
            Memories
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="hover:text-softPink-300 hover:scale-115 transition-all duration-300 cursor-pointer origin-center inline-block"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("videos")}
            className="hover:text-softPink-300 hover:scale-115 transition-all duration-300 cursor-pointer origin-center inline-block"
          >
            Videos
          </button>
          <button
            onClick={() => scrollToSection("letter")}
            className="hover:text-softPink-300 hover:scale-115 transition-all duration-300 cursor-pointer origin-center inline-block"
          >
            For You
          </button>
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          {onOpenCalendarModal && (
            <button
              onClick={onOpenCalendarModal}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs tracking-wider uppercase font-sans font-medium flex items-center gap-2 hover:border-softPink-300 hover:text-softPink-300 hover:scale-105 transition-all cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-softPink-300" />
              <span>Calendar</span>
            </button>
          )}

          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label="Toggle ambient music"
            className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:text-softPink-300 hover:border-softPink-300 hover:scale-110 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-softPink-300" />}
          </button>
        </div>
      </div>
    </header>
  );
}
