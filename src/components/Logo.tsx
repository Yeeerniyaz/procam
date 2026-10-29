import { Cctv } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';

export default function Logo({ tagline, dark = false }: { tagline?: string; dark?: boolean }) {
  return (
    <a
      href={`#${SECTION_IDS.hero}`}
      className="group flex items-center gap-2.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
      aria-label="ProCam CCTV Almaty"
    >
      <span
        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 ${
          dark ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white'
        }`}
      >
        <Cctv size={16} strokeWidth={2} />
        {/* Tactical Live status indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full border border-white bg-emerald-500" />
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`text-sm sm:text-base font-bold tracking-tighter ${
            dark ? 'text-white' : 'text-zinc-950'
          }`}
        >
          PRO<span className="font-medium text-zinc-400">CAM</span>
        </span>
        <span className="mt-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-400 truncate max-w-[140px] sm:max-w-none">
          {tagline || 'CCTV · ALMATY'}
        </span>
      </span>
    </a>
  );
}
