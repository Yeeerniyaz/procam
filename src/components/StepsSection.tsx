import { ClipboardList, MonitorSmartphone, PhoneCall, Wrench, ArrowRight } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [PhoneCall, ClipboardList, Wrench, MonitorSmartphone];
const stepTags = [
  '[STAGE_01 // SITE_AUDIT]',
  '[STAGE_02 // POE_STRUCTURED_WIRING]',
  '[STAGE_03 // NVR_SECURITY_INIT]',
  '[STAGE_04 // SLA_HANDOVER]',
];

export default function StepsSection() {
  const { t } = useLanguage();
  const s = t.steps;

  return (
    <section id={SECTION_IDS.steps} className="section-open bg-white relative">
      <div className="container-open">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-14 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                // 03 · WORKFLOW PIPELINE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-zinc-500 uppercase">
                4-PHASE EXECUTION
              </span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl font-medium tracking-tighter leading-tight text-zinc-950">
              {s.title}
            </h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        {/* Minimalist Timeline Pipeline Grid */}
        <div className="relative mt-12">
          {/* Engineering Pipeline Line (Visible on desktop across items) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-9 left-10 right-10 h-px bg-zinc-200 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {s.items.map((step, idx) => {
              const Icon = icons[idx];
              const tag = stepTags[idx];

              return (
                <div
                  key={step.title}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-7 transition-all duration-300 hover:border-zinc-950 hover:bg-white hover:shadow-lg hover:shadow-zinc-950/5 group"
                >
                  <div>
                    {/* Node Header */}
                    <div className="flex items-center justify-between">
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-950 text-white font-mono text-base font-semibold group-hover:scale-105 transition-transform duration-200">
                        <Icon size={20} />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-200 text-zinc-950 text-[10px] font-bold">
                          {idx + 1}
                        </span>
                      </span>

                      <span className="font-mono text-3xl font-medium tracking-tighter text-zinc-300 group-hover:text-zinc-950 transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Metadata Tag */}
                    <div className="mt-6 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      {tag}
                    </div>

                    {/* Step Title & Details */}
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 font-normal">
                      {step.text}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>STEP 0{idx + 1}/04</span>
                    {idx < s.items.length - 1 ? (
                      <ArrowRight size={13} className="text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                    ) : (
                      <span className="text-emerald-600 font-semibold">COMPLETE</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
