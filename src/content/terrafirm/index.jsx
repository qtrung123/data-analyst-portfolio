import {
  CaseSection,
  Callout,
  Bullets,
  FlowLine,
  FactStrip,
  FindingCards,
  CompareBars,
  DashboardPage,
  CodeBlock,
  Expandable,
  EmbedPlaceholder,
} from '../../components/case/CaseBlocks.jsx'
import { copy, shots } from './copy.js'

const IMG = '/projects/terrafirm'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Every figure is a verified value from the delivered Power BI model.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'terrafirm-safety-analytics',
  aliases: ['terrafirm'], // /projects/terrafirm redirects to the full slug
  title: 'TerraFirm Safety Analytics',
  subtitle: {
    en: 'From safety outcomes to preventive risk signals',
    vi: 'Từ kết quả an toàn đến tín hiệu rủi ro phòng ngừa',
  },
  summary: {
    en: 'A 6-page Power BI solution built from 9 operational datasets to connect incident outcomes with preventive activity, field risk and training readiness.',
    vi: 'Giải pháp Power BI 6 trang xây dựng từ 9 nguồn dữ liệu vận hành, kết nối kết quả sự cố với hoạt động phòng ngừa, rủi ro hiện trường và mức sẵn sàng đào tạo.',
  },
  category: { en: 'Business Intelligence', vi: 'Business Intelligence' },
  year: '2025',
  status: 'flagship',
  featured: true,
  tools: ['Power BI', 'DAX', 'Power Query (M)', 'SQL', 'Star schema', 'Deneb'],

  // Card content: one sentence on what I did, the core skills, one outcome.
  card: {
    skills: ['Power BI', 'DAX', 'Power Query', 'Star Schema', 'Deneb'],
    did: {
      en: 'Built a 6-page Power BI solution from 9 operational datasets to connect safety outcomes with preventive activity, training readiness and site-level risk.',
      vi: 'Xây dựng giải pháp Power BI 6 trang từ 9 nguồn dữ liệu vận hành, kết nối kết quả an toàn với hoạt động phòng ngừa, mức sẵn sàng đào tạo và rủi ro theo công trường.',
    },
    hook: {
      en: '29 → 16 YTD recordables, while preventive cadence remained only 29.9%.',
      vi: 'Sự cố phải ghi nhận YTD giảm 29 → 16, trong khi tần suất phòng ngừa chỉ đạt 29,9%.',
    },
  },

  metrics: [
    {
      label: { en: 'YTD recordables', vi: 'Sự cố YTD' },
      value: '29 → 16',
      note: { en: '~44.8% lower', vi: 'giảm ~44,8%' },
    },
    {
      label: { en: 'Cadence compliance', vi: 'Cadence compliance' },
      value: '29.9%',
      note: { en: 'company-wide', vi: 'toàn công ty' },
    },
    {
      label: { en: 'Training', vi: 'Đào tạo' },
      value: '86.2% / 76.2%',
      note: { en: 'completed vs on time', vi: 'hoàn thành / đúng hạn' },
    },
    {
      label: { en: 'Ironwood', vi: 'Ironwood' },
      value: '40 / 106',
      note: { en: 'of all recordables', vi: 'tổng ca phải ghi nhận' },
    },
  ],

  cover: {
    from: '#0c4a6e',
    to: '#082f49',
    glyph: '🦺',
    image: `${IMG}/page1.png`,
  },
  links: [
    // Replace with the real repository link before publishing.
    {
      label: { en: 'Power BI repository', vi: 'Repository Power BI' },
      href: 'https://github.com/',
    },
  ],
  sections: [
    { id: 'problem', label: { en: 'Problem', vi: 'Vấn đề' } },
    { id: 'built', label: { en: 'What I built', vi: 'Giải pháp' } },
    { id: 'findings', label: { en: 'Key findings', vi: 'Phát hiện chính' } },
    { id: 'dashboard', label: { en: 'Dashboard', vi: 'Dashboard' } },
    { id: 'technical', label: { en: 'Technical', vi: 'Kỹ thuật' } },
    { id: 'report', label: { en: 'Interactive report', vi: 'Báo cáo tương tác' } },
    { id: 'learned', label: { en: 'What I learned', vi: 'Bài học' } },
  ],
}

/**
 * Case-study body. Receives the active language from ProjectPage and renders
 * from `copy` — one component, two languages, no duplicated markup.
 */
export default function TerraFirmCaseStudy({ lang = 'en' }) {
  const c = copy[lang] ?? copy.en

  return (
    <>
      <CaseSection id="problem" eyebrow={c.sections.problem} title={c.problem.title}>
        {c.problem.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </CaseSection>

      <CaseSection id="built" eyebrow={c.sections.built} title={c.built.title}>
        <FlowLine steps={c.built.flow} />
        <p>{c.built.note}</p>
        <FactStrip facts={c.built.facts} />
      </CaseSection>

      <CaseSection id="findings" eyebrow={c.sections.findings} title={c.findings.title} wide>
        <FindingCards findings={c.findings.cards} />

        <h3 className="mt-8 text-lg font-semibold text-heading">
          {c.findings.compare.title}
        </h3>
        <CompareBars
          seriesA={c.findings.compare.seriesA}
          seriesB={c.findings.compare.seriesB}
          items={c.findings.compare.items}
        />

        <Callout tone="warn" title={c.findings.caveat.title}>
          <p>{c.findings.caveat.body}</p>
        </Callout>
      </CaseSection>

      <CaseSection
        id="dashboard"
        eyebrow={c.sections.dashboard}
        title={c.dashboard.title}
        wide
      >
        {shots.map((shot, i) => (
          <DashboardPage
            key={shot.n}
            number={shot.n}
            name={c.dashboard.pages[i].name}
            question={c.dashboard.pages[i].question}
            src={`${IMG}/${shot.file}`}
            alt={c.dashboard.pages[i].alt}
            caption={c.dashboard.pages[i].caption}
            width={shot.w}
            height={shot.h}
            shows={c.dashboard.pages[i].shows}
            takeaway={c.dashboard.pages[i].takeaway}
          />
        ))}
      </CaseSection>

      <CaseSection id="technical" eyebrow={c.sections.technical} title={c.technical.title}>
        <Bullets items={c.technical.items} />

        <Expandable label={c.technical.daxLabel}>
          {c.technical.dax.map((snippet, i) => (
            <CodeBlock
              key={i}
              language={snippet.language}
              code={snippet.code}
              caption={snippet.caption}
            />
          ))}
          <p className="pb-4 text-xs text-muted">{c.technical.daxNote}</p>
        </Expandable>
      </CaseSection>

      <CaseSection id="report" eyebrow={c.sections.report} title={c.report.title}>
        <EmbedPlaceholder
          title={c.report.placeholderTitle}
          note={c.report.placeholderNote}
        />
      </CaseSection>

      <CaseSection id="learned" eyebrow={c.sections.learned} title={c.learned.title}>
        <Bullets items={c.learned.items} />
      </CaseSection>
    </>
  )
}
