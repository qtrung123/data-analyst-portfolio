import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import Avatar from '../components/Avatar.jsx'
import PipelineCard from '../components/PipelineCard.jsx'
import FeaturedProject from '../components/FeaturedProject.jsx'
import ProjectRow from '../components/ProjectRow.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Tag from '../components/Tag.jsx'
import site from '../data/site.js'
import { getProject, projects, featuredProjects } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackContactClick, trackGithubClick } from '../lib/analytics.js'

/**
 * Homepage, in reading order: hero (who, what, three facts, a pipeline
 * diagram), selected work, what I work on, skills & tooling (tabbed, each tab
 * linking to the case studies that back it), about me, then a closing CTA.
 */
export default function Home() {
  const { t, tr } = useLanguage()
  const flagship = featuredProjects[0] ?? projects[0]
  const rest = projects.filter((p) => p.slug !== flagship?.slug)
  const [tab, setTab] = useState(0)
  const activeTab = site.skillTabs[tab]
  const paragraphs = tr(site.about) ?? []

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div>
              <Avatar size={92} />
            </div>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {t('hero.eyebrow')}
            </p>
            <h1 className="mt-5 text-5xl font-bold text-heading sm:text-6xl">
              {t('hero.name')}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">{t('hero.aboutMe')}</p>

            <dl className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-line border-y border-line">
              {site.heroStats.map((s) => (
                <div key={s.value} className="px-4 py-4 first:pl-0">
                  <dt className="font-display text-lg font-bold text-accent sm:whitespace-nowrap sm:text-xl lg:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">{tr(s.label)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="btn-grad rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                {t('hero.viewProjects')}
              </Link>
              <a
                href={`mailto:${site.email}`}
                onClick={() => trackContactClick('hero')}
                className="rounded-full border border-line bg-panel px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent-line"
              >
                {t('home.ctaEmail')}
              </a>
            </div>
          </div>

          <PipelineCard className="lg:justify-self-end" />
        </Container>
      </section>

      {/* ---------------- 01 Selected work ---------------- */}
      <section id="work" className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            index="01"
            eyebrow={t('sec.work.eyebrow')}
            title={t('sec.work.title')}
            lead={t('sec.work.lead')}
          />
          {flagship && (
            <div className="mt-10">
              <FeaturedProject project={flagship} />
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-12 border-b border-line">
              {rest.map((p, i) => (
                <ProjectRow key={p.slug} project={p} index={String(i + 1).padStart(2, '0')} />
              ))}
            </div>
          )}
          <p className="mt-8">
            <Link to="/projects" className="text-sm font-semibold text-accent hover:underline">
              {t('home.allProjects')} &rarr;
            </Link>
          </p>
        </Container>
      </section>

      {/* ---------------- 02 What I work on ---------------- */}
      <section className="border-y border-line bg-panel-2 py-16 sm:py-24">
        <Container>
          <SectionHeader
            index="02"
            eyebrow={t('sec.focus.eyebrow')}
            title={t('sec.focus.title')}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.workAreas.map((a, i) => (
              <div
                key={a.title.en}
                className="rounded-2xl border border-line bg-panel p-6 transition hover:border-accent-line hover:shadow-[var(--shadow-card)]"
              >
                <span className="font-mono text-xs font-medium text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-heading">{tr(a.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tr(a.body)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- 03 Skills & tooling ---------------- */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeader
            index="03"
            eyebrow={t('sec.skills.eyebrow')}
            title={t('sec.skills.title')}
            lead={t('sec.skills.lead')}
          />

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={t('sec.skills.eyebrow')}>
            {site.skillTabs.map((s, i) => (
              <button
                key={s.label.en}
                type="button"
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === i
                    ? 'btn-grad'
                    : 'border border-line bg-panel text-body hover:border-accent-line hover:text-heading'
                }`}
              >
                {tr(s.label)}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            className="mt-6 grid gap-8 rounded-2xl border border-line bg-panel p-6 sm:p-8 md:grid-cols-2"
          >
            <div>
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-faint">
                {t('skills.caseStudies')}
              </p>
              <ul className="mt-4 space-y-3">
                {activeTab.caseStudies.map((slug) => {
                  const p = getProject(slug)
                  if (!p) return null
                  return (
                    <li key={slug}>
                      <Link
                        to={`/projects/${slug}`}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-sm font-medium text-heading transition hover:border-accent-line hover:bg-accent-soft"
                      >
                        <span>{tr(p.title)}</span>
                        <span aria-hidden="true" className="text-accent transition group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-faint">
                {t('skills.tools')}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeTab.tools.map((tool) => (
                  <Tag key={tool} tone="accent">
                    {tool}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- 04 About me ---------------- */}
      <section className="border-t border-line bg-panel-2 py-16 sm:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <Avatar size={160} className="mx-auto md:mx-0" />
          <div>
            <SectionHeader index="04" eyebrow={t('sec.about.eyebrow')} />
            <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-body">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
            >
              {t('about.more')} &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-heading sm:text-3xl">{t('home.ctaEyebrow')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-body">{t('home.ctaBody')}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              onClick={() => trackContactClick('home_cta')}
              className="btn-grad rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              {t('home.ctaEmail')}
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGithubClick('home_cta')}
              className="rounded-full border border-line bg-panel px-6 py-3 text-sm font-semibold text-heading transition hover:border-accent-line"
            >
              {t('nav.github')}
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
