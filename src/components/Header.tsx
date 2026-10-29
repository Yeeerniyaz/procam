import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { LANGS } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={`inline-flex items-center bg-zinc-100 p-1 rounded-full text-xs font-mono border border-zinc-200/80 whitespace-nowrap shrink-0 ${className}`}
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`cursor-pointer rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider transition-all duration-150 whitespace-nowrap shrink-0 ${
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

  const links = [
    { href: '#hardware', label: t.nav.equipment, tag: '01' },
    { href: '#advantages', label: t.nav.advantages, tag: '02' },
    { href: '#steps', label: t.nav.steps, tag: '03' },
    { href: '#contacts', label: t.nav.contacts, tag: '04' },
  ];

  return (
    <header className="sticky top-0 z-50 h-16 w-full backdrop-blur-xl bg-white/85 border-b border-zinc-200 transition-all">
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <Logo tagline={t.nav.brandTagline} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0" aria-label="Main Navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap shrink-0 text-xs xl:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LanguageSwitcher />

          <a
            href="tel:+77066066323"
            className="whitespace-nowrap shrink-0 font-mono text-xs xl:text-sm px-4 py-2 rounded-full border border-zinc-200 hover:border-zinc-950 transition text-zinc-900"
          >
            +7 (706) 606-63-23
          </a>

          <a
            href="#contacts"
            className="whitespace-nowrap shrink-0 bg-zinc-950 text-white hover:bg-zinc-800 text-xs xl:text-sm font-medium px-5 py-2.5 rounded-full transition"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile Controls (< lg) */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white text-zinc-900 flex items-center justify-center shrink-0 cursor-pointer hover:border-zinc-950 transition"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer (< lg) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-4 sm:px-8 py-6 shadow-xl z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
              <ul className="flex flex-col divide-y divide-zinc-100">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium text-zinc-900 hover:text-zinc-950"
                    >
                      <span>{l.label}</span>
                      <span className="font-mono text-xs text-zinc-400">/{l.tag}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href="tel:+77066066323"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full border border-zinc-200 bg-zinc-50 font-mono text-sm font-medium text-zinc-950 hover:border-zinc-950 transition whitespace-nowrap"
                >
                  <Phone size={15} className="text-emerald-500 shrink-0" />
                  <span>+7 (706) 606-63-23</span>
                </a>

                <a
                  href="tel:+77766066323"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full border border-zinc-200 bg-white font-mono text-sm font-medium text-zinc-700 hover:border-zinc-950 transition whitespace-nowrap"
                >
                  <Phone size={15} className="text-zinc-400 shrink-0" />
                  <span>+7 (777) 606-63-23</span>
                </a>

                <a
                  href="#contacts"
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 px-5 rounded-full bg-zinc-950 text-white text-center text-sm font-medium hover:bg-zinc-800 transition whitespace-nowrap"
                >
                  {t.nav.cta}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
