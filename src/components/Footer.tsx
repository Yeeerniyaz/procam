import { useState } from 'react';
import { Anchor, Box, Container, Group, Text, UnstyledButton } from '@mantine/core';
import { Globe, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { EMAIL, PHONES, WEBSITE, WEBSITE_DISPLAY } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import AuthorProjectsModal from './AuthorProjectsModal';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

interface FooterProps {
  onNavigateRadar?: () => void;
}

export default function Footer({ onNavigateRadar }: FooterProps) {
  const { lang, t } = useLanguage();
  const isKz = lang === 'kz';
  const c = t.contacts;
  const year = new Date().getFullYear();
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Box
      component="footer"
      mt="lg"
      pt="md"
      pb={{ base: 64, lg: 'md' }}
      style={{ borderTop: '1px solid #E4E4E7' }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
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

            <Anchor
              href={`mailto:${EMAIL}`}
              underline="hover"
              fw={600}
              fz="xs"
              c="dimmed"
              visibleFrom="sm"
              style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}
            >
              <Group gap={5} wrap="nowrap">
                <Mail size={13} color="#10B981" />
                <span>{EMAIL}</span>
              </Group>
            </Anchor>

            <Anchor
              href={WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              fw={700}
              fz="xs"
              c="dark.9"
              visibleFrom="sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Group gap={5} wrap="nowrap">
                <Globe size={13} color="#10B981" />
                <span>{WEBSITE_DISPLAY}</span>
              </Group>
            </Anchor>

            <SocialLinks />
          </Group>

          {/* Discreet Author & Projects signature */}
          <Group justify="space-between" align="center" w="100%" pt="xs" style={{ borderTop: '1px solid #F4F4F5' }} wrap="wrap" gap="xs">
            <Text fz="xs" c="dimmed">
              © {year} ProCam. {t.footer.tagline}
            </Text>

            <Group gap="xs" wrap="wrap">
              <Text fz="xs" c="dimmed">
                {isKz ? 'Әзірлеуші және автор:' : 'Автор и разработчик:'}
              </Text>
              <Anchor
                href={WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                fz="xs"
                fw={700}
                c="dark.8"
                underline="hover"
              >
                {isKz ? 'Ернияз' : 'Ернияз'}
              </Anchor>
              <Text fz="xs" c="dimmed">
                (
                <Anchor
                  href={WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  fz="xs"
                  c="teal.7"
                  fw={600}
                  underline="hover"
                >
                  {WEBSITE_DISPLAY}
                </Anchor>
                )
              </Text>
              <Text fz="xs" c="dimmed">
                ·
              </Text>
              <Anchor
                href={`mailto:${EMAIL}`}
                fz="xs"
                c="dimmed"
                underline="hover"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {EMAIL}
              </Anchor>
              <Text fz="xs" c="dimmed">
                ·
              </Text>
              <UnstyledButton
                onClick={() => setModalOpened(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#10B981',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                <Sparkles size={12} />
                <span>{isKz ? 'Барлық жобалар & мен туралы' : 'Все проекты & обо мне'}</span>
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </Container>

      <AuthorProjectsModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onNavigateRadar={onNavigateRadar}
      />
    </Box>
  );
}
