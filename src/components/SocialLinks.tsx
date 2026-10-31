import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { SOCIAL_LINKS, WHATSAPP_URL } from '../config/contacts';
import { GithubIcon, GlobeIcon, MailIcon, TelegramIcon, WhatsAppIcon } from './icons/BrandIcons';

const items = [
  { key: 'whatsapp', label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsAppIcon },
  { key: 'telegram', label: 'Telegram (@yeeeerniyaz)', href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
  { key: 'email', label: 'Email (yeeerniyaz@gmail.com)', href: SOCIAL_LINKS.email, Icon: MailIcon },
  { key: 'website', label: 'Сайт (yeee.kz)', href: SOCIAL_LINKS.website, Icon: GlobeIcon },
  { key: 'github', label: 'GitHub (Yeeerniyaz)', href: SOCIAL_LINKS.github, Icon: GithubIcon },
] as const;

export default function SocialLinks() {
  return (
    <Group gap="xs">
      {items.map(({ key, label, href, Icon }) => {
        const external = !href.startsWith('mailto:');
        return (
          <Tooltip key={key} label={label} withArrow fz="xs">
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
