import {
  CaseSection,
  Bullets,
  DataTable,
  CodeBlock,
  PipelineDiagram,
  SchemaDiagram,
  LinkCTA,
} from '../../components/case/CaseBlocks.jsx'
import { copy, snippets, model } from './copy.js'

const REPO = 'https://github.com/qtrung123/sql-data-warehouse-project'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Everything here was verified against the SQL files in the repository.
   The repository contains no analytics or reporting scripts, so none are
   claimed — see the Analytics stage in the architecture diagram.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'sql-data-warehouse',
  aliases: ['sql-dwh', 'data-warehouse'],
  title: 'SQL Data Warehouse',
  subtitle: {
    en: 'From raw CRM & ERP data to an analytics-ready star schema',
    vi: 'Từ dữ liệu thô CRM & ERP đến star schema sẵn sàng phân tích',
  },
  summary: {
    en: 'A SQL Server warehouse that ingests six CSV exports from a CRM and an ERP through Bronze, Silver and Gold layers, reconciling their keys, dates and codes into one star schema.',
    vi: 'Data warehouse trên SQL Server nạp sáu file CSV từ CRM và ERP qua các tầng Bronze, Silver, Gold, hợp nhất khóa, ngày tháng và mã hóa thành một star schema.',
  },
  category: { en: 'Data Engineering', vi: 'Data Engineering' },
  year: '2025',
  status: 'live',
  featured: false,
  tools: ['SQL Server', 'T-SQL', 'ETL', 'Medallion Architecture', 'Star Schema', 'Data Quality'],

  card: {
    problem: {
      en: 'A CRM and an ERP describe the same customers and products with different keys, formats and date types.',
      vi: 'CRM và ERP mô tả cùng khách hàng và sản phẩm nhưng khác khóa, định dạng và kiểu ngày.',
    },
    built: {
      en: 'Bronze, Silver and Gold layers in SQL Server: BULK INSERT ingestion, a cleansing ETL procedure, and three Gold views.',
      vi: 'Ba tầng Bronze, Silver, Gold trên SQL Server: nạp bằng BULK INSERT, procedure ETL làm sạch và ba view Gold.',
    },
    found: {
      en: 'One star schema — fact_sales with customer and product dimensions — plus zero-row quality tests on both layers.',
      vi: 'Một star schema — fact_sales cùng dimension khách hàng và sản phẩm — kèm kiểm thử zero-row cho cả hai tầng.',
    },
  },

  metrics: [
    {
      label: { en: 'Source files', vi: 'File nguồn' },
      value: '6',
      note: { en: 'CRM + ERP', vi: 'CRM + ERP' },
    },
    {
      label: { en: 'Sales rows', vi: 'Dòng bán hàng' },
      value: '60,398',
      note: { en: 'largest source file', vi: 'file nguồn lớn nhất' },
    },
    {
      label: { en: 'Layers', vi: 'Số tầng' },
      value: '3',
      note: { en: 'Bronze · Silver · Gold', vi: 'Bronze · Silver · Gold' },
    },
    {
      label: { en: 'Gold objects', vi: 'Đối tượng Gold' },
      value: '1 fact · 2 dims',
      note: { en: 'built as views', vi: 'xây dựng bằng view' },
    },
  ],

  cover: { from: '#134e4a', to: '#0b2b28', glyph: '🗄️' },
  links: [{ label: { en: 'GitHub repository', vi: 'Repository GitHub' }, href: REPO }],

  sections: [
    { id: 'problem', label: { en: 'Problem', vi: 'Vấn đề' } },
    { id: 'architecture', label: { en: 'Architecture', vi: 'Kiến trúc' } },
    { id: 'transformations', label: { en: 'Transformations', vi: 'Biến đổi' } },
    { id: 'model', label: { en: 'Analytical model', vi: 'Mô hình phân tích' } },
    { id: 'quality', label: { en: 'Data quality', vi: 'Chất lượng dữ liệu' } },
    { id: 'technical', label: { en: 'Technical', vi: 'Kỹ thuật' } },
    { id: 'repo', label: { en: 'Repository', vi: 'Repository' } },
  ],
}

/**
 * Case-study body — deliberately shorter and more technical than the other
 * two projects. Diagrams are HTML/CSS rather than images so they stay sharp,
 * themeable and responsive.
 */
export default function SqlDataWarehouseCaseStudy({ lang = 'en' }) {
  const c = copy[lang] ?? copy.en

  return (
    <>
      <CaseSection id="problem" eyebrow={c.sections.problem} title={c.problem.title}>
        {c.problem.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </CaseSection>

      <CaseSection
        id="architecture"
        eyebrow={c.sections.architecture}
        title={c.architecture.title}
        wide
      >
        <PipelineDiagram stages={c.architecture.stages} caption={c.architecture.caption} />
        <p className="text-sm text-muted">{c.architecture.note}</p>
      </CaseSection>

      <CaseSection
        id="transformations"
        eyebrow={c.sections.transformations}
        title={c.transformations.title}
        wide
      >
        <p>{c.transformations.intro}</p>
        <DataTable
          columns={c.transformations.table.columns}
          rows={c.transformations.table.rows}
        />
        <CodeBlock
          language="sql"
          code={snippets.dedupe}
          caption={c.transformations.snippets.dedupe}
        />
        <CodeBlock
          language="sql"
          code={snippets.dates}
          caption={c.transformations.snippets.dates}
        />
        <CodeBlock
          language="sql"
          code={snippets.sales}
          caption={c.transformations.snippets.sales}
        />
        <CodeBlock
          language="sql"
          code={snippets.productKey}
          caption={c.transformations.snippets.productKey}
        />
      </CaseSection>

      <CaseSection
        id="model"
        eyebrow={c.sections.modelSection}
        title={c.modelSection.title}
        wide
      >
        {c.modelSection.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <SchemaDiagram
          fact={model.fact}
          dimensions={model.dimensions}
          caption={c.modelSection.caption}
        />
        <Bullets items={c.modelSection.integration} />
      </CaseSection>

      <CaseSection id="quality" eyebrow={c.sections.quality} title={c.quality.title} wide>
        <p>{c.quality.intro}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[c.quality.silver, c.quality.gold].map((layer) => (
            <div key={layer.title} className="rounded-xl bg-panel p-5 ring-1 ring-line">
              <h3 className="font-mono text-sm font-semibold text-accent">{layer.title}</h3>
              <ul className="mt-3 space-y-2">
                {layer.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-body">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection id="technical" eyebrow={c.sections.technical} title={c.technical.title}>
        <Bullets items={c.technical.items} />
      </CaseSection>

      <CaseSection id="repo" eyebrow={c.sections.repo} title={c.repo.title}>
        <LinkCTA title={c.repo.title} note={c.repo.note} label={c.repo.label} href={REPO} />
      </CaseSection>
    </>
  )
}
