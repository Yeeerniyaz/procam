import { Anchor, Box, Group, Indicator, Text, ThemeIcon } from '@mantine/core';
import { Cctv } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';

export default function Logo({ tagline, dark = false }: { tagline?: string; dark?: boolean }) {
  return (
    <Anchor
      href={`#${SECTION_IDS.hero}`}
      underline="never"
      aria-label="ProCam CCTV Almaty"
    >
      <Group gap="xs" wrap="nowrap">
        <Indicator color="teal" size={9} offset={2} processing withBorder>
          <ThemeIcon
            size={36}
            radius="md"
            color={dark ? 'gray.0' : 'dark.9'}
            c={dark ? 'dark.9' : 'white'}
          >
            <Cctv size={18} strokeWidth={2} />
          </ThemeIcon>
        </Indicator>

        <Box>
          <Text fw={800} fz="md" lh={1.1} c={dark ? 'white' : 'dark.9'} style={{ letterSpacing: '-0.03em' }}>
            PRO<Text component="span" fw={500} c="dimmed" inherit>CAM</Text>
          </Text>
          <Text fz={10} c="dimmed" tt="uppercase" fw={600} lh={1.1} style={{ letterSpacing: '0.06em' }}>
            {tagline || 'CCTV · ALMATY'}
          </Text>
        </Box>
      </Group>
    </Anchor>
  );
}
