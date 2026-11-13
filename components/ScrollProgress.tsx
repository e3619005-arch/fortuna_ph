"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Золотая полоска прогресса скролла вверху страницы. */
export default function ScrollProgress() {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  if (shouldReduce) return null;
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
