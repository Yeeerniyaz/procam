import { useState } from 'react';
import { Activity, Bell, Cable, CheckCircle2, HardDrive, Network, Play, ShieldAlert, Smartphone, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;
  const sim = a.simulators;

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
    setPushTriggered(true);
    setTimeout(() => {
      // Auto-hide after 5 seconds or keep visible until dismissed
    }, 5000);
  };

  const handleRunNetworkCheck = () => {
    setNetChecking(true);
    setTimeout(() => {
      setNetChecking(false);
      setNetChecked(true);
    }, 800);
  };

  return (
    <section id="advantages" className="min-h-screen flex flex-col justify-center py-16 lg:py-24 border-b border-zinc-200 bg-architectural-grid">
      <div className="container-open w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-zinc-200 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {a.eyebrow}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-zinc-500 uppercase">
                ALMATY SPEC
              </span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
              {a.title}
            </h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            {a.subtitle}
          </p>
        </div>

        {/* 2x2 Open Matrix with 4 Live Interactive Simulators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-zinc-200 bg-white divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 rounded-2xl overflow-hidden shadow-xs">
          {/* ============================================================ */}
          {/* CELL 01: PoE IEEE 802.3af 48V Line Tester */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between hover:bg-zinc-50/40 transition-colors">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-medium tracking-tighter text-zinc-300">
                  01
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    {sim.poe.tag}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Cable size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                  {sim.poe.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {sim.poe.desc}
                </p>
              </div>

              {/* Interactive PoE Live Cable Diagram */}
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-white font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Zap size={13} className={poeActive ? 'animate-pulse' : ''} />
                    UTP CAT6 COPPER 100M
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {poeActive ? 'POWER + DATA ACTIVE' : 'LINE IDLE'}
                  </span>
                </div>

                {/* Animated Cable Line Graphic */}
                <div className="relative py-3 flex items-center justify-between text-[11px]">
                  <div className="text-left">
                    <span className="block text-zinc-400 text-[10px]">PoE Switch</span>
                    <span className="font-semibold text-white">48V DC IN</span>
                  </div>

                  {/* Flow Cable */}
                  <div className="flex-1 mx-4 relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    {poeActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 animate-scan-laser opacity-90 rounded-full" />
                    )}
                  </div>

                  <div className="text-right">
                    <span className="block text-zinc-400 text-[10px]">4K Camera</span>
                    <span className="font-semibold text-emerald-400">9.4W LOAD</span>
                  </div>
                </div>

                {/* Telemetry Metrics Row */}
                <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px]">
                  <div>
                    <span className="text-zinc-500 block">НАПРЯЖЕНИЕ</span>
                    <span className="text-emerald-400 font-bold">{poeActive ? sim.poe.voltage : '0.0 В'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">СКОРОСТЬ</span>
                    <span className="text-white font-bold">{poeActive ? sim.poe.speed : '0 Мбит'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">ДИСТАНЦИЯ</span>
                    <span className="text-white font-bold">{sim.poe.distance}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPoeActive((v) => !v)}
              className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2.5 px-5 font-mono text-xs font-semibold text-zinc-900 transition hover:border-zinc-950 active:scale-95 shadow-xs"
            >
              <Activity size={14} className="text-emerald-500" />
              <span>{poeActive ? 'ОТКЛЮЧИТЬ ПИТАНИЕ' : sim.poe.btn}</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* CELL 02: Smartphone 24/7 & Hik-Connect Instant Push */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between hover:bg-zinc-50/40 transition-colors">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-medium tracking-tighter text-zinc-300">
                  02
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    {sim.push.tag}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Smartphone size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                  {sim.push.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {sim.push.desc}
                </p>
              </div>

              {/* Push Notification Visualizer */}
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-900 p-4 text-white relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2 border-b border-zinc-800 pb-2">
                  <span>HIK-CONNECT P2P ENGINE</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LATENCY &lt;50MS
                  </span>
                </div>

                {pushTriggered ? (
                  <div className="rounded-lg border border-emerald-500/80 bg-zinc-950 p-3 shadow-lg animate-bounce">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950">
                        <Bell size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="truncate text-xs font-bold text-white">
                            {sim.push.alertTitle}
                          </p>
                          <span className="font-mono text-[9px] text-zinc-400">
                            {sim.push.alertTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-0.5">
                          {sim.push.alertZone}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                            <Play size={9} />
                            {sim.push.previewBtn}
                          </span>
                          <span className="font-mono text-[9px] text-zinc-400">P2P HD 4K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center gap-1.5">
                    <ShieldAlert size={20} className="text-zinc-600" />
                    <span>Система в режиме охраны · Нажмите кнопку ниже для теста</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSimulatePush}
              className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2.5 px-5 font-mono text-xs font-semibold text-zinc-900 transition hover:border-zinc-950 active:scale-95 shadow-xs"
            >
              <Bell size={14} className="text-emerald-500" />
              <span>{sim.push.btn}</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* CELL 03: WD Purple H.265+ Storage Calculator */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between hover:bg-zinc-50/40 transition-colors border-t lg:border-t-0 border-zinc-200">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-medium tracking-tighter text-zinc-300">
                  03
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    {sim.storage.tag}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                    <HardDrive size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                  {sim.storage.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {sim.storage.desc}
                </p>
              </div>

              {/* Calculator interactive selector */}
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-white font-mono">
                <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2 mb-3">
                  <span>КОЛИЧЕСТВО КАМЕР 4K:</span>
                  <div className="flex items-center gap-1">
                    {([4, 8, 16] as const).map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setCamsCount(count)}
                        className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-bold transition ${
                          camsCount === count
                            ? 'bg-emerald-500 text-zinc-950'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {count} КАМЕР
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Result Telemetry */}
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-zinc-400">H.264 (Старый кодек):</span>
                      <span className="text-red-400 font-bold">100% объема (перегрузка)</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500/80 w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-zinc-400">H.265+ (Smart Codec):</span>
                      <span className="text-emerald-400 font-bold">{sim.storage.saving}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[30%]" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">{sim.storage.recommended}</span>
                    <span className="font-bold text-white text-xs bg-zinc-800 px-2.5 py-1 rounded">
                      {camsCount === 4
                        ? sim.storage.hddSizes.c4
                        : camsCount === 8
                        ? sim.storage.hddSizes.c8
                        : sim.storage.hddSizes.c16}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-zinc-500">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>WD Purple AllFrame 4K · 24/7 Циклическая запись</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CELL 04: Isolated Network Architecture */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between hover:bg-zinc-50/40 transition-colors border-t border-zinc-200">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-4xl sm:text-5xl font-medium tracking-tighter text-zinc-300">
                  04
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400">
                    {sim.network.tag}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Network size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                  {sim.network.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {sim.network.desc}
                </p>
              </div>

              {/* Network Terminal Diagnostic Console */}
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-white font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-[10px] text-zinc-400">
                  <span>TERMINAL // STATIC SUBNET DIAGNOSTICS</span>
                  <span className="text-emerald-400">● IP_V4_SECURE</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
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
                    <span className="text-emerald-400 font-bold">0% (LOCKED STATIC)</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800 text-[10px] text-emerald-400 flex items-center justify-between">
                  <span>{netChecking ? sim.network.testing : sim.network.status}</span>
                  {netChecked && <CheckCircle2 size={12} className="text-emerald-400" />}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunNetworkCheck}
              disabled={netChecking}
              className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2.5 px-5 font-mono text-xs font-semibold text-zinc-900 transition hover:border-zinc-950 active:scale-95 shadow-xs"
            >
              <Network size={14} className="text-emerald-500" />
              <span>{netChecking ? sim.network.testing : sim.network.btn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
