/**
 * HPTANA case-study copy, one object per language.
 *
 * Structural facts (page count, visual count, DAX text, table/column names,
 * relationships) were extracted from the .pbix file's report layout and
 * model diagram (Report/Layout and DiagramLayout, decoded as UTF-16 JSON).
 *
 * Every number under "Key data insights" was computed by loading the
 * model's actual compressed tables (via pbixray) and reproducing each
 * verified DAX measure's logic directly against that data — e.g. Total
 * Revenue = SUM(OrderLines.LineTotal) computed over the real 306-row
 * OrderLines table, not read off a visual title. Nothing here is inferred
 * or estimated. Tool usage not visible in that layout (Power Query,
 * general dashboard-design practice) reflects the author's own account of
 * how the file was built.
 */

export const pages = [
  { key: 'overview', file: 'overview.png' },
  { key: 'sales', file: 'sales.png' },
  { key: 'production', file: 'production.png' },
  { key: 'inventory', file: 'inventory.png' },
]

export const copy = {
  en: {
    sections: {
      objective: 'Objective',
      built: 'What I built',
      dashboard: 'Dashboard walkthrough',
      improve: 'What I would improve today',
      progression: 'From HPTANA to TerraFirm',
      taught: 'What this project taught me',
      repo: 'Repository',
    },

    objective: {
      title: 'Practicing the full BI workflow, end to end',
      body: [
        'HPTANA was where I first built a Power BI report from a relational data model rather than a single flat table. The goal was to practice the complete workflow in one project: model a multi-table schema, write DAX measures grounded in that model, and design pages that read as one connected report rather than a set of separate charts.',
        'The subject is a simulated manufacturing business — sales, production and inventory — chosen to give the model enough real structure (multiple fact-like tables, shared dimensions, a bridge table) to make the modelling exercise genuine rather than trivial.',
      ],
    },

    built: {
      title: 'A 4-page report on an 18-table model',
      flow: ['18-table relational model', 'DAX measures', '4-page Power BI report'],
      note: 'Ten of the eighteen tables feed the finished report; the rest were modelled but not surfaced in a visual — a scope gap addressed directly in the reflection below.',
      facts: [
        { value: '4', label: 'Report pages' },
        { value: '18', label: 'Tables modelled' },
        { value: '16', label: 'DAX measures' },
        { value: '45', label: 'Visuals' },
      ],
    },

    dashboard: {
      title: 'Overview, Sales, Production, Inventory',
      pages: {
        overview: {
          title: 'Overview',
          question: 'Company-wide KPIs and cross-domain exceptions',
          shows: [
            'Six KPI cards read revenue, inventory value, low-stock materials, order volume, production completion and late orders as one set.',
            'A single exceptions table reuses one domain-aware measure pair to surface a Sales, Production, Inventory and cross-domain signal in four rows.',
          ],
          insights: [
            'Revenue reached 9,093,220 across 100 orders, while production completion sat at 69.09% and 6 of 50 materials were below reorder point — three domains showing strain in the same period.',
            'Monthly order volume fell every month captured: 43 in January, 33 in February, 23 in March.',
            '30 of 80 production orders were completed late and 17 Critical-priority sales orders remained unshipped — both figures the page surfaces directly in its exceptions table.',
          ],
          skills: [
            'One SWITCH(SELECTEDVALUE(...)) measure pair driving four exception rows instead of four separate visuals',
            'Card visuals and a trend line as a single company-wide reference point',
            'Designing a page around a question — is anything wrong right now — rather than around one table',
          ],
        },
        sales: {
          title: 'Sales',
          question: 'Revenue, region and product performance',
          shows: [
            'Four KPI cards track revenue, order volume, average order value and unshipped Critical orders.',
            'Bar, clustered bar and pivot visuals break the same 100 orders down by region, product and status.',
          ],
          insights: [
            'East led every region at 3,124,060 in revenue — nearly double the lowest region, North, at 1,629,845.',
            'The top 5 of 20 customers produced 4,285,640, about 47% of total revenue.',
            'Three of thirty products — Control Panel CP-200, Electric Motor EM-500 and Hydraulic Pump HP-100 — accounted for about 38% of revenue.',
          ],
          skills: [
            'DAX with a multi-value filter — CALCULATE with an IN condition across order status',
            'Bar, clustered bar and pivot-table visuals slicing one fact table three different ways',
            'Region, product and customer breakdowns from the same shared measure set',
          ],
        },
        production: {
          title: 'Production',
          question: 'Planned vs completed output and schedule variance',
          shows: [
            'Four KPI cards track planned and completed quantity, completion rate and average schedule variance.',
            'Charts compare planned against completed output and break status and completion down by work centre.',
          ],
          insights: [
            'Completion rate reached 69.09% — 18,541 of 20,094 planned units — with 30 of 80 orders (37.5%) completed late.',
            'CNC Machining Center carried the heaviest load, 19 of 80 orders, and also the highest late-order count of any work centre, at 8.',
            '45 of 80 production order rows (56%) carried a data-quality flag, most often an open status recorded alongside an end date.',
          ],
          skills: [
            'A completion-rate measure that caps each row at its planned quantity before summing (SUMX + MIN), so over-delivery on one order cannot inflate the rate',
            'Work-centre breakdowns joining orders to a dimension table',
            'Surfacing the model’s own data-quality flags on the page instead of hiding them',
          ],
        },
        inventory: {
          title: 'Inventory',
          question: 'Stock value, movement and supplier concentration',
          shows: [
            'Four KPI cards track inventory value, low-stock materials, affected products and net movement.',
            'Category and transaction-type breakdowns sit alongside a material-level detail table.',
          ],
          insights: [
            '6 of 50 materials sat below their reorder point, affecting 13 of 30 products through the bill of materials.',
            'One supplier, PrecisionCast Inc, held 727,325 of 2,267,825 in total inventory value — about 32% — across 7 of 50 materials.',
            'Nickel Alloy alone accounted for 446,600 of inventory value, roughly a fifth of the total and more than any other single material.',
          ],
          skills: [
            'A FILTER-based measure reused twice — once to count low-stock materials, once to reach the products they affect through a bridge table',
            'Multi-slicer filtering (date, supplier, rating) on one detail table',
            'Reading concentration, in suppliers and materials, rather than only totals',
          ],
        },
      },
    },

    improve: {
      title: 'What I would improve today',
      items: [
        'Scope the model to the report before building it — eight of the eighteen tables never made it into a finished visual, effort that a report-first plan would have caught early.',
        'Separate lagging and leading measures explicitly, page by page, rather than mixing outcome and activity KPIs in the same card row — the approach I used later in TerraFirm.',
        'Document the measures with names and descriptions as I write them, instead of relying on the report to make their meaning self-evident.',
      ],
    },

    progression: {
      title: 'The foundation TerraFirm built on',
      body: 'The two projects share the same core skillset — Power BI, DAX, relational modelling — but TerraFirm extends what HPTANA established: more pages, a documented star schema in place of a broad relational model, and drillthrough diagnostics in place of a single flat report.',
      table: {
        columns: ['Capability', 'HPTANA', 'TerraFirm'],
        rows: [
          ['Report scope', '4 pages', '6 pages'],
          ['Data foundation', '18-table relational model', '9 operational datasets, star-schema semantic model'],
          ['Measures', 'Reusable DAX across all pages', 'Rolling & YTD DAX, drillthrough (Site 360)'],
          ['Visual approach', 'Native Power BI visuals', 'Native visuals plus Deneb custom visuals'],
        ],
      },
    },

    taught: {
      title: 'What this project taught me',
      calloutTitle: 'Two kinds of insight',
      calloutBody: 'The findings on each page above are what the data showed. What follows is what building this project taught me as an analyst — a different kind of insight, about how I work rather than what I found.',
      items: [
        'Data modelling decides what questions are askable. Reaching "which products are affected by a stock shortage" needed a bridge table between Materials and Products — without that relationship in the model, the DAX to answer it would not have been possible at all.',
        'A small set of reusable measures goes further than one measure per visual. The same 16 measures cover all four pages, and on Overview, one SWITCH-based pair generates four different rows.',
        'Filter context is the actual mechanism, not a detail. CALCULATE, FILTER and SELECTEDVALUE only do what I intend once I can predict exactly what context each visual is evaluating in.',
        'Visual hierarchy repeats for a reason: KPI cards, then a trend or breakdown, then a detail table, on every page — a pattern worth deciding once and reusing, not redesigning per page.',
        'Pages should be designed around a business question, not a source table — Overview, Sales, Production and Inventory read as four questions, not four tables.',
        'These habits — reusable measures, an explicit KPI-then-detail layout, and pages scoped to a question — are what carried into TerraFirm, which is why that project could add a sixth page and a drillthrough without the structure breaking down.',
      ],
    },

    repo: {
      title: 'Power BI file on GitHub',
      note: 'The .pbix file for this project.',
      label: 'View the repository',
    },
  },

  vi: {
    sections: {
      objective: 'Mục tiêu',
      built: 'Đã xây dựng',
      dashboard: 'Tham quan dashboard',
      improve: 'Điều tôi sẽ cải thiện hôm nay',
      progression: 'Từ HPTANA đến TerraFirm',
      taught: 'Bài học từ dự án này',
      repo: 'Repository',
    },

    objective: {
      title: 'Luyện tập toàn bộ quy trình BI, từ đầu đến cuối',
      body: [
        'HPTANA là dự án đầu tiên tôi xây dựng báo cáo Power BI từ một mô hình dữ liệu quan hệ thay vì một bảng phẳng duy nhất. Mục tiêu là luyện tập trọn vẹn quy trình trong một dự án: mô hình hóa schema nhiều bảng, viết measure DAX dựa trên mô hình đó, và thiết kế các trang đọc như một báo cáo liền mạch thay vì một tập hợp biểu đồ rời rạc.',
        'Chủ đề là một doanh nghiệp sản xuất mô phỏng — bán hàng, sản xuất và tồn kho — được chọn để mô hình có đủ cấu trúc thực tế (nhiều bảng dạng fact, các dimension dùng chung, một bảng cầu nối) để bài luyện tập mô hình hóa có ý nghĩa thay vì đơn giản hóa.',
      ],
    },

    built: {
      title: 'Báo cáo 4 trang trên mô hình 18 bảng',
      flow: ['Mô hình quan hệ 18 bảng', 'Measure DAX', 'Báo cáo Power BI 4 trang'],
      note: 'Mười trong số mười tám bảng thực sự lên báo cáo hoàn chỉnh; số còn lại đã được mô hình hóa nhưng chưa lên visual — khoảng cách về phạm vi được nêu trực tiếp trong phần nhìn lại bên dưới.',
      facts: [
        { value: '4', label: 'Trang báo cáo' },
        { value: '18', label: 'Bảng đã mô hình hóa' },
        { value: '16', label: 'Measure DAX' },
        { value: '45', label: 'Visual' },
      ],
    },

    dashboard: {
      title: 'Overview, Sales, Production, Inventory',
      pages: {
        overview: {
          title: 'Overview',
          question: 'KPI toàn công ty và ngoại lệ liên mảng',
          shows: [
            'Sáu thẻ KPI đọc doanh thu, giá trị tồn kho, vật tư sắp hết, sản lượng đơn hàng, tỷ lệ hoàn thành sản xuất và đơn trễ như một tập hợp.',
            'Một bảng ngoại lệ duy nhất tái sử dụng một cặp measure nhận biết mảng (domain) để hiển thị tín hiệu Sales, Production, Inventory và liên mảng trong bốn dòng.',
          ],
          insights: [
            'Doanh thu đạt 9.093.220 trên 100 đơn hàng, trong khi tỷ lệ hoàn thành sản xuất chỉ ở mức 69,09% và 6/50 vật tư dưới điểm đặt hàng — ba mảng cùng cho thấy áp lực trong cùng giai đoạn.',
            'Sản lượng đơn hàng theo tháng giảm liên tục: 43 đơn tháng 1, 33 đơn tháng 2, 23 đơn tháng 3.',
            '30/80 lệnh sản xuất hoàn thành trễ và 17 đơn bán hàng mức Critical vẫn chưa giao — cả hai con số này được trang hiển thị trực tiếp trong bảng ngoại lệ.',
          ],
          skills: ['Một cặp measure SWITCH(SELECTEDVALUE(...)) tạo ra bốn dòng ngoại lệ thay vì bốn visual riêng', 'Card visual và biểu đồ xu hướng làm một điểm tham chiếu chung cho toàn công ty', 'Thiết kế trang xoay quanh một câu hỏi — hiện có vấn đề gì không — thay vì xoay quanh một bảng dữ liệu'],
        },
        sales: {
          title: 'Sales',
          question: 'Doanh thu, hiệu quả theo khu vực và sản phẩm',
          shows: [
            'Bốn thẻ KPI theo dõi doanh thu, sản lượng đơn hàng, giá trị đơn trung bình và đơn Critical chưa giao.',
            'Biểu đồ cột, cột nhóm và pivot tách cùng 100 đơn hàng theo khu vực, sản phẩm và trạng thái.',
          ],
          insights: [
            'East dẫn đầu mọi khu vực với doanh thu 3.124.060 — gần gấp đôi khu vực thấp nhất, North, ở mức 1.629.845.',
            'Top 5 trong 20 khách hàng tạo ra 4.285.640, khoảng 47% tổng doanh thu.',
            'Ba trong ba mươi sản phẩm — Control Panel CP-200, Electric Motor EM-500 và Hydraulic Pump HP-100 — chiếm khoảng 38% doanh thu.',
          ],
          skills: ['DAX với điều kiện lọc nhiều giá trị — CALCULATE kèm điều kiện IN trên trạng thái đơn hàng', 'Visual cột, cột nhóm và pivot table tách cùng một bảng fact theo ba chiều khác nhau', 'Phân tích theo khu vực, sản phẩm và khách hàng từ cùng một bộ measure'],
        },
        production: {
          title: 'Production',
          question: 'Sản lượng kế hoạch so với thực tế và độ lệch tiến độ',
          shows: [
            'Bốn thẻ KPI theo dõi sản lượng kế hoạch, sản lượng hoàn thành, tỷ lệ hoàn thành và độ lệch tiến độ trung bình.',
            'Các biểu đồ so sánh sản lượng kế hoạch với thực tế và tách trạng thái, tỷ lệ hoàn thành theo trung tâm sản xuất.',
          ],
          insights: [
            'Tỷ lệ hoàn thành đạt 69,09% — 18.541 trên 20.094 đơn vị kế hoạch — với 30/80 đơn (37,5%) hoàn thành trễ.',
            'CNC Machining Center gánh khối lượng lớn nhất, 19/80 đơn, đồng thời có số đơn trễ cao nhất trong các trung tâm sản xuất, ở mức 8.',
            '45/80 dòng lệnh sản xuất (56%) mang cờ cảnh báo chất lượng dữ liệu, phổ biến nhất là trạng thái còn mở nhưng đã có ngày kết thúc.',
          ],
          skills: ['Measure tỷ lệ hoàn thành giới hạn từng dòng ở mức sản lượng kế hoạch trước khi cộng tổng (SUMX + MIN), để việc vượt kế hoạch ở một đơn không làm tỷ lệ bị thổi phồng', 'Phân tích theo trung tâm sản xuất bằng cách join đơn hàng với bảng dimension', 'Hiển thị ngay trên trang các cờ cảnh báo chất lượng dữ liệu có sẵn trong mô hình thay vì che giấu'],
        },
        inventory: {
          title: 'Inventory',
          question: 'Giá trị tồn kho, biến động và mức độ tập trung nhà cung cấp',
          shows: [
            'Bốn thẻ KPI theo dõi giá trị tồn kho, vật tư sắp hết, sản phẩm bị ảnh hưởng và biến động ròng.',
            'Phân tích theo nhóm vật tư và loại giao dịch đặt cạnh bảng chi tiết theo từng vật tư.',
          ],
          insights: [
            '6/50 vật tư dưới điểm đặt hàng, ảnh hưởng đến 13/30 sản phẩm thông qua bill of materials.',
            'Một nhà cung cấp, PrecisionCast Inc, chiếm 727.325 trên tổng 2.267.825 giá trị tồn kho — khoảng 32% — chỉ từ 7/50 vật tư.',
            'Riêng Nickel Alloy đã chiếm 446.600 giá trị tồn kho, khoảng một phần năm tổng giá trị và cao hơn bất kỳ vật tư đơn lẻ nào khác.',
          ],
          skills: ['Một measure dựa trên FILTER được tái sử dụng hai lần — một lần đếm vật tư sắp hết, một lần tìm sản phẩm bị ảnh hưởng qua bảng cầu nối', 'Lọc đa slicer (ngày, nhà cung cấp, đánh giá) trên một bảng chi tiết', 'Đọc mức độ tập trung (nhà cung cấp, vật tư) thay vì chỉ nhìn tổng số'],
        },
      },
    },

    improve: {
      title: 'Điều tôi sẽ cải thiện hôm nay',
      items: [
        'Giới hạn phạm vi mô hình theo đúng báo cáo trước khi xây dựng — tám trong mười tám bảng chưa từng lên một visual hoàn chỉnh, công sức mà một kế hoạch "báo cáo trước" đã có thể phát hiện sớm.',
        'Tách rõ measure kết quả (lagging) và measure hoạt động (leading) theo từng trang, thay vì trộn chung trong cùng hàng thẻ KPI — cách tiếp cận tôi dùng sau này ở TerraFirm.',
        'Ghi chú tên và mô tả cho measure ngay khi viết, thay vì để báo cáo tự nói lên ý nghĩa của chúng.',
      ],
    },

    progression: {
      title: 'Nền tảng mà TerraFirm xây dựng tiếp',
      body: 'Hai dự án chia sẻ cùng bộ kỹ năng cốt lõi — Power BI, DAX, mô hình hóa quan hệ — nhưng TerraFirm mở rộng những gì HPTANA đã đặt nền: nhiều trang hơn, một star schema được tài liệu hóa thay vì mô hình quan hệ mở rộng, và chẩn đoán drillthrough thay vì một báo cáo phẳng duy nhất.',
      table: {
        columns: ['Năng lực', 'HPTANA', 'TerraFirm'],
        rows: [
          ['Phạm vi báo cáo', '4 trang', '6 trang'],
          ['Nền tảng dữ liệu', 'Mô hình quan hệ 18 bảng', '9 nguồn dữ liệu vận hành, semantic model star schema'],
          ['Measure', 'DAX tái sử dụng trên mọi trang', 'DAX rolling & YTD, drillthrough (Site 360)'],
          ['Cách tiếp cận visual', 'Visual gốc của Power BI', 'Visual gốc kèm custom visual bằng Deneb'],
        ],
      },
    },

    taught: {
      title: 'Bài học từ dự án này',
      calloutTitle: 'Hai loại insight',
      calloutBody: 'Các phát hiện trên từng trang phía trên là những gì dữ liệu cho thấy. Phần dưới đây là những gì việc xây dựng dự án này dạy tôi với tư cách một analyst — một loại insight khác, về cách tôi làm việc, không phải về những gì tôi tìm thấy.',
      items: [
        'Mô hình dữ liệu quyết định câu hỏi nào có thể đặt ra được. Để trả lời "sản phẩm nào bị ảnh hưởng bởi thiếu hụt vật tư" cần một bảng cầu nối giữa Materials và Products — nếu không có quan hệ đó trong mô hình, DAX để trả lời câu hỏi này sẽ không thể thực hiện được.',
        'Một bộ measure nhỏ, tái sử dụng được, hiệu quả hơn nhiều so với mỗi visual một measure riêng. Cùng 16 measure phủ cả bốn trang, và ở Overview, một cặp measure dựa trên SWITCH tạo ra bốn dòng khác nhau.',
        'Filter context là cơ chế thực sự, không phải chi tiết phụ. CALCULATE, FILTER và SELECTEDVALUE chỉ làm đúng ý tôi khi tôi dự đoán chính xác được ngữ cảnh mà từng visual đang được tính toán trong đó.',
        'Visual hierarchy lặp lại có lý do: thẻ KPI, rồi đến xu hướng hoặc phân tích, rồi đến bảng chi tiết, trên mọi trang — một mẫu hình đáng quyết định một lần và tái sử dụng, không thiết kế lại cho từng trang.',
        'Trang nên được thiết kế xoay quanh một câu hỏi kinh doanh, không phải một bảng nguồn — Overview, Sales, Production và Inventory đọc như bốn câu hỏi, không phải bốn bảng.',
        'Những thói quen này — measure tái sử dụng, bố cục KPI-rồi-đến-chi-tiết rõ ràng, và trang được giới hạn theo một câu hỏi — chính là những gì tôi mang sang TerraFirm, và là lý do dự án đó có thể thêm trang thứ sáu cùng drillthrough mà cấu trúc không bị vỡ.',
      ],
    },

    repo: {
      title: 'File Power BI trên GitHub',
      note: 'File .pbix của dự án này.',
      label: 'Xem repository',
    },
  },
}

export default copy
