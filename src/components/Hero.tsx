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
  path: string; // cone SVG path
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

function CadRadarCard() {
  const { t } = useLanguage();
  const c = t.hero.cad;

  const [preset, setPreset] = useState<PresetKey>('house');
  const [activeCam, setActiveCam] = useState<number>(0);
  const [visionMode, setVisionMode] = useState<VisionMode>('day');

  const camNames = c.cams[preset] || c.cams.house;
  const cams = PRESET_CAM_DATA[preset];
  const activeCoord = cams[activeCam] || cams[0];

  return (
    <div className="relative mx-auto w-full select-none">
      {/* Sleek Hardware Monitor Bezel */}
      <div className="relative rounded-2xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-950/5 overflow-hidden">
        {/* Monitor Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/90 px-3.5 py-2.5 sm:px-5 sm:py-3 bg-zinc-50/80">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-900 truncate">
              HIKVISION // NVR_4CH
            </span>
          </div>

          {/* Preset Selector Chips */}
          <div className="flex items-center gap-1 bg-zinc-200/60 p-0.5 rounded-full font-mono text-[10px] sm:text-[11px]">
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
                  className={`cursor-pointer rounded-full px-2 sm:px-2.5 py-0.5 font-medium transition ${
                    active
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {c.presets[key]}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {c.live.toUpperCase()}
          </div>
        </div>

        {/* Vision Mode Sub-Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-3 sm:px-5 py-2 text-white font-mono text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Video size={13} className="text-emerald-400 shrink-0" />
            <span className="text-zinc-300 font-semibold">[CAM_0{activeCam + 1}]</span>
            <span className="truncate">{camNames[activeCam]}</span>
          </div>

          <div className="flex items-center gap-1">
            {(['day', 'colorvu', 'ai'] as VisionMode[]).map((mode) => {
              const active = visionMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setVisionMode(mode)}
                  className={`cursor-pointer rounded px-2 py-0.5 font-mono text-[9px] sm:text-[10px] transition ${
                    active
                      ? 'bg-emerald-500 text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
                  }`}
                >
                  {c.visionModes[mode]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport: Architectural SVG Floorplan */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
          {/* Subtle architectural CAD grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"
          />

          {/* ColorVu night enhancement overlay */}
          {visionMode === 'colorvu' && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-amber-950/10 mix-blend-screen opacity-70"
            />
          )}

          {/* Pure SVG CAD Drawing */}
          <svg
            className="w-full h-full"
            viewBox="0 0 300 200"
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
              <g id="layout-house" stroke="#3F3F46" strokeWidth="1.2">
                {/* Main House Footprint */}
                <rect x="90" y="50" width="120" height="90" fill="#18181B" fillOpacity="0.8" />
                <path d="M 90 85 L 210 85" stroke="#52525B" strokeWidth="0.8" />
                <path d="M 150 50 L 150 140" stroke="#52525B" strokeWidth="0.8" />
                <text x="125" y="100" fill="#71717A" fontSize="7" fontFamily="monospace">КОТТЕДЖ</text>
                
                {/* Front Entrance & Porch */}
                <rect x="135" y="140" width="30" height="12" fill="#27272A" stroke="#52525B" />
                
                {/* Driveway / Parking */}
                <rect x="220" y="30" width="55" height="50" stroke="#27272A" strokeDasharray="2 2" />
                <text x="230" y="55" fill="#52525B" fontSize="6" fontFamily="monospace">ПАРКОВКА</text>

                {/* Front Gate */}
                <line x1="120" y1="185" x2="180" y2="185" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
                <text x="135" y="195" fill="#10B981" fontSize="6" fontFamily="monospace">ВОРОТА</text>
              </g>
            )}

            {/* Architectural Layout: Office */}
            {preset === 'office' && (
              <g id="layout-office" stroke="#3F3F46" strokeWidth="1.2">
                {/* Office Perimeter walls */}
                <rect x="40" y="30" width="220" height="135" fill="#18181B" fillOpacity="0.8" />
                
                {/* Reception Area */}
                <rect x="110" y="125" width="80" height="40" stroke="#52525B" strokeWidth="0.8" />
                <text x="132" y="145" fill="#71717A" fontSize="6" fontFamily="monospace">РЕResource / ВХОД</text>

                {/* Server Room */}
                <rect x="40" y="30" width="55" height="45" fill="#27272A" stroke="#10B981" strokeWidth="1" />
                <text x="45" y="55" fill="#10B981" fontSize="6" fontFamily="monospace">СЕРВЕРНАЯ</text>

                {/* Meeting Room */}
                <rect x="205" y="30" width="55" height="45" stroke="#52525B" strokeWidth="0.8" />
                <text x="212" y="55" fill="#71717A" fontSize="6" fontFamily="monospace">МИКРО-ОФИС</text>

                {/* Desks Area */}
                <circle cx="120" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                <circle cx="150" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                <circle cx="180" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                <text x="135" y="95" fill="#52525B" fontSize="6" fontFamily="monospace">OPEN-SPACE</text>
              </g>
            )}

            {/* Architectural Layout: Warehouse */}
            {preset === 'warehouse' && (
              <g id="layout-warehouse" stroke="#3F3F46" strokeWidth="1.2">
                {/* Main High-Bay Storage Zone */}
                <rect x="45" y="35" width="210" height="120" fill="#18181B" fillOpacity="0.8" />
                
                {/* Storage Racks A1-A3 */}
                <rect x="60" y="50" width="80" height="15" fill="#27272A" stroke="#52525B" />
                <rect x="60" y="75" width="80" height="15" fill="#27272A" stroke="#52525B" />
                <rect x="60" y="100" width="80" height="15" fill="#27272A" stroke="#52525B" />
                <text x="75" y="60" fill="#71717A" fontSize="6" fontFamily="monospace">СТЕЛЛАЖИ А-1</text>
                <text x="75" y="85" fill="#71717A" fontSize="6" fontFamily="monospace">СТЕЛЛАЖИ А-2</text>
                <text x="75" y="110" fill="#71717A" fontSize="6" fontFamily="monospace">СТЕЛЛАЖИ А-3</text>

                {/* Loading Docks */}
                <rect x="180" y="50" width="60" height="35" stroke="#10B981" strokeWidth="0.8" strokeDasharray="3 2" />
                <text x="188" y="70" fill="#10B981" fontSize="6" fontFamily="monospace">РАМПА 01</text>
                <rect x="180" y="95" width="60" height="35" stroke="#10B981" strokeWidth="0.8" strokeDasharray="3 2" />
                <text x="188" y="115" fill="#10B981" fontSize="6" fontFamily="monospace">РАМПА 02</text>

                {/* Guard Gate / CP */}
                <rect x="15" y="150" width="25" height="25" fill="#27272A" stroke="#52525B" />
                <text x="18" y="165" fill="#71717A" fontSize="5" fontFamily="monospace">КПП</text>
              </g>
            )}

            {/* Active Optical Field of View (Emerald Beam Cone) */}
            <path
              d={activeCoord.path}
              fill="rgba(16, 185, 129, 0.16)"
              stroke="#10B981"
              strokeWidth="1.2"
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
                fill="rgba(16, 185, 129, 0.1)"
                stroke="#10B981"
                strokeWidth="1.2"
              />
              <path d="M 0 4 L 0 0 L 4 0" stroke="#34D399" strokeWidth="1.5" />
              <path d="M 24 4 L 24 0 L 20 0" stroke="#34D399" strokeWidth="1.5" />
              <path d="M 0 20 L 0 24 L 4 24" stroke="#34D399" strokeWidth="1.5" />
              <path d="M 24 20 L 24 24 L 20 24" stroke="#34D399" strokeWidth="1.5" />

              {/* Tag text above lock box */}
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
                  className="cursor-pointer group"
                >
                  {/* Outer Click Radius */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 10 : 8}
                    fill={isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(39, 39, 42, 0.6)'}
                    stroke={isActive ? '#10B981' : '#71717A'}
                    strokeWidth={isActive ? '1.5' : '1'}
                    className="transition-all duration-200"
                  />
                  {/* Center Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="2.5"
                    fill={isActive ? '#10B981' : '#FFFFFF'}
                  />
                  {/* Label */}
                  <text
                    x={node.x + 11}
                    y={node.y + 3}
                    fill={isActive ? '#34D399' : '#A1A1AA'}
                    fontSize="6"
                    fontFamily="monospace"
                    fontWeight={isActive ? 'bold' : 'normal'}
                  >
                    0{i + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Docked Push Notification Toast inside monitor canvas */}
          <div className="absolute top-2.5 right-2.5 max-w-[210px] sm:max-w-[240px] z-20 rounded-lg border border-zinc-800 bg-zinc-950/90 backdrop-blur-md p-2 text-white shadow-xl">
            <div className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-zinc-800 text-emerald-400">
                <Eye size={13} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] font-semibold text-white">
                    {c.alertTitle}
                  </p>
                  <span className="font-mono text-[9px] text-zinc-400 shrink-0">
                    {c.alertTime}
                  </span>
                </div>
                <p className="truncate text-[9px] text-zinc-400">
                  {camNames[activeCam]} · {c.alertPlace}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Channel Bar (Switches activeCam on click) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 border-t border-zinc-200 bg-white text-xs">
          {camNames.map((name, idx) => {
            const active = idx === activeCam;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCam(idx)}
                className={`flex flex-col p-2.5 sm:p-3 text-left transition-all duration-150 cursor-pointer ${
                  active
                    ? 'bg-zinc-50 font-semibold text-zinc-950 shadow-inner'
                    : 'text-zinc-600 hover:bg-zinc-50/60 hover:text-zinc-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400">0{idx + 1}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                </div>
                <span className="mt-1 truncate font-medium text-zinc-900 text-[11px] sm:text-xs">
                  {name}
                </span>
                <span className="font-mono text-[9px] text-zinc-400">
                  {visionMode === 'colorvu' ? 'F1.0 4K' : visionMode === 'ai' ? 'AcuSense' : '4K UHD'}
                </span>
              </button>
            );
          })}
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
      id="top"
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-10 sm:py-16 lg:py-20 border-b border-zinc-200 bg-architectural-grid"
    >
      <div className="container-open w-full flex-1 flex flex-col justify-center">
        {/* Top Status Monospace Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 shadow-xs max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-zinc-700 truncate">
            {h.badge}
          </span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column (7 cols): Editorial Headline + CTAs */}
          <div className="lg:col-span-7">
            <h1 className="text-[32px] sm:text-5xl lg:text-[54px] xl:text-[62px] font-semibold tracking-tight leading-[1.06] text-zinc-950 mb-6 text-balance">
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

            <p className="text-base sm:text-lg lg:text-xl text-zinc-600 font-normal leading-relaxed mb-8 max-w-2xl text-pretty">
              {h.subtitle}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#contacts"
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

          {/* Right Column (5 cols): Interactive CAD Floorplan Radar */}
          <div className="lg:col-span-5 lg:pl-2">
            <CadRadarCard />
          </div>
        </div>

        {/* Full-Width Bottom Spec Bar across all 12 columns */}
        <div className="border-t border-zinc-200 pt-8 mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 bg-[#FAFAFA]/80">
          {h.highlights.map((item, idx) => {
            const hudLabels = ['[RES_4K_60FPS]', '[F1.0_COLORVU]', '[POE_IEEE_802.3AF]', '[APP_HIK_CONNECT]'];
            return (
              <div key={item.value} className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider truncate">
                    {hudLabels[idx] || `[SPEC_0${idx + 1}]`}
                  </span>
                </div>
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
