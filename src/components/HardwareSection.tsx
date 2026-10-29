import { useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  List,
  Paper,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Camera, Check, Info, Network, Server, Smartphone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type FocalKey = '2.8' | '4.0' | '6.0';

export default function HardwareSection() {
  const { t } = useLanguage();
  const hw = t.hardware;
  const lab = hw.opticalLab;

  const [lens, setLens] = useState<FocalKey>('2.8');
  const currentLens = lab.lenses[lens];

  const fovSpecs: Record<
    FocalKey,
    { angle: number; conePath: string; markerX: number; progress: number; distanceLabel: string }
  > = {
    '2.8': {
      angle: 114,
      conePath: 'M 30 95 L 250 15 L 250 175 Z',
      markerX: 95,
      progress: 30,
      distanceLabel: '6 м — Общий периметр и двор без слепых зон',
    },
    '4.0': {
      angle: 84,
      conePath: 'M 30 95 L 250 42 L 250 148 Z',
      markerX: 155,
      progress: 60,
      distanceLabel: '12 м — Фасады, коридоры, въездные ворота',
    },
    '6.0': {
      angle: 54,
      conePath: 'M 30 95 L 250 66 L 250 124 Z',
      markerX: 220,
      progress: 100,
      distanceLabel: '22 м — Прицельное чтение госномеров авто и лиц',
    },
  };

  const currentFov = fovSpecs[lens];

  const renderTopology = (brandLabel: string, nvrLabel: string, protocol: string) => (
    <Card withBorder padding="xl" radius="lg" bg="dark.9" c="white" h="100%">
      <Group justify="space-between" mb="md">
        <Badge color="teal" variant="light">
          СХЕМА ВКЛЮЧЕНИЯ
        </Badge>
        <Text fz="xs" ff="monospace" c="gray.4">
          {protocol}
        </Text>
      </Group>

      <Title order={4} c="white" mb="xs">
        Единая архитектура записи и облака
      </Title>
      <Text fz="sm" c="gray.4" mb="lg">
        Все камеры питаются по одному кабелю PoE 48V, пишутся на сервер {nvrLabel} с диском WD Purple и открываются в приложении Hik-Connect.
      </Text>

      <SimpleGrid cols={2} spacing="sm">
        <Paper p="sm" radius="md" bg="dark.7" style={{ border: '1px solid var(--mantine-color-dark-5)' }}>
          <Group gap="xs" mb={4}>
            <Camera size={16} color="var(--mantine-color-teal-4)" />
            <Text fz="xs" fw={700} c="white">
              01. Камеры
            </Text>
          </Group>
          <Text fz="xs" c="gray.3">
            {brandLabel}
          </Text>
        </Paper>

        <Paper p="sm" radius="md" bg="dark.7" style={{ border: '1px solid var(--mantine-color-dark-5)' }}>
          <Group gap="xs" mb={4}>
            <Network size={16} color="var(--mantine-color-teal-4)" />
            <Text fz="xs" fw={700} c="white">
              02. PoE 48V
            </Text>
          </Group>
          <Text fz="xs" c="gray.3">
            IEEE 802.3af Cat6
          </Text>
        </Paper>

        <Paper p="sm" radius="md" bg="dark.7" style={{ border: '1px solid var(--mantine-color-teal-7)' }}>
          <Group gap="xs" mb={4}>
            <Server size={16} color="var(--mantine-color-teal-4)" />
            <Text fz="xs" fw={700} c="teal.3">
              03. Сервер NVR
            </Text>
          </Group>
          <Text fz="xs" c="white" fw={600}>
            {nvrLabel}
          </Text>
        </Paper>

        <Paper p="sm" radius="md" bg="dark.7" style={{ border: '1px solid var(--mantine-color-dark-5)' }}>
          <Group gap="xs" mb={4}>
            <Smartphone size={16} color="var(--mantine-color-teal-4)" />
            <Text fz="xs" fw={700} c="white">
              04. Смартфон
            </Text>
          </Group>
          <Text fz="xs" c="gray.3">
            Hik-Connect 24/7
          </Text>
        </Paper>
      </SimpleGrid>
    </Card>
  );

  return (
    <Box
      component="section"
      id="hardware"
      style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
    >
      <Container size="xl" py={{ base: 50, md: 90 }}>
        <Stack gap="xs" mb="xl">
          <Group gap="xs">
            <Badge variant="light" color="dark" radius="sm">
              {hw.eyebrow}
            </Badge>
            <Badge variant="outline" color="teal" radius="sm">
              HIKVISION · HIWATCH · DAHUA IP
            </Badge>
          </Group>
          <Title order={2} fz={{ base: 28, sm: 38 }} fw={800}>
            {hw.title}
          </Title>
          <Text c="dimmed" size="lg" maw={720}>
            {hw.subtitle}
          </Text>
        </Stack>

        {/* Brand Ecosystem Tabs */}
        <Tabs defaultValue="hikvision" variant="pills" color="dark" radius="md">
          <Tabs.List mb="xl">
            <Tabs.Tab value="hikvision" fw={600}>
              01. Hikvision (Флагман)
            </Tabs.Tab>
            <Tabs.Tab value="hiwatch" fw={600}>
              02. HiWatch (Оптимум)
            </Tabs.Tab>
            <Tabs.Tab value="dahua" fw={600}>
              03. Камеры Dahua IP
            </Tabs.Tab>
          </Tabs.List>

          {/* Tab 1: Hikvision */}
          <Tabs.Panel value="hikvision">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Card withBorder padding="xl" radius="lg" h="100%">
                  <Group justify="space-between" mb="md">
                    <Badge color="dark" size="lg">
                      {hw.hikvision.badge}
                    </Badge>
                    <Text fz="xs" ff="monospace" c="dimmed">
                      [NVR + IP CAMERAS]
                    </Text>
                  </Group>
                  <Title order={3} fz="h2" mb="sm">
                    {hw.hikvision.name}
                  </Title>
                  <Text c="dimmed" mb="lg">
                    {hw.hikvision.description}
                  </Text>
                  <List
                    spacing="sm"
                    icon={
                      <ThemeIcon color="dark" size={20} radius="xl">
                        <Check size={12} />
                      </ThemeIcon>
                    }
                  >
                    {hw.hikvision.features.map((f) => (
                      <List.Item key={f}>
                        <Text fw={500}>{f}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 5 }}>
                {renderTopology('Hikvision 4K ColorVu', 'Hikvision NVR', 'HIK PRIVATE P2P')}
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          {/* Tab 2: HiWatch */}
          <Tabs.Panel value="hiwatch">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Card withBorder padding="xl" radius="lg" h="100%">
                  <Group justify="space-between" mb="md">
                    <Badge color="teal" size="lg">
                      {hw.hiwatch.badge}
                    </Badge>
                    <Text fz="xs" ff="monospace" c="dimmed">
                      [OFFICIAL HIKVISION ECOSYSTEM]
                    </Text>
                  </Group>
                  <Title order={3} fz="h2" mb="sm">
                    {hw.hiwatch.name}
                  </Title>
                  <Text c="dimmed" mb="lg">
                    {hw.hiwatch.description}
                  </Text>
                  <List
                    spacing="sm"
                    icon={
                      <ThemeIcon color="dark" size={20} radius="xl">
                        <Check size={12} />
                      </ThemeIcon>
                    }
                  >
                    {hw.hiwatch.features.map((f) => (
                      <List.Item key={f}>
                        <Text fw={500}>{f}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 5 }}>
                {renderTopology('HiWatch Pro IP', 'HiWatch / Hikvision NVR', 'HIK-CONNECT NATIVE')}
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          {/* Tab 3: Dahua IP Cameras strictly */}
          <Tabs.Panel value="dahua">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Card withBorder padding="xl" radius="lg" h="100%">
                  <Group justify="space-between" mb="md">
                    <Badge color="dark" variant="outline" size="lg">
                      {hw.dahua.badge}
                    </Badge>
                    <Text fz="xs" ff="monospace" c="dimmed">
                      [OPTICAL IP ENDPOINTS ONLY]
                    </Text>
                  </Group>
                  <Title order={3} fz="h2" mb="sm">
                    {hw.dahua.name}
                  </Title>
                  <Text c="dimmed" mb="lg">
                    {hw.dahua.description}
                  </Text>
                  <List
                    spacing="sm"
                    mb="lg"
                    icon={
                      <ThemeIcon color="dark" size={20} radius="xl">
                        <Check size={12} />
                      </ThemeIcon>
                    }
                  >
                    {hw.dahua.features.map((f) => (
                      <List.Item key={f}>
                        <Text fw={500}>{f}</Text>
                      </List.Item>
                    ))}
                  </List>

                  <Alert
                    variant="light"
                    color="dark"
                    title="Архитектурное правило NVR"
                    icon={<Info size={18} />}
                  >
                    {hw.dahua.note} Видеорегистраторы (NVR) в наших системах — 100% Hikvision / HiWatch, а Dahua используется строго для IP-камер.
                  </Alert>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 5 }}>
                {renderTopology('Dahua IP-камеры', 'Hikvision / HiWatch NVR', 'ONVIF PROFILE S / RTSP')}
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>

        {/* Interactive Lens Simulator Card */}
        <Card withBorder radius="lg" p={{ base: 'md', sm: 'xl' }} mt="xl" bg="gray.0">
          <Group justify="space-between" align="flex-end" mb="lg" wrap="wrap" gap="md">
            <Box>
              <Text fz="xs" ff="monospace" tt="uppercase" c="dimmed" fw={700}>
                {lab.eyebrow}
              </Text>
              <Title order={3} mt={4}>
                {lab.title}
              </Title>
              <Text fz="sm" c="dimmed" mt={4}>
                {lab.subtitle}
              </Text>
            </Box>

            <SegmentedControl
              value={lens}
              onChange={(val) => setLens(val as FocalKey)}
              data={[
                { label: '2.8 мм (114° Обзор)', value: '2.8' },
                { label: '4.0 мм (84° Средний)', value: '4.0' },
                { label: '6.0 мм (54° Дальний)', value: '6.0' },
              ]}
            />
          </Group>

          <Grid gutter="lg" align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Paper bg="dark.9" p="md" radius="md">
                <svg
                  width="100%"
                  height="210"
                  viewBox="0 0 280 190"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                >
                  <line x1="95" y1="15" x2="95" y2="175" stroke="#27272A" strokeDasharray="3 3" />
                  <text x="88" y="186" fill="#71717A" fontSize="7" fontFamily="monospace">
                    6м
                  </text>

                  <line x1="155" y1="15" x2="155" y2="175" stroke="#27272A" strokeDasharray="3 3" />
                  <text x="147" y="186" fill="#71717A" fontSize="7" fontFamily="monospace">
                    12м
                  </text>

                  <line x1="220" y1="15" x2="220" y2="175" stroke="#27272A" strokeDasharray="3 3" />
                  <text x="212" y="186" fill="#71717A" fontSize="7" fontFamily="monospace">
                    22м
                  </text>

                  <rect
                    x="12"
                    y="84"
                    width="18"
                    height="22"
                    rx="3"
                    fill="#27272A"
                    stroke="#71717A"
                    strokeWidth="1.2"
                  />
                  <circle cx="30" cy="95" r="4.5" fill="#10B981" />

                  <path
                    d={currentFov.conePath}
                    fill="rgba(16, 185, 129, 0.2)"
                    stroke="#10B981"
                    strokeWidth="1.6"
                  />

                  <line
                    x1={currentFov.markerX}
                    y1="28"
                    x2={currentFov.markerX}
                    y2="162"
                    stroke="#34D399"
                    strokeWidth="2"
                  />
                  <circle
                    cx={currentFov.markerX}
                    cy="95"
                    r="5.5"
                    fill="#10B981"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </svg>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card withBorder radius="md" p="lg" bg="white">
                <Group justify="space-between" mb="xs">
                  <Badge color="teal" variant="light">
                    {currentLens.tag}
                  </Badge>
                  <Text ff="monospace" fw={700}>
                    {currentLens.focal} · {currentLens.angle}
                  </Text>
                </Group>

                <Title order={4} mb="xs">
                  {currentLens.title}
                </Title>
                <Text fz="sm" c="dimmed" mb="md">
                  {currentLens.desc}
                </Text>

                <Box>
                  <Group justify="space-between" mb={6}>
                    <Text fz="xs" fw={600}>
                      Дальность идентификации лиц / номеров:
                    </Text>
                    <Text fz="xs" fw={700} c="teal.7">
                      {currentLens.distance}
                    </Text>
                  </Group>
                  <Progress value={currentFov.progress} color="teal" size="lg" radius="xl" />
                  <Text fz="xs" c="dimmed" mt={6}>
                    {currentFov.distanceLabel}
                  </Text>
                </Box>
              </Card>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
