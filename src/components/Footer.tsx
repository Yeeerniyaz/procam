import { Anchor, Box, Container, Group, Text } from '@mantine/core';
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
      mt="lg"
      pt="md"
      style={{ borderTop: '1px solid #E4E4E7' }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Group gap="md" wrap="wrap">
            <Logo tagline={t.nav.brandTagline} />
            <Group gap={6} visibleFrom="sm">
              <MapPin size={14} color="#10B981" />
              <Text fz="xs" c="dimmed">
                {c.area}: {c.areaValue}
              </Text>
            </Group>
          </Group>

          <Group gap="md" wrap="wrap">
            <Anchor
              href={PHONES.main.tel}
              underline="never"
              fw={700}
              fz="xs"
              c="dark.9"
              style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}
            >
              <Group gap={5} wrap="nowrap">
                <Phone size={13} color="#10B981" />
                <span>{PHONES.main.display}</span>
              </Group>
            </Anchor>

            <Anchor
              href={PHONES.extra.tel}
              underline="never"
              fw={600}
              fz="xs"
              c="dimmed"
              style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}
            >
              <Group gap={5} wrap="nowrap">
                <Phone size={13} />
                <span>{PHONES.extra.display}</span>
              </Group>
            </Anchor>

            <SocialLinks />
          </Group>

          <Text fz="xs" c="dimmed">
            © {year} ProCam. {t.footer.tagline}
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
