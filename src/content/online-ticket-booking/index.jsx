import {
  CaseSection,
  Callout,
  Bullets,
  FlowLine,
  FactStrip,
  FindingCards,
  CompareBars,
  DataTable,
  EdaChart,
  Figure,
  LinkCTA,
  RoleSummary,
} from '../../components/case/CaseBlocks.jsx'
import { copy, charts } from './copy.js'
import { pick } from '../../i18n/pick.js'

const IMG = '/projects/online-ticket-booking'
const REPO =
  'https://github.com/qtrung123/Online-Ticket-Booking-Data-Analysis-Customer-Retention-Study'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Every figure comes from an executed notebook output in the repository.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'online-ticket-booking-retention',
  aliases: ['online-ticket-booking', 'ticket-retention'],
  title: 'Online Ticket Booking — Customer Retention Study',
  subtitle: {
    en: 'Do customers won with a promotion come back?',
    vi: 'Khách hàng có được nhờ khuyến mãi có quay lại không?',
  },
  summary: {
    en: 'A Python and Pandas study joining five raw booking tables into one 154,723-row analytical dataset, then working from broad exploratory analysis through to a promotion-versus-organic retention comparison.',
    vi: 'Nghiên cứu bằng Python và Pandas, ghép năm bảng đặt vé thô thành bộ dữ liệu 154.723 dòng, đi từ phân tích khám phá tổng thể đến so sánh giữ chân giữa nhóm khuyến mãi và nhóm tự nhiên.',
  },
  category: { en: 'Data Analysis', vi: 'Phân tích dữ liệu' },
  year: '2025',
  status: 'live',
  featured: false,
  tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter', 'Cohort analysis'],

  // Card content: one sentence on what I did, the core skills, one outcome.
  card: {
    purpose: {
      en: "Helps a ticketing platform judge whether promotions bring customers back, not only whether they win the first purchase.",
      vi: "Giúp nền tảng bán vé đánh giá khuyến mãi có đưa khách quay lại hay không, thay vì chỉ xem nó có giúp chốt đơn đầu tiên.",
    },
    thumbs: ["/projects/online-ticket-booking/cohort-2022.png","/projects/online-ticket-booking/day-hour-heatmap.png"],
    skills: ['Python', 'Pandas', 'EDA', 'Cohort Analysis', 'Customer Retention'],
    did: {
      en: 'Cleaned and analyzed multi-table booking data in Python to understand customer behavior, purchase patterns and repeat retention.',
      vi: 'Làm sạch và phân tích dữ liệu đặt vé đa bảng bằng Python để hiểu hành vi khách hàng, mẫu hình mua và tỷ lệ quay lại.',
    },
    hook: {
      en: 'Second-purchase rates were 13.09% with promotion vs 12.20% without promotion.',
      vi: 'Tỷ lệ mua lần hai đạt 13,09% khi có khuyến mãi so với 12,20% khi không khuyến mãi.',
    },
  },

  metrics: [
    {
      label: { en: 'Repeat rate', vi: 'Tỷ lệ mua lại' },
      value: '13.09% / 12.20%',
      note: { en: 'promotion vs not', vi: 'có / không khuyến mãi' },
    },
    {
      label: { en: 'Transactions', vi: 'Giao dịch' },
      value: '154,723',
      note: { en: '2019–2022', vi: '2019–2022' },
    },
    {
      label: { en: 'Customers', vi: 'Khách hàng' },
      value: '131,400',
      note: { en: 'across 5 tables', vi: 'từ 5 bảng dữ liệu' },
    },
    {
      label: { en: 'Mobile share', vi: 'Tỷ trọng mobile' },
      value: '~89%',
      note: { en: '138,134 tickets', vi: '138.134 vé' },
    },
  ],

  cover: {
    from: '#3f1d5c',
    to: '#160b26',
    glyph: '🎟️',
    image: `${IMG}/cohort-2022.png`,
  },
  links: [{ label: { en: 'GitHub repository', vi: 'Repository GitHub' }, href: REPO }],

  roleSummary: {
    role: {
      en: 'Individual data analysis project',
      vi: 'Dự án phân tích dữ liệu cá nhân',
    },
    skills: [
      'Data cleaning',
      'EDA',
      'Customer journey analysis',
      'Cohort analysis',
      'Interpretation',
    ],
  },

  sections: [
    { id: 'problem', label: { en: 'Problem', vi: 'Vấn đề' } },
    { id: 'pipeline', label: { en: 'Data pipeline', vi: 'Pipeline dữ liệu' } },
    { id: 'questions', label: { en: 'Analysis questions', vi: 'Câu hỏi phân tích' } },
    { id: 'findings', label: { en: 'Key findings', vi: 'Phát hiện chính' } },
    { id: 'eda', label: { en: 'Exploratory analysis', vi: 'Phân tích khám phá' } },
    { id: 'journey', label: { en: 'Customer journey', vi: 'Hành trình khách hàng' } },
    { id: 'retention', label: { en: 'Retention & cohorts', vi: 'Giữ chân & cohort' } },
    { id: 'technical', label: { en: 'Technical', vi: 'Kỹ thuật' } },
    { id: 'learned', label: { en: 'What I learned', vi: 'Bài học' } },
    { id: 'repo', label: { en: 'Repository', vi: 'Repository' } },
  ],
}

/**
 * Case-study body. Receives the active language from ProjectPage and renders
 * from `copy` — one component, two languages.
 *
 * The reading order is deliberate: broad exploratory analysis, then the
 * customer journey, then retention. Each section hands off to the next.
 */
export default function OnlineTicketBookingCaseStudy({ lang = 'en' }) {
  const c = copy[lang] ?? copy.en

  return (
    <>
      <RoleSummary role={pick(meta.roleSummary.role, lang)} skills={meta.roleSummary.skills} />

      <CaseSection id="problem" eyebrow={c.sections.problem} title={c.problem.title}>
        {c.problem.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </CaseSection>

      <CaseSection id="pipeline" eyebrow={c.sections.pipeline} title={c.pipeline.title}>
        <FlowLine steps={c.pipeline.flow} />
        <p>{c.pipeline.note}</p>
        <FactStrip facts={c.pipeline.facts} />
        <h3 className="mt-8 text-lg font-semibold text-heading">
          {c.pipeline.cleaningTitle}
        </h3>
        <DataTable columns={c.pipeline.cleaningColumns} rows={c.pipeline.cleaning} />
      </CaseSection>

      <CaseSection id="questions" eyebrow={c.sections.questions} title={c.questions.title}>
        <Bullets items={c.questions.items} />
      </CaseSection>

      <CaseSection id="findings" eyebrow={c.sections.findings} title={c.findings.title} wide>
        <FindingCards findings={c.findings.cards} />
        <Callout tone="warn" title={c.findings.caveat.title}>
          <p>{c.findings.caveat.body}</p>
        </Callout>
      </CaseSection>

      {/* ---- Broad EDA ---- */}
      <CaseSection id="eda" eyebrow={c.sections.eda} title={c.eda.title} wide>
        <p>{c.eda.intro}</p>
        <div className="mt-8">
          {c.eda.charts.map((item) => {
            const chart = charts[item.key]
            return (
              <EdaChart
                key={item.key}
                question={item.question}
                src={`${IMG}/${chart.file}`}
                alt={item.alt}
                description={item.description}
                takeaway={item.takeaway}
                width={chart.w}
                height={chart.h}
              />
            )
          })}
        </div>
        <p className="text-sm text-muted">{c.eda.paymentNote}</p>
      </CaseSection>

      {/* ---- Transition: aggregate patterns to a single customer ---- */}
      <CaseSection id="journey" eyebrow={c.sections.journey} title={c.journey.title} wide>
        {c.journey.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="mt-6">
          <EdaChart
            question={c.journey.chart.question}
            src={`${IMG}/${charts.paymentSuccess.file}`}
            alt={c.journey.chart.alt}
            description={c.journey.chart.description}
            takeaway={c.journey.chart.takeaway}
            width={charts.paymentSuccess.w}
            height={charts.paymentSuccess.h}
          />
        </div>
      </CaseSection>

      {/* ---- The deeper business question ---- */}
      <CaseSection id="retention" eyebrow={c.sections.retention} title={c.retention.title} wide>
        {c.retention.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h3 className="mt-6 text-lg font-semibold text-heading">
          {c.retention.compare.title}
        </h3>
        <CompareBars
          seriesA={c.retention.compare.seriesA}
          seriesB={c.retention.compare.seriesB}
          items={c.retention.compare.items}
        />

        <p>{c.retention.cohortNote}</p>

        <Figure
          src={`${IMG}/${charts.cohort2019.file}`}
          alt={c.retention.chart2019}
          caption={c.retention.chart2019}
          width={charts.cohort2019.w}
          height={charts.cohort2019.h}
        />
        <Figure
          src={`${IMG}/${charts.cohort2022.file}`}
          alt={c.retention.chart2022}
          caption={c.retention.chart2022}
          width={charts.cohort2022.w}
          height={charts.cohort2022.h}
        />
      </CaseSection>

      <CaseSection id="technical" eyebrow={c.sections.technical} title={c.technical.title}>
        <Bullets items={c.technical.items} />
      </CaseSection>

      <CaseSection id="learned" eyebrow={c.sections.learned} title={c.learned.title}>
        <Bullets items={c.learned.items} />
      </CaseSection>

      <CaseSection id="repo" eyebrow={c.sections.repo} title={c.repo.title}>
        <LinkCTA title={c.repo.title} note={c.repo.note} label={c.repo.label} href={REPO} />
      </CaseSection>
    </>
  )
}
