import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Play, Edit3, ChevronDown, ChevronUp, 
  Sparkles, Volume2, Video, Film, CheckCircle2, Download, Send, 
  Layers, Sliders, RefreshCw, Wand2
} from 'lucide-react';

/**
 * EXPERTPRINT — SESSION 4: TẠO NỘI DUNG / VIDEO
 * Exact Pixel-Perfect Match to Screenshot 2 & Master Spec Section 9
 * Consumes user's uploaded avatar image dynamically.
 */

export default function Session4Content({ profile, updateProfile, onNext, onBack, lang = 'vi' }) {
  const isEn = lang === 'en';

  const userAvatar = profile?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=80';

  // Stepper Step: 1: Ý tưởng, 2: Phong cách, 3: Xem trước, 4: Xuất bản
  const [currentStep, setCurrentStep] = useState(3);

  // Style Mode Pills: 'authentic' | 'expert_view' | 'case_study'
  const [styleMode, setStyleMode] = useState('expert_view');

  // Advanced Accordion State
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Script Blocks State (Editable)
  const [scriptBlocks, setScriptBlocks] = useState([
    {
      id: 'hook',
      title: isEn ? 'Hook' : 'Mở đầu',
      text: 'Nhiều người nghĩ rằng có tiếng làm tín dụng ngân hàng gần 6 năm thì cứ nghỉ việc là tự do. Nhưng sự thật là: Chuyên môn giỏi mà không có định vị đúng thì bạn vẫn mãi làm việc phía sau và bị động.',
      textEn: 'Many people assume that having 6 years of banking credit experience means quitting leads to freedom. But the reality is: Being skilled without clear positioning keeps you trapped behind the scenes.',
      imgUrl: userAvatar,
      isEditing: false
    },
    {
      id: 'core_insight',
      title: isEn ? 'Core Perspective' : 'Góc nhìn chính',
      text: '80% mắc kẹt vì thiếu QUỸ DÒNG TIỀN. Sai lầm 90% mắc phải là bán thời gian thay vì giải pháp. Paid Pain: Mất nguồn thu cố định và không biết đóng gói sản phẩm để có khách hàng ngay.',
      textEn: '80% get stuck due to lacking a CASH FLOW RUNWAY. The 90% mistake is selling hours instead of solutions. Paid Pain: Losing fixed income without packaged offers to land immediate clients.',
      imgUrl: userAvatar,
      isEditing: false
    },
    {
      id: 'cta',
      title: isEn ? 'Call to Action' : 'Kêu gọi hành động',
      text: 'Đừng chỉ giỏi chuyên môn. Hãy học cách định vị — đóng gói — và tạo hệ thống để bạn có khách hàng ngay cả khi chưa có thương hiệu cá nhân.',
      textEn: 'Don’t just be skilled in your craft. Learn how to position, package, and build a system to acquire clients even before your personal brand is famous.',
      imgUrl: userAvatar,
      isEditing: false
    }
  ]);

  // Advanced settings state
  const [presenceMode, setPresenceMode] = useState('human');
  const [selectedLanguage, setSelectedLanguage] = useState('vi');
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

  const handleUpdateScript = (id, newText) => {
    setScriptBlocks(prev => prev.map(b => b.id === id ? { ...b, text: newText, textEn: newText } : b));
  };

  const toggleEditBlock = (id) => {
    setScriptBlocks(prev => prev.map(b => b.id === id ? { ...b, isEditing: !b.isEditing } : b));
  };

  const handleStartRender = () => {
    setIsRendering(true);
    setRenderProgress(10);
    const interval = setInterval(() => {
      setRenderProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          alert(isEn ? 'Video render completed successfully (1080x1920 HD)!' : 'Video đã dựng hoàn tất chuẩn 1080x1920 9:16!');
          return 100;
        }
        return p + 20;
      });
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 min-h-[calc(100vh-140px)] animate-fade-in pb-24 font-sans">
      
      {/* Top Breadcrumb & Stepper */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span className="font-medium text-ink/70">
            {isEn ? 'Create Content / Video' : 'Tạo nội dung / Video'}
          </span>
        </div>

        {/* Stepper: 1 Ý tưởng — 2 Phong cách — 3 Xem trước — 4 Xuất bản */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs text-ink/40 border-b border-silver/50 pb-4 overflow-x-auto custom-scrollbar">
          {[
            { num: 1, label: isEn ? 'Idea' : 'Ý tưởng' },
            { num: 2, label: isEn ? 'Style' : 'Phong cách' },
            { num: 3, label: isEn ? 'Preview' : 'Xem trước' },
            { num: 4, label: isEn ? 'Publish' : 'Xuất bản' },
          ].map((st, i) => {
            const isActive = currentStep === st.num;
            return (
              <React.Fragment key={st.num}>
                <div 
                  onClick={() => setCurrentStep(st.num)}
                  className={`flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors ${
                    isActive ? 'text-ink font-bold' : 'text-ink/50 hover:text-ink'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    isActive ? 'bg-ink text-cream' : 'bg-silver/60 text-ink/70'
                  }`}>
                    {st.num}
                  </span>
                  <span>{st.label}</span>
                </div>
                {i < 3 && <span className="text-silver">—</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Headline & Style Switcher Pills Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div className="space-y-1.5 max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-ink leading-tight tracking-tight">
            {isEn ? 'Turn an idea into a video' : 'Biến một ý tưởng thành video'}
          </h1>
          <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
            {isEn 
              ? 'Script, voice, and visual assets are synced with your brand identity.'
              : 'Nội dung, giọng nói và hình ảnh đã được đồng bộ theo thương hiệu của bạn.'}
          </p>
        </div>

        {/* 3 Style Pills */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-silver/80 text-xs font-semibold shrink-0 shadow-xs">
          {[
            { id: 'authentic', label: isEn ? 'Authentic' : 'Chia sẻ thật' },
            { id: 'expert_view', label: isEn ? 'Expert View' : 'Góc nhìn chuyên gia' },
            { id: 'case_study', label: isEn ? 'Case Study' : 'Case study' },
          ].map((style) => {
            const isSelected = styleMode === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setStyleMode(style.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  isSelected ? 'bg-[#315CFF] text-white shadow-xs' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {style.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: 3 Script Blocks + Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {scriptBlocks.map((block) => (
            <div 
              key={block.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-silver/80 shadow-xs hover:border-ink/30 transition-all flex items-start gap-4"
            >
              {/* Speaker Thumbnail */}
              <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-cream border border-silver shrink-0 relative">
                <img 
                  src={userAvatar} 
                  alt="Speaker Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Script Text & Header */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-ink">
                    {block.title}
                  </h3>
                  <button
                    onClick={() => toggleEditBlock(block.id)}
                    className="p-1 text-ink/40 hover:text-ink transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                {block.isEditing ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={3}
                      value={isEn ? block.textEn : block.text}
                      onChange={(e) => handleUpdateScript(block.id, e.target.value)}
                      className="w-full text-xs sm:text-sm text-ink bg-cream p-2.5 rounded-xl border border-silver focus:border-ink resize-none font-sans"
                    />
                    <button
                      onClick={() => toggleEditBlock(block.id)}
                      className="px-3 py-1 rounded-full bg-ink text-cream text-[10px] font-bold"
                    >
                      {isEn ? 'Save' : 'Lưu'}
                    </button>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-ink/80 font-sans leading-relaxed">
                    {isEn ? block.textEn : block.text}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Accordion: Tinh Chỉnh Nâng Cao */}
          <div className="rounded-2xl bg-cream/70 border border-silver/80 overflow-hidden">
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="w-full p-4 flex items-center justify-between text-xs font-semibold text-ink hover:bg-cream transition-colors"
            >
              <span>{isEn ? 'Advanced Fine-Tuning' : 'Tinh chỉnh nâng cao'}</span>
              {isAdvancedOpen ? <ChevronUp className="w-4 h-4 text-ink/50" /> : <ChevronDown className="w-4 h-4 text-ink/50" />}
            </button>

            {isAdvancedOpen && (
              <div className="p-5 border-t border-silver/60 bg-white space-y-4 text-xs animate-fade-in">
                <div className="space-y-2">
                  <span className="font-bold text-ink/70 block">Cách xuất hiện:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'human', label: 'Người thật' },
                      { id: 'faceless', label: 'Faceless B-Roll' },
                      { id: 'avatar', label: 'AI Avatar' },
                      { id: 'pip', label: 'Hybrid PiP' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPresenceMode(p.id)}
                        className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                          presenceMode === p.id ? 'bg-ink text-cream border-ink' : 'bg-cream border-silver text-ink/70'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="font-bold text-ink/70 block mb-1">Ngôn ngữ kịch bản:</span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-cream border border-silver rounded-xl p-2.5 text-xs text-ink"
                    >
                      <option value="vi">Tiếng Việt (Chuẩn miền Bắc/Nam)</option>
                      <option value="en">English (Global B2B)</option>
                      <option value="ja">日本語 (Business Japanese)</option>
                    </select>
                  </div>

                  <div>
                    <span className="font-bold text-ink/70 block mb-1">Nhạc nền Ambient:</span>
                    <select className="w-full bg-cream border border-silver rounded-xl p-2.5 text-xs text-ink">
                      <option>Ambient Piano 12% (Mặc định)</option>
                      <option>Lo-Fi Focus Beat 10%</option>
                      <option>Không nhạc nền</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 9:16 Video Player Preview Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-[340px] space-y-4">
            
            {/* 9:16 Vertical Video Screen */}
            <div className="aspect-[9/16] rounded-3xl overflow-hidden border-2 border-silver/80 relative shadow-xl bg-ink">
              {/* Speaker Video / Uploaded Avatar Image */}
              <img 
                src={userAvatar} 
                alt="Expert Video Preview" 
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay for Subtitles */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

              {/* Top Bar: 0:20 Timer & Audio Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
                <span className="bg-black/40 backdrop-blur px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                  0:20
                </span>
                <button className="w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60">
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Kinetic Caption in Middle-Bottom */}
              <div className="absolute bottom-8 left-4 right-4 space-y-2 z-10">
                {/* Blue Tag */}
                <div className="inline-block bg-[#315CFF] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
                  {styleMode === 'expert_view' ? 'GÓC NHÌN CHUYÊN GIA' : styleMode === 'authentic' ? 'CHIA SẺ THẬT' : 'CASE STUDY'}
                </div>

                <div className="p-3 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10 text-white space-y-1">
                  <p className="font-serif font-bold text-xs sm:text-sm leading-snug">
                    "80% mắc kẹt vì thiếu QUỸ DÒNG TIỀN."
                  </p>
                  <p className="text-[11px] text-white/70 font-sans leading-tight">
                    Bán thời gian thay vì giải pháp là sai lầm phổ biến nhất.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Render Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(isEn ? 'Playing live preview...' : 'Đang phát video xem thử...')}
                className="flex-1 h-11 rounded-full bg-white border border-silver/80 text-ink text-xs font-semibold hover:border-ink/40 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current text-ink" />
                <span>{isEn ? 'Preview' : 'Xem thử'}</span>
              </button>

              <button
                onClick={handleStartRender}
                disabled={isRendering}
                className="flex-1 h-11 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{isRendering ? `Dựng ${renderProgress}%` : (isEn ? 'Create Video' : 'Tạo video')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
