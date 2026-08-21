/**
 * Site-wide details. Bilingual fields use { en, vi }; anything the same in
 * both languages is written once as a plain value.
 */
export const site = {
  name: { en: 'Quoc Trung Nguyen', vi: 'Nguyễn Quốc Trung' },
  shortName: { en: 'Quoc Trung', vi: 'Quốc Trung' },
  role: 'Data Analyst | Business Intelligence',
  location: { en: 'Vietnam · Open to remote', vi: 'Việt Nam · Sẵn sàng làm remote' },
  email: 'quoctrung121212@gmail.com',

  // public/cv.pdf is the finalized Data Analyst | Business Intelligence CV.
  cvUrl: '/cv.pdf',
  cvEnabled: true,
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
      items: ['Python', 'Pandas', 'EDA', 'Cohort Analysis'],
    },
    {
      group: 'BI & Reporting',
      items: ['Power BI', 'DAX', 'Power Query', 'Excel'],
    },
    {
      group: 'Data & SQL',
      items: ['SQL', 'SQL Server', 'ETL', 'Data Modeling', 'Star Schema'],
    },
    {
      group: 'Tools',
      items: ['Git', 'GitHub', 'Jupyter Notebook'],
    },
  ],
}

export default site
