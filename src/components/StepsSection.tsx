import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  FileCheck,
  Layers,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function StepsSection() {
  const { t } = useLanguage();
  const s = t.steps;

  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const current = s.stages[activeStep] || s.stages[0];

  const icons = [Layers, Wrench, Terminal, FileCheck];

  return (
    <section
      id="steps"
      className="min-h-screen flex flex-col justify-center py-16 lg:py-24 border-b border-zinc-200 bg-white"
    >
      <div className="container-open w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {s.eyebrow}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs uppercase text-zinc-500">
                IP66/IP67 · T568B · WDR 120dB
              </span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
              {s.title}
            </h2>
          </div>

          <p className="max-w-xl text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        {/* Animated Progress Bar (25% -> 50% -> 75% -> 100% READY) */}
        <div className="mt-8 sm:mt-10">
          <div className="flex items-center justify-between font-mono text-xs mb-2">
            <span className="text-zinc-500 uppercase">
              STAGE {current.num} / 04 — {current.title}
            </span>
            <span className="font-bold text-emerald-600">
              {current.progress}% READY
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${current.progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-full bg-zinc-950 rounded-full"
            />
          </div>
        </div>

        {/* Left/Top: 4 Clickable Engineering Stages */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.stages.map((stage, idx) => {
            const Icon = icons[idx] || Wrench;
            const active = idx === activeStep;
            const completed = idx < activeStep;
            return (
              <button
                key={stage.num}
                type="button"
                onClick={() => setActiveStep(idx as 0 | 1 | 2 | 3)}
                className={`cursor-pointer text-left rounded-2xl border p-5 sm:p-6 transition flex flex-col justify-between ${
                  active
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-lg'
                    : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                        active
                          ? 'bg-emerald-500 text-zinc-950'
                          : completed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span
                      className={`font-mono text-2xl font-bold tracking-tighter ${
                        active ? 'text-emerald-400' : 'text-zinc-300'
                      }`}
                    >
                      {stage.num}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 text-base sm:text-lg font-semibold ${
                      active ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {stage.num}. {stage.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-xs leading-relaxed line-clamp-3 ${
                      active ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {stage.desc}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t flex items-center justify-between font-mono text-[10px] ${
                    active ? 'border-zinc-800 text-emerald-400' : 'border-zinc-100 text-zinc-400'
                  }`}
                >
                  <span>STAGE {stage.num}</span>
                  <span>{stage.progress}% READY</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right/Bottom: Detailed Stage Technical Card */}
        <motion.div
          key={current.num}
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-6 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-zinc-950 px-3 py-1 font-mono text-[10px] font-semibold text-white uppercase">
                  STAGE {current.num} / 04
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-800 uppercase">
                  {current.progress}% READY
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
                {current.num}. {current.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                {current.desc}
              </p>

              {/* Deliverables Checklist */}
              <ul className="mt-5 space-y-2.5">
                {current.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-zinc-950">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Engineering Standards Spec Boxes */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  <Wrench size={14} className="text-emerald-500 shrink-0" />
                  <span>TOOLS &amp; HARDWARE</span>
                </div>
                <p className="font-mono text-xs sm:text-sm font-semibold text-zinc-900">
                  {current.tools}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>QUALITY STANDARD</span>
                </div>
                <p className="font-mono text-xs sm:text-sm font-semibold text-zinc-900">
                  {current.standards}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveStep(((activeStep + 1) % 4) as 0 | 1 | 2 | 3)}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white hover:border-zinc-950 px-5 py-2.5 font-mono text-xs font-semibold text-zinc-900 transition whitespace-nowrap"
                >
                  <span>0{((activeStep + 1) % 4) + 1} STAGE</span>
                  <ArrowRight size={14} />
                </button>

                <a
                  href="#contacts"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-5 py-2.5 font-mono text-xs font-semibold transition whitespace-nowrap"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
