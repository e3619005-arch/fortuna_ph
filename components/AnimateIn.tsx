"use client";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 24,
  blur = false,
}: {
  children: React.ReactNode;
  /** Классы для анимируемого контейнера (например, aspect-ratio в сетке). */
  className?: string;
  delay?: number;
  duration?: number;
  /** Откуда въезжает блок: up | down | left | right. */
  direction?: Direction;
  /** Дальность «въезда», px. */
  distance?: number;
  /** Лёгкое проявление из расфокуса — для заголовков. */
  blur?: boolean;
}) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;
  const { x, y } = OFFSETS[direction];
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: x * distance,
        y: y * distance,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

