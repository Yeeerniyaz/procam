import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Layers, Server, Smartphone, Wrench } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const STEP_ICONS = [Layers, Wrench, Server, Smartphone];

export default function StepsSection() {
  const { t } = useLanguage();
  const s = t.steps;

  return (
    <Box
      component="section"
      id="steps"
      className="vms-screen-section"
      bg="white"
      style={{ borderBottom: '1px solid #E4E4E7' }}
    >
      <Container size="xl" w="100%" px={{ base: 20, sm: 'md' }}>
        <Group justify="space-between" align="flex-end" mb={{ base: 28, lg: 36 }} wrap="wrap" gap="sm">
          <Stack gap={8}>
            <Group gap="xs">
              <Badge
                variant="light"
                color="dark"
                radius="sm"
                styles={{ label: { fontFamily: 'var(--font-mono)' } }}
              >
                {s.eyebrow}
              </Badge>
            </Group>

            <Title order={2} fz={{ base: 26, sm: 36, lg: 44 }} lh={1.15} fw={800} c="dark.9">
              {s.title}
            </Title>

            <Text visibleFrom="sm" c="dimmed" fz={{ base: 'sm', sm: 'md', lg: 'lg' }} maw={680} lh={1.55}>
              {s.subtitle}
            </Text>
          </Stack>

          <Button
            visibleFrom="sm"
            color="dark.9"
            radius="xl"
            size="md"
            component="a"
            href="#contacts"
            rightSection={<ArrowRight size={16} />}
          >
            {t.nav.cta}
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 16, sm: 'lg' }}>
          {s.stages.map((stage, idx) => {
            const Icon = STEP_ICONS[idx] || CheckCircle2;
            return (
              <motion.div
                key={stage.num}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Card
                  withBorder
                  radius="xl"
                  p={{ base: 22, sm: 'xl' }}
                  h="100%"
                  bg={idx === 3 ? '#FAFAFA' : 'white'}
                  style={{
                    borderColor: idx === 3 ? '#09090B' : '#E4E4E7',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Group justify="space-between" align="center" wrap="nowrap" mb="sm">
                      <Badge
                        color="dark.9"
                        variant={idx === 3 ? 'filled' : 'light'}
                        size="md"
                        radius="xl"
                        styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                      >
                        {stage.num}
                      </Badge>

                      <ThemeIcon
                        size={38}
                        radius="lg"
                        color={idx === 3 ? 'dark.9' : 'gray.1'}
                        c={idx === 3 ? 'teal.4' : 'dark.9'}
                      >
                        <Icon size={18} />
                      </ThemeIcon>
                    </Group>

                    <Title order={3} fz={{ base: 18, sm: 20 }} fw={800} c="dark.9" mb={6}>
                      {stage.title}
                    </Title>

                    <Text fz="sm" fw={{ base: 400, sm: 600 }} c={{ base: 'dimmed', sm: 'dark.8' }} lh={1.55} mb={{ base: 0, sm: 'xs' }}>
                      {stage.desc}
                    </Text>

                    <Text visibleFrom="sm" fz="sm" c="dimmed" lh={1.5}>
                      {stage.detail}
                    </Text>
                  </Box>

                  <Group
                    visibleFrom="sm"
                    justify="space-between"
                    align="center"
                    wrap="nowrap"
                    mt="md"
                    pt="xs"
                    style={{ borderTop: '1px solid #F4F4F5' }}
                  >
                    <Text
                      fz={11}
                      fw={700}
                      c="teal.7"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      0{idx + 1} / 04
                    </Text>
                    <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
                  </Group>
                </Card>
              </motion.div>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
