/**
 * Site-wide details. Bilingual fields use { en, vi }; anything the same in
 * both languages is written once as a plain value.
 */
export const site = {
  name: { en: 'Quoc Trung Nguyen', vi: 'Nguyễn Quốc Trung' },
  shortName: { en: 'Quoc Trung', vi: 'Quốc Trung' },
  role: 'Data Analyst | Business Analyst | BI',
  location: { en: 'Vietnam · Open to remote', vi: 'Việt Nam · Sẵn sàng làm remote' },
  email: 'quoctrung121212@gmail.com',

  links: {
    github: 'https://github.com/qtrung123',
    linkedin: 'https://www.linkedin.com/',
  },

  about: {
    en: [
      'I build end-to-end analytics: modelling the data, writing the measures, designing the report, and making sure the people reading it can act on what they see.',
      'Most of my work sits between operations and analytics - taking data collected for compliance or record-keeping and turning it into something a manager can act on this week.',
    ],
    vi: [
      'Tôi xây dựng giải pháp phân tích end-to-end: mô hình hóa dữ liệu, viết measure, thiết kế báo cáo và bảo đảm người đọc có thể hành động dựa trên những gì họ thấy.',
      'Phần lớn công việc của tôi nằm giữa vận hành và phân tích - lấy dữ liệu vốn thu thập để tuân thủ hoặc lưu hồ sơ và biến nó thành thứ mà người quản lý có thể dùng ngay trong tuần.',
    ],
  },

  skills: [
    {
      group: { en: 'BI & Visualisation', vi: 'BI & Trực quan hóa' },
      items: ['Power BI', 'DAX', 'Power Query (M)', 'Deneb', 'RLS'],
    },
    {
      group: { en: 'Data & Modelling', vi: 'Dữ liệu & Mô hình' },
      items: ['SQL', 'Star schema', 'Data modeling', 'Data quality'],
    },
    {
      group: { en: 'Engineering', vi: 'Kỹ thuật' },
      items: ['Python', 'pandas', 'Git', 'Microsoft Fabric'],
    },
  ],

  // Compact skill rows for the homepage About Me section — grouped
  // differently from `skills` above (which drives the fuller About page
  // toolkit), so each stays independently editable. Group labels are the
  // same in both languages, so they're written once as plain strings.
  homeSkills: [
    {
      group: 'Analytics',
      items: ['Python', 'Pandas', 'EDA'],
    },
    {
      group: 'BI & Reporting',
      items: ['Power BI', 'DAX', 'Power Query'],
    },
    {
      group: 'Data',
      items: ['SQL', 'SQL Server', 'Data Modeling'],
    },
    {
      group: 'Tools',
      items: ['Excel', 'Git', 'Jupyter Notebook'],
    },
  ],

  // Optional profile photo: drop a file at public/profile.jpg to replace the
  // initials badge. If the file is missing, the initials are shown instead.
  photo: '/profile.jpg',
  initials: 'QT',

  // Three headline facts under the hero. Every value is checkable on the
  // project pages themselves.
  heroStats: [
    { value: '4', label: { en: 'End-to-end case studies', vi: 'Case study end-to-end' } },
    { value: 'SQL · Python', label: { en: 'Warehouse, ETL and EDA', vi: 'Warehouse, ETL và EDA' } },
    { value: 'Power BI', label: { en: '6-page report from 9 datasets', vi: 'Báo cáo 6 trang từ 9 nguồn dữ liệu' } },
  ],

  // Dark architecture card in the hero. Mirrors the SQL Data Warehouse
  // project: six CSV exports, three layers, one star schema.
  pipeline: {
    title: { en: 'Data pipeline · SQL Data Warehouse', vi: 'Data pipeline · SQL Data Warehouse' },
    badge: { en: 'End to end', vi: 'End to end' },
    source: { label: { en: 'Source', vi: 'Nguồn' }, text: { en: 'CRM + ERP · 6 CSV exports', vi: 'CRM + ERP · 6 file CSV' } },
    load: { label: { en: 'Load', vi: 'Nạp' }, text: { en: 'BULK INSERT → Bronze', vi: 'BULK INSERT → Bronze' } },
    steps: [
      { title: { en: 'Cleanse', vi: 'Làm sạch' }, sub: 'TRIM · dedupe · dates' },
      { title: { en: 'Integrate', vi: 'Tích hợp' }, sub: 'CRM + ERP keys' },
      { title: { en: 'Test', vi: 'Kiểm thử' }, sub: 'zero-row checks' },
    ],
    out: { label: { en: 'Delivered', vi: 'Kết quả' }, text: { en: 'Gold star schema · fact_sales + 2 dimensions', vi: 'Star schema Gold · fact_sales + 2 dimension' } },
    caption: {
      en: 'The shape of my SQL Data Warehouse project: raw CRM and ERP exports into one analytics-ready model.',
      vi: 'Hình dạng của dự án SQL Data Warehouse: dữ liệu CRM và ERP thô thành một mô hình sẵn sàng phân tích.',
    },
  },

  workAreas: [
    {
      title: { en: 'Data cleaning & preparation', vi: 'Làm sạch & chuẩn bị dữ liệu' },
      body: { en: 'Deduplicating, standardising and reconciling messy multi-source data before any analysis.', vi: 'Khử trùng lặp, chuẩn hóa và đối chiếu dữ liệu nhiều nguồn trước khi phân tích.' },
    },
    {
      title: { en: 'Data modeling', vi: 'Mô hình hóa dữ liệu' },
      body: { en: 'Star schemas and relational models that keep metrics consistent across every report.', vi: 'Star schema và mô hình quan hệ giúp chỉ số nhất quán trên mọi báo cáo.' },
    },
    {
      title: { en: 'Dashboards & BI', vi: 'Dashboard & BI' },
      body: { en: 'Power BI reports and DAX measures organised around the questions a manager actually asks.', vi: 'Báo cáo Power BI và measure DAX tổ chức quanh những câu hỏi mà người quản lý thực sự đặt ra.' },
    },
    {
      title: { en: 'Exploratory analysis', vi: 'Phân tích khám phá' },
      body: { en: 'Profiling distributions, timing and segments to find what is worth investigating.', vi: 'Khảo sát phân bố, thời điểm và phân khúc để tìm ra điều đáng đào sâu.' },
    },
    {
      title: { en: 'Retention & cohorts', vi: 'Giữ chân & cohort' },
      body: { en: 'Comparing repeat-purchase behaviour with purchase sequences and monthly cohorts.', vi: 'So sánh hành vi mua lại bằng chuỗi lần mua và cohort theo tháng.' },
    },
    {
      title: { en: 'Questions into KPIs', vi: 'Từ câu hỏi đến KPI' },
      body: { en: 'Turning a broad question into defined, checkable measures: rates, benchmarks and data-quality flags.', vi: 'Biến một câu hỏi rộng thành các chỉ số rõ ràng, kiểm chứng được: tỷ lệ, mốc so sánh và cờ chất lượng dữ liệu.' },
    },
  ],

  // Skill tabs. caseStudies are project slugs; their titles come from the
  // project registry, so a renamed project updates here automatically.
  skillTabs: [
    {
      label: { en: 'Data & SQL', vi: 'Dữ liệu & SQL' },
      caseStudies: ['sql-data-warehouse'],
      tools: ['SQL Server', 'T-SQL', 'ETL', 'Star schema', 'Data quality'],
    },
    {
      label: { en: 'Analysis & Python', vi: 'Phân tích & Python' },
      caseStudies: ['online-ticket-booking-retention'],
      tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter', 'Cohort analysis'],
    },
    {
      label: { en: 'BI & Reporting', vi: 'BI & Báo cáo' },
      caseStudies: ['terrafirm-safety-analytics', 'hptana'],
      tools: ['Power BI', 'DAX', 'Power Query', 'Deneb', 'Dashboard design'],
    },
  ],
}

export default site
