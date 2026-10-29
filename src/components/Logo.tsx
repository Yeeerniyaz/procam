import { Anchor, Box, Group, Stack, Text } from '@mantine/core';
import { SECTION_IDS } from '../config/contacts';

export interface CyberOwlMarkProps {
  size?: number;
  withBadge?: boolean;
  monochrome?: 'black' | 'white';
}

export function CyberOwlMark({
  size = 40,
  withBadge = true,
  monochrome,
}: CyberOwlMarkProps) {
  const isMonoBlack = monochrome === 'black';
  const isMonoWhite = monochrome === 'white';

  const bgFill = isMonoBlack ? '#000000' : isMonoWhite ? '#FFFFFF' : '#09090B';
  const shieldFill = isMonoBlack ? '#000000' : isMonoWhite ? 'none' : '#18181B';
  const shieldStroke = isMonoBlack ? '#FFFFFF' : isMonoWhite ? '#FFFFFF' : '#E4E4E7';
  const browStroke = isMonoBlack ? '#FFFFFF' : isMonoWhite ? '#FFFFFF' : '#FFFFFF';
  const eyeOuterFill = isMonoBlack ? '#000000' : isMonoWhite ? 'none' : '#09090B';
  const eyeOuterStroke = isMonoBlack ? '#FFFFFF' : isMonoWhite ? '#FFFFFF' : '#FFFFFF';
  const irisStroke = isMonoBlack ? '#FFFFFF' : isMonoWhite ? '#FFFFFF' : '#10B981';
  const glintFill = isMonoBlack ? '#FFFFFF' : isMonoWhite ? '#FFFFFF' : '#10B981';
  const beakFill = isMonoBlack ? '#FFFFFF' : isMonoWhite ? '#FFFFFF' : '#E4E4E7';

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
      {withBadge && !isMonoWhite && <rect width="64" height="64" rx="15" fill={bgFill} />}
      {withBadge && isMonoWhite && (
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="13.5"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
      )}
      {/* Geometric Owl Shield & Angular Crest */}
      <path
        d="M11 15L23 21L32 14L41 21L53 15L55 34C55 46.5 44.5 54.5 32 57C19.5 54.5 9 46.5 9 34L11 15Z"
        fill={shieldFill}
        stroke={shieldStroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Sharp Angular V-Brow Crest */}
      <path
        d="M13 21L32 31L51 21"
        stroke={browStroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left 4K Camera Lens Eye */}
      <circle cx="22" cy="34" r="7.5" fill={eyeOuterFill} stroke={eyeOuterStroke} strokeWidth="2" />
      <circle cx="22" cy="34" r="3.5" fill={eyeOuterFill} stroke={irisStroke} strokeWidth="1.6" />
      <circle cx="23.5" cy="32.5" r="1.7" fill={glintFill} />
      {/* Right 4K Camera Lens Eye */}
      <circle cx="42" cy="34" r="7.5" fill={eyeOuterFill} stroke={eyeOuterStroke} strokeWidth="2" />
      <circle cx="42" cy="34" r="3.5" fill={eyeOuterFill} stroke={irisStroke} strokeWidth="1.6" />
      <circle cx="43.5" cy="32.5" r="1.7" fill={glintFill} />
      {/* Geometric Predator Beak */}
      <path d="M32 37L28.5 44L32 50L35.5 44L32 37Z" fill={beakFill} />
    </svg>
  );
}

export interface LogoProps {
  tagline?: string;
  dark?: boolean;
  variant?: 'horizontal' | 'vertical' | 'icon' | 'wordmark';
  showTagline?: boolean;
  iconSize?: number;
}

export default function Logo({
  tagline,
  dark = false,
  variant = 'horizontal',
  showTagline = true,
  iconSize = 38,
}: LogoProps) {
  const proColor = dark ? '#FFFFFF' : '#09090B';
  const camColor = dark ? '#A1A1AA' : '#52525B';
  const subColor = dark ? '#A1A1AA' : '#71717A';

  if (variant === 'icon') {
    return (
      <Anchor
        href={`#${SECTION_IDS.hero}`}
        underline="never"
        aria-label="ProCam CCTV Almaty"
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <CyberOwlMark size={iconSize} />
      </Anchor>
    );
  }

  const wordmarkBlock = (align: 'left' | 'center' = 'left') => (
    <Box style={{ whiteSpace: 'nowrap', textAlign: align }}>
      <Text
        fz={{ base: 18, sm: 19 }}
        lh={1.02}
        style={{
          letterSpacing: '-0.03em',
          color: proColor,
          fontWeight: 900,
        }}
      >
        PRO
        <Text
          component="span"
          inherit
          style={{
            fontWeight: 400,
            color: camColor,
          }}
        >
          CAM
        </Text>
      </Text>
      {showTagline && (
        <Text
          fz={{ base: 7, xs: 9.5 }}
          tt="uppercase"
          fw={600}
          lh={1.15}
          mt={2}
          style={{
            letterSpacing: '0.03em',
            color: subColor,
          }}
        >
          {tagline || 'CCTV · ALMATY'}
        </Text>
      )}
    </Box>
  );

  if (variant === 'wordmark') {
    return (
      <Anchor
        href={`#${SECTION_IDS.hero}`}
        underline="never"
        aria-label="ProCam CCTV Almaty"
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {wordmarkBlock('left')}
      </Anchor>
    );
  }

  if (variant === 'vertical') {
    return (
      <Anchor
        href={`#${SECTION_IDS.hero}`}
        underline="never"
        aria-label="ProCam CCTV Almaty"
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <Stack gap={8} align="center">
          <CyberOwlMark size={iconSize} />
          {wordmarkBlock('center')}
        </Stack>
      </Anchor>
    );
  }

  return (
    <Anchor
      href={`#${SECTION_IDS.hero}`}
      underline="never"
      aria-label="ProCam CCTV Almaty"
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <Group gap={8} wrap="nowrap">
        <CyberOwlMark size={iconSize} />
        {wordmarkBlock('left')}
      </Group>
    </Anchor>
  );
}
