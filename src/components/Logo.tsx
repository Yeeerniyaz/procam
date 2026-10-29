import { Anchor, Box, Group, Text } from '@mantine/core';
import { SECTION_IDS } from '../config/contacts';

export function CyberOwlMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="15" fill="#09090B" />
      {/* Geometric Owl Shield & Angular Crest */}
      <path
        d="M11 15L23 21L32 14L41 21L53 15L55 34C55 46.5 44.5 54.5 32 57C19.5 54.5 9 46.5 9 34L11 15Z"
        fill="#18181B"
        stroke="#E4E4E7"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Sharp Angular V-Brow Crest */}
      <path
        d="M13 21L32 31L51 21"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left 4K Camera Lens Eye */}
      <circle cx="22" cy="34" r="7.5" fill="#09090B" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="22" cy="34" r="3.5" fill="#09090B" stroke="#10B981" strokeWidth="1.6" />
      <circle cx="23.5" cy="32.5" r="1.7" fill="#10B981" />
      {/* Right 4K Camera Lens Eye */}
      <circle cx="42" cy="34" r="7.5" fill="#09090B" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="42" cy="34" r="3.5" fill="#09090B" stroke="#10B981" strokeWidth="1.6" />
      <circle cx="43.5" cy="32.5" r="1.7" fill="#10B981" />
      {/* Geometric Predator Beak */}
      <path d="M32 37L28.5 44L32 50L35.5 44L32 37Z" fill="#E4E4E7" />
    </svg>
  );
}

export default function Logo({ tagline, dark = false }: { tagline?: string; dark?: boolean }) {
  return (
    <Anchor
      href={`#${SECTION_IDS.hero}`}
      underline="never"
      aria-label="ProCam CCTV Almaty"
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <Group gap="xs" wrap="nowrap">
        <CyberOwlMark size={40} />

        <Box style={{ whiteSpace: 'nowrap' }}>
          <Text
            fz={19}
            lh={1.05}
            style={{
              letterSpacing: '-0.03em',
              color: dark ? '#FFFFFF' : '#09090B',
              fontWeight: 900,
            }}
          >
            PRO
            <Text
              component="span"
              inherit
              style={{
                fontWeight: 400,
                color: dark ? '#A1A1AA' : '#52525B',
              }}
            >
              CAM
            </Text>
          </Text>
          <Text
            fz={9.5}
            tt="uppercase"
            fw={600}
            lh={1.15}
            mt={2}
            style={{
              letterSpacing: '0.07em',
              color: dark ? '#71717A' : '#71717A',
            }}
          >
            {tagline || 'CCTV · ALMATY'}
          </Text>
        </Box>
      </Group>
    </Anchor>
  );
}
