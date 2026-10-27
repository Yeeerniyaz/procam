import { MapPin, Phone } from 'lucide-react';
import { PHONES, SECTION_IDS, WHATSAPP_URL } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { t } = useLanguage();
  const c = t.contacts;
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-zinc-200 overflow-hidden">
      {/* Contact Zones Section */}
      <section id={SECTION_IDS.contacts} className="section-open relative z-10">
        <div className="container-open">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 lg:pb-14 border-b border-zinc-200">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  // 05 · CONTACT & DISPATCH
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-zinc-500 uppercase">
                  ALMATY · 24/7
                </span>
              </div>
              <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950">
                {c.title}
              </h2>
            </div>
            <p className="max-w-xl text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
              {c.subtitle}
            </p>
          </div>

          {/* Open Architectural Contact Zones */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-zinc-200 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Zone 1: Main Dispatch Line */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-zinc-50/60 transition-colors duration-200">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    [PRIMARY_LINE]
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>

                <p className="mt-5 sm:mt-6 text-sm font-medium text-zinc-500">{c.mainPhone}</p>
                <a
                  href={PHONES.main.tel}
                  className="mt-2 block font-mono text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-950 hover:text-zinc-700 transition truncate"
                >
                  {PHONES.main.display}
                </a>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={PHONES.main.tel}
                  className="btn-pill-black flex-1 py-3 text-xs uppercase tracking-wider font-mono justify-center"
                >
                  <Phone size={14} />
                  <span>{c.call}</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-outline flex-1 py-3 text-xs uppercase tracking-wider font-mono justify-center"
                >
                  <WhatsAppIcon size={15} />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Zone 2: Backup Line */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-zinc-50/60 transition-colors duration-200">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    [STANDBY_LINE]
                  </span>
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                </div>

                <p className="mt-5 sm:mt-6 text-sm font-medium text-zinc-500">{c.extraPhone}</p>
                <a
                  href="tel:+77776066323"
                  className="mt-2 block font-mono text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-950 hover:text-zinc-700 transition truncate"
                >
                  +7 (777) 606-63-23
                </a>
              </div>

              <div className="mt-6 sm:mt-8">
                <a
                  href="tel:+77776066323"
                  className="btn-pill-outline w-full py-3 text-xs uppercase tracking-wider font-mono justify-center"
                >
                  <Phone size={14} />
                  <span>{c.call}</span>
                </a>
              </div>
            </div>

            {/* Zone 3: Coverage Area & Socials */}
            <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-zinc-50/60 transition-colors duration-200">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    [COVERAGE // GPS 43.2389° N]
                  </span>
                  <MapPin size={15} className="text-zinc-400" />
                </div>

                <p className="mt-5 sm:mt-6 text-sm font-medium text-zinc-500">{c.area}</p>
                <p className="mt-2 text-lg sm:text-xl font-medium tracking-tight text-zinc-950">
                  {c.areaValue}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 border-t border-zinc-100">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {c.social}
                </p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Watermark Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative w-full overflow-hidden select-none py-4 text-center"
      >
        <span className="block font-sans text-[12.5vw] font-bold tracking-tighter leading-none text-zinc-100/90 whitespace-nowrap">
          PROCAM
        </span>
      </div>

      {/* Sub-Footer Bar */}
      <div className="border-t border-zinc-200 bg-white relative z-10">
        <div className="container-open flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <Logo />

          <p className="font-mono text-xs text-zinc-500 text-center">
            © {year} PROCAM · {t.footer.tagline}
          </p>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>ALMATY // HIKVISION // DAHUA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
