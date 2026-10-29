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
      <Container size="xl" w="100%">
        <Group justify="space-between" align="flex-end" mb={{ base: 'xl', lg: 40 }} wrap="wrap" gap="md">
          <Stack gap="xs">
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

            <Title order={2} fz={{ base: 26, sm: 36, lg: 44 }} fw={800} c="dark.9">
              {s.title}
            </Title>

            <Text c="dimmed" fz={{ base: 'sm', sm: 'md', lg: 'lg' }} maw={680}>
              {s.subtitle}
            </Text>
          </Stack>

          <Button
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

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
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
                  p={{ base: 'lg', sm: 'xl' }}
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
                    <Group justify="space-between" align="center" mb="lg">
                      <Badge
                        color="dark.9"
                        variant={idx === 3 ? 'filled' : 'light'}
                        size="lg"
                        radius="xl"
                        styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                      >
                        {stage.num}
                      </Badge>

                      <ThemeIcon
                        size={42}
                        radius="lg"
                        color={idx === 3 ? 'dark.9' : 'gray.1'}
                        c={idx === 3 ? 'teal.4' : 'dark.9'}
                      >
                        <Icon size={20} />
                      </ThemeIcon>
                    </Group>

                    <Title order={3} fz="lg" fw={800} c="dark.9" mb="xs">
                      {stage.title}
                    </Title>

                    <Text fz="sm" fw={600} c="dark.8" lh={1.55} mb="sm">
                      {stage.desc}
                    </Text>

                    <Text fz="xs" c="dimmed" lh={1.55}>
                      {stage.detail}
                    </Text>
                  </Box>

                  <Group
                    justify="space-between"
                    mt="lg"
                    pt="sm"
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
                    <CheckCircle2 size={15} color="#10B981" />
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
