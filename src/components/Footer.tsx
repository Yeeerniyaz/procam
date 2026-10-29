import { MapPin, Phone } from 'lucide-react';
import { PHONES } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { t } = useLanguage();
  const c = t.contacts;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <div className="container-open py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Logo tagline={t.nav.brandTagline} />
            <div className="hidden sm:block h-5 w-px bg-zinc-200" />
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
              <MapPin size={14} className="text-emerald-500 shrink-0" />
              <span>
                {c.area}: <strong className="font-semibold text-zinc-900">{c.areaValue}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={PHONES.main.tel}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-xs sm:text-sm font-medium text-zinc-950 hover:border-zinc-950 transition whitespace-nowrap shrink-0"
            >
              <Phone size={14} className="text-emerald-500 shrink-0" />
              <span>{PHONES.main.display}</span>
            </a>

            <a
              href={PHONES.extra.tel}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 font-mono text-xs sm:text-sm font-medium text-zinc-700 hover:border-zinc-950 transition whitespace-nowrap shrink-0"
            >
              <Phone size={14} className="text-zinc-400 shrink-0" />
              <span>{PHONES.extra.display}</span>
            </a>

            <SocialLinks />
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <p className="text-center sm:text-left">
            © {year} ProCam. {t.footer.tagline}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>ALMATY // HIKVISION · HIWATCH · DAHUA IP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
