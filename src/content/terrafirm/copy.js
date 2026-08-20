/**
 * TerraFirm case-study copy, one object per language.
 *
 * All figures are the verified values from the delivered Power BI model.
 * Findings are stated as co-occurrence — nothing here claims causation.
 */

// Screenshot dimensions are intrinsic; update them if a file is re-exported.
export const shots = [
  { n: 1, file: 'page1.png', w: 1696, h: 961 },
  { n: 2, file: 'page2.png', w: 1693, h: 868 },
  { n: 3, file: 'page3.png', w: 1702, h: 931 },
  { n: 4, file: 'page4.png', w: 1693, h: 921 },
  { n: 5, file: 'page5.png', w: 1702, h: 925 },
  { n: 6, file: 'page6.png', w: 1705, h: 948 },
]

export const copy = {
  en: {
    sections: {
      problem: 'Problem',
      built: 'What I built',
      findings: 'Key findings',
      dashboard: 'Dashboard',
      technical: 'Technical highlights',
      report: 'Interactive report',
      learned: 'What I learned',
    },
    problem: {
      title: 'Outcomes were improving. Nobody could see whether the prevention was.',
      body: [
        'TerraFirm tracks safety across 10 sites, but incidents, inspections, observations, training and hours worked each sat in a separate system. Recordable injuries were down year over year, and that was the only number anyone quoted.',
        'What no report could answer was whether the preventive programme behind that improvement was actually running, and where the remaining risk was concentrated.',
      ],
    },
    built: {
      title: 'One semantic model across nine datasets',
      flow: [
        '9 datasets',
        'Power Query',
        'Star schema',
        'DAX',
        '6-page Power BI report',
      ],
      note: 'Incidents, inspections, observations and training each keep their own grain; work hours are carried as a separate exposure fact so every rate compares sites honestly.',
      facts: [
        { value: '1,133', label: 'Incidents (106 recordable)' },
        { value: '9,195', label: 'Inspections' },
        { value: '15,846', label: 'Safety observations' },
        { value: '7,750', label: 'Training assignments' },
        { value: '9.79M', label: 'Work hours' },
      ],
    },
    findings: {
      title: 'Four things the model surfaced',
      cards: [
        {
          title: 'Lagging outcomes improved',
          body: 'Year-to-date recordable incidents fell against the prior year — a measured improvement in the outcome the business tracks.',
          evidence: '29 → 16 YTD · ~44.8% lower',
        },
        {
          title: 'Preventive cadence stayed weak',
          body: 'Scheduled preventive work completed well below plan company-wide, alongside that improving outcome.',
          evidence: 'Cadence compliance 29.9%',
        },
        {
          title: 'Completion masked readiness',
          body: 'Training completion looked healthy until timeliness was separated from it — roughly ten points of difference.',
          evidence: '~86.2% completed · ~76.2% on time',
        },
        {
          title: 'Risk was concentrated',
          body: 'Recordables were not spread evenly. One site carried well over a third of the company total, on weaker preventive signals.',
          evidence: 'Ironwood 40 of 106 · ~37.7%',
        },
      ],
      compare: {
        title: 'Ironwood against the company benchmark',
        seriesA: 'Ironwood',
        seriesB: 'Company',
        items: [
          { label: 'R12 recordable rate', a: 3.04, b: 1.61, note: 'higher' },
          { label: 'Cadence compliance', a: 3.8, b: 29.9, unit: '%', note: 'lower' },
          { label: 'At-risk observation rate', a: 28.4, b: 18.9, unit: '%', note: 'higher' },
          { label: 'On-time training', a: 64.3, b: 76.2, unit: '%', note: 'lower' },
        ],
      },
      caveat: {
        title: 'Co-occurrence, not causation',
        body: 'These four signals move together at one site. That warrants investigation and gives the safety team diagnostic context — it does not establish that weak cadence or training caused the incidents.',
      },
    },
    dashboard: {
      title: 'Six pages, each answering one question',
      pages: [
        {
          question: 'Are we getting safer?',
          alt: 'Company safety outcome trend',
          caption: 'YTD recordables against the prior year, with the rolling twelve-month rate as an exposure-adjusted baseline.',
        },
        {
          question: 'Are sites doing the preventive work?',
          alt: 'Preventive inspection cadence by site',
          caption: 'Cadence compliance by site, where the spread between sites is visible rather than averaged away.',
        },
        {
          question: 'What are we seeing in the field?',
          alt: 'Field safety observations',
          caption: 'Observation volume and quality, split by at-risk versus safe conditions against the company benchmark.',
        },
        {
          question: 'What actually happened?',
          alt: 'Incident detail and classification',
          caption: 'Incident detail and classification — the page for a question about a specific event rather than a trend.',
        },
        {
          question: 'Are people ready for the work?',
          alt: 'Training completion and on-time readiness',
          caption: 'Completion shown against on-time readiness, separating work finished from work finished on time.',
        },
        {
          question: 'Why is this site different?',
          alt: 'Site 360 drillthrough diagnostic',
          caption: 'Site 360: outcome and preventive measures for one site against the company benchmark, reached by drillthrough from any page.',
        },
      ],
    },
    technical: {
      title: 'How it was built',
      items: [
        'Star-schema semantic model',
        'DAX with rolling and YTD measures',
        'Role-playing Date relationships',
        'Deneb custom visuals',
        'HTML KPI flip cards',
        'Drillthrough Site 360',
        'Data-quality and partial-year safeguards',
      ],
      daxLabel: 'Technical details — DAX',
      dax: [
        {
          language: 'dax',
          caption: 'Recordable rate, normalised to 200,000 hours worked so sites of different sizes compare honestly.',
          code: `Recordable Rate =
VAR Recordables =
    CALCULATE ( COUNTROWS ( Fact_Incident ), Fact_Incident[IsRecordable] = TRUE () )
VAR HoursWorked = SUM ( Fact_Exposure[HoursWorked] )
RETURN
    DIVIDE ( Recordables * 200000, HoursWorked )`,
        },
        {
          language: 'dax',
          caption: 'On-time training separates timeliness from completion — the split behind finding 03.',
          code: `On-Time Training % =
DIVIDE (
    CALCULATE (
        COUNTROWS ( Fact_Training ),
        Fact_Training[CompletedDate] <= Fact_Training[DueDate]
    ),
    CALCULATE (
        COUNTROWS ( Fact_Training ),
        NOT ISBLANK ( Fact_Training[CompletedDate] )
    )
)`,
        },
      ],
      daxNote:
        'These follow the conventional 200,000-hour normalisation and a due-date comparison; reconcile them against your own column names before reuse.',
    },
    report: {
      title: 'Interactive report',
      placeholderTitle: 'Live embed not yet published',
      placeholderNote:
        'The report has not been published to a public workspace, so no embed URL exists yet. The six pages above cover the same content.',
    },
    learned: {
      title: 'What I learned',
      items: [
        'An improving headline number is a starting point, not a conclusion — the value came from putting outcomes and preventive activity on the same page.',
        'The exposure denominator does more analytical work than any visual; without hours worked, every cross-site comparison rewards the smallest site.',
        'Splitting one metric into two — completion versus on-time — changed the story more than any additional dataset did.',
      ],
    },
  },

  vi: {
    sections: {
      problem: 'Vấn đề',
      built: 'Giải pháp đã xây dựng',
      findings: 'Phát hiện chính',
      dashboard: 'Dashboard',
      technical: 'Điểm kỹ thuật nổi bật',
      report: 'Báo cáo tương tác',
      learned: 'Bài học rút ra',
    },
    problem: {
      title: 'Kết quả đang cải thiện. Nhưng không ai thấy được phần phòng ngừa.',
      body: [
        'TerraFirm theo dõi an toàn tại 10 công trường, nhưng sự cố, kiểm tra, quan sát hiện trường, đào tạo và giờ công lại nằm ở các hệ thống riêng biệt. Số sự cố phải ghi nhận giảm so với năm trước, và đó là con số duy nhất được nhắc đến.',
        'Điều không báo cáo nào trả lời được là chương trình phòng ngừa phía sau kết quả đó có thực sự vận hành hay không, và rủi ro còn lại đang tập trung ở đâu.',
      ],
    },
    built: {
      title: 'Một semantic model cho chín nguồn dữ liệu',
      flow: [
        '9 nguồn dữ liệu',
        'Power Query',
        'Star schema',
        'DAX',
        'Báo cáo Power BI 6 trang',
      ],
      note: 'Sự cố, kiểm tra, quan sát và đào tạo giữ nguyên grain riêng; giờ công được tách thành bảng fact exposure riêng để mọi chỉ số tỷ lệ so sánh giữa các công trường một cách công bằng.',
      facts: [
        { value: '1,133', label: 'Sự cố (106 phải ghi nhận)' },
        { value: '9,195', label: 'Lượt kiểm tra' },
        { value: '15,846', label: 'Quan sát an toàn' },
        { value: '7,750', label: 'Lượt phân công đào tạo' },
        { value: '9.79M', label: 'Giờ công' },
      ],
    },
    findings: {
      title: 'Bốn phát hiện từ mô hình dữ liệu',
      cards: [
        {
          title: 'Chỉ số kết quả đã cải thiện',
          body: 'Số sự cố phải ghi nhận lũy kế từ đầu năm giảm so với cùng kỳ — một cải thiện đo lường được ở chỉ số mà doanh nghiệp theo dõi.',
          evidence: '29 → 16 YTD · giảm ~44,8%',
        },
        {
          title: 'Tần suất phòng ngừa vẫn yếu',
          body: 'Khối lượng công việc phòng ngừa theo kế hoạch hoàn thành thấp hơn nhiều so với mục tiêu trên toàn công ty, song song với kết quả đang cải thiện.',
          evidence: 'Cadence compliance 29,9%',
        },
        {
          title: 'Tỷ lệ hoàn thành che lấp mức sẵn sàng',
          body: 'Tỷ lệ hoàn thành đào tạo trông ổn cho đến khi tách riêng yếu tố đúng hạn — chênh lệch khoảng mười điểm phần trăm.',
          evidence: '~86,2% hoàn thành · ~76,2% đúng hạn',
        },
        {
          title: 'Rủi ro tập trung, không dàn đều',
          body: 'Sự cố phải ghi nhận không phân bố đều. Một công trường chiếm hơn một phần ba tổng số, kèm theo các tín hiệu phòng ngừa yếu hơn.',
          evidence: 'Ironwood 40/106 · ~37,7%',
        },
      ],
      compare: {
        title: 'Ironwood so với mặt bằng toàn công ty',
        seriesA: 'Ironwood',
        seriesB: 'Toàn công ty',
        items: [
          { label: 'Tỷ lệ sự cố R12', a: 3.04, b: 1.61, note: 'cao hơn' },
          { label: 'Cadence compliance', a: 3.8, b: 29.9, unit: '%', note: 'thấp hơn' },
          { label: 'Tỷ lệ quan sát rủi ro', a: 28.4, b: 18.9, unit: '%', note: 'cao hơn' },
          { label: 'Đào tạo đúng hạn', a: 64.3, b: 76.2, unit: '%', note: 'thấp hơn' },
        ],
      },
      caveat: {
        title: 'Cùng xuất hiện, không phải nhân quả',
        body: 'Bốn tín hiệu này cùng xuất hiện tại một công trường. Điều đó đáng để điều tra thêm và cung cấp bối cảnh chẩn đoán cho đội an toàn — nhưng không chứng minh rằng cadence hay đào tạo yếu đã gây ra các sự cố.',
      },
    },
    dashboard: {
      title: 'Sáu trang, mỗi trang trả lời một câu hỏi',
      pages: [
        {
          question: 'Chúng ta có an toàn hơn không?',
          alt: 'Xu hướng kết quả an toàn toàn công ty',
          caption: 'Sự cố phải ghi nhận lũy kế so với cùng kỳ, kèm tỷ lệ trượt 12 tháng làm mốc đã điều chỉnh theo giờ công.',
        },
        {
          question: 'Các công trường có làm công tác phòng ngừa không?',
          alt: 'Tần suất kiểm tra phòng ngừa theo công trường',
          caption: 'Cadence compliance theo từng công trường, cho thấy khoảng cách giữa các nơi thay vì bị bình quân hóa.',
        },
        {
          question: 'Hiện trường đang cho thấy điều gì?',
          alt: 'Quan sát an toàn tại hiện trường',
          caption: 'Số lượng và chất lượng quan sát, tách theo điều kiện rủi ro và an toàn, đối chiếu với mặt bằng công ty.',
        },
        {
          question: 'Chuyện gì đã thực sự xảy ra?',
          alt: 'Chi tiết và phân loại sự cố',
          caption: 'Chi tiết và phân loại sự cố — trang dành cho câu hỏi về một sự việc cụ thể thay vì xu hướng.',
        },
        {
          question: 'Con người đã sẵn sàng cho công việc chưa?',
          alt: 'Hoàn thành đào tạo và mức sẵn sàng đúng hạn',
          caption: 'Tỷ lệ hoàn thành đặt cạnh tỷ lệ đúng hạn, tách phần đã làm xong khỏi phần làm xong kịp thời hạn.',
        },
        {
          question: 'Vì sao công trường này khác biệt?',
          alt: 'Trang chẩn đoán drillthrough Site 360',
          caption: 'Site 360: chỉ số kết quả và phòng ngừa của một công trường so với mặt bằng công ty, mở bằng drillthrough từ bất kỳ trang nào.',
        },
      ],
    },
    technical: {
      title: 'Cách xây dựng',
      items: [
        'Semantic model dạng star schema',
        'DAX với các measure rolling và YTD',
        'Quan hệ Date dạng role-playing',
        'Custom visual bằng Deneb',
        'Thẻ KPI lật bằng HTML',
        'Drillthrough Site 360',
        'Kiểm soát chất lượng dữ liệu và xử lý năm chưa trọn vẹn',
      ],
      daxLabel: 'Chi tiết kỹ thuật — DAX',
      dax: [
        {
          language: 'dax',
          caption: 'Tỷ lệ sự cố, chuẩn hóa theo 200.000 giờ công để các công trường quy mô khác nhau so sánh được công bằng.',
          code: `Recordable Rate =
VAR Recordables =
    CALCULATE ( COUNTROWS ( Fact_Incident ), Fact_Incident[IsRecordable] = TRUE () )
VAR HoursWorked = SUM ( Fact_Exposure[HoursWorked] )
RETURN
    DIVIDE ( Recordables * 200000, HoursWorked )`,
        },
        {
          language: 'dax',
          caption: 'Đào tạo đúng hạn tách yếu tố thời hạn khỏi tỷ lệ hoàn thành — cơ sở của phát hiện 03.',
          code: `On-Time Training % =
DIVIDE (
    CALCULATE (
        COUNTROWS ( Fact_Training ),
        Fact_Training[CompletedDate] <= Fact_Training[DueDate]
    ),
    CALCULATE (
        COUNTROWS ( Fact_Training ),
        NOT ISBLANK ( Fact_Training[CompletedDate] )
    )
)`,
        },
      ],
      daxNote:
        'Các công thức này dùng chuẩn hóa 200.000 giờ thông dụng và phép so sánh với ngày đến hạn; hãy đối chiếu với tên cột trong mô hình của bạn trước khi tái sử dụng.',
    },
    report: {
      title: 'Báo cáo tương tác',
      placeholderTitle: 'Chưa publish bản nhúng trực tiếp',
      placeholderNote:
        'Báo cáo chưa được publish lên workspace công khai nên chưa có embed URL. Sáu trang phía trên đã bao quát cùng nội dung.',
    },
    learned: {
      title: 'Bài học rút ra',
      items: [
        'Một con số tiêu đề đang cải thiện chỉ là điểm khởi đầu, không phải kết luận — giá trị đến từ việc đặt kết quả và hoạt động phòng ngừa trên cùng một trang.',
        'Mẫu số giờ công đóng vai trò phân tích lớn hơn bất kỳ biểu đồ nào; thiếu nó, mọi so sánh giữa các công trường đều thiên vị nơi nhỏ nhất.',
        'Tách một chỉ số thành hai — hoàn thành và đúng hạn — thay đổi câu chuyện nhiều hơn bất kỳ nguồn dữ liệu bổ sung nào.',
      ],
    },
  },
}

export default copy
