import { type ChangeEvent, type FormEvent, useId, useState } from 'react';
import { CheckCircle2, Phone, Send, Tag } from 'lucide-react';
import { buildWhatsAppUrl, PHONES, WHATSAPP_URL } from '../config/contacts';
import { OBJECT_TYPE_KEYS, objectTypeForMessage, type ObjectTypeKey } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import Footer from './Footer';
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
  tags: string[],
): string => {
  const parts = [
    'Здравствуйте, ProCam! Заявка с сайта на расчёт системы видеонаблюдения:',
    `👤 Имя: ${name.trim()}`,
    `📞 Телефон: ${phone}`,
    `🏢 Объект: ${objectTypeForMessage(objectType)}`,
  ];
  if (tags.length > 0) {
    parts.push(`🏷️ Выбранные теги: ${tags.join(', ')}`);
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
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
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
      className="min-h-screen flex flex-col justify-between pt-16 lg:pt-24 bg-architectural-grid"
    >
      <div className="container-open w-full my-auto">
        {/* Dark Monolith Card */}
        <div className="bg-zinc-950 text-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint-dots-dark opacity-35"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Headline, Clickable Phone Cards, Instant Response Indicator */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 mb-5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs text-emerald-400 uppercase tracking-wider">
                    {f.eyebrow} // ONLINE 24/7
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight leading-[1.1] text-white">
                  {f.title}
                </h2>

                <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {f.subtitle}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clickable Phone Cards */}
              <div className="mt-8 pt-6 border-t border-zinc-800/90 space-y-3">
                <a
                  href={PHONES.main.tel}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/90 hover:border-emerald-500/60 p-4 transition group"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 block">
                      {c.mainPhone}
                    </span>
                    <span className="mt-0.5 font-mono text-base sm:text-lg font-bold text-white block whitespace-nowrap">
                      +7 (706) 606-63-23
                    </span>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition">
                    <Phone size={16} />
                  </span>
                </a>

                <a
                  href={PHONES.extra.tel}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 p-4 transition group"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                      {c.extraPhone}
                    </span>
                    <span className="mt-0.5 font-mono text-base sm:text-lg font-bold text-zinc-200 block whitespace-nowrap">
                      +7 (777) 606-63-23
                    </span>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 group-hover:bg-white group-hover:text-zinc-950 transition">
                    <Phone size={16} />
                  </span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pt-1 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition"
                >
                  <WhatsAppIcon size={15} className="shrink-0" />
                  <span>WHATSAPP DIRECT // +7 (706) 606-63-23</span>
                </a>
              </div>
            </div>

            {/* Right Column: Smart Form + Quick-Select Chips */}
            <div className="lg:col-span-7">
              <form
                noValidate
                onSubmit={onSubmit}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-8"
              >
                {/* Interactive Quick-Tag Pills */}
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 mb-3">
                    <Tag size={13} className="text-emerald-400 shrink-0" />
                    <span>{f.quickTagsTitle}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {f.quickTags.map((tag) => {
                      const active = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs transition whitespace-nowrap ${
                            active
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          {active ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Inputs (text-base 16px on mobile to prevent iOS zoom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={ids.name}
                      className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1.5"
                    >
                      {f.nameLabel} *
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
                      <p id={ids.nameErr} role="alert" className="mt-1 font-mono text-xs text-red-400">
                        {f.errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={ids.phone}
                      className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1.5"
                    >
                      {f.phoneLabel} *
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
                      <p id={ids.phoneErr} role="alert" className="mt-1 font-mono text-xs text-red-400">
                        {f.errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor={ids.objectType}
                      className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1.5"
                    >
                      {f.objectTypeLabel}
                    </label>
                    <select
                      id={ids.objectType}
                      name="objectType"
                      value={form.objectType}
                      onChange={update('objectType')}
                      className="monolith-input text-base cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white"
                    >
                      {OBJECT_TYPE_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {f.objectTypes[key]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor={ids.comment}
                      className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1.5"
                    >
                      {f.commentLabel} <span className="text-zinc-600">({f.optional})</span>
                    </label>
                    <textarea
                      id={ids.comment}
                      name="comment"
                      rows={3}
                      maxLength={500}
                      value={form.comment}
                      onChange={update('comment')}
                      placeholder={f.commentPlaceholder}
                      className="monolith-input resize-none text-base"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-pill-white mt-6 w-full text-base font-semibold cursor-pointer"
                >
                  <Send size={16} />
                  <span>{f.submit}</span>
                </button>

                <p className="mt-3 text-center font-mono text-[11px] text-zinc-500">
                  {f.note}
                </p>

                {sent && (
                  <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-center font-mono text-xs text-emerald-300">
                    {f.success}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Footer at bottom of Screen 05 */}
      <Footer />
    </section>
  );
}
