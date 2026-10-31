#!/usr/bin/env bash
# ==============================================================================
# ProCam VMS v4.1 — Автоматический установщик для Linux (Ubuntu / Debian / Arch)
# Устанавливает ProCamViewer_Linux_x64, системную иконку и .desktop ярлык
# ==============================================================================
set -euo pipefail

SITE_BASE="https://procam.yeee.kz/downloads"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-.}")" 2>/dev/null && pwd || pwd)"

echo "================================================================"
echo "  Установка ProCam VMS v4.1 (Engineering CCTV Suite for Linux)  "
echo "================================================================"

if [[ $EUID -ne 0 ]]; then
  echo "[!] Запустите установщик с правами администратора: sudo bash install-vms.sh"
  exit 1
fi

install -d /usr/local/bin \
  /usr/share/pixmaps \
  /usr/share/icons/hicolor/256x256/apps \
  /usr/share/applications

# 1. Бинарный файл VMS
if [[ -f "${SCRIPT_DIR}/ProCamViewer_Linux_x64" ]]; then
  install -m 0755 "${SCRIPT_DIR}/ProCamViewer_Linux_x64" /usr/local/bin/ProCamViewer_Linux_x64
else
  echo "[1/3] Скачивание ProCamViewer_Linux_x64..."
  curl -fsSL "${SITE_BASE}/ProCamViewer_Linux_x64" -o /usr/local/bin/ProCamViewer_Linux_x64
  chmod 0755 /usr/local/bin/ProCamViewer_Linux_x64
fi

ln -sf /usr/local/bin/ProCamViewer_Linux_x64 /usr/local/bin/procam-vms
ln -sf /usr/local/bin/ProCamViewer_Linux_x64 /usr/local/bin/procam-viewer

# 2. Иконка
if [[ -f "${SCRIPT_DIR}/procam-viewer.png" ]]; then
  install -m 0644 "${SCRIPT_DIR}/procam-viewer.png" /usr/share/pixmaps/procam-vms.png
  install -m 0644 "${SCRIPT_DIR}/procam-viewer.png" /usr/share/icons/hicolor/256x256/apps/procam-vms.png
else
  echo "[2/3] Скачивание иконки procam-viewer.png..."
  curl -fsSL "${SITE_BASE}/procam-viewer.png" -o /usr/share/pixmaps/procam-vms.png || true
  cp -f /usr/share/pixmaps/procam-vms.png /usr/share/icons/hicolor/256x256/apps/procam-vms.png 2>/dev/null || true
fi
gtk-update-icon-cache -f -t /usr/share/icons/hicolor 2>/dev/null || true

# 3. Ярлык запуска в системном меню приложений
cat > /usr/share/applications/procam-vms.desktop << 'EOF'
[Desktop Entry]
Version=4.1
Type=Application
Name=ProCam VMS
GenericName=Станция видеонаблюдения и архив NVR
Comment=Профессиональная станция видеомониторинга, прямой архив NVR и экспорт FFmpeg
Exec=/usr/local/bin/ProCamViewer_Linux_x64
Icon=/usr/share/pixmaps/procam-vms.png
Terminal=false
Categories=AudioVideo;Video;Network;Utility;Security;
StartupWMClass=ProCamViewer
EOF
chmod 0644 /usr/share/applications/procam-vms.desktop

echo "================================================================"
echo "  ✔ ProCam VMS v4.1 успешно установлен в систему!"
echo "  Запуск из меню приложений или командой в терминале: procam-vms"
echo "================================================================"
