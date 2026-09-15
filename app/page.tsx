"use client";

import { useState } from "react";
import Preloader from "@/components/shared/Preloader";
import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import OurStorySection from "@/components/story/OurStorySection";
import HorizontalMemories from "@/components/memories/HorizontalMemories";
import EditorialGallery from "@/components/gallery/EditorialGallery";
import CinematicVideoSection from "@/components/videos/CinematicVideoSection";
import LittleThingsSection from "@/components/little-things/LittleThingsSection";
import ThingsILoveSection from "@/components/things-i-love/ThingsILoveSection";
import OurSongSection from "@/components/our-song/OurSongSection";
import LoveLetterSection from "@/components/love-letter/LoveLetterSection";
import FinalRevealSection from "@/components/final-reveal/FinalRevealSection";
import RomanticCalendar from "@/components/calendar/RomanticCalendar";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Home() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  return (
    <main className="relative bg-grain text-charcoal-900 min-h-screen">
      {/* Luxury Cinematic Preloader Screen */}
      <Preloader />

      {/* Floating Navbar */}
      <Navbar onOpenCalendarModal={() => setIsCalendarModalOpen(true)} />

      {/* Chapter 01: Hero & Interactive Calendar */}
      <HeroSection />

      {/* Chapter 02: Our Story (Timeline) */}
      <OurStorySection />

      {/* Chapter 03: Horizontal Memories (Film Strip) */}
      <HorizontalMemories />

      {/* Chapter 04: Editorial Photo Gallery */}
      <EditorialGallery />

      {/* Chapter 05: Cinematic Motion Video Showcase */}
      <CinematicVideoSection />

      {/* Chapter 06: Little Things (Micro Moments & Inside Jokes) */}
      <LittleThingsSection />

      {/* Chapter 07: Things I Love About You (Typography Reveal) */}
      <ThingsILoveSection />

      {/* Chapter 08: Our Song (Vinyl Audio Player) */}
      <OurSongSection />

      {/* Chapter 09: Love Letter ("FOR YOU") */}
      <LoveLetterSection />

      {/* Chapter 10: Final Reveal ("AND THIS IS ONLY THE BEGINNING.") */}
      <FinalRevealSection />

      {/* Global Calendar Modal Quick View */}
      <AnimatePresence>
        {isCalendarModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCalendarModalOpen(false)}
            className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-charcoal-900 hover:bg-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <RomanticCalendar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
