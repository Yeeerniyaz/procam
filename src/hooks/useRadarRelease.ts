import { useEffect, useState } from 'react';

export interface RadarReleaseData {
  version: string;
  tag: string;
  releasedAt: string;
  repoUrl: string;
  windowsUrl: string;
  windowsSize: string;
  linuxUrl: string;
  linuxSize: string;
  linuxInstallCmd: string;
  manualUrl: string;
  changelog: string[];
  isLiveFromGit: boolean;
}

const DEFAULT_RELEASE: RadarReleaseData = {
  version: '4.0.0',
  tag: 'v4.0.0',
  releasedAt: '2026-10-30',
  repoUrl: 'https://github.com/Yeeerniyaz/procam-radar',
  windowsUrl: 'https://github.com/Yeeerniyaz/procam-radar/releases/latest/download/ProCamRadar_Windows_x64.exe',
  windowsSize: '7.7 MB',
  linuxUrl: 'https://github.com/Yeeerniyaz/procam-radar/releases/latest/download/ProCamRadar_Linux_x64',
  linuxSize: '7.5 MB',
  linuxInstallCmd:
    'curl -fsSL https://raw.githubusercontent.com/Yeeerniyaz/procam-radar/main/dist/linux/install.sh | sudo bash',
  manualUrl: 'https://raw.githubusercontent.com/Yeeerniyaz/procam-radar/main/PROCAM_RADAR_MANUAL_RU.pdf',
  changelog: [
    'Одновременная работа Кабеля (Ethernet/PoE) и Wi-Fi роутера без потери интернета (/32 маршрутизация)',
    'Подбор свободных IP-адресов с точным выбором количества камер (1, 4, 8, 16, 32, 64 или 1..245)',
    'Прямое открытие камеры по MAC-адресу при конфликте IP (192.168.1.64) без отключения кабелей',
    'Беспарольный паспорт камеры (статус активации, часы ONVIF, порты) и тест кабеля RJ-45 (MTU 1500)',
  ],
  isLiveFromGit: false,
};

export function useRadarRelease(): RadarReleaseData {
  const [release, setRelease] = useState<RadarReleaseData>(DEFAULT_RELEASE);

  useEffect(() => {
    let cancelled = false;

    async function fetchFromGit() {
      try {
        // 1. Fetch release.json from GitHub main branch (always up-to-date metadata)
        const rawRes = await fetch(
          'https://raw.githubusercontent.com/Yeeerniyaz/procam-radar/main/release.json',
          { cache: 'no-store' }
        );
        if (rawRes.ok) {
          const meta = await rawRes.json();
          if (!cancelled && meta && meta.version) {
            setRelease((prev) => ({
              ...prev,
              version: meta.version || prev.version,
              tag: meta.tag || `v${meta.version}`,
              releasedAt: meta.released_at || prev.releasedAt,
              repoUrl: meta.repo_url || prev.repoUrl,
              windowsUrl: meta.windows?.url || prev.windowsUrl,
              windowsSize: meta.windows?.size || prev.windowsSize,
              linuxUrl: meta.linux?.url || prev.linuxUrl,
              linuxSize: meta.linux?.size || prev.linuxSize,
              linuxInstallCmd: meta.linux?.install_cmd || prev.linuxInstallCmd,
              manualUrl: meta.manual?.url || prev.manualUrl,
              changelog: Array.isArray(meta.changelog) ? meta.changelog : prev.changelog,
              isLiveFromGit: true,
            }));
          }
        }

        // 2. Also check GitHub Releases API for latest tag & binary assets
        const apiRes = await fetch(
          'https://api.github.com/repos/Yeeerniyaz/procam-radar/releases/latest'
        );
        if (apiRes.ok) {
          const gh = await apiRes.json();
          if (!cancelled && gh && gh.tag_name) {
            const assets: Array<{ name: string; browser_download_url: string; size: number }> =
              gh.assets || [];
            const winAsset = assets.find((a) => a.name.endsWith('.exe'));
            const linAsset = assets.find((a) => a.name.includes('Linux'));
            const manAsset = assets.find((a) => a.name.endsWith('.pdf'));

            setRelease((prev) => ({
              ...prev,
              tag: gh.tag_name || prev.tag,
              version: (gh.tag_name || prev.tag).replace(/^v/, ''),
              releasedAt: gh.published_at ? gh.published_at.slice(0, 10) : prev.releasedAt,
              windowsUrl: winAsset?.browser_download_url || prev.windowsUrl,
              linuxUrl: linAsset?.browser_download_url || prev.linuxUrl,
              manualUrl: manAsset?.browser_download_url || prev.manualUrl,
              isLiveFromGit: true,
            }));
          }
        }
      } catch {
        // Fallback to local /downloads/ if offline
      }
    }

    fetchFromGit();
    return () => {
      cancelled = true;
    };
  }, []);

  return release;
}
