import { useEffect, useState } from 'react';
import { ArrowRight, Cpu, Eye } from 'lucide-react';
import { SECTION_IDS, WHATSAPP_URL } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

const pad = (n: number) => String(n).padStart(2, '0');

function useCctvTime() {
  const [time, setTime] = useState({
    timeStr: '12:00:00',
    dateStr: '27.10.2026',
    frame: '00',
  });

  useEffect(() => {
    let frameCount = 12;
    const interval = window.setInterval(() => {
      const now = new Date();
      frameCount = (frameCount + 1) % 30;
      setTime({
        timeStr: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
        dateStr: `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`,
        frame: pad(frameCount),
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  return time;
}

/** Interactive Architectural Camera HUD Viewfinder (Pure SVG/CSS) */
function CameraHudViewfinder() {
  const { t } = useLanguage();
  const m = t.hero.mock;
  const { timeStr, dateStr, frame } = useCctvTime();
  const [activeCam, setActiveCam] = useState(0);

  const camMeta = [
    { code: 'CH_01', name: m.cams[0] || 'Двор', res: '4K UHD', codec: 'H.265+', bitrate: '4096 kbps', poe: '48V / 8.2W' },
    { code: 'CH_02', name: m.cams[1] || 'Вход', res: '4K ColorVu', codec: 'H.265+', bitrate: '4096 kbps', poe: '48V / 9.1W' },
    { code: 'CH_03', name: m.cams[2] || 'Парковка', res: '2K QHD', codec: 'H.265+', bitrate: '3072 kbps', poe: '48V / 7.4W' },
    { code: 'CH_04', name: m.cams[3] || 'Склад', res: '2K QHD', codec: 'H.265+', bitrate: '3072 kbps', poe: '48V / 6.8W' },
  ];

  const current = camMeta[activeCam] || camMeta[0];

  return (
    <div className="relative mx-auto w-full select-none">
      {/* Main HUD Chassis */}
      <div className="relative rounded-2xl border border-zinc-300/80 bg-white shadow-xl shadow-zinc-950/5 overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-3 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-zinc-300" />
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-zinc-300" />
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-zinc-300" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-900 truncate">
              HIKVISION // NVR_4CH
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {m.live.toUpperCase()}
            </span>
            <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
              48.2389° N
            </span>
          </div>
        </div>

        {/* Viewfinder Main Screen */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 sm:aspect-[16/10]">
          {/* Subtle Grid / Scanline layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-scan-laser bg-gradient-to-b from-transparent via-emerald-500/[0.04] to-transparent opacity-80"
          />

          {/* Viewfinder Corner Brackets ┌ ┐ └ ┘ */}
          <div className="pointer-events-none absolute inset-3 sm:inset-6 z-10">
            {/* Top-left bracket */}
            <div className="absolute top-0 left-0 h-4 w-4 sm:h-6 sm:w-6 border-t-2 border-l-2 border-white/60" />
            {/* Top-right bracket */}
            <div className="absolute top-0 right-0 h-4 w-4 sm:h-6 sm:w-6 border-t-2 border-r-2 border-white/60" />
            {/* Bottom-left bracket */}
            <div className="absolute bottom-0 left-0 h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-l-2 border-white/60" />
            {/* Bottom-right bracket */}
            <div className="absolute bottom-0 right-0 h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-r-2 border-white/60" />

            {/* Central Optical Reticle Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white" />
                <div className="absolute inset-2 rounded-full border border-white" />
              </div>
            </div>
          </div>

          {/* Top HUD Overlay Stats */}
          <div className="absolute top-3 left-3 right-3 sm:top-6 sm:left-6 sm:right-6 z-10 flex items-start justify-between text-white">
            {/* REC badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-md bg-zinc-900/80 px-2 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500 animate-rec shrink-0" />
              <span className="font-mono text-[9px] sm:text-xs font-semibold tracking-wider text-red-400">
                REC
              </span>
              <span className="font-mono text-[9px] sm:text-xs font-medium tracking-tight text-white/90">
                {timeStr}:{frame}
              </span>
            </div>

            {/* Codec & Bitrate */}
            <div className="flex flex-col items-end gap-1 font-mono text-[9px] sm:text-[11px] text-zinc-300">
              <span className="rounded bg-zinc-900/80 px-1.5 py-0.5 backdrop-blur-md text-emerald-400">
                {current.res} · {current.codec}
              </span>
              <span className="text-zinc-400 hidden sm:block">
                {current.bitrate} · PoE 48V
              </span>
            </div>
          </div>

          {/* AI Human / Vehicle Bounding Box (Active Target) */}
          <div className="absolute top-[32%] left-[28%] z-10 w-[38%] h-[48%] animate-reticle">
            <div className="relative h-full w-full rounded-sm border border-emerald-400/90 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              {/* Corner tick marks */}
              <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-emerald-400" />

              {/* Tag header */}
              <div className="absolute -top-5 sm:-top-6 left-0 flex items-center gap-1 sm:gap-1.5 bg-emerald-500 px-1.5 py-0.5 text-zinc-950 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xs">
                <Cpu size={10} />
                <span>AI {m.detect || 'HUMAN'}: 99.4%</span>
              </div>

              {/* Vector targeting lines */}
              <div className="absolute inset-x-0 top-1/3 h-px bg-emerald-400/20" />
              <div className="absolute bottom-1 right-1 font-mono text-[8px] text-emerald-400/70 hidden sm:block">
                [X: 342 Y: 198]
              </div>
            </div>
          </div>

          {/* Bottom HUD Metadata Bar */}
          <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 z-10 flex items-center justify-between font-mono text-[9px] sm:text-[11px] text-white/80">
            <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
              <span className="font-bold text-white shrink-0">[{current.code}]</span>
              <span className="text-zinc-300 font-sans font-medium truncate">{current.name}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="hidden sm:inline text-zinc-400">{dateStr}</span>
              <span className="text-emerald-400">● 30 FPS</span>
            </div>
          </div>
        </div>

        {/* 4-Channel Architectural Selector Row (Clean 2x2 grid on mobile, 4 columns on sm+) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-zinc-200 bg-zinc-50/70 text-xs">
          {camMeta.map((cam, idx) => {
            const active = idx === activeCam;
            return (
              <button
                key={cam.code}
                type="button"
                onClick={() => setActiveCam(idx)}
                className={`flex flex-col p-2 sm:p-2.5 text-left transition-all duration-150 cursor-pointer ${
                  idx % 2 === 1 ? 'border-l border-zinc-200' : ''
                } ${
                  idx >= 2 ? 'border-t sm:border-t-0 border-zinc-200' : ''
                } ${
                  idx > 0 ? 'sm:border-l sm:border-zinc-200' : ''
                } ${
                  active
                    ? 'bg-white shadow-xs font-semibold text-zinc-950'
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400">0{idx + 1}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                </div>
                <span className="mt-0.5 sm:mt-1 truncate font-medium text-zinc-900 text-[11px] sm:text-xs">
                  {cam.name}
                </span>
                <span className="hidden font-mono text-[9px] text-zinc-400 sm:block">
                  {cam.res}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Notification Monolith Toast (Relative cleanly below card on mobile, full width) */}
      <div className="relative mt-3 sm:mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:p-3.5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-emerald-400">
            <Eye size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <p className="truncate text-xs font-semibold text-white">
                {m.alertTitle}
              </p>
              <span className="font-mono text-[10px] text-zinc-400 shrink-0">
                {m.alertTime}
              </span>
            </div>
            <p className="truncate text-[10px] sm:text-[11px] text-zinc-400">
              {m.alertPlace} · Hik-Connect Push
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      {/* Background Architectural Dot-matrix Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-blueprint-dots opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_30%,transparent_100%)]"
      />

      <div className="container-open">
        {/* Top Status Monospace Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/80 px-3 py-1 sm:px-4 sm:py-1.5 shadow-xs backdrop-blur-sm max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-900 uppercase truncate">
            SYSTEMS ONLINE // HIKVISION & DAHUA
          </span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column (7 cols): Giant Editorial Headline + Actions */}
          <div className="lg:col-span-7">
            <h1 className="text-[32px] leading-[1.1] sm:text-5xl lg:text-[56px] xl:text-[64px] font-semibold tracking-tight break-words text-zinc-950 text-balance">
              {h.title.split(/(IP[-‑][^\s]+)/).map((part, i) =>
                part.startsWith('IP') ? (
                  <span key={i} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </h1>

            <p className="mt-5 sm:mt-8 max-w-2xl text-base sm:text-xl font-normal leading-relaxed text-zinc-600 text-pretty">
              {h.subtitle}
            </p>

            {/* Action Buttons Row */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={`#${SECTION_IDS.callback}`}
                className="btn-pill-black w-full sm:w-auto justify-center py-3.5 px-6 text-sm sm:text-base group"
              >
                <span>{h.primaryCta}</span>
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-outline w-full sm:w-auto justify-center py-3.5 px-6 text-sm sm:text-base"
              >
                <WhatsAppIcon size={19} className="text-zinc-950 shrink-0" />
                <span>{h.secondaryCta}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Live Camera Viewfinder UI */}
          <div className="lg:col-span-5 lg:pl-2">
            <CameraHudViewfinder />
          </div>
        </div>

        {/* Full-width 4-column Bottom Metrics Row */}
        <div className="border-t border-zinc-200 pt-8 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
          {h.highlights.map((item, idx) => {
            const hudLabels = ['[RES_4K_60FPS]', '[F1.0_COLORVU]', '[POE_IEEE_802.3AF]', '[APP_HIK_CONNECT]'];
            return (
              <div key={item.value} className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider truncate mb-1">
                  {hudLabels[idx] || `[SPEC_0${idx + 1}]`}
                </span>
                <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 truncate">
                  {item.value}
                </span>
                <span className="mt-1 text-xs sm:text-sm text-zinc-500 font-normal">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
