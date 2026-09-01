# MASTER PROMPT - CODE DẤU ẤN STUDIO MVP

## 0. Vai trò và nguyên tắc thực thi

Bạn là một team gồm Product Architect, Senior UX Designer, Full-stack Engineer, AI Engineer, Security Engineer và QA Lead. Hãy xây dựng một web app tiếng Việt production-ready có tên hiển thị chính thức **Dấu Ấn Studio**, dành riêng cho CEO, Founder và chuyên gia 30+ có chuyên môn thật nhưng không giỏi marketing, branding và công nghệ. `ExpertPrint` chỉ là codename/legacy identifier trong code cũ; không hiển thị với end-user và không đổi hàng loạt identifier nếu việc đó có nguy cơ làm gãy hệ thống.

Không hỏi lại những quyết định đã được khóa trong tài liệu này. Nếu repo đã có stack, ưu tiên giữ stack hiện tại. Nếu tạo mới, dùng Next.js App Router + TypeScript + Tailwind CSS + component primitives dễ tiếp cận, PostgreSQL/Supabase cho Auth, DB và Storage. Tất cả tích hợp ngoài phải qua provider adapter, có mock mode khi thiếu API key; tuyệt đối không giả vờ đã kết nối thật.

Mục tiêu không phải tạo một content planner hay trợ lý nhắc việc. Đây là **Personal Branding Operating System** giúp người dùng:

1. Nhìn ra và xác nhận vốn chuyên môn của mình.
2. Chọn định vị và nhóm khách hàng ưu tiên.
3. Đóng gói chuyên môn thành offer/tài sản tri thức.
4. Biến trải nghiệm thật thành nội dung đa định dạng, đa kênh.
5. Duy trì Brand Memory, Proof Vault và tính nhất quán.
6. Theo dõi cuộc trò chuyện, lời mời, proposal, hợp tác và doanh thu liên quan.

## 1. Ranh giới sản phẩm bắt buộc

- Không có booking 1:1, Google Calendar, Zoom, Meet hoặc marketplace coach trong app.
- Booking của nhà sáng lập chỉ nằm trên landing page bên ngoài, không phải funnel chính của app.
- AI chỉ đề xuất. Người dùng phải xác nhận định vị, claim, kịch bản và nội dung trước khi xuất bản.
- Không tự tạo thành tích, testimonial, con số, khách hàng, bằng cấp hoặc case study.
- Chỉ dùng claim có trạng thái `approved`. Claim thiếu nguồn, hết hạn hoặc chưa duyệt phải bị gắn cờ.
- Phân loại dữ liệu discovery thành `fact`, `belief`, `ambition`, `hypothesis`; không trình bày giả thuyết như sự thật.
- Không sao chép nội dung viral. Chỉ phân tích chủ đề, cấu trúc, nhịp, tâm lý thu hút và chuyển hóa thành góc nhìn riêng dựa trên Brand Memory.
- Không tự đăng nội dung nếu người dùng chưa duyệt bản cuối và chưa cấp quyền kênh.

## 2. Định vị và lời hứa

Thông điệp cốt lõi:

> Bạn kể về công việc của mình. Dấu Ấn Studio giúp thị trường hiểu vì sao họ nên chọn bạn.

Tagline làm việc:

> Chuyên môn tạo nên dấu ấn.

North Star Metric:

> Số cơ hội có chất lượng được tạo ra và liên kết được với tài sản thương hiệu/nội dung của người dùng.

Không tối ưu sản phẩm chỉ theo số bài viết, lượt render hoặc streak.

## 3. Kiến trúc thông tin người dùng

Desktop dùng sidebar; mobile dùng bottom navigation. Chỉ hiển thị 5 khu vực bằng ngôn ngữ đời thường:

1. **Hôm nay**
2. **Thương hiệu của tôi**
3. **Đóng gói giá trị**
4. **Tạo nội dung**
5. **Cơ hội**

Không hiển thị top navigation 7 công cụ. Faceless, Avatar, Viral Remix, Postcard, Carousel, Voice Clone, SFX là năng lực bên trong workflow, không phải module cấp cao.

## 4. Visual system đã khóa

- Hướng: youthful premium, fashion-editorial, Modern Editorial Confidence.
- Nền tảng nhận diện chính thức: **Imprint Cocoon — Bản sắc được khai mở**. Logo kết hợp dấu vân tay và hình thái chiếc kén đang mở: tâm vân biểu trưng cho chuyên môn/bản sắc bên trong; các ridge mở về phía trên phải biểu trưng cho khai mở, chuyển hoá và ảnh hưởng.
- **LOGO LOCK — bắt buộc:** dùng nguyên 100% artwork trong Brand Kit 1.1 (`approved-master-board.png`, `logo-mark-primary.svg`, `logo-mark-approved-1024.png`). Không redraw bằng SVG path mới, không sinh dấu vân tay tương tự bằng AI/code, không làm tròn, không đổi góc nghiêng, không nối/xoá/giảm số lượng đường vân. `Primary Art Mark` và `Compact Digital Mark` dùng cùng artwork đã duyệt ở hai scale khác nhau. App icon dùng artwork màu Optical White trên nền Electric Cobalt.
- Motion identity: `Closed -> Discover -> Emerge`; chỉ animate scale, opacity, crop hoặc vị trí của toàn bộ artwork. Không morph từng ridge, không loop liên tục và phải hỗ trợ reduced motion.
- Dùng `Playfair Display` weight 400/500 cho wordmark, tiêu đề lớn và câu hỏi quan trọng. Font hỗ trợ đầy đủ tiếng Việt, giữ tinh thần high-contrast editorial gợi Zara nhưng không sao chép logo Zara.
- Toàn bộ UI/body dùng `Be Vietnam Pro` weight 400/500. Font stack bắt buộc: `'Playfair Display', Georgia, serif` và `'Be Vietnam Pro', Arial, sans-serif`.
- Import chuẩn: `https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500&family=Playfair+Display:wght@400;500&display=swap&subset=vietnamese`.
- Không dùng `Italiana`, `Bodoni Moda` hoặc font chưa kiểm tra đủ glyph tiếng Việt. Heading tiếng Việt có line-height tối thiểu 1.08; câu hỏi dài 1.15; body 1.5–1.65 để không cắt dấu. Dùng `font-display: swap` và kiểm thử đầy đủ dấu tiếng Việt trên Chrome, Safari/iOS và Android.
- Màu: optical white `#F7F7F5`, ink black `#111111`, cool silver `#D9DADC`, electric cobalt `#315CFF`, tomato coral `#FF5A47` dùng tiết chế.
- Không dùng burgundy-white phổ biến, purple-orange gradient, neon, glassmorphism hoặc dark shell mặc định.
- Logo/motif: hình dáng duy nhất hợp lệ là artwork đã khóa: dấu vân tay hữu cơ nghiêng lên phải, tâm xoáy lệch xuống trái, nhiều nét ngắt tự nhiên tạo liên tưởng chiếc kén chuyển hoá. Mô tả này không phải chỉ dẫn để vẽ lại. Không lồng chữ phức tạp và không giống ứng dụng bảo mật, target, maze, butterfly, leaf hoặc seed brand.
- Art direction cho onboarding/discovery/Brand DNA/milestone: chân dung chồng lớp — chân dung đơn sắc lớn phía sau biểu trưng cho bản sắc tiềm ẩn; chân dung màu tự nhiên phía trước biểu trưng cho bản thể đã được nhìn thấy. Không dùng ở màn thao tác dày dữ liệu.
- Trang giàu art: onboarding, discovery, brand profile, milestone/success.
- Trang thao tác: sạch, tập trung, một quyết định quan trọng mỗi màn.
- Card radius 14-18px, viền mảnh, rất ít shadow; button cao tối thiểu 48px; tương phản WCAG AA.

## 5. Dashboard Hôm nay

First viewport phải trả lời ba câu:

1. Tôi đang ở đâu?
2. Việc đáng làm nhất tiếp theo là gì?
3. Việc đó giúp thương hiệu/cơ hội của tôi tiến lên thế nào?

Hiển thị:

- Chào người dùng + một editorial image có chủ đích.
- `Việc tiếp theo` duy nhất, thời gian ước tính và CTA.
- Mức hoàn thiện Brand Profile.
- Nội dung đang chờ duyệt.
- Cơ hội cần theo dõi.
- Tóm tắt tiến bộ: Brand clarity, tài sản đã tạo, cơ hội mới.

Không biến Home thành analytics dashboard dày đặc.

## 6. Onboarding và Brand Source of Truth

Cho phép người dùng:

- Dán LinkedIn, website, bài viết, video.
- Upload CV, profile, proposal, PDF, tài liệu.
- Trả lời bằng giọng nói hoặc văn bản.
- Chọn `Tôi chưa rõ` để AI hỏi câu coaching ngắn hơn.

AI tạo bản nháp, giải thích vì sao hỏi, sau đó người dùng xác nhận từng phần:

- Tôi giúp ai?
- Tôi giúp họ thay đổi điều gì?
- Vì sao họ nên tin tôi?
- Tôi muốn được nhớ đến vì điều gì?
- Điều tôi không làm để tăng trưởng.

Mỗi record Brand Source of Truth phải có: `id`, `type`, `content`, `status`, `evidenceIds`, `ownerId`, `version`, `effectiveFrom`, `expiresAt`, `approvedBy`, `approvedAt`, `createdAt`, `updatedAt`.

### 6A. Session 1 — Khám phá thế mạnh tạo nên dấu ấn

Session 1 phải matching toàn bộ visual system, không dựng thành chatbot hoặc sub-brand riêng. Giữ app shell và sidebar/bottom navigation hiện tại; không tạo header `Studio 5 Bước`, heart icon hoặc dãy pill điều hướng thứ hai.

Luồng người dùng nhìn thấy:

`Bối cảnh của bạn -> Dấu ấn đã tạo ra -> Năng lực đứng sau -> Điều chưa được nhìn thấy -> Bản đồ dấu ấn`

Yêu cầu UX:

- Màn mở đầu là art page có motif vân tay liền nét, headline Didone `Điều gì khiến cách làm của bạn khác biệt?`, thời gian 8–12 phút và một CTA `Bắt đầu khám phá`.
- Cho bắt đầu bằng text, voice, dán LinkedIn/bài viết hoặc upload CV/tài liệu. Input nguồn ngoài chỉ tạo hypothesis, không tự biến thành fact.
- Conversation canvas chỉ hiển thị một active question; AI phản chiếu tối đa 2–3 câu, trích đúng một cụm từ của người dùng và hỏi một câu đào sâu.
- Có quick actions `Đúng với tôi`, `Chưa đúng ý`, `Đào sâu thêm` và link `Tôi chưa nghĩ ra`.
- Composer sticky hỗ trợ text/record/attach. Voice ở đây chỉ là input; không hiển thị OTP, liveness hoặc deepfake verification. Những bước đó chỉ xuất hiện khi clone voice/likeness.
- Không dùng `Buổi coach 1:1 tiêu chuẩn ICF`, `Coach AI`, `Bảo mật tuyệt đối`, pha kỹ thuật hoặc thuật ngữ limiting beliefs trong UI. Dùng `Phiên khám phá có hướng dẫn`, `Phản chiếu từ Dấu Ấn`, `Riêng tư & do bạn kiểm soát`.
- Không hiển thị transcript dài mặc định. Lượt trước thu gọn thành timeline/accordion.
- Cho autosave, thoát và tiếp tục đúng session/version.

Màn kết quả phải tạo `Bản đồ dấu ấn` gồm:

- 3 thế mạnh được gọi tên theo giá trị thị trường, không phải tính từ chung chung.
- Mỗi thế mạnh có giải thích, quote/dữ kiện gốc, evidence link và confidence `Đã có bằng chứng / Cần thêm ví dụ / Đang là giả thuyết`.
- 1 Growth Edge trình bày không phán xét.
- 1 Content Compass gồm 3–5 lãnh địa nội dung, góc nhìn riêng, bằng chứng có thể kể và đối tượng được phục vụ.
- Actions cho từng kết luận: `Đúng với tôi`, `Sửa cách gọi`, `Chưa đủ bằng chứng`.
- CTA chính `Duyệt & lưu vào thương hiệu của tôi`; chỉ sau CTA này mới ghi đúng version vào Brand Memory.

Desktop: conversation canvas khoảng 720px + session rail khoảng 280px. Rail chỉ có tiến độ định tính, tối đa ba signal `Đang kiểm chứng` và link quản lý dữ liệu. Mobile: rail thành drawer, history thành accordion, composer nằm trên safe area và bottom navigation ẩn khi keyboard mở.

Tuân theo specification chi tiết trong file `ExpertPrint_Session1_UIUX_Spec.md` nếu file này có trong repo.

## 7. Brand Memory và Proof Vault

Lưu các tài sản tích lũy dài hạn:

- Brand definition, audience, positioning, promise, value propositions.
- Approved claims và forbidden claims.
- Personality, message, tone/voice, visual tokens, channel rules.
- Kinh nghiệm, bài học, quan điểm, câu chuyện, trích dẫn của chính người dùng.
- Case study, thành tích, bằng cấp, số liệu, testimonial và nguồn chứng minh.
- Version history và audit log.

Khi AI dùng một claim, UI phải cho phép mở nguồn chứng minh. Nếu claim chưa approved, không được đưa vào nội dung xuất bản.

## 8. Copy Intelligence Layer

Tài liệu Copywriting do chủ sản phẩm cung cấp là nguồn tri thức được ủy quyền. Không hiển thị hoặc tái phân phối nguyên văn tài liệu cho end-user. Hãy chắt lọc thành nguyên tắc tư duy, câu hỏi chẩn đoán, rubric, prompt snippets và retrieval chunks có provenance.

Triết lý bắt buộc: tài liệu này giúp chuyên gia hình thành **tư duy viết và năng lực phán đoán**, không biến họ thành người áp dụng máy móc các công thức. AIDA, PAS, storytelling, advertorial, editorial, curation hoặc bất kỳ thủ pháp nào chỉ là công cụ tùy chọn. Engine phải chọn thủ pháp theo mục tiêu, đối tượng, điểm chạm, nền tảng và mức độ sẵn sàng của người đọc; không dùng một công thức mặc định cho mọi bài.

Trước khi viết, engine phải xác định:

- Viết cho ai?
- Viết để làm gì?
- Nội dung nằm ở điểm chạm nào trong hành trình?
- Single message là gì?
- Cảm xúc cần tạo ra?
- Bằng chứng/RTB nào được phép dùng?
- Hành động tiếp theo mong muốn?
- Định dạng và nền tảng nào?

Trước mỗi draft, yêu cầu chọn hoặc suy luận có xác nhận một `contentObjective`:

- Được biết đến/ghi nhớ.
- Giáo dục và làm rõ vấn đề.
- Xây dựng niềm tin.
- Thể hiện góc nhìn khác biệt.
- Nuôi dưỡng mối quan hệ.
- Chuyển đổi thành cuộc trò chuyện/cơ hội.
- Tái kích hoạt người đã quan tâm.

Từ mục tiêu này, engine mới chọn content mode, cấu trúc và thủ pháp phù hợp. Trong mục `Vì sao bản nháp này được viết như vậy`, giải thích ngắn: mục tiêu, lựa chọn cấu trúc, bằng chứng được dùng và điều người đọc nên cảm nhận/hành động. Không bắt người dùng học thuật ngữ marketing để sử dụng app.

Hỗ trợ bốn content modes:

1. Direct copywriting/sales copy.
2. Advertorial: ưu tiên nội dung thú vị/hữu ích, thương hiệu được đưa vào tự nhiên.
3. Editorial chuyên môn.
4. Curation: trích dẫn nguồn hợp lệ + bình luận/góc nhìn riêng, không sao chép.

### 8.1 Thinking DNA và Writing DNA của chuyên gia

Xây dựng hai lớp tài sản riêng, có version và luôn cho người dùng xem/sửa/xóa:

- `Thinking DNA`: thế giới quan, niềm tin nghề nghiệp, nguyên tắc ra quyết định, luận điểm lặp lại, cách định nghĩa vấn đề, cách phản biện, tiêu chuẩn bằng chứng, bài học và trải nghiệm tạo nên góc nhìn riêng.
- `Writing DNA`: nhịp câu, độ dài, vốn từ quen dùng, mức độ trực diện, cách kể chuyện, sắc thái cảm xúc, kiểu mở bài, cách kết bài/CTA, từ cấm và biểu đạt không phù hợp.

DNA được cập nhật dần từ nội dung gốc, voice note, câu chuyện, bản sửa của chính chuyên gia và tín hiệu `Duyệt / Sửa / Không giống tôi`. Không suy diễn từ một mẫu đơn lẻ. Mỗi cập nhật quan trọng phải hiển thị gợi ý để người dùng xác nhận trước khi trở thành rule mặc định.

Lưu `preference signals` ở cấp workspace: bản AI đề xuất, phần người dùng sửa, lý do sửa nếu có, trạng thái chấp nhận/từ chối, mục tiêu và nền tảng. Không dùng dữ liệu riêng của chuyên gia để huấn luyện mô hình dùng chung nếu chưa có opt-in rõ ràng.

Mục tiêu dài hạn là nội dung ngày càng mang dấu vân tay tư duy của chuyên gia, không phải bắt chước một tác giả, một video viral hay nguyên văn tài liệu nguồn. Mọi nguồn ngoài chỉ cung cấp chủ đề, dữ kiện hoặc cấu trúc tham khảo; draft cuối phải có luận điểm, trải nghiệm hoặc bình luận nguyên bản của chuyên gia. Thêm kiểm tra độ tương đồng, provenance và cảnh báo khi bản nháp quá gần nguồn.

Rubric chấm bản nháp 0-100. Đây là công cụ phản hồi, không phải thang ép mọi bài giống nhau:

- Audience fit 10.
- Objective/point-in-journey fit 10.
- Single message clarity 10.
- Hook/headline 10.
- Value and emotional relevance 10.
- Flow/story/twist 10.
- Approved proof/RTB 15.
- Thinking DNA consistency và góc nhìn nguyên bản 10.
- Writing DNA/brand voice consistency 5.
- CTA phù hợp, không lôi kéo 5.
- Platform/format fit 5.

Nếu dưới 75, AI phải tự sửa một lần và giải thích ngắn phần đã cải thiện. Nếu thiếu evidence, hỏi người dùng thay vì bịa. Nội dung phải ưu tiên câu đơn, đoạn ngắn, từ cụ thể, giọng người thật; tránh sáo ngữ AI, cường điệu và biệt ngữ marketing.

## 9. Content Studio - luồng chính

### 9.1 Chọn nguồn ý tưởng

Ba cách bắt đầu:

- `Viết ý tưởng` bằng text/voice.
- `Dán link video` từ nền tảng được hỗ trợ.
- `Khám phá video đang nổi`: rà soát tối đa 10 video phù hợp trong 7 ngày gần nhất.

Sau khi chọn nguồn, hiển thị một câu hỏi đơn giản: `Nội dung này cần đạt điều gì?` với các mục tiêu ở phần 8. Cho phép app đề xuất một mục tiêu nhưng người dùng phải có thể đổi trước khi tạo kịch bản.

Trend engine không chỉ xếp hạng theo tổng view. Score theo:

- Recency.
- View velocity/tốc độ tăng.
- Engagement rate khi dữ liệu cho phép.
- Relevance với audience, positioning và content objective.
- Khả năng chuyển hóa thành góc nhìn riêng.
- Source confidence.

Mỗi kết quả phải hiển thị nguồn, nền tảng, ngày đăng, metrics có thật, lý do đề xuất và nút mở nguồn. Không scrape trái điều khoản; dùng API hoặc data provider được phép. Khi không có dữ liệu live, hiển thị trạng thái `Chưa kết nối nguồn xu hướng`, không tạo số giả.

### 9.2 Chọn và duyệt kịch bản

Stepper bắt buộc:

`1 Chọn ý tưởng -> 2 Duyệt kịch bản -> 3 Nhân bản -> 4 Tạo video`

AI chuyển ý tưởng thành kịch bản dựa trên Brand Memory và Copy Intelligence. Hiển thị ba phần dễ hiểu:

- Mở đầu.
- Góc nhìn chính.
- Kêu gọi hành động.

Cho sửa từng phần, `Viết lại`, version draft và so sánh phiên bản. Người dùng phải bấm `Tôi duyệt kịch bản này`; lưu approver, timestamp và version. Không được nhân bản khi chưa duyệt.

### 9.3 Nhân bản hình ảnh và giọng nói

Chỉ dùng ảnh/video mẫu và voice đã có consent rõ ràng. Hiển thị trạng thái:

- Hình ảnh đã lưu/đã xác minh.
- Voice đã thu trước/đã xác minh.
- Consent version và ngày hiệu lực.

Nút `Nhân bản hình ảnh & giọng nói` bị khóa trước khi duyệt kịch bản. Có revoke consent, xóa asset, audit log và cảnh báo không được clone người khác.

### 9.4 Tạo, xem thử và xuất bản

Luồng chính chỉ yêu cầu chọn phong cách bằng ngôn ngữ người dùng:

- Chia sẻ thật.
- Góc nhìn chuyên gia.
- Case study.

Hệ thống tự chọn cấu hình từ Brand Profile. Chỉ có một CTA chính mỗi bước.

## 10. Tinh chỉnh nâng cao

Accordion đóng mặc định. Giữ đầy đủ tính năng:

- Cách xuất hiện: Người thật, Faceless, AI Avatar, Hybrid PiP.
- B-roll, crop, thay cảnh, vị trí khuôn mặt.
- Voice đã thu, AI voice, tốc độ, ngôn ngữ.
- Việt, Anh, Nhật, Hàn, Trung.
- Subtitle, font, vị trí chữ, keyword emphasis.
- SFX, transition, visual style.
- Chỉnh từng scene, duration và lời thoại.
- Tỷ lệ/resolution theo nền tảng.

Không dùng tên template kiểu Hormozi/Neon ở luồng mặc định; cho phép trong advanced preset nếu cần.

## 11. Multi-format Content Transformer

Từ một Brand Asset đã duyệt, cho phép tạo:

- Short video script.
- LinkedIn/Facebook authority post.
- TikTok/Reels caption.
- Threads post/thread.
- Carousel outline.
- Quote/postcard.
- Newsletter/article outline.

Mỗi biến thể phải giữ cùng `sourceAssetId`, core message, approved claims và proof links. Không chỉ cắt ngắn cơ học; phải thích nghi theo hành vi nền tảng, độ dài, hook và CTA.

Người dùng duyệt từng biến thể hoặc duyệt theo batch. Mọi thay đổi sau duyệt tạo version mới và làm mất trạng thái approved của phần đã thay đổi.

## 12. CapCut và video editor - chiến lược không phụ thuộc

Thiết kế interface:

```ts
interface VideoEditorProvider {
  exportEditablePackage(projectId: string): Promise<ExportPackage>;
  getIntegrationStatus(): Promise<IntegrationStatus>;
  createExternalEditSession?(projectId: string): Promise<ExternalEditSession>;
}
```

Yêu cầu:

- App phải có internal rendering pipeline tạo MP4, thumbnail, SRT/VTT và asset manifest.
- Pro có `Mở trong CapCut` hoặc `Xuất gói chỉnh sửa CapCut` khi integration khả dụng.
- Khi chưa có API/partner access chính thức, xuất ZIP gồm MP4 draft, source clips, audio, subtitle, cover, scene manifest và hướng dẫn import. Không tuyên bố đã đồng bộ timeline tự động.
- CapCut adapter phải nằm sau feature flag `CAPCUT_INTEGRATION_ENABLED`.
- UI hiển thị rõ `Đã kết nối`, `Chỉ xuất file`, `Tích hợp chưa khả dụng`.
- Không dùng automation không chính thức hoặc chỉnh sửa file dự án proprietary dễ vỡ.

## 12A. Voice, avatar và dịch vụ tạo nội dung chạy nền

ElevenLabs có thể là provider cho voice clone/text-to-speech; HeyGen có thể là provider cho avatar và video. Đây là adapter hạ tầng, không phải bộ não nội dung. `Brand Memory`, `Thinking DNA`, `Writing DNA`, script approval và provenance luôn thuộc Dấu Ấn Studio, độc lập với vendor.

```ts
interface VoiceProvider {
  createVoiceProfile(input: ConsentBoundVoiceInput): Promise<VoiceProfile>;
  synthesize(request: VoiceSynthesisRequest): Promise<GenerationJob>;
  getStatus(jobId: string): Promise<GenerationStatus>;
  deleteVoiceProfile(providerVoiceId: string): Promise<void>;
}

interface AvatarVideoProvider {
  createAvatar(input: ConsentBoundLikenessInput): Promise<GenerationJob>;
  createVideo(request: AvatarVideoRequest): Promise<GenerationJob>;
  getStatus(jobId: string): Promise<GenerationStatus>;
  deleteAsset(providerAssetId: string): Promise<void>;
}
```

Yêu cầu tích hợp:

- Chạy server-side bằng worker/queue; nhận webhook hoặc polling trạng thái. Không để API key ở browser/mobile client.
- Các trạng thái UI: `Đang chuẩn bị giọng`, `Đang tạo avatar`, `Đang dựng video`, `Cần xác minh`, `Thất bại - thử lại`, `Hoàn tất`.
- Có timeout, idempotency, retry có backoff, concurrency limit, usage/cost tracking và circuit breaker.
- Provider nằm sau feature flags `ELEVENLABS_ENABLED`, `HEYGEN_ENABLED`; có mock adapter và fallback sang thu giọng/upload video hoặc internal render.
- Không coi capability, giá, quota hay thời gian xử lý của vendor là cố định; lấy từ config/entitlement.
- Lưu consent scope/version, owner verification, provider asset ID và retention policy. Revoke/xóa trong app phải tạo tác vụ xóa ở provider và ghi audit kết quả.
- Tuyệt đối không clone voice/hình ảnh người thứ ba. Yêu cầu xác nhận quyền sở hữu, consent rõ ràng và bước verification/liveness khi provider hoặc mức rủi ro yêu cầu.
- Cho người dùng nghe/xem preview và duyệt trước render/publish. Gắn disclosure/watermark khi luật, provider hoặc nền tảng yêu cầu.
- Đánh giá điều khoản thương mại, DPA, vị trí lưu dữ liệu và chính sách retention trước production. Có thể hỗ trợ `managed connection`; tùy chọn người dùng tự kết nối tài khoản là phase sau, không bắt buộc MVP.

## 13. Social Publishing và lịch đăng - Pro

Tạo `PublishingProvider` cho TikTok, Instagram/Facebook, LinkedIn, YouTube và Threads.

```ts
interface PublishingProvider {
  connect(): Promise<Connection>;
  validateAsset(asset: Asset): Promise<ValidationResult>;
  publishNow(postId: string): Promise<PublishJob>;
  schedule(postId: string, publishAt: Date): Promise<PublishJob>;
  getStatus(jobId: string): Promise<PublishStatus>;
  revoke(): Promise<void>;
}
```

Yêu cầu:

- OAuth, scopes tối thiểu, token encryption và refresh/revoke.
- Mỗi kênh có validator riêng về aspect ratio, duration, filesize, caption, account eligibility.
- Lịch mặc định do người dùng chọn. `Giờ đề xuất` chỉ xuất hiện khi có đủ analytics của chính tài khoản.
- Không dùng “giờ vàng chung” như một sự thật. Recommendation phải lưu confidence, dữ liệu đầu vào và timezone.
- Calendar theo tuần, queue, draft/scheduled/publishing/published/failed/cancelled.
- Idempotency key để không đăng trùng; retry exponential backoff; webhook/polling status; failure reason rõ ràng.
- Có `Duyệt trước khi đăng` mặc định ON. Auto-publish chỉ được bật riêng từng kênh sau consent.
- Cho `Đăng ngay`, `Chọn thời gian`, `Dùng giờ đề xuất`.
- Nếu API chưa được duyệt/audit hoặc account không đủ điều kiện, chuyển sang `Upload draft` hoặc `Tải xuống`, không giả thành công.

## 14. Opportunity Engine

Không đo mỗi like/view. Cho người dùng ghi nhận và liên kết cơ hội với content asset:

- Cuộc trò chuyện mới.
- Cần theo dõi.
- Đang gửi đề xuất.
- Đã thành cơ hội.
- Đã tạo doanh thu.

Opportunity fields: contact/organization, type, sourceContentId, sourceChannel, stage, estimatedValue, realizedValue, nextAction, dueDate, notes, createdAt, closedAt.

Dashboard phải trả lời: nội dung nào tạo cuộc trò chuyện, lời mời, proposal, partnership hoặc doanh thu.

## 15. Tra cứu tên/nhãn hiệu sơ bộ

Đặt trong Brand Profile hoặc advanced tool, không đưa thành navigation cấp cao. Cho nhập tên và nhóm Nice dự kiến; kết quả chỉ là `Sàng lọc khả năng đăng ký`, không kết luận pháp lý. Luôn hiển thị nguồn và link sang dữ liệu chính thức. Tách `TrademarkSearchProvider`; khi chưa có API hợp pháp, chỉ cung cấp guided search và không tạo kết quả giả.

## 16. Subscription và entitlement

Không hard-code giá vào UI; quản lý plan/price/feature từ admin/config.

Tối thiểu có entitlement:

- Free: scan cơ bản và preview giới hạn.
- Core: Brand Memory, Proof Vault, Copy Intelligence, tạo nội dung.
- Pro: trend discovery live, voice/image clone quota cao hơn, advanced video, editable export/CapCut connector, multi-format batch, social connections, scheduling, auto-publish và analytics.

Mọi endpoint server phải kiểm tra entitlement, quota và ownership; không chỉ ẩn nút phía client.

## 17. Data model cốt lõi

Tạo schema/migration cho:

- users, workspaces, memberships.
- subscriptions, plans, entitlements, usage_events.
- brand_profiles, brand_memory_items, brand_versions.
- claims, claim_evidence, proof_assets, approvals.
- source_documents, knowledge_chunks, provenance.
- content_ideas, trend_candidates, source_links.
- content_assets, content_versions, content_variants, approvals.
- scripts, scenes, video_projects, media_assets, voice_profiles, likeness_profiles, consents.
- thinking_dna_items, writing_dna_rules, preference_signals, originality_checks.
- generation_jobs, generation_job_events, provider_assets, provider_usage và deletion_requests.
- channel_connections, publishing_posts, publishing_jobs, schedules, webhooks.
- opportunities, relationships, activity_log, audit_log.

Tất cả bảng có tenant/workspace isolation, createdBy/updatedBy, timestamps và soft delete nơi phù hợp.

## 18. Security, privacy và trust

- Row-level tenant isolation.
- Encrypt OAuth tokens và sensitive asset references.
- Signed URLs cho media riêng tư.
- Consent riêng cho voice, likeness, auto-publish và analytics.
- Voice/likeness consent phải chỉ rõ provider, mục đích, phạm vi, thời hạn và trạng thái xóa ở provider.
- Cho download/delete dữ liệu, revoke token và revoke clone consent.
- Audit log cho approval, publish, claim change, clone và export.
- Không log raw voice, token hoặc tài liệu nhạy cảm.
- Có moderation, copyright notice, impersonation prevention và rate limit.
- Tài liệu copywriting là IP riêng; chỉ admin/AI retrieval được truy cập, không cho end-user tải xuống hoặc xem toàn văn nếu không có quyền.

## 19. Trạng thái UX bắt buộc

Mỗi luồng phải có loading, empty, error, partial success, success và offline/retry state. Đặc biệt:

- Chưa kết nối nguồn trend.
- Không tìm đủ 10 video phù hợp.
- Link video không đọc được.
- Thiếu approved proof.
- Voice/likeness chưa có consent.
- Render thất bại.
- Kênh hết hạn token.
- API chỉ cho upload draft, chưa direct post.
- Scheduled post thất bại hoặc đăng một phần trong batch.

Error copy dùng ngôn ngữ đời thường và luôn có next action.

## 20. Admin tối thiểu

- Quản lý plan, entitlement, quota.
- Quản lý prompt/rubric version và knowledge source.
- Xem integration health, publish failure và webhook status.
- Quản lý content safety, report và audit.
- Không cho admin tùy tiện đọc voice, tài liệu hoặc Brand Memory riêng tư nếu không có quyền/audit reason.

## 21. Phạm vi triển khai theo phase

### P0 - MVP chạy độc lập

- Auth/workspace.
- Onboarding + Brand Source of Truth.
- Brand Memory + Proof Vault.
- Copy Intelligence với nguồn tài liệu đã cung cấp.
- Content Studio: text/voice idea, paste link ở mock/provider mode, script generation, explicit approval.
- Multi-format variants cơ bản.
- Video project, preview/mock render, advanced accordion.
- Opportunity tracker.
- Responsive UI và sample data.

### P1 - Tích hợp có điều kiện

- TrendProvider live khi có data/API hợp lệ.
- ElevenLabs voice adapter và HeyGen avatar/video adapter, chạy async với consent, quota và delete propagation.
- Internal render production.
- OAuth sandbox connectors và scheduler.
- Trademark guided search/provider.

### P2 - Pro automation

- Direct post sau platform review/audit.
- Best-time recommendation từ dữ liệu tài khoản.
- Batch multi-channel publishing.
- CapCut partner/deep integration khi được cấp quyền; nếu không, editable package export.
- Analytics -> Content Intelligence -> Opportunity attribution.
- Provider routing theo chất lượng/chi phí, BYO connection nếu cần và dashboard usage.

Không trì hoãn P0 để chờ CapCut hoặc social API approval.

## 22. Acceptance criteria quan trọng

1. Người mới không biết marketing có thể hoàn thành một kịch bản video mà không mở advanced settings.
2. Không thể clone trước khi duyệt đúng script version.
3. Không thể publish claim chưa approved.
4. Không thể auto-publish nếu thiếu channel consent.
5. Mọi kết quả trend có source và không có số giả.
6. Một approved asset tạo được nhiều channel variants nhưng vẫn truy ngược về source/proof.
7. Publish retry không tạo bài trùng.
8. User có thể revoke voice/likeness/channel và hệ thống ngừng dùng ngay.
9. Mobile và desktop đều usable; keyboard focus và screen reader labels đầy đủ.
10. Không xuất hiện booking 1:1 trong app.
11. Mỗi draft truy được mục tiêu, nguồn, approved proof và phiên bản DNA đã dùng.
12. Nội dung tham khảo không bị sao chép; curation có attribution và bình luận nguyên bản.
13. User sửa/loại một draft tạo preference signal nhưng không tự động biến thành DNA rule khi chưa xác nhận.
14. Job HeyGen/ElevenLabs chạy nền, retry không tạo asset trùng và revoke tạo được deletion request có audit.

## 23. Kết quả Codex phải bàn giao

- Kiến trúc thư mục và README chạy local.
- `.env.example` không có secret thật.
- DB schema + migrations + seed data tiếng Việt.
- UI responsive hoàn chỉnh cho P0.
- Provider interfaces và mock adapters cho trend, AI, video editor, ElevenLabs/voice, HeyGen/avatar-video, publishing và trademark.
- Unit tests cho scoring/rubric/entitlement/approval gates.
- Integration tests cho script approval -> clone -> render -> publish queue.
- E2E happy path và các failure states chính.
- Không để button giả: tính năng chưa kết nối phải có trạng thái rõ và mock mode được gắn nhãn.
- Sau khi build, chạy typecheck, lint, tests và production build; sửa lỗi trước khi bàn giao.

## 24. Trình tự code

1. Inspect repo và ghi lại stack hiện tại.
2. Tạo design tokens, shell responsive và 5 navigation items.
3. Tạo schema/migrations/seed.
4. Xây P0 theo vertical slice: onboarding -> Brand Memory -> idea -> script -> approval -> variants/video project -> opportunity.
5. Thêm provider contracts và mock adapters.
6. Thêm entitlement, consent, audit và failure states.
7. Viết tests và tài liệu chạy.
8. Chỉ sau khi P0 pass mới scaffold P1/P2 feature flags.

Hãy bắt đầu bằng cách inspect codebase, sau đó triển khai P0 hoàn chỉnh. Không chỉ tạo landing page hoặc mockup tĩnh. Sản phẩm phải có dữ liệu mẫu, tương tác thật, validation, persistence và test.

## 25. Tài liệu kỹ thuật chính thức cần kiểm tra khi tích hợp

- HeyGen Developers và Create Video API: https://developers.heygen.com/ và https://developers.heygen.com/reference/create-video
- ElevenLabs Create IVC Voice và Text-to-Speech: https://elevenlabs.io/docs/api-reference/voices/ivc/create và https://elevenlabs.io/docs/api-reference/text-to-speech/convert
- TikTok Content Posting API: https://developers.tiktok.com/products/content-posting-api/
- Instagram Content Publishing: https://developers.facebook.com/documentation/instagram-platform/content-publishing
- LinkedIn Videos/Posts APIs: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/videos-api và https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
- YouTube Videos API: https://developers.google.com/youtube/v3/docs/videos/insert

Luôn kiểm tra tài liệu và điều khoản hiện hành tại thời điểm triển khai; không suy luận capability từ trang marketing hoặc khóa cứng giả định vào code.
