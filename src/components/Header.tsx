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

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [opened, { toggle, close }] = useDisclosure(false);

  const links = [
    { href: '#hardware', label: t.nav.equipment },
    { href: '#advantages', label: t.nav.advantages },
    { href: '#steps', label: t.nav.steps },
    { href: '#contacts', label: t.nav.contacts },
  ];

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
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%" wrap="nowrap" gap="md">
          <Logo tagline={t.nav.brandTagline} />

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="lg" wrap="nowrap">
            {links.map((l) => (
              <Anchor
                key={l.href}
                href={l.href}
                underline="never"
                fw={600}
                fz="sm"
                c="dark.8"
                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {l.label}
              </Anchor>
            ))}
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
                component="a"
                href={PHONES.main.tel}
                leftSection={<Phone size={14} color="#10B981" />}
                styles={{ label: { fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' } }}
              >
                {PHONES.main.display}
              </Button>

              <Button
                color="dark.9"
                radius="xl"
                size="sm"
                component="a"
                href="#contacts"
                styles={{ label: { whiteSpace: 'nowrap' } }}
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
              onClick={close}
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
            onClick={close}
          >
            {t.nav.cta}
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
