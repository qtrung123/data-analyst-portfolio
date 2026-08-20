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
} from '../../components/case/CaseBlocks.jsx'
import { copy, charts } from './copy.js'

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

  card: {
    problem: {
      en: 'Booking data sat in five unjoined tables, so nobody could tell whether promotions brought customers back.',
      vi: 'Dữ liệu đặt vé nằm ở năm bảng chưa ghép, nên không ai biết khuyến mãi có đưa khách quay lại hay không.',
    },
    built: {
      en: 'A Pandas cleaning and join pipeline into one fact table, plus five notebooks of EDA, segmentation and cohort analysis.',
      vi: 'Pipeline làm sạch và ghép bằng Pandas thành một bảng fact, cùng năm notebook EDA, phân khúc và phân tích cohort.',
    },
    found: {
      en: 'Promotion and non-promotion first-buyers returned at almost the same rate — 13.09% vs 12.20%.',
      vi: 'Khách mua lần đầu có và không có khuyến mãi quay lại với tỷ lệ gần như nhau — 13,09% so với 12,20%.',
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
