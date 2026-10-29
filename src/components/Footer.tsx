import { Anchor, Box, Container, Divider, Group, Stack, Text } from '@mantine/core';
import { MapPin, Phone } from 'lucide-react';
import { PHONES } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { t } = useLanguage();
  const c = t.contacts;
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      bg="white"
      style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}
    >
      <Container size="xl" py="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="lg">
          <Stack gap={4}>
            <Logo tagline={t.nav.brandTagline} />
            <Group gap={6} mt={4}>
              <MapPin size={14} color="var(--mantine-color-teal-6)" />
              <Text fz="xs" c="dimmed">
                {c.area}: {c.areaValue}
              </Text>
            </Group>
          </Stack>

          <Group gap="lg" wrap="wrap">
            <Anchor
              href={PHONES.main.tel}
              underline="never"
              fw={700}
              fz="sm"
              c="dark.9"
            >
              <Group gap={6}>
                <Phone size={15} color="var(--mantine-color-teal-6)" />
                <span>+7 (706) 606-63-23</span>
              </Group>
            </Anchor>

            <Anchor
              href="tel:+77776066323"
              underline="never"
              fw={600}
              fz="sm"
              c="dimmed"
            >
              <Group gap={6}>
                <Phone size={15} />
                <span>+7 (777) 606-63-23</span>
              </Group>
            </Anchor>
          </Group>

          <SocialLinks />
        </Group>

        <Divider my="lg" />

        <Group justify="space-between" wrap="wrap" gap="xs">
          <Text fz="xs" c="dimmed">
            © {year} ProCam. {t.footer.tagline}
          </Text>
          <Text fz="xs" ff="monospace" c="dimmed">
            ALMATY // HIKVISION · HIWATCH · DAHUA IP
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
