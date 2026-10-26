import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { PHONES, SECTION_IDS } from '../config/contacts';
import { LANGS } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 ${className}`}
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`min-w-[2.5rem] cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${
              active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const links = [
    { href: `#${SECTION_IDS.equipment}`, label: t.nav.equipment },
    { href: `#${SECTION_IDS.advantages}`, label: t.nav.advantages },
    { href: `#${SECTION_IDS.steps}`, label: t.nav.steps },
    { href: `#${SECTION_IDS.contacts}`, label: t.nav.contacts },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-slate-200 bg-white/85 shadow-sm backdrop-blur-xl'
          : 'border-transparent bg-white/0'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo tagline={t.nav.brandTagline} />

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <a
            href={PHONES.main.tel}
            className="hidden items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold whitespace-nowrap text-slate-900 transition hover:text-orange-600 xl:flex"
          >
            <Phone size={16} className="text-orange-500" />
            {PHONES.main.short}
          </a>

          <a
            href={PHONES.main.tel}
            aria-label={PHONES.main.short}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-orange-500 shadow-sm sm:hidden"
          >
            <Phone size={17} />
          </a>

          <a href={`#${SECTION_IDS.callback}`} className="btn-primary hidden px-4 py-2.5 whitespace-nowrap sm:inline-flex sm:text-sm">
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-page py-4" aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <a href={PHONES.main.tel} className="btn-secondary">
                <Phone size={17} className="text-orange-500" />
                {PHONES.main.short}
              </a>
              <a href={`#${SECTION_IDS.callback}`} onClick={() => setOpen(false)} className="btn-primary">
                {t.nav.cta}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
