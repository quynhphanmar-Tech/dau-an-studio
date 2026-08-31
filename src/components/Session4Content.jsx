import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Target, Heart, MessageCircle, Handshake, FileText, Video, LayoutGrid, Sparkles, Film, Music, Download, Play, Pause, Copy, Check, Link2, Wand2, RefreshCw, Eye, MoveVertical } from 'lucide-react';
import { synthesizeServerAudio } from '../lib/audioServerEngine';

const CONTENT_GOALS = [
  { id: 'awareness', icon: Target, label: 'Để đúng khách hàng biết đến tôi', color: 'text-accent' },
  { id: 'trust', icon: Heart, label: 'Tạo niềm tin với người đang theo dõi', color: 'text-coral' },
  { id: 'explain', icon: MessageCircle, label: 'Giải thích rõ giá trị dịch vụ', color: 'text-ink' },
  { id: 'connect', icon: Handshake, label: 'Mở ra một cuộc trò chuyện / hợp tác', color: 'text-accent' },
];

const CONTENT_IDEAS = {
  awareness: [
    { title: 'Sai lầm #1 khi chuyển sang làm tự do', why: 'Chạm vào nỗi sợ phổ biến nhất, dễ thu hút người cùng hoàn cảnh', audience: 'Chuyên gia 30-45 tuổi đang cân nhắc nghỉ việc', result: 'Tăng nhận diện với đúng tệp khách hàng mục tiêu', format: 'Bài viết' },
    { title: '3 dấu hiệu bạn đã sẵn sàng ra riêng', why: 'Giúp người đọc tự đánh giá, tạo kết nối cá nhân', audience: 'Người đang bế tắc trong công việc hiện tại', result: 'Thu hút tin nhắn hỏi thăm về dịch vụ', format: 'Carousel' },
    { title: 'Câu chuyện: Ngày đầu tiên tôi không còn nhận lương', why: 'Câu chuyện cá nhân tạo sự đồng cảm mạnh mẽ', audience: 'Bất kỳ ai quan tâm đến tự do tài chính', result: 'Xây dựng hình ảnh chuyên gia đáng tin cậy', format: 'Video ngắn' },
  ],
  trust: [
    { title: 'Hậu trường một buổi tư vấn 1:1 của tôi', why: 'Cho thấy quy trình làm việc thật, tạo niềm tin', audience: 'Người đang theo dõi nhưng chưa quyết định', result: 'Chuyển đổi người theo dõi thành khách hàng tiềm năng', format: 'Video ngắn' },
    { title: 'Kết quả sau 90 ngày đồng hành cùng khách hàng X', why: 'Bằng chứng thực tế tạo uy tín, không cần quảng cáo', audience: 'Người đã biết đến bạn nhưng cần thêm bằng chứng', result: 'Tăng tỷ lệ đặt lịch tư vấn', format: 'Carousel' },
    { title: 'Điều tôi ước mình biết sớm hơn 10 năm trước', why: 'Thể hiện chiều sâu kinh nghiệm, tạo giá trị miễn phí', audience: 'Người mới bắt đầu trong lĩnh vực', result: 'Xây dựng vị thế mentor đáng tin cậy', format: 'Bài viết' },
  ],
  explain: [
    { title: 'Tại sao buổi chẩn đoán 1:1 không phải "tư vấn miễn phí"', why: 'Giải thích giá trị rõ ràng, loại bỏ hiểu nhầm', audience: 'Người đang cân nhắc đặt lịch', result: 'Tăng nhận thức về giá trị dịch vụ, giảm từ chối', format: 'Bài viết' },
    { title: '5 bước trong quy trình đồng hành của tôi', why: 'Minh bạch quy trình tạo niềm tin', audience: 'Khách hàng tiềm năng đang so sánh lựa chọn', result: 'Giúp khách hàng ra quyết định nhanh hơn', format: 'Carousel' },
    { title: 'Ai phù hợp (và ai KHÔNG phù hợp) làm việc với tôi', why: 'Bộ lọc rõ ràng tạo cảm giác chuyên nghiệp', audience: 'Tất cả người theo dõi', result: 'Thu hút đúng người, tiết kiệm thời gian cho cả hai bên', format: 'Video ngắn' },
  ],
  connect: [
    { title: 'Tôi đang tìm 3 chuyên gia để hợp tác trong dự án này', why: 'Trực tiếp mở cửa, thu hút phản hồi ngay', audience: 'Chuyên gia cùng lĩnh vực hoặc bổ trợ', result: 'Mở ra cơ hội hợp tác và mở rộng mạng lưới', format: 'Bài viết' },
    { title: 'AMA: Hỏi tôi bất cứ điều gì về [lĩnh vực]', why: 'Tạo tương tác hai chiều, hiểu rõ nhu cầu thị trường', audience: 'Tất cả người theo dõi', result: 'Thu thập câu hỏi thực tế để tạo nội dung tiếp theo', format: 'Video ngắn' },
    { title: 'Bài học từ cuộc gặp với [người ấn tượng nhất năm nay]', why: 'Kết nối cộng đồng, thể hiện mạng lưới chất lượng', audience: 'Người quan tâm đến tăng trưởng cá nhân', result: 'Xây dựng hình ảnh người kết nối đáng giá', format: 'Carousel' },
  ],
};

export default function Session4Content({ profile, updateProfile, onNext, onBack }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showIdeas, setShowIdeas] = useState(false);
  
  // Output Asset Studio Mode: 'ideas' | 'text' | 'carousel' | 'video' | 'remix'
  const [activeStudioTab, setActiveStudioTab] = useState('ideas');
  const [copied, setCopied] = useState(false);

  // Link Remix State
  const [remixUrl, setRemixUrl] = useState('');
  const [isRemixing, setIsRemixing] = useState(false);
  const [remixedResult, setRemixedResult] = useState(null);

  // Video Studio State
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const ideas = selectedGoal ? CONTENT_IDEAS[selectedGoal] : [];
  const currentIdea = selectedIdea !== null ? ideas[selectedIdea] : null;

  const handleSelectGoal = (goalId) => {
    setSelectedGoal(goalId);
    setSelectedIdea(null);
    setShowIdeas(false);
    setActiveStudioTab('ideas');
    setTimeout(() => setShowIdeas(true), 600);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Remix Link Action
  const handleRemixLink = () => {
    if (!remixUrl.trim()) return;
    setIsRemixing(true);
    setTimeout(() => {
      setIsRemixing(false);
      setRemixedResult({
        originalHook: "Cách tôi xây dựng hệ thống 100M/tháng không cần team",
        remixedHook: `[DÀNH CHO ${profile.whoHelp || 'CHUYÊN GIA'}] Cách đóng gói kinh nghiệm ${profile.yearsExperience || '10+ năm'} thành sản phẩm cố vấn mà không bị kiệt sức`,
        body: `Nhiều người nghĩ làm tư vấn tự do là phải làm 14 tiếng/ngày. Nhưng sự thật là: Nếu bạn đóng gói đúng 1 WHO + 1 OFFER, bạn chỉ cần 3 khách hàng chất lượng.\n\n3 nguyên tắc thực chiến:\n1. Chọn ngách sắc như dao cạo.\n2. Chuẩn bị quỹ sinh tồn 12 tháng.\n3. Tạo buổi chẩn đoán 1:1 giải quyết 1 nỗi đau duy nhất.`
      });
    }, 1500);
  };

  // Speech playback via browser speech API
  const togglePlayVideo = () => {
    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = currentIdea ? currentIdea.title + ". " + currentIdea.why : "Nội dung thương hiệu chuyên gia chất lượng cao.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.93;
        utterance.pitch = 0.95;
        utterance.onend = () => setIsPlayingVideo(false);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlayingVideo(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-ink/40 uppercase tracking-widest">
            Biến thành nội dung · Bước 4/5
          </p>

          {/* Sub-tab Switcher when an idea is selected */}
          {currentIdea && (
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-silver/80 text-xs">
              <button
                onClick={() => setActiveStudioTab('ideas')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  activeStudioTab === 'ideas' ? 'bg-ink text-cream' : 'text-ink/60 hover:text-ink'
                }`}
              >
                Ý tưởng
              </button>
              <button
                onClick={() => setActiveStudioTab('text')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  activeStudioTab === 'text' ? 'bg-ink text-cream' : 'text-ink/60 hover:text-ink'
                }`}
              >
                ✍️ Bài viết
              </button>
              <button
                onClick={() => setActiveStudioTab('carousel')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  activeStudioTab === 'carousel' ? 'bg-ink text-cream' : 'text-ink/60 hover:text-ink'
                }`}
              >
                🎨 Carousel 5-Slide
              </button>
              <button
                onClick={() => setActiveStudioTab('video')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  activeStudioTab === 'video' ? 'bg-ink text-cream' : 'text-ink/60 hover:text-ink'
                }`}
              >
                🎬 Video 9:16
              </button>
            </div>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug">
          Tuần này bạn muốn <span className="highlight-word">nội dung</span> giúp mình điều gì?
        </h1>

        {/* Content Goal Selection */}
        {activeStudioTab === 'ideas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTENT_GOALS.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => handleSelectGoal(goal.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-ink text-cream border-ink'
                        : 'bg-white border-silver/80 hover:border-ink/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isSelected ? 'text-cream' : goal.color}`} />
                    <span className={`text-xs font-semibold ${isSelected ? 'text-cream' : 'text-ink'}`}>{goal.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Paste Link Remixer Shortcut */}
            <div className="bg-white rounded-2xl border border-silver/80 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink">Remix từ Link TikTok / LinkedIn thành công</p>
                  <p className="text-[11px] text-ink/40">Dán link bất kỳ để tái cấu trúc theo góc nhìn chuyên gia của bạn</p>
                </div>
              </div>
              <button
                onClick={() => setActiveStudioTab('remix')}
                className="px-3 py-1.5 rounded-full bg-cream border border-silver text-xs font-semibold text-ink hover:bg-ink hover:text-cream transition-all"
              >
                Thử ngay
              </button>
            </div>

            {/* AI Generated Content Ideas */}
            {selectedGoal && (
              <div className="space-y-4">
                {!showIdeas ? (
                  <div className="flex items-center gap-3 text-ink/50 animate-pulse py-4">
                    <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    <span className="text-sm">Đang tạo 3 ý tưởng nội dung phù hợp với vị thế của bạn...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-medium text-ink/40 uppercase tracking-widest">
                      3 ý tưởng gợi ý riêng cho bạn
                    </p>

                    {ideas.map((idea, i) => {
                      const isSelected = selectedIdea === i;
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedIdea(i)}
                          className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all animate-fade-in ${
                            isSelected ? 'border-ink ring-1 ring-ink/10 shadow-sm' : 'border-silver/80 hover:border-ink/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-serif text-base font-semibold text-ink">"{idea.title}"</h3>
                            <span className="text-[10px] font-semibold bg-cream px-2 py-0.5 rounded border border-silver/60 text-ink/60 shrink-0">
                              {idea.format}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-ink/70 mb-4">
                            <p><strong className="text-ink/40 font-normal">Vì sao hợp:</strong> {idea.why}</p>
                            <p><strong className="text-ink/40 font-normal">Dành cho:</strong> {idea.audience}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-silver/50">
                            <span className="text-[11px] text-emerald-700 font-medium">✓ {idea.result}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedIdea(i); setActiveStudioTab('text'); }}
                                className="px-3 py-1 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all"
                              >
                                Mở Studio Ấn Phẩm
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Studio Tab: Full Post Text Generator */}
        {activeStudioTab === 'text' && currentIdea && (
          <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-silver/50 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">Bài viết chi tiết (LinkedIn / Facebook)</span>
              <button
                onClick={() => handleCopyText(`HÒAN THÀNH BÀI VIẾT:\n\n${currentIdea.title}\n\nNhiều người nghĩ rằng làm tư vấn hay xây thương hiệu cá nhân là phải tạo nội dung mỗi ngày. Nhưng sự thật là: Nếu bạn đóng gói đúng 1 WHO + 1 OFFER, bạn chỉ cần xuất hiện đúng lúc...\n\n3 nguyên tắc thực chiến:\n1. Chọn 1 tệp khách hàng duy nhất có khả năng chi trả.\n2. Chuẩn bị quỹ sinh tồn 12 tháng.\n3. Đóng gói dịch vụ thành giải pháp chuyển đổi rõ ràng.`)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-silver text-xs font-medium text-ink hover:bg-cream transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép bài viết'}</span>
              </button>
            </div>

            <h2 className="font-serif text-xl font-semibold text-ink">"{currentIdea.title}"</h2>

            <div className="text-sm text-ink/80 leading-relaxed space-y-3 font-sans bg-cream/50 p-4 rounded-xl border border-silver/50">
              <p className="font-bold text-ink">HOOK GÂY CHÚ Ý:</p>
              <p>Nhiều người nghĩ rằng có {profile.yearsExperience || '10+ năm'} kinh nghiệm thì cứ ra làm tự do là có khách. Nhưng sự thật là: Chuyên môn giỏi mà không có định vị đúng thì bạn vẫn mãi kiệt sức với giá thấp.</p>
              
              <p className="font-bold text-ink pt-2">NỘI DUNG CHÍNH (3 NGUYÊN TẮC):</p>
              <p>1. <strong>Chọn 1 WHO chuẩn xác:</strong> Tập trung vào nhóm khách hàng {profile.whoHelp || 'chuyển đổi'} thực sự cần giải pháp của bạn.</p>
              <p>2. <strong>Chuẩn bị Quỹ Sinh Tồn:</strong> Giữ tâm thế bình thản bằng quỹ an toàn 12 tháng trước khi nghỉ việc.</p>
              <p>3. <strong>Đóng gói Signature Offer:</strong> Thay vì bán giờ tư vấn lẻ, hãy đóng gói thành buổi chẩn đoán 1:1 rõ giá trị.</p>

              <p className="font-bold text-ink pt-2">LỜI KÊU GỌI (CTA):</p>
              <p>Nếu bạn đang chuẩn bị chuyển đổi, hãy nhắn cho tôi để nhận buổi chẩn đoán 1:1 đầu tiên.</p>
            </div>
          </div>
        )}

        {/* Studio Tab: Notion-Style 5-Slide Carousel */}
        {activeStudioTab === 'carousel' && currentIdea && (
          <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-silver/50 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">Carousel 5-Slide Notion Style</span>
              <button
                onClick={() => alert("Đang xuất bộ 5 slide Notion Carousel định dạng PNG HD!")}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-silver text-xs font-medium text-ink hover:bg-cream transition-all"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Tải trọn bộ Slide (PNG)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 pt-2">
              {[
                { slide: 1, tag: "COVER", title: currentIdea.title, body: `Bởi ${profile.name || 'Chuyên gia'}` },
                { slide: 2, tag: "PAIN", title: "Sai lầm phổ biến", body: "Làm tư vấn tự do nhưng bán thời gian giá rẻ" },
                { slide: 3, tag: "INSIGHT", title: "3 Nguyên tắc", body: "Quỹ 12 tháng + 1 WHO + 1 Offer" },
                { slide: 4, tag: "ACTION", title: "Bước đầu tiên", body: "Đóng gói buổi chẩn đoán 1:1 chuyển đổi" },
                { slide: 5, tag: "CTA", title: "Nhận bản đồ 1:1", body: "Nhắn tin trực tiếp cho tôi" },
              ].map((item) => (
                <div key={item.slide} className="aspect-[4/5] bg-cream rounded-xl border border-silver/80 p-3 flex flex-col justify-between hover:border-ink/40 transition-all">
                  <span className="text-[9px] font-bold tracking-widest text-ink/40 uppercase">{item.tag}</span>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-ink leading-snug">{item.title}</h4>
                    <p className="text-[10px] text-ink/60 mt-1 line-clamp-2">{item.body}</p>
                  </div>
                  <span className="text-[9px] text-ink/30 font-mono text-right">{item.slide}/5</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Studio Tab: 9:16 Vertical Video Studio (Safe Zone & CapCut SFX) */}
        {activeStudioTab === 'video' && currentIdea && (
          <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-silver/50 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">Studio Video Dọc 9:16 Chuẩn Safe Zone</span>
              <button
                onClick={togglePlayVideo}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all"
              >
                {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlayingVideo ? 'Tạm dừng' : 'Phát Video Có Tiếng'}</span>
              </button>
            </div>

            <div className="flex flex-col items-center pt-2">
              <div className="w-full max-w-[280px] aspect-[9/16] bg-ink rounded-[32px] border-4 border-silver/80 relative overflow-hidden flex flex-col justify-between p-4 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between text-white pt-1">
                  <span className="text-[9px] font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded-full">9:16 TikTok / Reels</span>
                  <span className="text-[9px] text-amber-300 font-bold">CapCut SFX On</span>
                </div>

                {/* Video Caption strictly placed below chin / upper chest */}
                <div className="relative z-10 my-auto text-center px-2 space-y-1.5">
                  <div className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-lg uppercase tracking-tight shadow">
                    {currentIdea.title.slice(0, 25)}...
                  </div>
                  <p className="text-[11px] text-white font-semibold bg-black/60 backdrop-blur p-2 rounded-xl border border-white/20 leading-snug">
                    "{currentIdea.why}"
                  </p>
                </div>

                <div className="relative z-10 text-left text-white text-[10px] pb-1">
                  <p className="font-bold">{profile.name || 'Chuyên gia'}</p>
                  <p className="text-white/60 text-[9px]">Dấu Ấn Studio Verified</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Studio Tab: Viral Remixer */}
        {activeStudioTab === 'remix' && (
          <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-4 animate-fade-in-up">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-ink">Viral Remixer — Tái Cấu Trúc Nội Dung</h3>
              <p className="text-xs text-ink/50">Dán bất kỳ link bài viết hoặc video TikTok/LinkedIn nào để AI tự động chuyển hóa thành góc nhìn của bạn.</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={remixUrl}
                onChange={(e) => setRemixUrl(e.target.value)}
                placeholder="Dán link bài viết TikTok / LinkedIn / Facebook vào đây..."
                className="flex-1 bg-cream border border-silver rounded-xl text-xs text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors"
              />
              <button
                onClick={handleRemixLink}
                disabled={isRemixing || !remixUrl.trim()}
                className="px-5 py-2 rounded-xl bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all disabled:opacity-30 flex items-center gap-1.5 shrink-0"
              >
                {isRemixing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                <span>Remix Ngay</span>
              </button>
            </div>

            {remixedResult && (
              <div className="p-4 rounded-xl bg-cream border border-silver/80 space-y-3 text-xs text-ink/80 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] text-ink/40 uppercase tracking-wider font-bold">Tiêu đề gốc:</span>
                  <p className="line-through text-ink/50">{remixedResult.originalHook}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-accent uppercase tracking-wider font-bold">Tiêu đề mới theo ngách của bạn:</span>
                  <p className="font-bold text-ink">{remixedResult.remixedHook}</p>
                </div>

                <div className="pt-2 border-t border-silver/60">
                  <p className="whitespace-pre-line leading-relaxed">{remixedResult.body}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95"
        >
          Theo dõi cơ hội
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
