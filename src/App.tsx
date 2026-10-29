import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HardwareSection from './components/HardwareSection';
import AdvantagesSection from './components/AdvantagesSection';
import StepsSection from './components/StepsSection';
import CallbackForm from './components/CallbackForm';
import WhatsAppFab from './components/WhatsAppFab';

export const DECK_SECTIONS = [
  { id: 'hero', num: '01', label: 'SYSTEM' },
  { id: 'hardware', num: '02', label: 'OPTICS' },
  { id: 'advantages', num: '03', label: 'MATRIX' },
  { id: 'steps', num: '04', label: 'DEPLOY' },
  { id: 'contacts', num: '05', label: 'DISPATCH' },
] as const;

export type DeckSectionId = (typeof DECK_SECTIONS)[number]['id'];

export function scrollToDeckSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function App() {
  const [activeId, setActiveId] = useState<DeckSectionId>('hero');

  useEffect(() => {
    const container = document.querySelector('.snap-deck-container');
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            setActiveId(entry.target.id as DeckSectionId);
          }
        }
      },
      {
        root: container,
        threshold: [0.45, 0.65],
      }
    );

    DECK_SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const isDarkSlide = activeId === 'contacts';

  return (
    <>
      <Header activeSection={activeId} onNavigate={scrollToDeckSection} />

      <main className="snap-deck-container">
        <Hero onNavigate={scrollToDeckSection} />
        <HardwareSection />
        <AdvantagesSection />
        <StepsSection onNavigate={scrollToDeckSection} />
        <CallbackForm />
      </main>

      {/* Fixed Right-Edge Slide Indicator HUD (01 / 02 / 03 / 04 / 05) */}
      <aside
        aria-label="Навигация по экранам"
        className="fixed right-2 sm:right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-1.5 select-none pointer-events-auto"
      >
        <div
          className={`flex flex-col items-center gap-1 rounded-full border px-1.5 py-2 backdrop-blur-md transition-colors duration-300 shadow-sm ${
            isDarkSlide
              ? 'border-zinc-800 bg-zinc-900/85 text-white'
              : 'border-zinc-200/90 bg-white/85 text-zinc-950'
          }`}
        >
          {DECK_SECTIONS.map((s) => {
            const active = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToDeckSection(s.id)}
                aria-label={`Экран ${s.num}: ${s.label}`}
                aria-current={active ? 'step' : undefined}
                title={`${s.num} // ${s.label}`}
                className={`group relative flex h-6 w-6 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all duration-200 ${
                  active
                    ? isDarkSlide
                      ? 'bg-emerald-500 text-zinc-950 shadow-xs scale-105'
                      : 'bg-zinc-950 text-white shadow-xs scale-105'
                    : isDarkSlide
                    ? 'text-zinc-500 hover:text-white hover:bg-zinc-800'
                    : 'text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                <span>{s.num}</span>
                {/* Hover HUD Tooltip */}
                <span
                  className={`pointer-events-none absolute right-full mr-2 hidden sm:inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[9px] tracking-widest uppercase opacity-0 transition-opacity duration-150 group-hover:opacity-100 whitespace-nowrap ${
                    isDarkSlide
                      ? 'bg-zinc-900 text-emerald-400 border border-zinc-800'
                      : 'bg-zinc-950 text-white'
                  }`}
                >
                  {s.num} // {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <WhatsAppFab hidden={activeId === 'contacts'} />
    </>
  );
}
