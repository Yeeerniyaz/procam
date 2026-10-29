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
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Phone } from 'lucide-react';
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
      pos="sticky"
      top={0}
      bg="rgba(255, 255, 255, 0.92)"
      style={{
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Container size="xl">
        <Group justify="space-between" h={68} wrap="nowrap">
          <Logo tagline={t.nav.brandTagline} />

          {/* Desktop Navigation */}
          <Group gap="lg" visibleFrom="md" wrap="nowrap">
            {links.map((l) => (
              <Anchor
                key={l.href}
                href={l.href}
                underline="never"
                fw={500}
                fz="sm"
                c="dark"
              >
                {l.label}
              </Anchor>
            ))}
          </Group>

          {/* Right Actions + Language Switcher + Mobile Burger */}
          <Group gap="sm" wrap="nowrap">
            <SegmentedControl
              size="xs"
              value={lang.toUpperCase()}
              onChange={(val) => setLang(val.toLowerCase() as Lang)}
              data={['RU', 'KZ']}
              aria-label={t.nav.langLabel}
            />

            <Group gap="xs" visibleFrom="md" wrap="nowrap">
              <Button
                variant="default"
                component="a"
                href="tel:+77066066323"
                leftSection={<Phone size={15} />}
                size="sm"
              >
                +7 (706) 606-63-23
              </Button>

              <Button
                color="dark"
                component="a"
                href="#contacts"
                size="sm"
              >
                {t.nav.cta}
              </Button>
            </Group>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
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
        padding="md"
        title={
          <Text fw={700} fz="md">
            ProCam // Алматы
          </Text>
        }
        hiddenFrom="md"
        zIndex={200}
      >
        <Stack gap="md">
          {links.map((l) => (
            <Anchor
              key={l.href}
              href={l.href}
              onClick={close}
              underline="never"
              fw={600}
              fz="lg"
              c="dark"
              py="xs"
              style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
            >
              {l.label}
            </Anchor>
          ))}

          <Divider my="xs" label="Прямая связь с инженером" labelPosition="center" />

          <Button
            variant="default"
            size="md"
            fullWidth
            component="a"
            href="tel:+77066066323"
            leftSection={<Phone size={16} />}
          >
            +7 706 606 63 23
          </Button>

          <Button
            variant="default"
            size="md"
            fullWidth
            component="a"
            href="tel:+77776066323"
            leftSection={<Phone size={16} />}
          >
            +7 777 606 63 23
          </Button>

          <Button
            fullWidth
            size="lg"
            color="dark"
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
