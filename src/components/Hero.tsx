import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { ArrowRight, ShieldCheck, Video } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

type PresetKey = 'house' | 'office' | 'warehouse';

interface CamCoords {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  path: string;
}

const PRESET_CAM_DATA: Record<PresetKey, CamCoords[]> = {
  house: [
    { x: 35, y: 35, targetX: 110, targetY: 100, path: 'M 35 35 L 140 30 L 70 140 Z' },
    { x: 265, y: 40, targetX: 200, targetY: 85, path: 'M 265 40 L 160 30 L 210 130 Z' },
    { x: 150, y: 160, targetX: 150, targetY: 115, path: 'M 150 160 L 85 90 L 215 90 Z' },
    { x: 40, y: 165, targetX: 90, targetY: 140, path: 'M 40 165 L 40 90 L 130 165 Z' },
  ],
  office: [
    { x: 30, y: 35, targetX: 85, targetY: 80, path: 'M 30 35 L 120 30 L 60 120 Z' },
    { x: 150, y: 30, targetX: 150, targetY: 90, path: 'M 150 30 L 90 120 L 210 120 Z' },
    { x: 270, y: 40, targetX: 220, targetY: 100, path: 'M 270 40 L 180 40 L 220 130 Z' },
    { x: 150, y: 165, targetX: 150, targetY: 120, path: 'M 150 165 L 100 95 L 200 95 Z' },
  ],
  warehouse: [
    { x: 35, y: 35, targetX: 100, targetY: 70, path: 'M 35 35 L 150 30 L 80 130 Z' },
    { x: 265, y: 35, targetX: 200, targetY: 80, path: 'M 265 35 L 150 35 L 210 130 Z' },
    { x: 265, y: 165, targetX: 190, targetY: 130, path: 'M 265 165 L 170 165 L 220 90 Z' },
    { x: 35, y: 165, targetX: 110, targetY: 120, path: 'M 35 165 L 35 90 L 140 165 Z' },
  ],
};

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const c = h.cad;

  const [preset, setPreset] = useState<PresetKey>('house');
  const [activeCam, setActiveCam] = useState<number>(0);
  const [visionMode, setVisionMode] = useState<string>('4K DAY');

  const camNames = c.cams[preset] || c.cams.house;
  const cams = PRESET_CAM_DATA[preset];
  const activeCoord = cams[activeCam] || cams[0];

  return (
    <Box
      component="section"
      id="hero"
      style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
    >
      <Container size="xl" py={{ base: 40, md: 80 }}>
        <Grid gutter={{ base: 32, lg: 48 }} align="center">
          {/* ============================================================ */}
          {/* LEFT COLUMN (7 cols on lg)                                   */}
          {/* ============================================================ */}
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Badge variant="dot" color="teal" size="lg" radius="sm" mb="md">
              {h.badge}
            </Badge>

            <Title order={1} fz={{ base: 32, sm: 44, lg: 54 }} lh={1.08} fw={800} mb="md">
              {h.title.split(/(IP[-‑][^\s]+)/).map((part, i) =>
                part.startsWith('IP') ? (
                  <Text component="span" key={i} inherit style={{ whiteSpace: 'nowrap' }}>
                    {part}
                  </Text>
                ) : (
                  part
                )
              )}
            </Title>

            <Text c="dimmed" size="lg" maw={560} mb="xl">
              {h.subtitle}
            </Text>

            <Group gap="md">
              <Button
                size="lg"
                color="dark"
                radius="md"
                component="a"
                href="#contacts"
                rightSection={<ArrowRight size={18} />}
              >
                {h.primaryCta}
              </Button>

              <Button
                size="lg"
                variant="default"
                radius="md"
                component="a"
                href="https://wa.me/77066066323"
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<WhatsAppIcon size={18} />}
              >
                {h.secondaryCta}
              </Button>
            </Group>

            {/* Bottom 4 Key Metrics */}
            <SimpleGrid
              cols={{ base: 2, sm: 4 }}
              spacing="md"
              mt="xl"
              pt="xl"
              style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}
            >
              {h.highlights.map((item) => (
                <Paper key={item.value} withBorder p="md" radius="md">
                  <Group gap={6} mb={4}>
                    <ShieldCheck size={14} color="var(--mantine-color-teal-6)" />
                    <Text fz="xs" fw={700} c="teal.7" tt="uppercase">
                      SPEC
                    </Text>
                  </Group>
                  <Text fw={800} fz={{ base: 'md', sm: 'lg' }} c="dark.9">
                    {item.value}
                  </Text>
                  <Text fz="xs" c="dimmed" mt={2}>
                    {item.label}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Grid.Col>

          {/* ============================================================ */}
          {/* RIGHT COLUMN (5 cols on lg): Interactive Mantine NVR Panel   */}
          {/* ============================================================ */}
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Card withBorder shadow="md" radius="lg" padding="lg">
              {/* Top Bar */}
              <Group justify="space-between" mb="sm" wrap="wrap" gap="xs">
                <Badge color="red" variant="filled">
                  ● REC 4K
                </Badge>

                <SegmentedControl
                  size="xs"
                  value={preset}
                  onChange={(val) => {
                    setPreset(val as PresetKey);
                    setActiveCam(0);
                  }}
                  data={[
                    { label: 'Коттедж', value: 'house' },
                    { label: 'Офис', value: 'office' },
                    { label: 'Склад', value: 'warehouse' },
                  ]}
                />
              </Group>

              {/* Interactive Viewport */}
              <Paper bg="dark.9" c="white" p="md" radius="md">
                <Group justify="space-between" mb="xs">
                  <Group gap={6}>
                    <Video size={14} color="var(--mantine-color-teal-4)" />
                    <Text fz="xs" fw={700} ff="monospace">
                      [CAM_0{activeCam + 1}] {camNames[activeCam]}
                    </Text>
                  </Group>
                  <Badge size="xs" color="teal" variant="light">
                    {visionMode}
                  </Badge>
                </Group>

                <Box pos="relative" style={{ aspectRatio: '16 / 10', width: '100%' }}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="15"
                      y="15"
                      width="270"
                      height="170"
                      stroke="#27272A"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />

                    {preset === 'house' && (
                      <g stroke="#3F3F46" strokeWidth="1.2">
                        <rect x="90" y="50" width="120" height="90" fill="#18181B" fillOpacity="0.85" />
                        <path d="M 90 85 L 210 85" stroke="#52525B" strokeWidth="0.8" />
                        <path d="M 150 50 L 150 140" stroke="#52525B" strokeWidth="0.8" />
                        <text x="125" y="100" fill="#71717A" fontSize="7" fontFamily="monospace">
                          КОТТЕДЖ
                        </text>
                        <rect x="135" y="140" width="30" height="12" fill="#27272A" stroke="#52525B" />
                        <rect x="220" y="30" width="55" height="50" stroke="#27272A" strokeDasharray="2 2" />
                        <text x="230" y="55" fill="#52525B" fontSize="6" fontFamily="monospace">
                          ПАРКОВКА
                        </text>
                        <line
                          x1="120"
                          y1="185"
                          x2="180"
                          y2="185"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeDasharray="3 2"
                        />
                        <text x="135" y="195" fill="#10B981" fontSize="6" fontFamily="monospace">
                          ВОРОТА
                        </text>
                      </g>
                    )}

                    {preset === 'office' && (
                      <g stroke="#3F3F46" strokeWidth="1.2">
                        <rect x="40" y="30" width="220" height="135" fill="#18181B" fillOpacity="0.85" />
                        <rect x="110" y="125" width="80" height="40" stroke="#52525B" strokeWidth="0.8" />
                        <text x="128" y="147" fill="#71717A" fontSize="6" fontFamily="monospace">
                          РЕСЕПШН / ВХОД
                        </text>
                        <rect x="40" y="30" width="55" height="45" fill="#27272A" stroke="#10B981" strokeWidth="1" />
                        <text x="45" y="55" fill="#10B981" fontSize="6" fontFamily="monospace">
                          СЕРВЕРНАЯ
                        </text>
                        <rect x="205" y="30" width="55" height="45" stroke="#52525B" strokeWidth="0.8" />
                        <text x="212" y="55" fill="#71717A" fontSize="6" fontFamily="monospace">
                          КАБИНЕТ
                        </text>
                        <circle cx="120" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                        <circle cx="150" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                        <circle cx="180" cy="75" r="8" stroke="#3F3F46" strokeDasharray="1 1" />
                        <text x="132" y="96" fill="#52525B" fontSize="6" fontFamily="monospace">
                          OPEN-SPACE
                        </text>
                      </g>
                    )}

                    {preset === 'warehouse' && (
                      <g stroke="#3F3F46" strokeWidth="1.2">
                        <rect x="45" y="35" width="210" height="120" fill="#18181B" fillOpacity="0.85" />
                        <rect x="60" y="50" width="80" height="15" fill="#27272A" stroke="#52525B" />
                        <rect x="60" y="75" width="80" height="15" fill="#27272A" stroke="#52525B" />
                        <rect x="60" y="100" width="80" height="15" fill="#27272A" stroke="#52525B" />
                        <text x="75" y="60" fill="#71717A" fontSize="6" fontFamily="monospace">
                          СТЕЛЛАЖИ А-1
                        </text>
                        <text x="75" y="85" fill="#71717A" fontSize="6" fontFamily="monospace">
                          СТЕЛЛАЖИ А-2
                        </text>
                        <text x="75" y="110" fill="#71717A" fontSize="6" fontFamily="monospace">
                          СТЕЛЛАЖИ А-3
                        </text>
                        <rect
                          x="180"
                          y="50"
                          width="60"
                          height="35"
                          stroke="#10B981"
                          strokeWidth="0.8"
                          strokeDasharray="3 2"
                        />
                        <text x="188" y="70" fill="#10B981" fontSize="6" fontFamily="monospace">
                          РАМПА 01
                        </text>
                        <rect
                          x="180"
                          y="95"
                          width="60"
                          height="35"
                          stroke="#10B981"
                          strokeWidth="0.8"
                          strokeDasharray="3 2"
                        />
                        <text x="188" y="115" fill="#10B981" fontSize="6" fontFamily="monospace">
                          РАМПА 02
                        </text>
                      </g>
                    )}

                    {/* Active Camera FOV Beam */}
                    <path
                      d={activeCoord.path}
                      fill="rgba(16, 185, 129, 0.2)"
                      stroke="#10B981"
                      strokeWidth="1.4"
                    />

                    <line
                      x1={activeCoord.x}
                      y1={activeCoord.y}
                      x2={activeCoord.targetX}
                      y2={activeCoord.targetY}
                      stroke="#10B981"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                    />

                    {/* AI Target Reticle */}
                    <g transform={`translate(${activeCoord.targetX - 12}, ${activeCoord.targetY - 12})`}>
                      <rect
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                        fill="rgba(16, 185, 129, 0.12)"
                        stroke="#10B981"
                        strokeWidth="1.2"
                      />
                      <rect x="-8" y="-9" width="40" height="7" fill="#10B981" rx="1" />
                      <text x="-6" y="-3.5" fill="#09090B" fontSize="4.5" fontWeight="bold" fontFamily="monospace">
                        AI HUMAN 99%
                      </text>
                    </g>

                    {/* 4 Clickable Camera Nodes */}
                    {cams.map((node, i) => {
                      const isActive = i === activeCam;
                      return (
                        <g
                          key={i}
                          onClick={() => setActiveCam(i)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isActive ? 10 : 8}
                            fill={isActive ? 'rgba(16, 185, 129, 0.35)' : 'rgba(39, 39, 42, 0.75)'}
                            stroke={isActive ? '#10B981' : '#71717A'}
                            strokeWidth={isActive ? '1.6' : '1'}
                          />
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="2.5"
                            fill={isActive ? '#10B981' : '#FFFFFF'}
                          />
                          <text
                            x={node.x + 11}
                            y={node.y + 3}
                            fill={isActive ? '#34D399' : '#A1A1AA'}
                            fontSize="6.5"
                            fontFamily="monospace"
                            fontWeight={isActive ? 'bold' : 'normal'}
                          >
                            CAM_0{i + 1}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </Box>

                <SegmentedControl
                  fullWidth
                  size="xs"
                  mt="sm"
                  value={visionMode}
                  onChange={setVisionMode}
                  data={['4K DAY', 'COLORVU F1.0', 'AI ACUSENSE']}
                />
              </Paper>

              {/* Bottom 4 Channel Cards */}
              <SimpleGrid cols={2} spacing="xs" mt="sm">
                {camNames.map((name, idx) => {
                  const active = idx === activeCam;
                  return (
                    <UnstyledButton
                      key={idx}
                      onClick={() => setActiveCam(idx)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--mantine-radius-md)',
                        border: active
                          ? '1.5px solid var(--mantine-color-dark-9)'
                          : '1px solid var(--mantine-color-gray-3)',
                        backgroundColor: active
                          ? 'var(--mantine-color-gray-0)'
                          : 'var(--mantine-color-white)',
                      }}
                    >
                      <Group justify="space-between" mb={2}>
                        <Text fz="xs" ff="monospace" fw={700} c={active ? 'teal.7' : 'dimmed'}>
                          CAM_0{idx + 1}
                        </Text>
                        <Badge size="xs" color={active ? 'teal' : 'gray'} variant="dot">
                          {active ? 'LIVE' : 'STBY'}
                        </Badge>
                      </Group>
                      <Text fz="sm" fw={600} c="dark.9" truncate>
                        {name}
                      </Text>
                    </UnstyledButton>
                  );
                })}
              </SimpleGrid>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
