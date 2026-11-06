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
      "I'm a data analyst aiming for Data Analyst and Business Analyst roles. I build end-to-end analytics: modelling the data, writing the measures, designing the report, and making sure the people reading it can act on what they see.",
      "Through four self-directed projects on public datasets, I've built a SQL Server data warehouse that reconciles CRM and ERP exports, a Python study of customer retention, and Power BI reports from a 4-page operations report to a 6-page safety dashboard.",
      "What drives me is finding out why a number moved and making sure the data behind it can be trusted. I'm currently looking for Data Analyst, Business Analyst and BI internship opportunities.",
    ],
    vi: [
      'Tôi là data analyst đang hướng tới vị trí Data Analyst và Business Analyst. Tôi xây dựng giải pháp phân tích end-to-end: mô hình hóa dữ liệu, viết measure, thiết kế báo cáo và bảo đảm người đọc có thể hành động dựa trên những gì họ thấy.',
      'Qua bốn dự án tự học trên dữ liệu công khai, tôi đã xây dựng data warehouse SQL Server hợp nhất dữ liệu CRM và ERP, một nghiên cứu giữ chân khách hàng bằng Python, và các báo cáo Power BI từ báo cáo vận hành 4 trang đến dashboard an toàn 6 trang.',
      'Điều thúc đẩy tôi là tìm ra vì sao một con số thay đổi và bảo đảm dữ liệu phía sau đáng tin cậy. Hiện tôi đang tìm cơ hội thực tập Data Analyst, Business Analyst và BI.',
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

  // Dark card in the hero. Deliberately minimal: one source, three themes,
  // one deliverable. Content mirrors the TerraFirm case study.
  heroCard: {
    title: { en: 'Case study · TerraFirm Safety Analytics', vi: 'Case study · TerraFirm Safety Analytics' },
    badge: { en: 'Power BI', vi: 'Power BI' },
    source: {
      label: { en: 'Source', vi: 'Nguồn' },
      text: { en: '9 operational datasets · 10 sites', vi: '9 nguồn dữ liệu vận hành · 10 công trường' },
    },
    steps: [
      { title: { en: 'Outcomes', vi: 'Kết quả' } },
      { title: { en: 'Prevention', vi: 'Phòng ngừa' } },
      { title: { en: 'Training', vi: 'Đào tạo' } },
    ],
    out: {
      label: { en: 'Delivered', vi: 'Sản phẩm' },
      text: { en: '6-page Power BI report', vi: 'Báo cáo Power BI 6 trang' },
    },
    caption: {
      en: 'From safety outcomes to preventive risk signals.',
      vi: 'Từ kết quả an toàn đến tín hiệu rủi ro phòng ngừa.',
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
