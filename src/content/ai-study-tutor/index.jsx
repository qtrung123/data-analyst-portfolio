import {
  CaseSection,
  Callout,
  Bullets,
  DataTable,
  PipelineDiagram,
  LinkCTA,
  RoleSummary,
} from '../../components/case/CaseBlocks.jsx'
import { copy } from './copy.js'
import { pick } from '../../i18n/pick.js'

const REPO = 'https://github.com/qtrung123/AI_Tutor2-Kaggle'

/* ------------------------------------------------------------------
   Card + case-study header metadata.
   Counts were taken from the repository: 229 commits (GitHub API),
   about 28,000 lines of backend Python and about 2,200 `def test_`
   functions. The repository has no labelled evaluation set, so no
   accuracy figure is claimed anywhere on this page.
   ------------------------------------------------------------------ */
export const meta = {
  slug: 'ai-study-tutor',
  aliases: ['ai-tutor', 'tutorflow'],
  title: 'AI Study Tutor',
  subtitle: {
    en: 'A local RAG tutor that answers from your own course files',
    vi: 'Gia sư RAG chạy cục bộ, trả lời từ chính tài liệu học của bạn',
  },
  summary: {
    en: "A study application that answers questions from a student's own PDFs with page citations, generates quizzes and flashcards, and indexes figures with OCR and a local vision model.",
    vi: 'Ứng dụng học tập trả lời câu hỏi từ chính các file PDF của sinh viên kèm trích dẫn trang, tạo quiz và flashcard, và index các hình bằng OCR cùng mô hình thị giác cục bộ.',
  },
  category: { en: 'AI / LLM Engineering', vi: 'AI / LLM Engineering' },
  year: '2026',
  status: 'live',
  featured: false,
  tools: ['Python', 'LLM', 'RAG', 'FastAPI', 'LangChain', 'Ollama', 'Vector Search', 'Chroma', 'OCR'],

  card: {
    purpose: {
      en: "Lets a student ask questions of their own course files and get answers tied to a page, instead of a general chatbot's guess.",
      vi: 'Cho sinh viên hỏi đáp trên chính tài liệu học của mình và nhận câu trả lời gắn với một trang cụ thể, thay vì phỏng đoán của một chatbot đa năng.',
    },
    thumbPills: ['Upload', 'Retrieve', 'Cite'],
    skills: ['RAG', 'LLM', 'Python', 'FastAPI', 'Ollama'],
    did: {
      en: 'Built a retrieval-augmented study tutor: document ingestion, vector search, grounded chat, quiz and flashcard generation, and figure indexing with OCR and a vision model.',
      vi: 'Xây dựng gia sư học tập dùng truy xuất tăng cường: nạp tài liệu, tìm kiếm vector, chat bám tài liệu, tạo quiz và flashcard, và index hình bằng OCR cùng mô hình thị giác.',
    },
    hook: {
      en: 'Answers cite their source page, and say so when the documents do not cover the question.',
      vi: 'Câu trả lời trích dẫn trang nguồn, và nói rõ khi tài liệu không đề cập đến câu hỏi.',
    },
  },

  metrics: [
    {
      label: { en: 'Commits', vi: 'Commit' },
      value: '229',
      note: { en: 'public repository', vi: 'repository công khai' },
    },
    {
      label: { en: 'Backend code', vi: 'Mã backend' },
      value: '~28k',
      note: { en: 'lines of Python', vi: 'dòng Python' },
    },
    {
      label: { en: 'Tests', vi: 'Kiểm thử' },
      value: '~2,200',
      note: { en: 'test functions', vi: 'hàm test' },
    },
    {
      label: { en: 'Local models', vi: 'Mô hình cục bộ' },
      value: '3',
      note: { en: 'chat · embedding · vision', vi: 'chat · embedding · thị giác' },
    },
  ],

  cover: { from: '#312e81', to: '#1e1b4b', glyph: '🎓' },
  links: [{ label: { en: 'GitHub repository', vi: 'Repository GitHub' }, href: REPO }],

  roleSummary: {
    role: {
      en: 'Individual AI / LLM engineering project',
      vi: 'Dự án cá nhân về AI / LLM engineering',
    },
    skills: ['LLM application', 'RAG', 'Prompt design', 'Vector search', 'REST API', 'Testing'],
  },

  sections: [
    { id: 'problem', label: { en: 'Problem', vi: 'Vấn đề' } },
    { id: 'architecture', label: { en: 'How it works', vi: 'Cách hoạt động' } },
    { id: 'grounding', label: { en: 'Grounded answers', vi: 'Bám tài liệu' } },
    { id: 'figures', label: { en: 'Reading figures', vi: 'Đọc hình' } },
    { id: 'study', label: { en: 'Study features', vi: 'Tính năng học' } },
    { id: 'engineering', label: { en: 'Engineering', vi: 'Kỹ thuật' } },
    { id: 'limits', label: { en: 'Limits', vi: 'Hạn chế' } },
    { id: 'repo', label: { en: 'Repository', vi: 'Repository' } },
  ],
}

export default function AiStudyTutorCaseStudy({ lang = 'en' }) {
  const c = copy[lang] ?? copy.en

  return (
    <>
      <RoleSummary role={pick(meta.roleSummary.role, lang)} skills={meta.roleSummary.skills} />

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

      <CaseSection id="grounding" eyebrow={c.sections.grounding} title={c.grounding.title}>
        <p>{c.grounding.intro}</p>
        <Bullets items={c.grounding.items} />
        <Callout tone="warn" title={c.grounding.callout.title}>
          <p>{c.grounding.callout.body}</p>
        </Callout>
      </CaseSection>

      <CaseSection id="figures" eyebrow={c.sections.figures} title={c.figures.title}>
        {c.figures.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <Bullets items={c.figures.items} />
      </CaseSection>

      <CaseSection id="study" eyebrow={c.sections.study} title={c.study.title}>
        <Bullets items={c.study.items} />
      </CaseSection>

      <CaseSection
        id="engineering"
        eyebrow={c.sections.engineering}
        title={c.engineering.title}
        wide
      >
        <DataTable columns={c.engineering.table.columns} rows={c.engineering.table.rows} />
      </CaseSection>

      <CaseSection id="limits" eyebrow={c.sections.limits} title={c.limits.title}>
        <Bullets items={c.limits.items} />
        <Callout tone="neutral" title={c.limits.next.title}>
          <p>{c.limits.next.body}</p>
        </Callout>
      </CaseSection>

      <CaseSection id="repo" eyebrow={c.sections.repo} title={c.repo.title}>
        <LinkCTA title={c.repo.title} note={c.repo.note} label={c.repo.label} href={REPO} />
      </CaseSection>
    </>
  )
}
