/**
 * ============================================================
 *  CONTACT & SOCIAL CONFIGURATION
 * ============================================================
 */

export const AUTHOR_NAME = 'Ернияз Талғатулы';
export const AUTHOR_ROLE_RU = 'Инженер систем безопасности & Fullstack-разработчик';
export const AUTHOR_ROLE_KZ = 'Қауіпсіздік жүйелерінің инженері & Fullstack-әзірлеуші';

export const EMAIL = 'yeeerniyaz@gmail.com';
export const WEBSITE = 'https://yeee.kz';
export const WEBSITE_DISPLAY = 'yeee.kz';
export const TELEGRAM_USERNAME = 'yeeeerniyaz';
export const TELEGRAM_URL = 'https://t.me/yeeeerniyaz';
export const GITHUB_URL = 'https://github.com/Yeeerniyaz';

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

export const SOCIAL_LINKS = {
  whatsapp: WHATSAPP_URL,
  telegram: TELEGRAM_URL,
  github: GITHUB_URL,
  email: `mailto:${EMAIL}`,
  website: WEBSITE,
  tiktok: '#',
  instagram: '#',
} as const;

/** Section anchors used for smooth in-page navigation. */
export const SECTION_IDS = {
  hero: 'top',
  equipment: 'hardware',
  advantages: 'advantages',
  projects: 'projects',
  about: 'about',
  steps: 'steps',
  radar: 'radar',
  callback: 'contacts',
  contacts: 'contacts',
} as const;
