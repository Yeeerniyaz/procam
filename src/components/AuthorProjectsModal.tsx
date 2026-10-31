import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  CopyButton,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  Briefcase,
  Check,
  Copy,
  Cpu,
  ExternalLink,
  FolderGit2,
  Globe,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Radar,
  Sparkles,
  User,
  Video,
} from 'lucide-react';
import {
  EMAIL,
  GITHUB_URL,
  PHONES,
  TELEGRAM_URL,
  TELEGRAM_USERNAME,
  WEBSITE,
  WEBSITE_DISPLAY,
  WHATSAPP_URL,
} from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { GithubIcon, TelegramIcon, WhatsAppIcon } from './icons/BrandIcons';

interface AuthorProjectsModalProps {
  opened: boolean;
  onClose: () => void;
  onNavigateRadar?: () => void;
}

export default function AuthorProjectsModal({
  opened,
  onClose,
  onNavigateRadar,
}: AuthorProjectsModalProps) {
  const { lang } = useLanguage();
  const isKz = lang === 'kz';
  const [activeTab, setActiveTab] = useState<string | null>('projects');

  const projects = [
    {
      id: 'procam-cctv',
      title: 'ProCam CCTV',
      badge: isKz ? 'Алматы · Сервис' : 'Алматы · Услуги',
      category: isKz ? 'Бейнебақылау' : 'Видеонаблюдение',
      icon: Video,
      logoUrl: '/logos/procam-cctv.svg',
      color: 'teal',
      description: isKz
        ? 'Hikvision, HiWatch және Dahua негізінде IP-бейнебақылау жүйелерін жобалау, таза PoE-монтаждау және смартфоннан 24/7 қашықтан қарау.'
        : 'Проектирование и чистый монтаж IP-видеонаблюдения на базе Hikvision, HiWatch и Dahua. PoE-питание, 4K ColorVu и круглосуточный мобильный доступ.',
      tags: ['Hikvision', 'HiWatch', 'Dahua', 'PoE 802.3af', '4K AcuSense'],
      action: {
        label: isKz ? 'Өтінім қалдыру' : 'Рассчитать объект',
        href: '#contacts',
        isScroll: true,
      },
    },
    {
      id: 'procam-radar',
      title: 'ProCam Radar v4.1',
      badge: 'Windows & Linux',
      category: isKz ? 'Инженерлік БҚ' : 'Инженерное ПО',
      icon: Radar,
      logoUrl: '/logos/procam-radar.svg',
      color: 'emerald',
      description: isKz
        ? 'IP-камераларды интернетті үзбей кабель мен Wi-Fi арқылы қатар іздеуге (/32), бос IP санын іріктеуге (1..245) және PDF-паспорт жасауға арналған десктоптық бағдарлама.'
        : 'Десктопная программа для поиска IP-камер по кабелю и Wi-Fi одновременно без потери интернета (/32), подбора пула свободных IP (1..245) и PDF-паспортов.',
      tags: ['Desktop GUI', 'Multi-NIC /32', 'Free IP 1..245', 'PDF Passport'],
      action: {
        label: isKz ? 'Бағдарлама бетіне өту' : 'Подробнее о Radar',
        href: '#procam-radar',
        onClick: () => {
          onClose();
          onNavigateRadar?.();
          window.location.hash = '#procam-radar';
        },
      },
    },
    {
      id: 'procam-viewer',
      title: 'ProCam VMS (Viewer v4.1)',
      badge: 'Windows & Linux',
      category: isKz ? 'VMS & Архив' : 'VMS и архив NVR',
      icon: Monitor,
      logoUrl: '/logos/procam-vms.svg',
      color: 'cyan',
      description: isKz
        ? 'NVR бейнетіркегішінің архивін тікелей ойнатқыш және видеоқабырға. Камераларды тікелей эфирде бақылау, кесінділерді FFmpeg арқылы пакеттік жүктеу.'
        : 'Клиентская станция мониторинга и архивный NVR плеер: многоканальная видеостена, чтение записей напрямую с HDD регистратора и пакетный экспорт через FFmpeg.',
      tags: ['Desktop VMS', 'NVR Playback', 'FFmpeg Engine', 'Live Video Wall'],
      action: {
        label: isKz ? 'Бағдарлама бетіне өту' : 'Подробнее о VMS',
        href: '#procam-vms',
        onClick: () => {
          onClose();
          onNavigateRadar?.();
          window.location.hash = '#procam-vms';
        },
      },
    },
    {
      id: 'royal-banners',
      title: 'Royal Banners (UKB)',
      badge: 'Production',
      category: isKz ? 'Корпоративтік Web' : 'Корпоративный Web',
      icon: Briefcase,
      color: 'violet',
      description: isKz
        ? 'Сыртқы жарнама мен полиграфияның корпоративтік порталы (royalbanners.yeee.kz) мен эталондық UI/UX стиліндегі веб-жүйе.'
        : 'Корпоративный портал и рекламная платформа наружной рекламы и полиграфии (royalbanners.yeee.kz) со строгим UI/UX.',
      tags: ['React', 'Mantine UI', 'Vite', 'Production'],
      action: {
        label: 'royalbanners.yeee.kz',
        href: 'https://royalbanners.yeee.kz/',
        external: true,
      },
    },
    {
      id: 'teztap',
      title: 'TezTap Platform',
      badge: 'SaaS & Web',
      category: isKz ? 'Веб-платформа' : 'Веб-платформа',
      icon: Globe,
      color: 'indigo',
      description: isKz
        ? 'WhatsApp арқылы онлайн-тапсырыстар мен өтінімдер қабылдайтын бейімделгіш парақшалар мен қызмет каталогтарын жасауға арналған SaaS жүйесі.'
        : 'SaaS-сервис для мгновенной генерации микро-лендингов, визиток и каталогов услуг с автоматической маршрутизацией заявок в WhatsApp.',
      tags: ['Next.js 14', 'Prisma', 'Tailwind', 'WhatsApp Business'],
    },
    {
      id: 'justice-company',
      title: 'Justice Company',
      badge: 'Production',
      category: isKz ? 'Заң порталы' : 'Юридический Web',
      icon: Briefcase,
      color: 'yellow',
      description: isKz
        ? 'Заңгерлерге арналған минималистік лендинг және Telegram-бот арқылы өтінімдерді басқару жүйесі.'
        : 'Минималистичный лендинг для юристов с интегрированной CMS и управлением контентом/заявками через Telegram-бота.',
      tags: ['React', 'Node.js', 'Docker', 'Telegram Bot CMS'],
    },
    {
      id: 'smart-iot',
      title: 'Smart Mirror VECTOR & IoT',
      badge: 'Hardware & IoT',
      category: isKz ? 'Аппараттық әзірлеу' : 'Аппаратная разработка',
      icon: Cpu,
      color: 'orange',
      description: isKz
        ? 'React/Linux жүйесіндегі ақылды айналар және Wiren Board (MQTT/Modbus) өндірістік контроллерінде сыртқы бұлттарсыз ақылды үйді жергілікті басқару.'
        : 'Кастомные умные зеркала VECTOR на React/Linux и локальная диспетчеризация умного дома на промышленных контроллерах Wiren Board (MQTT/Modbus).',
      tags: ['Wiren Board', 'Linux / Bash', 'MQTT / Modbus', 'Electron'],
    },
  ];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      radius="xl"
      padding="xl"
      withCloseButton
      centered
      title={
        <Group gap="xs">
          <Badge color="teal" variant="dot" size="md" radius="xl">
            {isKz ? 'Автор және барлық жобалар' : 'Автор и все проекты'}
          </Badge>
        </Group>
      }
      styles={{
        content: {
          backgroundColor: '#121214',
          color: '#F4F4F5',
          border: '1px solid #27272A',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.75)',
        },
        header: {
          backgroundColor: '#121214',
          color: '#F4F4F5',
          borderBottom: '1px solid #27272A',
          paddingBottom: 16,
        },
        close: {
          color: '#A1A1AA',
          '&:hover': { backgroundColor: '#27272A', color: '#FFFFFF' },
        },
        body: {
          paddingTop: 20,
        },
      }}
    >
      {/* ============================================================ */}
      {/* AUTHOR HEADER CARD                                           */}
      {/* ============================================================ */}
      <Card
        p="md"
        radius="lg"
        bg="#18181B"
        style={{ border: '1px solid #27272A' }}
        mb="lg"
      >
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Group gap="md">
            <Avatar
              src="/yerniyaz.jpg"
              alt="Yerniyaz Talgatuly"
              size={64}
              radius="xl"
              style={{ border: '2px solid #10B981' }}
            >
              Y
            </Avatar>
            <Stack gap={2}>
              <Group gap="xs">
                <Text fw={800} fz="lg" c="white">
                  {isKz ? 'Ернияз Талғатұлы' : 'Ернияз Талғатулы'}
                </Text>
                <Badge size="xs" color="teal" variant="light">
                  {isKz ? 'Автор' : 'Автор'}
                </Badge>
              </Group>
              <Text fz="xs" c="gray.4">
                {isKz
                  ? 'Қауіпсіздік жүйелерінің инженері & Fullstack-әзірлеуші'
                  : 'Инженер систем безопасности & Fullstack-разработчик'}
              </Text>
              <Group gap={6} mt={2}>
                <MapPin size={12} color="#10B981" />
                <Text fz={11} c="dimmed">
                  {isKz ? 'Алматы, Қазақстан' : 'Алматы, Казахстан'}
                </Text>
                <Text fz={11} c="dimmed">
                  ·
                </Text>
                <Globe size={12} color="#10B981" />
                <Anchor
                  href={WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  fz={11}
                  fw={600}
                  c="teal.4"
                  underline="hover"
                >
                  {WEBSITE_DISPLAY}
                </Anchor>
              </Group>
            </Stack>
          </Group>

          <Group gap="xs">
            <Button
              component="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="xs"
              radius="xl"
              color="teal.6"
              leftSection={<WhatsAppIcon size={14} />}
            >
              WhatsApp
            </Button>
            <Button
              component="a"
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="xs"
              radius="xl"
              variant="default"
              styles={{
                root: { backgroundColor: '#27272A', borderColor: '#3F3F46', color: '#F4F4F5' },
              }}
              leftSection={<TelegramIcon size={14} />}
            >
              Telegram
            </Button>
          </Group>
        </Group>
      </Card>

      {/* ============================================================ */}
      {/* TABS: ALL PROJECTS vs ABOUT & CONTACTS                       */}
      {/* ============================================================ */}
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        color="teal"
        styles={{
          tab: {
            color: '#A1A1AA',
            fontWeight: 600,
            fontSize: 13,
            '&[data-active]': { color: '#34D399', borderColor: '#10B981' },
          },
          list: {
            borderColor: '#27272A',
            marginBottom: 20,
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="projects" leftSection={<FolderGit2 size={15} />}>
            {isKz ? 'Барлық жобалар' : 'Все проекты'} ({projects.length})
          </Tabs.Tab>
          <Tabs.Tab value="about" leftSection={<User size={15} />}>
            {isKz ? 'Мен туралы және байланыс' : 'Обо мне и все контакты'}
          </Tabs.Tab>
        </Tabs.List>

        {/* TAB 1: ALL PROJECTS */}
        <Tabs.Panel value="projects">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {projects.map((p) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.id}
                  radius="md"
                  p="md"
                  bg="#18181B"
                  style={{
                    border: '1px solid #27272A',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Group justify="space-between" align="flex-start" mb="xs">
                    <Group gap="xs">
                      {'logoUrl' in p && p.logoUrl ? (
                        <img src={p.logoUrl} width={32} height={32} style={{ borderRadius: 8, flexShrink: 0 }} alt={p.title} />
                      ) : (
                        <ThemeIcon color="teal" variant="light" size={32} radius="md">
                          <Icon size={16} />
                        </ThemeIcon>
                      )}
                      <div>
                        <Text fw={700} fz="sm" c="white" lh={1.2}>
                          {p.title}
                        </Text>
                        <Text fz={11} c="dimmed">
                          {p.category}
                        </Text>
                      </div>
                    </Group>
                    <Badge size="xs" color="gray" variant="outline" styles={{ label: { fontSize: 10 } }}>
                      {p.badge}
                    </Badge>
                  </Group>

                  <Text fz="xs" c="gray.4" lh={1.5} mb="sm" style={{ flexGrow: 1 }}>
                    {p.description}
                  </Text>

                  <Group gap={4} mb="md">
                    {p.tags.map((tag) => (
                      <Badge
                        key={tag}
                        size="xs"
                        variant="filled"
                        bg="#27272A"
                        c="gray.3"
                        styles={{ label: { fontSize: 9.5, textTransform: 'none' } }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Group>

                  {p.action ? (
                    p.action.onClick ? (
                      <Button
                        size="xs"
                        radius="md"
                        variant="light"
                        color="teal"
                        fullWidth
                        onClick={p.action.onClick}
                      >
                        {p.action.label}
                      </Button>
                    ) : (
                      <Button
                        component="a"
                        href={p.action.href}
                        target={p.action.external ? '_blank' : undefined}
                        rel={p.action.external ? 'noopener noreferrer' : undefined}
                        onClick={() => {
                          if (p.action?.isScroll) onClose();
                        }}
                        size="xs"
                        radius="md"
                        variant="light"
                        color="teal"
                        fullWidth
                        rightSection={p.action.external ? <ExternalLink size={12} /> : undefined}
                      >
                        {p.action.label}
                      </Button>
                    )
                  ) : (
                    <Text fz={11} c="dimmed" ta="center" py={4}>
                      {isKz ? 'Ішкі әзірлеме' : 'Внутренний проект'}
                    </Text>
                  )}
                </Card>
              );
            })}
          </SimpleGrid>

          {/* Banner to yeee.kz */}
          <Card
            mt="md"
            p="md"
            radius="md"
            bg="rgba(16, 185, 129, 0.08)"
            style={{ border: '1px solid rgba(16, 185, 129, 0.25)' }}
          >
            <Group justify="space-between" align="center" wrap="wrap" gap="sm">
              <Stack gap={2}>
                <Group gap={6}>
                  <Sparkles size={16} color="#10B981" />
                  <Text fw={700} fz="sm" c="white">
                    {isKz ? 'Толық портфолио мен бастапқы код' : 'Полное портфолио и исходный код'}
                  </Text>
                </Group>
                <Text fz="xs" c="gray.4">
                  {isKz
                    ? 'Барлық веб-сервистер, CRM, GitHub репозиторийлері жеке сайтта қолжетімді: yeee.kz'
                    : 'Все веб-сервисы, CRM-системы, IoT-разработки и репозитории GitHub на сайте yeee.kz'}
                </Text>
              </Stack>

              <Button
                component="a"
                href={WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                radius="xl"
                color="teal.6"
                rightSection={<ExternalLink size={14} />}
              >
                {isKz ? 'yeee.kz сайтына өту' : 'Перейти на yeee.kz'}
              </Button>
            </Group>
          </Card>
        </Tabs.Panel>

        {/* TAB 2: ABOUT & ALL CONTACTS */}
        <Tabs.Panel value="about">
          <Stack gap="md">
            {/* Bio text */}
            <Card p="md" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
              <Title order={4} fz="sm" c="white" mb={6}>
                {isKz ? 'Инженерлік тәсіл' : 'Инженерный подход и стандарты'}
              </Title>
              <Text fz="xs" c="gray.3" lh={1.6} mb="xs">
                {isKz
                  ? 'Мен әлсіз ток жүйелерінің физикалық инженериясын (бейнебақылау, PoE, байланыс желілері) сенімді бағдарламалық жасақтама әзірлеумен ұштастырамын. Жеке нысандардағы монтаж жұмыстарынан бастап желілік диагностика мен бейнежазбаларды өңдейтін төл десктоптық утилиталарға дейін толық циклді қамтамасыз етемін.'
                  : 'Я объединяю физическую инженерию слаботочных сетей (видеонаблюдение, PoE, СКС) с разработкой надежного программного обеспечения. От аккуратного скрытого монтажа на объектах до создания собственного десктопного софта для сетевой диагностики и работы с NVR-архивами.'}
              </Text>
              <Text fz="xs" c="gray.4" lh={1.6}>
                {isKz
                  ? 'Басты қағидам — жұмыстың мінсіз эстетикасы, сапалы компоненттер және әрбір тапсырылған нысанға жеке жауапкершілік.'
                  : 'Главные принципы — безупречный порядок в кабельных трассах, отказоустойчивые бренды (Hikvision, HiWatch) и прямая ответственность за результат.'}
              </Text>
            </Card>

            {/* Direct Contacts Grid */}
            <Title order={5} fz="xs" c="gray.4" tt="uppercase" mt="xs">
              {isKz ? 'Барлық байланыс деректері' : 'Все контакты для связи'}
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              {/* Phone 1 */}
              <Card p="sm" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon color="teal" variant="light" size={28} radius="xl">
                      <Phone size={14} />
                    </ThemeIcon>
                    <div>
                      <Text fz={11} c="dimmed">
                        {isKz ? 'Негізгі нөмір / WhatsApp' : 'Основной / WhatsApp'}
                      </Text>
                      <Anchor
                        href={PHONES.main.tel}
                        fz="sm"
                        fw={700}
                        c="white"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {PHONES.main.display}
                      </Anchor>
                    </div>
                  </Group>
                  <CopyButton value={PHONES.main.display} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Скопировано!' : 'Копировать'} withArrow>
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </Card>

              {/* Phone 2 */}
              <Card p="sm" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon color="gray" variant="light" size={28} radius="xl">
                      <Phone size={14} />
                    </ThemeIcon>
                    <div>
                      <Text fz={11} c="dimmed">
                        {isKz ? 'Қосымша жұмыс нөмірі' : 'Дополнительный номер'}
                      </Text>
                      <Anchor
                        href={PHONES.extra.tel}
                        fz="sm"
                        fw={600}
                        c="gray.2"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {PHONES.extra.display}
                      </Anchor>
                    </div>
                  </Group>
                  <CopyButton value={PHONES.extra.display} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Скопировано!' : 'Копировать'} withArrow>
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </Card>

              {/* Email */}
              <Card p="sm" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon color="teal" variant="light" size={28} radius="xl">
                      <Mail size={14} />
                    </ThemeIcon>
                    <div>
                      <Text fz={11} c="dimmed">
                        {isKz ? 'Электрондық пошта' : 'Электронная почта (ТЗ / Документы)'}
                      </Text>
                      <Anchor
                        href={`mailto:${EMAIL}`}
                        fz="sm"
                        fw={600}
                        c="white"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {EMAIL}
                      </Anchor>
                    </div>
                  </Group>
                  <CopyButton value={EMAIL} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Скопировано!' : 'Копировать'} withArrow>
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </Card>

              {/* Website */}
              <Card p="sm" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon color="teal" variant="light" size={28} radius="xl">
                      <Globe size={14} />
                    </ThemeIcon>
                    <div>
                      <Text fz={11} c="dimmed">
                        {isKz ? 'Жеке сайт' : 'Персональный сайт'}
                      </Text>
                      <Anchor
                        href={WEBSITE}
                        target="_blank"
                        rel="noopener noreferrer"
                        fz="sm"
                        fw={700}
                        c="teal.4"
                      >
                        {WEBSITE_DISPLAY}
                      </Anchor>
                    </div>
                  </Group>
                  <ActionIcon
                    component="a"
                    href={WEBSITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="gray"
                    variant="subtle"
                  >
                    <ExternalLink size={14} />
                  </ActionIcon>
                </Group>
              </Card>

              {/* Telegram */}
              <Card p="sm" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon color="teal" variant="light" size={28} radius="xl">
                      <TelegramIcon size={14} />
                    </ThemeIcon>
                    <div>
                      <Text fz={11} c="dimmed">
                        Telegram
                      </Text>
                      <Anchor
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        fz="sm"
                        fw={600}
                        c="white"
                      >
                        @{TELEGRAM_USERNAME}
                      </Anchor>
                    </div>
                  </Group>
                  <ActionIcon
                    component="a"
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="gray"
                    variant="subtle"
                  >
                    <ExternalLink size={14} />
                  </ActionIcon>
                </Group>
              </Card>

              {/* GitHub */}
              <Card p="sm" radius="md" bg="#18181B" style={{ border: '1px solid #27272A' }}>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon color="gray" variant="light" size={28} radius="xl">
                      <GithubIcon size={14} />
                    </ThemeIcon>
                    <div>
                      <Text fz={11} c="dimmed">
                        GitHub
                      </Text>
                      <Anchor
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        fz="sm"
                        fw={600}
                        c="white"
                      >
                        github.com/Yeeerniyaz
                      </Anchor>
                    </div>
                  </Group>
                  <ActionIcon
                    component="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="gray"
                    variant="subtle"
                  >
                    <ExternalLink size={14} />
                  </ActionIcon>
                </Group>
              </Card>
            </SimpleGrid>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
