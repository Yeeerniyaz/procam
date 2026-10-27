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
      className={`inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/90 p-0.5 ${className}`}
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`cursor-pointer rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 ${
              active
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-950'
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
    { href: `#${SECTION_IDS.equipment}`, label: t.nav.equipment, tag: '01' },
    { href: `#${SECTION_IDS.advantages}`, label: t.nav.advantages, tag: '02' },
    { href: `#${SECTION_IDS.steps}`, label: t.nav.steps, tag: '03' },
    { href: `#${SECTION_IDS.contacts}`, label: t.nav.contacts, tag: '04' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled || open
          ? 'border-zinc-200/80 bg-white/70 backdrop-blur-xl shadow-xs'
          : 'border-zinc-200/40 bg-white/40 backdrop-blur-md'
      }`}
    >
      <div className="container-open flex h-18 items-center justify-between gap-4">
        {/* Left: Brand + Monospace Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Logo tagline={t.nav.brandTagline} />
          <div className="hidden h-5 w-px bg-zinc-200 md:block" />
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-zinc-400 select-none md:inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            [CCTV // ALMATY]
          </span>
        </div>

        {/* Center: Minimalist Nav Links with Underline Animation */}
        <nav className="hidden lg:block" aria-label="Main Navigation">
          <ul className="flex items-center gap-1 xl:gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:text-zinc-950"
                >
                  <span className="mr-1 font-mono text-[10px] text-zinc-400 group-hover:text-zinc-950 transition-colors">
                    {l.tag}.
                  </span>
                  {l.label}
                  <span className="absolute bottom-1 left-3 right-3 h-[1.5px] scale-x-0 bg-zinc-950 transition-transform duration-200 origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Lang Switcher + Phone + Monolith Pill CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          {/* Primary phone in font-mono */}
          <a
            href={PHONES.main.tel}
            className="hidden items-center gap-2 rounded-full border border-zinc-200/80 bg-white/60 px-3.5 py-1.5 font-mono text-xs font-medium text-zinc-900 transition-all hover:border-zinc-950 hover:bg-white xl:flex"
          >
            <Phone size={13} className="text-zinc-500" />
            <span>{PHONES.main.display}</span>
          </a>

          {/* Mobile phone tap icon */}
          <a
            href={PHONES.main.tel}
            aria-label={PHONES.main.short}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 sm:hidden"
          >
            <Phone size={15} />
          </a>

          {/* Sharp solid black pill button */}
          <a
            href={`#${SECTION_IDS.callback}`}
            className="hidden items-center justify-center rounded-full bg-zinc-950 px-6 py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] sm:inline-flex shadow-xs"
          >
            {t.nav.cta}
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div id="mobile-menu" className="border-t border-zinc-200 bg-white/95 backdrop-blur-2xl lg:hidden">
          <nav className="container-open py-6" aria-label="Mobile Navigation">
            <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                [MENU // SECTIONS]
              </span>
              <span className="font-mono text-xs text-zinc-400">ALMATY · 24/7</span>
            </div>

            <ul className="flex flex-col divide-y divide-zinc-100">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium text-zinc-800 transition hover:text-zinc-950"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs text-zinc-400">/{l.tag}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-zinc-100 pt-6">
              <a
                href={PHONES.main.tel}
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white py-3 font-mono text-sm font-medium text-zinc-900 transition hover:border-zinc-950"
              >
                <Phone size={15} />
                {PHONES.main.display}
              </a>

              <a
                href={`#${SECTION_IDS.callback}`}
                onClick={() => setOpen(false)}
                className="btn-pill-black w-full justify-center text-sm"
              >
                {t.nav.cta}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
