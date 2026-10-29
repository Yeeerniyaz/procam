import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Cable,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Monitor,
  Network,
  ShieldCheck,
  Terminal,
  Wifi,
} from 'lucide-react';
import { useRadarRelease } from '../hooks/useRadarRelease';
import { useLanguage } from '../i18n/LanguageContext';
import Footer from './Footer';

interface RadarPageProps {
  onBackHome: () => void;
}

const FEATURE_ICONS = [Wifi, Network, ShieldCheck, Cable];

const SCREENSHOT_SLIDES = [
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
      'Выбор точного количества свободных IP-адресов (1, 4, 8, 16, 32, 64 или любое число вручную) с проверкой всей подсети.',
  },
  {
    id: 'cable',
    label: '3. Паспорт камеры и тест кабеля',
    src: '/screenshots/procam-radar-cable-diag.png',
    caption:
      'Беспарольный опрос серийного номера, статуса активации и стресс-тест кабеля RJ-45 пакетами 64B и 1472B (MTU 1500).',
  },
] as const;

export default function RadarPage({ onBackHome }: RadarPageProps) {
  const { t } = useLanguage();
  const rel = useRadarRelease();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  const copyInstallCmd = () => {
    navigator.clipboard.writeText(rel.linuxInstallCmd).then(() => {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2500);
    });
  };

  return (
    <Box component="main" className="vms-snap-container">
      {/* ============================================================ */}
      {/* SECTION 1: HERO + SCREENSHOTS + LIVE GIT DOWNLOADS           */}
      {/* ============================================================ */}
      <Box
        component="section"
        className="vms-screen-section bg-architectural-grid"
        style={{ borderBottom: '1px solid #E4E4E7' }}
      >
        <Container size="xl" w="100%">
          <Grid gutter={{ base: 24, sm: 32, lg: 44 }} align="center">
            {/* LEFT COLUMN: Title, Live Git Downloads, Linux Install Command */}
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Group gap="xs" mb="sm">
                <Button
                  variant="default"
                  radius="xl"
                  size="xs"
                  leftSection={<ArrowLeft size={14} />}
                  onClick={onBackHome}
                >
                  {t.radar.backToSiteBtn}
                </Button>
                <Badge
                  variant="dot"
                  color="teal"
                  size="md"
                  radius="xl"
                  bg="white"
                  styles={{
                    root: { border: '1px solid #E4E4E7' },
                    label: { color: '#09090B', fontWeight: 600, textTransform: 'none' },
                  }}
                >
                  Git Release {rel.tag} · {rel.releasedAt}
                </Badge>
              </Group>

              <Title
                order={1}
                lh={1.08}
                fw={800}
                mb="xs"
                c="dark.9"
                style={{
                  fontSize: 'clamp(1.65rem, 4.8vw, 3.0rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                {t.radar.title}
              </Title>

              <Text c="dimmed" fz={{ base: 'sm', sm: 'md' }} mb="md" lh={1.55}>
                {t.radar.subtitle}
              </Text>

              {/* Direct Download Buttons synced with GitHub Releases */}
              <Stack gap="xs" mb="md">
                <Group gap="xs" wrap="wrap">
                  <Button
                    size="md"
                    radius="xl"
                    color="dark.9"
                    component="a"
                    href={rel.windowsUrl}
                    download
                    leftSection={<Monitor size={17} color="#10B981" />}
                  >
                    {t.radar.downloadWin} ({rel.windowsSize})
                  </Button>
                  <Button
                    size="md"
                    radius="xl"
                    variant="default"
                    component="a"
                    href={rel.linuxUrl}
                    download
                    leftSection={<Terminal size={17} />}
                  >
                    {t.radar.downloadLinux} ({rel.linuxSize})
                  </Button>
                </Group>

                <Group gap="xs" wrap="wrap">
                  <Button
                    size="sm"
                    radius="xl"
                    variant="default"
                    component="a"
                    href={rel.manualUrl}
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
                    href={rel.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    rightSection={<ExternalLink size={14} />}
                  >
                    Репозиторий GitHub ({rel.tag})
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
                style={{ borderColor: '#E4E4E7' }}
              >
                <Group justify="space-between" mb={4}>
                  <Text
                    fz={11}
                    fw={700}
                    c="teal.7"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    // УСТАНОВКА НА LINUX С ИКОНКОЙ В МЕНЮ (1 КОМАНДА):
                  </Text>
                  <UnstyledButton
                    onClick={copyInstallCmd}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#09090B',
                    }}
                  >
                    {copiedCmd ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                    {copiedCmd ? 'Скопировано!' : 'Копировать'}
                  </UnstyledButton>
                </Group>
                <Box
                  p={8}
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E4E4E7',
                    borderRadius: 8,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11.5,
                    color: '#09090B',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {rel.linuxInstallCmd}
                </Box>
              </Card>

              {/* 4-Item Bottom Metrics Row */}
              <SimpleGrid
                cols={{ base: 2, sm: 4 }}
                spacing="sm"
                pt="sm"
                style={{ borderTop: '1px solid #E4E4E7' }}
              >
                {t.radar.highlights.map((item) => (
                  <Box key={item.value}>
                    <Text fw={900} fz={{ base: 16, sm: 19 }} c="dark.9" lh={1.1}>
                      {item.value}
                    </Text>
                    <Text fz={11} c="dimmed" mt={2}>
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Grid.Col>

            {/* RIGHT COLUMN: Real Screenshots Gallery */}
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Card
                withBorder
                radius="xl"
                p={{ base: 'xs', sm: 'md' }}
                bg="white"
                style={{
                  borderColor: '#09090B',
                  boxShadow: '0 20px 50px rgba(9, 9, 11, 0.08)',
                }}
              >
                <Group justify="space-between" mb="xs" wrap="wrap" gap={6}>
                  {SCREENSHOT_SLIDES.map((s, idx) => (
                    <UnstyledButton
                      key={s.id}
                      onClick={() => setActiveSlide(idx)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                        backgroundColor: activeSlide === idx ? '#09090B' : '#F4F4F5',
                        color: activeSlide === idx ? '#FFFFFF' : '#52525B',
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
                    border: '1px solid #E4E4E7',
                  }}
                >
                  <Image
                    src={SCREENSHOT_SLIDES[activeSlide].src}
                    alt={SCREENSHOT_SLIDES[activeSlide].label}
                    w="100%"
                  />
                </Box>

                <Text fz="xs" c="dimmed" mt="xs" fw={500}>
                  {SCREENSHOT_SLIDES[activeSlide].caption}
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* ============================================================ */}
      {/* SECTION 2: 4 ARCHITECTURAL FEATURE CARDS + FOOTER            */}
      {/* ============================================================ */}
      <Box
        component="section"
        className="vms-screen-section"
        bg="white"
        style={{ justifyContent: 'space-between' }}
      >
        <Container size="xl" w="100%" my={{ base: 0, lg: 'auto' }}>
          <Stack gap={6} mb={{ base: 'lg', lg: 32 }}>
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

            <Title order={2} fz={{ base: 24, sm: 34, lg: 40 }} lh={1.15} fw={800} c="dark.9">
              Инженерные возможности и установка ProCam Radar
            </Title>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'md', sm: 'lg' }}>
            {t.radar.features.map((item, idx) => {
              const Icon = FEATURE_ICONS[idx] || Cable;
              return (
                <motion.div
                  key={item.code}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Card
                    withBorder
                    radius="xl"
                    p={{ base: 'md', sm: 24 }}
                    h="100%"
                    bg="white"
                    style={{
                      borderColor: '#E4E4E7',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Group justify="space-between" align="center" wrap="nowrap" mb="xs">
                        <Text
                          fz={{ base: 26, sm: 34 }}
                          fw={900}
                          lh={1}
                          c="gray.4"
                          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '-0.04em' }}
                        >
                          {item.num}
                        </Text>

                        <ThemeIcon size={40} radius="lg" color="dark.9" variant="filled">
                          <Icon size={19} color="#10B981" />
                        </ThemeIcon>
                      </Group>

                      <Title order={3} fz={{ base: 17, sm: 20 }} fw={800} c="dark.9" mb={6} lh={1.25}>
                        {item.title}
                      </Title>

                      <Text c="dimmed" fz="sm" lh={1.5}>
                        {item.desc}
                      </Text>
                    </Box>

                    <Group
                      justify="space-between"
                      align="center"
                      wrap="nowrap"
                      gap="xs"
                      mt="md"
                      pt="xs"
                      style={{ borderTop: '1px solid #F4F4F5' }}
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

        <Footer />
      </Box>
    </Box>
  );
}
