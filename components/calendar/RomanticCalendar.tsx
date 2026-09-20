"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, X, MapPin, Tag } from "lucide-react";
import { MEMORIES, Memory, getAssetPath } from "@/data/memories";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface RomanticCalendarProps {
  onSelectMemory?: (memory: Memory) => void;
  className?: string;
  isCompact?: boolean;
}

export default function RomanticCalendar({
  onSelectMemory,
  className = "",
  isCompact = false,
}: RomanticCalendarProps) {
  // Dynamic initialization from system date
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-indexed
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showYearSelector, setShowYearSelector] = useState(false);

  // Generate Year Options (e.g. 2023 - 2028)
  const yearOptions = useMemo(() => {
    const years = [];
    const baseYear = today.getFullYear();
    for (let y = baseYear - 3; y <= baseYear + 3; y++) {
      years.push(y);
    }
    return years;
  }, [today]);

  // Calendar calculations
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  // Map memories by YYYY-MM-DD
  const memoryMap = useMemo(() => {
    const map = new Map<string, Memory>();
    MEMORIES.forEach((mem) => {
      map.set(mem.date, mem);
    });
    return map;
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleResetToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  const isCurrentSystemMonth =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const mem = memoryMap.get(dateStr);
    if (mem) {
      setSelectedMemory(mem);
      if (onSelectMemory) onSelectMemory(mem);
    }
  };

  return (
    <div
      className={`glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Decorative ambient gradient background */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-babyBlue-100/50 dark:bg-babyBlue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-softPink-100/50 dark:bg-softPink-300/10 blur-3xl pointer-events-none" />

      {/* Calendar Header */}
      <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-babyBlue-100/70 dark:border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-charcoal-900/50 dark:text-white/70 font-sans font-medium">
            Our Memory Journal
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <button
              onClick={() => setShowYearSelector(!showYearSelector)}
              className="font-serif text-2xl md:text-3xl text-charcoal-900 dark:text-white font-semibold tracking-tight hover:text-babyBlue-500 dark:hover:text-babyBlue-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{MONTH_NAMES[currentMonth]}</span>
              <span className="text-babyBlue-500 dark:text-babyBlue-300">{currentYear}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCurrentSystemMonth && (
            <button
              onClick={handleResetToToday}
              className="px-3 py-1 rounded-full bg-babyBlue-50 dark:bg-babyBlue-500/20 text-babyBlue-600 dark:text-babyBlue-300 text-[11px] font-sans font-medium tracking-wide border border-babyBlue-200/60 dark:border-babyBlue-400/40 hover:bg-babyBlue-100 dark:hover:bg-babyBlue-500/30 transition-all cursor-pointer"
            >
              Today
            </button>
          )}

          <div className="flex items-center gap-1 bg-white/80 dark:bg-white/10 p-1 rounded-full border border-babyBlue-100 dark:border-white/20">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1.5 rounded-full hover:bg-babyBlue-50 dark:hover:bg-white/20 text-charcoal-900/70 dark:text-white hover:text-babyBlue-500 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1.5 rounded-full hover:bg-babyBlue-50 dark:hover:bg-white/20 text-charcoal-900/70 dark:text-white hover:text-babyBlue-500 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Year & Month Fast Selector Dropdown */}
      <AnimatePresence>
        {showYearSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white/90 dark:bg-charcoal-900/95 text-charcoal-900 dark:text-white rounded-2xl p-4 border border-babyBlue-200/60 dark:border-white/20 shadow-inner z-20"
          >
            <div className="text-xs uppercase tracking-widest text-charcoal-900/50 dark:text-white/60 mb-2 font-medium">
              Select Year & Month
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-3">
              {yearOptions.map((y) => (
                <button
                  key={y}
                  onClick={() => setCurrentYear(y)}
                  className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                    currentYear === y
                      ? "bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-950"
                      : "bg-babyBlue-50 dark:bg-white/10 text-charcoal-900/70 dark:text-white hover:bg-babyBlue-100 dark:hover:bg-white/20"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {MONTH_NAMES.map((mName, idx) => (
                <button
                  key={mName}
                  onClick={() => {
                    setCurrentMonth(idx);
                    setShowYearSelector(false);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-sans transition-colors ${
                    currentMonth === idx
                      ? "bg-babyBlue-500 text-white font-medium"
                      : "text-charcoal-900/80 dark:text-white/80 hover:bg-babyBlue-50 dark:hover:bg-white/20"
                  }`}
                >
                  {mName.substring(0, 3)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-[11px] font-sans font-medium uppercase tracking-wider text-charcoal-900/40 dark:text-white/60 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <motion.div
        key={`${currentYear}-${currentMonth}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-7 gap-1 md:gap-2"
      >
        {/* Empty leading cells */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9 md:h-11 rounded-xl opacity-0" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          const isToday =
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === day;

          const hasMemory = memoryMap.has(dateStr);
          const mem = memoryMap.get(dateStr);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-9 md:h-11 rounded-full flex flex-col items-center justify-center relative transition-all duration-300 group cursor-pointer ${
                isToday
                  ? "ring-2 ring-softPink-300 ring-offset-1 ring-offset-white dark:ring-offset-charcoal-950 text-charcoal-900 dark:text-white font-bold scale-105"
                  : hasMemory
                  ? "bg-gradient-to-tr from-babyBlue-100/90 to-softPink-100/90 dark:from-babyBlue-500/40 dark:to-softPink-300/40 border border-babyBlue-300/80 dark:border-babyBlue-300 text-charcoal-900 dark:text-white hover:scale-110 hover:shadow-lg"
                  : "hover:bg-babyBlue-50/80 dark:hover:bg-white/20 text-charcoal-900/80 dark:text-white"
              }`}
            >
              <span className={`text-xs md:text-sm font-sans font-medium`}>{day}</span>

              {/* Memory Indicator Dot */}
              {hasMemory && (
                <span className="w-1.5 h-1.5 rounded-full bg-babyBlue-500 dark:bg-babyBlue-300 absolute bottom-1 group-hover:scale-150 transition-transform animate-pulse" />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Legend Footer */}
      <div className="mt-6 pt-3 border-t border-babyBlue-100/60 dark:border-white/10 flex flex-col gap-1.5 text-[11px] font-sans text-charcoal-900/60 dark:text-white/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-babyBlue-500 dark:bg-babyBlue-300" />
            <span>Dates with memories</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full ring-2 ring-softPink-300 inline-flex items-center justify-center" />
            <span>Today</span>
          </div>
        </div>
        <span className="italic text-charcoal-900/40 dark:text-white/50 text-center">Click any date to explore</span>
      </div>

      {/* Memory Preview Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-babyBlue-200 dark:border-white/20 relative"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center text-charcoal-900 dark:text-white hover:bg-white transition-colors cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Memory Media Header */}
              {selectedMemory.image && (
                <div className="relative h-64 w-full bg-charcoal-900 overflow-hidden">
                  <img
                    src={getAssetPath(selectedMemory.image)}
                    alt={selectedMemory.title}
                    style={
                      selectedMemory.image.includes("hero1") || selectedMemory.image.includes("hero2")
                        ? { filter: "grayscale(100%) contrast(106%)" }
                        : undefined
                    }
                    className={`w-full h-full object-cover ${
                      selectedMemory.image.includes("hero1") || selectedMemory.image.includes("hero2")
                        ? "grayscale"
                        : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-sans font-medium mb-1 inline-block">
                      {selectedMemory.date}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-semibold">
                      {selectedMemory.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Memory Details */}
              <div className="p-6">
                {selectedMemory.location && (
                  <div className="flex items-center gap-1.5 text-xs font-sans text-babyBlue-600 dark:text-babyBlue-300 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedMemory.location}</span>
                  </div>
                )}

                <p className="text-charcoal-900/80 dark:text-white/80 text-sm leading-relaxed font-sans mb-6">
                  {selectedMemory.description}
                </p>

                {selectedMemory.video && (
                  <div className="rounded-2xl overflow-hidden bg-charcoal-950 mb-4 border border-babyBlue-100">
                    <video
                      src={getAssetPath(selectedMemory.video)}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full max-h-48 object-cover"
                    />
                  </div>
                )}

                <button
                  onClick={() => setSelectedMemory(null)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-babyBlue-400 to-babyBlue-500 text-white font-sans font-medium text-xs tracking-wider uppercase hover:shadow-lg transition-all cursor-pointer"
                >
                  Close Memory
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
