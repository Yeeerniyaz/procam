import { useState } from 'react';
import { Camera, Check, Info, Layers, Network, Server, Smartphone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type BrandKey = 'hikvision' | 'hiwatch' | 'dahua';
type FocalKey = '2.8' | '4.0' | '6.0';

export default function HardwareSection() {
  const { t } = useLanguage();
  const hw = t.hardware;
  const lab = hw.opticalLab;

  const [activeBrand, setActiveBrand] = useState<BrandKey>('hikvision');
  const [focal, setFocal] = useState<FocalKey>('2.8');

  const lens = lab.lenses[focal];

  const brandSpecs = {
    hikvision: {
      num: '01',
      code: '[NVR + CAMERAS // CORE BACKBONE]',
      name: hw.hikvision.name,
      badge: hw.hikvision.badge,
      description: hw.hikvision.description,
      features: hw.hikvision.features,
      protocol: 'HIKVISION PRIVATE P2P // H.265+',
      camNode: 'Hikvision 4K',
      nvrNode: 'Hikvision NVR',
      isDahua: false,
    },
    hiwatch: {
      num: '02',
      code: '[NVR + CAMERAS // HIK ECOSYSTEM]',
      name: hw.hiwatch.name,
      badge: hw.hiwatch.badge,
      description: hw.hiwatch.description,
      features: hw.hiwatch.features,
      protocol: 'HIK-CONNECT NATIVE // POE 48V',
      camNode: 'HiWatch IP',
      nvrNode: 'HiWatch NVR',
      isDahua: false,
    },
    dahua: {
      num: '03',
      code: '[OPTICAL IP ENDPOINTS ONLY]',
      name: hw.dahua.name,
      badge: hw.dahua.badge,
      description: hw.dahua.description,
      features: hw.dahua.features,
      protocol: 'ONVIF PROFILE S // RTSP STREAM',
      camNode: 'Dahua IP Cam',
      nvrNode: 'Hikvision NVR',
      isDahua: true,
    },
  }[activeBrand];

  const fovSpecs: Record<
    FocalKey,
    { angle: number; conePath: string; markerX: number; targetLabel: string }
  > = {
    '2.8': {
      angle: 114,
      conePath: 'M 30 95 L 250 15 L 250 175 Z',
      markerX: 95,
      targetLabel: 'Идентификация: 6 м (Широкий обзор)',
    },
    '4.0': {
      angle: 84,
      conePath: 'M 30 95 L 250 42 L 250 148 Z',
      markerX: 155,
      targetLabel: 'Идентификация: 12 м (Фасад / Ворота)',
    },
    '6.0': {
      angle: 54,
      conePath: 'M 30 95 L 250 66 L 250 124 Z',
      markerX: 220,
      targetLabel: 'Идентификация: 22 м (Госномер авто)',
    },
  };

  const currentFov = fovSpecs[focal];

  return (
    <section
      id="hardware"
      className="snap-screen-section bg-white border-b border-zinc-200"
    >
      <div className="flex-1 min-h-0 w-full grid grid-cols-1 grid-rows-[1fr_1fr] lg:grid-rows-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 overflow-hidden">
        {/* ============================================================ */}
        {/* LEFT / TOP ZONE (5 cols on lg): Brand Switcher + Topology    */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex flex-col justify-between p-3.5 sm:p-6 lg:p-10 xl:p-12 min-h-0 overflow-hidden bg-white">
          {/* Top Header + Interactive Brand Tabs */}
          <div className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400">
                  {hw.eyebrow}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500">
                NVR: HIKVISION / HIWATCH ONLY
              </span>
            </div>

            <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-950 truncate">
              {hw.title}
            </h2>

            {/* Compact Brand Selector Tabs */}
            <div className="mt-2.5 sm:mt-4 grid grid-cols-3 gap-1.5 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
              {(
                [
                  { key: 'hikvision', label: '01. HIKVISION' },
                  { key: 'hiwatch', label: '02. HIWATCH' },
                  { key: 'dahua', label: '03. DAHUA IP' },
                ] as { key: BrandKey; label: string }[]
              ).map((tab) => {
                const active = activeBrand === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveBrand(tab.key)}
                    className={`cursor-pointer rounded-lg py-1.5 sm:py-2 px-2 font-mono text-[10px] sm:text-xs font-bold tracking-tight transition ${
                      active
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle: Active Brand Spec Card (flex-1 min-h-0) */}
          <div className="my-auto py-2 min-h-0 flex flex-col justify-center">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-mono text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider ${
                    brandSpecs.isDahua ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                >
                  {brandSpecs.code}
                </span>
                <span className="rounded-full bg-zinc-950 px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold text-white uppercase">
                  {brandSpecs.badge}
                </span>
              </div>

              <h3 className="mt-1 sm:mt-2 text-base sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {brandSpecs.name}
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                {brandSpecs.description}
              </p>

              <ul className="mt-2.5 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {brandSpecs.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-1.5 text-[11px] sm:text-xs text-zinc-800"
                  >
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-950">
                      <Check size={9} strokeWidth={3} />
                    </span>
                    <span className="line-clamp-1 sm:line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Explicit Architectural Rule Note */}
              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-zinc-200/80 flex items-start gap-2">
                <Info
                  size={13}
                  className={`mt-0.5 shrink-0 ${
                    brandSpecs.isDahua ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                />
                <p className="text-[10px] sm:text-xs text-zinc-600 leading-snug">
                  <strong className="text-zinc-950 font-semibold">Архитектура NVR:</strong>{' '}
                  Серверы записи строго <span className="font-semibold text-zinc-950">Hikvision / HiWatch</span>. Камеры Dahua интегрируются только как IP-оптика по ONVIF/RTSP.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom: Live 4-Node Signal Topology Pipeline */}
          <div className="shrink-0 rounded-xl border border-zinc-200 bg-zinc-950 p-2.5 sm:p-3.5 text-white">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-400 pb-1.5 mb-2 border-b border-zinc-800">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Layers size={12} className="text-emerald-400" />
                TOPOLOGY // {activeBrand.toUpperCase()}
              </span>
              <span className="truncate">{brandSpecs.protocol}</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
              <div
                className={`rounded-lg border p-1.5 ${
                  brandSpecs.isDahua
                    ? 'border-amber-500/50 bg-amber-950/20'
                    : 'border-zinc-800 bg-zinc-900/70'
                }`}
              >
                <Camera size={13} className="mx-auto text-emerald-400 mb-0.5" />
                <span className="text-[9px] sm:text-[10px] font-bold block truncate">
                  {brandSpecs.camNode}
                </span>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-1.5">
                <Network size={13} className="mx-auto text-emerald-400 mb-0.5" />
                <span className="text-[9px] sm:text-[10px] font-bold block truncate">
                  PoE 48V Switch
                </span>
              </div>

              <div className="rounded-lg border border-emerald-500/60 bg-emerald-950/20 p-1.5">
                <Server size={13} className="mx-auto text-emerald-400 mb-0.5" />
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 block truncate">
                  {brandSpecs.nvrNode}
                </span>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-1.5">
                <Smartphone size={13} className="mx-auto text-emerald-400 mb-0.5" />
                <span className="text-[9px] sm:text-[10px] font-bold block truncate">
                  Hik-Connect
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT / BOTTOM ZONE (7 cols on lg): Interactive Optical Lab  */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 flex flex-col justify-between p-3.5 sm:p-6 lg:p-10 xl:p-12 min-h-0 overflow-hidden bg-zinc-950 text-white relative select-none">
          {/* Subtle architectural dot matrix */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"
          />

          {/* Top Bar: Optical Lab Header + 2.8 / 4.0 / 6.0 mm Switcher */}
          <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-4 border-b border-zinc-800">
            <div>
              <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-emerald-400 block">
                {lab.eyebrow}
              </span>
              <h3 className="text-sm sm:text-xl lg:text-2xl font-semibold tracking-tight text-white">
                {lab.title}
              </h3>
            </div>

            {/* Focal Length Switcher (2.8 мм / 4.0 мм / 6.0 мм) */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
              {(['2.8', '4.0', '6.0'] as FocalKey[]).map((f) => {
                const active = focal === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFocal(f)}
                    className={`cursor-pointer px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg font-mono text-[10px] sm:text-xs font-bold transition ${
                      active
                        ? 'bg-emerald-500 text-zinc-950 shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {f} мм
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Full-height Live SVG Optical Beam (114° vs 84° vs 54°) */}
          <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden my-1">
            {/* Top-right Live Angle HUD Badge */}
            <div className="pointer-events-none absolute top-2 right-2 z-20 rounded-md border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 font-mono text-[10px] sm:text-xs text-emerald-400 font-bold">
              FOV: {lens.angle} // {lens.focal}
            </div>

            <svg
              className="w-full h-full max-h-full"
              viewBox="0 0 280 190"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
            >
              {/* Distance Range Scale Markers: 6m, 12m, 22m */}
              <line x1="95" y1="15" x2="95" y2="175" stroke="#27272A" strokeDasharray="3 3" />
              <text x="88" y="186" fill="#71717A" fontSize="7" fontFamily="monospace">
                6м
              </text>

              <line x1="155" y1="15" x2="155" y2="175" stroke="#27272A" strokeDasharray="3 3" />
              <text x="147" y="186" fill="#71717A" fontSize="7" fontFamily="monospace">
                12м
              </text>

              <line x1="220" y1="15" x2="220" y2="175" stroke="#27272A" strokeDasharray="3 3" />
              <text x="212" y="186" fill="#71717A" fontSize="7" fontFamily="monospace">
                22м
              </text>

              {/* Center Optical Axis */}
              <line
                x1="32"
                y1="95"
                x2="255"
                y2="95"
                stroke="#3F3F46"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />

              {/* Camera Chassis Node */}
              <rect
                x="12"
                y="84"
                width="18"
                height="22"
                rx="3"
                fill="#27272A"
                stroke="#71717A"
                strokeWidth="1.2"
              />
              <circle cx="30" cy="95" r="4.5" fill="#10B981" />

              {/* Dynamic Optical Beam Cone */}
              <path
                d={currentFov.conePath}
                fill="rgba(16, 185, 129, 0.16)"
                stroke="#10B981"
                strokeWidth="1.6"
                className="transition-all duration-300"
              />

              {/* Target Identification Distance Plane */}
              <line
                x1={currentFov.markerX}
                y1="28"
                x2={currentFov.markerX}
                y2="162"
                stroke="#34D399"
                strokeWidth="2"
                className="transition-all duration-300"
              />

              <circle
                cx={currentFov.markerX}
                cy="95"
                r="5.5"
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              <rect
                x={Math.min(currentFov.markerX - 45, 150)}
                y="14"
                width="115"
                height="12"
                rx="2"
                fill="#10B981"
                className="transition-all duration-300"
              />
              <text
                x={Math.min(currentFov.markerX - 41, 154)}
                y="22.5"
                fill="#09090B"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                className="transition-all duration-300"
              >
                {currentFov.targetLabel}
              </text>
            </svg>
          </div>

          {/* Bottom Bar: Selected Lens Spec Summary */}
          <div className="relative z-10 shrink-0 rounded-xl border border-zinc-800 bg-zinc-900/90 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                  [{lens.tag}]
                </span>
                <span className="text-xs sm:text-base font-semibold text-white truncate">
                  {lens.title}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {lens.desc}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-zinc-800 sm:pl-5">
              <div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase block">
                  Угол обзора
                </span>
                <span className="font-mono text-sm sm:text-lg font-bold text-white">
                  {lens.angle}
                </span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase block">
                  Дистанция лиц
                </span>
                <span className="font-mono text-sm sm:text-lg font-bold text-emerald-400">
                  {lens.distance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
