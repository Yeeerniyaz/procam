import { useEffect, useState } from 'react';

export interface VmsReleaseData {
  version: string;
  tag: string;
  releasedAt: string;
  windowsUrl: string;
  windowsSize: string;
  linuxUrl: string;
  linuxSize: string;
  linuxInstallCmd: string;
  manualUrl: string;
  changelog: string[];
}

const DEFAULT_VMS_RELEASE: VmsReleaseData = {
  version: '4.1.0',
  tag: 'v4.1.0',
  releasedAt: '2026-11-01',
  windowsUrl: '/downloads/ProCamViewer_Windows_x64.exe',
  windowsSize: '9.0 MB',
  linuxUrl: '/downloads/ProCamViewer_Linux_x64',
  linuxSize: '8.7 MB',
  linuxInstallCmd: 'curl -fsSL https://procam.yeee.kz/downloads/install-vms.sh | sudo bash',
  manualUrl: '/downloads/PROCAM_VIEWER_MANUAL_RU.pdf',
  changelog: [
    'Многоканальная видеостена реального времени (сетки 1×1, 2×2, 3×3, 4×4)',
    'Мгновенный выбор Main Stream / Sub Stream по каждой ячейке',
    'Прямой доступ к архиву NVR регистратора, синхронный таймлайн и календарь записей',
    'Пакетный экспорт доказательной базы в MP4 через встроенный движок FFmpeg',
    'Инженерная диагностика потоков, кодеков H.265+/H.264 и RTSP-параметров',
  ],
};

export function useVmsRelease(): VmsReleaseData {
  const [release, setRelease] = useState<VmsReleaseData>(DEFAULT_VMS_RELEASE);

  useEffect(() => {
    let cancelled = false;

    async function fetchRelease() {
      try {
        const res = await fetch('/downloads/release-vms.json', { cache: 'no-store' });
        if (res.ok) {
          const meta = await res.json();
          if (!cancelled && meta && meta.version) {
            setRelease((prev) => ({
              ...prev,
              version: meta.version || prev.version,
              tag: meta.tag || `v${meta.version}`,
              releasedAt: meta.released_at || prev.releasedAt,
              windowsUrl: meta.windows?.url || prev.windowsUrl,
              windowsSize: meta.windows?.size || prev.windowsSize,
              linuxUrl: meta.linux?.url || prev.linuxUrl,
              linuxSize: meta.linux?.size || prev.linuxSize,
              linuxInstallCmd: meta.linux?.install_cmd || prev.linuxInstallCmd,
              manualUrl: meta.manual?.url || prev.manualUrl,
              changelog: Array.isArray(meta.changelog) ? meta.changelog : prev.changelog,
            }));
          }
        }
      } catch (e) {
        // Fallback to default
      }
    }

    fetchRelease();
    return () => {
      cancelled = true;
    };
  }, []);

  return release;
}
