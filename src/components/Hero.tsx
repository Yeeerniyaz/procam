import { useEffect, useState } from 'react';
import { ArrowRight, BellRing, Moon, PhoneCall, ShieldCheck } from 'lucide-react';
import { SECTION_IDS, WHATSAPP_URL } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

const pad = (n: number) => String(n).padStart(2, '0');
const formatDate = (d: Date) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
const formatTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/** Stylised camera "scenes" — pure CSS, no images. */
const scenes = [
  'from-slate-600 via-slate-700 to-slate-800',
  'from-slate-500 via-slate-600 to-slate-800',
  'from-slate-700 via-slate-800 to-slate-900',
  'from-slate-600 via-slate-700 to-slate-900',
];

function SurveillanceMock() {
  const { t } = useLanguage();
  const now = useClock();
  const date = formatDate(now);
  const time = formatTime(now);
  const m = t.hero.mock;

  return (
    <div className="relative mx-auto w-full max-w-xl animate-float-in [animation-delay:150ms]">
      {/* glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-blue-100 via-white to-sky-100 blur-2xl" />

      {/* NVR monitor */}
      <div className="card overflow-hidden p-2 shadow-xl shadow-slate-900/5">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </span>
            <span className="ml-2 text-xs font-semibold text-slate-500">{m.device}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {m.live}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {m.cams.map((cam, i) => (
            <div
              key={cam}
              className={`relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br ${scenes[i]}`}
            >
              {/* soft light source */}
              <div
                className={`absolute h-24 w-24 rounded-full bg-white/10 blur-2xl ${
                  i % 2 === 0 ? '-top-6 -right-4' : '-bottom-8 -left-6'
                }`}
              />
              {/* horizon / ground */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              {/* scanline */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-full animate-scan bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

              {/* detection box on camera 2 */}
              {i === 1 && (
                <div className="absolute top-[34%] left-[24%] h-[42%] w-[16%] rounded-sm border-2 border-blue-400 shadow-[0_0_0_1px_rgba(37,99,235,0.3)]">
                  <span className="absolute -top-[18px] left-[-2px] rounded-sm bg-blue-500 px-1 py-px text-[9px] font-semibold whitespace-nowrap text-white">
                    {m.detect} 98%
                  </span>
                  <div className="absolute inset-x-[30%] top-[8%] h-[22%] rounded-full bg-white/25" />
                  <div className="absolute inset-x-[18%] top-[34%] bottom-[6%] rounded-t-lg bg-white/15" />
                </div>
              )}

              <div className="absolute top-1.5 left-2 flex items-center gap-1 text-[9px] font-semibold tracking-wide text-white/90 sm:text-[10px]">
                <span className="h-1.5 w-1.5 animate-rec rounded-full bg-red-500" />
                {m.rec}
              </div>
              <div className="absolute top-1.5 right-2 rounded bg-black/30 px-1 text-[9px] font-semibold text-white/90 sm:text-[10px]">
                {i === 0 ? '4K' : i === 2 ? '2K' : 'ColorVu'}
              </div>
              <div className="absolute right-2 bottom-1.5 left-2 flex items-end justify-between gap-2 text-[9px] font-medium text-white/80 sm:text-[10px]">
                <span className="truncate">
                  CAM {pad(i + 1)} · {cam}
                </span>
                <span className="hidden shrink-0 font-mono whitespace-nowrap tabular-nums sm:inline">
                  <span className="hidden xl:inline">{date} </span>
                  {time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* push notification */}
      <div className="card absolute -bottom-10 -left-2 flex w-[18.5rem] max-w-[calc(100%-1rem)] items-start gap-3 p-3 shadow-lg shadow-slate-900/10 animate-float-in [animation-delay:500ms] sm:-left-8">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <BellRing size={17} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">{m.alertTitle}</p>
            <span className="shrink-0 text-[10px] text-slate-400">{m.alertTime}</span>
          </div>
          <p className="truncate text-xs text-slate-500">{m.alertPlace}</p>
        </div>
      </div>

      {/* night vision chip */}
      <div className="card absolute -top-4 -right-2 hidden items-center gap-2 px-3 py-2 shadow-lg shadow-slate-900/10 animate-float-in [animation-delay:700ms] sm:flex">
        <Moon size={15} className="text-blue-600" />
        <span className="text-xs font-semibold text-slate-700">ColorVu · 24/7</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section id={SECTION_IDS.hero} className="relative -mt-16 overflow-hidden pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]">
      {/* background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)] bg-[size:48px_48px] opacity-60"
      />

      <div className="container-page grid items-center gap-16 pt-10 pb-24 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:pt-20 lg:pb-32">
        <div className="animate-float-in">
          <span className="eyebrow">
            <ShieldCheck size={14} />
            {h.badge}
          </span>

          <h1 className="mt-6 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl sm:leading-[1.08] lg:text-[3.5rem]">
            {h.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600">{h.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`#${SECTION_IDS.callback}`} className="btn-primary group px-5 py-3.5 sm:whitespace-nowrap">
              <PhoneCall size={18} />
              {h.primaryCta}
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary px-5 py-3.5 sm:whitespace-nowrap">
              <WhatsAppIcon size={19} className="text-[#25D366]" />
              {h.secondaryCta}
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200 pt-8 sm:grid-cols-4">
            {h.highlights.map((item) => (
              <div key={item.value}>
                <dt className="text-xl font-bold tracking-tight text-slate-900">{item.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-slate-500">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <SurveillanceMock />
      </div>
    </section>
  );
}
