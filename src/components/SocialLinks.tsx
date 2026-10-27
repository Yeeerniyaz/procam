import { SOCIAL_LINKS, WHATSAPP_URL } from '../config/contacts';
import { InstagramIcon, TelegramIcon, TikTokIcon, WhatsAppIcon } from './icons/BrandIcons';

const items = [
  { key: 'whatsapp', label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsAppIcon },
  { key: 'telegram', label: 'Telegram', href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
  { key: 'instagram', label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: 'tiktok', label: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
] as const;

export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {items.map(({ key, label, href, Icon }) => {
        const external = href !== '#';
        return (
          <li key={key}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
            >
              <Icon size={16} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
