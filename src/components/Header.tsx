import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { PHONES } from '../config/contacts';
import { LANGS } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={`inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/90 p-0.5 whitespace-nowrap shrink-0 ${className}`}
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
    { href: '#hardware', label: t.nav.equipment, tag: '01' },
    { href: '#advantages', label: t.nav.advantages, tag: '02' },
    { href: '#steps', label: t.nav.steps, tag: '03' },
    { href: '#contacts', label: t.nav.contacts, tag: '04' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 h-16 w-full backdrop-blur-xl transition-all border-b ${
        scrolled || open
          ? 'border-zinc-200/90 bg-white/90 shadow-xs'
          : 'border-zinc-200/70 bg-white/85'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Monospace Badge */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Logo tagline={t.nav.brandTagline} />
          <div className="hidden h-5 w-px bg-zinc-200 2xl:block" />
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-zinc-400 select-none 2xl:flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            [CCTV // ALMATY]
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0" aria-label="Main Navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-1 text-xs xl:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              <span className="mr-1 font-mono text-[10px] text-zinc-400 group-hover:text-zinc-950 transition-colors">
                {l.tag}.
              </span>
              {l.label}
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] scale-x-0 bg-zinc-950 transition-transform duration-200 origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Right: Lang Switcher + Phone + Monolith Pill CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <LanguageSwitcher className="shrink-0" />

          {/* Primary phone in font-mono */}
          <a
            href={PHONES.main.tel}
            className="hidden lg:flex items-center gap-2 rounded-full border border-zinc-200 hover:border-zinc-950 px-4 py-2 font-mono text-xs xl:text-sm text-zinc-900 transition whitespace-nowrap shrink-0"
          >
            <Phone size={13} className="text-zinc-500 shrink-0" />
            <span>+7 (706) 606-63-23</span>
          </a>

          {/* Sharp solid black pill button */}
          <a
            href="#contacts"
            className="hidden lg:inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs xl:text-sm font-medium px-5 py-2.5 transition whitespace-nowrap shrink-0 shadow-xs"
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
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 flex items-center justify-center lg:hidden shrink-0 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white/95 backdrop-blur-xl border-b border-zinc-200 p-6 flex flex-col gap-6 z-50 shadow-xl lg:hidden"
        >
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                [MENU // SECTIONS]
              </span>
              <span className="font-mono text-xs text-zinc-400">ALMATY · 24/7</span>
            </div>

            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2 text-xl font-medium border-b border-zinc-100 text-zinc-800 transition hover:text-zinc-950"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs text-zinc-400">/{l.tag}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="tel:+77066066323"
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white py-3.5 font-mono text-sm font-medium text-zinc-900 transition hover:border-zinc-950"
              >
                <Phone size={15} />
                +7 (706) 606-63-23
              </a>

              <a
                href="tel:+77776066323"
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white py-3.5 font-mono text-sm font-medium text-zinc-900 transition hover:border-zinc-950"
              >
                <Phone size={15} />
                +7 (777) 606-63-23
              </a>

              <a
                href="#contacts"
                onClick={() => setOpen(false)}
                className="w-full py-4 rounded-full bg-zinc-950 text-white text-center font-medium transition hover:bg-zinc-800 active:scale-[0.99] shadow-xs"
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
