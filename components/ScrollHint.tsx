"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Индикатор прокрутки внизу Hero: подпись SCROLL и пульсирующая
 * вертикальная линия. При prefers-reduced-motion не показывается.
 */
export default function ScrollHint() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="font-mono text-[9px] tracking-[0.35em] text-muted uppercase">
        Scroll
      </span>
      <motion.span
        className="block h-6 w-px origin-top bg-accent/70"
        animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
