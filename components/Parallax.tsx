"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Параллакс при скролле: содержимое плавно сдвигается, пока элемент
 * проходит от верхней границы экрана до полного ухода за неё.
 */
export default function Parallax({
  children,
  className,
  from = 0,
  to = 120,
}: {
  children: React.ReactNode;
  className?: string;
  /** Сдвиг по Y (px) в начале прокрутки. */
  from?: number;
  /** Сдвиг по Y (px), когда элемент полностью ушёл за верх экрана. */
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  if (shouldReduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
