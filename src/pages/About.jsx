import Container from '../components/Container.jsx'
import Tag from '../components/Tag.jsx'
import site from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function About() {
  const { t, tr } = useLanguage()
  const paragraphs = tr(site.about) ?? []

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {t('about.title')}
      </h1>

      <div className="prose-case mt-6 max-w-3xl">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-heading">{t('about.toolkit')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {site.skills.map((group) => (
            <div key={group.group.en} className="rounded-xl bg-panel p-6 ring-1 ring-line">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                {tr(group.group)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-line p-8">
        <h2 className="text-xl font-semibold text-heading">{t('about.contact')}</h2>
        <p className="mt-2 text-body">
          {tr(site.location)}. {t('about.contactNote')}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:opacity-90"
          >
            {site.email}
          </a>
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-heading ring-1 ring-line transition hover:ring-accent-line"
          >
            {t('nav.cv')} &#8599;
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-heading ring-1 ring-line transition hover:ring-accent-line"
          >
            {t('nav.github')} &#8599;
          </a>
        </div>
      </section>
    </Container>
  )
}
