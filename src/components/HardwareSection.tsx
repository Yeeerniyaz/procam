import { Camera, Check, Info, Network, Server, Shield, Smartphone } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';

const flowIcons = [Camera, Network, Server, Smartphone];

export default function HardwareSection() {
  const { t } = useLanguage();
  const hw = t.hardware;

  return (
    <section id={SECTION_IDS.equipment} className="section-open bg-white relative">
      <div className="container-open">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 lg:pb-14 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                // 01 · SYSTEM HARDWARE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-zinc-500 uppercase">
                CERTIFIED VENDORS
              </span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
              {hw.title}
            </h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            {hw.subtitle}
          </p>
        </div>

        {/* Open Editorial Architectural Bento Grid (12 Columns) */}
        <div className="grid grid-cols-1 divide-y divide-zinc-200 border-b border-zinc-200 lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          {/* ZONE 01: HIKVISION (5 cols) — Core Ecosystem Backbone */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-white hover:bg-zinc-50/50 transition-colors duration-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl sm:text-5xl font-medium tracking-tighter text-zinc-950">
                  01
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    [NVR + IP CAMERAS]
                  </span>
                  <span className="rounded-full bg-zinc-950 px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-white uppercase tracking-wider">
                    {hw.hikvision.badge}
                  </span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  CORE BACKBONE
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-950">
                  {hw.hikvision.name}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {hw.hikvision.description}
                </p>
              </div>

              {/* Specs List */}
              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                {hw.hikvision.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecosystem Pipeline Flow */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-100">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-4">
                [ECOSYSTEM // SIGNAL & POWER PIPELINE]
              </span>
              <div className="grid grid-cols-4 gap-2">
                {hw.flow.map((label, idx) => {
                  const Icon = flowIcons[idx];
                  return (
                    <div key={label} className="relative flex flex-col items-center text-center">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800">
                        <Icon size={16} />
                      </div>
                      <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] font-medium leading-tight text-zinc-600">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ZONE 02: HIWATCH (4 cols) — Optimal Balance */}
          <div className="lg:col-span-4 p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-white hover:bg-zinc-50/50 transition-colors duration-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl sm:text-5xl font-medium tracking-tighter text-zinc-950">
                  02
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    [OFFICIAL SUB-BRAND]
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-zinc-800 uppercase tracking-wider">
                    {hw.hiwatch.badge}
                  </span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                  BALANCED DEPLOYMENT
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-950">
                  {hw.hiwatch.name}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {hw.hiwatch.description}
                </p>
              </div>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
                {hw.hiwatch.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <Shield size={14} className="text-zinc-400" />
                <span className="text-[11px] sm:text-xs">100% COMPATIBLE WITH HIK-CONNECT</span>
              </div>
            </div>
          </div>

          {/* ZONE 03: DAHUA (3 cols) — Optical Endpoints */}
          <div className="lg:col-span-3 p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-zinc-50/40 hover:bg-zinc-100/40 transition-colors duration-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl sm:text-5xl font-medium tracking-tighter text-zinc-950">
                  03
                </span>
                <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-zinc-700 uppercase tracking-wider">
                  {hw.dahua.badge}
                </span>
              </div>

              <div className="mt-6 sm:mt-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                  [IP CAMERAS ONLY]
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
                  {hw.dahua.name}
                </h3>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {hw.dahua.description}
                </p>
              </div>

              <ul className="mt-6 sm:mt-8 space-y-3">
                {hw.dahua.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-800">
                      <Check size={9} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Crucial Technical Architecture Note */}
            <div className="mt-8 sm:mt-10 rounded-xl border border-zinc-300/80 bg-white p-3.5 sm:p-4">
              <div className="flex items-start gap-2.5">
                <Info size={15} className="mt-0.5 shrink-0 text-zinc-700" />
                <p className="text-[11px] sm:text-xs leading-relaxed text-zinc-700 font-medium">
                  {hw.dahua.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
