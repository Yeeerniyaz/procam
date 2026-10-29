import { useState } from 'react';
import { ArrowRight, Eye, ShieldCheck, Video } from 'lucide-react';
import { WHATSAPP_URL } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

type PresetKey = 'house' | 'office' | 'warehouse';
type VisionMode = 'day' | 'colorvu' | 'ai';

interface CamCoords {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  path: string;
}

const PRESET_CAM_DATA: Record<PresetKey, CamCoords[]> = {
  house: [
    { x: 35, y: 35, targetX: 110, targetY: 100, path: 'M 35 35 L 140 30 L 70 140 Z' },
    { x: 265, y: 40, targetX: 200, targetY: 85, path: 'M 265 40 L 160 30 L 210 130 Z' },
    { x: 150, y: 160, targetX: 150, targetY: 115, path: 'M 150 160 L 85 90 L 215 90 Z' },
    { x: 40, y: 165, targetX: 90, targetY: 140, path: 'M 40 165 L 40 90 L 130 165 Z' },
  ],
  office: [
    { x: 30, y: 35, targetX: 85, targetY: 80, path: 'M 30 35 L 120 30 L 60 120 Z' },
    { x: 150, y: 30, targetX: 150, targetY: 90, path: 'M 150 30 L 90 120 L 210 120 Z' },
    { x: 270, y: 40, targetX: 220, targetY: 100, path: 'M 270 40 L 180 40 L 220 130 Z' },
    { x: 150, y: 165, targetX: 150, targetY: 120, path: 'M 150 165 L 100 95 L 200 95 Z' },
  ],
  warehouse: [
    { x: 35, y: 35, targetX: 100, targetY: 70, path: 'M 35 35 L 150 30 L 80 130 Z' },
    { x: 265, y: 35, targetX: 200, targetY: 80, path: 'M 265 35 L 150 35 L 210 130 Z' },
    { x: 265, y: 165, targetX: 190, targetY: 130, path: 'M 265 165 L 170 165 L 220 90 Z' },
    { x: 35, y: 165, targetX: 110, targetY: 120, path: 'M 35 165 L 35 90 L 140 165 Z' },
  ],
};

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();
  const h = t.hero;
  const c = h.cad;

  const [preset, setPreset] = useState<PresetKey>('house');
  const [activeCam, setActiveCam] = useState<number>(0);
  const [visionMode, setVisionMode] = useState<VisionMode>('day');

  const camNames = c.cams[preset] || c.cams.house;
  const cams = PRESET_CAM_DATA[preset];
  const activeCoord = cams[activeCam] || cams[0];

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('contacts');
    } else {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const compactMetrics = [
    { code: 'RES_4K', value: '2K/4K', label: h.highlights[0]?.label || 'UHD чёткость' },
    { code: 'F1.0', value: 'ColorVu', label: h.highlights[1]?.label || 'Цвет ночью' },
    { code: '802.3AF', value: 'PoE 48V', label: h.highlights[2]?.label || '1 кабель' },
    { code: 'P2P_CLOUD', value: '24/7', label: h.highlights[3]?.label || 'Hik-Connect' },
  ];

  return (
    <section
      id="hero"
      className="snap-screen-section bg-architectural-grid border-b border-zinc-200"
    >
      <div className="flex-1 min-h-0 w-full grid grid-cols-1 grid-rows-[1fr_1fr] lg:grid-rows-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 overflow-hidden">
        {/* ============================================================ */}
        {/* LEFT PANEL (6 cols on lg, top half on mobile)                */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 flex flex-col justify-between p-3.5 sm:p-8 lg:p-12 xl:p-16 min-h-0 overflow-hidden">
          {/* Top: Status Pill */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 shadow-2xs max-w-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-mono text-[9px] sm:text-xs tracking-wider uppercase text-zinc-800 font-medium truncate">
                ● {h.badge}
              </span>
            </div>
          </div>

          {/* Middle: Headline + Subtitle + 2 Compact CTA Pills */}
          <div className="my-auto py-1 min-h-0 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-950 text-balance">
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

            <p className="mt-2 sm:mt-4 text-xs sm:text-base text-zinc-600 line-clamp-3 max-w-2xl leading-relaxed">
              {h.subtitle}
            </p>

            {/* 2 Compact CTA Pills */}
            <div className="mt-3 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="#contacts"
                onClick={handleCtaClick}
                className="btn-pill-black group py-2 px-4 sm:py-3 sm:px-6 text-xs sm:text-sm"
              >
                <span>{h.primaryCta}</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-outline py-2 px-4 sm:py-3 sm:px-6 text-xs sm:text-sm"
              >
                <WhatsAppIcon size={16} className="text-zinc-950 shrink-0" />
                <span>{h.secondaryCta}</span>
              </a>
            </div>
          </div>

          {/* Bottom: 4 Inline Telemetry Metrics in a compact 4-column strip */}
          <div className="shrink-0 grid grid-cols-4 gap-2 sm:gap-4 pt-2 sm:pt-4 border-t border-zinc-200/90">
            {compactMetrics.map((m) => (
              <div key={m.code} className="min-w-0 flex flex-col">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={11} className="text-emerald-500 shrink-0 hidden sm:inline" />
                  <span className="font-mono text-[8px] sm:text-[10px] text-zinc-400 uppercase tracking-wider truncate">
                    [{m.code}]
                  </span>
                </div>
                <span className="text-xs sm:text-xl lg:text-2xl font-semibold tracking-tight text-zinc-950 truncate">
                  {m.value}
                </span>
                <span className="text-[9px] sm:text-xs text-zinc-500 truncate">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT PANEL (6 cols on lg, bottom half on mobile)            */}
        {/* Full-bleed edge-to-edge Interactive CAD Radar & NVR Viewport */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 bg-zinc-950 text-white flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 relative overflow-hidden min-h-0 select-none">
          {/* Subtle architectural CAD grid background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px]"
          />

          {/* Top Bar: Preset Switcher + Vision Mode Switcher */}
          <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 pb-2 sm:pb-3 border-b border-zinc-800">
            {/* Preset Switcher: [ 01. КОТТЕДЖ ] [ 02. ОФИС ] [ 03. СКЛАД ] */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg font-mono text-[9px] sm:text-[11px]">
              {(['house', 'office', 'warehouse'] as PresetKey[]).map((key) => {
                const active = preset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setPreset(key);
                      setActiveCam(0);
                    }}
                    className={`cursor-pointer rounded-md px-2 py-1 font-semibold uppercase transition ${
                      active
                        ? 'bg-white text-zinc-950 shadow-2xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {c.presets[key]}
                  </button>
                );
              })}
            </div>

            {/* Mode Switcher: [ 4K ] [ COLORVU ] [ AI ] */}
            <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px]">
              {([
                { key: 'day', short: '4K' },
                { key: 'colorvu', short: 'COLORVU' },
                { key: 'ai', short: 'AI' },
              ] as { key: VisionMode; short: string }[]).map(({ key, short }) => {
                const active = visionMode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setVisionMode(key)}
                    className={`cursor-pointer rounded px-2 py-1 font-bold transition ${
                      active
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Interactive SVG Floorplan filling available height */}
          <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden my-1">
            {/* ColorVu ambient night enhancement */}
            {visionMode === 'colorvu' && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/25 via-transparent to-amber-950/15 mix-blend-screen"
              />
            )}

            {/* Top-left Active Camera Telemetry HUD */}
            <div className="pointer-events-none absolute top-1.5 left-1.5 z-20 inline-flex items-center gap-1.5 rounded bg-zinc-900/90 border border-zinc-800 px-2 py-1 font-mono text-[9px] sm:text-[10px] text-zinc-300">
              <Video size={11} className="text-emerald-400 shrink-0" />
              <span className="font-bold text-white">[CAM_0{activeCam + 1}]</span>
              <span className="truncate max-w-[110px] sm:max-w-none">{camNames[activeCam]}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Top-right Push Alert Overlay */}
            <div className="pointer-events-none absolute top-1.5 right-1.5 z-20 hidden sm:flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 backdrop-blur-md px-2.5 py-1.5 text-white shadow-lg">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-500/20 text-emerald-400">
                <Eye size={12} />
              </span>
              <div className="text-[10px] leading-tight">
                <span className="font-semibold block">{c.alertTitle}</span>
                <span className="font-mono text-[9px] text-zinc-400">
                  {camNames[activeCam]} · {c.alertPlace}
                </span>
              </div>
            </div>

            <svg
              className="w-full h-full max-h-full"
              viewBox="0 0 300 200"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Perimeter boundary fence */}
              <rect
                x="15"
                y="15"
                width="270"
                height="170"
                stroke="#27272A"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Architectural Layout: House */}
              {preset === 'house' && (
                <g stroke="#3F3F46" strokeWidth="1.2">
                  <rect x="90" y="50" width="120" height="90" fill="#18181B" fillOpacity="0.85" />
                  <path d="M 90 85 L 210 85" stroke="#52525B" strokeWidth="0.8" />
                  <path d="M 150 50 L 150 140" stroke="#52525B" strokeWidth="0.8" />
                  <text x="125" y="100" fill="#71717A" fontSize="7" fontFamily="monospace">
                    КОТТЕДЖ
                  </text>
                  <rect x="135" y="140" width="30" height="12" fill="#27272A" stroke="#52525B" />
                  <rect x="220" y="30" width="55" height="50" stroke="#27272A" strokeDasharray="2 2" />
                  <text x="230" y="55" fill="#52525B" fontSize="6" fontFamily="monospace">
                    ПАРКОВКА
                  </text>
                  <line
                    x1="120"
                    y1="185"
                    x2="180"
                    y2="185"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />
                  <text x="135" y="195" fill="#10B981" fontSize="6" fontFamily="monospace">
                    ВОРОТА
                  </text>
                </g>
              )}

              {/* Architectural Layout: Office */}
              {preset === 'office' && (
                <g stroke="#3F3F46" strokeWidth="1.2">
                  <rect x="40" y="30" width="220" height="135" fill="#18181B" fillOpacity="0.85" />
                  <rect x="110" y="125" width="80" height="40" stroke="#52525B" strokeWidth="0.8" />
                  <text x="128" y="147" fill="#71717A" fontSize="6" fontFamily="monospace">
                    РЕСЕПШН / ВХОД
                  </text>
                  <rect x="40" y="30" width="55" height="45" fill="#27272A" stroke="#10B981" strokeWidth="1" />
                  <text x="45" y="55" fill="#10B981" fontSize="6" fontFamily="monospace">
                    СЕРВЕРНАЯ
                  </text>
                  <rect x="205" y="30" width="55" height="45" stroke="#52525B" strokeWidth="0.8" />
                  <text x="212" y="55" fill="#71717A" fontSize="6" fontFamily="monospace">
                    КАБИНЕТ
                  </text>
                  <circle cx="120" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                  <circle cx="150" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                  <circle cx="180" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                  <text x="132" y="96" fill="#52525B" fontSize="6" fontFamily="monospace">
                    OPEN-SPACE
                  </text>
                </g>
              )}

              {/* Architectural Layout: Warehouse */}
              {preset === 'warehouse' && (
                <g stroke="#3F3F46" strokeWidth="1.2">
                  <rect x="45" y="35" width="210" height="120" fill="#18181B" fillOpacity="0.85" />
                  <rect x="60" y="50" width="80" height="15" fill="#27272A" stroke="#52525B" />
                  <rect x="60" y="75" width="80" height="15" fill="#27272A" stroke="#52525B" />
                  <rect x="60" y="100" width="80" height="15" fill="#27272A" stroke="#52525B" />
                  <text x="75" y="60" fill="#71717A" fontSize="6" fontFamily="monospace">
                    СТЕЛЛАЖИ А-1
                  </text>
                  <text x="75" y="85" fill="#71717A" fontSize="6" fontFamily="monospace">
                    СТЕЛЛАЖИ А-2
                  </text>
                  <text x="75" y="110" fill="#71717A" fontSize="6" fontFamily="monospace">
                    СТЕЛЛАЖИ А-3
                  </text>
                  <rect
                    x="180"
                    y="50"
                    width="60"
                    height="35"
                    stroke="#10B981"
                    strokeWidth="0.8"
                    strokeDasharray="3 2"
                  />
                  <text x="188" y="70" fill="#10B981" fontSize="6" fontFamily="monospace">
                    РАМПА 01
                  </text>
                  <rect
                    x="180"
                    y="95"
                    width="60"
                    height="35"
                    stroke="#10B981"
                    strokeWidth="0.8"
                    strokeDasharray="3 2"
                  />
                  <text x="188" y="115" fill="#10B981" fontSize="6" fontFamily="monospace">
                    РАМПА 02
                  </text>
                  <rect x="15" y="150" width="25" height="25" fill="#27272A" stroke="#52525B" />
                  <text x="18" y="165" fill="#71717A" fontSize="5" fontFamily="monospace">
                    КПП
                  </text>
                </g>
              )}

              {/* Active Optical Field of View (Emerald Beam Cone) */}
              <path
                d={activeCoord.path}
                fill="rgba(16, 185, 129, 0.18)"
                stroke="#10B981"
                strokeWidth="1.3"
                className="transition-all duration-300"
              />

              {/* Simulated Animated Pulse Ray */}
              <line
                x1={activeCoord.x}
                y1={activeCoord.y}
                x2={activeCoord.targetX}
                y2={activeCoord.targetY}
                stroke="#10B981"
                strokeWidth="1"
                strokeDasharray="4 2"
                className="animate-pulse"
              />

              {/* AI AcuSense Target Lock Box */}
              <g
                transform={`translate(${activeCoord.targetX - 12}, ${activeCoord.targetY - 12})`}
                className="transition-all duration-300"
              >
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  fill="rgba(16, 185, 129, 0.12)"
                  stroke="#10B981"
                  strokeWidth="1.2"
                />
                <path d="M 0 4 L 0 0 L 4 0" stroke="#34D399" strokeWidth="1.5" />
                <path d="M 24 4 L 24 0 L 20 0" stroke="#34D399" strokeWidth="1.5" />
                <path d="M 0 20 L 0 24 L 4 24" stroke="#34D399" strokeWidth="1.5" />
                <path d="M 24 20 L 24 24 L 20 24" stroke="#34D399" strokeWidth="1.5" />

                <rect x="-8" y="-9" width="40" height="7" fill="#10B981" rx="1" />
                <text x="-6" y="-3.5" fill="#09090B" fontSize="4.5" fontWeight="bold" fontFamily="monospace">
                  AI HUMAN 99%
                </text>
              </g>

              {/* 4 Clickable Camera Perimeter Nodes */}
              {cams.map((node, i) => {
                const isActive = i === activeCam;
                return (
                  <g
                    key={i}
                    onClick={() => setActiveCam(i)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? 10 : 8}
                      fill={isActive ? 'rgba(16, 185, 129, 0.35)' : 'rgba(39, 39, 42, 0.7)'}
                      stroke={isActive ? '#10B981' : '#71717A'}
                      strokeWidth={isActive ? '1.6' : '1'}
                      className="transition-all duration-200"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="2.5"
                      fill={isActive ? '#10B981' : '#FFFFFF'}
                    />
                    <text
                      x={node.x + 11}
                      y={node.y + 3}
                      fill={isActive ? '#34D399' : '#A1A1AA'}
                      fontSize="6.5"
                      fontFamily="monospace"
                      fontWeight={isActive ? 'bold' : 'normal'}
                    >
                      CAM_0{i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Bar: 4 Channel Buttons (01 Двор, 02 Парковка, 03 Вход, 04 Склад) */}
          <div className="relative z-10 shrink-0 grid grid-cols-4 gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-zinc-800">
            {camNames.map((name, idx) => {
              const active = idx === activeCam;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCam(idx)}
                  className={`flex flex-col rounded-lg border p-1.5 sm:p-2.5 text-left transition-all duration-150 cursor-pointer min-w-0 ${
                    active
                      ? 'border-emerald-500/80 bg-zinc-900 text-white shadow-xs'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 font-bold">
                      0{idx + 1}
                    </span>
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    )}
                  </div>
                  <span className="mt-0.5 truncate font-medium text-[10px] sm:text-xs text-white">
                    {name}
                  </span>
                  <span className="hidden sm:block font-mono text-[9px] text-zinc-500 truncate">
                    {visionMode === 'colorvu'
                      ? 'F1.0 ColorVu'
                      : visionMode === 'ai'
                      ? 'AcuSense AI'
                      : '4K 60fps'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
