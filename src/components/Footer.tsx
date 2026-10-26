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
    <footer className="bg-slate-50">
      {/* Contacts */}
      <section id={SECTION_IDS.contacts} className="section border-t border-slate-200">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="section-title">{c.title}</h2>
            <p className="section-subtitle">{c.subtitle}</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {/* Main phone */}
            <div className="card flex flex-col p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-500/25">
                <Phone size={20} />
              </span>
              <p className="mt-5 text-sm font-medium text-slate-500">{c.mainPhone}</p>
              <a
                href={PHONES.main.tel}
                className="mt-1 text-xl font-bold tracking-tight whitespace-nowrap text-slate-900 transition hover:text-orange-600"
              >
                {PHONES.main.display}
              </a>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href={PHONES.main.tel} className="btn-primary px-3 py-2.5 sm:text-sm">
                  <Phone size={16} />
                  {c.call}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-3 py-2.5 sm:text-sm"
                >
                  <WhatsAppIcon size={17} className="text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Extra phone */}
            <div className="card flex flex-col p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Phone size={20} />
              </span>
              <p className="mt-5 text-sm font-medium text-slate-500">{c.extraPhone}</p>
              <a
                href={PHONES.extra.tel}
                className="mt-1 text-xl font-bold tracking-tight whitespace-nowrap text-slate-900 transition hover:text-orange-600"
              >
                {PHONES.extra.display}
              </a>
              <div className="mt-auto pt-6">
                <a href={PHONES.extra.tel} className="btn-secondary w-full px-3 py-2.5 sm:text-sm">
                  <Phone size={16} className="text-orange-500" />
                  {c.call}
                </a>
              </div>
            </div>

            {/* Area & socials */}
            <div className="card flex flex-col p-6 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <MapPin size={20} />
              </span>
              <p className="mt-5 text-sm font-medium text-slate-500">{c.area}</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">{c.areaValue}</p>
              <div className="mt-auto pt-6">
                <p className="mb-3 text-sm font-medium text-slate-500">{c.social}</p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 bg-white">
        <div className="container-page flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
          <Logo />
          <p className="text-center text-sm text-slate-500">
            © {year} ProElectric. {t.footer.tagline}
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
