import {
  Badge,
  Box,
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
import { Cable, Eye, HardDrive, Smartphone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const ICONS = [Cable, Smartphone, HardDrive, Eye];

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;

  return (
    <Box
      component="section"
      id="advantages"
      className="vms-screen-section bg-architectural-grid"
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
              {a.eyebrow}
            </Badge>
          </Group>

          <Title order={2} fz={{ base: 26, sm: 36, lg: 44 }} fw={800} c="dark.9">
            {a.title}
          </Title>

          <Text c="dimmed" fz={{ base: 'sm', sm: 'md', lg: 'lg' }} maw={680}>
            {a.subtitle}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {a.items.map((item, idx) => {
            const Icon = ICONS[idx] || Cable;
            return (
              <motion.div
                key={item.num}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Card
                  withBorder
                  radius="xl"
                  p={{ base: 'lg', sm: 32 }}
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
                    <Group justify="space-between" align="flex-start" mb="md">
                      <Text
                        fz={{ base: 36, sm: 44 }}
                        fw={900}
                        lh={1}
                        c="gray.3"
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '-0.04em' }}
                      >
                        {item.num}
                      </Text>

                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          delay: idx * 0.4,
                          ease: 'easeInOut',
                        }}
                      >
                        <ThemeIcon size={46} radius="lg" color="dark.9" variant="filled">
                          <Icon size={22} color="#10B981" />
                        </ThemeIcon>
                      </motion.div>
                    </Group>

                    <Title order={3} fz={{ base: 20, sm: 24 }} fw={800} c="dark.9" mb="xs">
                      {item.code}
                    </Title>

                    <Text c="dimmed" fz="sm" lh={1.65}>
                      {item.desc}
                    </Text>
                  </Box>

                  <Group
                    justify="space-between"
                    mt="lg"
                    pt="sm"
                    style={{ borderTop: '1px solid #F4F4F5' }}
                  >
                    <Text
                      fz="xs"
                      fw={600}
                      c="teal.7"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.spec}
                    </Text>
                    <Box
                      w={7}
                      h={7}
                      style={{ borderRadius: '50%', backgroundColor: '#10B981' }}
                    />
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
