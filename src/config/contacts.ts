/**
 * ============================================================
 *  SOCIAL LINKS — paste real profile URLs here.
 *  Leave "#" while the profile is not ready yet.
 * ============================================================
 */
export const SOCIAL_LINKS = {
  tiktok: '#',
  instagram: '#',
  telegram: '#',
} as const;

/** Phone numbers in international format without "+" (used for tel: and wa.me links). */
export const PHONE_MAIN = '77066066323';
export const PHONE_EXTRA = '77766066323';

export const PHONES = {
  main: {
    raw: PHONE_MAIN,
    tel: `tel:+${PHONE_MAIN}`,
    display: '+7 (706) 606-63-23',
    short: '+7 706 606 63 23',
  },
  extra: {
    raw: PHONE_EXTRA,
    tel: `tel:+${PHONE_EXTRA}`,
    display: '+7 (776) 606-63-23',
    short: '+7 776 606 63 23',
  },
} as const;

/** WhatsApp chat link for the main number. */
export const WHATSAPP_URL = `https://wa.me/${PHONE_MAIN}`;

/** Builds a WhatsApp link with a pre-filled, URL-encoded message. */
export const buildWhatsAppUrl = (message: string): string =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

/** Section anchors used for smooth in-page navigation. */
export const SECTION_IDS = {
  hero: 'top',
  equipment: 'hardware',
  advantages: 'advantages',
  steps: 'steps',
  radar: 'radar',
  callback: 'contacts',
  contacts: 'contacts',
} as const;
