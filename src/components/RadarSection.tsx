import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink, FileText, Monitor, Terminal } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useRadarRelease } from '../hooks/useRadarRelease';
import { useLanguage } from '../i18n/LanguageContext';

interface RadarSectionProps {
  onOpenRadarPage: () => void;
}

export default function RadarSection({ onOpenRadarPage }: RadarSectionProps) {
  const { t } = useLanguage();
  const rel = useRadarRelease();

  const cards = [
    {
      num: '01',
      badge: `Git Release ${rel.tag}`,
      tag: `WINDOWS 10 / 11 (x64) · ${rel.windowsSize}`,
      name: 'WINDOWS (.EXE)',
      description:
        'Автономное графическое приложение для Windows 10 и 11. Запускается одним кликом без установки драйверов, работает одновременно с кабелем PoE и Wi-Fi.',
      features: [
        'Поиск камер в чужих подсетях (ONVIF, SADP, Dahua)',
        'Одновременная работа с кабелем и Wi-Fi без потери интернета',
        'Подбор нужного количества свободных IP (1..245 адресов)',
        'Прямое открытие камеры по MAC при конфликте IP',
      ],
      footer: `AUTO-SYNC FROM GIT · ${rel.tag}`,
      href: rel.windowsUrl,
      btnLabel: t.radar.downloadWin,
      icon: Monitor,
      isDownload: true,
    },
    {
      num: '02',
      badge: `Git Release ${rel.tag}`,
      tag: `LINUX DESKTOP (x64) · ${rel.linuxSize}`,
      name: 'LINUX (x64)',
      description:
        'Графическое приложение для Ubuntu / Debian / Arch Linux с автоматическим установщиком, поддержкой маршрутов /32 и аппаратной диагностикой кабеля RJ-45.',
      features: [
        'Быстрая установка в 1 команду или портативный запуск',
        'Бесконфликтные маршруты /32 (интернет по Wi-Fi не пропадает)',
        'Стресс-тест кабеля RJ-45 и PoE (64B vs 1472B MTU 1500)',
        'Пакетная активация и разведение конфликтов IP',
      ],
      footer: 'CURL INSTALLER + BINARY',
      href: rel.linuxUrl,
      btnLabel: t.radar.downloadLinux,
      icon: Terminal,
      isDownload: true,
    },
    {
      num: '03',
      badge: 'GitHub & PDF',
      tag: 'ДОКУМЕНТАЦИЯ И ИСХОДНЫЙ КОД',
      name: 'ИНСТРУКЦИЯ И GIT',
      description:
        'Полное инженерное руководство на русском языке по всем функциям программы и официальный репозиторий проекта на GitHub с актуальными релизами.',
      features: [
        'Подробный разбор всех функций графического интерфейса',
        'Работа с двумя сетями одновременно (Ethernet + Wi-Fi)',
        'Пошаговый подбор пула свободных IP под 4, 8, 16, 32, 64 камеры',
        'Всегда актуальные сборки из GitHub Releases',
      ],
      footer: 'GITHUB.COM/YEEERNIYAZ/PROCAM-RADAR',
      href: rel.manualUrl,
      btnLabel: t.radar.downloadManual,
      icon: FileText,
      isDownload: false,
    },
  ];

  return (
    <Box
      component="section"
      id={SECTION_IDS.radar}
      className="vms-screen-section bg-architectural-grid"
      style={{ borderBottom: '1px solid #E4E4E7' }}
    >
      <Container size="xl" w="100%">
        <Group
          justify="space-between"
          align="flex-end"
          mb={{ base: 'lg', lg: 36 }}
          wrap="wrap"
          gap="sm"
        >
          <Stack gap={6}>
            <Group gap="xs">
              <Badge
                variant="light"
                color="dark"
                radius="sm"
                styles={{ label: { fontFamily: 'var(--font-mono)' } }}
              >
                {t.radar.eyebrow}
              </Badge>
              <Badge
                variant="dot"
                color="teal"
                radius="xl"
                bg="white"
                styles={{
                  root: { border: '1px solid #E4E4E7' },
                  label: { color: '#09090B', fontWeight: 600, textTransform: 'none' },
                }}
              >
                {rel.tag} · {rel.releasedAt}
              </Badge>
            </Group>

            <Title order={2} fz={{ base: 24, sm: 36, lg: 44 }} lh={1.15} fw={800} c="dark.9">
              {t.radar.title}
            </Title>

            <Text c="dimmed" fz={{ base: 'sm', sm: 'md', lg: 'lg' }} maw={720} lh={1.55}>
              {t.radar.subtitle}
            </Text>
          </Stack>

          <Group gap="xs">
            <Button
              variant="default"
              radius="xl"
              size="md"
              component="a"
              href={rel.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              rightSection={<ExternalLink size={15} />}
            >
              GitHub ({rel.tag})
            </Button>
            <Button
              color="dark.9"
              radius="xl"
              size="md"
              onClick={onOpenRadarPage}
              rightSection={<ArrowRight size={16} />}
            >
              {t.radar.openPageBtn}
            </Button>
          </Group>
        </Group>

        <Grid gutter={{ base: 'md', sm: 'xl' }} align="stretch">
          {cards.map((card, idx) => {
            const isPrimary = idx === 0;
            const Icon = card.icon;
            return (
              <Grid.Col key={card.num} span={{ base: 12, md: 4 }}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ height: '100%' }}
                >
                  <Card
                    withBorder
                    radius="xl"
                    p={{ base: 'md', sm: 28 }}
                    h="100%"
                    bg={isPrimary ? '#FAFAFA' : 'white'}
                    style={{
                      borderColor: isPrimary ? '#09090B' : '#E4E4E7',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Group justify="space-between" align="center" wrap="nowrap" mb="sm">
                        <Text
                          fz={{ base: 26, sm: 32 }}
                          fw={900}
                          lh={1}
                          c="dark.9"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {card.num}
                        </Text>
                        <Badge
                          color={isPrimary ? 'dark.9' : idx === 1 ? 'teal' : 'gray'}
                          variant={isPrimary ? 'filled' : 'light'}
                          size="sm"
                          radius="xl"
                        >
                          {card.badge}
                        </Badge>
                      </Group>

                      <Text
                        fz={11}
                        fw={700}
                        tt="uppercase"
                        c="teal.7"
                        mb={2}
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}
                      >
                        {card.tag}
                      </Text>

                      <Title order={3} fz={{ base: 20, sm: 24 }} fw={800} c="dark.9" mb="sm">
                        {card.name}
                      </Title>

                      <Text visibleFrom="sm" c="dimmed" fz="sm" lh={1.55} mb="md">
                        {card.description}
                      </Text>

                      <List
                        spacing={8}
                        size="sm"
                        center
                        icon={
                          <ThemeIcon color="dark.9" size={18} radius="xl">
                            <Check size={11} strokeWidth={3} />
                          </ThemeIcon>
                        }
                      >
                        {card.features.map((feature) => (
                          <List.Item key={feature}>
                            <Text fz="sm" fw={500} c="dark.8" lh={1.45}>
                              {feature}
                            </Text>
                          </List.Item>
                        ))}
                      </List>
                    </Box>

                    <Box mt="md">
                      <Button
                        component="a"
                        href={card.href}
                        download={card.isDownload ? true : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        fullWidth
                        radius="xl"
                        size="md"
                        color={isPrimary ? 'dark.9' : undefined}
                        variant={isPrimary ? 'filled' : 'default'}
                        leftSection={<Icon size={16} color={isPrimary ? '#10B981' : '#09090B'} />}
                        mb="sm"
                      >
                        {card.btnLabel}
                      </Button>

                      <Divider mb="xs" color="#E4E4E7" />
                      <Group justify="space-between" wrap="nowrap" align="center">
                        <Text
                          fz={11}
                          c="dimmed"
                          fw={700}
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {card.footer}
                        </Text>
                        <Box
                          w={8}
                          h={8}
                          style={{
                            borderRadius: '50%',
                            backgroundColor: '#10B981',
                            flexShrink: 0,
                          }}
                        />
                      </Group>
                    </Box>
                  </Card>
                </motion.div>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
