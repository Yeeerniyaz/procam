import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

function CyberOwlOpticalCore() {
  return (
    <Paper
      bg="dark.9"
      radius="xl"
      p={{ base: 24, sm: 44, lg: 56 }}
      withBorder
      style={{
        borderColor: '#27272A',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 50px rgba(9, 9, 11, 0.12)',
      }}
    >
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: 'clamp(176px, 48vw, 280px)',
          height: 'auto',
          display: 'block',
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="owlCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="owlArmor" x1="140" y1="24" x2="140" y2="256" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#27272A" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
        </defs>

        {/* Subtle Radial Ambient Optical Glow */}
        <circle cx="140" cy="140" r="130" fill="url(#owlCoreGlow)" />

        {/* Outer Precision Optical Ring */}
        <circle
          cx="140"
          cy="140"
          r="124"
          stroke="#27272A"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />

        {/* Geometric Cyber-Owl Predator Shield Silhouette */}
        <path
          d="M 48 56 L 98 84 L 140 48 L 182 84 L 232 56 L 242 146 C 242 204 196 240 140 254 C 84 240 38 204 38 146 Z"
          fill="url(#owlArmor)"
          stroke="#A1A1AA"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Inner Geometric Armor Facets */}
        <path
          d="M 60 74 L 140 116 L 220 74"
          stroke="#E4E4E7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 52 146 L 94 192 L 140 236 L 186 192 L 228 146"
          stroke="#3F3F46"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M 140 48 L 140 108"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Left 4K Camera Lens Eye */}
        <g>
          <circle cx="94" cy="142" r="34" fill="#09090B" stroke="#E4E4E7" strokeWidth="2.4" />
          <motion.circle
            cx="94"
            cy="142"
            r="26"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="10 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '94px 142px' }}
          />
          <circle cx="94" cy="142" r="18" fill="#09090B" stroke="#71717A" strokeWidth="1.4" />
          <motion.circle
            cx="94"
            cy="142"
            r="10"
            fill="#10B981"
            fillOpacity="0.25"
            stroke="#10B981"
            strokeWidth="2"
            animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '94px 142px' }}
          />
          <circle cx="99" cy="136" r="4" fill="#10B981" />
          <circle cx="88" cy="148" r="1.8" fill="#FFFFFF" fillOpacity="0.8" />
        </g>

        {/* Right 4K Camera Lens Eye */}
        <g>
          <circle cx="186" cy="142" r="34" fill="#09090B" stroke="#E4E4E7" strokeWidth="2.4" />
          <motion.circle
            cx="186"
            cy="142"
            r="26"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="10 6"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '186px 142px' }}
          />
          <circle cx="186" cy="142" r="18" fill="#09090B" stroke="#71717A" strokeWidth="1.4" />
          <motion.circle
            cx="186"
            cy="142"
            r="10"
            fill="#10B981"
            fillOpacity="0.25"
            stroke="#10B981"
            strokeWidth="2"
            animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '186px 142px' }}
          />
          <circle cx="191" cy="136" r="4" fill="#10B981" />
          <circle cx="180" cy="148" r="1.8" fill="#FFFFFF" fillOpacity="0.8" />
        </g>

        {/* Sharp Geometric Beak */}
        <path
          d="M 140 154 L 124 186 L 140 214 L 156 186 Z"
          fill="#E4E4E7"
          stroke="#09090B"
          strokeWidth="2"
        />
      </svg>
    </Paper>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <Box
      component="section"
      id="top"
      className="vms-screen-section bg-architectural-grid"
      style={{ borderBottom: '1px solid #E4E4E7' }}
    >
      <Container size="xl" w="100%" px={{ base: 20, sm: 'md' }}>
        <Grid gutter={{ base: 32, sm: 32, lg: 56 }} align="center">
          {/* ============================================================ */}
          {/* LEFT COLUMN (7 cols on lg)                                   */}
          {/* ============================================================ */}
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Badge
              variant="dot"
              color="teal"
              size="md"
              radius="xl"
              mb={{ base: 'md', sm: 'sm' }}
              bg="white"
              styles={{
                root: { border: '1px solid #E4E4E7' },
                label: { color: '#09090B', fontWeight: 600, textTransform: 'none' },
              }}
            >
              {h.badge}
            </Badge>

            <Title
              order={1}
              lh={1.1}
              fw={800}
              mb={{ base: 'md', sm: 'sm' }}
              c="dark.9"
              style={{
                fontSize: 'clamp(1.85rem, 7.2vw, 3.75rem)',
                letterSpacing: '-0.025em',
                overflowWrap: 'break-word',
              }}
            >
              {h.title}
            </Title>

            <Text c="dimmed" fz={{ base: 'md', sm: 'xl' }} maw={540} mb="xl" lh={1.6}>
              {h.subtitle}
            </Text>

            <Stack hiddenFrom="sm" gap="sm" mb={32}>
              <Button
                size="md"
                h={50}
                radius="xl"
                color="dark.9"
                fullWidth
                component="a"
                href="#contacts"
                rightSection={<ArrowRight size={17} />}
              >
                {h.primaryCta}
              </Button>
              <Button
                size="md"
                h={50}
                radius="xl"
                variant="default"
                fullWidth
                component="a"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<WhatsAppIcon size={17} />}
              >
                {h.secondaryCta}
              </Button>
            </Stack>

            <Group visibleFrom="sm" gap="md" mb="xl">
              <Button
                size="lg"
                radius="xl"
                color="dark.9"
                component="a"
                href="#contacts"
                rightSection={<ArrowRight size={18} />}
              >
                {h.primaryCta}
              </Button>
              <Button
                size="lg"
                radius="xl"
                variant="default"
                component="a"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<WhatsAppIcon size={18} />}
              >
                {h.secondaryCta}
              </Button>
            </Group>

            {/* Minimal 4-Item Bottom Metrics Row */}
            <SimpleGrid
              cols={{ base: 2, sm: 4 }}
              spacing={{ base: 'lg', sm: 'lg' }}
              pt={{ base: 'xl', sm: 'lg' }}
              style={{ borderTop: '1px solid #E4E4E7' }}
            >
              {h.highlights.map((item) => (
                <Box key={item.value}>
                  <Text fw={900} fz={{ base: 22, sm: 26 }} c="dark.9" lh={1.1}>
                    {item.value}
                  </Text>
                  <Text fz={{ base: 'xs', sm: 'sm' }} c="dimmed" mt={4}>
                    {item.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Grid.Col>

          {/* ============================================================ */}
          {/* RIGHT COLUMN (5 cols on lg): Pure Animated Cyber-Owl Art     */}
          {/* ============================================================ */}
          <Grid.Col span={{ base: 12, lg: 5 }} visibleFrom="lg">
            <CyberOwlOpticalCore />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
