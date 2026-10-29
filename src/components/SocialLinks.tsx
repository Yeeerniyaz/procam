import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { SOCIAL_LINKS, WHATSAPP_URL } from '../config/contacts';
import { InstagramIcon, TelegramIcon, TikTokIcon, WhatsAppIcon } from './icons/BrandIcons';

const items = [
  { key: 'whatsapp', label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsAppIcon },
  { key: 'telegram', label: 'Telegram', href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
  { key: 'instagram', label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: 'tiktok', label: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
] as const;

export default function SocialLinks() {
  return (
    <Group gap="xs">
      {items.map(({ key, label, href, Icon }) => {
        const external = href !== '#';
        return (
          <Tooltip key={key} label={label} withArrow>
            <ActionIcon
              component="a"
              href={href}
              aria-label={label}
              variant="default"
              size="lg"
              radius="xl"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon size={16} />
            </ActionIcon>
          </Tooltip>
        );
      })}
    </Group>
  );
}
