import { ClipboardList, MonitorSmartphone, PhoneCall, Wrench } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [PhoneCall, ClipboardList, Wrench, MonitorSmartphone];

export default function StepsSection() {
  const { t } = useLanguage();
  const s = t.steps;

  return (
    <section id={SECTION_IDS.steps} className="section border-y border-slate-200 bg-slate-50">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="section-title">{s.title}</h2>
          <p className="section-subtitle">{s.subtitle}</p>
        </div>

        <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* connector line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-[3.25rem] right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 lg:block"
          />
          {s.items.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} className="card relative p-6 transition duration-200 hover:border-slate-300">
                <div className="flex items-center justify-between">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm shadow-slate-900/20">
                    <Icon size={21} />
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-slate-100 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
