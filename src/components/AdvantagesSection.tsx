import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Bell,
  Cable,
  CheckCircle2,
  HardDrive,
  Network,
  Play,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;
  const sim = a.simulators;

  // Cell 01: PoE 48V Line Test
  const [poeTesting, setPoeTesting] = useState(true);

  // Cell 02: Hik-Connect Live Push Intrusion Simulation
  const [intrusionPulse, setIntrusionPulse] = useState(true);
  const [pulseCount, setPulseCount] = useState(1);

  // Cell 03: WD Purple H.265+ Storage Calculator
  const [camsCount, setCamsCount] = useState<4 | 8 | 16>(4);

  // Cell 04: Static IP & Subnet Diagnostic Terminal
  const [netScanning, setNetScanning] = useState(false);

  const handleSimulateIntrusion = () => {
    setIntrusionPulse(false);
    setTimeout(() => {
      setIntrusionPulse(true);
      setPulseCount((c) => c + 1);
    }, 80);
  };

  const handleNetworkScan = () => {
    setNetScanning(true);
    setTimeout(() => {
      setNetScanning(false);
    }, 650);
  };

  return (
    <section
      id="advantages"
      className="min-h-screen flex flex-col justify-center py-16 lg:py-24 border-b border-zinc-200 bg-architectural-grid"
    >
      <div className="container-open w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-zinc-200 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {a.eyebrow}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs uppercase text-zinc-500">
                LIVE TELEMETRY LAB
              </span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
              {a.title}
            </h2>
          </div>

          <p className="max-w-xl text-sm sm:text-base lg:text-lg text-zinc-600 leading-relaxed">
            {a.subtitle}
          </p>
        </div>

        {/* 2x2 Open Matrix with a middle horizontal border */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-zinc-200 bg-white divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 rounded-2xl overflow-hidden shadow-xs">
          {/* ============================================================ */}
          {/* CELL 01: Чистый монтаж по PoE (IEEE 802.3af/at)               */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-300">
                  01
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs text-zinc-400">
                    {sim.poe.tag}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                    <Cable size={16} />
                  </span>
                </div>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {sim.poe.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {sim.poe.desc}
              </p>

              {/* Animated Single UTP Cat6 Cable Graphic */}
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-white font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px]">
                    <Zap size={13} className={poeTesting ? 'animate-pulse text-emerald-400' : 'text-zinc-500'} />
                    UTP CAT6 SINGLE CABLE // 100m
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {poeTesting ? 'IEEE 802.3af/at ONLINE' : 'STANDBY'}
                  </span>
                </div>

                {/* Single Cable Transmission Bar */}
                <div className="py-2">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5">
                    <span>[PoE SWITCH 48V]</span>
                    <span className="text-emerald-300 font-semibold">
                      {poeTesting ? '⚡ 48.2V DC Power + 🌐 1000 Mbps Video Stream' : 'LINE PAUSED'}
                    </span>
                    <span>[4K CAM]</span>
                  </div>

                  <div className="relative h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                    {poeTesting && (
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                      />
                    )}
                  </div>
                </div>

                {/* Telemetry Readout */}
                <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px]">
                  <div className="rounded-lg bg-zinc-900 p-2">
                    <span className="text-zinc-500 block">DC POWER</span>
                    <span className="text-emerald-400 font-bold">
                      {poeTesting ? '⚡ 48.2V DC' : '0.0V'}
                    </span>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-2">
                    <span className="text-zinc-500 block">STREAM</span>
                    <span className="text-white font-bold">
                      {poeTesting ? '🌐 1000 Mbps' : '0 Mbps'}
                    </span>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-2">
                    <span className="text-zinc-500 block">220V SOCKETS</span>
                    <span className="text-emerald-400 font-bold">0 (100m Cat6)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPoeTesting((v) => !v)}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-5 py-2.5 font-mono text-xs font-semibold transition whitespace-nowrap"
              >
                <Activity size={14} className="text-emerald-400" />
                <span>[ {sim.poe.btn} ]</span>
              </button>
              <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                {sim.poe.status}
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CELL 02: Смартфон 24/7 (Hik-Connect Live Push)               */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-300">
                  02
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs text-zinc-400">
                    {sim.push.tag}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                    <Smartphone size={16} />
                  </span>
                </div>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {sim.push.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {sim.push.desc}
              </p>

              {/* Live Push Banner Simulator */}
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-white">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-pulse" />
                    ACUSENSE AI TARGET LOCK
                  </span>
                  <span className="text-emerald-400">EVENT #{pulseCount} · P2P CLOUD</span>
                </div>

                <AnimatePresence mode="wait">
                  {intrusionPulse && (
                    <motion.div
                      key={pulseCount}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="rounded-xl border border-emerald-500/50 bg-zinc-900 p-3.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
                          <Bell size={16} />
                          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#EF4444] animate-ping" />
                          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-white truncate">
                              {sim.push.alertTitle}
                            </span>
                            <span className="font-mono text-[10px] text-emerald-400 shrink-0">
                              {sim.push.alertTime}
                            </span>
                          </div>
                          <p className="mt-1 font-mono text-[11px] text-zinc-400 truncate">
                            {sim.push.alertZone}
                          </p>
                          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-zinc-950 px-2.5 py-1.5 border border-zinc-800">
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
                              <Play size={10} className="fill-emerald-400 text-emerald-400" />
                              {sim.push.previewBtn}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-500">
                              00:15 4K HEVC
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSimulateIntrusion}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-5 py-2.5 font-mono text-xs font-semibold transition whitespace-nowrap"
              >
                <Bell size={14} className="text-emerald-400" />
                <span>[ {sim.push.btn} ]</span>
              </button>
              <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                iOS &amp; ANDROID PUSH &lt; 0.5s
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CELL 03: Видеоархив WD Purple (H.265+ Storage Calculator)    */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-white border-t border-zinc-200">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-300">
                  03
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs text-zinc-400">
                    {sim.storage.tag}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                    <HardDrive size={16} />
                  </span>
                </div>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {sim.storage.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {sim.storage.desc}
              </p>

              {/* Camera Selector + H.265+ Calculator */}
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-white font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-3">
                  <span className="text-[10px] text-zinc-400">ВЫБЕРИТЕ КАМЕРЫ:</span>
                  <div className="flex items-center gap-1.5">
                    {(
                      [
                        { count: 4, label: sim.storage.cams4 },
                        { count: 8, label: sim.storage.cams8 },
                        { count: 16, label: sim.storage.cams16 },
                      ] as const
                    ).map((item) => {
                      const active = camsCount === item.count;
                      return (
                        <button
                          key={item.count}
                          type="button"
                          onClick={() => setCamsCount(item.count)}
                          className={`cursor-pointer rounded-md px-2.5 py-1 text-[10px] font-bold transition whitespace-nowrap ${
                            active
                              ? 'bg-emerald-500 text-zinc-950'
                              : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                          }`}
                        >
                          [ {item.label} ]
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Экономия битрейта:</span>
                    <span className="text-emerald-400 font-bold">{sim.storage.saving}</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{
                        width: camsCount === 4 ? '35%' : camsCount === 8 ? '65%' : '95%',
                      }}
                    />
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-zinc-400">{sim.storage.recommended}</span>
                    <span className="rounded bg-zinc-900 border border-emerald-500/40 px-2.5 py-1 text-emerald-300 font-bold">
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
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>WD Purple AllFrame 4K · Непрерывная запись 24/7</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CELL 04: Изолированная сетевая архитектура (Static IP)       */}
          {/* ============================================================ */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-white border-t border-zinc-200">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-3xl sm:text-4xl font-medium tracking-tighter text-zinc-300">
                  04
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] sm:text-xs text-zinc-400">
                    {sim.network.tag}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                    <Network size={16} />
                  </span>
                </div>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                {sim.network.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {sim.network.desc}
              </p>

              {/* Static IP & Subnet Diagnostic Terminal */}
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-white font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2.5 text-[10px] text-zinc-400">
                  <span>SUBNET DIAGNOSTIC TERMINAL</span>
                  <span className="text-emerald-400">● ARP_LOCKED</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">CORE HOST:</span>
                    <span className="text-white font-bold">{sim.network.nvrIp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">STATIC POOL:</span>
                    <span className="text-emerald-400 font-bold">{sim.network.camIps}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">PING LATENCY:</span>
                    <span className="text-white font-bold">Latency: {sim.network.latency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">PROTOCOLS:</span>
                    <span className="text-emerald-400 font-bold">{sim.network.status}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-emerald-400">
                  <span>
                    {netScanning ? sim.network.testing : '0 PACKET LOSS // SUBNET ISOLATED'}
                  </span>
                  <ShieldCheck size={13} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleNetworkScan}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-5 py-2.5 font-mono text-xs font-semibold transition whitespace-nowrap"
              >
                <Network size={14} className="text-emerald-400" />
                <span>[ {netScanning ? sim.network.testing : sim.network.btn} ]</span>
              </button>
              <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                STATIC IPv4 // NO DHCP DROP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
