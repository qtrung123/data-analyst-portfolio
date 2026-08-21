import { Link } from 'react-router-dom'
import {
  CaseSection,
  Bullets,
  ChartGrid,
  Figure,
  LinkCTA,
} from '../../components/case/CaseBlocks.jsx'
import { copy, pages } from './copy.js'

const IMG = '/projects/hptana'
const REPO = 'https://github.com/'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Every count below was extracted from the .pbix file itself (report
   layout + model diagram) — page names, visual types, and the exact
   measure/column/table names each visual is bound to. No business finding
   is claimed: the dataset was never analysed for insights, only used to
   practice building the report.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'hptana',
  title: 'HPTANA',
  subtitle: {
    en: 'An earlier Power BI practice project',
    vi: 'Một dự án luyện tập Power BI trước đây',
  },
  summary: {
    en: 'A 4-page Power BI report over an 18-table relational model for a simulated manufacturing business — practice at multi-page reporting before TerraFirm.',
    vi: 'Báo cáo Power BI 4 trang trên mô hình dữ liệu quan hệ 18 bảng cho một doanh nghiệp sản xuất mô phỏng — luyện tập báo cáo nhiều trang trước khi làm TerraFirm.',
  },
  category: { en: 'Business Intelligence', vi: 'Business Intelligence' },
  status: 'practice',
  tier: 'practice',
  featured: false,
  tools: ['Power BI', 'DAX', 'Data Modeling', 'Relational Schema'],

  card: {
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Multi-table Reporting'],
    did: {
      en: 'Built a 4-page Power BI report over an 18-table relational model for a simulated manufacturing business, covering sales, production and inventory.',
      vi: 'Xây dựng báo cáo Power BI 4 trang trên mô hình dữ liệu quan hệ 18 bảng cho doanh nghiệp sản xuất mô phỏng, bao gồm bán hàng, sản xuất và tồn kho.',
    },
    hook: {
      en: 'An earlier-stage project — practice before the reporting approach used in TerraFirm.',
      vi: 'Một dự án ở giai đoạn sớm hơn — luyện tập trước cách làm báo cáo dùng trong TerraFirm.',
    },
  },

  metrics: [
    { label: { en: 'Pages', vi: 'Số trang' }, value: '4' },
    {
      label: { en: 'Tables modelled', vi: 'Bảng đã mô hình hóa' },
      value: '18',
      note: { en: '10 used in visuals', vi: '10 bảng lên visual' },
    },
    { label: { en: 'DAX measures', vi: 'Measure DAX' }, value: '16' },
    { label: { en: 'Visual types', vi: 'Loại visual' }, value: '9' },
  ],

  cover: { from: '#334155', to: '#0f172a', glyph: '🎓' },
  links: [
    // Replace with the real repository link before publishing.
    { label: { en: 'GitHub repository', vi: 'Repository GitHub' }, href: REPO },
  ],

  sections: [
    { id: 'objective', label: { en: 'Objective', vi: 'Mục tiêu' } },
    { id: 'dashboard', label: { en: 'Dashboard', vi: 'Dashboard' } },
    { id: 'practiced', label: { en: 'What I practiced', vi: 'Đã luyện tập' } },
    { id: 'takeaways', label: { en: 'Takeaways', vi: 'Điều rút ra' } },
    { id: 'repo', label: { en: 'Repository', vi: 'Repository' } },
  ],
}

/**
 * Case-study body — deliberately short, matching the reduced prominence of a
 * practice project. Five sections only, no findings section: nothing here
 * claims a business result, only what was built and practised.
 */
export default function HptanaCaseStudy({ lang = 'en' }) {
  const c = copy[lang] ?? copy.en

  return (
    <>
      <CaseSection id="objective" eyebrow={c.sections.objective} title={c.objective.title}>
        <p>{c.objective.body}</p>
        <p className="mt-4">
          <Link
            to="/projects/terrafirm-safety-analytics"
            className="text-sm font-medium text-accent hover:underline"
          >
            &rarr; {lang === 'vi' ? 'Xem TerraFirm Safety Analytics' : 'See TerraFirm Safety Analytics'}
          </Link>
        </p>
      </CaseSection>

      <CaseSection id="dashboard" eyebrow={c.sections.dashboard} title={c.dashboard.title} wide>
        <p className="text-sm text-muted">{c.dashboard.note}</p>
        <ChartGrid>
          {pages.map((p) => {
            const pc = c.dashboard.pages[p.key]
            return (
              <Figure
                key={p.key}
                src={`${IMG}/${p.file}`}
                alt={pc.title}
                caption={pc.caption}
              />
            )
          })}
        </ChartGrid>
      </CaseSection>

      <CaseSection id="practiced" eyebrow={c.sections.practiced} title={c.practiced.title}>
        <Bullets items={c.practiced.items} />
      </CaseSection>

      <CaseSection id="takeaways" eyebrow={c.sections.takeaways} title={c.takeaways.title}>
        <Bullets items={c.takeaways.items} />
      </CaseSection>

      <CaseSection id="repo" eyebrow={c.sections.repo} title={c.repo.title}>
        <LinkCTA title={c.repo.title} note={c.repo.note} label={c.repo.label} href={REPO} />
      </CaseSection>
    </>
  )
}
