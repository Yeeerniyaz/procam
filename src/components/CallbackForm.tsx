import { type ChangeEvent, type FormEvent, useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, Send, Tag } from 'lucide-react';
import { buildWhatsAppUrl, PHONES, WHATSAPP_URL } from '../config/contacts';
import { OBJECT_TYPE_KEYS, objectTypeForMessage, type ObjectTypeKey } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

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
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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
    <section id="contacts" className="min-h-screen flex flex-col justify-center py-16 lg:py-24 bg-architectural-grid">
      <div className="container-open w-full">
        {/* Striking Zinc-950 Dark Monolith Card */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-zinc-950 text-white p-6 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl">
          {/* Subtle architectural dot grid inside monolith */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint-dots-dark opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_20%,transparent_100%)]"
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Side: Monolith Intro & Contacts */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    {f.eyebrow}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-emerald-400">ONLINE · 5 МИНУТ</span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white">
                  {f.title}
                </h2>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                  {f.subtitle}
                </p>

                {/* Bullets */}
                <ul className="mt-6 space-y-3">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                        <CheckCircle2 size={13} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clickable Phone Cards & Instant Indicator */}
              <div className="mt-8 sm:mt-12 space-y-3 pt-6 border-t border-zinc-800/80">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                  [DIRECT_LINES // ALMATY]
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                  <a
                    href={PHONES.main.tel}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 font-mono text-xs sm:text-sm text-white transition hover:border-zinc-500 hover:bg-zinc-800"
                  >
                    <Phone size={14} className="text-emerald-400 shrink-0" />
                    <span>+7 (706) 606-63-23</span>
                  </a>

                  <a
                    href="tel:+77776066323"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 font-mono text-xs sm:text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
                  >
                    <Phone size={14} className="text-zinc-400 shrink-0" />
                    <span>+7 (777) 606-63-23</span>
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <WhatsAppIcon size={14} className="text-emerald-400 shrink-0" />
                    <span className="break-words">ЧАТ В WHATSAPP (БЫСТРЫЙ ОТВЕТ ЗА 5 МИНУТ)</span>
                    <ArrowRight size={12} className="shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Smart Form + Quick-Tag Chips */}
            <div className="lg:col-span-7">
              <form
                noValidate
                onSubmit={onSubmit}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-8 backdrop-blur-md"
              >
                {/* Interactive Quick-Tag Pills */}
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 mb-2.5">
                    <Tag size={13} className="text-emerald-400" />
                    <span>{f.quickTagsTitle}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {f.quickTags.map((tag) => {
                      const selected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`cursor-pointer px-3 py-1.5 rounded-full font-mono text-xs transition active:scale-95 border ${
                            selected
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-xs'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          {selected ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name field */}
                  <div>
                    <label htmlFor={ids.name} className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
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
                      <p id={ids.nameErr} role="alert" className="mt-1.5 font-mono text-xs text-red-400">
                        {f.errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor={ids.phone} className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
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
                      <p id={ids.phoneErr} role="alert" className="mt-1.5 font-mono text-xs text-red-400">
                        {f.errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Object Type Select */}
                  <div className="sm:col-span-2">
                    <label htmlFor={ids.objectType} className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                      {f.objectTypeLabel}
                    </label>
                    <div className="relative">
                      <select
                        id={ids.objectType}
                        name="objectType"
                        value={form.objectType}
                        onChange={update('objectType')}
                        className="monolith-input appearance-none pr-10 cursor-pointer text-base text-white [&>option]:bg-zinc-900 [&>option]:text-white"
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

                  {/* Comment Textarea */}
                  <div className="sm:col-span-2">
                    <label htmlFor={ids.comment} className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                      {f.commentLabel} <span className="text-zinc-600">({f.optional})</span>
                    </label>
                    <textarea
                      id={ids.comment}
                      name="comment"
                      rows={2}
                      maxLength={500}
                      value={form.comment}
                      onChange={update('comment')}
                      placeholder={f.commentPlaceholder}
                      className="monolith-input resize-none text-base"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn-pill-white mt-6 w-full text-base font-semibold cursor-pointer">
                  <Send size={16} />
                  <span>{f.submit}</span>
                </button>

                <p className="mt-3.5 text-center font-mono text-[11px] text-zinc-500">
                  {f.note}
                </p>

                {sent && (
                  <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs text-emerald-300 text-center font-mono">
                    {f.success}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
