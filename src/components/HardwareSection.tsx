import {
  Badge,
  Box,
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
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function HardwareSection() {
  const { t } = useLanguage();
  const hw = t.hardware;

  return (
    <Box
      component="section"
      id="hardware"
      className="vms-screen-section"
      bg="white"
      style={{ borderBottom: '1px solid #E4E4E7' }}
    >
      <Container size="xl" w="100%">
        <Stack gap="xs" mb={{ base: 'xl', lg: 36 }}>
          <Group gap="xs">
            <Badge
              variant="light"
              color="dark"
              radius="sm"
              styles={{ label: { fontFamily: 'var(--font-mono)' } }}
            >
              {hw.eyebrow}
            </Badge>
          </Group>

          <Title order={2} fz={{ base: 26, sm: 36, lg: 44 }} fw={800} c="dark.9">
            {hw.title}
          </Title>

          <Text c="dimmed" fz={{ base: 'sm', sm: 'md', lg: 'lg' }} maw={720}>
            {hw.subtitle}
          </Text>
        </Stack>

        <Grid gutter="xl" align="stretch">
          {hw.cards.map((card, idx) => {
            const isPrimary = idx === 0;
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
                    p={{ base: 'lg', sm: 32 }}
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
                      <Group justify="space-between" align="center" mb="md">
                        <Text
                          fz={32}
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
                          size="md"
                          radius="xl"
                        >
                          {card.badge}
                        </Badge>
                      </Group>

                      <Text
                        fz="xs"
                        fw={700}
                        tt="uppercase"
                        c="teal.7"
                        mb={4}
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
                      >
                        {card.tag}
                      </Text>

                      <Title order={3} fz={{ base: 22, sm: 26 }} fw={800} c="dark.9" mb="sm">
                        {card.num}. {card.name}
                      </Title>

                      <Text c="dimmed" fz="sm" lh={1.6} mb="lg">
                        {card.description}
                      </Text>

                      <List
                        spacing="xs"
                        size="sm"
                        icon={
                          <ThemeIcon color="dark.9" size={20} radius="xl">
                            <Check size={12} strokeWidth={3} />
                          </ThemeIcon>
                        }
                      >
                        {card.features.map((feature) => (
                          <List.Item key={feature}>
                            <Text fz="sm" fw={500} c="dark.8">
                              {feature}
                            </Text>
                          </List.Item>
                        ))}
                      </List>
                    </Box>

                    <Box mt="lg">
                      <Divider mb="sm" color="#E4E4E7" />
                      <Group justify="space-between">
                        <Text
                          fz="xs"
                          c="dimmed"
                          fw={700}
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {card.footer}
                        </Text>
                        <Box
                          w={8}
                          h={8}
                          style={{ borderRadius: '50%', backgroundColor: '#10B981' }}
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
