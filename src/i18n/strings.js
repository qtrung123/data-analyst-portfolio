/**
 * UI strings. Content that belongs to a project lives with that project;
 * this file only holds chrome — navigation, buttons, section labels.
 */
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'vi', label: 'VI', name: 'Tiếng Việt' },
]

export const DEFAULT_LANGUAGE = 'en'

export const strings = {
  'nav.projects': { en: 'Projects', vi: 'Dự án' },
  'nav.about': { en: 'About', vi: 'Giới thiệu' },
  'nav.github': { en: 'GitHub', vi: 'GitHub' },
  'nav.menu': { en: 'Toggle menu', vi: 'Mở menu' },
  'nav.home': { en: 'Home', vi: 'Trang chủ' },

  'hero.name': { en: 'Quoc Trung Nguyen', vi: 'Nguyễn Quốc Trung' },
  'hero.role': {
    en: 'Data Analyst | Business Analyst | BI',
    vi: 'Data Analyst | Business Analyst | BI',
  },
  'home.aboutMe': { en: 'What I can do', vi: 'Tôi có thể làm gì' },
  'hero.aboutMe': {
    en: 'I turn raw operational data into answers a business can act on.',
    vi: 'Tôi biến dữ liệu vận hành thô thành câu trả lời mà doanh nghiệp có thể hành động ngay.',
  },
  'hero.can1': {
    en: 'Clean and combine messy, multi-source data with SQL, Python and Power Query',
    vi: 'Làm sạch và hợp nhất dữ liệu nhiều nguồn, lộn xộn bằng SQL, Python và Power Query',
  },
  'hero.can2': {
    en: 'Model it into trusted metrics: star schema, DAX measures, data-quality checks',
    vi: 'Mô hình hóa thành các chỉ số đáng tin cậy: star schema, measure DAX, kiểm tra chất lượng dữ liệu',
  },
  'hero.can3': {
    en: 'Build Power BI dashboards that answer a specific business question, and explain why a number moved',
    vi: 'Xây dựng dashboard Power BI trả lời một câu hỏi kinh doanh cụ thể và giải thích vì sao một chỉ số thay đổi',
  },
  'hero.note': {
    en: 'Self-directed projects built on public datasets, each documented end to end.',
    vi: 'Các dự án tự học trên dữ liệu công khai, mỗi dự án được ghi lại từ đầu đến cuối.',
  },

  'home.featured': { en: 'Selected Projects', vi: 'Dự án chọn lọc' },
  'home.allProjects': { en: 'All projects', vi: 'Tất cả dự án' },

  'home.ctaEyebrow': { en: 'Interested in my work?', vi: 'Quan tâm đến các dự án của tôi?' },
  'home.ctaBody': {
    en: "I'm currently looking for Data Analyst, Business Analyst and BI internship opportunities.",
    vi: 'Tôi hiện đang tìm kiếm cơ hội thực tập Data Analyst, Business Analyst và BI.',
  },
  'home.ctaEmail': { en: 'Email Me', vi: 'Liên hệ' },

  'projects.title': { en: 'Projects', vi: 'Dự án' },
  'projects.intro': {
    en: 'Analytics and BI work, each written up as a short case study: the problem, what I built, and what it surfaced.',
    vi: 'Các dự án phân tích dữ liệu và BI, mỗi dự án là một case study ngắn: vấn đề, giải pháp đã xây dựng và phát hiện chính.',
  },
  'projects.empty': {
    en: 'No projects in this category yet.',
    vi: 'Chưa có dự án nào trong nhóm này.',
  },
  'projects.all': { en: 'All', vi: 'Tất cả' },
  'card.outcome': { en: 'Key outcome', vi: 'Kết quả chính' },
  'home.moreWork': { en: 'More Work', vi: 'Dự án khác' },
  'home.moreWorkIntro': {
    en: 'Earlier practice work that shows how my Power BI skills progressed.',
    vi: 'Các dự án luyện tập trước đây cho thấy quá trình phát triển kỹ năng Power BI của tôi.',
  },
  'projects.viewCaseStudy': { en: 'View Case Study', vi: 'Xem case study' },

  'about.title': { en: 'About', vi: 'Giới thiệu' },
  'about.toolkit': { en: 'Toolkit', vi: 'Công cụ' },
  'about.contact': { en: 'Contact', vi: 'Liên hệ' },
  'about.contactNote': {
    en: 'The fastest way to reach me is email.',
    vi: 'Cách nhanh nhất để liên hệ với tôi là qua email.',
  },

  'case.back': { en: 'All projects', vi: 'Tất cả dự án' },
  'case.onThisPage': { en: 'On this page', vi: 'Nội dung' },
  'case.previous': { en: 'Previous', vi: 'Trước' },
  'case.next': { en: 'Next', vi: 'Tiếp theo' },
  'case.technicalDetails': { en: 'Technical details', vi: 'Chi tiết kỹ thuật' },
  'case.clickToEnlarge': { en: 'Click to enlarge', vi: 'Nhấn để phóng to' },
  'case.enlargeImage': { en: 'Enlarge image', vi: 'Phóng to ảnh' },
  'case.closeViewer': { en: 'Close image viewer', vi: 'Đóng ảnh' },
  'case.addScreenshot': { en: '(add screenshot)', vi: '(chưa có ảnh)' },
  'case.whatThisShows': { en: 'What this shows', vi: 'Trang này cho thấy gì' },
  'case.keyTakeaway': { en: 'Key takeaway', vi: 'Điểm mấu chốt' },
  'case.skillsPracticed': { en: 'Skills practiced', vi: 'Kỹ năng đã luyện tập' },
  'case.dataInsights': { en: 'Key data insights', vi: 'Phát hiện dữ liệu chính' },
  'case.page': { en: 'Page', vi: 'Trang' },
  'case.myRole': { en: 'My Role', vi: 'Vai trò của tôi' },

  'notFound.title': { en: 'Page not found', vi: 'Không tìm thấy trang' },
  'notFound.body': {
    en: "That case study doesn't exist — or hasn't been written up yet.",
    vi: 'Case study này không tồn tại — hoặc chưa được viết.',
  },
  'notFound.cta': { en: 'Browse projects', vi: 'Xem các dự án' },

  'footer.built': {
    en: 'Built with React, Vite and Tailwind CSS.',
    vi: 'Được xây dựng bằng React, Vite và Tailwind CSS.',
  },

  'a11y.language': { en: 'Language', vi: 'Ngôn ngữ' },
  'a11y.toLight': { en: 'Switch to light theme', vi: 'Chuyển sang giao diện sáng' },
  'a11y.toDark': { en: 'Switch to dark theme', vi: 'Chuyển sang giao diện tối' },
}

export default strings
