import { WHATSAPP_URL } from '../config/contacts';
import { WhatsAppIcon } from './icons/BrandIcons';

/** Floating WhatsApp shortcut with architectural tactical live indicator */
export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      title="WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-zinc-950 text-white border border-zinc-800 shadow-2xl transition-all duration-200 hover:scale-105 hover:border-zinc-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 group"
    >
      <span className="relative">
        <WhatsAppIcon size={22} className="sm:size-6 text-white group-hover:text-emerald-400 transition-colors" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
      </span>
    </a>
  );
}
