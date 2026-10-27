import { useState } from 'react';
import { Camera, Check, Info, Layers, Network, Server, Shield, Smartphone } from 'lucide-react';
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

  // Optical cone geometry specs
  const fovSpecs: Record<FocalKey, { angle: number; conePath: string; markerX: number; targetLabel: string }> = {
    '2.8': {
      angle: 114,
      conePath: 'M 30 100 L 220 20 L 220 180 Z',
      markerX: 95,
      targetLabel: 'Идентификация: 6 м',
    },
    '4.0': {
      angle: 84,
      conePath: 'M 30 100 L 220 45 L 220 155 Z',
      markerX: 145,
      targetLabel: 'Идентификация: 12 м',
    },
    '6.0': {
      angle: 54,
      conePath: 'M 30 100 L 220 68 L 220 132 Z',
      markerX: 200,
      targetLabel: 'Идентификация: 22 м (Госномер)',
    },
  };

  const currentFov = fovSpecs[focal];

  return (
    <section id="hardware" className="min-h-screen flex flex-col justify-center py-16 lg:py-24 border-b border-zinc-200 bg-white">
      <div className="container-open w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {hw.eyebrow}
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

        {/* INTERACTIVE MODULE 1: Brand Ecosystem Bento Grid + Topology */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 border border-zinc-200 rounded-2xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 bg-white shadow-xs">
          {/* Card 01: Hikvision */}
          <div
            onClick={() => setActiveBrand('hikvision')}
            className={`cursor-pointer lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between transition-colors duration-200 ${
              activeBrand === 'hikvision' ? 'bg-zinc-50/90 ring-1 ring-inset ring-zinc-950' : 'bg-white hover:bg-zinc-50/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-950">
                  01
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    [NVR + CAMERAS]
                  </span>
                  <span className="rounded-full bg-zinc-950 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-white uppercase tracking-wider">
                    {hw.hikvision.badge}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 mb-2 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  CORE BACKBONE
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
                  {hw.hikvision.name}
                </h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                  {hw.hikvision.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5">
                {hw.hikvision.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>HIK-CONNECT P2P CLOUD</span>
              <span className="text-emerald-600 font-semibold">● ACTIVE HUB</span>
            </div>
          </div>

          {/* Card 02: HiWatch */}
          <div
            onClick={() => setActiveBrand('hiwatch')}
            className={`cursor-pointer lg:col-span-4 p-5 sm:p-8 flex flex-col justify-between transition-colors duration-200 ${
              activeBrand === 'hiwatch' ? 'bg-zinc-50/90 ring-1 ring-inset ring-zinc-950' : 'bg-white hover:bg-zinc-50/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-950">
                  02
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    [OFFICIAL ECOSYSTEM]
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-zinc-800 uppercase tracking-wider">
                    {hw.hiwatch.badge}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                  BALANCED DEPLOYMENT
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
                  {hw.hiwatch.name}
                </h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                  {hw.hiwatch.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5">
                {hw.hiwatch.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-zinc-400" />
                <span>100% HIK-CONNECT NATIVE</span>
              </div>
            </div>
          </div>

          {/* Card 03: Dahua (IP Cameras strictly) */}
          <div
            onClick={() => setActiveBrand('dahua')}
            className={`cursor-pointer lg:col-span-3 p-5 sm:p-8 flex flex-col justify-between transition-colors duration-200 ${
              activeBrand === 'dahua' ? 'bg-zinc-50/90 ring-1 ring-inset ring-zinc-950' : 'bg-zinc-50/40 hover:bg-zinc-100/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-950">
                  03
                </span>
                <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-zinc-700 uppercase tracking-wider">
                  {hw.dahua.badge}
                </span>
              </div>

              <div className="mt-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-600 mb-2 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  [OPTICAL ENDPOINTS ONLY]
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                  {hw.dahua.name}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {hw.dahua.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {hw.dahua.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-zinc-700">
                    <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-800">
                      <Check size={9} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Crucial Technical Architecture Note */}
            <div className="mt-6 rounded-xl border border-zinc-300/80 bg-white p-3.5">
              <div className="flex items-start gap-2">
                <Info size={14} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-[11px] leading-relaxed text-zinc-700 font-medium">
                  {hw.dahua.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live SVG Signal Topology Diagram */}
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-950 p-4 sm:p-6 text-white overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-emerald-400" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-white">
                LIVE TOPOLOGY // {activeBrand.toUpperCase()} PIPELINE
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              PROTOCOL: {activeBrand === 'dahua' ? 'ONVIF PROFILE S / RTSP' : 'HIKVISION PRIVATE P2P'}
            </span>
          </div>

          {/* SVG Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className={`p-3 rounded-lg border transition ${activeBrand === 'dahua' ? 'border-amber-500/50 bg-amber-950/20' : 'border-zinc-800 bg-zinc-900/60'}`}>
              <div className="flex justify-center mb-1 text-emerald-400">
                <Camera size={20} />
              </div>
              <span className="font-mono text-xs font-bold text-white block">
                {activeBrand === 'dahua' ? 'Dahua IP-Камеры' : activeBrand === 'hiwatch' ? 'HiWatch IP-Камеры' : 'Hikvision 4K Камеры'}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">PoE 48V / 100 Mbps</span>
            </div>

            <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/60">
              <div className="flex justify-center mb-1 text-emerald-400">
                <Network size={20} />
              </div>
              <span className="font-mono text-xs font-bold text-white block">PoE Коммутатор</span>
              <span className="font-mono text-[10px] text-zinc-400">IEEE 802.3af Gigabit</span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/50 bg-emerald-950/20">
              <div className="flex justify-center mb-1 text-emerald-400">
                <Server size={20} />
              </div>
              <span className="font-mono text-xs font-bold text-emerald-300 block">
                {activeBrand === 'hiwatch' ? 'HiWatch NVR' : 'Hikvision NVR'}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">WD Purple 24/7 HDD</span>
            </div>

            <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/60">
              <div className="flex justify-center mb-1 text-emerald-400">
                <Smartphone size={20} />
              </div>
              <span className="font-mono text-xs font-bold text-white block">Hik-Connect App</span>
              <span className="font-mono text-[10px] text-zinc-400">iOS & Android Cloud</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MODULE 2: Optical Focal Length Lab Simulator */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-1">
                {lab.eyebrow}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {lab.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 max-w-xl">
                {lab.subtitle}
              </p>
            </div>

            {/* Lens Switcher Buttons */}
            <div className="flex items-center gap-2 bg-white border border-zinc-200 p-1.5 rounded-xl shadow-xs self-start lg:self-auto">
              {(['2.8', '4.0', '6.0'] as FocalKey[]).map((f) => {
                const active = focal === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFocal(f)}
                    className={`cursor-pointer px-3 sm:px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-semibold transition ${
                      active
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                    }`}
                  >
                    {f} мм
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive SVG Optical Cone Diagram */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Visualizer (7 cols) */}
            <div className="lg:col-span-7 aspect-[16/9] w-full rounded-xl bg-zinc-950 relative overflow-hidden border border-zinc-800 p-4 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"
              />

              <svg className="w-full h-full" viewBox="0 0 250 200" fill="none">
                {/* Distance range lines (5m, 10m, 15m, 20m, 25m) */}
                <line x1="85" y1="20" x2="85" y2="180" stroke="#27272A" strokeDasharray="3 3" />
                <text x="82" y="193" fill="#52525B" fontSize="6" fontFamily="monospace">6м</text>

                <line x1="140" y1="20" x2="140" y2="180" stroke="#27272A" strokeDasharray="3 3" />
                <text x="135" y="193" fill="#52525B" fontSize="6" fontFamily="monospace">12м</text>

                <line x1="200" y1="20" x2="200" y2="180" stroke="#27272A" strokeDasharray="3 3" />
                <text x="195" y="193" fill="#52525B" fontSize="6" fontFamily="monospace">22м</text>

                {/* Camera Lens Node */}
                <rect x="15" y="90" width="16" height="20" rx="3" fill="#3F3F46" stroke="#71717A" />
                <circle cx="31" cy="100" r="4" fill="#10B981" />

                {/* Dynamic Optical Cone */}
                <path
                  d={currentFov.conePath}
                  fill="rgba(16, 185, 129, 0.15)"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* Target Distance Identification Line Marker */}
                <line
                  x1={currentFov.markerX}
                  y1="35"
                  x2={currentFov.markerX}
                  y2="165"
                  stroke="#34D399"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                <circle
                  cx={currentFov.markerX}
                  cy="100"
                  r="5"
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                <text
                  x={currentFov.markerX - 25}
                  y="28"
                  fill="#34D399"
                  fontSize="6.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="transition-all duration-300"
                >
                  {currentFov.targetLabel}
                </text>
              </svg>

              {/* FOV Badge */}
              <div className="absolute top-3 right-3 font-mono text-[10px] bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-emerald-400">
                УГОЛ ОБЗОРА: {lens.angle}
              </div>
            </div>

            {/* Lens Specification Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-zinc-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 font-semibold">
                    {lens.tag}
                  </span>
                  <span className="font-mono text-sm font-bold text-zinc-950">
                    {lens.focal}
                  </span>
                </div>

                <h4 className="mt-3 text-lg font-semibold text-zinc-950">
                  {lens.title}
                </h4>

                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {lens.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">Угол обзора</span>
                  <span className="font-mono text-base font-bold text-zinc-900">{lens.angle}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase block">Дистанция лиц</span>
                  <span className="font-mono text-base font-bold text-emerald-600">{lens.distance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
