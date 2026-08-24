import {
  CaseSection,
  Callout,
  Bullets,
  FlowLine,
  FactStrip,
  DashboardPage,
  DataTable,
  RoleSummary,
} from '../../components/case/CaseBlocks.jsx'
import { copy, pages } from './copy.js'
import { pick } from '../../i18n/pick.js'

const IMG = '/projects/hptana'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Structural counts (pages, visuals, measures, tables) were extracted from
   the .pbix report layout and model diagram. Every number under "Key data
   insights" on the dashboard walkthrough was computed directly against the
   model's real tables (via pbixray) by reproducing each verified DAX
   measure's own logic — not inferred from a visual title.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'hptana',
  title: 'HPTANA Operations Analytics',
  subtitle: {
    en: 'End-to-end Power BI reporting on a multi-table operations model',
    vi: 'Báo cáo Power BI end-to-end trên mô hình vận hành nhiều bảng',
  },
  summary: {
    en: 'Built a 4-page Power BI report covering overview, sales, production and inventory to practice end-to-end BI reporting across a multi-table data model.',
    vi: 'Xây dựng báo cáo Power BI 4 trang gồm overview, sales, production và inventory để luyện tập báo cáo BI end-to-end trên mô hình dữ liệu nhiều bảng.',
  },
  category: { en: 'Business Intelligence', vi: 'Business Intelligence' },
  status: 'learning',
  featured: false,
  tools: ['Power BI', 'Power Query', 'DAX', 'Data Modeling', 'Dashboard Design'],

  card: {
    skills: ['Power BI', 'Power Query', 'DAX', 'Data Modeling', 'Dashboard Design'],
    did: {
      en: 'Built a 4-page Power BI report covering overview, sales, production and inventory to practice end-to-end BI reporting across a multi-table data model.',
      vi: 'Xây dựng báo cáo Power BI 4 trang gồm overview, sales, production và inventory để luyện tập báo cáo BI end-to-end trên mô hình dữ liệu nhiều bảng.',
    },
    hook: {
      en: '4 report pages · 45 visuals · 16 DAX measures · 18-table model',
      vi: '4 trang báo cáo · 45 visual · 16 measure DAX · mô hình 18 bảng',
    },
  },

  metrics: [
    { label: { en: 'Report pages', vi: 'Trang báo cáo' }, value: '4' },
    { label: { en: 'Visuals', vi: 'Visual' }, value: '45' },
    { label: { en: 'DAX measures', vi: 'Measure DAX' }, value: '16' },
    {
      label: { en: 'Tables modelled', vi: 'Bảng đã mô hình hóa' },
      value: '18',
      note: { en: '10 used in visuals', vi: '10 bảng lên visual' },
    },
  ],

  cover: { from: '#334155', to: '#0f172a', glyph: '📈' },
  // No repository link yet — the real URL will be added later.
  links: [],

  roleSummary: {
    role: {
      en: 'Individual Power BI learning project',
      vi: 'Dự án học Power BI cá nhân',
    },
    skills: ['Data modeling', 'DAX', 'Report design', 'KPI development', 'Interactive reporting'],
  },

  sections: [
    { id: 'objective', label: { en: 'Objective', vi: 'Mục tiêu' } },
    { id: 'built', label: { en: 'What I built', vi: 'Đã xây dựng' } },
    { id: 'dashboard', label: { en: 'Dashboard walkthrough', vi: 'Tham quan dashboard' } },
    { id: 'improve', label: { en: 'What I would improve', vi: 'Điều sẽ cải thiện' } },
    { id: 'progression', label: { en: 'HPTANA → TerraFirm', vi: 'HPTANA → TerraFirm' } },
    { id: 'taught', label: { en: 'What this taught me', vi: 'Bài học rút ra' } },
  ],
}

/**
 * Case-study body. Two layers of insight, kept visually distinct throughout:
 * the "Key data insights" box on each dashboard page states what the real
 * model data showed; the closing "What this project taught me" section
 * states what building it taught the author as an analyst. The Callout at
 * the top of that section says so explicitly.
 */
export default function HptanaCaseStudy({ lang = 'en' }) {
  const c = copy[lang] ?? copy.en

  return (
    <>
      <RoleSummary role={pick(meta.roleSummary.role, lang)} skills={meta.roleSummary.skills} />

      <CaseSection id="objective" eyebrow={c.sections.objective} title={c.objective.title}>
        {c.objective.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </CaseSection>

      <CaseSection id="built" eyebrow={c.sections.built} title={c.built.title}>
        <FlowLine steps={c.built.flow} />
        <p>{c.built.note}</p>
        <FactStrip facts={c.built.facts} />
      </CaseSection>

      <CaseSection id="dashboard" eyebrow={c.sections.dashboard} title={c.dashboard.title} wide>
        {pages.map((p, i) => {
          const pc = c.dashboard.pages[p.key]
          return (
            <DashboardPage
              key={p.key}
              number={i + 1}
              name={pc.title}
              question={pc.question}
              src={`${IMG}/${p.file}`}
              alt={pc.title}
              width={p.width}
              height={p.height}
              shows={pc.shows}
              insights={pc.insights}
              skills={pc.skills}
            />
          )
        })}
      </CaseSection>

      <CaseSection id="improve" eyebrow={c.sections.improve} title={c.improve.title}>
        <Bullets items={c.improve.items} />
      </CaseSection>

      <CaseSection
        id="progression"
        eyebrow={c.sections.progression}
        title={c.progression.title}
        wide
      >
        <p>{c.progression.body}</p>
        <DataTable columns={c.progression.table.columns} rows={c.progression.table.rows} />
      </CaseSection>

      <CaseSection id="taught" eyebrow={c.sections.taught} title={c.taught.title}>
        <Callout tone="neutral" title={c.taught.calloutTitle}>
          <p>{c.taught.calloutBody}</p>
        </Callout>
        <Bullets items={c.taught.items} />
      </CaseSection>
    </>
  )
}
