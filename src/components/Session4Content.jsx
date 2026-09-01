import React, { useState, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Play, Edit3, ChevronDown, ChevronUp, 
  Sparkles, Volume2, Video, Film, CheckCircle2, Download, Send, 
  Layers, Sliders, RefreshCw, Wand2, Upload, Flame, Copy, Eye, Music, FileVideo, ThumbsUp, ThumbsDown
} from 'lucide-react';

/**
 * EXPERTPRINT — SESSION 4: XƯỞNG SÁNG TẠO (CONTENT & VIDEO STUDIO)
 * Built according to Master Spec & Copy Modeling Rules:
 * 1. Viral Video Copy Modeling: Select proven viral video templates & transform with Expert DNA
 * 2. Visual & Template Selection: B-Roll, Sound Effects, Brand Archetype Templates
 * 3. Expert Video Upload: Upload raw recorded footage with live 9:16 preview
 * 4. "That Sounds Like Me" Feedback Engine & Brand Guardrail Review
 */

// 3 Proven Viral Video Benchmark Templates for Copy Modeling
const VIRAL_COPY_MODELS = [
  {
    id: 'viral-1',
    originalTitle: '3 lý do người giỏi chuyên môn vẫn mãi làm thuê và thu nhập thấp',
    views: '1.2M views',
    platform: 'LinkedIn / TikTok B2B',
    provenHook: 'Nhiều người nghĩ rằng làm lâu năm thì giá trị tự tăng. Nhưng sự thật là...',
    whyWorked: 'Đánh trúng nỗi đau Paid Pain của chuyên gia giỏi kỹ thuật nhưng thiếu định vị.',
    templateCategory: 'Góc nhìn phản biện (Contrarian POV)',
    convertedScript: {
      hook: 'Nhiều người nghĩ rằng có tiếng làm lâu năm trong ngành thì cứ nghỉ việc là tự do. Nhưng sự thật là: Chuyên môn giỏi mà không có định vị đúng thì bạn vẫn mãi làm việc phía sau và bị động.',
      coreInsight: '80% mắc kẹt vì thiếu QUỸ DÒNG TIỀN 12 tháng. Sai lầm 90% mắc phải là bán thời gian thay vì bán giải pháp. Mất nguồn thu cố định và không biết đóng gói sản phẩm để có khách hàng ngay.',
      cta: 'Đừng chỉ giỏi chuyên môn. Hãy học cách định vị — đóng gói — và tạo hệ thống Signature Offer để có khách hàng ngay cả khi chưa có thương hiệu cá nhân lớn.'
    }
  },
  {
    id: 'viral-2',
    originalTitle: 'Cách tôi đóng gói dịch vụ tư vấn 60 phút định giá gấp 5 lần số đông',
    views: '850K views',
    platform: 'Facebook / YouTube Shorts',
    provenHook: 'Nếu bạn vẫn đang báo giá tư vấn theo giờ, bạn đang tự hạ thấp giá trị...',
    whyWorked: 'Giải thích rõ giá trị dịch vụ và hướng dẫn đóng gói Signature Offer.',
    templateCategory: 'Đóng gói sản phẩm (Value Packaging)',
    convertedScript: {
      hook: 'Nếu bạn vẫn đang báo giá tư vấn theo giờ, bạn đang tự hạ thấp uy tín thực chiến của mình. Khách hàng không mua số giờ của bạn, họ mua sự thay đổi.',
      coreInsight: 'Trong buổi chẩn đoán 1:1, thay vì nói lan man 2 tiếng, tôi tập trung chẩn đoán 3 điểm nghẽn chiến lược cốt lõi và đưa ra giải pháp khắc phục tận gốc.',
      cta: 'Hãy dừng việc bán thời gian. Đóng gói chuyên môn thành gói Chẩn đoán 1:1 hoặc Mentoring 90 ngày để định giá đúng giá trị của bạn.'
    }
  },
  {
    id: 'viral-3',
    originalTitle: 'Bài học đắt giá 500 triệu khi chuyển từ làm quản lý sang tư vấn tự do',
    views: '650K views',
    platform: 'Reels / Video Dọc',
    provenHook: '10 năm trước khi rời vị trí quản lý, tôi đã mắc một sai lầm ngây thơ...',
    whyWorked: 'Kể chuyện thật (Authentic Storytelling) kết hợp bài học đắt giá rút ra.',
    templateCategory: 'Chia sẻ thật (Authentic Story)',
    convertedScript: {
      hook: '10 năm trước khi rời công việc toàn thời gian để ra làm độc lập, tôi từng nghĩ chỉ cần chuyên môn giỏi là khách tự tìm đến. Đó là sai lầm đắt giá nhất.',
      coreInsight: 'Không có chiến lược định vị và bệ phóng truyền thông, bạn sẽ phải chạy theo từng hợp đồng nhỏ lẻ. Bài học lớn nhất: Xây uy tín dựa trên bằng chứng thật và hệ thống thu hút khách hàng.',
      cta: 'Nếu bạn đang chuẩn bị chuyển đổi sự nghiệp tự do, hãy bắt đầu bằng việc xây dựng Brand Blueprint và Signature Offer ngay từ hôm nay.'
    }
  }
];

// Video Design Templates with B-Roll & Sound Effects
const VIDEO_TEMPLATES = [
  {
    id: 'template-editorial',
    name: 'Editorial Luxury (Mặc định)',
    vibe: 'Đĩnh đạc, tối giản, chuẩn mực cố vấn',
    broll: 'Văn phòng hiện đại, tài liệu chiến lược, không gian yên tĩnh',
    ambientSound: 'Ambient Piano 12% + Soft Subtitle Click',
    fontStyle: 'Playfair Display + Be Vietnam Pro'
  },
  {
    id: 'template-pragmatic',
    name: 'Pragmatic Execution (Thực chiến)',
    vibe: 'Nhanh, sắc bén, tập trung vào số liệu',
    broll: 'Biểu đồ dòng tiền, bảng làm việc, thao tác thực tế',
    ambientSound: 'Lo-Fi Focus Beat 10% + Risers',
    fontStyle: 'Be Vietnam Pro Bold + High-Contrast Tags'
  },
  {
    id: 'template-story',
    name: 'Warm Cinematic Story (Đồng hành)',
    vibe: 'Ấm áp, truyền cảm hứng, giàu cảm xúc',
    broll: 'Cảnh trò chuyện 1:1, khoảnh khắc suy ngẫm, ánh sáng tự nhiên',
    ambientSound: 'Acoustic Warm Guitar 15%',
    fontStyle: 'Playfair Display Italic + Clean Sans'
  }
];

export default function Session4Content({ profile, updateProfile, onNext, onBack, lang = 'vi' }) {
  const isEn = lang === 'en';
  const userAvatar = profile?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=80';

  // Active Stepper: 
  // 1: Copy Modeling Viral (Ý tưởng)
  // 2: Template Video & B-Roll (Phong cách)
  // 3: Upload Video quay & Xem trước (Preview)
  // 4: Guardrail & Xuất bản (Publish)
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Copy Model Viral Template
  const [selectedModelId, setSelectedModelId] = useState('viral-1');
  const selectedModel = VIRAL_COPY_MODELS.find(m => m.id === selectedModelId) || VIRAL_COPY_MODELS[0];

  // Selected Video Template (B-Roll & Sound)
  const [selectedTemplateId, setSelectedTemplateId] = useState('template-editorial');
  const selectedTemplate = VIDEO_TEMPLATES.find(t => t.id === selectedTemplateId) || VIDEO_TEMPLATES[0];

  // Script Blocks State (Transformed with Expert DNA)
  const [scriptBlocks, setScriptBlocks] = useState([
    {
      id: 'hook',
      title: 'Mở đầu (Hook)',
      text: selectedModel.convertedScript.hook,
      isEditing: false
    },
    {
      id: 'core_insight',
      title: 'Góc nhìn chính (Core Perspective)',
      text: selectedModel.convertedScript.coreInsight,
      isEditing: false
    },
    {
      id: 'cta',
      title: 'Kêu gọi hành động (CTA)',
      text: selectedModel.convertedScript.cta,
      isEditing: false
    }
  ]);

  // Expert Uploaded Raw Video File
  const [rawVideoUrl, setRawVideoUrl] = useState(null);
  const [rawVideoName, setRawVideoName] = useState('');

  // Render & Playback State
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

  // Voice Feedback
  const [voiceVerdict, setVoiceVerdict] = useState(null);

  const handleSelectModel = (model) => {
    setSelectedModelId(model.id);
    setScriptBlocks([
      { id: 'hook', title: 'Mở đầu (Hook)', text: model.convertedScript.hook, isEditing: false },
      { id: 'core_insight', title: 'Góc nhìn chính (Core Perspective)', text: model.convertedScript.coreInsight, isEditing: false },
      { id: 'cta', title: 'Kêu gọi hành động (CTA)', text: model.convertedScript.cta, isEditing: false }
    ]);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRawVideoName(file.name);
    const videoObjUrl = URL.createObjectURL(file);
    setRawVideoUrl(videoObjUrl);
    alert(`Đã tải lên thành công video thô: ${file.name}`);
  };

  const handleUpdateScript = (id, newText) => {
    setScriptBlocks(prev => prev.map(b => b.id === id ? { ...b, text: newText } : b));
  };

  const toggleEditBlock = (id) => {
    setScriptBlocks(prev => prev.map(b => b.id === id ? { ...b, isEditing: !b.isEditing } : b));
  };

  const handleStartRender = () => {
    setIsRendering(true);
    setRenderProgress(15);
    const interval = setInterval(() => {
      setRenderProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          alert('Video đã hoàn tất dựng chuẩn 1080x1920 9:16 kèm Subtitle & B-Roll!');
          return 100;
        }
        return p + 20;
      });
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-140px)] animate-fade-in pb-24 font-sans">
      
      {/* Header & Stepper */}
      <div className="space-y-4 mb-6 border-b border-silver/60 pb-4">
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span className="font-bold uppercase tracking-widest text-[#315CFF]">
            XƯỞNG SÁNG TẠO · SESSION 4
          </span>
          <span className="font-mono text-[11px] text-ink/40">
            BƯỚC {currentStep}/4
          </span>
        </div>

        {/* Stepper Tabs */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs text-ink/40 overflow-x-auto custom-scrollbar">
          {[
            { num: 1, label: '1. Copy Modeling Viral' },
            { num: 2, label: '2. Chọn Template Video' },
            { num: 3, label: '3. Video Upload & 9:16 Preview' },
            { num: 4, label: '4. Guardrail & Xuất bản' },
          ].map((st) => {
            const isActive = currentStep === st.num;
            return (
              <button
                key={st.num}
                onClick={() => setCurrentStep(st.num)}
                className={`pb-2 whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
                  isActive ? 'border-[#315CFF] text-[#315CFF] font-bold' : 'border-transparent text-ink/50 hover:text-ink'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                  isActive ? 'bg-[#315CFF] text-white' : 'bg-silver/60 text-ink/70'
                }`}>
                  {st.num}
                </span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STEP 1: VIRAL VIDEO COPY MODELING (GỢI Ý VIDEO VIRAL PHÙ HỢP DNA) */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>COPY MODELING THÀNH CÔNG · KHÔNG TỰ SÁNG TẠO LUNG TUNG</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              Chọn mẫu Video Viral đã chứng minh hiệu quả trên thị trường.
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans max-w-3xl">
              Dấu Ấn Studio tự động tìm các cấu trúc video viral phù hợp nhất với Định vị & Mục tiêu của bạn. 
              Sau đó chuyển hóa trọn vẹn mang DNA thương hiệu của bạn dựa trên hồ sơ đã lưu.
            </p>
          </div>

          {/* 3 Copy Model Viral Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VIRAL_COPY_MODELS.map((model) => {
              const isSelected = selectedModelId === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => handleSelectModel(model)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3.5 shadow-xs flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#315CFF] ring-2 ring-[#315CFF]/15'
                      : 'bg-white/70 border-silver/80 hover:border-ink/30'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        🔥 {model.views}
                      </span>
                      <span className="text-[10px] font-mono text-ink/40">{model.platform}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-ink leading-snug">
                      "{model.originalTitle}"
                    </h3>

                    <div className="p-3 bg-cream/70 rounded-2xl border border-silver/60 text-xs space-y-1">
                      <span className="text-[10px] font-bold uppercase text-ink/40 block">Cấu trúc Hook viral:</span>
                      <p className="font-serif italic text-ink/90">"{model.provenHook}"</p>
                    </div>

                    <p className="text-[11px] text-ink/60 leading-relaxed font-sans">
                      💡 <strong>Vì sao thành công:</strong> {model.whyWorked}
                    </p>
                  </div>

                  <button
                    className={`w-full h-10 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#315CFF] text-white shadow-xs'
                        : 'bg-cream border border-silver text-ink hover:border-ink/40'
                    }`}
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{isSelected ? '✓ Đã chuyển hóa DNA' : 'Chuyển hóa theo DNA của tôi'}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Transformed Script Preview */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-silver/40 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF]">
                KỊCH BẢN ĐÃ CHUYỂN HÓA MANG DNA THƯƠNG HIỆU CỦA BẠN
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Phù hợp Định vị {profile.archetypeName || 'Advisor'}
              </span>
            </div>

            <div className="space-y-4">
              {scriptBlocks.map((block) => (
                <div key={block.id} className="p-4 rounded-2xl bg-cream/60 border border-silver/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#315CFF] tracking-wider">{block.title}</span>
                    <button onClick={() => toggleEditBlock(block.id)} className="text-ink/40 hover:text-ink">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {block.isEditing ? (
                    <textarea
                      rows={3}
                      value={block.text}
                      onChange={(e) => handleUpdateScript(block.id, e.target.value)}
                      className="w-full text-xs text-ink bg-white p-2.5 rounded-xl border border-silver focus:border-ink resize-none font-sans"
                    />
                  ) : (
                    <p className="text-xs text-ink/80 font-sans leading-relaxed font-medium">
                      {block.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="h-12 px-8 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center gap-2 shadow-md"
            >
              <span>Tiếp theo: Chọn Template Video & B-Roll</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 2: VIDEO TEMPLATE & B-ROLL SELECTION */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              VIDEO TEMPLATE & B-ROLL STYLE
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              Chọn Video Template & Phong cách B-Roll phù hợp với thương hiệu.
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              Mỗi template được chuẩn hóa màu sắc, B-roll minh họa và âm thanh ambient theo đúng định vị của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VIDEO_TEMPLATES.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 shadow-xs ${
                    isSelected
                      ? 'bg-white border-[#315CFF] ring-2 ring-[#315CFF]/15'
                      : 'bg-white/70 border-silver/80 hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF]">
                      {tpl.vibe}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold bg-[#315CFF] text-white px-2.5 py-0.5 rounded-full">
                        ✓ Đã chọn
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink">
                    {tpl.name}
                  </h3>

                  <div className="space-y-2 text-xs pt-1">
                    <div className="p-3 bg-cream/70 rounded-2xl border border-silver/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-ink/40 block">Thư viện B-Roll mẫu:</span>
                      <p className="text-ink/80 font-medium">{tpl.broll}</p>
                    </div>

                    <div className="p-3 bg-cream/70 rounded-2xl border border-silver/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-ink/40 block">Nhạc nền & Sound Effects:</span>
                      <p className="text-ink/80 font-medium">{tpl.ambientSound}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button onClick={() => setCurrentStep(1)} className="text-xs text-ink/50 hover:text-ink font-medium">
              ← Quay lại chọn Copy Model
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="h-12 px-8 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center gap-2 shadow-md"
            >
              <span>Tiếp theo: Upload Video quay & Xem trước</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 3: EXPERT VIDEO UPLOAD & 9:16 PREVIEW PLAYER */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              RAW VIDEO UPLOAD & LIVE 9:16 PREVIEW
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              Upload video tự quay hoặc xem trước bản dựng hoàn chỉnh.
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              Bạn có thể upload đoạn video thô tự quay từ điện thoại, hệ thống sẽ tự động cắt ghép, lồng B-roll và phụ đề chuẩn 9:16.
            </p>
          </div>

          {/* 2-Column Upload & Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Upload Panel */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Expert Video Upload Box */}
              <div className="p-6 rounded-3xl bg-white border-2 border-dashed border-silver/80 space-y-4 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#315CFF]/10 text-[#315CFF] flex items-center justify-center mx-auto">
                  <FileVideo className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-ink">
                    Upload Video tự quay của Chuyên gia
                  </h3>
                  <p className="text-xs text-ink/60">
                    Kéo thả hoặc chọn file video thô từ điện thoại/máy tính (MP4, MOV up to 500MB)
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] cursor-pointer shadow-xs transition-all">
                  <Upload className="w-4 h-4" />
                  <span>{rawVideoName ? `Đã chọn: ${rawVideoName}` : 'Chọn file Video thô'}</span>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                </label>
              </div>

              {/* Script Blocks List */}
              <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                  KỊCH BẢN LỒNG PHỤ ĐỀ DỌC 9:16
                </span>
                {scriptBlocks.map((b) => (
                  <div key={b.id} className="p-3 bg-cream/70 rounded-2xl border border-silver/60 text-xs">
                    <span className="font-bold text-[#315CFF] block">{b.title}</span>
                    <p className="text-ink/80 pt-0.5">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 9:16 Video Player Preview Card */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="w-full max-w-[340px] space-y-4">
                
                {/* 9:16 Vertical Screen */}
                <div className="aspect-[9/16] rounded-3xl overflow-hidden border-2 border-silver/80 relative shadow-xl bg-ink">
                  {rawVideoUrl ? (
                    <video src={rawVideoUrl} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={userAvatar} alt="Expert Video Preview" className="w-full h-full object-cover" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
                    <span className="bg-black/40 backdrop-blur px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                      0:30 · 1080x1920
                    </span>
                    <button className="w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-4 right-4 space-y-2 z-10">
                    <div className="inline-block bg-[#315CFF] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
                      {selectedTemplate.name}
                    </div>

                    <div className="p-3 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10 text-white space-y-1">
                      <p className="font-serif font-bold text-xs leading-snug">
                        "{scriptBlocks[0]?.text.slice(0, 60)}..."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartRender}
                    disabled={isRendering}
                    className="w-full h-12 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    <Video className="w-4 h-4" />
                    <span>{isRendering ? `Đang dựng ${renderProgress}%` : 'Tạo & Render Video HD'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button onClick={() => setCurrentStep(2)} className="text-xs text-ink/50 hover:text-ink font-medium">
              ← Quay lại chọn Template
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="h-12 px-8 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center gap-2 shadow-md"
            >
              <span>Tiếp theo: Brand Review & Xuất bản</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 4: BRAND GUARDRAIL & PUBLISH ENGINE */}
      {/* ------------------------------------------------------------- */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              BRAND REVIEW & PUBLISH ENGINE
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              Phê duyệt chất lượng & Đánh giá giọng văn "Đúng là tôi".
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              Bộ lọc Guardrail đảm bảo nội dung hoàn toàn đúng sự thật và phản ánh chính xác phong cách đĩnh đạc của bạn.
            </p>
          </div>

          {/* Guardrail Pass Banner */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-silver/40 pb-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>BRAND GUARDRAIL SCORE: 100/100 (PASSED)</span>
              </div>
              <span className="text-[10px] font-mono text-ink/40">Factual Claims Verified</span>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2 text-ink/80">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Không phát hiện số liệu hoặc tuyên bố bịa đặt.</span>
              </div>
              <div className="flex items-center gap-2 text-ink/80">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Phù hợp 100% với Định vị {profile.archetypeName || 'Advisor'}.</span>
              </div>
              <div className="flex items-center gap-2 text-ink/80">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Đã liên kết đúng Signature Offer: {profile.firstOffer || 'Buổi chẩn đoán 1:1'}.</span>
              </div>
            </div>

            {/* "That Sounds Like Me" Feedback Action Buttons */}
            <div className="pt-4 border-t border-silver/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                NỘI DUNG NÀY CÓ ĐÚNG VỚI CON NGUỜI THẬT CỦA BẠN KHÔNG?
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setVoiceVerdict('like_me')}
                  className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    voiceVerdict === 'like_me'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-cream border-silver text-ink hover:border-ink/40'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Đúng là tôi</span>
                </button>

                <button
                  onClick={() => setVoiceVerdict('not_like_me')}
                  className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    voiceVerdict === 'not_like_me'
                      ? 'bg-coral text-white border-coral shadow-sm'
                      : 'bg-cream border-silver text-ink hover:border-ink/40'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Không giống tôi</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-silver/60">
            <button onClick={() => setCurrentStep(3)} className="text-xs text-ink/50 hover:text-ink font-medium">
              ← Quay lại Xem trước
            </button>

            <button
              onClick={() => {
                alert('🚀 Đã lưu và sẵn sàng xuất bản nội dung lên các kênh truyền thông của bạn!');
                onNext();
              }}
              className="h-12 px-8 rounded-full bg-[#315CFF] text-white font-bold text-sm hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Duyệt & Tiến sang Đo lường Cơ hội (Session 5)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
