# Đặc tả cập nhật UI/UX & Product Logic — Personal Brand App cho chuyên gia

**Phiên bản:** 1.0  
**Mục đích:** Tài liệu giao triển khai để nâng cấp bản app hiện tại thành một *Brand Operating System* cho chuyên gia/CEO/founder.  
**Ngôn ngữ sản phẩm:** Tiếng Việt là mặc định; kiến trúc phải sẵn sàng i18n.  
**Nguyên tắc phạm vi:** Ưu tiên lớp trí tuệ thương hiệu (identity, strategy, memory, guardrail) trước năng lực sản xuất media phức tạp.

---

## 1. Tóm tắt quyết định sản phẩm

### 1.1. Định vị

> Ứng dụng giúp chuyên gia biến kinh nghiệm, góc nhìn và năng lực thành một thương hiệu cá nhân rõ nét, nhất quán, được tin tưởng và tạo ra cơ hội.

Sản phẩm **không** là một AI writer/video editor chung chung. Content là phương tiện; mục tiêu là **authority + trust + opportunity**.

| Creator tool thông thường | Personal Brand App này |
|---|---|
| Tối ưu attention, tốc độ, trend | Tối ưu sự rõ ràng, uy tín, cơ hội kinh doanh |
| Bắt đầu từ format/template | Bắt đầu từ identity, mục tiêu và điều đáng nói |
| Profile sở thích sáng tạo | Personal Brand DNA có thể học và tiến hóa |
| “Create video” | “Hôm nay điều gì đáng để bạn chia sẻ?” |
| Số lượng output | Meaningful Brand Expressions và cơ hội tạo ra |

### 1.2. Bài học áp dụng từ Vids AI

- Dùng onboarding có dẫn dắt để tạo cảm giác app hiểu người dùng trước khi họ tạo nội dung.
- Không mở bằng canvas/editor trống.
- Dùng lựa chọn trực quan, ví dụ nội dung, và micro-reward thay cho form dài.
- Cá nhân hóa recommendation, CTA và paywall dựa trên dữ liệu vừa thu thập.
- Tuy nhiên, không sao chép luồng khảo sát 7–8 màn liên tục: app cần trả giá trị sớm bằng một nhận định coaching cụ thể.

### 1.3. North Star Metric

**Meaningful Brand Expression (MBE) / tháng**: một nội dung được tính MBE khi đồng thời:

- được AI chấm đạt Brand Guardrail;
- được người dùng duyệt/đánh dấu “Đúng là tôi”;
- được xuất bản hoặc đánh dấu đã dùng;
- gắn với một content pillar và mục tiêu thương hiệu.

Chỉ số dài hạn: **Brand Opportunity Generated** (lead, lời mời diễn thuyết, hợp tác, tư vấn, tuyển dụng) do người dùng tự khai báo hoặc tích hợp sau này.

---

## 2. Nguyên lý UX bắt buộc

1. **Coach, không phải questionnaire.** Không yêu cầu người dùng tự viết positioning trong một ô trống. AI hỏi, phản chiếu, xác nhận và suy luận.
2. **Progressive personalization.** Snapshot trước, chiều sâu sau; không ép hoàn thiện toàn bộ DNA trong lần đầu.
3. **Evidence over abstraction.** Hỏi về case, tình huống, niềm tin, phản đối, khách hàng thực tế thay vì chỉ hỏi “giá trị/giọng văn”.
4. **Recognition over terminology.** Với tone/visual, cho ví dụ thẻ nội dung/ảnh mẫu để chọn; không bắt người dùng hiểu jargon branding.
5. **Micro-reward sớm.** Sau 2–3 câu phải có insight như “Tôi đang thấy hai tín hiệu mạnh…” để giảm rơi rụng.
6. **One primary action per screen.** CTA chính rõ ràng; hành động phụ không cạnh tranh thị giác.
7. **Explain AI inference.** Mọi đề xuất positioning/DNA phải cho biết căn cứ và cho phép sửa/không đồng ý.
8. **User retains authorship.** AI khai thác vốn sống và khuếch đại bản sắc, không bịa trải nghiệm, case, thành tựu hay quan điểm.
9. **Brand before format.** Điều hướng theo mục tiêu truyền thông; chỉ chọn bài viết/video/carousel sau khi có angle.
10. **Memory is editable.** Người dùng nhìn thấy, xác nhận, sửa và xóa những gì AI ghi nhớ.
11. **Calm premium.** Giao diện tối giản, tin cậy, giàu khoảng thở; không dùng mô-típ “viral/gamified” dành cho creator.
12. **Accessibility.** Contrast AA, font tối thiểu 16px, focus state, keyboard navigation web, không truyền đạt trạng thái chỉ bằng màu.

---

## 3. Customer journey và trạng thái thương hiệu

```text
DISCOVER → DEFINE → EXPRESS → PUBLISH → LEARN → EVOLVE
   hiểu       định vị      thể hiện     xuất hiện     học        rõ nét hơn
```

| Giai đoạn | Câu hỏi của người dùng | Giá trị app trả về | Module chính |
|---|---|---|---|
| Discover | “Tôi thực sự đại diện cho điều gì?” | Insight từ kinh nghiệm, proof, belief | Brand Coach |
| Define | “Tôi muốn được nhớ đến vì điều gì?” | Brand Snapshot/DNA, positioning, pillars | Brand DNA |
| Express | “Tôi nên nói như thế nào?” | Angle, draft, script, Visual DNA | Content Studio |
| Publish | “Tôi xuất hiện thế nào cho đều?” | Plan, checklist, export/publish state | Dashboard/Calendar |
| Learn | “Điều gì tạo cộng hưởng?” | Feedback, performance insight | Review & Analytics |
| Evolve | “Brand của tôi đang trở nên rõ hơn chứ?” | Brand review và DNA update có kiểm soát | Brand Memory |

### Luồng happy path đầu tiên

1. Sign up → chọn mục tiêu chính và cam kết bắt đầu coaching.
2. Hoàn tất **Brand Snapshot Coaching** 5–10 phút (bắt buộc, có lưu tiến độ).
3. Nhận Brand Snapshot: 3 tài sản thương hiệu, positioning đề xuất, tone, 3 chủ đề nên sở hữu.
4. Chọn một “điều đáng nói” hoặc nhập insight thực tế.
5. AI tạo một bài viết hoặc video script brand-aligned.
6. Người dùng phản hồi “Đúng là tôi/Chưa giống tôi”.
7. Trial: cho phép tối đa 1–3 output; khi chạm giới hạn hoặc muốn mở DNA/plan, hiển thị paywall ngữ cảnh.

---

## 4. Onboarding coaching bắt buộc

### 4.1. Quy tắc

- Không được vào Home/Content Studio khi chưa có `brand_snapshot.status = confirmed`.
- Có thể thoát giữa chừng; lần sau quay đúng câu hỏi đang dở, không mất dữ liệu.
- Tổng số lượt trao đổi mục tiêu: 6–8, không hiển thị như form. Mỗi lượt có thể text, voice transcription hoặc lựa chọn ví dụ.
- AI không tuyên bố “đã biết chắc”; dùng ngôn ngữ đề xuất: “Tôi đang thấy…”, “Có đúng không?”
- Cho phép “Tôi chưa rõ” tại mọi bước; Agent chuyển sang câu hỏi gợi mở thay vì báo lỗi.

### 4.2. Kịch bản coaching MVP

| Bước | Mục đích | Câu hỏi/hình thức | Dữ liệu thu được | Micro-reward |
|---|---|---|---|---|
| 0. Welcome | Thiết lập kỳ vọng | “Trong 7 phút, ta sẽ tìm nền móng thương hiệu của bạn.” | goal sơ bộ | Tiến độ 0/6 |
| 1. Role & goal | Context | Vai trò, ngành, mục tiêu 12 tháng (lead/trust/speaking/…) | role, industry, business_goal | CTA cá nhân hóa |
| 2. Experience | Khai thác năng lực | “Mọi người thường tìm đến bạn để giải quyết điều gì?” | expertise, problem_space | AI phản chiếu 1 tín hiệu |
| 3. Proof | Tìm bằng chứng | “Case/thành quả nào khiến bạn tự tin nhất?” | proofs, cases, credentials | Tóm tắt strength |
| 4. Belief | Tìm POV | “Điều gì trong ngành bạn không đồng ý hoặc muốn làm khác?” | beliefs, contrarian_pov | Nhận định về differentiator |
| 5. Audience | Xác định người cần ảnh hưởng | Chọn/mô tả nhóm người, vấn đề, kết quả họ muốn | audience, pains, desired_outcomes | Audience insight |
| 6. Expression | Nhận diện voice | Chọn 1–2 trong 4 đoạn mẫu (Authority/Mentor/Provocative/Story) và 1–2 visual boards | tone, energy, visual_preferences | Voice/visual hypothesis |
| 7. Confirm | Đồng tác giả hóa DNA | AI trình bày Snapshot để sửa/xác nhận | confirmed snapshot | “Bạn đã có nền móng” |

### 4.3. Output Brand Snapshot (trial được xem)

```text
Bạn không chỉ là [chức danh].
Bạn giúp [audience] chuyển từ [before] sang [after]
bằng [expertise/method] với một góc nhìn khác biệt: [POV].

3 tài sản thương hiệu: [strength 1..3]
3 chủ đề nên sở hữu: [topic 1..3]
Giọng thương hiệu đề xuất: [voice]
Nội dung đầu tiên nên làm: [opportunity]
```

Điểm UI: có nút **“Đúng với tôi”**, **“Chỉnh lại cùng Coach”**, **“Lưu và tiếp tục”**. Không dùng “Generate again” như một máy tạo text.

---

## 5. Personal Brand DNA

### 5.1. Cấu trúc canonical

| Nhóm | Trường chính | Nguồn dữ liệu |
|---|---|---|
| Identity | expertise, experience, personal_story, values, beliefs | coaching, user edit |
| Authority | core_expertise, proofs, methodology, cases, credentials | coaching, uploaded sources |
| Audience | primary_audience, problems, outcomes, language | coaching, feedback |
| Positioning | category, differentiator, POV, promise | AI inference + confirmation |
| Personality | archetype, tone, energy, do/don’t say | selection + content feedback |
| Content DNA | pillars, themes, stories, opinions, frameworks | coach, approved content |
| Visual DNA | photo direction, palette, typography, layout, graphic language | boards + approval |
| Business | objective, offer, CTA preferences, platforms | onboarding/settings |

### 5.2. Mức trưởng thành

- **Level 1 — Brand Snapshot:** bắt buộc; đủ để tạo nội dung đầu tiên.
- **Level 2 — Brand Clarity:** bổ sung từ sửa draft, case, tài liệu, lựa chọn headline; dành cho subscriber.
- **Level 3 — Brand Intelligence:** sau khoảng 20–30 tương tác có chất lượng và/hoặc performance; có Voice Fingerprint và evolution insight; ưu tiên Annual.

### 5.3. Confidence và provenance

Mỗi claim trong DNA phải có:

- `confidence` (0–1),
- `source_type` (onboarding, user_edit, approved_content, feedback, performance, imported_document),
- `source_id`, `created_at`, `last_confirmed_at`,
- trạng thái `proposed | confirmed | rejected | archived`.

Không được dùng suy luận confidence thấp làm quy tắc cứng. Người dùng có thể xem “Vì sao AI ghi nhớ điều này?” và xóa từng mục.

---

## 6. Monetization, entitlement và paywall

### 6.1. Gói sản phẩm

| Gói | Promise | Bao gồm | Giới hạn/khóa |
|---|---|---|---|
| **Trial — Discover Me** | “App này có thật sự hiểu tôi?” | Brand Snapshot, 1 visual direction, 1–3 output mẫu | không có memory dài hạn, không calendar/analytics đầy đủ, quota thấp |
| **Monthly — Build My Brand** | “Xây và duy trì thương hiệu nhất quán mỗi tuần.” | Full coaching, Brand DNA, idea advisor, post/video scripts, review, calendar, memory cơ bản | quota generation/advanced media theo cấu hình billing |
| **Annual Pro — Grow My Authority** | “AI đồng hành và giúp thương hiệu học trong dài hạn.” | toàn bộ Monthly + memory sâu, learning/performance insight, batch/multi-platform, quarterly review, Brand Book export, priority features | quota cao nhất; quyền lợi riêng, không chỉ giảm giá |

**Annual anchor:** hiển thị giá quy đổi theo tháng và ưu đãi khoảng 25–40% so với trả 12 tháng Monthly (con số cuối cùng do business cấu hình). Không tự hard-code giá vào UI.

### 6.2. Paywall logic

1. Không hiển thị paywall trước khi người dùng nhận được Snapshot và ít nhất một giá trị cụ thể.
2. Trigger ưu tiên:
   - sau output đầu tiên đã được duyệt;
   - khi mở chi tiết Brand DNA/Brand Memory;
   - khi tạo vượt quota trial;
   - khi thêm vào calendar, dùng Brand Review hoặc export;
   - khi hệ thống phát hiện một insight đáng mở rộng.
3. Paywall phải dùng ngôn ngữ cá nhân hóa từ snapshot, ví dụ:
   - “Bạn đã tìm ra positioning. Giờ hãy xây một thương hiệu quanh nó.”
   - “Mở khóa cách AI ghi nhớ giọng nói và 3 chủ đề bạn muốn sở hữu.”
4. Phải có: thông tin trial, kỳ hạn, giá, ngày gia hạn, nút restore purchase, Terms/Privacy; không dùng dark pattern, CTA gây hiểu nhầm hay preselected consent ngoài quy định store.
5. Nếu người dùng dismiss paywall: quay về trạng thái trước đó, không mất draft; hiển thị usage rõ ràng.

### 6.3. Entitlement server-side

Client chỉ hiển thị UI. API là nguồn quyết định cuối cùng cho `feature`, `quota`, `expiry`, `trial_used`, `plan`. Thiết kế adapter để hỗ trợ Apple/Google/web payment hoặc billing provider; nhận webhook idempotent, lưu event audit và đồng bộ entitlement.

---

## 7. Information architecture

### Primary navigation (mobile: bottom tab; web: left rail)

1. **Hôm nay** — dashboard/brand advisor.
2. **Tạo nội dung** — mục tiêu → insight → output.
3. **Lịch** — calendar, pipeline, plan.
4. **Thương hiệu** — DNA, Memory, Visual DNA, Guardrail.
5. **Tiến triển** — review và learning (ẩn/gated theo plan khi cần).

Global: notification/inbox, profile, subscription, help. Không tạo tab “Templates” ở MVP; format là một lựa chọn trong flow tạo nội dung.

### Content hierarchy

`Business objective → Content pillar → Opportunity/insight → Angle → Format/platform → Draft → Review → Publish → Feedback/performance`.

---

## 8. Screen-by-screen specification

| Screen | Mục tiêu và nội dung | Primary action | States cần có |
|---|---|---|---|
| Welcome / Auth | Promise rõ, sign in/up, link privacy | Bắt đầu Brand Coaching | loading, auth error, returning user |
| Coaching shell | Title, progress, conversational prompt, answer input/options, save & exit | Tiếp tục | default, typing, analyzing, resume, validation, offline draft |
| Choice cards | 2–6 cards có label + example; selectable multi/single theo câu hỏi | Xác nhận lựa chọn | default, hover/focus, selected, disabled |
| Reflection card | AI nêu insight + evidence ngắn, nút confirm/correct | Đúng, tiếp tục | generating, low-confidence, edit |
| Brand Snapshot reveal | positioning, assets, topics, tone; edit inline | Tạo nội dung đầu tiên | loading, partial, confirmed, revise |
| Home / Hôm nay | “Brand focus tuần này”, 3 opportunities, consistency, plan, quick capture | Chọn điều đáng nói | no-plan, trial quota reached, loading, error |
| Capture sheet | Nhập voice/text/link về trải nghiệm/quan sát/case; không bắt buộc format | Biến thành ý tưởng | empty, recording, transcript edit, upload failure |
| Goal selector | Build Authority / Tell Your Story / Teach / Start Conversation / Generate Opportunity | Tiếp tục | selected/unselected |
| Angle recommendation | 3–5 angle có lý do gắn DNA, tone, pillar | Chọn angle | regenerate guarded, no suitable result |
| Format/platform | Chọn post, video script, carousel; chọn LinkedIn/Facebook/TikTok… | Tạo draft | entitlement-locked output |
| Content Studio | Brief sidebar, draft editor, source facts, Brand Review panel, variation controls | Duyệt / lưu lịch | generating, streaming, draft, unsaved, review warning, quota |
| “That sounds like me” | Sau generate/approve: hai CTA chính + lý do khi reject | Gửi feedback | submitted, retry |
| Brand DNA | Sections, evidence, confidence, edit/propose history | Chỉnh/xác nhận | trial preview/paywall, empty, conflict |
| Brand Memory | Fact/voice rules/story bank; controls confirm/edit/delete | Cập nhật memory | pending suggestion, deletion confirmation |
| Visual DNA | boards + palette/type/layout principles + preview | Lưu direction | trial preview, selected, generate preview |
| Brand Guardrail | Non-negotiables, tone rules, banned claims/phrases, disclosure policy | Lưu rules | default, rule conflict, review warning |
| Calendar | Week/month, content pipeline, suggested cadence | Lên lịch nội dung | empty, drag pending, locked |
| Progress | pillar coverage, consistency, feedback/performance insights, suggested change | Xem/áp dụng insight | insufficient data, annual locked |
| Subscription | compare plans, entitlement, restore/manage subscription | Bắt đầu trial/nâng cấp | loading, purchase pending/error/success |

### Dashboard/Home requirements

Không đặt “Create” làm CTA trung tâm. Khối đầu trang nên là:

```text
Thương hiệu của bạn tuần này
Brand focus: [pillar / goal]
Hôm nay có 3 điều đáng để bạn chia sẻ
```

Mỗi opportunity cần: tiêu đề, nguồn tín hiệu (case/nhận xét/trend do user nhập), lý do phù hợp DNA, mục tiêu, CTA “Khai thác ý này”. Không bịa “từ cuộc họp hôm qua” nếu không có dữ liệu nguồn.

---

## 9. Content creation, Brand Guardrail và Visual DNA

### 9.1. Content creation flow

1. User chọn **mục tiêu truyền thông**.
2. User cung cấp/capture vốn sống hoặc chọn opportunity do AI đề xuất.
3. Idea Agent tạo angle với giải thích liên hệ `pillar + audience + objective + POV`.
4. User chọn angle và format/platform.
5. Draft Agent tạo outline trước, sau đó copy/script; xác định rõ phần nào cần người dùng xác minh.
6. Brand Review chấm trước khi hiển thị final: alignment, factual risk, voice, business relevance.
7. User chỉnh/dựng, duyệt, đưa vào lịch/đánh dấu publish.
8. Thu feedback explicit và performance/import sau publish; đề xuất update DNA có xác nhận.

### 9.2. Brand Guardrail

Guardrail là lớp bảo vệ; không phải chỉ là prompt. Gồm:

- positioning/pillar phải ưu tiên;
- voice: do/don’t, level of assertiveness, preferred language;
- prohibited claims: không bịa case, số liệu, credential, testimonial;
- phrases/clichés to avoid;
- sensitive topics/compliance/disclaimer;
- platform-specific rules và CTA boundaries.

`Brand Review` trả về: điểm 0–100, trạng thái `pass | needs_review | block`, rule vi phạm, đoạn văn bị ảnh hưởng, đề xuất sửa. Với block factual/compliance, không tự publish/export như “ready”.

### 9.3. Visual DNA

Visual DNA chuyển từ tính cách thương hiệu sang nguyên tắc thiết kế:

`Brand personality → visual principles → design tokens/template rules`.

Lưu: mood/photography, palette tokens, typography roles, spacing/layout, graphic motifs, image treatment, avoid list. Không suy diễn chỉ từ “thích màu xanh”. Trial xem/chọn 1 direction; Monthly lưu/chỉnh; Annual export Brand Book và mở advanced variants.

---

## 10. Component và state design

### Reusable components

- `AppShell`, `ProgressStepper`, `QuestionPrompt`, `AnswerComposer`, `ChoiceCardGrid`, `InsightReflectionCard`.
- `BrandChip`, `PillarTag`, `EvidenceLink`, `ConfidenceBadge`, `MemoryItem`.
- `OpportunityCard`, `AngleCard`, `SourceFactCard`, `DraftEditor`, `BrandReviewPanel`.
- `PlanGate`, `QuotaMeter`, `PaywallSheet`, `SubscriptionStatus`.
- `AsyncState` tiêu chuẩn: skeleton, empty, error có retry, success, permission/entitlement locked.

### Quy ước state

- Server state: query cache keyed by `user_id`, `brand_id`, `content_project_id`; invalidate có chủ đích sau mutation.
- Client state: chỉ cho UI tạm thời (modal, input draft, selected option); không nhân bản DNA canonical.
- Autosave câu trả lời/draft có debounce; hiển thị “Đã lưu”/“Đang lưu”/“Không thể lưu, thử lại”.
- Generation là job async: `queued → running → succeeded | failed | cancelled`; hỗ trợ resume/poll/realtime update, idempotency key để không tạo trùng.
- Mọi destructive action (xóa memory, draft) có confirm và soft delete/recover window nếu khả thi.

---

## 11. Data model tối thiểu

| Entity | Trường cốt lõi |
|---|---|
| `users` | id, locale, timezone, onboarding_status, created_at |
| `brands` | id, user_id, name, role, industry, maturity_level, snapshot_status, version |
| `brand_dna_items` | id, brand_id, domain, key, value_json, status, confidence, provenance, version |
| `brand_memories` | id, brand_id, type, content, embedding_ref, source_type/id, confidence, confirmed_at, deleted_at |
| `guardrail_rules` | id, brand_id, rule_type, severity, rule_json, active |
| `visual_dna` | id, brand_id, direction, tokens_json, approved_at, version |
| `coaching_sessions/messages` | id, brand_id/session_id, step, role, content, metadata, completed_at |
| `content_pillars` | id, brand_id, name, description, priority, status |
| `content_opportunities` | id, brand_id, source, insight, score, rationale, pillar_id, status |
| `content_projects` | id, brand_id, objective, platform, format, brief, status, scheduled_at, published_at |
| `content_versions` | id, project_id, prompt_version, content, source_refs, review_json, approved_at |
| `feedback_events` | id, brand_id, project/version_id, type, reason_codes, free_text |
| `performance_records` | id, project_id, platform, captured_at, metrics_json, source |
| `subscriptions/entitlements/usage` | provider IDs, plan, state, valid_until, feature, period, consumed |
| `ai_jobs` | id, user/brand/project_id, job_type, input_hash, status, result_ref, model_config, error |
| `audit_events` | actor, entity, action, before/after version, timestamp |

Yêu cầu DB: foreign keys, tenant isolation theo `user_id/brand_id`, index cho `brand_id + status`, `project_id`, `subscription provider ID`; encrypt at rest/in transit; không log raw sensitive prompts ngoài chính sách retention.

---

## 12. AI agent orchestration

### 12.1. Nguyên tắc

- Một **Orchestrator** quyết định agent/tool, quản lý state, budget, retry và observability; không để client tự ghép prompt.
- DNA/Guardrail là context có phiên bản, được retrieve theo relevance, không nhét toàn bộ lịch sử vào mỗi prompt.
- Tool outputs có schema validation; LLM không được là nguồn chân thực duy nhất cho thành tựu/case.
- Tất cả update dài hạn vào Memory/DNA ở trạng thái `proposed` cho đến khi user xác nhận, trừ preference feedback rõ ràng có thể cập nhật confidence thấp.

### 12.2. Agent responsibilities

| Agent | Input | Output | Guardrail |
|---|---|---|---|
| Brand Coach | câu trả lời coaching + profile | reflection, follow-up, Snapshot draft | không áp đặt positioning; cite evidence nội bộ |
| DNA Synthesizer | confirmed session + approved facts | DNA item proposals | provenance/confidence bắt buộc |
| Opportunity/Idea | DNA, memory, goal, capture | scored ideas/angles + rationale | không giả mạo nguồn/trend |
| Strategy | objective, pillar gaps, calendar | plan/cadence | ưu tiên brand goals, không chỉ volume |
| Draft/Script | approved angle, source facts, DNA | outline + copy/script | factual boundaries, voice rules |
| Brand Review | draft + Guardrail + DNA | score, violations, fixes | block unsafe/unverified claims |
| Memory Curator | feedback, approved/published content, performance | memory/DNA proposals | user confirm for material beliefs/positioning |
| Learning Analyst | performance + feedback over time | insights, experiment proposal | minimum data threshold; distinguish correlation |
| Visual Director (phase sau) | Visual DNA + content brief | visual brief/template spec | no unlicensed/identity misuse assets |

### 12.3. Suggested API/job boundaries

- `POST /coaching/sessions`, `POST /coaching/sessions/:id/respond`, `POST /coaching/sessions/:id/complete`
- `GET/PATCH /brands/:id/dna`, `POST /brands/:id/memory/:id/confirm|reject`
- `POST /content/opportunities`, `POST /content/projects`, `POST /content/projects/:id/generate`
- `POST /content/versions/:id/review`, `POST /feedback`, `POST /performance/import`
- `GET /entitlements`, `POST /billing/webhooks/:provider`

Generation/review chạy qua job queue; trả `job_id`, stream/poll trạng thái. Prompt template/model/version/latency/cost phải được log có kiểm soát để đánh giá và rollback.

---

## 13. Feedback learning loop

### Explicit signals

- “Đúng là tôi”; “Không giống tôi”.
- Lý do reject: quá bán hàng, quá khoa trương, quá học thuật, sáo rỗng, không giống cách nói, sai ý.
- inline edit delta; approve, save, schedule, publish, discard.

### Implicit/performance signals

- thời gian chỉnh sửa, tỷ lệ chọn angle, completion/publish rate;
- coverage theo pillar; cadence;
- performance per platform (khi người dùng kết nối/import); opportunity outcome self-report.

### Update rule

```text
Interaction + feedback + approved content + performance
        → hypothesis
        → proposed memory/DNA update (with evidence)
        → user confirm/reject
        → canonical Brand DNA version update
```

Không biến một post có nhiều view thành thay đổi positioning tự động. Phải có threshold dữ liệu, confidence, và diễn giải “đây là tương quan, chưa phải kết luận”.

---

## 14. Analytics và event taxonomy

### Funnel chính

`signup_started → onboarding_started → coaching_step_completed → snapshot_generated → snapshot_confirmed → first_content_generated → first_content_approved → paywall_viewed → trial_started → subscription_activated → first_MBE → week_4_retained`.

| Event | Thuộc tính bắt buộc |
|---|---|
| `coaching_step_completed` | session_id, step, duration, answer_mode |
| `snapshot_generated/confirmed/revised` | brand_id, version, confidence summary |
| `opportunity_viewed/selected` | opportunity_id, source, score, pillar, objective |
| `content_generated` | project_id, format, platform, agent/model version, latency, entitlement |
| `brand_review_completed` | score, result, rule_count, factual_warning_count |
| `voice_feedback_submitted` | verdict, reason_codes, version_id |
| `content_approved/scheduled/published` | project_id, pillar, objective, platform |
| `paywall_viewed/dismissed/cta_clicked` | trigger, placement, plan_shown, trial_state |
| `subscription_changed` | old_plan, new_plan, provider, state |
| `memory_proposed/confirmed/rejected/deleted` | type, source_type, confidence |
| `performance_imported` | platform, metric availability, project_id |

Phân tích tối thiểu: drop-off từng coaching step; time-to-Snapshot; activation (Snapshot confirmed + first content approved); trial conversion; paywall trigger conversion; 1/4/8-week retention; MBE; Brand Review pass rate; “sounds like me” rate; quota/cost per active subscriber.

Không gửi raw câu trả lời coaching hoặc full content vào analytics product bên thứ ba trừ khi có consent/chính sách dữ liệu phù hợp. Dùng ID/pseudonymous properties.

---

## 15. Migration/update từ bản cũ

> Chưa có mã nguồn/bản schema hiện tại trong workspace. Trước khi code, team phải hoàn tất Audit 0; không được overwrite dữ liệu cũ theo giả định.

### Audit 0 — bắt buộc trước implementation

- Lập inventory: framework, navigation, auth, state management, API, database, payment/subscription, analytics, notification, deploy/CI.
- Chụp baseline các screen/luồng hiện tại; map route cũ → route mới.
- Export/schema dữ liệu và phân loại: giữ nguyên, migrate, deprecate, không rõ nguồn.
- Kiểm tra plan/entitlement hiện có, webhook và subscription restore để tránh làm mất quyền trả phí.
- Xác định feature flags, môi trường dev/staging/prod, rollback path, crash/error monitoring.

### Migration strategy

1. **Additive schema first:** thêm `brands`, DNA, memory, content project/version, entitlement abstraction; không xóa bảng cũ ở release đầu.
2. **Backfill idempotent:** tạo một `brand` mặc định cho từng user cũ; map profile cũ thành DNA `proposed` với provenance `legacy_migration`, không tự coi là confirmed.
3. **Feature flag:** `brand_coaching_v2`, `home_advisor_v2`, `content_studio_v2`, `paywall_v2`; rollout internal → 5% → 25% → 100% theo metrics/error.
4. **Existing users:** hiển thị “Cập nhật Brand Profile” có thể skip tạm; đến khi vào creation flow mới cần Snapshot confirmed. Không ép trial đã trả phí đi qua paywall.
5. **Legacy content:** giữ truy cập read-only; gắn/suggest pillar sau, không rewrite nội dung cũ.
6. **Billing:** entitlement adapter đọc song song nguồn cũ/mới trong giai đoạn chuyển; webhook idempotent và reconciliation job.
7. **Deprecation:** chỉ xóa route/table/API cũ sau khi rollout ổn định, backup được kiểm thử restore, và có approval release.

### Data migration acceptance checks

- 100% user cũ đăng nhập được; không mất content/draft/subscription.
- Không có active subscriber nào bị downgrade do migration.
- Migration re-run không tạo trùng brand/memory/entitlement.
- Rollback app version vẫn đọc được schema dữ liệu mới hoặc được bảo vệ bằng compatibility layer.

---

## 16. Scope, ưu tiên và acceptance criteria

### MVP (phải triển khai trước)

- [ ] Auth + brand workspace đơn người dùng.
- [ ] Onboarding Brand Coaching bắt buộc, resume được, Snapshot xác nhận được.
- [ ] Brand DNA Level 1 có provenance/confidence/edit.
- [ ] Home Advisor với focus và opportunity cơ bản.
- [ ] Flow goal → capture/angle → post hoặc video script → Brand Review → feedback “Đúng là tôi”.
- [ ] Brand Guardrail cơ bản: voice + factual claim warning + banned phrases.
- [ ] Trial/Monthly/Annual entitlement, quota server-side, paywall theo ngữ cảnh, restore purchase.
- [ ] Event tracking funnel và error monitoring.
- [ ] Migration additive + feature flags + rollout plan.

### Phase 2

- [ ] Calendar đầy đủ, strategy agent, nhiều platform/format, content series.
- [ ] Brand Memory Level 2, import tài liệu, story/case bank.
- [ ] Visual DNA preview/template rules; export Brand Book.
- [ ] Performance import/integration, learning insight có threshold.
- [ ] Annual deep review, batch production, multi-platform variations.

### Phase 3 / chỉ làm khi core được chứng minh

- [ ] Video generation/rendering, voice/avatar, image production.
- [ ] Auto-publish/distribution integrations (kèm consent và approval per post).
- [ ] Human coach booking + Brand Diagnosis Brief.
- [ ] Team/agency collaboration, permissions, multi-brand workspace.

### Acceptance criteria release MVP

1. Người dùng mới tạo được Snapshot được xác nhận trong một session hoặc resume; UI không có form 30 field.
2. Snapshot hiển thị positioning, 3 assets, 3 topics, voice và có thể chỉnh trước khi dùng.
3. User tạo được ít nhất một draft từ insight/capture, thấy rationale của angle và review result.
4. Feedback “Đúng là tôi/Không giống tôi” được lưu, có reason codes, và ảnh hưởng đến đề xuất sau qua memory proposal.
5. Draft có cảnh báo/block khi vi phạm factual/guardrail; hệ thống không bịa case/credential trong test suite.
6. Trial không vượt quota; Monthly/Annual feature unlock đúng entitlement trên API lẫn UI; restore hoạt động.
7. Dismiss paywall không mất draft hoặc câu trả lời coaching.
8. Existing user giữ data và entitlement sau migration; flags có thể tắt để trở về trải nghiệm cũ an toàn.
9. Các events funnel bắt buộc xuất hiện trong môi trường staging; dữ liệu PII không bị gửi sai nơi.
10. Đạt accessibility baseline và responsive layout ở kích thước mobile/web đã hỗ trợ.

---

## 17. Yêu cầu triển khai, QA và deploy

### Engineering

- Tách domain/service theo các module: Brand, Coaching, Content, Billing, Analytics; tránh một prompt/endpoint khổng lồ.
- Dùng typed API contracts, schema validation cho AI output, RBAC/tenant check mọi request.
- Secrets chỉ ở server/secret manager; không đưa provider keys vào app client.
- Rate limit, quota enforcement, idempotency cho generation và billing webhook.
- Có audit log cho DNA/memory/guardrail/subscription mutation; có test unit, integration, end-to-end cho happy path/paywall/migration.
- Thiết kế observability: structured log có request/job ID, metrics latency/error/cost AI, alert billing webhook/generation failures.

### QA checklist

- [ ] Test fresh user, returning incomplete user, legacy user, trial user, Monthly, Annual, expired/cancelled plan.
- [ ] Test mạng chập chờn khi coaching/autosave/generation/purchase; không mất draft.
- [ ] Test DNA edit/delete/proposed confirmation; history/provenance đúng.
- [ ] Test factual unsafe prompt, rejected voice feedback, paywall triggers, quota race condition.
- [ ] Test iOS/Android/web target thực tế (theo stack app cũ), mobile responsive, keyboard/screen reader critical path.
- [ ] Test migration trên bản sao dữ liệu production đã ẩn danh; kiểm tra rollback.

### Deploy requirements

1. Có môi trường **development → staging → production**, cấu hình và keys tách biệt.
2. CI chạy lint/typecheck/unit/integration/build; staging chạy E2E smoke: signup → snapshot → draft → feedback → paywall simulation.
3. Database migration backup trước deploy, migration có version và dry-run/staging rehearsal.
4. Deploy bằng feature flags; internal dogfood trước, rồi canary rollout. Theo dõi crash-free rate, API error, generation failure, payment webhook, conversion/drop-off.
5. Có runbook rollback app/backend/schema và owner trực release; không destructive migration trong lần launch đầu.
6. Sau 7 ngày rollout, review metrics và feedback trước khi bật mặc định toàn bộ/khử route cũ.

---

## 18. Definition of Done

Một hạng mục chỉ hoàn tất khi:

- UI khớp spec/states, responsive và accessible;
- API/data model/entitlement/analytics liên quan đã hoàn chỉnh;
- unit + integration + E2E phù hợp đã pass;
- lỗi/empty/loading/permission/paywall states đã được thiết kế, không chỉ happy path;
- không làm mất data/quyền subscription bản cũ;
- feature flag, monitoring và rollback path đã tồn tại;
- Product/Design xác nhận bằng acceptance criteria, và staging đã chạy qua end-to-end.

---

## 19. Câu hỏi cần chốt trước khi bắt đầu code

- Stack, repository và luồng navigation hiện tại của bản cũ là gì?
- Nền tảng launch đầu tiên: iOS, Android, web hay đa nền tảng?
- Payment provider/store, giá từng thị trường, chính sách trial/refund đã quyết định chưa?
- Nguồn performance phase 2 là nhập tay, upload, hay kết nối API các social platform nào?
- Ngành nào là ICP đầu tiên và có yêu cầu compliance đặc thù (tài chính/y tế/pháp lý) không?
- Brand visual system hiện có (logo, type, palette, UI kit) cần giữ những phần nào?

Các câu hỏi này không chặn việc dựng module MVP ở trên, nhưng phải được trả lời trong Audit 0 trước khi merge/deploy production.
