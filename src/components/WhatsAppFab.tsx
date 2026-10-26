import { WHATSAPP_URL } from '../config/contacts';
import { WhatsAppIcon } from './icons/BrandIcons';

/** Floating WhatsApp shortcut for quick contact on any scroll position. */
export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      title="WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 transition hover:scale-105 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon size={26} strokeWidth={2.2} />
    </a>
  );
}
