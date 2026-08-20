/**
 * Online Ticket Booking case-study copy, one object per language.
 *
 * Every figure below is read directly from an executed notebook output in
 * github.com/qtrung123/Online-Ticket-Booking-Data-Analysis-Customer-Retention-Study
 * — nothing is estimated. Where a share is quoted, the underlying counts are
 * quoted with it. Findings are descriptive: the analysis compares groups, it
 * does not establish cause.
 */

// Charts exported from the notebooks. Intrinsic sizes keep them from being
// upscaled; update these if a notebook is re-run at a different figure size.
export const charts = {
  ageGroups: { file: 'age-groups.png', w: 686, h: 470 },
  dayHour: { file: 'day-hour-heatmap.png', w: 614, h: 436 },
  monthlyTrend: { file: 'monthly-trend.png', w: 1003, h: 409 },
  platform: { file: 'platform-tickets-revenue.png', w: 1189, h: 390 },
  promotionMix: { file: 'promotion-mix.png', w: 686, h: 581 },
  paymentSuccess: { file: 'payment-success-rate.png', w: 1489, h: 390 },
  cohort2019: { file: 'cohort-2019.png', w: 1276, h: 790 },
  cohort2022: { file: 'cohort-2022.png', w: 1289, h: 790 },
}

export const copy = {
  en: {
    sections: {
      problem: 'Problem',
      pipeline: 'Data pipeline',
      questions: 'Analysis questions',
      findings: 'Key findings',
      eda: 'Exploratory analysis',
      journey: 'Customer journey',
      retention: 'Retention & cohorts',
      technical: 'Technical highlights',
      learned: 'What I learned',
      repo: 'Repository',
    },

    problem: {
      title: 'Promotions are only worth their cost if customers come back',
      body: [
        'An online movie ticket platform runs vouchers, discounts and reward points to win transactions. Whether those customers came back was never measured — the data sat in five unjoined tables.',
        'I cleaned and joined it in Python, then compared repeat purchases between customers whose first order used a promotion and those whose did not.',
      ],
    },

    pipeline: {
      title: 'Five raw tables into one analytical dataset',
      flow: ['5 raw CSVs', 'Pandas cleaning', 'Join on keys', 'fact_ticket', '5 analysis notebooks'],
      note: 'Each table was cleaned separately, then left-joined onto the ticket table — one row per ticket, with customer, campaign, device and status context attached.',
      facts: [
        { value: '154,723', label: 'Rows × 19 columns in fact_ticket' },
        { value: '131,400', label: 'Customers (0 duplicate IDs)' },
        { value: '216', label: 'Campaigns' },
        { value: '2019–2022', label: 'Transaction window' },
      ],
      cleaningTitle: 'Cleaning decisions, and what each one removed',
      cleaningColumns: ['Decision', 'Effect on the data'],
      cleaning: [
        ['Duplicate tickets', '102 rows dropped, 154,827 → 154,725'],
        ['Future dates of birth', 'Removed; max fell from 2036-02-07 to 2019-02-02'],
        ['Missing campaign link', '63,098 rows labelled no_campaign, not dropped'],
        ['Missing device data', 'Unmatched model and platform values set to unknown (78 rows at join)'],
      ],
    },

    questions: {
      title: 'What the five notebooks set out to answer',
      items: [
        'Who uses the platform, and is the profile data good enough to segment on?',
        'When do people buy — by hour, day and month?',
        'How does behaviour differ by platform, device and payment method?',
        'How is promotion usage spread across transactions?',
        'Do promotion-first customers return more often than the rest?',
      ],
    },

    findings: {
      title: 'Four findings the numbers support',
      cards: [
        {
          title: 'Repeat rates were close between the two groups',
          body: 'Among 2022 first-time buyers, both groups returned at a similar rate.',
          evidence: '13.09% vs 12.20%',
        },
        {
          title: 'The platform is mobile, not web',
          body: 'Mobile carries almost all transactions, and revenue splits the same way.',
          evidence: '138,134 of 154,723 tickets (~89%)',
        },
        {
          title: 'Most payment failures originate outside the platform',
          body: 'Of 21,046 failed orders, external errors dominate.',
          evidence: 'external 74.52% · customer 24.29% · internal 1.19%',
        },
        {
          title: 'A placeholder birth date distorts age analysis',
          body: 'One default date of birth creates most of the apparent 56-year-old group.',
          evidence: '13,951 rows dated 1970-01-01',
        },
      ],
      caveat: {
        title: 'What this comparison does and does not show',
        body: 'This describes two self-selected populations, not the effect of a promotion. Customers were not randomly assigned, and 46,188 of 47,506 promotion customers used one on their first order — so the groups are not otherwise comparable.',
      },
    },

    retention: {
      title: 'Purchase sequence, then cohorts',
      body: [
        'Transactions were numbered per customer: order 1 is the first purchase, order 2 the first return. Customers were labelled by whether their first order carried a campaign.',
      ],
      compare: {
        title: 'Second-purchase rate, 2022 successful orders',
        seriesA: 'Promotion first order',
        seriesB: 'No promotion first order',
        items: [
          { label: 'Customers with a first order', a: 46188, b: 25067, note: 'count' },
          { label: 'Returned for a second order', a: 6045, b: 3057, note: 'count' },
          { label: 'Second-purchase rate', a: 13.09, b: 12.2, unit: '%', note: 'gap 0.89 pp' },
        ],
      },
      cohortNote:
        'Monthly cohorts show the same shape in 2019 and 2022: a large acquisition month, then a small fraction returning. The January 2019 cohort of 1,348 saw 50 return in month 1.',
      chart2019: 'Monthly cohorts, 2019 — cohort size left, retention by month right.',
      chart2022: 'The same view for 2022, on a much larger base.',
    },

    eda: {
      title: 'What the data looked like before the retention question',
      intro:
        'Five notebooks profiled the customer base, purchase timing, platform and campaign mix. These are the charts that framed the later analysis.',
      charts: [
        {
          key: 'ageGroups',
          question: 'Who actually buys tickets?',
          alt: 'Bar chart of customer distribution by age group',
          description:
            'Share of transactions by age band, with gender split alongside: Female 71,421, Male 67,558, Not verified 15,744.',
          takeaway:
            '25–34 accounts for 59.19% of transactions and 35–44 for 21.12% — but the 55+ band at 10.03% is inflated by 13,951 rows carrying a 1970-01-01 placeholder date of birth.',
        },
        {
          key: 'dayHour',
          question: 'When do people buy?',
          alt: 'Heatmap of purchases by day of week and hour of day',
          description:
            'Transaction counts cross-tabulated by day of week and hour, so time-of-day and weekday effects are visible together rather than separately.',
        },
        {
          key: 'monthlyTrend',
          question: 'How has demand moved over four years?',
          alt: 'Line chart of purchase volume by month, 2019 to 2022',
          description:
            'Monthly transaction volume across the full 2019–2022 window, covering both the mid-period decline and the 2022 recovery.',
        },
        {
          key: 'platform',
          question: 'Mobile or website?',
          alt: 'Bar charts of ticket count and revenue by platform',
          description:
            'Ticket counts beside revenue for each platform, so channel share is read on both volume and value.',
          takeaway:
            'Mobile carries 138,134 of 154,723 tickets against 16,511 on web, and 1,076,424.67 in revenue against 123,028.53 — the two measures agree.',
        },
        {
          key: 'promotionMix',
          question: 'How much of the platform runs on promotions?',
          alt: 'Pie chart of the distribution of promotion programs',
          description:
            'Transaction share by campaign type, which sets up the promotion-versus-organic comparison later.',
          takeaway:
            'Direct discount 79,828 and no campaign 63,097 dominate; voucher 7,619 and reward point 4,179 are marginal by comparison.',
        },
      ],
      paymentNote:
        'Payment method splits the same population again — Bank/Card 88,141 transactions against In-app 66,580.',
    },

    journey: {
      title: 'From broad patterns to a single customer',
      body: [
        'The exploratory work describes the platform in aggregate — none of it follows one customer across time. So the next step re-orders the same data per customer: first checking whether their orders completed, then numbering their purchases.',
      ],
      chart: {
        question: 'Do orders actually complete?',
        alt: 'Combined bar and line chart of payment success rate by month',
        description:
          'Monthly order volume against payment success rate, which is what decides whether a first purchase exists to be repeated at all.',
        takeaway:
          'Failures concentrate outside the platform: of 21,046 failed orders, external 74.52%, customer 24.29%, internal 1.19%.',
      },
    },
    technical: {
      title: 'How it was built',
      items: [
        'Python and Pandas across five sequential notebooks',
        'Multi-table cleaning with a stated missing-value policy per column',
        'Left joins onto the ticket fact table, null counts checked after each merge',
        'Feature engineering: hour, day, month, time-of-day bucket, age',
        'Purchase sequence numbering with groupby().cumcount()',
        'Period arithmetic for cohort month offsets',
        'Matplotlib and Seaborn for distributions, trends and heatmaps',
      ],
    },

    learned: {
      title: 'What I learned',
      items: [
        'A near-identical repeat rate between two self-selected groups is a starting question, not an answer.',
        'Cleaning decisions are analysis decisions: labelling 63,098 rows no_campaign rather than dropping them is what made the comparison possible.',
        'Profiling first paid off — the 1970-01-01 placeholder would have produced a fake age segment.',
      ],
    },

    repo: {
      title: 'Full notebooks and cleaned datasets on GitHub',
      note: 'Five notebooks plus the cleaned CSVs.',
      label: 'View the repository',
    },
  },

  vi: {
    sections: {
      problem: 'Vấn đề',
      pipeline: 'Pipeline dữ liệu',
      questions: 'Câu hỏi phân tích',
      findings: 'Phát hiện chính',
      eda: 'Phân tích khám phá',
      journey: 'Hành trình khách hàng',
      retention: 'Giữ chân & cohort',
      technical: 'Điểm kỹ thuật nổi bật',
      learned: 'Bài học rút ra',
      repo: 'Repository',
    },

    problem: {
      title: 'Khuyến mãi chỉ đáng chi phí nếu khách hàng quay lại',
      body: [
        'Một nền tảng đặt vé xem phim trực tuyến dùng voucher, giảm giá và điểm thưởng để thu hút giao dịch. Việc khách có quay lại hay không chưa từng được đo — dữ liệu nằm ở năm bảng chưa ghép.',
        'Tôi làm sạch và ghép dữ liệu bằng Python, rồi so sánh lượt mua lại giữa nhóm khách có đơn đầu dùng khuyến mãi và nhóm không dùng.',
      ],
    },

    pipeline: {
      title: 'Năm bảng thô thành một bộ dữ liệu phân tích',
      flow: ['5 file CSV thô', 'Làm sạch bằng Pandas', 'Ghép theo khóa', 'fact_ticket', '5 notebook phân tích'],
      note: 'Mỗi bảng được làm sạch riêng rồi left join vào bảng vé — mỗi dòng một vé, kèm bối cảnh khách hàng, chiến dịch, thiết bị và trạng thái.',
      facts: [
        { value: '154.723', label: 'Dòng × 19 cột trong fact_ticket' },
        { value: '131.400', label: 'Khách hàng (0 ID trùng)' },
        { value: '216', label: 'Chiến dịch' },
        { value: '2019–2022', label: 'Khoảng thời gian giao dịch' },
      ],
      cleaningTitle: 'Các quyết định làm sạch và kết quả tương ứng',
      cleaningColumns: ['Quyết định', 'Tác động lên dữ liệu'],
      cleaning: [
        ['Vé trùng lặp', 'Loại 102 dòng, 154.827 → 154.725'],
        ['Ngày sinh tương lai', 'Đã loại; giá trị lớn nhất giảm từ 07-02-2036 xuống 02-02-2019'],
        ['Thiếu liên kết chiến dịch', 'Gán nhãn no_campaign cho 63.098 dòng, không xóa'],
        ['Thiếu dữ liệu thiết bị', 'Gán unknown cho model và platform không khớp (78 dòng khi ghép)'],
      ],
    },

    questions: {
      title: 'Năm notebook đặt ra những câu hỏi gì',
      items: [
        'Ai đang dùng nền tảng, và dữ liệu hồ sơ có đủ tốt để phân khúc không?',
        'Khách mua vào lúc nào — theo giờ, ngày và tháng?',
        'Hành vi khác nhau ra sao theo nền tảng, thiết bị và phương thức thanh toán?',
        'Mức sử dụng khuyến mãi phân bố thế nào trên các giao dịch?',
        'Khách có đơn đầu dùng khuyến mãi có quay lại nhiều hơn nhóm còn lại không?',
      ],
    },

    findings: {
      title: 'Bốn phát hiện được số liệu chứng minh',
      cards: [
        {
          title: 'Tỷ lệ mua lại của hai nhóm khá gần nhau',
          body: 'Trong nhóm khách mua lần đầu năm 2022, cả hai nhóm quay lại với tỷ lệ tương đương.',
          evidence: '13,09% so với 12,20%',
        },
        {
          title: 'Nền tảng thuộc về mobile, không phải web',
          body: 'Mobile chiếm gần như toàn bộ giao dịch, doanh thu cũng phân bố tương tự.',
          evidence: '138.134 trên 154.723 vé (~89%)',
        },
        {
          title: 'Phần lớn lỗi thanh toán đến từ bên ngoài nền tảng',
          body: 'Trong 21.046 đơn thất bại, lỗi external áp đảo.',
          evidence: 'external 74,52% · customer 24,29% · internal 1,19%',
        },
        {
          title: 'Một giá trị ngày sinh mặc định làm méo phân tích độ tuổi',
          body: 'Một ngày sinh mặc định tạo ra phần lớn nhóm 56 tuổi.',
          evidence: '13.951 dòng có ngày sinh 01-01-1970',
        },
      ],
      caveat: {
        title: 'So sánh này cho thấy điều gì và không cho thấy điều gì',
        body: 'Đây là mô tả hai tập khách hàng tự chọn, không phải phép đo tác động của khuyến mãi. Khách không được phân nhóm ngẫu nhiên, và 46.188 trong 47.506 khách nhóm khuyến mãi đã dùng ngay ở đơn đầu tiên — nên hai nhóm không tương đương ở các yếu tố khác.',
      },
    },

    retention: {
      title: 'Đánh số thứ tự mua hàng, rồi dựng cohort',
      body: [
        'Giao dịch được đánh số theo từng khách hàng: đơn 1 là lần mua đầu, đơn 2 là lần quay lại đầu tiên. Khách được gán nhãn theo việc đơn đầu có gắn chiến dịch hay không.',
      ],
      compare: {
        title: 'Tỷ lệ mua lần hai, đơn thành công năm 2022',
        seriesA: 'Đơn đầu có khuyến mãi',
        seriesB: 'Đơn đầu không khuyến mãi',
        items: [
          { label: 'Khách có đơn đầu tiên', a: 46188, b: 25067, note: 'số lượng' },
          { label: 'Quay lại mua đơn thứ hai', a: 6045, b: 3057, note: 'số lượng' },
          { label: 'Tỷ lệ mua lần hai', a: 13.09, b: 12.2, unit: '%', note: 'chênh 0,89 pp' },
        ],
      },
      cohortNote:
        'Cohort theo tháng cho cùng một hình dạng ở 2019 và 2022: một tháng thu hút lớn, rồi chỉ một phần nhỏ quay lại. Cohort tháng 01/2019 gồm 1.348 khách chỉ có 50 khách quay lại ở tháng kế tiếp.',
      chart2019: 'Cohort theo tháng, 2019 — quy mô cohort bên trái, tỷ lệ giữ chân bên phải.',
      chart2022: 'Cùng cách xem cho năm 2022, trên tập khách lớn hơn nhiều.',
    },

    eda: {
      title: 'Dữ liệu trông ra sao trước khi đặt câu hỏi về giữ chân',
      intro:
        'Năm notebook đã khảo sát tệp khách hàng, thời điểm mua, nền tảng và cơ cấu chiến dịch. Đây là những biểu đồ định hình phần phân tích phía sau.',
      charts: [
        {
          key: 'ageGroups',
          question: 'Ai thực sự mua vé?',
          alt: 'Biểu đồ cột phân bố khách hàng theo nhóm tuổi',
          description:
            'Tỷ trọng giao dịch theo nhóm tuổi, kèm phân bố giới tính: Nữ 71.421, Nam 67.558, Chưa xác thực 15.744.',
          takeaway:
            'Nhóm 25–34 chiếm 59,19% giao dịch và nhóm 35–44 chiếm 21,12% — nhưng nhóm 55+ ở mức 10,03% bị thổi phồng bởi 13.951 dòng mang ngày sinh mặc định 01-01-1970.',
        },
        {
          key: 'dayHour',
          question: 'Khách mua vào lúc nào?',
          alt: 'Heatmap lượt mua theo thứ trong tuần và giờ trong ngày',
          description:
            'Số giao dịch được lập bảng chéo theo thứ trong tuần và giờ, nên hiệu ứng khung giờ và ngày trong tuần hiện lên cùng lúc thay vì tách rời.',
        },
        {
          key: 'monthlyTrend',
          question: 'Nhu cầu thay đổi ra sao trong bốn năm?',
          alt: 'Biểu đồ đường lượt mua theo tháng, 2019 đến 2022',
          description:
            'Sản lượng giao dịch theo tháng trong toàn giai đoạn 2019–2022, bao gồm cả giai đoạn sụt giảm giữa kỳ và phục hồi năm 2022.',
        },
        {
          key: 'platform',
          question: 'Mobile hay website?',
          alt: 'Biểu đồ cột số vé và doanh thu theo nền tảng',
          description:
            'Số vé đặt cạnh doanh thu của từng nền tảng, để đọc tỷ trọng kênh trên cả sản lượng lẫn giá trị.',
          takeaway:
            'Mobile chiếm 138.134 trên 154.723 vé so với 16.511 vé trên web, và 1.076.424,67 doanh thu so với 123.028,53 — hai thước đo cùng chỉ một hướng.',
        },
        {
          key: 'promotionMix',
          question: 'Bao nhiêu phần nền tảng vận hành nhờ khuyến mãi?',
          alt: 'Biểu đồ tròn phân bố các chương trình khuyến mãi',
          description:
            'Tỷ trọng giao dịch theo loại chiến dịch, làm nền cho phép so sánh khuyến mãi và tự nhiên ở phần sau.',
          takeaway:
            'Giảm giá trực tiếp 79.828 và không chiến dịch 63.097 chiếm ưu thế; voucher 7.619 và điểm thưởng 4.179 chỉ ở mức thứ yếu.',
        },
      ],
      paymentNote:
        'Phương thức thanh toán chia tệp này thêm một lần nữa — Bank/Card 88.141 giao dịch so với In-app 66.580.',
    },

    journey: {
      title: 'Từ bức tranh tổng thể đến từng khách hàng',
      body: [
        'Phần khám phá mô tả nền tảng ở mức tổng thể — chưa có gì theo dấu một khách hàng qua thời gian. Vì vậy bước tiếp theo sắp xếp lại chính dữ liệu đó theo từng khách: trước hết kiểm tra đơn có hoàn tất không, rồi đánh số các lần mua.',
      ],
      chart: {
        question: 'Đơn hàng có thực sự hoàn tất không?',
        alt: 'Biểu đồ kết hợp cột và đường về tỷ lệ thanh toán thành công theo tháng',
        description:
          'Số đơn theo tháng đặt cạnh tỷ lệ thanh toán thành công — yếu tố quyết định liệu có tồn tại một lần mua đầu tiên để nói đến chuyện mua lại hay không.',
        takeaway:
          'Lỗi tập trung bên ngoài nền tảng: trong 21.046 đơn thất bại, external 74,52%, customer 24,29%, internal 1,19%.',
      },
    },
    technical: {
      title: 'Cách xây dựng',
      items: [
        'Python và Pandas qua năm notebook tuần tự',
        'Làm sạch nhiều bảng với chính sách xử lý giá trị thiếu cho từng cột',
        'Left join vào bảng fact vé, kiểm tra null sau mỗi lần merge',
        'Tạo biến phái sinh: giờ, thứ, tháng, khung giờ trong ngày, độ tuổi',
        'Đánh số thứ tự lần mua bằng groupby().cumcount()',
        'Tính chênh lệch tháng theo Period để dựng cohort',
        'Matplotlib và Seaborn cho phân bố, xu hướng và heatmap',
      ],
    },

    learned: {
      title: 'Bài học rút ra',
      items: [
        'Tỷ lệ mua lại gần như bằng nhau giữa hai nhóm tự chọn là câu hỏi khởi đầu, không phải câu trả lời.',
        'Quyết định làm sạch cũng là quyết định phân tích: gán nhãn no_campaign cho 63.098 dòng thay vì xóa chính là điều khiến phép so sánh khả thi.',
        'Khảo sát dữ liệu trước đã có giá trị — giá trị mặc định 01-01-1970 lẽ ra đã tạo ra một nhóm tuổi giả.',
      ],
    },

    repo: {
      title: 'Toàn bộ notebook và dữ liệu đã làm sạch trên GitHub',
      note: 'Năm notebook kèm các file CSV đã làm sạch.',
      label: 'Xem repository',
    },
  },
}

export default copy
