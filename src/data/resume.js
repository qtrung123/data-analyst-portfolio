/**
 * Resume content. Mirrors the PDF CVs in /public/cv. Project entries are
 * looked up from the project registry by slug so they stay in sync with the
 * case studies; the "when" text is the period shown on the CV.
 */
export const resume = {
  // CV PDFs are added here once the rewritten versions are ready, e.g.
  // { key: 'resume.dlDa', href: '/cv/<file>.pdf' }. The buttons hide while empty.
  downloads: [],
  summary: {
    en: 'Final-year Information Technology student with hands-on experience in SQL, data cleaning, validation and reporting through self-directed projects. Looking for a Data Analyst or Business Analyst internship where I can turn data into insights a team can act on.',
    vi: 'Sinh viên năm cuối ngành Công nghệ thông tin, có kinh nghiệm thực hành SQL, làm sạch, kiểm tra dữ liệu và báo cáo qua các dự án tự học. Đang tìm vị trí thực tập Data Analyst hoặc Business Analyst để biến dữ liệu thành thông tin mà đội ngũ có thể hành động.',
  },
  // Mirrors the CV skills block exactly (the site-wide toolkit lists more).
  skills: [
    { group: { en: 'Data & Analytics', vi: 'Dữ liệu & Phân tích' }, items: ['SQL', 'Data Modeling', 'Data Validation', 'Data Quality', 'EDA', 'Data Cleaning'] },
    { group: { en: 'Programming', vi: 'Lập trình' }, items: ['Python', 'Pandas'] },
    { group: { en: 'Visualization & Reporting', vi: 'Trực quan hoá & Báo cáo' }, items: ['Power BI', 'Excel'] },
    { group: { en: 'Tools', vi: 'Công cụ' }, items: ['Git', 'GitHub', 'Jupyter Notebook'] },
  ],
  projects: [
    { slug: 'terrafirm-safety-analytics', when: '2025' },
    { slug: 'online-ticket-booking-retention', when: '11/2025 – 02/2026' },
    { slug: 'sql-data-warehouse', when: '02/2026 – 04/2026' },
  ],
  experience: [
    {
      role: { en: 'Part-time Sales', vi: 'Nhân viên bán hàng bán thời gian' },
      org: { en: 'Nhen Store · Ho Chi Minh City', vi: 'Nhen Store · TP. Hồ Chí Minh' },
      when: { en: '6 months', vi: '6 tháng' },
      points: [
        {
          en: 'Tracked customer orders, sales records and monthly payment data in Excel, keeping records accurate and organized for routine operational follow-up.',
          vi: 'Theo dõi đơn hàng, doanh số và dữ liệu thanh toán hằng tháng trên Excel, giữ hồ sơ chính xác và gọn gàng cho việc theo dõi vận hành định kỳ.',
        },
      ],
    },
  ],
  education: [
    {
      school: {
        en: 'International University – Vietnam National University HCMC',
        vi: 'Trường Đại học Quốc tế – ĐHQG TP.HCM',
      },
      degree: { en: 'Bachelor of Information Technology', vi: 'Cử nhân Công nghệ thông tin' },
      when: { en: 'Expected 2026', vi: 'Dự kiến 2026' },
    },
  ],
}
