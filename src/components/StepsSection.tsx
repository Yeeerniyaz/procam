import { useState } from 'react';
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
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from '@mantine/core';
import { ArrowRight, Check, FileCheck, Layers, ShieldCheck, Terminal, Wrench } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const STEP_CHECKLISTS: string[][] = [
  [
    'Выезд инженера и осмотр периметра объекта в Алматы',
    'Расчёт углов обзора объективов 2.8 / 4.0 / 6.0 мм без слепых зон',
    'Составление прозрачной спецификации оборудования Hikvision / HiWatch / Dahua',
  ],
  [
    'Прокладка медного кабеля UTP Cat6 в защитной гофре или кабель-канале',
    'Установка герметичных распределительных коробок IP66/IP67',
    'Опрессовка разъёмов RJ-45 по стандарту T568B и тест линии Fluke',
  ],
  [
    'Монтаж видеорегистратора NVR и специализированного диска WD Purple',
    'Настройка изолированной статической IP-подсети и парольной защиты',
    'Калибровка детекции людей AcuSense 2.0 и антибликового режима WDR 120dB',
  ],
  [
    'Установка и привязка приложения Hik-Connect на смартфоны заказчика',
    'Обучение просмотру онлайн-эфира и быстрому поиску событий в архиве',
    'Подписание акта выполненных работ и передача официальной гарантии',
  ],
];

export default function StepsSection() {
  const { t } = useLanguage();
  const s = t.steps;

  const [activeStep, setActiveStep] = useState<number>(0);
  const current = s.stages[activeStep] || s.stages[0];
  const checklist = STEP_CHECKLISTS[activeStep] || STEP_CHECKLISTS[0];

  const icons = [Layers, Wrench, Terminal, FileCheck];

  return (
    <Box
      component="section"
      id="steps"
      style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
    >
      <Container size="xl" py={{ base: 50, md: 90 }}>
        <Stack gap="xs" mb="xl">
          <Group gap="xs">
            <Badge variant="light" color="dark" radius="sm">
              {s.eyebrow}
            </Badge>
            <Badge variant="outline" color="teal" radius="sm">
              4 ЭТАПА ПОД КЛЮЧ
            </Badge>
          </Group>
          <Title order={2} fz={{ base: 28, sm: 38 }} fw={800}>
            {s.title}
          </Title>
          <Text c="dimmed" size="lg" maw={680}>
            {s.subtitle}
          </Text>
        </Stack>

        <Grid gutter="xl" align="center">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Clickable Mantine Timeline                      */}
          {/* ============================================================ */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Timeline active={activeStep} bulletSize={40} lineWidth={2} color="dark">
              {s.stages.map((stage, idx) => {
                const Icon = icons[idx] || Wrench;
                const isSelected = idx === activeStep;
                return (
                  <Timeline.Item
                    key={stage.num}
                    bullet={<Icon size={18} />}
                    title={
                      <Text
                        fw={isSelected ? 800 : 600}
                        fz="md"
                        c={isSelected ? 'dark.9' : 'dark.6'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveStep(idx)}
                      >
                        {stage.num}. {stage.title}
                      </Text>
                    }
                    onClick={() => setActiveStep(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Text c="dimmed" size="sm" mt={4}>
                      {stage.desc}
                    </Text>
                    <Badge
                      mt="xs"
                      size="xs"
                      variant={isSelected ? 'filled' : 'light'}
                      color={isSelected ? 'teal' : 'gray'}
                    >
                      Готовность: {stage.progress}%
                    </Badge>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Grid.Col>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Detailed Engineering Card + RingProgress       */}
          {/* ============================================================ */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card withBorder padding="xl" radius="lg" shadow="sm">
              <Group justify="space-between" align="flex-start" wrap="nowrap" mb="md">
                <Box>
                  <Group gap="xs" mb="xs">
                    <Badge color="dark" size="lg">
                      ФАЗА {current.num} / 04
                    </Badge>
                    <Badge color="teal" variant="light" size="lg">
                      СНиП РК · TIA-568B
                    </Badge>
                  </Group>
                  <Title order={3} fz={{ base: 22, sm: 28 }}>
                    {current.title}
                  </Title>
                  <Text c="dimmed" mt="xs">
                    {current.desc}
                  </Text>
                </Box>

                <RingProgress
                  size={108}
                  thickness={10}
                  roundCaps
                  sections={[{ value: current.progress, color: 'teal' }]}
                  label={
                    <Text ta="center" fw={800} fz="sm">
                      {current.progress}%
                    </Text>
                  }
                />
              </Group>

              <Divider my="md" label="Инженерный чек-лист этапа" labelPosition="left" />

              <List
                spacing="sm"
                mb="lg"
                icon={
                  <ThemeIcon color="dark" size={20} radius="xl">
                    <Check size={12} />
                  </ThemeIcon>
                }
              >
                {checklist.map((item) => (
                  <List.Item key={item}>
                    <Text fz="sm" fw={500}>
                      {item}
                    </Text>
                  </List.Item>
                ))}
              </List>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mb="lg">
                <Paper withBorder p="sm" radius="md" bg="gray.0">
                  <Group gap="xs" mb={4}>
                    <Wrench size={15} color="var(--mantine-color-teal-6)" />
                    <Text fz="xs" fw={700} tt="uppercase" c="dimmed">
                      Инструмент и оснастка
                    </Text>
                  </Group>
                  <Text fz="xs" fw={600}>
                    {current.tools}
                  </Text>
                </Paper>

                <Paper withBorder p="sm" radius="md" bg="gray.0">
                  <Group gap="xs" mb={4}>
                    <ShieldCheck size={15} color="var(--mantine-color-teal-6)" />
                    <Text fz="xs" fw={700} tt="uppercase" c="dimmed">
                      Стандарт приёмки
                    </Text>
                  </Group>
                  <Text fz="xs" fw={600}>
                    {current.standards}
                  </Text>
                </Paper>
              </SimpleGrid>

              <Group justify="space-between" wrap="wrap" gap="sm">
                <Button
                  variant="default"
                  onClick={() => setActiveStep((prev) => (prev + 1) % s.stages.length)}
                  rightSection={<ArrowRight size={16} />}
                >
                  Следующий этап ({s.stages[(activeStep + 1) % s.stages.length].num})
                </Button>

                <Button color="dark" component="a" href="#contacts">
                  Заказать расчёт системы
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
