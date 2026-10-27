import { useState } from 'react';
import { ArrowRight, ChevronRight, FileCheck, Layers, ShieldCheck, Terminal, Wrench } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function StepsSection() {
  const { t } = useLanguage();
  const s = t.steps;

  const [activeStep, setActiveStep] = useState<number>(0);
  const current = s.stages[activeStep] || s.stages[0];

  const icons = [Layers, Wrench, Terminal, FileCheck];

  return (
    <section id="steps" className="min-h-screen flex flex-col justify-center py-16 lg:py-24 border-b border-zinc-200 bg-white">
      <div className="container-open w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {s.eyebrow}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-zinc-500 uppercase">
                4-PHASE EXECUTION
              </span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
              {s.title}
            </h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        {/* Global Progress Bar (25% -> 50% -> 75% -> 100%) */}
        <div className="mt-8 sm:mt-10 mb-8 sm:mb-12">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
            <span>ПРОГРЕСС МОНТАЖА:</span>
            <span className="font-bold text-zinc-950">{current.progress}% ВЫПОЛНЕНО</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
            <div
              className="h-full bg-zinc-950 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${current.progress}%` }}
            />
          </div>
        </div>

        {/* Interactive Stepper Layout: 4 Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {s.stages.map((stage, idx) => {
            const Icon = icons[idx] || Wrench;
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <div
                key={stage.num}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'border-zinc-950 bg-zinc-50 ring-2 ring-zinc-950 shadow-md'
                    : 'border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl font-mono text-sm font-bold transition ${
                      isActive
                        ? 'bg-zinc-950 text-white'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      <Icon size={18} />
                    </div>

                    <span className="font-mono text-2xl font-bold tracking-tighter text-zinc-300">
                      {stage.num}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base sm:text-lg font-semibold text-zinc-950">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-200/80 flex items-center justify-between font-mono text-[11px]">
                  <span className={isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400'}>
                    ФАЗА 0{idx + 1}/04
                  </span>
                  {isActive && <ChevronRight size={14} className="text-zinc-950" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Stage Technical Deep-Dive Card */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-950 text-white p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
                  ТЕХНИЧЕСКИЙ РЕГЛАМЕНТ // ФАЗА {current.num}
                </span>
                <span className="font-mono text-xs text-zinc-400">ГОСТ / СНиП РК</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-white">
                {current.title}
              </h4>
              <p className="mt-2 text-sm text-zinc-300 max-w-2xl leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Next stage button */}
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev + 1) % s.stages.length)}
              className="cursor-pointer self-start lg:self-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-95"
            >
              <span>СЛЕДУЮЩАЯ ФАЗА</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                ИНСТРУМЕНТ И ОБОРУДОВАНИЕ
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Wrench size={16} className="text-emerald-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-zinc-200">
                  {current.tools}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                СТАНДАРТ КАЧЕСТВА И ПРОВЕРКА
              </span>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-zinc-200">
                  {current.standards}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
