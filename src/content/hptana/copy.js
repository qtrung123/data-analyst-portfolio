/**
 * HPTANA case-study copy, one object per language.
 *
 * Structural facts (page count, visual count, measure names, column names,
 * table names, slicer fields) were extracted directly from the .pbix file's
 * report layout and model diagram (Report/Layout and DiagramLayout, decoded
 * as UTF-16 JSON) — nothing here is estimated. Tool usage not visible in
 * that layout (Power Query, general dashboard-design practice) reflects the
 * author's own account of how the file was built. No business finding is
 * claimed: the dataset was a practice dataset and was never analysed for
 * insights — this case study describes what was built and practised.
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
      skills: 'Skills developed',
      improve: 'What I would improve today',
      progression: 'From HPTANA to TerraFirm',
      repo: 'Repository',
    },

    objective: {
      title: 'Practicing the full BI workflow, end to end',
      body: [
        'HPTANA was where I first built a Power BI report from a relational data model rather than a single flat table. The goal was to practice the complete workflow in one project: model a multi-table schema, write DAX measures grounded in that model, and design pages that read as one connected report rather than a set of separate charts.',
        'The subject is a simulated manufacturing business — sales, production and inventory — chosen to give the model enough real structure (multiple fact-like tables, shared dimensions, a date table) to make the modelling exercise genuine rather than trivial.',
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
            'Six KPI cards summarise revenue, inventory value, low-stock materials, total orders, production completion rate and late orders in one view.',
            'A monthly revenue trend line gives the company one time-based reference point.',
            'A cross-domain exceptions table (domain, signal, signal description) surfaces issues from sales, production and inventory side by side.',
          ],
          skills: ['DAX measures', 'Card visuals', 'Line chart', 'Cross-domain table design'],
        },
        sales: {
          title: 'Sales',
          question: 'Revenue, region and product performance',
          shows: [
            'Four KPI cards cover revenue, total orders, average order value and critical unshipped orders.',
            'Revenue is broken out by region and by product using a bar chart and a clustered bar chart.',
            'A pivot table cross-tabulates order status against priority for a denser view of the same orders.',
          ],
          skills: ['Bar & clustered bar charts', 'Pivot tables', 'DAX measures'],
        },
        production: {
          title: 'Production',
          question: 'Planned vs completed output and schedule variance',
          shows: [
            'Four KPI cards track planned production quantity, completion rate, late orders and average schedule variance.',
            'A clustered column chart compares planned against completed production; two more charts break status and completion rate down by work centre.',
            'Two slicers — planned start date and priority — filter the page, and a detail table lists each order with its variance in days.',
          ],
          skills: ['Clustered column & bar charts', 'Slicers', 'Variance measures'],
        },
        inventory: {
          title: 'Inventory',
          question: 'Stock value, movement and supplier context',
          shows: [
            'Four KPI cards cover inventory value, low-stock materials, affected products and net inventory movement.',
            'Inventory value by material category and movement by transaction type are shown as clustered bar charts.',
            'Three slicers — transaction date, supplier and rating — filter a detail table listing stock gap and lead time by material.',
          ],
          skills: ['Clustered bar charts', 'Multi-slicer filtering', 'Detail tables'],
        },
      },
    },

    skills: {
      title: 'What this project built up',
      items: [
        'Relational data modelling across an 18-table schema spanning sales, production, inventory, procurement, quality and workforce planning',
        'DAX measure design — 16 measures reused consistently across four report pages rather than rewritten per page',
        'Power Query for shaping and loading the source data into the model',
        'Dashboard design: laying out KPI cards, charts and tables so a page reads as one screen, not a set of disconnected visuals',
        'Cross-visual filtering with slicers, scoped per page to the fields that page actually needed',
      ],
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
      skills: 'Kỹ năng đã phát triển',
      improve: 'Điều tôi sẽ cải thiện hôm nay',
      progression: 'Từ HPTANA đến TerraFirm',
      repo: 'Repository',
    },

    objective: {
      title: 'Luyện tập toàn bộ quy trình BI, từ đầu đến cuối',
      body: [
        'HPTANA là dự án đầu tiên tôi xây dựng báo cáo Power BI từ một mô hình dữ liệu quan hệ thay vì một bảng phẳng duy nhất. Mục tiêu là luyện tập trọn vẹn quy trình trong một dự án: mô hình hóa schema nhiều bảng, viết measure DAX dựa trên mô hình đó, và thiết kế các trang đọc như một báo cáo liền mạch thay vì một tập hợp biểu đồ rời rạc.',
        'Chủ đề là một doanh nghiệp sản xuất mô phỏng — bán hàng, sản xuất và tồn kho — được chọn để mô hình có đủ cấu trúc thực tế (nhiều bảng dạng fact, các dimension dùng chung, một bảng ngày) để bài luyện tập mô hình hóa có ý nghĩa thay vì đơn giản hóa.',
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
            'Sáu thẻ KPI tổng hợp doanh thu, giá trị tồn kho, vật tư sắp hết, tổng đơn hàng, tỷ lệ hoàn thành sản xuất và đơn trễ trong một màn hình.',
            'Biểu đồ xu hướng doanh thu theo tháng cho công ty một mốc tham chiếu theo thời gian.',
            'Bảng ngoại lệ liên mảng (domain, signal, signal description) đặt cạnh nhau các vấn đề từ bán hàng, sản xuất và tồn kho.',
          ],
          skills: ['Measure DAX', 'Card visual', 'Biểu đồ đường', 'Thiết kế bảng liên mảng'],
        },
        sales: {
          title: 'Sales',
          question: 'Doanh thu, hiệu quả theo khu vực và sản phẩm',
          shows: [
            'Bốn thẻ KPI gồm doanh thu, tổng đơn hàng, giá trị đơn trung bình và đơn chưa giao ở mức nghiêm trọng.',
            'Doanh thu được tách theo khu vực và theo sản phẩm bằng biểu đồ cột và biểu đồ cột nhóm.',
            'Bảng pivot đối chiếu trạng thái đơn với mức ưu tiên để có góc nhìn chi tiết hơn trên cùng tập đơn hàng.',
          ],
          skills: ['Biểu đồ cột & cột nhóm', 'Bảng pivot', 'Measure DAX'],
        },
        production: {
          title: 'Production',
          question: 'Sản lượng kế hoạch so với thực tế và độ lệch tiến độ',
          shows: [
            'Bốn thẻ KPI theo dõi sản lượng kế hoạch, tỷ lệ hoàn thành, đơn trễ và độ lệch tiến độ trung bình.',
            'Biểu đồ cột nhóm so sánh sản lượng kế hoạch với thực tế; hai biểu đồ khác tách trạng thái và tỷ lệ hoàn thành theo trung tâm sản xuất.',
            'Hai slicer — ngày bắt đầu kế hoạch và mức ưu tiên — lọc toàn trang, cùng bảng chi tiết liệt kê từng đơn với số ngày lệch.',
          ],
          skills: ['Biểu đồ cột nhóm & thanh nhóm', 'Slicer', 'Measure độ lệch'],
        },
        inventory: {
          title: 'Inventory',
          question: 'Giá trị tồn kho, biến động và bối cảnh nhà cung cấp',
          shows: [
            'Bốn thẻ KPI gồm giá trị tồn kho, vật tư sắp hết, sản phẩm bị ảnh hưởng và biến động tồn kho ròng.',
            'Giá trị tồn kho theo nhóm vật tư và biến động theo loại giao dịch được thể hiện bằng biểu đồ cột nhóm.',
            'Ba slicer — ngày giao dịch, nhà cung cấp và đánh giá — lọc bảng chi tiết liệt kê khoảng thiếu hụt tồn kho và thời gian giao hàng theo vật tư.',
          ],
          skills: ['Biểu đồ cột nhóm', 'Lọc đa slicer', 'Bảng chi tiết'],
        },
      },
    },

    skills: {
      title: 'Những gì dự án này xây dựng nên',
      items: [
        'Mô hình hóa dữ liệu quan hệ trên schema 18 bảng trải khắp bán hàng, sản xuất, tồn kho, mua hàng, chất lượng và kế hoạch nhân sự',
        'Thiết kế measure DAX — 16 measure được tái sử dụng nhất quán trên bốn trang báo cáo thay vì viết lại cho từng trang',
        'Power Query để tạo hình và nạp dữ liệu nguồn vào mô hình',
        'Thiết kế dashboard: sắp xếp thẻ KPI, biểu đồ và bảng để một trang đọc như một màn hình liền mạch, không phải tập hợp visual rời rạc',
        'Lọc chéo bằng slicer, giới hạn theo đúng các trường mà từng trang thực sự cần',
      ],
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

    repo: {
      title: 'File Power BI trên GitHub',
      note: 'File .pbix của dự án này.',
      label: 'Xem repository',
    },
  },
}

export default copy
