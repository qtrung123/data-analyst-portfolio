/**
 * AI Study Tutor case-study copy, one object per language.
 *
 * Every statement was checked against the repository
 * (github.com/qtrung123/AI_Tutor2-Kaggle): README, docs/ARCHITECTURE.md,
 * config.py, prompts/ and the backend modules named in each section.
 * Nothing here claims a measured accuracy: the repository has no labelled
 * evaluation set, and the "Limits" section says so.
 */
export const copy = {
  en: {
    sections: {
      problem: 'Problem',
      architecture: 'How it works',
      grounding: 'Grounded answers',
      figures: 'Reading figures',
      study: 'Study features',
      engineering: 'Engineering',
      limits: 'Limits and next step',
      repo: 'Repository',
    },

    problem: {
      title: "A tutor that answers from a student's own course files",
      body: [
        'TutorFlow is a study application for people learning from their own PDFs and notes. You upload course materials, ask questions in a chat, and practise with generated quizzes and flashcards.',
        "Two constraints shaped it. Answers must come from the uploaded documents, with a page citation, rather than from the model's memory. And chat and quiz generation run on local models served by Ollama, so in the default setup documents and learning history are not sent to a cloud AI service.",
      ],
    },

    architecture: {
      title: 'From an uploaded file to a cited answer',
      stages: [
        {
          title: 'Upload',
          subtitle: 'PDF or TXT',
          items: ['content hash skips unchanged files', 'OCR for scanned pages'],
        },
        {
          title: 'Index',
          subtitle: 'Chunks and vectors',
          items: ['800-character chunks, 150 overlap', 'bge-m3 embeddings', 'Chroma vector store'],
        },
        {
          title: 'Retrieve',
          subtitle: 'Scoped search',
          items: ['top 4 chunks', "only the chat's selected documents"],
        },
        {
          title: 'Generate',
          subtitle: 'Local model',
          items: ['Qwen 2.5 7B via Ollama', 'grounding prompt', 'history for follow-ups only'],
        },
        {
          title: 'Answer',
          subtitle: 'With evidence',
          items: ['(source: page) citations', 'supported / insufficient_context', 'saved in SQLite'],
        },
      ],
      caption:
        'Chat flow as implemented in backend/ingest.py and backend/rag_service.py; chunk size, top-k and model names are set in config.py.',
      note: 'Embeddings are created with bge-m3 through Ollama. Changing the embedding model means re-indexing every document, because the stored vectors were made with the previous one.',
    },

    grounding: {
      title: 'How answers stay tied to the documents',
      intro:
        'The behaviour is mostly set by the system prompt (prompts/chat/rag_answer.txt) and by how retrieval is scoped:',
      items: [
        "The prompt allows only the retrieved context as evidence and tells the model to say “I don't know based on the provided documents” when the context does not clearly contain the answer.",
        'If the context covers only part of the question, the model answers that part and says which part the documents do not cover.',
        'Recent conversation is used only to resolve follow-ups such as “it” or “that”. It is never treated as evidence.',
        'Each conversation has its own set of source documents. Retrieval is filtered to them, and uploading a new file does not change old chats.',
        'Answers cite (source: page). Every message is saved with its grounding status and its citations, so a reopened chat shows the same evidence.',
      ],
      callout: {
        title: 'The status is a flag, not a measurement',
        body: "The supported / insufficient_context status is set from the model's own wording (the app checks for the “don't know” sentence). It tells the reader what the model claimed, not whether the answer is correct.",
      },
    },

    figures: {
      title: 'Reading what a PDF shows but its text does not say',
      body: [
        'Lecture slides keep much of their meaning in diagrams. After a document is indexed, a background worker goes through its figures one at a time. A figure that is mostly text, such as a code screenshot or a scanned page, is read by OCR. Other figures are also described by a local vision model (qwen2.5vl:3b by default).',
        'The results are stored as extra chunks of the same document, with its source and page, so chat retrieves and cites them like any other text.',
      ],
      items: [
        'Cheap checks come first: logos, decorations and repeated slide-template shapes are dropped before any model is called.',
        'A cap on figures per document, and a processing status saved per document, let the work resume after a restart.',
        'The vision prompt asks only for what is visible, using the exact labels, in at most 150 words, and tells the model to answer NONE for a logo or a blank area.',
        'Figure chunks are kept out of the readers used for quizzes, summaries and flashcards.',
      ],
    },

    study: {
      title: 'Beyond chat: quizzes, flashcards and a study plan',
      items: [
        'Quizzes: 5 to 40 multiple-choice questions at easy, medium or difficult level, generated in batches of at most eight. The model’s JSON is extracted, normalised and validated, and a failed batch is retried up to three times.',
        'Each quiz is stored per document and difficulty. Progress is saved after every answer, and scoring is deterministic rather than model-based.',
        'Explanations are generated only when the learner asks. They explain why the correct answer is correct, and are cached.',
        'Flashcards and summaries are generated from the document chunks.',
        'A study planner places sessions with a deterministic scheduler that does not use a language model, and can avoid clashes with Google Calendar busy times.',
      ],
    },

    engineering: {
      title: 'Engineering',
      table: {
        columns: ['Area', 'What the repository uses'],
        rows: [
          ['Backend', 'FastAPI. Routers handle HTTP, services hold the logic, stores handle persistence.'],
          ['Models', 'Qwen 2.5 7B for chat, bge-m3 for embeddings, qwen2.5vl:3b for figures (optional).'],
          ['Storage', 'SQLite and Chroma by default. A durable mode uses PostgreSQL with pgvector and Supabase storage.'],
          ['Prompts', 'Text files grouped by feature: chat, quiz, summary, flashcards, vision.'],
          ['Frontend', 'Vanilla JavaScript, no framework or bundler.'],
          ['Accounts', 'Argon2 password hashing, per-user data isolation, encrypted Google Calendar refresh tokens.'],
          ['Tests', 'About 2,200 test functions across backend, database, API and browser-level checks.'],
          ['Deployment', 'Runs locally. A Kaggle notebook runs it behind a Cloudflare tunnel and nginx.'],
        ],
      },
    },

    limits: {
      title: 'What it does not do yet',
      items: [
        'Answer accuracy and retrieval quality are not measured. There is no labelled question set, so I cannot yet say how often an answer is correct or how often the right chunk is retrieved.',
        'The grounding status comes from the model’s wording, so it can miss a confident wrong answer.',
        'The models are small (7B for chat, 3B for vision). Figure descriptions can be wrong, and the OCR text passed to the vision model may contain errors.',
      ],
      next: {
        title: 'Planned next step',
        body: 'Build a small hand-labelled question set from real lecture PDFs, half of it answerable only from figures, and compare retrieval with text only, text plus OCR, and text plus OCR plus vision. This is a plan, not a result.',
      },
    },

    repo: {
      title: 'Source code on GitHub',
      note: 'Backend, frontend, prompts, tests, architecture notes and the Kaggle deployment scripts.',
      label: 'View repository',
    },
  },

  vi: {
    sections: {
      problem: 'Vấn đề',
      architecture: 'Cách hoạt động',
      grounding: 'Trả lời bám tài liệu',
      figures: 'Đọc hình trong PDF',
      study: 'Tính năng học tập',
      engineering: 'Kỹ thuật',
      limits: 'Hạn chế và bước tiếp theo',
      repo: 'Repository',
    },

    problem: {
      title: 'Một gia sư chỉ trả lời từ tài liệu học của chính sinh viên',
      body: [
        'TutorFlow là ứng dụng học tập cho người tự học từ PDF và ghi chú của mình. Bạn tải tài liệu lên, hỏi đáp trong khung chat, và luyện tập bằng quiz và flashcard được tạo tự động.',
        'Hai ràng buộc định hình ứng dụng. Câu trả lời phải đến từ tài liệu đã tải lên, kèm trích dẫn trang, thay vì từ trí nhớ của mô hình. Và chat cùng việc tạo quiz chạy trên mô hình cục bộ qua Ollama, nên trong cấu hình mặc định tài liệu và lịch sử học không bị gửi tới dịch vụ AI đám mây.',
      ],
    },

    architecture: {
      title: 'Từ file tải lên đến câu trả lời có trích dẫn',
      stages: [
        {
          title: 'Upload',
          subtitle: 'PDF hoặc TXT',
          items: ['hash nội dung để bỏ qua file không đổi', 'OCR cho trang scan'],
        },
        {
          title: 'Index',
          subtitle: 'Chunk và vector',
          items: ['chunk 800 ký tự, chồng 150', 'embedding bge-m3', 'vector store Chroma'],
        },
        {
          title: 'Retrieve',
          subtitle: 'Tìm kiếm có phạm vi',
          items: ['top 4 chunk', 'chỉ trong tài liệu đã chọn của chat'],
        },
        {
          title: 'Generate',
          subtitle: 'Mô hình cục bộ',
          items: ['Qwen 2.5 7B qua Ollama', 'prompt bám tài liệu', 'lịch sử chỉ để hiểu câu hỏi nối tiếp'],
        },
        {
          title: 'Answer',
          subtitle: 'Kèm bằng chứng',
          items: ['trích dẫn (source: page)', 'supported / insufficient_context', 'lưu trong SQLite'],
        },
      ],
      caption:
        'Luồng chat như được cài đặt trong backend/ingest.py và backend/rag_service.py; kích thước chunk, top-k và tên mô hình đặt trong config.py.',
      note: 'Embedding được tạo bằng bge-m3 qua Ollama. Đổi mô hình embedding nghĩa là phải index lại mọi tài liệu, vì vector đã lưu được tạo bằng mô hình trước đó.',
    },

    grounding: {
      title: 'Câu trả lời bám tài liệu như thế nào',
      intro:
        'Hành vi này chủ yếu do system prompt (prompts/chat/rag_answer.txt) và cách giới hạn phạm vi truy xuất quyết định:',
      items: [
        'Prompt chỉ cho phép dùng ngữ cảnh đã truy xuất làm bằng chứng, và yêu cầu mô hình nói “I don’t know based on the provided documents” khi ngữ cảnh không chứa rõ câu trả lời.',
        'Nếu ngữ cảnh chỉ trả lời một phần câu hỏi, mô hình trả lời phần đó và nói rõ phần nào tài liệu không đề cập.',
        'Hội thoại gần đây chỉ dùng để hiểu các câu nối tiếp như “nó” hay “cái đó”. Nó không bao giờ được coi là bằng chứng.',
        'Mỗi cuộc hội thoại có tập tài liệu nguồn riêng. Truy xuất bị giới hạn trong tập đó, và tải thêm file mới không làm thay đổi các chat cũ.',
        'Câu trả lời trích dẫn (source: page). Mỗi tin nhắn được lưu cùng trạng thái bám nguồn và trích dẫn, nên mở lại chat vẫn thấy cùng bằng chứng.',
      ],
      callout: {
        title: 'Trạng thái chỉ là cờ báo, không phải phép đo',
        body: 'Trạng thái supported / insufficient_context được đặt dựa trên chính câu chữ của mô hình (ứng dụng kiểm tra câu “don’t know”). Nó cho biết mô hình đã khẳng định gì, không cho biết câu trả lời có đúng hay không.',
      },
    },

    figures: {
      title: 'Đọc điều PDF hiển thị mà lớp văn bản không nói',
      body: [
        'Slide bài giảng đặt nhiều ý nghĩa trong sơ đồ. Sau khi tài liệu được index, một tiến trình nền xử lý lần lượt từng hình. Hình chủ yếu là chữ, như ảnh chụp code hay trang scan, được đọc bằng OCR. Các hình khác còn được mô tả thêm bởi một mô hình thị giác cục bộ (mặc định qwen2.5vl:3b).',
        'Kết quả được lưu thành các chunk bổ sung của cùng tài liệu, kèm nguồn và số trang, nên chat truy xuất và trích dẫn chúng như văn bản thông thường.',
      ],
      items: [
        'Các kiểm tra rẻ chạy trước: logo, họa tiết trang trí và hình lặp của mẫu slide bị loại trước khi gọi bất kỳ mô hình nào.',
        'Giới hạn số hình mỗi tài liệu, cùng trạng thái xử lý lưu theo từng tài liệu, cho phép tiếp tục công việc sau khi khởi động lại.',
        'Prompt thị giác chỉ yêu cầu mô tả điều nhìn thấy, dùng đúng nhãn trong hình, tối đa 150 từ, và bảo mô hình trả lời NONE với logo hoặc vùng trống.',
        'Chunk hình được tách khỏi bộ đọc dùng cho quiz, tóm tắt và flashcard.',
      ],
    },

    study: {
      title: 'Ngoài chat: quiz, flashcard và kế hoạch học',
      items: [
        'Quiz: 5 đến 40 câu trắc nghiệm ở mức dễ, trung bình hoặc khó, tạo theo lô tối đa tám câu. JSON do mô hình trả về được trích xuất, chuẩn hóa và kiểm tra, và lô lỗi được thử lại tối đa ba lần.',
        'Mỗi quiz được lưu theo tài liệu và mức độ khó. Tiến độ được lưu sau mỗi câu trả lời, và việc chấm điểm mang tính tất định, không dùng mô hình.',
        'Phần giải thích chỉ được tạo khi người học yêu cầu. Nó giải thích vì sao đáp án đúng là đúng, và được lưu cache.',
        'Flashcard và bản tóm tắt được tạo từ các chunk của tài liệu.',
        'Bộ lập kế hoạch học xếp phiên bằng một bộ lập lịch tất định không dùng mô hình ngôn ngữ, và có thể tránh trùng với thời gian bận trên Google Calendar.',
      ],
    },

    engineering: {
      title: 'Kỹ thuật',
      table: {
        columns: ['Mảng', 'Repository sử dụng'],
        rows: [
          ['Backend', 'FastAPI. Router xử lý HTTP, service chứa nghiệp vụ, store lo việc lưu trữ.'],
          ['Mô hình', 'Qwen 2.5 7B cho chat, bge-m3 cho embedding, qwen2.5vl:3b cho hình (tùy chọn).'],
          ['Lưu trữ', 'Mặc định SQLite và Chroma. Chế độ bền vững dùng PostgreSQL với pgvector và Supabase storage.'],
          ['Prompt', 'File văn bản nhóm theo tính năng: chat, quiz, summary, flashcards, vision.'],
          ['Frontend', 'JavaScript thuần, không framework hay bundler.'],
          ['Tài khoản', 'Băm mật khẩu Argon2, cô lập dữ liệu theo người dùng, refresh token Google Calendar được mã hóa.'],
          ['Kiểm thử', 'Khoảng 2.200 hàm test cho backend, cơ sở dữ liệu, API và kiểm tra mức trình duyệt.'],
          ['Triển khai', 'Chạy cục bộ. Một notebook Kaggle chạy ứng dụng phía sau Cloudflare tunnel và nginx.'],
        ],
      },
    },

    limits: {
      title: 'Những gì chưa làm được',
      items: [
        'Độ chính xác câu trả lời và chất lượng truy xuất chưa được đo. Chưa có bộ câu hỏi gán nhãn, nên tôi chưa thể nói câu trả lời đúng bao nhiêu phần trăm hay chunk đúng được truy xuất bao nhiêu lần.',
        'Trạng thái bám nguồn dựa trên câu chữ của mô hình, nên có thể bỏ sót một câu trả lời sai nhưng nghe tự tin.',
        'Các mô hình nhỏ (7B cho chat, 3B cho thị giác). Mô tả hình có thể sai, và văn bản OCR đưa vào mô hình thị giác có thể có lỗi.',
      ],
      next: {
        title: 'Bước tiếp theo dự kiến',
        body: 'Xây một bộ câu hỏi nhỏ do tôi tự gán nhãn từ PDF bài giảng thật, một nửa chỉ trả lời được nhờ hình, rồi so sánh truy xuất với văn bản đơn thuần, văn bản cộng OCR, và văn bản cộng OCR cộng thị giác. Đây là kế hoạch, chưa phải kết quả.',
      },
    },

    repo: {
      title: 'Mã nguồn trên GitHub',
      note: 'Backend, frontend, prompt, test, tài liệu kiến trúc và script triển khai Kaggle.',
      label: 'Xem repository',
    },
  },
}

export default copy
