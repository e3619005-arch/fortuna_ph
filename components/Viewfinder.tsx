/**
 * HUD-рамка видоискателя: четыре угловые скобки в цвете акцента,
 * как рамка кадра в видоискателе камеры. Родитель должен быть relative.
 */
export default function Viewfinder({
  inset = "inset-0",
  className = "",
}: {
  /** Позиционирование рамки, например "inset-3 md:inset-6". */
  inset?: string;
  className?: string;
}) {
  const corner = "absolute w-6 h-6 md:w-10 md:h-10 border-accent/70";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${inset} ${className}`}
    >
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
