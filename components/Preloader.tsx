"use client";
import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const RED = "#E5484D";
const GOLD = "#D4AF6A";

/** Полярная точка циферблата: a — «часовой» угол в градусах (0 = 12 часов). */
function pt(cx: number, cy: number, r: number, a: number) {
  const rad = (a * Math.PI) / 180;
  // Округляем до 3 знаков: сервер и клиент должны рендерить одинаковые
  // строки координат, иначе React падает с hydration mismatch.
  return {
    x: Math.round((cx + r * Math.sin(rad)) * 1000) / 1000,
    y: Math.round((cy - r * Math.cos(rad)) * 1000) / 1000,
  };
}

/** Дуга циферблата от угла a0 до a1 (в градусах, по часовой стрелке). */
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = pt(cx, cy, r, a0);
  const p1 = pt(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
}

const SCALE_START = 225; // 7:30 — стрелка в покое
const SCALE_SWEEP = 270; // размах шкалы до 4:30
const MAX_RPM = 8000;
const SCALE_R = 74; // радиус дуги шкалы
const ARC_LEN = (SCALE_R * (SCALE_SWEEP * Math.PI)) / 180; // длина дуги шкалы

/**
 * Прелоадер-тахометр: стрелка разгоняется до отсечки, коробка щёлкает
 * передачи — и сайт плавно «стартует» со speed-lines и кроссфейдом.
 * При prefers-reduced-motion не показывается.
 */
export default function Preloader() {
  const shouldReduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  const rpm = useMotionValue(0);
  const jitter = useMotionValue(0);

  const needleAngle = useTransform<number, number>([rpm, jitter], (latest) => {
    const [r, j] = latest;
    return SCALE_START + (r / MAX_RPM) * SCALE_SWEEP + j;
  });
  const needleX = useTransform(needleAngle, (a) =>
    Math.round((100 + 64 * Math.sin((a * Math.PI) / 180)) * 1000) / 1000
  );
  const needleY = useTransform(needleAngle, (a) =>
    Math.round((100 - 64 * Math.cos((a * Math.PI) / 180)) * 1000) / 1000
  );
  const dashOffset = useTransform(rpm, (r) => ARC_LEN * (1 - r / MAX_RPM));
  const rpmText = useTransform<number, string>(rpm, (r) => Math.round(r).toString().padStart(4, "0"));
  const gear = useTransform<number, string>(rpm, (r) => (r < 2000 ? "P" : r < 5000 ? "D" : "1"));

  useEffect(() => {
    if (shouldReduce) return;
    const timers: number[] = [];
    const controls = animate(rpm, MAX_RPM, {
      duration: 1.3,
      ease: [0.35, 0, 0.45, 1],
      onComplete: () => {
        // Короткая дрожь стрелки на отсечке, затем плавный старт.
        const jit = animate(jitter, [0, 2.6, -2.6, 1.8, -1.2, 0.6, 0], {
          duration: 0.4,
          repeat: 1,
          repeatType: "mirror",
        });
        timers.push(
          window.setTimeout(() => {
            jit.stop();
            setExiting(true);
          }, 350)
        );
      },
    });
    return () => {
      controls.stop();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [shouldReduce, rpm, jitter]);

  // После старта полностью убираем оверлей.
  useEffect(() => {
    if (!exiting) return;
    const t = window.setTimeout(() => setHidden(true), 750);
    return () => window.clearTimeout(t);
  }, [exiting]);

  if (shouldReduce || hidden) return null;

  const ticks = Array.from({ length: 17 }, (_, i) => {
    const a = SCALE_START + (i / 16) * SCALE_SWEEP;
    const major = i % 2 === 0;
    const isRed = i >= 14;
    return {
      a,
      major,
      isRed,
      p0: pt(100, 100, major ? 60 : 65, a),
      p1: pt(100, 100, 70, a),
      label: i / 2,
    };
  });
  const redlineArc = arcPath(
    100,
    100,
    SCALE_R,
    SCALE_START + (7 / 8) * SCALE_SWEEP,
    SCALE_START + SCALE_SWEEP
  );
  const scaleArc = arcPath(100, 100, SCALE_R, SCALE_START, SCALE_START + SCALE_SWEEP);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] overflow-hidden bg-bg ${
        exiting ? "pointer-events-none" : ""
      }`}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
      role="status"
      aria-label="Загрузка FORTUNA_PH"
    >
      {/* Глубина: мягкий радиальный фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#131315_0%,#0A0A0B_72%)]" />

      {/* Контент */}
      <motion.div
        className="relative z-30 flex h-full flex-col items-center justify-center gap-5 px-6"
        animate={exiting ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase"
        >
          Ignition · Moscow
        </motion.div>

        {/* Циферблат */}
        <svg
          viewBox="0 0 200 200"
          className="h-[240px] w-[240px] sm:h-[280px] sm:w-[280px]"
        >
          <circle cx="100" cy="100" r="86" fill="#131315" stroke="#232326" strokeWidth="1" />
          {/* Шкала-подложка */}
          <path d={scaleArc} fill="none" stroke="#232326" strokeWidth="3" strokeLinecap="round" />
          {/* Золотой прогресс */}
          <motion.path
            d={scaleArc}
            fill="none"
            stroke={GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            style={{ strokeDashoffset: dashOffset }}
          />
          {/* Красная зона отсечки */}
          <path d={redlineArc} fill="none" stroke={RED} strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
          {/* Риски и метки */}
          {ticks.map((t, i) => (
            <g key={i}>
              <line
                x1={t.p0.x}
                y1={t.p0.y}
                x2={t.p1.x}
                y2={t.p1.y}
                stroke={t.isRed ? RED : t.major ? "#ECECEC" : "#55555B"}
                strokeWidth={t.major ? 2 : 1}
              />
              {t.major && (
                <text
                  x={pt(100, 100, 46, t.a).x}
                  y={pt(100, 100, 46, t.a).y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={t.isRed ? RED : "#9A9A9F"}
                  fontSize="7"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {t.label}
                </text>
              )}
            </g>
          ))}
          {/* Стрелка */}
          <motion.line
            x1="100"
            y1="100"
            x2={needleX}
            y2={needleY}
            stroke={GOLD}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Ступица */}
          <circle cx="100" cy="100" r="7" fill="#131315" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="100" cy="100" r="2.2" fill={GOLD} />
        </svg>

        {/* Передача */}
        <div className="flex items-center gap-3 font-mono">
          <span className="text-[10px] tracking-[0.3em] text-muted uppercase">Gear</span>
          <span className="flex h-8 w-8 items-center justify-center border border-line text-sm text-accent">
            <motion.span>{gear}</motion.span>
          </span>
        </div>

        {/* Цифровой тахометр */}
        <div className="flex items-baseline gap-2 font-mono">
          <motion.span className="text-3xl sm:text-4xl text-accent tabular-nums">
            {rpmText}
          </motion.span>
          <span className="text-[10px] tracking-[0.25em] text-muted uppercase">rpm</span>
        </div>

        <div className="font-mono text-[10px] tracking-[0.4em] text-muted uppercase">
          FORTUNA_PH
        </div>
      </motion.div>

      {/* Speed-lines при старте */}
      {exiting && (
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 h-px w-48 bg-gradient-to-r from-transparent via-accent to-transparent"
              style={{ top: `${8 + i * 12}%` }}
              initial={{ x: "-20vw", opacity: 0 }}
              animate={{ x: "120vw", opacity: [0, 0.8, 0] }}
              transition={{
                duration: 0.55,
                delay: i * 0.045,
                ease: [0.7, 0, 0.9, 0.4],
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
