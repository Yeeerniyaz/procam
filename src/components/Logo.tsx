import { Cctv } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';

export default function Logo({ tagline }: { tagline?: string }) {
  return (
    <a
      href={`#${SECTION_IDS.hero}`}
      className="group inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
      aria-label="ProCam CCTV Almaty"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white transition-transform duration-200 group-hover:scale-105">
        <Cctv size={18} strokeWidth={2} />
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />
        </span>
      </span>

      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className="text-[17px] font-bold tracking-tighter text-zinc-950">
          PRO<span className="font-medium text-zinc-400">CAM</span>
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
          {tagline || 'CCTV · ALMATY'}
        </span>
      </span>
    </a>
  );
}
