import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  SegmentedControl,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Phone } from 'lucide-react';
import { PHONES } from '../config/contacts';
import { type Lang } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';

interface HeaderProps {
  activePage?: 'home' | 'radar';
  onNavigatePage?: (page: 'home' | 'radar') => void;
}

export default function Header({ activePage = 'home', onNavigatePage }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const [opened, { toggle, close }] = useDisclosure(false);

  const links = [
    { href: '#hardware', label: t.nav.equipment },
    { href: '#advantages', label: t.nav.advantages },
    { href: '#steps', label: t.nav.steps },
    { href: '#contacts', label: t.nav.contacts },
  ];

  const handleSectionClick = () => {
    if (activePage !== 'home' && onNavigatePage) {
      onNavigatePage('home');
    }
    close();
  };

  return (
    <Box
      component="header"
      pos={{ base: 'sticky', lg: 'fixed' }}
      top={0}
      left={0}
      right={0}
      bg="rgba(255, 255, 255, 0.90)"
      style={{
        zIndex: 100,
        height: 64,
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #E4E4E7',
      }}
    >
      <Container fluid h="100%" px={{ base: 'md', sm: 'xl', lg: 24, xl: 40 }} style={{ maxWidth: 1440 }}>
        <Group justify="space-between" h="100%" wrap="nowrap" gap="md">
          <Box onClick={() => onNavigatePage?.('home')} style={{ cursor: 'pointer', flexShrink: 0 }}>
            <Logo tagline={t.nav.brandTagline} showTagline={false} />
          </Box>

          {/* Desktop Navigation */}
          <Group visibleFrom="lg" wrap="nowrap" style={{ flexShrink: 1, gap: 'clamp(14px, 1.8vw, 28px)' }}>
            {links.map((l) => (
              <Anchor
                key={l.href}
                href={l.href}
                onClick={handleSectionClick}
                underline="never"
                fw={600}
                fz={{ lg: 13.5, xl: 14.5 }}
                c="dark.8"
                style={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'color 0.15s ease',
                }}
              >
                {l.label}
              </Anchor>
            ))}

            <Anchor
              component="button"
              type="button"
              onClick={() => onNavigatePage?.(activePage === 'radar' ? 'home' : 'radar')}
              underline="never"
              fw={700}
              fz={{ lg: 13.5, xl: 14.5 }}
              c={activePage === 'radar' ? 'teal.7' : 'dark.9'}
              style={{
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{lang === 'kz' ? 'Radar (БҚ)' : 'Radar (ПО)'}</span>
              <Box
                component="span"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: '#10B981',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  padding: '2px 6px',
                  borderRadius: 6,
                  lineHeight: 1.2,
                }}
              >
                v4.0
              </Box>
            </Anchor>
          </Group>

          {/* Right Actions + Language Switcher + Mobile Burger */}
          <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
            <SegmentedControl
              size="xs"
              radius="xl"
              value={lang.toUpperCase()}
              onChange={(val) => setLang(val.toLowerCase() as Lang)}
              data={['RU', 'KZ']}
              aria-label={t.nav.langLabel}
            />

            <Group gap="xs" visibleFrom="lg" wrap="nowrap">
              <Button
                variant="default"
                radius="xl"
                size="sm"
                px={{ lg: 12, xl: 16 }}
                component="a"
                href={PHONES.main.tel}
                leftSection={<Phone size={14} color="#10B981" />}
                styles={{
                  root: { flexShrink: 0 },
                  label: { fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', fontSize: 13 },
                }}
              >
                {PHONES.main.display}
              </Button>

              <Button
                color="dark.9"
                radius="xl"
                size="sm"
                px={{ lg: 14, xl: 18 }}
                component="a"
                href="#contacts"
                onClick={handleSectionClick}
                styles={{
                  root: { flexShrink: 0 },
                  label: { whiteSpace: 'nowrap', fontSize: 13, fontWeight: 700 },
                }}
              >
                {t.nav.cta}
              </Button>
            </Group>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="lg"
              size="sm"
              aria-label={opened ? t.nav.menuClose : t.nav.menuOpen}
            />
          </Group>
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="lg"
        title={<Logo tagline={t.nav.brandTagline} />}
        hiddenFrom="lg"
        zIndex={200}
      >
        <Stack gap="md" mt="sm">
          {links.map((l) => (
            <Anchor
              key={l.href}
              href={l.href}
              onClick={handleSectionClick}
              underline="never"
              fw={700}
              fz="lg"
              c="dark.9"
              py="xs"
              style={{ borderBottom: '1px solid #F4F4F5' }}
            >
              {l.label}
            </Anchor>
          ))}

          <Anchor
            component="button"
            type="button"
            onClick={() => {
              onNavigatePage?.(activePage === 'radar' ? 'home' : 'radar');
              close();
            }}
            underline="never"
            fw={700}
            fz="lg"
            c={activePage === 'radar' ? 'teal.7' : 'dark.9'}
            py="xs"
            style={{
              borderBottom: '1px solid #F4F4F5',
              textAlign: 'left',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
            }}
          >
            {t.nav.radar}
          </Anchor>

          <Divider my="xs" />

          <Button
            variant="default"
            size="md"
            radius="xl"
            fullWidth
            component="a"
            href={PHONES.main.tel}
            leftSection={<Phone size={16} color="#10B981" />}
            styles={{ label: { fontFamily: 'var(--font-mono)' } }}
          >
            {PHONES.main.display}
          </Button>

          <Button
            variant="default"
            size="md"
            radius="xl"
            fullWidth
            component="a"
            href={PHONES.extra.tel}
            leftSection={<Phone size={16} />}
            styles={{ label: { fontFamily: 'var(--font-mono)' } }}
          >
            {PHONES.extra.display}
          </Button>

          <Button
            fullWidth
            size="lg"
            radius="xl"
            color="dark.9"
            component="a"
            href="#contacts"
            onClick={handleSectionClick}
          >
            {t.nav.cta}
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
