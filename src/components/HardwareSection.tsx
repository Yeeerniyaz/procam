import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Layers, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type BrandKey = 'hikvision' | 'hiwatch' | 'dahua';
type FocalKey = '2.8' | '4.0' | '6.0';

export default function HardwareSection() {
  const { t } = useLanguage();
  const hw = t.hardware;
  const lab = hw.opticalLab;

  const [activeBrand, setActiveBrand] = useState<BrandKey>('hikvision');
  const [focalLength, setFocalLength] = useState<FocalKey>('2.8');

  const lens = lab.lenses[focalLength];

  const fovSpecs: Record<
    FocalKey,
    { angle: number; conePath: string; markerX: number }
  > = {
    '2.8': {
      angle: 114,
      conePath: 'M 32 100 L 235 16 L 235 184 Z',
      markerX: 90,
    },
    '4.0': {
      angle: 84,
      conePath: 'M 32 100 L 235 44 L 235 156 Z',
      markerX: 150,
    },
    '6.0': {
      angle: 54,
      conePath: 'M 32 100 L 235 68 L 235 132 Z',
      markerX: 215,
    },
  };

  const currentFov = fovSpecs[focalLength];

  return (
    <section
      id="hardware"
      className="min-h-screen flex flex-col justify-center py-16 lg:py-24 border-b border-zinc-200 bg-white"
    >
      <div className="container-open w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {hw.eyebrow}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs uppercase text-zinc-500">
                HIKVISION · HIWATCH · DAHUA IP
              </span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
              {hw.title}
            </h2>
          </div>

          <p className="max-w-xl text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed">
            {hw.subtitle}
          </p>
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE MODULE 1: 3 Brand Columns + Live SVG Topology     */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 border border-zinc-200 rounded-2xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 bg-white">
          {/* 01. HIKVISION */}
          <div
            onClick={() => setActiveBrand('hikvision')}
            className={`cursor-pointer p-6 sm:p-8 flex flex-col justify-between transition ${
              activeBrand === 'hikvision'
                ? 'bg-zinc-50 ring-2 ring-inset ring-zinc-950'
                : 'bg-white hover:bg-zinc-50/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-950">
                  01. HIKVISION
                </span>
                <span className="rounded-full bg-zinc-950 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white uppercase">
                  {hw.hikvision.badge}
                </span>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {hw.hikvision.role}
                </span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                  {hw.hikvision.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {hw.hikvision.description}
                </p>
              </div>

              <ul className="mt-5 space-y-2">
                {hw.hikvision.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-950">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span>IP CAMERAS + CORE NVR</span>
              <span className="text-emerald-600 font-semibold">● HIK-CONNECT</span>
            </div>
          </div>

          {/* 02. HIWATCH */}
          <div
            onClick={() => setActiveBrand('hiwatch')}
            className={`cursor-pointer p-6 sm:p-8 flex flex-col justify-between transition ${
              activeBrand === 'hiwatch'
                ? 'bg-zinc-50 ring-2 ring-inset ring-zinc-950'
                : 'bg-white hover:bg-zinc-50/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-950">
                  02. HIWATCH
                </span>
                <span className="rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-800 uppercase">
                  {hw.hiwatch.badge}
                </span>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {hw.hiwatch.role}
                </span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                  {hw.hiwatch.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {hw.hiwatch.description}
                </p>
              </div>

              <ul className="mt-5 space-y-2">
                {hw.hiwatch.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-950">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span>IP CAMERAS + CORE NVR</span>
              <span className="text-emerald-600 font-semibold">● HIK-CONNECT</span>
            </div>
          </div>

          {/* 03. DAHUA IP (Strictly Optical IP Endpoints Only) */}
          <div
            onClick={() => setActiveBrand('dahua')}
            className={`cursor-pointer p-6 sm:p-8 flex flex-col justify-between transition ${
              activeBrand === 'dahua'
                ? 'bg-zinc-50 ring-2 ring-inset ring-zinc-950'
                : 'bg-zinc-50/40 hover:bg-zinc-50/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-950">
                  03. DAHUA IP
                </span>
                <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-800 uppercase">
                  {hw.dahua.badge}
                </span>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-amber-600">
                  <ShieldAlert size={13} />
                  {hw.dahua.role}
                </span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                  {hw.dahua.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {hw.dahua.description}
                </p>
              </div>

              <ul className="mt-5 space-y-2">
                {hw.dahua.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-950">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-300 bg-white p-3">
              <div className="flex items-start gap-2">
                <Info size={14} className="mt-0.5 shrink-0 text-zinc-900" />
                <p className="text-[11px] leading-relaxed text-zinc-700 font-medium">
                  {hw.dahua.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live SVG NVR & Endpoint Topology Diagram */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-950 p-4 sm:p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                TOPOLOGY // {activeBrand === 'dahua' ? 'DAHUA IP ENDPOINT -> HIKVISION NVR' : `${activeBrand.toUpperCase()} NATIVE ECOSYSTEM`}
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-emerald-400">
              {activeBrand === 'dahua'
                ? 'ONVIF / RTSP -> HIKVISION / HIWATCH NVR ONLY (NEVER DAHUA NVR)'
                : 'NATIVE HIKVISION / HIWATCH NVR + HIK-CONNECT CLOUD'}
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              className="w-full min-w-[540px] h-24"
              viewBox="0 0 800 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Node 1: Camera Endpoint */}
              <rect x="10" y="14" width="175" height="68" rx="10" fill="#18181B" stroke="#10B981" strokeWidth="1.5" />
              <text x="24" y="36" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                01. OPTICAL ENDPOINT
              </text>
              <text x="24" y="54" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {activeBrand === 'dahua'
                  ? 'Dahua IP Camera'
                  : activeBrand === 'hiwatch'
                  ? 'HiWatch IP Camera'
                  : 'Hikvision 4K Camera'}
              </text>
              <text x="24" y="70" fill="#A1A1AA" fontSize="8.5" fontFamily="monospace">
                {activeBrand === 'dahua' ? 'ONVIF / RTSP Stream' : 'Native H.265+ Stream'}
              </text>

              {/* Connector 1 -> 2 */}
              <line x1="185" y1="48" x2="225" y2="48" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="205" cy="48" r="3" fill="#10B981" />

              {/* Node 2: PoE Switch */}
              <rect x="225" y="14" width="160" height="68" rx="10" fill="#18181B" stroke="#3F3F46" strokeWidth="1.2" />
              <text x="239" y="36" fill="#A1A1AA" fontSize="9" fontFamily="monospace">
                02. POWER &amp; DATA
              </text>
              <text x="239" y="54" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                PoE 48V Switch
              </text>
              <text x="239" y="70" fill="#10B981" fontSize="8.5" fontFamily="monospace">
                IEEE 802.3af/at Cat6
              </text>

              {/* Connector 2 -> 3 */}
              <line x1="385" y1="48" x2="425" y2="48" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="405" cy="48" r="3" fill="#10B981" />

              {/* Node 3: Core NVR Server (Strictly Hikvision / HiWatch) */}
              <rect x="425" y="14" width="185" height="68" rx="10" fill="#064E3B" fillOpacity="0.25" stroke="#10B981" strokeWidth="1.6" />
              <text x="439" y="36" fill="#34D399" fontSize="9" fontFamily="monospace" fontWeight="bold">
                03. CORE NVR SERVER
              </text>
              <text x="439" y="54" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {activeBrand === 'hiwatch' ? 'HiWatch NVR' : 'Hikvision NVR'}
              </text>
              <text x="439" y="70" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">
                WD Purple HDD (No Dahua NVR)
              </text>

              {/* Connector 3 -> 4 */}
              <line x1="610" y1="48" x2="645" y2="48" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="628" cy="48" r="3" fill="#10B981" />

              {/* Node 4: Hik-Connect Cloud */}
              <rect x="645" y="14" width="145" height="68" rx="10" fill="#18181B" stroke="#3F3F46" strokeWidth="1.2" />
              <text x="658" y="36" fill="#A1A1AA" fontSize="9" fontFamily="monospace">
                04. MOBILE 24/7
              </text>
              <text x="658" y="54" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold">
                Hik-Connect
              </text>
              <text x="658" y="70" fill="#10B981" fontSize="8.5" fontFamily="monospace">
                iOS &amp; Android Push
              </text>
            </svg>
          </div>
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE MODULE 2: Optical Focal Length Simulator          */}
        {/* ============================================================ */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block">
                {lab.eyebrow}
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {lab.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 max-w-2xl">
                {lab.subtitle}
              </p>
            </div>

            {/* Focal Length Switcher Buttons: 2.8 mm vs 4.0 mm vs 6.0 mm */}
            <div className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 p-1.5 rounded-full self-start lg:self-auto shrink-0">
              {(['2.8', '4.0', '6.0'] as FocalKey[]).map((key) => {
                const active = focalLength === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFocalLength(key)}
                    className={`cursor-pointer rounded-full px-4 py-2 font-mono text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                      active
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {key} мм
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Interactive SVG Optical Cone Diagram (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-zinc-950 border border-zinc-800 p-4 sm:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-400 mb-2">
                <span>OPTICAL BEAM GEOMETRY // {lens.focal}</span>
                <span className="text-emerald-400 font-bold">
                  FOV: {lens.angle} · ID: {lens.distance}
                </span>
              </div>

              <svg
                className="w-full h-44 sm:h-52"
                viewBox="0 0 260 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Reference distance lines: 6m, 12m, 22m */}
                <line x1="90" y1="20" x2="90" y2="180" stroke="#27272A" strokeDasharray="3 3" />
                <text x="83" y="193" fill="#71717A" fontSize="6.5" fontFamily="monospace">
                  6 м
                </text>

                <line x1="150" y1="20" x2="150" y2="180" stroke="#27272A" strokeDasharray="3 3" />
                <text x="141" y="193" fill="#71717A" fontSize="6.5" fontFamily="monospace">
                  12 м
                </text>

                <line x1="215" y1="20" x2="215" y2="180" stroke="#27272A" strokeDasharray="3 3" />
                <text x="206" y="193" fill="#71717A" fontSize="6.5" fontFamily="monospace">
                  22 м
                </text>

                {/* Camera body on left */}
                <rect x="12" y="88" width="20" height="24" rx="4" fill="#27272A" stroke="#71717A" strokeWidth="1.2" />
                <circle cx="32" cy="100" r="4.5" fill="#10B981" />

                {/* Dynamic Optical Beam Cone */}
                <motion.path
                  key={focalLength}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1, d: currentFov.conePath }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  d={currentFov.conePath}
                  fill="rgba(16, 185, 129, 0.16)"
                  stroke="#10B981"
                  strokeWidth="1.5"
                />

                {/* Smoothly moving Target Distance Marker */}
                <g
                  style={{
                    transform: `translateX(${currentFov.markerX}px)`,
                    transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <line x1="0" y1="32" x2="0" y2="168" stroke="#34D399" strokeWidth="2" />
                  <circle cx="0" cy="100" r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  <rect x="-42" y="16" width="84" height="12" rx="3" fill="#10B981" />
                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    fill="#09090B"
                    fontSize="5.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {lens.focal} · {lens.angle}
                  </text>
                </g>
              </svg>
            </div>

            {/* Lens Specs Summary Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-800 uppercase">
                    {lens.tag}
                  </span>
                  <span className="font-mono text-sm font-bold text-zinc-950">
                    {lens.focal}
                  </span>
                </div>

                <h4 className="mt-4 text-lg sm:text-xl font-semibold text-zinc-950">
                  {lens.title}
                </h4>

                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {lens.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-zinc-400 block">
                    {lab.angleLabel}
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-950">
                    {lens.angle}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-zinc-400 block">
                    {lab.distanceLabel}
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-600">
                    {lens.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
