import { SOCIAL_LINKS, WHATSAPP_URL } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { InstagramIcon, TelegramIcon, TikTokIcon, WhatsAppIcon } from './icons/BrandIcons';
import Logo from './Logo';

const socialItems = [
  { key: 'whatsapp', label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsAppIcon },
  { key: 'telegram', label: 'Telegram', href: SOCIAL_LINKS.telegram, Icon: TelegramIcon },
  { key: 'instagram', label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: 'tiktok', label: 'TikTok', href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
] as const;

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="h-14 shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 sm:px-8 flex items-center justify-between gap-3 text-xs text-zinc-500">
      <div className="flex items-center gap-3 min-w-0">
        <Logo dark />
        <span className="hidden md:inline-block h-3.5 w-px bg-zinc-800" />
        <p className="hidden md:block font-mono text-[11px] text-zinc-400 truncate">
          © {year} ProCam · {t.footer.tagline}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {socialItems.map(({ key, label, href, Icon }) => {
          const external = href !== '#';
          return (
            <a
              key={key}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
            >
              <Icon size={13} />
            </a>
          );
        })}
      </div>

      {/* Right Status Telemetry */}
      <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-zinc-400 shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>ALMATY // HIKVISION & DAHUA</span>
      </div>
    </footer>
  );
}
