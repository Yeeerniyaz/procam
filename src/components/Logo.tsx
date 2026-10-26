import { Cctv } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';

export default function Logo({ tagline }: { tagline?: string }) {
  return (
    <a
      href={`#${SECTION_IDS.hero}`}
      className="group flex items-center gap-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label="ProElectric"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30 transition group-hover:bg-blue-700">
        <Cctv size={19} strokeWidth={2.2} />
        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-tight text-slate-900">
          Pro<span className="text-blue-600">Electric</span>
        </span>
        {tagline && (
          <span className="mt-1 hidden text-[11px] font-medium whitespace-nowrap text-slate-500 sm:block lg:hidden xl:block">{tagline}</span>
        )}
      </span>
    </a>
  );
}
