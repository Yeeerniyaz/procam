import { useState, useEffect } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Cable,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Film,
  HardDrive,
  Layers,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Wifi,
} from 'lucide-react';
import { useRadarRelease } from '../hooks/useRadarRelease';
import { useVmsRelease } from '../hooks/useVmsRelease';
import { useLanguage } from '../i18n/LanguageContext';
import Footer from './Footer';

interface ProgramsPageProps {
  onBackHome: () => void;
  initialTab?: 'vms' | 'radar';
}

/* ------------------------------------------------------------------ */
/* SCREENSHOTS DATA                                                   */
/* ------------------------------------------------------------------ */

const VMS_SCREENSHOTS = [
  {
    id: 'live',
    label: '1. Мультиэкранная матрица (1×1..4×4)',
    src: '/screenshots/procam-vms-live.png',
    caption:
      'Многоканальная видеостена в реальном времени с поддержкой до 16 камер. Мгновенное переключение Main/Sub потоков для оптимизации нагрузки на CPU.',
  },
  {
    id: 'playback',
    label: '2. Прямой архив NVR и таймлайн',
    src: '/screenshots/procam-vms-playback.png',
    caption:
      'Чтение записей напрямую с жесткого диска регистратора (NVR), покадровая синхронизация, выбор дат и пакетный экспорт в MP4 через FFmpeg.',
  },
  {
    id: 'devices',
    label: '3. Диспетчер устройств и RTSP',
    src: '/screenshots/procam-vms-devices.png',
    caption:
      'Сетевое сканирование камер, проверка кодеков H.265+/H.264, сетевого отклика (ping), портов 554/80/8000 и мгновенное копирование RTSP-ссылок.',
  },
] as const;

const RADAR_SCREENSHOTS = [
  {
    id: 'main',
    label: '1. Главный экран (Кабель + Wi-Fi)',
    src: '/screenshots/procam-radar-main.png',
    caption:
      'Одновременный поиск камер по кабелю Ethernet (PoE) и Wi-Fi роутеру без обрыва интернета (/32 маршрутизация).',
  },
  {
    id: 'free',
    label: '2. Подбор свободных IP (1..245)',
    src: '/screenshots/procam-radar-free-ip.png',
    caption:
      'Выбор точного количества свободных IP-адресов (1, 4, 8, 16, 32, 64 или вручную) с проверкой всей подсети.',
  },
  {
    id: 'cable',
    label: '3. Паспорт камеры и тест кабеля',
    src: '/screenshots/procam-radar-cable-diag.png',
    caption:
      'Беспарольный опрос серийного номера, статуса активации и стресс-тест кабеля RJ-45 пакетами 64B и 1472B (MTU 1500).',
  },
] as const;

/* ------------------------------------------------------------------ */
/* VMS FEATURES                                                       */
/* ------------------------------------------------------------------ */

const VMS_FEATURE_ICONS = [Layers, HardDrive, Film, Server];

const VMS_FEATURES_RU = [
  {
    num: '01',
    code: 'LIVE_MATRIX',
    title: 'Мультиэкранная матрица видеонаблюдения',
    desc: 'Гибкие раскладки 1×1, 2×2, 3×3 и 4×4. Переключатель Main Stream (высокое разрешение) и Sub Stream (быстрый поток) на каждом канале для экономии ресурсов компьютера.',
    spec: 'H.265+ / H.264 · 1..16 КАНАЛОВ · MAIN/SUB',
  },
  {
    num: '02',
    code: 'NVR_PLAYBACK',
    title: 'Прямой архив с жесткого диска NVR',
    desc: 'Удаленный доступ к видеоархиву видеорегистратора без зависаний. Синхронный календарь дат, поминутная шкала времени и покадровый просмотр событий.',
    spec: 'NVR HDD PLAYBACK · ТАЙМЛАЙН · СИНХРОНИЗАЦИЯ',
  },
  {
    num: '03',
    code: 'FFMPEG_EXPORT',
    title: 'Аппаратный движок FFmpeg и экспорт MP4',
    desc: 'Встроенное ядро FFmpeg обеспечивает аппаратное декодирование видеопотоков на видеокарте и мгновенный экспорт нужных фрагментов архива в формат MP4 без пересжатия.',
    spec: 'FFMPEG ENGINE · LOSSLESS MP4 EXPORT',
  },
  {
    num: '04',
    code: 'RADAR_INTEGRATION',
    title: 'Диспетчер устройств и интеграция с Radar',
    desc: 'Единая база камер объекта с отображением статуса онлайн, пинга, разрешения и битрейта. Быстрый импорт пула камер, найденных сканером ProCam Radar.',
    spec: 'RTSP STREAM DIAGNOSTICS · PING · AUTO-SYNC',
  },
];

const VMS_FEATURES_KZ = [
  {
    num: '01',
    code: 'LIVE_MATRIX',
    title: 'Мультиэкранды бейнебақылау матрицасы',
    desc: '1×1, 2×2, 3×3 және 4×4 торлары. Компьютер мен желі жүктемесін үнемдеу үшін әр арнада Main Stream және Sub Stream ағындарын жедел ауыстыру.',
    spec: 'H.265+ / H.264 · 1..16 АРНА · MAIN/SUB',
  },
  {
    num: '02',
    code: 'NVR_PLAYBACK',
    title: 'NVR қатты дискісінен тікелей архив оқу',
    desc: 'Бейнетіркегіш архивіне кідіріссіз қашықтан қол жеткізу. Күндер күнтізбесі, минуттық уақыт сызғышы және оқиғаларды кадр бойынша қарау.',
    spec: 'NVR HDD PLAYBACK · УАҚЫТ СЫЗҒЫШЫ',
  },
  {
    num: '03',
    code: 'FFMPEG_EXPORT',
    title: 'Аппараттық FFmpeg ядросы және MP4 экспорт',
    desc: 'Кіріктірілген FFmpeg бейнеағындарды аппараттық деңгейде жеделдетеді және қажетті архив кесінділерін сапасын жоғалтпай MP4 форматына лезде сақтайды.',
    spec: 'FFMPEG ENGINE · LOSSLESS MP4 EXPORT',
  },
  {
    num: '04',
    code: 'RADAR_INTEGRATION',
    title: 'Құрылғылар диспетчері және Radar байланысы',
    desc: 'Объектідегі барлық камералар базасы: онлайн күйі, пинг, кодек және битрейт. ProCam Radar тапқан камераларды бір кликпен автоматты импорттау.',
    spec: 'RTSP STREAM DIAGNOSTICS · PING · AUTO-SYNC',
  },
];

const RADAR_FEATURE_ICONS = [Wifi, Network, ShieldCheck, Cable];

export default function ProgramsPage({ onBackHome, initialTab = 'vms' }: ProgramsPageProps) {
  const { lang, t } = useLanguage();
  const isKz = lang === 'kz';

  const [activeTab, setActiveTab] = useState<'vms' | 'radar'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#procam-radar') return 'radar';
      if (window.location.hash === '#procam-vms') return 'vms';
    }
    return initialTab;
  });

  const [vmsSlide, setVmsSlide] = useState<number>(0);
  const [radarSlide, setRadarSlide] = useState<number>(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const radarRel = useRadarRelease();
  const vmsRel = useVmsRelease();

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#procam-radar') {
        setActiveTab('radar');
      } else if (window.location.hash === '#procam-vms') {
        setActiveTab('vms');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (val: 'vms' | 'radar') => {
    setActiveTab(val);
    if (val === 'radar') {
      window.history.replaceState(null, '', '#procam-radar');
    } else {
      window.history.replaceState(null, '', '#procam-vms');
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCmd(key);
      setTimeout(() => setCopiedCmd(null), 2500);
    });
  };

  const vmsFeatures = isKz ? VMS_FEATURES_KZ : VMS_FEATURES_RU;

  return (
    <Box component="main" className="vms-snap-container" style={{ background: '#F8FAFC' }}>
      {/* ============================================================ */}
      {/* TOP BAR / NAVIGATION SWITCHER                                 */}
      {/* ============================================================ */}
      <Box
        component="section"
        pt={{ base: 24, sm: 32 }}
        pb={{ base: 16, sm: 20 }}
        style={{
          borderBottom: '1px solid #E2E8F0',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        }}
      >
        <Container size="xl" px={{ base: 16, sm: 'md' }}>
          <Group justify="space-between" align="center" wrap="wrap" gap="sm">
            <Group gap="xs">
              <Button
                variant="default"
                radius="xl"
                size="sm"
                leftSection={<ArrowLeft size={15} />}
                onClick={onBackHome}
                styles={{
                  root: { borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' },
                  label: { fontWeight: 700, color: '#0F172A' },
                }}
              >
                {isKz ? '← Басты бетке қайту' : '← На главную сайта'}
              </Button>
              <Badge
                variant="dot"
                color="teal"
                size="lg"
                radius="xl"
                bg="white"
                styles={{
                  root: { border: '1px solid #E2E8F0' },
                  label: { color: '#0F172A', fontWeight: 700, textTransform: 'none' },
                }}
              >
                {isKz ? 'Инженерлік бағдарламалар кешені' : 'Инженерный программный комплекс ProCam'}
              </Badge>
            </Group>

            {/* TAB SELECTOR: VMS vs RADAR */}
            <SegmentedControl
              radius="xl"
              size="md"
              value={activeTab}
              onChange={(val) => handleTabChange(val as 'vms' | 'radar')}
              data={[
                {
                  value: 'vms',
                  label: (
                    <Group gap={8} wrap="nowrap" px={4}>
                      <Image src="/logos/procam-vms.svg" w={18} h={18} style={{ borderRadius: 4 }} />
                      <Text fw={700} fz={13.5}>
                        ProCam VMS
                      </Text>
                      <Badge size="xs" variant="filled" color="dark" radius="sm">
                        v4.1
                      </Badge>
                    </Group>
                  ),
                },
                {
                  value: 'radar',
                  label: (
                    <Group gap={8} wrap="nowrap" px={4}>
                      <Image src="/logos/procam-radar.svg" w={18} h={18} style={{ borderRadius: 4 }} />
                      <Text fw={700} fz={13.5}>
                        ProCam Radar
                      </Text>
                      <Badge size="xs" variant="filled" color="teal" radius="sm">
                        v4.1
                      </Badge>
                    </Group>
                  ),
                },
              ]}
              styles={{
                root: {
                  backgroundColor: '#E2E8F0',
                  padding: 4,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
                },
                indicator: {
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
              }}
            />
          </Group>
        </Container>
      </Box>

      {/* ============================================================ */}
      {/* TAB CONTENT WITH ANIMATION                                   */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        {activeTab === 'vms' ? (
          <motion.div
            key="vms-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* ========================================== */}
            {/* VMS HERO + SCREENSHOTS + DOWNLOADS          */}
            {/* ========================================== */}
            <Box
              component="section"
              className="vms-screen-section bg-architectural-grid"
              py={{ base: 28, sm: 40 }}
              style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}
            >
              <Container size="xl" px={{ base: 16, sm: 'md' }}>
                <Grid gutter={{ base: 28, sm: 32, lg: 44 }} align="center">
                  {/* LEFT: Info & Downloads */}
                  <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Group gap="sm" align="center" mb="xs">
                      <Image src="/logos/procam-vms.svg" w={46} h={46} style={{ borderRadius: 12, flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Box>
                        <Group gap="xs">
                          <Badge
                            variant="filled"
                            color="dark"
                            size="md"
                            radius="md"
                            styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                          >
                            VMS CLIENT STATION & ARCHIVE
                          </Badge>
                          <Badge
                            variant="light"
                            color="teal"
                            size="md"
                            radius="md"
                            styles={{ label: { fontWeight: 700 } }}
                          >
                            {vmsRel.tag} · {vmsRel.releasedAt}
                          </Badge>
                        </Group>
                      </Box>
                    </Group>

                    <Title
                      order={1}
                      lh={1.08}
                      fw={800}
                      mb="xs"
                      c="dark.9"
                      style={{
                        fontSize: 'clamp(1.75rem, 4.6vw, 2.85rem)',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {isKz
                        ? 'ProCam VMS v4.1 — Бейнебақылау станциясы және NVR архиві'
                        : 'ProCam VMS v4.1 — Станция видеонаблюдения и архив NVR'}
                    </Title>

                    <Text c="dimmed" fz={{ base: 'sm', sm: 'md' }} mb="md" lh={1.55}>
                      {isKz
                        ? '16 арнаға дейінгі мультиэкранды видеоқабырға (1×1, 2×2, 3×3, 4×4), бейнетіркегіштің (NVR) қатты дискісінен архивті тікелей ойнату, аппараттық FFmpeg және дәлелдемелік базаны MP4-ке жедел жүктеу.'
                        : 'Профессиональная клиентская станция мониторинга: живая видеостена до 16 камер (1×1..4×4), прямое чтение записей с жесткого диска NVR регистратора, аппаратное ядро FFmpeg и пакетный экспорт доказательной базы в MP4.'}
                    </Text>

                    {/* Download Buttons */}
                    <Stack gap="xs" mb="md">
                      <Group gap="xs" wrap="wrap">
                        <Button
                          size="md"
                          radius="xl"
                          color="dark.9"
                          component="a"
                          href={vmsRel.windowsUrl}
                          download
                          leftSection={<Monitor size={17} color="#10B981" />}
                          styles={{
                            root: { boxShadow: '0 4px 14px rgba(0,0,0,0.15)' },
                            label: { fontWeight: 700 },
                          }}
                        >
                          {isKz ? 'Windows үшін жүктеу' : 'Скачать для Windows (.exe)'} ({vmsRel.windowsSize})
                        </Button>
                        <Button
                          size="md"
                          radius="xl"
                          variant="default"
                          component="a"
                          href={vmsRel.linuxUrl}
                          download
                          leftSection={<Terminal size={17} />}
                          styles={{
                            root: { borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' },
                            label: { fontWeight: 700, color: '#0F172A' },
                          }}
                        >
                          {isKz ? 'Linux үшін жүктеу' : 'Скачать для Linux (x64)'} ({vmsRel.linuxSize})
                        </Button>
                      </Group>

                      <Group gap="xs" wrap="wrap">
                        <Button
                          size="sm"
                          radius="xl"
                          variant="default"
                          component="a"
                          href={vmsRel.manualUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          leftSection={<FileText size={15} color="#10B981" />}
                        >
                          {isKz ? 'Нұсқаулық (PDF)' : 'Инженерное руководство (PDF)'}
                        </Button>
                        <Badge variant="outline" color="gray" size="lg" radius="xl">
                          Windows 10 / 11 & Ubuntu / Debian / Arch
                        </Badge>
                      </Group>
                    </Stack>

                    {/* Linux 1-Command Installer Box */}
                    <Card
                      withBorder
                      radius="lg"
                      p="sm"
                      bg="white"
                      mb="md"
                      style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}
                    >
                      <Group justify="space-between" mb={4}>
                        <Text
                          fz={11}
                          fw={700}
                          c="teal.7"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          // УСТАНОВКА НА LINUX В 1 КОМАНДУ (PROCAM-VMS):
                        </Text>
                        <UnstyledButton
                          onClick={() => copyToClipboard(vmsRel.linuxInstallCmd, 'vms')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#0F172A',
                            cursor: 'pointer',
                          }}
                        >
                          {copiedCmd === 'vms' ? (
                            <Check size={13} color="#10B981" />
                          ) : (
                            <Copy size={13} />
                          )}
                          {copiedCmd === 'vms' ? 'Скопировано!' : 'Копировать'}
                        </UnstyledButton>
                      </Group>
                      <Box
                        p={8}
                        style={{
                          backgroundColor: '#0F172A',
                          borderRadius: 8,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11.5,
                          color: '#34D399',
                          overflowX: 'auto',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {vmsRel.linuxInstallCmd}
                      </Box>
                    </Card>

                    {/* 4-Item Metrics Row */}
                    <SimpleGrid
                      cols={{ base: 2, sm: 4 }}
                      spacing="sm"
                      pt="sm"
                      style={{ borderTop: '1px solid #E2E8F0' }}
                    >
                      <Box>
                        <Text fw={900} fz={{ base: 17, sm: 20 }} c="dark.9" lh={1.1}>
                          1..16 КАНАЛОВ
                        </Text>
                        <Text fz={11} c="dimmed" mt={2}>
                          {isKz ? '1×1..4×4 сеткасы' : 'Сетка 1×1, 2×2, 3×3, 4×4'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fw={900} fz={{ base: 17, sm: 20 }} c="teal.7" lh={1.1}>
                          NVR PLAYBACK
                        </Text>
                        <Text fz={11} c="dimmed" mt={2}>
                          {isKz ? 'Тікелей HDD архиві' : 'Прямой архив с диска'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fw={900} fz={{ base: 17, sm: 20 }} c="dark.9" lh={1.1}>
                          FFMPEG CORE
                        </Text>
                        <Text fz={11} c="dimmed" mt={2}>
                          {isKz ? 'Аппараттық MP4 экспорт' : 'Аппаратный экспорт MP4'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fw={900} fz={{ base: 17, sm: 20 }} c="teal.7" lh={1.1}>
                          0.00 ₸
                        </Text>
                        <Text fz={11} c="dimmed" mt={2}>
                          {isKz ? 'ProCam объектілеріне' : 'Для клиентов ProCam'}
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Grid.Col>

                  {/* RIGHT: VMS Screenshots Gallery */}
                  <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Card
                      withBorder
                      radius="xl"
                      p={{ base: 'xs', sm: 'md' }}
                      bg="white"
                      style={{
                        borderColor: '#0F172A',
                        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)',
                      }}
                    >
                      <Group justify="space-between" mb="xs" wrap="wrap" gap={6}>
                        {VMS_SCREENSHOTS.map((s, idx) => (
                          <UnstyledButton
                            key={s.id}
                            onClick={() => setVmsSlide(idx)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 999,
                              fontSize: 12,
                              fontWeight: 700,
                              backgroundColor: vmsSlide === idx ? '#0F172A' : '#F1F5F9',
                              color: vmsSlide === idx ? '#FFFFFF' : '#475569',
                              transition: 'all 0.15s ease',
                              cursor: 'pointer',
                            }}
                          >
                            {s.label}
                          </UnstyledButton>
                        ))}
                      </Group>

                      <Box
                        style={{
                          borderRadius: 14,
                          overflow: 'hidden',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#0F131C',
                        }}
                      >
                        <Image
                          src={VMS_SCREENSHOTS[vmsSlide].src}
                          alt={VMS_SCREENSHOTS[vmsSlide].label}
                          w="100%"
                          fit="contain"
                        />
                      </Box>

                      <Text fz="xs" c="dimmed" mt="xs" fw={500}>
                        {VMS_SCREENSHOTS[vmsSlide].caption}
                      </Text>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Container>
            </Box>

            {/* ========================================== */}
            {/* VMS 4 FEATURE CARDS                        */}
            {/* ========================================== */}
            <Box component="section" py={{ base: 36, sm: 48 }} bg="white">
              <Container size="xl" px={{ base: 16, sm: 'md' }}>
                <Stack gap={8} mb={{ base: 24, lg: 32 }}>
                  <Group gap="xs">
                    <Badge
                      variant="light"
                      color="dark"
                      radius="sm"
                      styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                    >
                      PROCAM VMS ARCHITECTURE
                    </Badge>
                  </Group>
                  <Title order={2} fz={{ base: 24, sm: 32, lg: 38 }} lh={1.15} fw={800} c="dark.9">
                    {isKz
                      ? 'ProCam VMS бағдарламасының инженерлік мүмкіндіктері'
                      : 'Инженерные возможности и архитектура ProCam VMS'}
                  </Title>
                </Stack>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 16, sm: 'lg' }}>
                  {vmsFeatures.map((item, idx) => {
                    const Icon = VMS_FEATURE_ICONS[idx] || Monitor;
                    return (
                      <motion.div
                        key={item.code}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <Card
                          withBorder
                          radius="xl"
                          p={{ base: 20, sm: 24 }}
                          h="100%"
                          bg="white"
                          style={{
                            borderColor: '#E2E8F0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Group justify="space-between" align="center" wrap="nowrap" mb="xs">
                              <Text
                                fz={{ base: 24, sm: 34 }}
                                fw={900}
                                lh={1}
                                c="gray.4"
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  letterSpacing: '-0.04em',
                                }}
                              >
                                {item.num}
                              </Text>

                              <ThemeIcon size={40} radius="lg" color="dark.9" variant="filled">
                                <Icon size={19} color="#10B981" />
                              </ThemeIcon>
                            </Group>

                            <Title
                              order={3}
                              fz={{ base: 17, sm: 19 }}
                              fw={800}
                              c="dark.9"
                              mb={6}
                              lh={1.25}
                            >
                              {item.title}
                            </Title>

                            <Text c="dimmed" fz="sm" lh={1.55}>
                              {item.desc}
                            </Text>
                          </Box>

                          <Group
                            visibleFrom="sm"
                            justify="space-between"
                            align="center"
                            wrap="nowrap"
                            gap="xs"
                            mt="md"
                            pt="xs"
                            style={{ borderTop: '1px solid #F1F5F9' }}
                          >
                            <Text
                              fz={11}
                              fw={600}
                              c="teal.7"
                              lh={1.35}
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              {item.spec}
                            </Text>
                            <Box
                              w={7}
                              h={7}
                              style={{
                                borderRadius: '50%',
                                backgroundColor: '#10B981',
                                flexShrink: 0,
                              }}
                            />
                          </Group>
                        </Card>
                      </motion.div>
                    );
                  })}
                </SimpleGrid>
              </Container>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="radar-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* ========================================== */}
            {/* RADAR HERO + SCREENSHOTS + DOWNLOADS        */}
            {/* ========================================== */}
            <Box
              component="section"
              className="vms-screen-section bg-architectural-grid"
              py={{ base: 28, sm: 40 }}
              style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}
            >
              <Container size="xl" px={{ base: 16, sm: 'md' }}>
                <Grid gutter={{ base: 28, sm: 32, lg: 44 }} align="center">
                  {/* LEFT: Info & Downloads */}
                  <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Group gap="sm" align="center" mb="xs">
                      <Image src="/logos/procam-radar.svg" w={46} h={46} style={{ borderRadius: 12, flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Box>
                        <Group gap="xs">
                          <Badge
                            variant="filled"
                            color="dark"
                            size="md"
                            radius="md"
                            styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                          >
                            NETWORK IP SCANNER & DIAGNOSTICS
                          </Badge>
                          <Badge
                            variant="light"
                            color="teal"
                            size="md"
                            radius="md"
                            styles={{ label: { fontWeight: 700 } }}
                          >
                            {radarRel.tag} · {radarRel.releasedAt}
                          </Badge>
                        </Group>
                      </Box>
                    </Group>

                    <Title
                      order={1}
                      lh={1.08}
                      fw={800}
                      mb="xs"
                      c="dark.9"
                      style={{
                        fontSize: 'clamp(1.75rem, 4.6vw, 2.85rem)',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {t.radar.title}
                    </Title>

                    <Text c="dimmed" fz={{ base: 'sm', sm: 'md' }} mb="md" lh={1.55}>
                      {t.radar.subtitle}
                    </Text>

                    {/* Direct Download Buttons */}
                    <Stack gap="xs" mb="md">
                      <Group gap="xs" wrap="wrap">
                        <Button
                          size="md"
                          radius="xl"
                          color="dark.9"
                          component="a"
                          href={radarRel.windowsUrl}
                          download
                          leftSection={<Monitor size={17} color="#10B981" />}
                          styles={{
                            root: { boxShadow: '0 4px 14px rgba(0,0,0,0.15)' },
                            label: { fontWeight: 700 },
                          }}
                        >
                          {t.radar.downloadWin} ({radarRel.windowsSize})
                        </Button>
                        <Button
                          size="md"
                          radius="xl"
                          variant="default"
                          component="a"
                          href={radarRel.linuxUrl}
                          download
                          leftSection={<Terminal size={17} />}
                          styles={{
                            root: { borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' },
                            label: { fontWeight: 700, color: '#0F172A' },
                          }}
                        >
                          {t.radar.downloadLinux} ({radarRel.linuxSize})
                        </Button>
                      </Group>

                      <Group gap="xs" wrap="wrap">
                        <Button
                          size="sm"
                          radius="xl"
                          variant="default"
                          component="a"
                          href={radarRel.manualUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          leftSection={<FileText size={15} color="#10B981" />}
                        >
                          {t.radar.downloadManual}
                        </Button>
                        <Button
                          size="sm"
                          radius="xl"
                          variant="subtle"
                          color="dark"
                          component="a"
                          href={radarRel.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          rightSection={<ExternalLink size={14} />}
                        >
                          GitHub ({radarRel.tag})
                        </Button>
                      </Group>
                    </Stack>

                    {/* Linux 1-Command Installer Box */}
                    <Card
                      withBorder
                      radius="lg"
                      p="sm"
                      bg="white"
                      mb="md"
                      style={{ borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}
                    >
                      <Group justify="space-between" mb={4}>
                        <Text
                          fz={11}
                          fw={700}
                          c="teal.7"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          // УСТАНОВКА НА LINUX В 1 КОМАНДУ (PROCAM-RADAR):
                        </Text>
                        <UnstyledButton
                          onClick={() => copyToClipboard(radarRel.linuxInstallCmd, 'radar')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#0F172A',
                            cursor: 'pointer',
                          }}
                        >
                          {copiedCmd === 'radar' ? (
                            <Check size={13} color="#10B981" />
                          ) : (
                            <Copy size={13} />
                          )}
                          {copiedCmd === 'radar' ? 'Скопировано!' : 'Копировать'}
                        </UnstyledButton>
                      </Group>
                      <Box
                        p={8}
                        style={{
                          backgroundColor: '#0F172A',
                          borderRadius: 8,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11.5,
                          color: '#34D399',
                          overflowX: 'auto',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {radarRel.linuxInstallCmd}
                      </Box>
                    </Card>

                    {/* Highlights Metric Row */}
                    <SimpleGrid
                      cols={{ base: 2, sm: 4 }}
                      spacing="sm"
                      pt="sm"
                      style={{ borderTop: '1px solid #E2E8F0' }}
                    >
                      {t.radar.highlights.map((item) => (
                        <Box key={item.value}>
                          <Text fw={900} fz={{ base: 17, sm: 20 }} c="dark.9" lh={1.1}>
                            {item.value}
                          </Text>
                          <Text fz={11} c="dimmed" mt={2}>
                            {item.label}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Grid.Col>

                  {/* RIGHT: Radar Screenshots Gallery */}
                  <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Card
                      withBorder
                      radius="xl"
                      p={{ base: 'xs', sm: 'md' }}
                      bg="white"
                      style={{
                        borderColor: '#0F172A',
                        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)',
                      }}
                    >
                      <Group justify="space-between" mb="xs" wrap="wrap" gap={6}>
                        {RADAR_SCREENSHOTS.map((s, idx) => (
                          <UnstyledButton
                            key={s.id}
                            onClick={() => setRadarSlide(idx)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 999,
                              fontSize: 12,
                              fontWeight: 700,
                              backgroundColor: radarSlide === idx ? '#0F172A' : '#F1F5F9',
                              color: radarSlide === idx ? '#FFFFFF' : '#475569',
                              transition: 'all 0.15s ease',
                              cursor: 'pointer',
                            }}
                          >
                            {s.label}
                          </UnstyledButton>
                        ))}
                      </Group>

                      <Box
                        style={{
                          borderRadius: 14,
                          overflow: 'hidden',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#0F131C',
                        }}
                      >
                        <Image
                          src={RADAR_SCREENSHOTS[radarSlide].src}
                          alt={RADAR_SCREENSHOTS[radarSlide].label}
                          w="100%"
                          fit="contain"
                        />
                      </Box>

                      <Text fz="xs" c="dimmed" mt="xs" fw={500}>
                        {RADAR_SCREENSHOTS[radarSlide].caption}
                      </Text>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Container>
            </Box>

            {/* ========================================== */}
            {/* RADAR 4 FEATURE CARDS                      */}
            {/* ========================================== */}
            <Box component="section" py={{ base: 36, sm: 48 }} bg="white">
              <Container size="xl" px={{ base: 16, sm: 'md' }}>
                <Stack gap={8} mb={{ base: 24, lg: 32 }}>
                  <Group gap="xs">
                    <Badge
                      variant="light"
                      color="dark"
                      radius="sm"
                      styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                    >
                      {t.radar.eyebrow}
                    </Badge>
                  </Group>
                  <Title order={2} fz={{ base: 24, sm: 32, lg: 38 }} lh={1.15} fw={800} c="dark.9">
                    {isKz
                      ? 'ProCam Radar мүмкіндіктері мен орнату'
                      : 'Инженерные возможности и установка ProCam Radar'}
                  </Title>
                </Stack>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 16, sm: 'lg' }}>
                  {t.radar.features.map((item, idx) => {
                    const Icon = RADAR_FEATURE_ICONS[idx] || Cable;
                    return (
                      <motion.div
                        key={item.code}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <Card
                          withBorder
                          radius="xl"
                          p={{ base: 20, sm: 24 }}
                          h="100%"
                          bg="white"
                          style={{
                            borderColor: '#E2E8F0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Group justify="space-between" align="center" wrap="nowrap" mb="xs">
                              <Text
                                fz={{ base: 24, sm: 34 }}
                                fw={900}
                                lh={1}
                                c="gray.4"
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  letterSpacing: '-0.04em',
                                }}
                              >
                                {item.num}
                              </Text>

                              <ThemeIcon size={40} radius="lg" color="dark.9" variant="filled">
                                <Icon size={19} color="#10B981" />
                              </ThemeIcon>
                            </Group>

                            <Title
                              order={3}
                              fz={{ base: 17, sm: 19 }}
                              fw={800}
                              c="dark.9"
                              mb={6}
                              lh={1.25}
                            >
                              {item.title}
                            </Title>

                            <Text c="dimmed" fz="sm" lh={1.55}>
                              {item.desc}
                            </Text>
                          </Box>

                          <Group
                            visibleFrom="sm"
                            justify="space-between"
                            align="center"
                            wrap="nowrap"
                            gap="xs"
                            mt="md"
                            pt="xs"
                            style={{ borderTop: '1px solid #F1F5F9' }}
                          >
                            <Text
                              fz={11}
                              fw={600}
                              c="teal.7"
                              lh={1.35}
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              {item.spec}
                            </Text>
                            <Box
                              w={7}
                              h={7}
                              style={{
                                borderRadius: '50%',
                                backgroundColor: '#10B981',
                                flexShrink: 0,
                              }}
                            />
                          </Group>
                        </Card>
                      </motion.div>
                    );
                  })}
                </SimpleGrid>
              </Container>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
}
