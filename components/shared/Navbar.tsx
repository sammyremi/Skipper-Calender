"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX, Calendar as CalendarIcon, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onOpenCalendarModal?: () => void;
}

export default function Navbar({ onOpenCalendarModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    // Initialize theme state from document / localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

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
          ? "bg-charcoal-950/85 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* ─── MOBILE LAYOUT (below md) ─────────────────────────────── */}
      <div className="md:hidden flex flex-col items-center pt-4 pb-3 px-4 gap-1.5">
        {/* Row 1: S & A centered + action icons top-right */}
        <div className="w-full flex items-start justify-between">
          {/* Spacer */}
          <div className="w-20" />

          {/* Centered identity */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="font-serif text-xl tracking-wider text-white font-semibold leading-tight">
              S &amp; A
            </span>
            <span className="text-[9px] tracking-widest text-white/70 uppercase font-sans">
              Our Digital Chapter
            </span>
          </button>

          {/* Action icons */}
          <div className="flex items-center gap-1.5">
            {onOpenCalendarModal && (
              <button
                onClick={onOpenCalendarModal}
                aria-label="Open calendar"
                className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:border-softPink-300 transition-all cursor-pointer"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-softPink-300" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light and dark mode"
              className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:border-softPink-300 transition-all cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 text-babyBlue-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-softPink-300" />
              )}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              aria-label="Toggle ambient music"
              className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:border-softPink-300 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-softPink-300" />}
            </button>
          </div>
        </div>

        {/* Row 2: Navigation — horizontally scrollable */}
        <nav
          className="flex items-center gap-5 overflow-x-auto no-scrollbar font-sans text-[10px] uppercase tracking-widest font-medium text-white/90 w-full justify-center"
          role="navigation"
          aria-label="Main navigation"
        >
          {[
            { label: "Our Story", id: "story" },
            { label: "Memories", id: "memories" },
            { label: "Gallery", id: "gallery" },
            { label: "Videos", id: "videos" },
            { label: "For You", id: "letter" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="flex-shrink-0 hover:text-softPink-300 transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* ─── DESKTOP LAYOUT (md and above) ──────────────────────────── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 md:px-12 py-5 items-center justify-between">
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
              S &amp; A
            </span>
            <span className="text-[10px] tracking-widest text-white/70 uppercase font-sans group-hover:text-softPink-200 transition-colors duration-300">
              Our Digital Chapter
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav
          className="flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-medium text-white"
          role="navigation"
          aria-label="Main navigation"
        >
          {[
            { label: "Our Story", id: "story" },
            { label: "Memories", id: "memories" },
            { label: "Gallery", id: "gallery" },
            { label: "Videos", id: "videos" },
            { label: "For You", id: "letter" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="hover:text-softPink-300 hover:scale-115 transition-all duration-300 cursor-pointer origin-center inline-block"
            >
              {label}
            </button>
          ))}
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

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light and Dark Mode"
            className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:text-softPink-300 hover:border-softPink-300 hover:scale-110 transition-all cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-babyBlue-300" />
            ) : (
              <Moon className="w-4 h-4 text-softPink-300" />
            )}
          </button>

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
