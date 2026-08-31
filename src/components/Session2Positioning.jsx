import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, Image, Palette, Type, Edit3, HelpCircle } from 'lucide-react';
import { BRAND_ARCHETYPES } from '../data/brandVibes';

export default function Session2Positioning({ profile, updateProfile, onNext, onBack }) {
  const [subStep, setSubStep] = useState(0); // 0: Archetype & Pinterest Moodboard, 1: 3 Pillar Cards
  const [selectedArchetypeId, setSelectedArchetypeId] = useState(profile.archetypeId || BRAND_ARCHETYPES[0].id);

  // Card states: 'pending' | 'correct' | 'needs-help'
  const [cardStates, setCardStates] = useState({
    who: 'pending',
    what: 'pending',
    why: 'pending',
  });

  const [editingCard, setEditingCard] = useState(null);
  const [editValue, setEditValue] = useState('');

  const currentArchetype = BRAND_ARCHETYPES.find(a => a.id === selectedArchetypeId) || BRAND_ARCHETYPES[0];

  // Generate positioning statement from profile
  const defaultStatement = profile.name
    ? `Bạn giúp ${profile.whoHelp || 'chuyên gia đang chuyển sang làm tự do'} ${profile.whatChange || 'xây quỹ an toàn 12 tháng trước khi rời công việc'}.`
    : 'Bạn giúp phụ nữ đang chuyển sang làm tự do xây quỹ an toàn trước khi rời công việc.';

  const cards = [
    {
      key: 'who',
      question: 'Bạn đang giúp ai?',
      answer: profile.whoHelp || 'Chuyên gia 30-45 tuổi đang chuyển từ công việc toàn thời gian sang tự do / tư vấn độc lập',
      field: 'whoHelp',
    },
    {
      key: 'what',
      question: 'Bạn giúp họ thay đổi điều gì?',
      answer: profile.whatChange || 'Xây dựng nền tảng tài chính và định vị rõ ràng để có khách hàng đầu tiên trong 90 ngày',
      field: 'whatChange',
    },
    {
      key: 'why',
      question: 'Vì sao họ nên tin bạn?',
      answer: profile.whyTrust || `${profile.yearsExperience || '10+ năm'} kinh nghiệm thực chiến, đã đồng hành cùng 60+ chuyên gia chuyển đổi thành công`,
      field: 'whyTrust',
    },
  ];

  const allConfirmed = Object.values(cardStates).every(s => s === 'correct');

  const handleSelectArchetype = (arch) => {
    setSelectedArchetypeId(arch.id);
    updateProfile({
      archetypeId: arch.id,
      archetypeName: arch.name,
      brandVibe: arch.vibe,
      brandColors: arch.colors,
      brandFonts: arch.fonts,
      pinterestTag: arch.pinterestTag
    });
  };

  const handleCardAction = (key, action) => {
    if (action === 'correct') {
      setCardStates(prev => ({ ...prev, [key]: 'correct' }));
      const card = cards.find(c => c.key === key);
      if (card) updateProfile({ [card.field]: card.answer });
    } else if (action === 'needs-help') {
      setEditingCard(key);
      setEditValue('');
    }
  };

  const handleSaveEdit = (key) => {
    const card = cards.find(c => c.key === key);
    if (card && editValue.trim()) {
      updateProfile({ [card.field]: editValue.trim() });
    }
    setCardStates(prev => ({ ...prev, [key]: 'correct' }));
    setEditingCard(null);
    setEditValue('');
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      {/* Main Area */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs font-medium text-ink/40 uppercase tracking-widest mb-4">
          Chọn hướng xuất hiện · Bước 2/5
        </p>

        {/* Sub-step 0: Archetype & Pinterest Moodboard Selector */}
        {subStep === 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug">
              Hình mẫu & <span className="highlight-word">phong cách visual</span> của bạn là gì?
            </h1>
            <p className="text-sm text-ink/50">
              Chọn hình mẫu thương hiệu để tự động định hình màu sắc, phông chữ và văn phong Pinterest phù hợp.
            </p>

            {/* Archetype Cards */}
            <div className="space-y-3">
              {BRAND_ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetypeId === arch.id;
                return (
                  <div
                    key={arch.id}
                    onClick={() => handleSelectArchetype(arch)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-ink ring-1 ring-ink/10 shadow-md'
                        : 'bg-white/60 border-silver/80 hover:border-ink/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-serif text-base font-semibold text-ink">{arch.name}</h3>
                      {isSelected && <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">Đang chọn</span>}
                    </div>

                    <p className="text-xs text-ink/70 mb-3">{arch.tagline}</p>

                    {/* Pinterest Visual Palette Bar */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-silver/50 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {arch.colors.map((c, i) => (
                          <div key={i} className="w-4 h-4 rounded-full border border-silver/60" style={{ backgroundColor: c }} />
                        ))}
                        <span className="text-ink/40 text-[10px] ml-1">{arch.vibe}</span>
                      </div>
                      <span className="text-ink/50 font-serif italic text-[10px]">{arch.fonts.display.split('(')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pinterest Moodboard Benchmark Card */}
            <div className="bg-white rounded-2xl border border-silver/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-accent" />
                  Pinterest Visual Moodboard Benchmark:
                </span>
                <span className="text-[10px] font-mono text-ink/40 bg-cream px-2 py-0.5 rounded border border-silver">
                  {currentArchetype.pinterestTag}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-cream rounded-xl border border-silver/60 space-y-1">
                  <span className="text-[10px] text-ink/40 font-bold uppercase flex items-center gap-1">
                    <Type className="w-3 h-3 text-ink" /> Typography System
                  </span>
                  <p className="font-serif font-bold text-ink text-xs">{currentArchetype.fonts.display}</p>
                  <p className="text-ink/50 text-[10px]">{currentArchetype.fonts.body}</p>
                </div>

                <div className="p-3 bg-cream rounded-xl border border-silver/60 space-y-1">
                  <span className="text-[10px] text-ink/40 font-bold uppercase flex items-center gap-1">
                    <Palette className="w-3 h-3 text-accent" /> Palette Màu Nhận Diện
                  </span>
                  <p className="text-ink/80 text-[11px] font-medium">{currentArchetype.colorNames}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSubStep(1)}
              className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95"
            >
              Tiếp tục chốt 3 trụ cột
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sub-step 1: 3 Confirmation Cards with Full Editing */}
        {subStep === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="font-serif text-3xl font-semibold text-ink leading-snug mb-2">
              Xác nhận <span className="highlight-word">3 trụ cột</span> định vị.
            </h1>
            <p className="text-sm text-ink/50 mb-4">
              Mỗi thẻ bên dưới đúng chưa? Bạn có thể chỉnh sửa tự do hoặc để AI gọi tên giúp.
            </p>

            <div className="space-y-4">
              {cards.map((card, i) => (
                <div
                  key={card.key}
                  className={`bg-white rounded-2xl border p-5 transition-all animate-fade-in ${
                    cardStates[card.key] === 'correct'
                      ? 'border-ink/20'
                      : 'border-silver/80'
                  }`}
                >
                  <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                    {card.question}
                  </p>

                  {editingCard === card.key ? (
                    <div className="space-y-3">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Chỉnh sửa hoặc bổ sung thông tin theo ý bạn..."
                        rows={2}
                        autoFocus
                        className="w-full bg-cream border border-silver rounded-xl text-sm text-ink p-3 placeholder:text-silver resize-none focus:border-ink/30 transition-colors"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEdit(card.key)}
                          className="px-4 py-1.5 bg-ink text-cream text-xs font-semibold rounded-full hover:bg-ink/90"
                        >
                          Lưu cập nhật
                        </button>
                        <button
                          onClick={() => setEditingCard(null)}
                          className="text-xs text-ink/40 hover:text-ink"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-ink leading-relaxed mb-4">
                        {card.answer}
                      </p>

                      {cardStates[card.key] === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCardAction(card.key, 'correct')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-ink text-xs font-semibold text-ink hover:bg-ink hover:text-cream transition-all"
                          >
                            Đúng
                          </button>
                          <span className="text-ink/20">·</span>
                          <button
                            onClick={() => handleCardAction(card.key, 'needs-help')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-silver text-xs font-medium text-ink/60 hover:border-ink/40 transition-all"
                          >
                            <Edit3 className="w-3 h-3" /> Chỉnh sửa / Bổ sung
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-xs text-ink/50">
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <Check className="w-3.5 h-3.5" /> Đã xác nhận
                          </span>
                          <button
                            onClick={() => { setEditingCard(card.key); setEditValue(card.answer); }}
                            className="text-accent text-[11px] font-semibold hover:underline"
                          >
                            Sửa lại
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {allConfirmed && (
              <div className="bg-white rounded-xl border border-accent/20 p-4 animate-fade-in space-y-2">
                <p className="text-sm font-serif font-bold text-ink">
                  "{defaultStatement}"
                </p>
                <p className="text-xs text-ink/60 italic">
                  "Tuyệt vời. 3 trụ cột và hình mẫu [{currentArchetype.name}] đã sẵn sàng."
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 pb-4 flex items-center justify-between">
        <button
          onClick={subStep > 0 ? () => setSubStep(subStep - 1) : onBack}
          className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        {subStep === 1 && allConfirmed && (
          <button
            onClick={() => {
              updateProfile({
                positioningStatement: defaultStatement,
                readinessNote: '3 trụ cột đã rõ ràng — sẵn sàng đóng gói giá trị.',
              });
              onNext();
            }}
            className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95"
          >
            Đóng gói giá trị
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
