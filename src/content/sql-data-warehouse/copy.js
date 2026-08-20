/**
 * SQL Data Warehouse case-study copy, one object per language.
 *
 * Every statement below was verified against the SQL files in
 * github.com/qtrung123/sql-data-warehouse-project. Row counts are line counts
 * of the committed CSVs. No analytics or reporting scripts exist in that
 * repository, so none are claimed here — the Analytics stage is shown as not
 * yet built.
 */

/** SQL snippets, copied verbatim from the repository. */
export const snippets = {
  dedupe: `SELECT ... FROM (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY cst_id
                           ORDER BY cst_create_date DESC) AS latest_record
    FROM bronze.crm_cust_info
    WHERE cst_id IS NOT NULL
) t WHERE latest_record = 1`,

  dates: `CASE WHEN sls_order_dt <= 0 OR LEN(sls_order_dt) != 8 THEN NULL
     ELSE CAST(CAST(sls_order_dt AS VARCHAR) AS DATE)
END AS sls_order_dt`,

  sales: `CASE WHEN sls_sales IS NULL OR sls_sales <= 0
            OR sls_sales != sls_quantity * ABS(sls_price)
     THEN sls_quantity * ABS(sls_price)
     ELSE sls_sales
END AS sls_sales,

CASE WHEN sls_price IS NULL OR sls_price <= 0
     THEN sls_sales / NULLIF(sls_quantity, 0)
     ELSE sls_price
END AS sls_price`,

  productKey: `REPLACE(SUBSTRING(prd_key, 1, 5), '-', '_') AS cat_id,
SUBSTRING(prd_key, 7, LEN(prd_key))          AS prd_key,

DATEADD(day, -1,
    LEAD(prd_start_dt) OVER (PARTITION BY prd_key
                             ORDER BY prd_start_dt)) AS prd_end_dt`,
}

/** Star schema, reconstructed from scripts/gold/ddl_gold.sql. */
export const model = {
  fact: {
    name: 'gold.fact_sales',
    columns: [
      { name: 'order_number' },
      { name: 'customer_key', key: 'FK' },
      { name: 'product_key', key: 'FK' },
      { name: 'order_date' },
      { name: 'shipping_date' },
      { name: 'due_date' },
      { name: 'sales_amount' },
      { name: 'quantity' },
      { name: 'price' },
    ],
  },
  dimensions: [
    {
      name: 'gold.dim_customers',
      joinOn: 'sls_cust_id = customer_id',
      columns: [
        { name: 'customer_key', key: 'PK' },
        { name: 'customer_id', key: 'BK' },
        { name: 'customer_number' },
        { name: 'first_name' },
        { name: 'marital_status' },
        { name: 'gender' },
        { name: 'birthdate' },
        { name: 'country' },
      ],
    },
    {
      name: 'gold.dim_products',
      joinOn: 'sls_prd_key = product_number',
      columns: [
        { name: 'product_key', key: 'PK' },
        { name: 'product_number', key: 'BK' },
        { name: 'product_name' },
        { name: 'category' },
        { name: 'subcategory' },
        { name: 'maintenance' },
        { name: 'cost' },
        { name: 'product_line' },
      ],
    },
  ],
}

export const copy = {
  en: {
    sections: {
      problem: 'Problem',
      architecture: 'Data architecture',
      transformations: 'Transformation logic',
      modelSection: 'Analytical model',
      quality: 'Data quality',
      technical: 'Technical highlights',
      repo: 'Repository',
    },

    problem: {
      title: 'Two source systems that never agreed on a customer',
      body: [
        'Customer, product and sales data arrive as six CSV exports from two systems: a CRM and an ERP. They disagree on almost everything — the ERP prefixes customer ids with NAS, the CRM hides a category code inside the product key, sales dates arrive as integers, and gender is recorded in both systems in different formats.',
        'Neither system can answer a sales question on its own. The warehouse exists to reconcile them into one star schema that a BI tool can query directly.',
      ],
    },

    architecture: {
      title: 'Medallion layers in SQL Server',
      stages: [
        {
          title: 'Sources',
          subtitle: '6 CSV files',
          items: ['CRM: cust_info, prd_info, sales_details', 'ERP: CUST_AZ12, LOC_A101, PX_CAT_G1V2'],
        },
        {
          title: 'Bronze',
          subtitle: 'Raw, as-is',
          items: ['6 tables', 'BULK INSERT', 'truncate + reload'],
        },
        {
          title: 'Silver',
          subtitle: 'Cleansed, standardised',
          items: ['6 tables', 'dwh_create_date audit column', 'silver.load_silver'],
        },
        {
          title: 'Gold',
          subtitle: 'Business-ready star schema',
          items: ['dim_customers', 'dim_products', 'fact_sales'],
        },
        {
          title: 'Analytics',
          subtitle: 'Consumption layer',
          planned: true,
          note: 'Not built in the repository — the Gold views are the delivered interface.',
        },
      ],
      caption:
        'Each layer is a separate schema in one SQL Server database, created by scripts/init_database.sql. Bronze and Silver are loaded by stored procedures; Gold is a set of views over Silver.',
      note: 'Both load procedures wrap their work in TRY/CATCH and print per-table and batch durations, so a failed run reports where it stopped.',
    },

    transformations: {
      title: 'What the Silver layer actually fixes',
      intro:
        'silver.load_silver is where the two systems are made to agree. The strongest examples:',
      table: {
        columns: ['Transformation', 'What it resolves'],
        rows: [
          ['Deduplication', 'One row per cst_id, keeping the latest cst_create_date'],
          ['String standardisation', 'TRIM on names; M/S and F/M mapped to labels with an n/a fallback'],
          ['Product key split', 'prd_key divided into a category id and the real product number'],
          ['Invalid dates', 'Integer dates rejected unless 8 digits and positive; future birthdates nulled'],
          ['Sales reconciliation', 'sales rebuilt from quantity × price where it is missing or inconsistent'],
          ['Country and id cleanup', 'NAS prefix stripped, hyphens removed, DE and US/USA expanded'],
        ],
      },
      snippets: {
        dedupe: 'Deduplication — a window function ranks each customer id and keeps the most recent record.',
        dates: 'Sales dates arrive as integers. Anything not eight digits, or zero or below, becomes NULL rather than a bad cast.',
        sales: 'Sales and price are reconciled against each other, with NULLIF guarding the division.',
        productKey: 'One product key carries two meanings; LEAD then closes each product version the day before the next one starts.',
      },
    },

    modelSection: {
      title: 'A star schema built as views',
      body: [
        'Gold is three views over Silver, not tables. Each dimension generates its own surrogate key with ROW_NUMBER(), while the original business key stays on the row so the fact table can join to it.',
      ],
      caption:
        'fact_sales joins to each dimension on the business key, not the surrogate. dim_products is filtered to prd_end_dt IS NULL, so the model carries current product versions only.',
      integration: [
        'dim_customers joins CRM to both ERP tables on cst_key = cid, and treats CRM gender as master with the ERP value as fallback.',
        'dim_products joins the CRM product to the ERP category table on the cat_id extracted in Silver.',
        'There is no date dimension — fact_sales carries order, shipping and due dates as columns.',
      ],
    },

    quality: {
      title: 'Checks that run against Silver and Gold',
      intro:
        'Two test scripts, one per layer. They are written as SELECTs that should return zero rows.',
      silver: {
        title: 'Silver',
        items: [
          'Null or duplicate primary keys on cst_id and prd_id',
          'Unwanted whitespace in keys, product names and ERP category fields',
          'Standardisation: DISTINCT on marital status, product line, gender, country, maintenance',
          'Negative or null product cost',
          'Invalid date order: prd_end_dt before prd_start_dt, order date after shipping or due date',
          'Sales consistency: sales != quantity × price, or any of the three null or non-positive',
          'Birthdates before 1924 or in the future',
        ],
      },
      gold: {
        title: 'Gold',
        items: [
          'Surrogate key uniqueness on customer_key and product_key',
          'Referential integrity: every fact row resolves to a customer and a product',
        ],
      },
    },

    technical: {
      title: 'Techniques used',
      items: [
        'Medallion architecture as three schemas in one SQL Server database',
        'Idempotent loads: truncate-and-reload stored procedures, re-runnable DDL',
        'BULK INSERT ingestion from CSV',
        'Window functions: ROW_NUMBER for deduplication, LEAD for version end-dating',
        'Surrogate key generation in the Gold views',
        'Defensive casting and NULLIF-guarded division',
        'TRY/CATCH error handling with per-table load timing',
        'Zero-row quality tests for both layers',
      ],
    },

    repo: {
      title: 'SQL scripts and datasets on GitHub',
      note: 'Bronze, Silver and Gold scripts, both quality-check files, and the six source CSVs.',
      label: 'View the repository',
    },
  },

  vi: {
    sections: {
      problem: 'Vấn đề',
      architecture: 'Kiến trúc dữ liệu',
      transformations: 'Logic biến đổi',
      modelSection: 'Mô hình phân tích',
      quality: 'Chất lượng dữ liệu',
      technical: 'Điểm kỹ thuật',
      repo: 'Repository',
    },

    problem: {
      title: 'Hai hệ nguồn không bao giờ thống nhất về một khách hàng',
      body: [
        'Dữ liệu khách hàng, sản phẩm và bán hàng đến từ sáu file CSV của hai hệ thống: CRM và ERP. Chúng lệch nhau ở gần như mọi thứ — ERP thêm tiền tố NAS vào mã khách, CRM giấu mã nhóm hàng bên trong mã sản phẩm, ngày bán hàng lưu dưới dạng số nguyên, và giới tính được ghi ở hai hệ theo hai định dạng khác nhau.',
        'Không hệ nào tự trả lời được một câu hỏi kinh doanh. Data warehouse tồn tại để hợp nhất chúng thành một star schema mà công cụ BI có thể truy vấn trực tiếp.',
      ],
    },

    architecture: {
      title: 'Các tầng Medallion trên SQL Server',
      stages: [
        {
          title: 'Nguồn',
          subtitle: '6 file CSV',
          items: ['CRM: cust_info, prd_info, sales_details', 'ERP: CUST_AZ12, LOC_A101, PX_CAT_G1V2'],
        },
        {
          title: 'Bronze',
          subtitle: 'Thô, giữ nguyên',
          items: ['6 bảng', 'BULK INSERT', 'truncate + nạp lại'],
        },
        {
          title: 'Silver',
          subtitle: 'Đã làm sạch, chuẩn hóa',
          items: ['6 bảng', 'Cột audit dwh_create_date', 'silver.load_silver'],
        },
        {
          title: 'Gold',
          subtitle: 'Star schema sẵn sàng dùng',
          items: ['dim_customers', 'dim_products', 'fact_sales'],
        },
        {
          title: 'Analytics',
          subtitle: 'Tầng khai thác',
          planned: true,
          note: 'Chưa được xây trong repository — các view Gold là giao diện bàn giao.',
        },
      ],
      caption:
        'Mỗi tầng là một schema riêng trong cùng một database SQL Server, tạo bởi scripts/init_database.sql. Bronze và Silver được nạp bằng stored procedure; Gold là tập các view trên Silver.',
      note: 'Cả hai procedure nạp dữ liệu đều bọc trong TRY/CATCH và in thời lượng theo từng bảng lẫn cả lô, nên khi lỗi vẫn biết dừng ở đâu.',
    },

    transformations: {
      title: 'Tầng Silver thực sự xử lý những gì',
      intro:
        'silver.load_silver là nơi hai hệ nguồn được làm cho khớp nhau. Những ví dụ tiêu biểu nhất:',
      table: {
        columns: ['Biến đổi', 'Xử lý vấn đề gì'],
        rows: [
          ['Khử trùng lặp', 'Mỗi cst_id một dòng, giữ bản ghi có cst_create_date mới nhất'],
          ['Chuẩn hóa chuỗi', 'TRIM tên; ánh xạ M/S và F/M sang nhãn, mặc định là n/a'],
          ['Tách mã sản phẩm', 'prd_key được tách thành mã nhóm hàng và mã sản phẩm thật'],
          ['Ngày không hợp lệ', 'Chỉ nhận ngày dạng số 8 chữ số và dương; ngày sinh tương lai thành NULL'],
          ['Đối chiếu doanh thu', 'Tính lại sales từ quantity × price khi thiếu hoặc không nhất quán'],
          ['Chuẩn hóa mã và quốc gia', 'Bỏ tiền tố NAS, bỏ dấu gạch, mở rộng DE và US/USA'],
        ],
      },
      snippets: {
        dedupe: 'Khử trùng lặp — window function xếp hạng từng mã khách và giữ lại bản ghi mới nhất.',
        dates: 'Ngày bán hàng lưu dưới dạng số nguyên. Giá trị không đủ tám chữ số, hoặc bằng và nhỏ hơn 0, sẽ thành NULL thay vì ép kiểu sai.',
        sales: 'Doanh thu và đơn giá được đối chiếu lẫn nhau, với NULLIF bảo vệ phép chia.',
        productKey: 'Một mã sản phẩm mang hai ý nghĩa; LEAD sau đó đóng mỗi phiên bản sản phẩm vào ngày trước khi phiên bản kế tiếp bắt đầu.',
      },
    },

    modelSection: {
      title: 'Star schema xây bằng view',
      body: [
        'Gold gồm ba view trên Silver, không phải bảng. Mỗi dimension tự sinh surrogate key bằng ROW_NUMBER(), trong khi business key gốc vẫn nằm trên dòng để bảng fact có thể join vào.',
      ],
      caption:
        'fact_sales join vào mỗi dimension theo business key, không theo surrogate key. dim_products được lọc theo prd_end_dt IS NULL, nên mô hình chỉ mang phiên bản sản phẩm hiện hành.',
      integration: [
        'dim_customers join CRM với cả hai bảng ERP theo cst_key = cid, lấy giới tính từ CRM làm chuẩn và ERP làm phương án dự phòng.',
        'dim_products join sản phẩm CRM với bảng nhóm hàng ERP theo cat_id đã tách ở tầng Silver.',
        'Không có dimension ngày — fact_sales mang ngày đặt, ngày giao và ngày đến hạn như các cột thường.',
      ],
    },

    quality: {
      title: 'Các kiểm tra chạy trên Silver và Gold',
      intro:
        'Hai script kiểm tra, mỗi tầng một file. Chúng được viết dưới dạng SELECT và phải trả về 0 dòng.',
      silver: {
        title: 'Silver',
        items: [
          'Khóa chính null hoặc trùng ở cst_id và prd_id',
          'Khoảng trắng thừa trong khóa, tên sản phẩm và các trường nhóm hàng ERP',
          'Chuẩn hóa: DISTINCT trên tình trạng hôn nhân, dòng sản phẩm, giới tính, quốc gia, maintenance',
          'Giá vốn sản phẩm âm hoặc null',
          'Thứ tự ngày sai: prd_end_dt trước prd_start_dt, ngày đặt sau ngày giao hoặc ngày đến hạn',
          'Nhất quán doanh thu: sales != quantity × price, hoặc một trong ba giá trị null hay không dương',
          'Ngày sinh trước năm 1924 hoặc ở tương lai',
        ],
      },
      gold: {
        title: 'Gold',
        items: [
          'Tính duy nhất của surrogate key trên customer_key và product_key',
          'Toàn vẹn tham chiếu: mọi dòng fact đều khớp được một khách hàng và một sản phẩm',
        ],
      },
    },

    technical: {
      title: 'Kỹ thuật đã sử dụng',
      items: [
        'Kiến trúc Medallion dưới dạng ba schema trong một database SQL Server',
        'Nạp dữ liệu idempotent: stored procedure truncate-and-reload, DDL chạy lại được',
        'Nạp dữ liệu từ CSV bằng BULK INSERT',
        'Window function: ROW_NUMBER để khử trùng lặp, LEAD để đóng phiên bản',
        'Sinh surrogate key ngay trong các view Gold',
        'Ép kiểu phòng thủ và phép chia được bảo vệ bằng NULLIF',
        'Xử lý lỗi bằng TRY/CATCH kèm đo thời gian nạp từng bảng',
        'Kiểm thử chất lượng dạng zero-row cho cả hai tầng',
      ],
    },

    repo: {
      title: 'Script SQL và bộ dữ liệu trên GitHub',
      note: 'Các script Bronze, Silver, Gold, hai file kiểm tra chất lượng và sáu file CSV nguồn.',
      label: 'Xem repository',
    },
  },
}

export default copy
