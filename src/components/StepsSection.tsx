import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  Layers,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface StepsSectionProps {
  onNavigate?: (id: string) => void;
}

export default function StepsSection({ onNavigate }: StepsSectionProps) {
  const { t } = useLanguage();
  const s = t.steps;

  const [activeStep, setActiveStep] = useState<number>(0);
  const current = s.stages[activeStep] || s.stages[0];

  const icons = [Layers, Wrench, Terminal, FileCheck];

  const blueprintSpecs = [
    [
      { code: 'OPTICS', val: '2.8 / 4.0 / 6.0 мм', note: 'Расчёт углов без слепых зон' },
      { code: 'LASER', val: 'Bosch GLM 50C', note: 'Точный замер трасс до 100м' },
      { code: 'ESTIMATE', val: 'Смета за 15 мин', note: 'Фиксированная цена в договоре' },
    ],
    [
      { code: 'CABLE', val: 'UTP Cat6 100% Cu', note: 'Чистая медь (без биметалла)' },
      { code: 'PINOUT', val: 'TIA/EIA T568B', note: 'Тест линии Fluke 1000 Mbps' },
      { code: 'SHIELD', val: 'Гермобоксы IP66', note: 'Защита контактов от влаги и мороза' },
    ],
    [
      { code: 'EXPOSURE', val: 'True WDR 120dB', note: 'Защита от встречной засветки' },
      { code: 'AI ENGINE', val: 'AcuSense 2.0', note: 'Фильтр ложных тревог (листва/дождь)' },
      { code: 'ARCHIVE', val: 'WD Purple H.265+', note: 'Запись 24/7 + детекция движения' },
    ],
    [
      { code: 'MOBILE', val: 'Hik-Connect P2P', note: 'iOS и Android для всей семьи' },
      { code: 'SECURITY', val: 'AES-128 TLS', note: 'Передача мастер-ключей владельцу' },
      { code: 'WARRANTY', val: 'Официальный Акт', note: 'Гарантия на монтаж и оборудование' },
    ],
  ][activeStep] || [];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('contacts');
    } else {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="steps"
      className="snap-screen-section bg-white border-b border-zinc-200"
    >
      <div className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 overflow-hidden">
        {/* ============================================================ */}
        {/* LEFT COLUMN (4 cols on lg, horizontal step bar on mobile)    */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 xl:p-10 bg-zinc-50/70 shrink-0 lg:min-h-0 overflow-hidden">
          {/* Header */}
          <div className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400">
                  {s.eyebrow}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase">
                ФАЗА 0{activeStep + 1} / 04
              </span>
            </div>

            <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-950">
              {s.title}
            </h2>
            <p className="hidden lg:block mt-2 text-xs xl:text-sm text-zinc-600 leading-relaxed">
              {s.subtitle}
            </p>
          </div>

          {/* 4 Interactive Stage Buttons (4-col horizontal bar on mobile, vertical list on lg) */}
          <div className="mt-2.5 lg:my-auto grid grid-cols-4 lg:grid-cols-1 gap-1.5 sm:gap-2.5">
            {s.stages.map((stage, idx) => {
              const Icon = icons[idx] || Wrench;
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;

              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-xl border p-2 sm:p-3.5 text-left transition-all duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-1.5 lg:gap-3 ${
                    isActive
                      ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-emerald-500 text-zinc-950'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase block ${
                          isActive ? 'text-emerald-400' : 'text-zinc-400'
                        }`}
                      >
                        {stage.num} // STAGE
                      </span>
                      <span className="text-[11px] sm:text-sm font-semibold truncate block">
                        {stage.title}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={15}
                    className={`hidden lg:block shrink-0 transition-transform ${
                      isActive ? 'text-emerald-400 translate-x-0.5' : 'text-zinc-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop Footer Note */}
          <div className="hidden lg:flex items-center justify-between pt-4 border-t border-zinc-200 font-mono text-[11px] text-zinc-500 shrink-0">
            <span>СНиП РК // TIA-568B</span>
            <span className="text-emerald-600 font-bold">● ГАРАНТИЯ ПО ДОГОВОРУ</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN (8 cols on lg, main viewport on mobile)         */}
        {/* Full-height Interactive Engineering Blueprint Terminal       */}
        {/* ============================================================ */}
        <div className="lg:col-span-8 flex-1 min-h-0 bg-zinc-950 text-white p-4 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle architectural blueprint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"
          />

          {/* Top Bar: Animated Progress Bar (25% -> 100%) */}
          <div className="relative z-10 shrink-0">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono mb-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider">
                ТЕХНИЧЕСКИЙ РЕГЛАМЕНТ // ФАЗА {current.num}
              </span>
              <span className="text-white font-bold">
                ГОТОВНОСТЬ СИСТЕМЫ: {current.progress}%
              </span>
            </div>

            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${current.progress}%` }}
              />
            </div>
          </div>

          {/* Middle: Active Step Engineering Blueprint & Specs */}
          <div className="relative z-10 my-auto py-2 min-h-0 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-400 mb-1">
              <span>[STEP_{current.num}_SPECIFICATION]</span>
              <span>·</span>
              <span className="text-emerald-400">IP66 / T568B / WDR 120dB</span>
            </div>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              {current.num}. {current.title}
            </h3>

            <p className="mt-1.5 sm:mt-3 text-xs sm:text-base text-zinc-300 max-w-3xl leading-relaxed line-clamp-3">
              {current.desc}
            </p>

            {/* 3 Engineering Telemetry Cards for Active Step */}
            <div className="mt-3 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4">
              {blueprintSpecs.map((item) => (
                <div
                  key={item.code}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 sm:p-4"
                >
                  <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-wider block">
                    [{item.code}]
                  </span>
                  <span className="mt-0.5 sm:mt-1 font-mono text-xs sm:text-base font-bold text-white block truncate">
                    {item.val}
                  </span>
                  <span className="mt-0.5 text-[10px] sm:text-xs text-zinc-400 line-clamp-1 sm:line-clamp-2">
                    {item.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Tool Specs & Quality Standard Strip */}
            <div className="mt-2.5 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-2.5 sm:p-3.5 flex items-center gap-2.5">
                <Wrench size={15} className="text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase block">
                    ИНСТРУМЕНТАРИЙ ИНЖЕНЕРА
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-zinc-200 truncate block">
                    {current.tools}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-2.5 sm:p-3.5 flex items-center gap-2.5">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase block">
                    СТАНДАРТ ПРИЁМКИ
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-zinc-200 truncate block">
                    {current.standards}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Step Switcher + Direct CTA Button */}
          <div className="relative z-10 shrink-0 pt-2.5 sm:pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveStep((prev) => (prev - 1 + s.stages.length) % s.stages.length)
                }
                className="cursor-pointer rounded-full border border-zinc-700 bg-zinc-900 px-3.5 py-2 font-mono text-[10px] sm:text-xs font-semibold text-zinc-300 transition hover:border-white hover:text-white"
              >
                ← ПРЕД.
              </button>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % s.stages.length)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-[10px] sm:text-xs font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-400"
              >
                <span>СЛЕД. ФАЗА</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <a
              href="#contacts"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 sm:px-6 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs font-bold text-zinc-950 transition hover:bg-zinc-200 active:scale-95 shadow-xs"
            >
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>РАССЧИТАТЬ МОНТАЖ</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
