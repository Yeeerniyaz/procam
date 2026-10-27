import { Cable, HardDrive, Network, Smartphone, ArrowUpRight } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [Cable, Smartphone, HardDrive, Network];
const hudTags = [
  '[IEEE_802.3AF // ZERO_HANGING_CORDS]',
  '[ENCRYPTED_P2P // LATENCY <50MS]',
  '[SURVEILLANCE_GRADE // 24/7_CYCLIC]',
  '[LOCAL_DISPATCH // FULL_WARRANTY]',
];

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;

  return (
    <section id={SECTION_IDS.advantages} className="section-open bg-[#FAFAFA] relative">
      <div className="container-open">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-14 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                // 02 · ENGINEERING ADVANTAGES
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-zinc-500 uppercase">
                ALMATY SPEC
              </span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl font-medium tracking-tighter leading-tight text-zinc-950">
              {a.title}
            </h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            {a.subtitle}
          </p>
        </div>

        {/* Wide Horizontal Architectural Strips / Open Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-zinc-200 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {a.items.map((item, idx) => {
            const Icon = icons[idx];
            const hud = hudTags[idx];
            const isBottomRow = idx >= 2;

            return (
              <div
                key={item.title}
                className={`group relative p-8 sm:p-12 lg:p-14 transition-colors duration-500 hover:bg-zinc-950 hover:text-white ${
                  isBottomRow ? 'md:border-t md:border-zinc-200' : ''
                }`}
              >
                {/* Top Row: Index number + Monospace HUD metadata */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-5xl sm:text-6xl font-medium tracking-tighter text-zinc-300 transition-colors duration-500 group-hover:text-white">
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 transition-colors duration-500 group-hover:text-zinc-400">
                      {hud}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition-colors duration-500 group-hover:border-zinc-800 group-hover:bg-zinc-900 group-hover:text-white">
                      <Icon size={18} />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-10 sm:mt-12">
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 transition-colors duration-500 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-zinc-600 transition-colors duration-500 group-hover:text-zinc-300">
                    {item.text}
                  </p>
                </div>

                {/* Subtle corner indicator */}
                <div className="mt-8 flex items-center gap-2 font-mono text-[11px] text-zinc-400 transition-colors duration-500 group-hover:text-zinc-500">
                  <span>STANDARD VERIFIED</span>
                  <ArrowUpRight size={14} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
