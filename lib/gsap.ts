// Central GSAP registration — import from "@/lib/gsap" in client components only.
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  MotionPathPlugin,
  DrawSVGPlugin
);

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  MotionPathPlugin,
  DrawSVGPlugin,
};

/**
 * SplitText masks clip with overflow:hidden. Tight line-heights
 * (leading-none) cut font descenders (p/g/y tails), and negative
 * letter-spacing makes char masks narrower than their glyphs, cutting them
 * horizontally. Give each mask room on all sides, compensated with negative
 * margins so layout doesn't shift. Reveals must rise from yPercent >= 130 so
 * the taller masks still fully hide the text beforehand.
 */
export function padMasks(targets: Element[]) {
  targets.forEach((el) => {
    const mask = el.parentElement;
    if (!mask) return;
    mask.style.padding = "0 0.12em 0.18em";
    mask.style.margin = "0 -0.12em -0.18em";
  });
}
