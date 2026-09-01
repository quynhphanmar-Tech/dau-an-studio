import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Sparkles, Image, Palette, Type, Edit3, 
  HelpCircle, Eye, ShieldCheck, ThumbsUp, ThumbsDown, Layers, Quote, X, Award 
} from 'lucide-react';
import { BRAND_ARCHETYPES } from '../data/brandVibes';

/**
 * EXPERTPRINT — SESSION 2: ĐỊNH VỊ & VISUAL DNA (DEFINE PHASE)
 * Built strictly according to 5 core principles from screenshots:
 * 1. Identity Recognition (Text + Image selection per Archetype)
 * 2. Positioning-Driven Visual DNA (Brand Strategy -> Visual Principle -> Design System)
 * 3. Signature Assets Builder (Belief, Framework, Phrase, Story)
 * 4. "That Sounds Like Me" Voice Fingerprint Engine
 * 5. MBE Criteria & Brand Opportunity Generated
 */

export default function Session2Positioning({ profile, updateProfile, onNext, onBack, lang = 'vi' }) {
  const isEn = lang === 'en';

  // Sub-step: 
  // 0: Identity Recognition (Text + Image Visual Selection)
  // 1: Positioning-Driven Visual DNA
  // 2: Signature Assets Builder
  // 3: "That Sounds Like Me" Voice Preview & Approval
  const [subStep, setSubStep] = useState(0);

  const [selectedArchetypeId, setSelectedArchetypeId] = useState(profile.archetypeId || BRAND_ARCHETYPES[0].id);
  const [previewImage, setPreviewImage] = useState(null);

  // Signature Assets State
  const [signatureAssets, setSignatureAssets] = useState({
    framework: profile.signatureFramework || (isEn ? '3-Stage Growth Runway' : 'Khung 3 Tầng Tăng Trưởng Dòng Tiền An Toàn'),
    belief: profile.signatureBelief || (isEn ? 'Not all growth is worth chasing without cash runway' : 'Không phải mọi sự tăng trưởng đều đáng theo đuổi nếu thiếu quỹ an toàn'),
    phrase: profile.signaturePhrase || (isEn ? 'Strategy & positioning before tactics' : 'Định vị & Đóng gói sản phẩm trước khi chạy quảng cáo'),
    story: profile.signatureStory || (isEn ? 'Turning around 60+ experts to independent practice' : 'Hành trình đồng hành cùng 60+ chuyên gia chuyển đổi sự nghiệp tự do')
  });

  // "That Sounds Like Me" Feedback State
  const [voiceVerdict, setVoiceVerdict] = useState(null); // 'like_me' | 'not_like_me'
  const [rejectReason, setRejectReason] = useState('');

  const currentArchetype = BRAND_ARCHETYPES.find(a => a.id === selectedArchetypeId) || BRAND_ARCHETYPES[0];

  // Visual Principle Inference based on positioning
  const getVisualPrinciple = () => {
    if (selectedArchetypeId === 'sage-mentor') {
      return {
        keywords: 'Calm / Human / Reflective / Editorial',
        description: isEn ? 'Deep diagnostic authority with warm, human editorial elegance.' : 'Uy tín chẩn đoán sâu sắc kết hợp tinh thần editorial ấm áp, chân thật.'
      };
    } else if (selectedArchetypeId === 'visionary-architect') {
      return {
        keywords: 'Conceptual / Bold / High-Contrast / Precision',
        description: isEn ? 'Forward-thinking system architecture with sharp structural confidence.' : 'Tầm nhìn kiến tạo hệ thống với tính chuẩn xác và sự sắc bén cao.'
      };
    } else if (selectedArchetypeId === 'pragmatic-leader') {
      return {
        keywords: 'Precision / Restraint / Confidence / Minimalist',
        description: isEn ? 'Pragmatic, high-leverage execution with minimal distraction.' : 'Thực chiến tối ưu nguồn lực, tối giản và tự tin đo lường bằng kết quả.'
      };
    } else {
      return {
        keywords: 'Authentic / Dynamic / Storytelling / Warmth',
        description: isEn ? 'Inspiring personal stories with genuine human connection.' : 'Truyền cảm hứng từ trải nghiệm thật và sự kết nối nhân văn sâu sắc.'
      };
    }
  };

  const visualPrinciple = getVisualPrinciple();

  const handleSelectArchetype = (arch) => {
    setSelectedArchetypeId(arch.id);
    updateProfile({
      archetypeId: arch.id,
      archetypeName: isEn ? arch.nameEn : arch.name,
      brandVibe: arch.vibe,
      brandColors: arch.colors,
      brandFonts: arch.fonts,
      pinterestTag: arch.pinterestTag
    });
  };

  const handleApproveSession2 = () => {
    updateProfile({
      signatureFramework: signatureAssets.framework,
      signatureBelief: signatureAssets.belief,
      signaturePhrase: signatureAssets.phrase,
      signatureStory: signatureAssets.story,
      visualPrinciple: visualPrinciple.keywords,
      voiceVerdict: voiceVerdict,
      positioningConfirmedAt: new Date().toISOString()
    });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-140px)] flex flex-col justify-between animate-fade-in font-sans pb-24">
      
      {/* Sub-step Navigation Header */}
      <div className="space-y-3 border-b border-silver/60 pb-4 mb-6">
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
            THƯƠNG HIỆU CỦA TÔI · ĐỊNH VỊ 02
          </span>
          <span className="font-mono text-[11px] text-ink/40">
            {subStep + 1}/4
          </span>
        </div>

        {/* Stepper Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium border-b border-silver/40 pb-2 overflow-x-auto custom-scrollbar">
          {[
            { id: 0, label: isEn ? '1. Visual Recognition' : '1. Nhận diện giọng & Visual' },
            { id: 1, label: isEn ? '2. Visual DNA' : '2. Nguyên tắc Visual DNA' },
            { id: 2, label: isEn ? '3. Signature Assets' : '3. Tài sản độc bản' },
            { id: 3, label: isEn ? '4. "Sounds Like Me"' : '4. Thử nghiệm giọng văn' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSubStep(st.id)}
              className={`pb-1 px-1 whitespace-nowrap transition-colors border-b-2 ${
                subStep === st.id
                  ? 'border-[#315CFF] text-[#315CFF] font-bold'
                  : 'border-transparent text-ink/50 hover:text-ink'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-STEP 0: IDENTITY RECOGNITION (TEXT + IMAGE SELECTION) */}
      {/* ------------------------------------------------------------- */}
      {subStep === 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              {isEn ? 'Which voice sample & visual mood feels most like you?' : 'Câu nào và phong cách visual nào giống cách bạn muốn xuất hiện nhất?'}
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              {isEn 
                ? 'Don’t choose by abstract terms. Select the sample phrase and image moodboard that resonates with your authentic style.'
                : 'Thay vì dùng tính từ chung chung, hãy chọn đoạn văn mẫu và hình ảnh minh họa giống phong cách thật của bạn nhất.'}
            </p>
          </div>

          {/* 4 Archetypes Selection Cards (Text + Image) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRAND_ARCHETYPES.map((arch) => {
              const isSelected = selectedArchetypeId === arch.id;
              return (
                <div
                  key={arch.id}
                  onClick={() => handleSelectArchetype(arch)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3.5 shadow-xs ${
                    isSelected
                      ? 'bg-white border-[#315CFF] ring-2 ring-[#315CFF]/15'
                      : 'bg-white/80 border-silver/80 hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF]">
                      {arch.vibe}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold bg-[#315CFF] text-white px-2.5 py-0.5 rounded-full">
                        ✓ {isEn ? 'Selected' : 'Đã chọn'}
                      </span>
                    )}
                  </div>

                  {/* Archetype Name */}
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {isEn ? arch.nameEn : arch.name}
                  </h3>

                  {/* Sample Voice Phrase (Identical to Spec Screenshot 5) */}
                  <div className="p-3 bg-cream/70 rounded-2xl border border-silver/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                      {isEn ? 'Sample Voice Phrase:' : 'Đoạn nói mẫu đặc trưng:'}
                    </span>
                    <p className="font-serif italic text-xs text-ink/90">
                      "{arch.sampleQuote || (arch.id === 'sage-mentor' 
                        ? '3 vấn đề khiến SME tăng doanh thu nhưng không tăng lợi nhuận...' 
                        : arch.id === 'visionary-architect' 
                        ? 'Personal branding không bắt đầu từ việc chạy theo bài đăng viral...' 
                        : '10 năm trước tôi từng nghĩ làm thương hiệu nghĩa là...')}"
                    </p>
                  </div>

                  {/* Pinterest Visual Reference Images */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {arch.sampleImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setPreviewImage(imgUrl); }}
                        className="aspect-[4/3] rounded-xl overflow-hidden border border-silver/60 bg-cream relative group shadow-2xs"
                      >
                        <img src={imgUrl} alt="Visual benchmark" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setSubStep(1)}
              className="h-11 px-7 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{isEn ? 'Next: Visual DNA Principles' : 'Tiếp theo: Nguyên tắc Visual DNA'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-STEP 1: POSITIONING-DRIVEN VISUAL DNA (SPEC SCREENSHOT 1) */}
      {/* ------------------------------------------------------------- */}
      {subStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              POSITIONING-DRIVEN VISUAL DNA
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              {isEn ? 'Visual principles must serve your positioning.' : 'Visual của Chuyên gia phải phục vụ Định vị.'}
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              {isEn 
                ? 'AI infers your Visual Principles directly from your brand strategy, not just favorite colors.'
                : 'ExpertPrint suy luận nguyên tắc thiết kế từ định vị thương hiệu: Brand Personality → Visual Principle → Design System.'}
            </p>
          </div>

          {/* Inferred Visual Principle Card */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-accent">
              <Palette className="w-5 h-5 text-[#315CFF]" />
              <h3 className="font-serif text-lg font-bold text-ink">
                {isEn ? 'Inferred Visual Direction:' : 'Hướng Visual suy luận cho bạn:'}
              </h3>
            </div>

            <div className="p-4 bg-cream/70 rounded-2xl border border-silver/60 space-y-2">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#315CFF] block">
                VISUAL PRINCIPLE
              </span>
              <p className="font-serif text-xl font-bold text-ink">
                {visualPrinciple.keywords}
              </p>
              <p className="text-xs text-ink/70 font-sans leading-relaxed">
                {visualPrinciple.description}
              </p>
            </div>

            {/* Design Tokens Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cream/50 border border-silver/60 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">Bảng màu chuẩn (Palette Tokens)</span>
                <div className="flex items-center gap-2">
                  {currentArchetype.colors.map((c, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full border border-silver" style={{ backgroundColor: c }} />
                      <span className="font-mono text-[10px] text-ink/60">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream/50 border border-silver/60 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">Typography Roles</span>
                <p className="font-serif font-bold text-ink">Playfair Display (Display/Serif)</p>
                <p className="font-sans text-ink/70">Be Vietnam Pro (UI/Body Sans)</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setSubStep(0)}
              className="text-xs text-ink/50 hover:text-ink font-medium"
            >
              ← {isEn ? 'Back' : 'Quay lại'}
            </button>

            <button
              onClick={() => setSubStep(2)}
              className="h-11 px-7 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{isEn ? 'Next: Build Signature Assets' : 'Tiếp theo: Xây Signature Assets'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-STEP 2: SIGNATURE ASSETS BUILDER (SPEC SCREENSHOT 2) */}
      {/* ------------------------------------------------------------- */}
      {subStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              SIGNATURE BRAND ASSETS
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              {isEn ? 'Build repeatable Signature Assets for memory structure.' : 'Xây dựng Signature Assets lặp đi lặp lại.'}
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              {isEn 
                ? 'A strong brand has distinct frameworks, beliefs, and phrases that create memory structure in your audience’s mind.'
                : 'Thương hiệu mạnh luôn sở hữu những assets lặp đi lặp lại để tạo cấu trúc ghi nhớ (memory structure) trong tâm trí khách hàng.'}
            </p>
          </div>

          {/* 4 Signature Assets Cards */}
          <div className="space-y-4">
            
            {/* 1. Signature Framework */}
            <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-2 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF] block">
                1. SIGNATURE FRAMEWORK (KHUNG PHƯƠNG PHÁP CỐT LÕI)
              </span>
              <input
                type="text"
                value={signatureAssets.framework}
                onChange={(e) => setSignatureAssets(prev => ({ ...prev, framework: e.target.value }))}
                className="w-full font-serif text-base font-bold text-ink bg-cream/60 p-3 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>

            {/* 2. Signature Belief */}
            <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-2 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF] block">
                2. SIGNATURE BELIEF (NIỀM TIN THƯƠNG HIỆU NHẤT QUÁN)
              </span>
              <input
                type="text"
                value={signatureAssets.belief}
                onChange={(e) => setSignatureAssets(prev => ({ ...prev, belief: e.target.value }))}
                className="w-full font-serif text-base font-bold text-ink bg-cream/60 p-3 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>

            {/* 3. Signature Phrase */}
            <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-2 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF] block">
                3. SIGNATURE PHRASE (CỤM TỪ DẤU ẤN LẶP LẠI)
              </span>
              <input
                type="text"
                value={signatureAssets.phrase}
                onChange={(e) => setSignatureAssets(prev => ({ ...prev, phrase: e.target.value }))}
                className="w-full font-serif text-base font-bold text-ink bg-cream/60 p-3 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>

            {/* 4. Signature Story */}
            <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-2 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF] block">
                4. SIGNATURE STORY (CÂU CHUYỆN BIỂU TƯỢNG)
              </span>
              <input
                type="text"
                value={signatureAssets.story}
                onChange={(e) => setSignatureAssets(prev => ({ ...prev, story: e.target.value }))}
                className="w-full font-serif text-base font-bold text-ink bg-cream/60 p-3 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setSubStep(1)}
              className="text-xs text-ink/50 hover:text-ink font-medium"
            >
              ← {isEn ? 'Back' : 'Quay lại'}
            </button>

            <button
              onClick={() => setSubStep(3)}
              className="h-11 px-7 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{isEn ? 'Next: "That Sounds Like Me"' : 'Tiếp theo: Thử nghiệm giọng văn'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUB-STEP 3: "THAT SOUNDS LIKE ME" VOICE ENGINE (SCREENSHOT 4) */}
      {/* ------------------------------------------------------------- */}
      {subStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              VOICE FINGERPRINT ENGINE
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
              {isEn ? 'Test Voice Aligned Content: "That Sounds Like Me"' : 'Định giá Giọng văn: "Đúng là tôi"'}
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              {isEn 
                ? 'Review an AI-generated draft aligned with your Positioning & DNA. Provide feedback to refine your Voice Fingerprint.'
                : 'Hãy thử nghiệm một kịch bản AI tạo theo Định vị & DNA của bạn. Phản hồi giúp AI tự học phong cách chân thật nhất.'}
            </p>
          </div>

          {/* Draft Preview Card */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-silver/40 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF]">
                BẢN NHÁP AI TẠO THEO VOICE DẤU ẤN
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Pass Brand Guardrail
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-ink">
                "Đừng chỉ bán thời gian — Hãy đóng gói 10+ năm chuyên môn thành Signature Offer."
              </h3>
              <p className="text-xs sm:text-sm text-ink/80 font-sans leading-relaxed">
                Nhiều người nghĩ có 10 năm kinh nghiệm thì cứ nghỉ việc là có tự do. Nhưng sự thật là: Chuyên môn giỏi mà không có định vị đúng thì bạn vẫn mãi làm việc phía sau và bị động.
              </p>
            </div>

            {/* "That Sounds Like Me" Feedback Action Buttons (Exact Screenshot 4 Match) */}
            <div className="pt-3 border-t border-silver/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                BẢN NHÁP NÀY CÓ GIỐNG CÁCH BẠN MÓN NÓI KHÔNG?
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setVoiceVerdict('like_me'); setRejectReason(''); }}
                  className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    voiceVerdict === 'like_me'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white border-silver text-ink hover:border-ink/40'
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
                      : 'bg-white border-silver text-ink hover:border-ink/40'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Không giống tôi</span>
                </button>
              </div>

              {/* Reject Reasons Options (Screenshot 4 Match) */}
              {voiceVerdict === 'not_like_me' && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs text-amber-900 animate-fade-in font-sans">
                  <span className="font-bold block">Cho Coach biết thêm lý do:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Quá bán hàng',
                      'Quá khoa trương',
                      'Quá học thuật',
                      'Quá sáo rỗng',
                      'Không giống cách tôi nói',
                      'Ý không phải của tôi'
                    ].map((reason, i) => (
                      <button
                        key={i}
                        onClick={() => setRejectReason(reason)}
                        className={`p-2 rounded-xl text-left border text-[11px] font-medium transition-all ${
                          rejectReason === reason
                            ? 'bg-amber-900 text-white border-amber-900'
                            : 'bg-white border-amber-200 text-amber-900 hover:border-amber-400'
                        }`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Final Approve & Save Button */}
          <div className="pt-4 flex items-center justify-between border-t border-silver/60">
            <button
              onClick={() => setSubStep(2)}
              className="text-xs text-ink/50 hover:text-ink font-medium"
            >
              ← {isEn ? 'Back' : 'Quay lại'}
            </button>

            <button
              onClick={handleApproveSession2}
              className="h-12 px-8 rounded-full bg-[#315CFF] text-white font-bold text-sm hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
            >
              <span>{isEn ? 'Approve & Save Brand Identity' : 'Duyệt & Lưu Định Vị Thương Hiệu'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-4 space-y-3 relative shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-cream hover:bg-silver/40 text-ink/70"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={previewImage} alt="Pinterest Benchmark Preview" className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-ink/60 text-center font-mono pt-1">
              Pinterest Visual Image Benchmark Reference
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
