import { AnimateIn } from "@/components/AnimateIn";
import { HERO, TICKER, FORMAT, WHY, LOCATIONS_TEXT, ABOUT, TERMS, PORTFOLIO, MANIFEST, SITE, FOOTER } from "@/content";
import TopoBackground from "@/components/TopoBackground";
import Parallax from "@/components/Parallax";
import Faq from "@/components/Faq";
import Year from "@/components/Year";
import Viewfinder from "@/components/Viewfinder";
import ScrollHint from "@/components/ScrollHint";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <TopoBackground
        className="fixed inset-0 z-0"
        speed={0.6}
        seed={26}
        interactive
      />
      <div className="relative z-10">
      {/* HERO */}
      <section className="relative h-[100svh] overflow-hidden border-b border-line">
        <Parallax
          className="absolute inset-x-0 -top-[140px] -bottom-[140px]"
          from={0}
          to={140}
        >
          <Image
            src={HERO.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bg" />
        </Parallax>

        <Parallax className="relative z-10 h-full" from={0} to={-60}>
          <div className="flex flex-col justify-between h-full px-6 md:px-12 py-8">
          <div className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-muted uppercase">
            {HERO.label}
          </div>

          <div className="max-w-3xl">
            <AnimateIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
                {HERO.h1}
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.4}>
              <p className="mt-6 text-muted text-base md:text-lg max-w-xl">{HERO.sub}</p>
            </AnimateIn>
            <AnimateIn delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href={SITE.tgContact}
                  target="_blank"
                  className="group relative overflow-hidden border border-accent text-accent px-8 py-4 font-mono text-sm tracking-wider uppercase inline-block w-fit"
                >
                  <span className="relative z-10 group-hover:text-bg transition-colors">Записаться на съёмку</span>
                  <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Link>
                <a
                  href="#portfolio"
                  className="border border-line text-ink px-8 py-4 font-mono text-sm tracking-wider uppercase inline-block w-fit hover:border-ink transition-colors"
                >
                  Смотреть работы
                </a>
              </div>
            </AnimateIn>
          </div>

          <div className="hidden sm:block font-mono text-[10px] md:text-xs text-muted tracking-[0.2em]">
            {HERO.exif}
          </div>
          </div>
        </Parallax>

        {/* HUD: рамка видоискателя, вертикальная подпись, индикатор скролла */}
        <Viewfinder inset="inset-3 md:inset-6" className="z-10" />
        <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <span className="font-mono text-[10px] tracking-[0.35em] text-muted/60 uppercase [writing-mode:vertical-rl]">
            МОСКВА · 55.7558° N, 37.6173° E · FORTUNA_PH
          </span>
        </div>
        <ScrollHint />
      </section>

      {/* TICKER */}
      <section className="border-b border-line py-5 overflow-hidden bg-panel/70">
        <div className="ticker-track flex gap-12 whitespace-nowrap font-mono text-sm tracking-[0.25em] text-muted uppercase">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </section>

      {/* 01 FORMAT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 01 — ФОРМАТ"}</div>
          <h2 className="text-3xl md:text-5xl font-medium mb-16 max-w-2xl">Как это устроено</h2>
        </AnimateIn>
        <div className="grid md:grid-cols-3 gap-px bg-line">
          {FORMAT.map((s, i) => (
            <AnimateIn key={s.n} delay={i * 0.1}>
              <div className="bg-bg p-8 md:p-10 h-full">
                <div className="font-mono text-xs text-accent tracking-[0.3em] mb-6">{s.n}</div>
                <h3 className="text-xl md:text-2xl font-medium mb-4">{s.t}</h3>
                <p className="text-muted leading-relaxed">{s.d}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
      {/* 02 WHY */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 02 — ЗАЧЕМ"}</div>
          <h2 className="text-3xl md:text-5xl font-medium mb-16 max-w-2xl">Три причины приехать</h2>
        </AnimateIn>
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {WHY.map((w, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div>
                <div className="font-mono text-xs text-accent tracking-[0.3em] mb-4">0{i + 1}</div>
                <h3 className="text-xl font-medium mb-3">{w.t}</h3>
                <p className="text-muted leading-relaxed">{w.d}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* 03 LOCATIONS */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 03 — ЛОКАЦИИ"}</div>
          <h2 className="text-3xl md:text-5xl font-medium mb-8 max-w-3xl">Знаю город.</h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">{LOCATIONS_TEXT}</p>
        </AnimateIn>
      </section>

      {/* 04 ABOUT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 04 — ОБО МНЕ"}</div>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium mb-6">{ABOUT.h2}</h2>
            <p className="text-muted text-lg leading-relaxed">{ABOUT.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {ABOUT.chips.map((c) => (
                <span
                  key={c}
                  className="border border-line px-4 py-2 font-mono text-xs tracking-[0.2em] text-muted uppercase hover:border-accent hover:text-accent transition-colors"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* 05 TERMS */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line bg-panel/70">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 05 — УСЛОВИЯ"}</div>
          <h2 className="text-4xl md:text-6xl font-medium max-w-3xl">{TERMS.h2}</h2>
          <p className="mt-8 text-muted text-lg max-w-2xl leading-relaxed">{TERMS.text}</p>
          <div className="mt-10 font-mono text-xs text-accent/80 tracking-widest">{TERMS.note}</div>
        </AnimateIn>
      </section>
      {/* 06 PORTFOLIO */}
      <section id="portfolio" className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 06 — ПОРТФОЛИО"}</div>
          <h2 className="text-3xl md:text-5xl font-medium mb-16 max-w-2xl">Избранные кадры</h2>
        </AnimateIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {PORTFOLIO.map((p, i) => (
            <AnimateIn key={p.src} className="aspect-[3/4]" delay={i * 0.06} distance={32}>
              <div className="group relative h-full overflow-hidden bg-panel">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* MANIFEST */}
      <section className="border-b border-line">
        <AnimateIn blur>
          <div className="px-6 md:px-12 py-20 md:py-28 max-w-5xl">
            <div className="font-mono text-xs text-accent tracking-[0.3em] mb-8">{"// MANIFEST"}</div>
            <p className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-tight">
              {MANIFEST.line1}
              <br />
              <span className="text-accent">{MANIFEST.line2}</span>
            </p>
            <div className="mt-10 h-px w-24 bg-accent/50" />
          </div>
        </AnimateIn>
      </section>

      {/* 07 SOCIAL */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 07 — СОЦСЕТИ"}</div>
          <h2 className="text-3xl md:text-5xl font-medium mb-12">Где ещё смотреть</h2>
        </AnimateIn>
        <div className="grid md:grid-cols-2 gap-5">
          <AnimateIn delay={0.1} direction="left" distance={48}>
            <a href={SITE.tgChannel} target="_blank" className="block border border-line p-8 md:p-10 hover:border-accent transition-colors group">
              <div className="font-mono text-xs text-muted tracking-widest mb-4">TELEGRAM · CHANNEL</div>
              <div className="text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors">@fortunspot</div>
              <div className="mt-6 text-muted">Споттинг, бэкстейдж, новые кадры.</div>
            </a>
          </AnimateIn>
          <AnimateIn delay={0.2} direction="right" distance={48}>
            <a href={SITE.instagram} target="_blank" className="block border border-line p-8 md:p-10 hover:border-accent transition-colors group">
              <div className="font-mono text-xs text-muted tracking-widest mb-4">INSTAGRAM</div>
              <div className="text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors">@fortuna_carspot</div>
              <div className="mt-6 text-muted">Визуал и reels.</div>
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* 08 FAQ */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-line">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 08 — FAQ"}</div>
          <h2 className="text-3xl md:text-5xl font-medium mb-16 max-w-2xl">Частые вопросы</h2>
        </AnimateIn>
        <Faq />
      </section>

      {/* 09 CONTACT */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-panel/70">
        <AnimateIn blur>
          <div className="font-mono text-xs text-accent tracking-[0.3em] mb-10">{"// 09 — СВЯЗЬ"}</div>
          <h2 className="text-4xl md:text-7xl font-medium leading-[1.05] mb-6">Готов снимать<br/>твою машину.</h2>
          <p className="text-muted text-lg mb-12 max-w-xl">Напиши в Telegram — обсудим локацию и время. Отвечаю в течение дня.</p>
          <Link
            href={SITE.tgContact}
            target="_blank"
            className="group relative overflow-hidden border border-accent text-accent px-10 md:px-14 py-6 font-mono text-sm md:text-base tracking-[0.2em] uppercase inline-block w-full sm:w-auto text-center"
          >
            <span className="relative z-10 group-hover:text-bg transition-colors duration-500">Написать @fortun4ever</span>
            <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
        </AnimateIn>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-8 border-t border-line">
        <div className="flex flex-col md:flex-row justify-between gap-4 font-mono text-xs text-muted tracking-widest">
          <div>{FOOTER}</div>
          <div>© <Year /></div>
        </div>
      </footer>
      </div>
    </main>
  );
}

