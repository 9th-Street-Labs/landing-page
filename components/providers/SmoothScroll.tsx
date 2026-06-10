"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const NAV_OFFSET = -88;

/**
 * Lenis smooth scrolling, driven by the GSAP ticker and synced with
 * ScrollTrigger. Keeps native scroll position (fixed navbar and
 * window.scrollY listeners keep working). Disabled under reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ anchors: { offset: NAV_OFFSET } });

    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}
