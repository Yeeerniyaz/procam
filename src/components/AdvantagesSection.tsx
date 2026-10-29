import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Container,
  Group,
  Notification,
  Paper,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Bell, Cable, HardDrive, Network, Smartphone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;
  const sim = a.simulators;

  const [poeActive, setPoeActive] = useState(true);
  const [pushVisible, setPushVisible] = useState(true);
  const [camsChoice, setCamsChoice] = useState<string>('4 камеры');

  const hddLookup: Record<string, string> = {
    '4 камеры': sim.storage.hddSizes.c4,
    '8 камер': sim.storage.hddSizes.c8,
    '16 камер': sim.storage.hddSizes.c16,
  };

  return (
    <Box
      component="section"
      id="advantages"
      bg="gray.0"
      style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
    >
      <Container size="xl" py={{ base: 50, md: 90 }}>
        <Stack gap="xs" mb="xl">
          <Group gap="xs">
            <Badge variant="light" color="dark" radius="sm">
              {a.eyebrow}
            </Badge>
            <Badge variant="dot" color="teal" radius="sm">
              ALMATY ENGINEERING STANDARD
            </Badge>
          </Group>
          <Title order={2} fz={{ base: 28, sm: 38 }} fw={800}>
            {a.title}
          </Title>
          <Text c="dimmed" size="lg" maw={680}>
            {a.subtitle}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {/* ============================================================ */}
          {/* CARD 01: PoE Монтаж                                          */}
          {/* ============================================================ */}
          <Card withBorder padding="xl" radius="lg" shadow="xs">
            <Stack justify="space-between" h="100%" gap="md">
              <Box>
                <Group justify="space-between" mb="sm">
                  <Badge color={poeActive ? 'teal' : 'gray'} variant="light">
                    {poeActive ? sim.poe.status : 'ЛИНИЯ ОТКЛЮЧЕНА'}
                  </Badge>
                  <ThemeIcon variant="light" color="dark" size="lg" radius="md">
                    <Cable size={18} />
                  </ThemeIcon>
                </Group>

                <Title order={3} fz="h3" mb="xs">
                  {sim.poe.title}
                </Title>
                <Text c="dimmed" fz="sm" mb="md">
                  {sim.poe.desc}
                </Text>

                <Paper withBorder p="md" radius="md" bg="gray.0">
                  <SimpleGrid cols={3} spacing="xs">
                    <Box>
                      <Text fz={11} c="dimmed" tt="uppercase" fw={600}>
                        Напряжение
                      </Text>
                      <Text fw={700} ff="monospace" c={poeActive ? 'teal.7' : 'dimmed'}>
                        {poeActive ? sim.poe.voltage : '0.0 В'}
                      </Text>
                    </Box>
                    <Box>
                      <Text fz={11} c="dimmed" tt="uppercase" fw={600}>
                        Поток
                      </Text>
                      <Text fw={700} ff="monospace">
                        {poeActive ? sim.poe.speed : '0 Мбит/с'}
                      </Text>
                    </Box>
                    <Box>
                      <Text fz={11} c="dimmed" tt="uppercase" fw={600}>
                        Дистанция
                      </Text>
                      <Text fw={700} ff="monospace">
                        {sim.poe.distance}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Paper>
              </Box>

              <Switch
                checked={poeActive}
                onChange={(event) => setPoeActive(event.currentTarget.checked)}
                label="Тест подачи 48V + 1000 Mbps по 1 кабелю UTP"
                color="teal"
                size="md"
              />
            </Stack>
          </Card>

          {/* ============================================================ */}
          {/* CARD 02: Доступ 24/7 в телефоне                              */}
          {/* ============================================================ */}
          <Card withBorder padding="xl" radius="lg" shadow="xs">
            <Stack justify="space-between" h="100%" gap="md">
              <Box>
                <Group justify="space-between" mb="sm">
                  <Badge color="dark" variant="light">
                    HIK-CONNECT P2P CLOUD
                  </Badge>
                  <ThemeIcon variant="light" color="dark" size="lg" radius="md">
                    <Smartphone size={18} />
                  </ThemeIcon>
                </Group>

                <Title order={3} fz="h3" mb="xs">
                  {sim.push.title}
                </Title>
                <Text c="dimmed" fz="sm" mb="md">
                  {sim.push.desc}
                </Text>

                {pushVisible ? (
                  <Notification
                    color="teal"
                    title="Hik-Connect Push"
                    onClose={() => setPushVisible(false)}
                    closeButtonProps={{ 'aria-label': 'Скрыть уведомление' }}
                  >
                    {sim.push.alertTitle} — {sim.push.alertZone} ({sim.push.alertTime})
                  </Notification>
                ) : (
                  <Paper withBorder p="md" radius="md" bg="gray.0">
                    <Text fz="sm" c="dimmed" ta="center">
                      Периметр под охраной AcuSense AI. Нажмите кнопку ниже для проверки мгновенного уведомления.
                    </Text>
                  </Paper>
                )}
              </Box>

              <Group>
                <Button
                  variant="light"
                  color="dark"
                  size="xs"
                  leftSection={<Bell size={14} />}
                  onClick={() => setPushVisible(true)}
                >
                  Симулировать детекцию человека
                </Button>
              </Group>
            </Stack>
          </Card>

          {/* ============================================================ */}
          {/* CARD 03: Архив WD Purple (H.265+)                            */}
          {/* ============================================================ */}
          <Card withBorder padding="xl" radius="lg" shadow="xs">
            <Stack justify="space-between" h="100%" gap="md">
              <Box>
                <Group justify="space-between" mb="sm">
                  <Badge color="dark" variant="outline">
                    WD PURPLE 24/7
                  </Badge>
                  <ThemeIcon variant="light" color="dark" size="lg" radius="md">
                    <HardDrive size={18} />
                  </ThemeIcon>
                </Group>

                <Title order={3} fz="h3" mb="xs">
                  {sim.storage.title}
                </Title>
                <Text c="dimmed" fz="sm" mb="md">
                  {sim.storage.desc}
                </Text>

                <SegmentedControl
                  fullWidth
                  size="xs"
                  mb="md"
                  value={camsChoice}
                  onChange={setCamsChoice}
                  data={['4 камеры', '8 камер', '16 камер']}
                />

                <Paper withBorder p="md" radius="md" bg="gray.0">
                  <Group justify="space-between" mb={6}>
                    <Text fz="xs" fw={600}>
                      Экономия кодека H.265+:
                    </Text>
                    <Badge color="teal" size="sm">
                      {sim.storage.saving}
                    </Badge>
                  </Group>
                  <Progress value={70} color="dark" size="md" radius="xl" mb="sm" />
                  <Text fz="xs" c="dimmed">
                    {sim.storage.recommended}{' '}
                    <Text component="span" fw={700} c="dark.9">
                      {hddLookup[camsChoice]}
                    </Text>
                  </Text>
                </Paper>
              </Box>
            </Stack>
          </Card>

          {/* ============================================================ */}
          {/* CARD 04: Сетевая настройка                                   */}
          {/* ============================================================ */}
          <Card withBorder padding="xl" radius="lg" shadow="xs">
            <Stack justify="space-between" h="100%" gap="md">
              <Box>
                <Group justify="space-between" mb="sm">
                  <Badge color="teal" variant="light">
                    STATIC IPv4 SUBNET
                  </Badge>
                  <ThemeIcon variant="light" color="dark" size="lg" radius="md">
                    <Network size={18} />
                  </ThemeIcon>
                </Group>

                <Title order={3} fz="h3" mb="xs">
                  {sim.network.title}
                </Title>
                <Text c="dimmed" fz="sm" mb="md">
                  {sim.network.desc}
                </Text>

                <Code block>
                  {`$ procam-net-diag --subnet 192.168.1.0/24
NVR_HOST     : ${sim.network.nvrIp}
CAM_ENDPOINTS: ${sim.network.camIps}
PING_LATENCY : ${sim.network.latency} (0% packet loss)
DHCP_CONFLICT: NONE (STATIC ARP LOCK)
STATUS       : ${sim.network.status}`}
                </Code>
              </Box>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
