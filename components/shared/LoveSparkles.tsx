"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SHAPES = ["♡", "✦", "✧", "•"];
const COLORS = [
  "#F4B4C4", // Soft Pink
  "#f472b6", // Pink 400
  "#fbcfe8", // Pink 200
  "#A0C4DF", // Baby Blue
  "#60a5fa", // Blue 400
  "#bfdbfe", // Blue 200
];

interface ParticleData {
  id: string;
  x: number;
  y: number;
}

export default function LoveSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const spawnSparkleBurst = (x: number, y: number) => {
      // Limit active particles on screen to avoid DOM clutter
      if (container.children.length > 35) {
        // Remove oldest particles if exceeding max cap
        while (container.children.length > 25 && container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }

      // Generate 5-7 subtle particles
      const count = Math.floor(Math.random() * 3) + 5;

      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        el.innerText = shape;
        el.style.position = "fixed";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.color = color;
        el.style.pointerEvents = "none";
        el.style.userSelect = "none";
        el.style.zIndex = "9999";
        el.style.willChange = "transform, opacity";

        // Font size based on shape
        if (shape === "♡") {
          el.style.fontSize = `${Math.floor(Math.random() * 6) + 8}px`; // 8-13px
        } else if (shape === "✦" || shape === "✧") {
          el.style.fontSize = `${Math.floor(Math.random() * 5) + 6}px`; // 6-10px
        } else {
          el.style.fontSize = `${Math.floor(Math.random() * 3) + 3}px`; // 3-5px
        }

        container.appendChild(el);

        // Calculate outward movement trajectory with slight upward float
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 28 + 16; // 16px to 44px
        const destX = Math.cos(angle) * radius;
        const destY = Math.sin(angle) * radius - (Math.random() * 14 + 6); // Upward drift
        const rotation = (Math.random() - 0.5) * 160;
        const duration = Math.random() * 0.3 + 0.6; // 0.6s - 0.9s
        const delay = Math.random() * 0.06; // Slight stagger

        gsap.fromTo(
          el,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0.5,
            rotation: 0,
          },
          {
            x: destX,
            y: destY,
            opacity: 0,
            scale: 1.1,
            rotation: rotation,
            duration: duration,
            delay: delay,
            ease: "power2.out",
            onComplete: () => {
              if (el.parentNode === container) {
                container.removeChild(el);
              }
            },
          }
        );
      }
    };

    // Pointer events for unified mouse + touch interaction
    const handlePointerDown = (e: PointerEvent) => {
      touchStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      };
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!touchStartRef.current) return;

      const deltaX = Math.abs(e.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(e.clientY - touchStartRef.current.y);
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Distinguish tap/click from drag/scroll:
      // Movement distance must be under 10px and duration under 350ms
      if (deltaX < 10 && deltaY < 10 && deltaTime < 350) {
        spawnSparkleBurst(e.clientX, e.clientY);
      }

      touchStartRef.current = null;
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
