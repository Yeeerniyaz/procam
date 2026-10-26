import { Fragment, type ReactNode } from 'react';
import { Camera, Check, ChevronRight, Info, Network, Server, Smartphone } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';

interface BrandCardProps {
  name: string;
  tag: string;
  badge: string;
  description: string;
  features: string[];
  accent?: boolean;
  className?: string;
  children?: ReactNode;
}

function BrandCard({ name, tag, badge, description, features, accent, className = '', children }: BrandCardProps) {
  return (
    <article
      className={`card group relative flex flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-8 ${className}`}
    >
      {accent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-slate-200/40 blur-3xl"
        />
      )}
      <div className="relative flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{tag}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            accent ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/20' : 'bg-slate-100 text-slate-700'
          }`}
        >
          {badge}
        </span>
      </div>

      <h3 className="relative mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">{name}</h3>
      <p className="relative mt-3 leading-relaxed text-slate-600">{description}</p>

      <ul className="relative mt-6 grid gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-slate-700 sm:text-[15px]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <Check size={13} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {children}
    </article>
  );
}

const flowIcons = [Camera, Network, Server, Smartphone];

export default function HardwareSection() {
  const { t } = useLanguage();
  const hw = t.hardware;

  return (
    <section id={SECTION_IDS.equipment} className="section border-y border-slate-200 bg-slate-50">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{hw.eyebrow}</span>
          <h2 className="section-title">{hw.title}</h2>
          <p className="section-subtitle">{hw.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <BrandCard {...hw.hikvision} accent className="lg:row-span-2">
            {/* Ecosystem flow */}
            <div className="relative mt-auto pt-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-1">
                  {hw.flow.map((label, i) => {
                    const Icon = flowIcons[i];
                    return (
                      <Fragment key={label}>
                        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-sm">
                            <Icon size={18} />
                          </span>
                          <span className="text-[10px] leading-tight font-semibold text-slate-600 sm:text-[11px]">
                            {label}
                          </span>
                        </div>
                        {i < hw.flow.length - 1 && (
                          <ChevronRight size={14} className="mb-6 shrink-0 text-slate-300" />
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </BrandCard>

          <BrandCard {...hw.hiwatch} className="lg:col-span-2" />

          <BrandCard {...hw.dahua} className="lg:col-span-2">
            <p className="relative mt-6 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <Info size={16} className="mt-0.5 shrink-0 text-slate-500" />
              {hw.dahua.note}
            </p>
          </BrandCard>
        </div>
      </div>
    </section>
  );
}
