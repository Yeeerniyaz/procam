import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { PHONES } from '../config/contacts';
import { LANGS } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import type { DeckSectionId } from '../App';
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
            className={`cursor-pointer rounded-full px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 ${
              active
                ? 'bg-zinc-950 text-white shadow-2xs'
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

interface HeaderProps {
  activeSection?: DeckSectionId;
  onNavigate?: (id: string) => void;
}

export default function Header({ activeSection = 'hero', onNavigate }: HeaderProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const links: { id: DeckSectionId; href: string; label: string; tag: string }[] = [
    { id: 'hero', href: '#hero', label: 'Система', tag: '01' },
    { id: 'hardware', href: '#hardware', label: t.nav.equipment, tag: '02' },
    { id: 'advantages', href: '#advantages', label: t.nav.advantages, tag: '03' },
    { id: 'steps', href: '#steps', label: t.nav.steps, tag: '04' },
    { id: 'contacts', href: '#contacts', label: t.nav.contacts, tag: '05' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 h-14 z-50 w-screen backdrop-blur-xl border-b border-zinc-200 bg-white/95 transition-colors">
      <div className="w-full h-full px-3 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
        {/* Left: Brand + Monospace Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'hero')}>
            <Logo tagline={t.nav.brandTagline} />
          </div>
          <div className="hidden h-4 w-px bg-zinc-200 xl:block" />
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-zinc-400 select-none xl:flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            [CCTV // ALMATY]
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0" aria-label="Main Navigation">
          {links.map((l) => {
            const active = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.id)}
                className={`group relative py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 inline-flex items-center ${
                  active ? 'text-zinc-950 font-semibold' : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                <span
                  className={`mr-1 font-mono text-[10px] transition-colors ${
                    active ? 'text-emerald-600 font-bold' : 'text-zinc-400 group-hover:text-zinc-950'
                  }`}
                >
                  {l.tag}.
                </span>
                {l.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-zinc-950 transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Lang Switcher + Phone + Monolith Pill CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <LanguageSwitcher className="shrink-0" />

          {/* Primary phone in font-mono */}
          <a
            href={PHONES.main.tel}
            className="hidden xl:flex items-center gap-1.5 rounded-full border border-zinc-200 hover:border-zinc-950 px-3.5 py-1.5 font-mono text-xs text-zinc-900 transition whitespace-nowrap shrink-0"
          >
            <Phone size={12} className="text-emerald-600 shrink-0" />
            <span>+7 (706) 606-63-23</span>
          </a>

          {/* Sharp solid black pill button */}
          <a
            href="#contacts"
            onClick={(e) => handleNavClick(e, 'contacts')}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-medium px-4 py-1.5 transition whitespace-nowrap shrink-0 shadow-2xs"
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
            className="w-8 h-8 rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 flex items-center justify-center lg:hidden shrink-0 cursor-pointer"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto bg-white/98 backdrop-blur-xl border-b border-zinc-200 p-4 sm:p-6 flex flex-col gap-4 z-50 shadow-xl lg:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                [DECK // 01–05 SCREENS]
              </span>
              <span className="font-mono text-[10px] text-emerald-600 font-semibold">● ALMATY 24/7</span>
            </div>

            <ul className="flex flex-col">
              {links.map((l) => {
                const active = activeSection === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      onClick={(e) => handleNavClick(e, l.id)}
                      className={`flex items-center justify-between py-2.5 text-base font-medium border-b border-zinc-100 transition ${
                        active ? 'text-zinc-950 font-semibold' : 'text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="font-mono text-xs text-zinc-400">/{l.tag}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:+77066066323"
                className="flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white py-2.5 font-mono text-xs font-medium text-zinc-900 transition hover:border-zinc-950"
              >
                <Phone size={13} className="text-emerald-600" />
                +7 (706) 606-63-23
              </a>

              <a
                href="tel:+77776066323"
                className="flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white py-2.5 font-mono text-xs font-medium text-zinc-900 transition hover:border-zinc-950"
              >
                <Phone size={13} />
                +7 (777) 606-63-23
              </a>
            </div>

            <a
              href="#contacts"
              onClick={(e) => handleNavClick(e, 'contacts')}
              className="w-full py-3 rounded-full bg-zinc-950 text-white text-center text-sm font-medium transition hover:bg-zinc-800 active:scale-[0.99] shadow-xs"
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
