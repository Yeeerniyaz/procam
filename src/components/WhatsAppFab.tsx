import { ActionIcon, Affix, Indicator, Tooltip } from '@mantine/core';
import { WHATSAPP_URL } from '../config/contacts';
import { WhatsAppIcon } from './icons/BrandIcons';

export default function WhatsAppFab() {
  return (
    <Affix position={{ bottom: 20, right: 20 }} zIndex={90}>
      <Tooltip label="Написать в WhatsApp" position="left" withArrow>
        <Indicator color="teal" size={11} offset={4} processing withBorder>
          <ActionIcon
            component="a"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            size={52}
            radius="xl"
            color="dark.9"
            variant="filled"
            style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)' }}
          >
            <WhatsAppIcon size={24} />
          </ActionIcon>
        </Indicator>
      </Tooltip>
    </Affix>
  );
}
