import { type ChangeEvent, type FormEvent, useId, useState } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, Send, Tag } from 'lucide-react';
import { buildWhatsAppUrl, PHONES, WHATSAPP_URL } from '../config/contacts';
import { OBJECT_TYPE_KEYS, objectTypeForMessage, type ObjectTypeKey } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';
import Footer from './Footer';

/* ------------------------------------------------------------------ */
/* Phone helpers                                                       */
/* ------------------------------------------------------------------ */

const normalizeDigits = (input: string): string => {
  let digits = input.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10 && !input.trim().startsWith('+')) digits = `7${digits}`;
  if (digits.length === 12 && (digits[1] === '7' || digits[1] === '8')) digits = `7${digits.slice(2)}`;
  if (digits === '78') digits = '7';
  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;
  return digits.slice(0, 11);
};

export const formatPhone = (input: string): string => {
  const d = normalizeDigits(input);
  if (!d) return '';
  const r = d.slice(1);
  let out = '+7';
  if (r.length > 0) out += ` (${r.slice(0, 3)}`;
  if (r.length >= 3) out += ')';
  if (r.length > 3) out += ` ${r.slice(3, 6)}`;
  if (r.length > 6) out += `-${r.slice(6, 8)}`;
  if (r.length > 8) out += `-${r.slice(8, 10)}`;
  return out;
};

const isPhoneValid = (value: string) => normalizeDigits(value).length === 11;

interface FormState {
  name: string;
  phone: string;
  objectType: ObjectTypeKey;
  comment: string;
}

const buildMessage = (
  { name, phone, objectType, comment }: FormState,
  tags: string[]
): string => {
  const parts = [
    'Здравствуйте, ProCam! Заявка с сайта на расчёт системы видеонаблюдения:',
    `👤 Имя: ${name.trim()}`,
    `📞 Телефон: ${phone}`,
    `🏢 Объект: ${objectTypeForMessage(objectType)}`,
  ];
  if (tags.length > 0) {
    parts.push(`🏷️ Параметры: ${tags.join(', ')}`);
  }
  if (comment.trim()) {
    parts.push(`💬 Комментарий: ${comment.trim()}`);
  }
  return parts.join('\n');
};

const openWhatsApp = (url: string) => {
  const win = window.open(url, '_blank');
  if (win) {
    win.opener = null;
  } else {
    window.location.href = url;
  }
};

type Errors = Partial<Record<'name' | 'phone', true>>;

const initialState: FormState = { name: '', phone: '', objectType: 'house', comment: '' };

export default function CallbackForm() {
  const { t } = useLanguage();
  const f = t.form;
  const c = t.contacts;
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    objectType: `${uid}-object`,
    comment: `${uid}-comment`,
    nameErr: `${uid}-name-err`,
    phoneErr: `${uid}-phone-err`,
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const raw = e.target.value;
      const value = (key === 'phone' ? formatPhone(raw) : raw) as FormState[K];
      setForm((prev) => ({ ...prev, [key]: value }));
      setSent(false);
      if (key === 'name' || key === 'phone') {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = true;
    if (!isPhoneValid(form.phone)) next.phone = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildMessage(form, selectedTags);
    const url = buildWhatsAppUrl(msg);
    openWhatsApp(url);
    setSent(true);
  };

  return (
    <section
      id="contacts"
      className="snap-screen-section bg-zinc-950 text-white justify-between"
    >
      {/* Main Full-Bleed Dark Workstation Grid */}
      <div className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 overflow-hidden relative">
        {/* Subtle architectural dot matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-blueprint-dots-dark opacity-30"
        />

        {/* ============================================================ */}
        {/* LEFT COLUMN (5 cols on lg): Headline + Instant Phone Blocks  */}
        {/* ============================================================ */}
        <div className="relative z-10 lg:col-span-5 p-3.5 sm:p-6 lg:p-10 xl:p-14 flex flex-col justify-between shrink-0 lg:min-h-0 overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400">
                  {f.eyebrow}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs text-emerald-400 font-semibold">
                  ONLINE · 5 МИН
                </span>
              </div>
              <span className="lg:hidden font-mono text-[10px] text-zinc-400 flex items-center gap-1">
                <MapPin size={11} className="text-emerald-400" />
                {c.areaValue}
              </span>
            </div>

            <h2 className="mt-1 sm:mt-3 text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.08] text-white">
              {f.title}
            </h2>

            <p className="hidden sm:block mt-2 lg:mt-4 text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed max-w-md">
              {f.subtitle}
            </p>

            {/* Engineering Bullets (visible on lg) */}
            <ul className="hidden lg:block mt-6 space-y-2.5">
              {f.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-xs xl:text-sm text-zinc-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                    <CheckCircle2 size={13} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instant Clickable Phone Blocks + Working Hours + Almaty Coverage */}
          <div className="mt-2.5 sm:mt-4 lg:mt-0 space-y-2 sm:space-y-3 lg:pt-6 lg:border-t lg:border-zinc-800">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {/* Main Phone + WhatsApp Block */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 sm:p-3.5 flex items-center justify-between gap-2">
                <a href={PHONES.main.tel} className="min-w-0 flex-1 group">
                  <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 uppercase block truncate">
                    ● {c.mainPhone}
                  </span>
                  <span className="font-mono text-xs sm:text-base lg:text-lg font-bold text-white group-hover:text-emerald-300 transition truncate block">
                    +7 (706) 606-63-23
                  </span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition"
                >
                  <WhatsAppIcon size={16} />
                </a>
              </div>

              {/* Secondary Phone Block */}
              <a
                href="tel:+77776066323"
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 sm:p-3.5 flex items-center justify-between gap-2 hover:border-zinc-600 transition"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase block truncate">
                    {c.extraPhone}
                  </span>
                  <span className="font-mono text-xs sm:text-base lg:text-lg font-bold text-zinc-200 truncate block">
                    +7 (777) 606-63-23
                  </span>
                </div>
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300">
                  <Phone size={15} />
                </span>
              </a>
            </div>

            {/* Working Hours & Almaty Coverage Strip */}
            <div className="hidden lg:flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} className="text-emerald-400" />
                БЕЗ ВЫХОДНЫХ · 08:00–22:00
              </span>
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <MapPin size={13} className="text-emerald-400" />
                {c.areaValue}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN (7 cols on lg): Quick-Tags + Callback Form      */}
        {/* ============================================================ */}
        <div className="relative z-10 lg:col-span-7 p-3.5 sm:p-6 lg:p-10 xl:p-14 flex flex-col justify-center flex-1 min-h-0 overflow-hidden">
          <form
            noValidate
            onSubmit={onSubmit}
            className="w-full max-w-2xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/75 p-3.5 sm:p-6 lg:p-8 backdrop-blur-md flex flex-col justify-between gap-3 sm:gap-5"
          >
            {/* Interactive Quick-Tag Chips */}
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-zinc-400 mb-1.5 sm:mb-2">
                <Tag size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">{f.quickTagsTitle}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {f.quickTags.map((tag) => {
                  const selected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`cursor-pointer px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-xs transition active:scale-95 border ${
                        selected
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                          : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {selected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs Grid (16px text-base to prevent iOS zoom) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor={ids.name}
                  className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400"
                >
                  {f.nameLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  id={ids.name}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={60}
                  value={form.name}
                  onChange={update('name')}
                  placeholder={f.namePlaceholder}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? ids.nameErr : undefined}
                  className="monolith-input text-base"
                />
                {errors.name && (
                  <p id={ids.nameErr} role="alert" className="mt-1 font-mono text-[10px] text-red-400">
                    {f.errors.name}
                  </p>
                )}
              </div>

              {/* Phone field */}
              <div>
                <label
                  htmlFor={ids.phone}
                  className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400"
                >
                  {f.phoneLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  id={ids.phone}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                  onFocus={() => !form.phone && setForm((p) => ({ ...p, phone: '+7' }))}
                  onBlur={() => form.phone === '+7' && setForm((p) => ({ ...p, phone: '' }))}
                  placeholder={f.phonePlaceholder}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? ids.phoneErr : undefined}
                  className="monolith-input font-mono text-base"
                />
                {errors.phone && (
                  <p id={ids.phoneErr} role="alert" className="mt-1 font-mono text-[10px] text-red-400">
                    {f.errors.phone}
                  </p>
                )}
              </div>

              {/* Object Type Select */}
              <div>
                <label
                  htmlFor={ids.objectType}
                  className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400"
                >
                  {f.objectTypeLabel}
                </label>
                <div className="relative">
                  <select
                    id={ids.objectType}
                    name="objectType"
                    value={form.objectType}
                    onChange={update('objectType')}
                    className="monolith-input appearance-none pr-8 cursor-pointer text-base text-white [&>option]:bg-zinc-900 [&>option]:text-white"
                  >
                    {OBJECT_TYPE_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {f.objectTypes[key]}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Comment Input (single-line or compact input on mobile, 16px text-base) */}
              <div>
                <label
                  htmlFor={ids.comment}
                  className="block font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400"
                >
                  {f.commentLabel} <span className="text-zinc-600">({f.optional})</span>
                </label>
                <input
                  id={ids.comment}
                  name="comment"
                  type="text"
                  maxLength={500}
                  value={form.comment}
                  onChange={update('comment')}
                  placeholder={f.commentPlaceholder}
                  className="monolith-input text-base"
                />
              </div>
            </div>

            {/* Submit Pill + Status */}
            <div>
              <button
                type="submit"
                className="btn-pill-white w-full py-2.5 sm:py-3.5 text-sm sm:text-base font-semibold cursor-pointer"
              >
                <Send size={15} />
                <span>{f.submit}</span>
              </button>

              {sent ? (
                <p className="mt-2 text-center font-mono text-[11px] text-emerald-400">
                  {f.success}
                </p>
              ) : (
                <p className="hidden sm:block mt-2 text-center font-mono text-[10px] text-zinc-500">
                  {f.note}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Integrated Bottom Bar (Footer.tsx — h-14 shrink-0) */}
      <Footer />
    </section>
  );
}
