import { useState } from 'react';
import {
  Activity,
  Bell,
  Cable,
  CheckCircle2,
  HardDrive,
  Network,
  Play,
  ShieldAlert,
  Smartphone,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type MobileTab = 0 | 1 | 2 | 3;

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;
  const sim = a.simulators;

  // Mobile 4-tab switcher (< sm)
  const [mobileTab, setMobileTab] = useState<MobileTab>(0);

  // Cell 1: PoE Test state
  const [poeActive, setPoeActive] = useState(true);

  // Cell 2: Push notification simulation
  const [pushTriggered, setPushTriggered] = useState(false);

  // Cell 3: Storage calculator (4, 8, 16 cameras)
  const [camsCount, setCamsCount] = useState<4 | 8 | 16>(4);

  // Cell 4: Network Diagnostic State
  const [netChecking, setNetChecking] = useState(false);
  const [netChecked, setNetChecked] = useState(true);

  const handleSimulatePush = () => {
    setPushTriggered((prev) => !prev);
  };

  const handleRunNetworkCheck = () => {
    setNetChecking(true);
    setTimeout(() => {
      setNetChecking(false);
      setNetChecked(true);
    }, 650);
  };

  const mobileTabs: { id: MobileTab; label: string }[] = [
    { id: 0, label: 'PoE 48V' },
    { id: 1, label: 'Смартфон 24/7' },
    { id: 2, label: 'Архив H.265+' },
    { id: 3, label: 'Сеть IP' },
  ];

  return (
    <section
      id="advantages"
      className="snap-screen-section bg-architectural-grid border-b border-zinc-200"
    >
      {/* Top Compact Section Bar (h-12 shrink-0) */}
      <div className="h-12 px-4 sm:px-8 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-950 shrink-0">
            02 // ИНЖЕНЕРНЫЕ ПРЕИМУЩЕСТВА
          </span>
          <span className="hidden md:inline-block h-3.5 w-px bg-zinc-200" />
          <span className="hidden md:inline text-xs sm:text-sm font-medium text-zinc-600 truncate">
            {a.title} — {a.subtitle}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase">
            LIVE DIAGNOSTICS
          </span>
        </div>
      </div>

      {/* Mobile 4-Tab Switcher (< sm) to guarantee 0% vertical overflow on phones */}
      <div className="sm:hidden grid grid-cols-4 gap-1 bg-zinc-100 p-1.5 border-b border-zinc-200 shrink-0">
        {mobileTabs.map((tab) => {
          const active = mobileTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMobileTab(tab.id)}
              className={`cursor-pointer rounded-lg py-2 px-1 font-mono text-[10px] font-bold tracking-tight text-center transition ${
                active
                  ? 'bg-zinc-950 text-white shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950 bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Full-Bleed 2x2 Grid (4 Quadrants on sm+, active tab on mobile) */}
      <div className="flex-1 min-h-0 w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 divide-y sm:divide-x divide-zinc-200 bg-white overflow-hidden">
        {/* ============================================================ */}
        {/* QUADRANT 01: PoE IEEE 802.3af 48V Line Tester                */}
        {/* ============================================================ */}
        <div
          className={`${
            mobileTab === 0 ? 'flex' : 'hidden sm:flex'
          } flex-col justify-between p-4 sm:p-5 lg:p-7 xl:p-9 min-h-0 overflow-hidden hover:bg-zinc-50/40 transition-colors`}
        >
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600">01</span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 truncate">
                  {sim.poe.tag}
                </span>
              </div>
              <h3 className="mt-0.5 text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-zinc-950 truncate">
                {sim.poe.title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {sim.poe.desc}
              </p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
              <Cable size={15} />
            </div>
          </div>

          {/* Interactive PoE Live Cable Diagram */}
          <div className="my-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3 sm:p-3.5 text-white font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
              <span className="text-emerald-400 font-bold text-[10px] sm:text-xs flex items-center gap-1.5">
                <Zap size={12} className={poeActive ? 'animate-pulse' : ''} />
                UTP CAT6 COPPER 100M
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-400">
                {poeActive ? 'POWER + DATA ACTIVE' : 'LINE IDLE'}
              </span>
            </div>

            <div className="relative py-1.5 flex items-center justify-between text-[10px] sm:text-[11px]">
              <div className="text-left">
                <span className="block text-zinc-400 text-[9px]">PoE Switch</span>
                <span className="font-semibold text-white">48V DC IN</span>
              </div>

              <div className="flex-1 mx-3 relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                {poeActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 animate-scan-laser opacity-90 rounded-full" />
                )}
              </div>

              <div className="text-right">
                <span className="block text-zinc-400 text-[9px]">4K Camera</span>
                <span className="font-semibold text-emerald-400">9.4W LOAD</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-zinc-800 grid grid-cols-3 gap-1.5 text-center text-[9px] sm:text-[10px]">
              <div>
                <span className="text-zinc-500 block">НАПРЯЖЕНИЕ</span>
                <span className="text-emerald-400 font-bold">
                  {poeActive ? sim.poe.voltage : '0.0 В'}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">СКОРОСТЬ</span>
                <span className="text-white font-bold">
                  {poeActive ? sim.poe.speed : '0 Мбит'}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">ДИСТАНЦИЯ</span>
                <span className="text-white font-bold">{sim.poe.distance}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPoeActive((v) => !v)}
            className="shrink-0 cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2 px-4 font-mono text-[11px] font-semibold text-zinc-900 transition hover:border-zinc-950 active:scale-95 shadow-2xs w-full sm:w-fit"
          >
            <Activity size={13} className="text-emerald-500" />
            <span>{poeActive ? 'ОТКЛЮЧИТЬ ПИТАНИЕ' : sim.poe.btn}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* QUADRANT 02: Smartphone 24/7 & Hik-Connect Instant Push      */}
        {/* ============================================================ */}
        <div
          className={`${
            mobileTab === 1 ? 'flex' : 'hidden sm:flex'
          } flex-col justify-between p-4 sm:p-5 lg:p-7 xl:p-9 min-h-0 overflow-hidden hover:bg-zinc-50/40 transition-colors`}
        >
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600">02</span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 truncate">
                  {sim.push.tag}
                </span>
              </div>
              <h3 className="mt-0.5 text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-zinc-950 truncate">
                {sim.push.title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {sim.push.desc}
              </p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
              <Smartphone size={15} />
            </div>
          </div>

          {/* Push Notification Visualizer */}
          <div className="my-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3 sm:p-3.5 text-white relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2 border-b border-zinc-800 pb-1.5">
              <span>HIK-CONNECT P2P ENGINE</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                LATENCY &lt;50MS
              </span>
            </div>

            {pushTriggered ? (
              <div className="rounded-lg border border-emerald-500/80 bg-zinc-900 p-2.5 shadow-lg">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950">
                    <Bell size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-xs font-bold text-white">
                        {sim.push.alertTitle}
                      </p>
                      <span className="font-mono text-[9px] text-zinc-400 shrink-0">
                        {sim.push.alertTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 truncate">{sim.push.alertZone}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                        <Play size={8} />
                        {sim.push.previewBtn}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-400">P2P 4K STREAM</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-3 text-center text-zinc-400 font-mono text-[11px] flex flex-col items-center justify-center gap-1">
                <ShieldAlert size={18} className="text-emerald-400" />
                <span>Периметр под охраной · Нажмите тест ниже</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSimulatePush}
            className="shrink-0 cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2 px-4 font-mono text-[11px] font-semibold text-zinc-900 transition hover:border-zinc-950 active:scale-95 shadow-2xs w-full sm:w-fit"
          >
            <Bell size={13} className="text-emerald-500" />
            <span>{pushTriggered ? 'СБРОСИТЬ ТРЕВОГУ' : sim.push.btn}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* QUADRANT 03: WD Purple H.265+ Storage Calculator             */}
        {/* ============================================================ */}
        <div
          className={`${
            mobileTab === 2 ? 'flex' : 'hidden sm:flex'
          } flex-col justify-between p-4 sm:p-5 lg:p-7 xl:p-9 min-h-0 overflow-hidden hover:bg-zinc-50/40 transition-colors border-t border-zinc-200`}
        >
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600">03</span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 truncate">
                  {sim.storage.tag}
                </span>
              </div>
              <h3 className="mt-0.5 text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-zinc-950 truncate">
                {sim.storage.title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {sim.storage.desc}
              </p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
              <HardDrive size={15} />
            </div>
          </div>

          {/* Interactive Storage Calculator */}
          <div className="my-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3 sm:p-3.5 text-white font-mono">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1.5 mb-2">
              <span>КАМЕРЫ 4K:</span>
              <div className="flex items-center gap-1">
                {([4, 8, 16] as const).map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setCamsCount(count)}
                    className={`cursor-pointer px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold transition ${
                      camsCount === count
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {count} КАМ
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-zinc-400">H.264 (Старый):</span>
                  <span className="text-red-400 font-bold">100% битрейта</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500/80 w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-zinc-400">H.265+ Smart:</span>
                  <span className="text-emerald-400 font-bold">{sim.storage.saving}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[30%]" />
                </div>
              </div>

              <div className="pt-1.5 border-t border-zinc-800 flex items-center justify-between gap-2 text-[10px]">
                <span className="text-zinc-400 shrink-0">{sim.storage.recommended}</span>
                <span className="font-bold text-white bg-zinc-800 px-2 py-0.5 rounded truncate">
                  {camsCount === 4
                    ? sim.storage.hddSizes.c4
                    : camsCount === 8
                    ? sim.storage.hddSizes.c8
                    : sim.storage.hddSizes.c16}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
            <span className="truncate">WD Purple AllFrame 4K · 24/7 Циклическая запись</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* QUADRANT 04: Isolated Network Architecture                   */}
        {/* ============================================================ */}
        <div
          className={`${
            mobileTab === 3 ? 'flex' : 'hidden sm:flex'
          } flex-col justify-between p-4 sm:p-5 lg:p-7 xl:p-9 min-h-0 overflow-hidden hover:bg-zinc-50/40 transition-colors border-t border-zinc-200`}
        >
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600">04</span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 truncate">
                  {sim.network.tag}
                </span>
              </div>
              <h3 className="mt-0.5 text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-zinc-950 truncate">
                {sim.network.title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {sim.network.desc}
              </p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
              <Network size={15} />
            </div>
          </div>

          {/* Network Terminal Diagnostic Console */}
          <div className="my-auto rounded-xl border border-zinc-200 bg-zinc-950 p-3 sm:p-3.5 text-white font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2 text-[9px] sm:text-[10px] text-zinc-400">
              <span>TERMINAL // STATIC SUBNET</span>
              <span className="text-emerald-400">● IP_V4_SECURE</span>
            </div>

            <div className="space-y-1 text-[10px] sm:text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">NVR GATEWAY:</span>
                <span className="text-white font-bold">{sim.network.nvrIp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CAM SUBNET:</span>
                <span className="text-emerald-400 font-bold">{sim.network.camIps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">PING LATENCY:</span>
                <span className="text-white font-bold">{sim.network.latency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">DHCP CONFLICT:</span>
                <span className="text-emerald-400 font-bold">0% (STATIC LOCK)</span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-zinc-800 text-[9px] sm:text-[10px] text-emerald-400 flex items-center justify-between">
              <span className="truncate">
                {netChecking ? sim.network.testing : sim.network.status}
              </span>
              {netChecked && <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunNetworkCheck}
            disabled={netChecking}
            className="shrink-0 cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2 px-4 font-mono text-[11px] font-semibold text-zinc-900 transition hover:border-zinc-950 active:scale-95 shadow-2xs w-full sm:w-fit"
          >
            <Network size={13} className="text-emerald-500" />
            <span>{netChecking ? sim.network.testing : sim.network.btn}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
