import { Cable, HardDrive, Network, Smartphone } from 'lucide-react';
import { SECTION_IDS } from '../config/contacts';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [Cable, Smartphone, HardDrive, Network];

export default function AdvantagesSection() {
  const { t } = useLanguage();
  const a = t.advantages;

  return (
    <section id={SECTION_IDS.advantages} className="section bg-white">
      <div className="container-page">
        <div className="max-w-3xl">
          <span className="eyebrow">{a.eyebrow}</span>
          <h2 className="section-title">{a.title}</h2>
          <p className="section-subtitle">{a.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <article
                key={item.title}
                className="card group flex flex-col p-6 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
