/**
 * HPTANA case-study copy, one object per language.
 *
 * Every count here was extracted directly from the .pbix file's report
 * layout and model diagram (Report/Layout and DiagramLayout, decoded as
 * UTF-16 JSON) — page names, visual types, and the exact measure/column/table
 * names referenced by each visual. Nothing about business results is claimed:
 * the underlying data is a practice dataset and was never analysed for
 * findings, so this case study describes what was built and practised, not
 * what it revealed.
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
      dashboard: 'Dashboard',
      practiced: 'What I practiced',
      takeaways: 'Takeaways',
      repo: 'Repository',
    },

    objective: {
      title: 'An earlier practice project, before TerraFirm',
      body: 'HPTANA was practice at building a multi-page Power BI report over a relational data model, rather than a single flat table — a simulated manufacturing business spanning sales, production and inventory.',
    },

    dashboard: {
      title: 'Four pages, one data model',
      note: 'Screenshots are being added — the layout below is exact, the images are placeholders until then.',
      pages: {
        overview: {
          title: 'Overview',
          caption: 'Company-wide KPI cards, a revenue trend line, and a cross-domain exceptions table.',
        },
        sales: {
          title: 'Sales',
          caption: 'Revenue and order KPIs, revenue by region and by product, and an order-status pivot table.',
        },
        production: {
          title: 'Production',
          caption: 'Planned vs completed production, order status by count, and completion rate by work centre.',
        },
        inventory: {
          title: 'Inventory',
          caption: 'Inventory value and movement KPIs, stock by material category, and a material-level detail table.',
        },
      },
    },

    practiced: {
      title: 'What I practiced',
      items: [
        'Modelling a relational schema spanning 18 tables across sales, production, inventory, procurement, quality and workforce planning',
        'Writing 16 DAX measures for revenue, order and production KPIs, reused consistently across four pages',
        'Combining nine visual types on a page — cards, line, bar, clustered bar/column, pivot table, slicers',
        'Using slicers (date, priority, supplier, rating) to drive filtering across a page',
        'Building an exceptions table on the Overview page that summarised signals from multiple domains in one place',
      ],
    },

    takeaways: {
      title: 'Takeaways',
      items: [
        'This is where I first practiced a page-per-domain report structure instead of one flat table — the approach I carried into TerraFirm.',
        'The data model covers 18 tables, but only 10 made it into finished visuals — a gap between modelling and delivery that later projects closed by scoping the model to the report from the start.',
        'Organising DAX measures by the page they served, rather than by source table, became a habit that shaped how I structured TerraFirm’s model.',
      ],
    },

    repo: {
      title: 'Power BI file on GitHub',
      note: 'The .pbix file for this practice project.',
      label: 'View the repository',
    },
  },

  vi: {
    sections: {
      objective: 'Mục tiêu',
      dashboard: 'Dashboard',
      practiced: 'Đã luyện tập',
      takeaways: 'Điều rút ra',
      repo: 'Repository',
    },

    objective: {
      title: 'Một dự án luyện tập trước TerraFirm',
      body: 'HPTANA là bài luyện tập xây dựng báo cáo Power BI nhiều trang trên một mô hình dữ liệu quan hệ, thay vì một bảng phẳng duy nhất — mô phỏng một doanh nghiệp sản xuất với các mảng bán hàng, sản xuất và tồn kho.',
    },

    dashboard: {
      title: 'Bốn trang, một mô hình dữ liệu',
      note: 'Ảnh chụp màn hình đang được bổ sung — bố cục dưới đây là chính xác, ảnh hiện là placeholder cho đến khi có ảnh thật.',
      pages: {
        overview: {
          title: 'Overview',
          caption: 'Các thẻ KPI toàn công ty, biểu đồ xu hướng doanh thu, và bảng ngoại lệ tổng hợp từ nhiều mảng.',
        },
        sales: {
          title: 'Sales',
          caption: 'KPI doanh thu và đơn hàng, doanh thu theo khu vực và theo sản phẩm, cùng bảng pivot theo trạng thái đơn.',
        },
        production: {
          title: 'Production',
          caption: 'Sản lượng kế hoạch so với thực tế, số đơn theo trạng thái, và tỷ lệ hoàn thành theo trung tâm sản xuất.',
        },
        inventory: {
          title: 'Inventory',
          caption: 'KPI giá trị và biến động tồn kho, tồn kho theo nhóm vật tư, và bảng chi tiết theo từng vật tư.',
        },
      },
    },

    practiced: {
      title: 'Đã luyện tập',
      items: [
        'Mô hình hóa schema quan hệ gồm 18 bảng trải khắp bán hàng, sản xuất, tồn kho, mua hàng, chất lượng và kế hoạch nhân sự',
        'Viết 16 measure DAX cho các KPI doanh thu, đơn hàng và sản xuất, tái sử dụng nhất quán trên bốn trang',
        'Kết hợp chín loại visual trên một trang — thẻ, biểu đồ đường, cột, cột/thanh nhóm, pivot table, slicer',
        'Dùng slicer (ngày, mức ưu tiên, nhà cung cấp, đánh giá) để lọc chéo trên một trang',
        'Xây dựng bảng ngoại lệ trên trang Overview, tổng hợp tín hiệu từ nhiều mảng vào một chỗ',
      ],
    },

    takeaways: {
      title: 'Điều rút ra',
      items: [
        'Đây là nơi tôi lần đầu luyện tập cấu trúc báo cáo theo từng mảng trên mỗi trang thay vì một bảng phẳng — cách tiếp cận tôi mang sang TerraFirm.',
        'Mô hình dữ liệu có 18 bảng, nhưng chỉ 10 bảng thực sự lên visual hoàn chỉnh — khoảng cách giữa mô hình hóa và bàn giao mà các dự án sau khắc phục bằng cách giới hạn mô hình theo đúng phạm vi báo cáo ngay từ đầu.',
        'Việc tổ chức measure DAX theo trang mà nó phục vụ, thay vì theo bảng nguồn, trở thành thói quen định hình cách tôi xây dựng mô hình của TerraFirm.',
      ],
    },

    repo: {
      title: 'File Power BI trên GitHub',
      note: 'File .pbix của dự án luyện tập này.',
      label: 'Xem repository',
    },
  },
}

export default copy
