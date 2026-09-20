"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PINK_COLORS = ["#F4B4C4", "#f472b6", "#fbcfe8", "#f43f5e"];
const BLUE_COLORS = ["#A0C4DF", "#60a5fa", "#bfdbfe", "#38bdf8"];

const SHAPES = ["♡", "♥", "✦", "✧", "•", "●"];

export default function LoveParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const spawnParticleBurst = (x: number, y: number) => {
      // Limit total active particles to avoid DOM clutter (cap at 60)
      if (container.children.length > 50) {
        while (container.children.length > 30 && container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }

      // Generate ~15 particles per burst
      const count = Math.floor(Math.random() * 4) + 14;

      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

        // 50% Baby Blue, 50% Soft Pink
        const isPink = i % 2 === 0;
        const colorPalette = isPink ? PINK_COLORS : BLUE_COLORS;
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

        el.innerText = shape;
        el.style.position = "fixed";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.color = color;
        el.style.pointerEvents = "none";
        el.style.userSelect = "none";
        el.style.zIndex = "9999";
        el.style.willChange = "transform, opacity";
        el.style.lineHeight = "1";
        // Subtle drop shadow + glow so particles pop cleanly on white/ivory and dark backgrounds
        el.style.textShadow = `0 0 6px ${color}80, 0 1px 3px rgba(0, 0, 0, 0.25)`;

        // Dimensioning per shape type
        if (shape === "♡" || shape === "♥") {
          el.style.fontSize = `${Math.floor(Math.random() * 7) + 8}px`; // 8-14px
        } else if (shape === "✦" || shape === "✧") {
          el.style.fontSize = `${Math.floor(Math.random() * 6) + 7}px`; // 7-12px
        } else {
          el.style.fontSize = `${Math.floor(Math.random() * 5) + 3}px`; // 3-7px
        }

        container.appendChild(el);

        // 360-degree radial distribution
        const baseAngle = (i / count) * Math.PI * 2;
        const angle = baseAngle + (Math.random() - 0.5) * 0.45;
        const radius = Math.random() * 38 + 24; // 24px to 62px burst radius

        const destX = Math.cos(angle) * radius;
        const destY = Math.sin(angle) * radius - (Math.random() * 10); // Slight upward float
        const rotation = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 0.4 + 0.7; // 700ms to 1100ms
        const delay = Math.random() * 0.08; // 0 to 80ms stagger

        // GSAP burst animation: noticeable start, smooth 360 spread, gradual fade out
        const tl = gsap.timeline({
          onComplete: () => {
            if (el.parentNode === container) {
              container.removeChild(el);
            }
          },
        });

        tl.fromTo(
          el,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.3,
            rotation: 0,
          },
          {
            x: destX * 0.4,
            y: destY * 0.4,
            opacity: 1,
            scale: 1.1,
            rotation: rotation * 0.3,
            duration: duration * 0.3,
            delay: delay,
            ease: "power2.out",
          }
        ).to(el, {
          x: destX,
          y: destY,
          opacity: 0,
          scale: 0.8,
          rotation: rotation,
          duration: duration * 0.7,
          ease: "power2.inOut",
        });
      }
    };

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

      // Tap/click vs. Scroll/drag distinction:
      // Must move less than 10px and duration under 350ms
      if (deltaX < 10 && deltaY < 10 && deltaTime < 350) {
        spawnParticleBurst(e.clientX, e.clientY);
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
