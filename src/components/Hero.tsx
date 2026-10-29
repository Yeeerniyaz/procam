import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell, ShieldCheck, Video } from 'lucide-react';
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
    { x: 35, y: 35, targetX: 112, targetY: 96, path: 'M 35 35 L 150 28 L 72 145 Z' },
    { x: 265, y: 40, targetX: 205, targetY: 82, path: 'M 265 40 L 160 28 L 215 135 Z' },
    { x: 150, y: 162, targetX: 150, targetY: 112, path: 'M 150 162 L 85 88 L 215 88 Z' },
    { x: 38, y: 165, targetX: 96, targetY: 138, path: 'M 38 165 L 38 88 L 135 165 Z' },
  ],
  office: [
    { x: 32, y: 36, targetX: 90, targetY: 82, path: 'M 32 36 L 125 30 L 62 125 Z' },
    { x: 150, y: 30, targetX: 150, targetY: 92, path: 'M 150 30 L 88 122 L 212 122 Z' },
    { x: 268, y: 40, targetX: 215, targetY: 98, path: 'M 268 40 L 178 38 L 222 135 Z' },
    { x: 150, y: 166, targetX: 150, targetY: 120, path: 'M 150 166 L 98 94 L 202 94 Z' },
  ],
  warehouse: [
    { x: 35, y: 35, targetX: 102, targetY: 72, path: 'M 35 35 L 155 28 L 78 135 Z' },
    { x: 265, y: 35, targetX: 202, targetY: 78, path: 'M 265 35 L 152 34 L 212 132 Z' },
    { x: 265, y: 165, targetX: 192, targetY: 128, path: 'M 265 165 L 168 165 L 222 88 Z' },
    { x: 35, y: 165, targetX: 112, targetY: 122, path: 'M 35 165 L 35 88 L 142 165 Z' },
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
    <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-xl overflow-hidden select-none">
      {/* Top Monitor Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-zinc-50/90">
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-pulse shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-950 whitespace-nowrap">
            HIKVISION // NVR_4CH
          </span>
        </div>

        {/* Preset Selector Pills */}
        <div className="flex items-center gap-1 bg-zinc-200/70 p-0.5 rounded-full font-mono text-[10px]">
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
                className={`cursor-pointer rounded-full px-2 sm:px-2.5 py-0.5 font-semibold transition whitespace-nowrap ${
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

        {/* ONLINE badge */}
        <div className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 shrink-0 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
          ● {c.live}
        </div>
      </div>

      {/* Vision Mode Bar + Docked Push Notification Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900 px-3.5 py-2 text-white font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-zinc-300 min-w-0">
          <Video size={13} className="text-emerald-400 shrink-0" />
          <span className="font-bold text-white shrink-0">CAM_0{activeCam + 1}</span>
          <span className="text-zinc-400 truncate">// {camNames[activeCam]}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {(['day', 'colorvu', 'ai'] as VisionMode[]).map((mode) => {
            const active = visionMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setVisionMode(mode)}
                className={`cursor-pointer rounded px-2 py-0.5 font-mono text-[9px] sm:text-[10px] transition whitespace-nowrap ${
                  active
                    ? 'bg-emerald-500 text-zinc-950 font-bold'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {c.visionModes[mode]}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Viewport */}
      <div className="aspect-[16/10] bg-zinc-950 relative overflow-hidden p-4">
        {/* Subtle CAD Coordinate Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"
        />

        {/* ColorVu warm night-color ambient tint */}
        {visionMode === 'colorvu' && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-950/25 via-transparent to-amber-500/10"
          />
        )}

        {/* Docked Hik-Connect Push Notification Pill in Top-Right of Monitor */}
        <div className="
          absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-2
          rounded-full border border-emerald-500/40 bg-zinc-900/95 backdrop-blur-md
          px-3 py-1 text-[10px] font-mono text-emerald-300 shadow-lg max-w-[90%]
        ">
          <Bell size={11} className="text-emerald-400 shrink-0 animate-pulse" />
          <span className="truncate font-semibold">{c.alertTitle}</span>
          <span className="hidden sm:inline text-zinc-500 shrink-0">· {c.alertTime}</span>
        </div>

        {/* Pure Architectural SVG Floorplan */}
        <svg
          className="w-full h-full relative z-10"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Perimeter CAD Frame */}
          <rect
            x="15"
            y="15"
            width="270"
            height="170"
            className="stroke-zinc-800"
            stroke="#27272A"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Layout 01: House / Cottage */}
          {preset === 'house' && (
            <g className="stroke-zinc-800" stroke="#3F3F46" strokeWidth="1.2">
              <rect x="88" y="48" width="124" height="92" fill="#18181B" fillOpacity="0.85" />
              <path d="M 88 86 L 212 86" stroke="#27272A" strokeWidth="1" />
              <path d="M 150 48 L 150 140" stroke="#27272A" strokeWidth="1" />
              <text x="122" y="102" fill="#71717A" fontSize="6.5" fontFamily="monospace">
                RESIDENCE // 240M²
              </text>
              <rect x="135" y="140" width="30" height="12" fill="#27272A" stroke="#52525B" />
              <rect x="220" y="30" width="52" height="52" stroke="#27272A" strokeDasharray="2 2" />
              <text x="229" y="58" fill="#52525B" fontSize="5.5" fontFamily="monospace">
                PARKING
              </text>
              <line x1="120" y1="185" x2="180" y2="185" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />
              <text x="136" y="195" fill="#10B981" fontSize="5.5" fontFamily="monospace">
                GATE_01
              </text>
            </g>
          )}

          {/* Layout 02: Office */}
          {preset === 'office' && (
            <g className="stroke-zinc-800" stroke="#3F3F46" strokeWidth="1.2">
              <rect x="40" y="30" width="220" height="135" fill="#18181B" fillOpacity="0.85" />
              <rect x="108" y="125" width="84" height="40" stroke="#27272A" strokeWidth="1" />
              <text x="122" y="148" fill="#71717A" fontSize="6" fontFamily="monospace">
                RECEPTION // ENTRY
              </text>
              <rect x="40" y="30" width="58" height="46" fill="#27272A" stroke="#10B981" strokeWidth="1" />
              <text x="45" y="55" fill="#10B981" fontSize="5.5" fontFamily="monospace">
                NVR SERVER
              </text>
              <rect x="202" y="30" width="58" height="46" stroke="#27272A" strokeWidth="1" />
              <text x="210" y="55" fill="#71717A" fontSize="5.5" fontFamily="monospace">
                EXEC ROOM
              </text>
              <circle cx="120" cy="78" r="8" stroke="#27272A" strokeDasharray="2 1" />
              <circle cx="150" cy="78" r="8" stroke="#27272A" strokeDasharray="2 1" />
              <circle cx="180" cy="78" r="8" stroke="#27272A" strokeDasharray="2 1" />
              <text x="128" y="98" fill="#52525B" fontSize="6" fontFamily="monospace">
                OPEN_SPACE
              </text>
            </g>
          )}

          {/* Layout 03: Warehouse */}
          {preset === 'warehouse' && (
            <g className="stroke-zinc-800" stroke="#3F3F46" strokeWidth="1.2">
              <rect x="45" y="35" width="210" height="120" fill="#18181B" fillOpacity="0.85" />
              <rect x="58" y="48" width="82" height="15" fill="#27272A" stroke="#3F3F46" />
              <rect x="58" y="73" width="82" height="15" fill="#27272A" stroke="#3F3F46" />
              <rect x="58" y="98" width="82" height="15" fill="#27272A" stroke="#3F3F46" />
              <text x="72" y="58" fill="#71717A" fontSize="5.5" fontFamily="monospace">
                RACK_ZONE_A1
              </text>
              <text x="72" y="83" fill="#71717A" fontSize="5.5" fontFamily="monospace">
                RACK_ZONE_A2
              </text>
              <text x="72" y="108" fill="#71717A" fontSize="5.5" fontFamily="monospace">
                RACK_ZONE_A3
              </text>
              <rect x="178" y="48" width="62" height="34" stroke="#10B981" strokeWidth="0.9" strokeDasharray="3 2" />
              <text x="190" y="68" fill="#10B981" fontSize="5.5" fontFamily="monospace">
                DOCK_01
              </text>
              <rect x="178" y="94" width="62" height="34" stroke="#10B981" strokeWidth="0.9" strokeDasharray="3 2" />
              <text x="190" y="114" fill="#10B981" fontSize="5.5" fontFamily="monospace">
                DOCK_02
              </text>
            </g>
          )}

          {/* Active Camera Wide Animated Emerald Cone */}
          <motion.path
            key={`${preset}-${activeCam}`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            d={activeCoord.path}
            fill="rgba(16, 185, 129, 0.14)"
            stroke="#10B981"
            strokeWidth="1.25"
          />

          {/* Active Telemetry Vector Line */}
          <line
            x1={activeCoord.x}
            y1={activeCoord.y}
            x2={activeCoord.targetX}
            y2={activeCoord.targetY}
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="4 2"
          />

          {/* Live AI Target Lock Box */}
          <g transform={`translate(${activeCoord.targetX - 13}, ${activeCoord.targetY - 13})`}>
            <rect
              x="0"
              y="0"
              width="26"
              height="26"
              fill="rgba(16, 185, 129, 0.14)"
              stroke="#10B981"
              strokeWidth="1.2"
            />
            <path d="M 0 5 L 0 0 L 5 0" stroke="#34D399" strokeWidth="1.6" />
            <path d="M 26 5 L 26 0 L 21 0" stroke="#34D399" strokeWidth="1.6" />
            <path d="M 0 21 L 0 26 L 5 26" stroke="#34D399" strokeWidth="1.6" />
            <path d="M 26 21 L 26 26 L 21 26" stroke="#34D399" strokeWidth="1.6" />

            <rect x="-32" y="-11" width="92" height="8" fill="#10B981" rx="1.5" />
            <text
              x="-29"
              y="-5.5"
              fill="#09090B"
              fontSize="4.2"
              fontWeight="bold"
              fontFamily="monospace"
            >
              AI HUMAN: 99.4% // 4K 2.8mm
            </text>
          </g>

          {/* 4 Clickable Perimeter Camera Nodes */}
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
                  fill={isActive ? 'rgba(16, 185, 129, 0.28)' : 'rgba(24, 24, 27, 0.85)'}
                  stroke={isActive ? '#10B981' : '#71717A'}
                  strokeWidth={isActive ? '1.6' : '1'}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.6"
                  fill={isActive ? '#10B981' : '#FFFFFF'}
                />
                <text
                  x={node.x + 12}
                  y={node.y + 3}
                  fill={isActive ? '#34D399' : '#A1A1AA'}
                  fontSize="6"
                  fontFamily="monospace"
                  fontWeight={isActive ? 'bold' : 'normal'}
                >
                  CAM_0{i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Bottom-Left HUD Telemetry Bar inside Viewport */}
        <div className="absolute bottom-2 left-3 z-20 font-mono text-[9px] sm:text-[10px] text-emerald-400 bg-zinc-950/85 border border-zinc-800 px-2.5 py-0.5 rounded">
          {c.detect}
        </div>
      </div>

      {/* Bottom 4-Channel Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 bg-white border-t border-zinc-200">
        {camNames.map((name, idx) => {
          const active = idx === activeCam;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCam(idx)}
              className={`flex flex-col p-3 text-left transition cursor-pointer ${
                active
                  ? 'bg-zinc-50 text-zinc-950 font-semibold'
                  : 'bg-white text-zinc-600 hover:bg-zinc-50/70 hover:text-zinc-950'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[10px] text-zinc-400">0{idx + 1}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'
                  }`}
                />
              </div>
              <span className="mt-1 truncate text-xs font-medium text-zinc-900">
                0{idx + 1} {name}
              </span>
              <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                {visionMode === 'colorvu' ? 'COLORVU F1.0' : visionMode === 'ai' ? 'AI ACUSENSE' : '4K 2.8mm PoE'}
              </span>
            </button>
          );
        })}
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
      <div className="container-open w-full flex-1 flex flex-col justify-between">
        <div className="my-auto">
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-zinc-700">
              {h.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (7 cols on lg) */}
            <div className="lg:col-span-7">
              <h1 className="text-[32px] sm:text-5xl lg:text-[54px] xl:text-[62px] font-semibold tracking-tight leading-[1.06] text-zinc-950 mb-6">
                {h.title.split(/(IP[\u2011-][^\s]+)/).map((part, i) =>
                  part.startsWith('IP') ? (
                    <span key={i} className="whitespace-nowrap">
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-zinc-600 leading-relaxed mb-8 max-w-2xl">
                {h.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#contacts"
                  className="btn-pill-black justify-center group"
                >
                  <span>{h.primaryCta}</span>
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-outline justify-center"
                >
                  <WhatsAppIcon size={18} className="text-emerald-600 shrink-0" />
                  <span>{h.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols on lg) */}
            <div className="lg:col-span-5">
              <CadRadarCard />
            </div>
          </div>
        </div>

        {/* Full-Width Bottom Spec Bar */}
        <div className="border-t border-zinc-200 pt-8 mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 bg-[#FAFAFA]/80">
          {h.highlights.map((item, idx) => {
            const tags = ['[01 // UHD_OPTICS]', '[02 // NIGHT_COLOR]', '[03 // IEEE_802.3AF]', '[04 // CLOUD_P2P]'];
            return (
              <div key={item.value} className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider truncate">
                    {tags[idx]}
                  </span>
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-950 truncate">
                  {item.value}
                </span>
                <span className="mt-0.5 text-xs sm:text-sm text-zinc-500">
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
