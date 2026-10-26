import { type ChangeEvent, type FormEvent, useId, useState } from 'react';
import { CheckCircle2, Clock, Headset, Phone, Send, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl, PHONES, SECTION_IDS } from '../config/contacts';
import { OBJECT_TYPE_KEYS, objectTypeForMessage, type ObjectTypeKey } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';

/* ------------------------------------------------------------------ */
/* Phone helpers                                                       */
/* ------------------------------------------------------------------ */

/** Normalises any user input into up to 11 digits starting with "7". */
const normalizeDigits = (input: string): string => {
  let digits = input.replace(/\D/g, '');
  if (!digits) return '';
  // Pasted 10-digit local number, e.g. "7066066323"
  if (digits.length === 10 && !input.trim().startsWith('+')) digits = `7${digits}`;
  // Full number pasted/typed after the "+7" prefix, e.g. "+7" + "87066066323"
  if (digits.length === 12 && (digits[1] === '7' || digits[1] === '8')) digits = `7${digits.slice(2)}`;
  // Typing "8" right after the auto-inserted "+7" prefix (habit of the local "8 7xx" format)
  if (digits === '78') digits = '7';
  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;
  return digits.slice(0, 11);
};

/** Progressive mask: +7 (XXX) XXX-XX-XX */
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

/* ------------------------------------------------------------------ */
/* WhatsApp message                                                    */
/* ------------------------------------------------------------------ */

interface FormState {
  name: string;
  phone: string;
  objectType: ObjectTypeKey;
  comment: string;
}

const buildMessage = ({ name, phone, objectType, comment }: FormState): string =>
  [
    'Здравствуйте, ProElectric! Заявка с сайта на обратный звонок:',
    `👤 Имя: ${name.trim()}`,
    `📞 Телефон: ${phone}`,
    `🏢 Объект: ${objectTypeForMessage(objectType)}`,
    `💬 Комментарий: ${comment.trim() || 'Без комментария'}`,
  ].join('\n');

const openWhatsApp = (url: string) => {
  const win = window.open(url, '_blank');
  if (win) {
    win.opener = null;
  } else {
    // Popup blocked — navigate in the current tab instead.
    window.location.href = url;
  }
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

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
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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

  const validate = (state: FormState): Errors => {
    const next: Errors = {};
    if (state.name.trim().length < 2) next.name = true;
    if (!isPhoneValid(state.phone)) next.phone = true;
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = nextErrors.name ? ids.name : ids.phone;
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    openWhatsApp(buildWhatsAppUrl(buildMessage(form)));
    setSent(true);
  };

  const bulletIcons = [Headset, ShieldCheck, Clock];

  return (
    <section id={SECTION_IDS.callback} className="section bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        {/* Intro */}
        <div className="lg:pt-4">
          <span className="eyebrow">{f.eyebrow}</span>
          <h2 className="section-title">{f.title}</h2>
          <p className="section-subtitle">{f.subtitle}</p>

          <ul className="mt-8 grid gap-4">
            {f.bullets.map((b, i) => {
              const Icon = bulletIcons[i] ?? CheckCircle2;
              return (
                <li key={b} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon size={19} />
                  </span>
                  <span className="font-medium">{b}</span>
                </li>
              );
            })}
          </ul>

          <a
            href={PHONES.main.tel}
            className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
          >
            <Phone size={20} className="text-slate-700" />
            <span className="text-lg font-bold tracking-tight text-slate-900">{PHONES.main.display}</span>
          </a>
        </div>

        {/* Form */}
        <form
          noValidate
          onSubmit={onSubmit}
          className="card relative p-6 shadow-md shadow-slate-900/[0.03] sm:p-8 lg:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={ids.name} className="mb-2 block text-sm font-semibold text-slate-800">
                {f.nameLabel} <span className="text-slate-500">*</span>
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
                className="field"
              />
              {errors.name && (
                <p id={ids.nameErr} role="alert" className="mt-1.5 text-sm text-red-600">
                  {f.errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={ids.phone} className="mb-2 block text-sm font-semibold text-slate-800">
                {f.phoneLabel} <span className="text-slate-500">*</span>
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
                className="field tabular-nums"
              />
              {errors.phone && (
                <p id={ids.phoneErr} role="alert" className="mt-1.5 text-sm text-red-600">
                  {f.errors.phone}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={ids.objectType} className="mb-2 block text-sm font-semibold text-slate-800">
                {f.objectTypeLabel}
              </label>
              <div className="relative">
                <select
                  id={ids.objectType}
                  name="objectType"
                  value={form.objectType}
                  onChange={update('objectType')}
                  className="field cursor-pointer appearance-none pr-10"
                >
                  {OBJECT_TYPE_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {f.objectTypes[key]}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={ids.comment} className="mb-2 block text-sm font-semibold text-slate-800">
                {f.commentLabel} <span className="font-normal text-slate-400">({f.optional})</span>
              </label>
              <textarea
                id={ids.comment}
                name="comment"
                rows={4}
                maxLength={500}
                value={form.comment}
                onChange={update('comment')}
                placeholder={f.commentPlaceholder}
                className="field resize-none"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-7 w-full py-4 text-base">
            <Send size={18} />
            {f.submit}
          </button>

          <p className="mt-4 text-center text-sm leading-relaxed text-slate-500">{f.note}</p>

          {sent && (
            <p
              role="status"
              className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 size={18} className="mt-px shrink-0" />
              {f.success}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
