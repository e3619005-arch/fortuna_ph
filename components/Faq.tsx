"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ } from "@/content";

/** Аккордеон «Частые вопросы»: открыт один вопрос за раз. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl border-t border-line">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-6 py-6 text-left"
            >
              <span className="font-mono text-xs text-accent tracking-[0.3em]">
                0{i + 1}
              </span>
              <span
                className={`flex-1 text-lg md:text-xl font-medium transition-colors ${
                  isOpen ? "text-accent" : "group-hover:text-accent"
                }`}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-2xl text-accent leading-none select-none"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 md:pl-[46px] text-muted leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
