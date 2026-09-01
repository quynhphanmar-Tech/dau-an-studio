import React, { useState, useEffect } from 'react';
import { Sparkles, Send, CheckCircle2, Quote, Compass, Target, ArrowRight, Heart, Image as ImageIcon } from 'lucide-react';
import { syncReflectionToSupabase } from '../lib/supabaseClient';

/**
 * EXPERTPRINT — HIỂU MÌNH (SELF-DISCOVERY TAB)
 * ═══════════════════════════════════════════════════════════════════
 * Visual Inspirational Quotes + Reflection & 24h Action Commitment
 */

const VISUAL_QUOTES = [
  {
    id: 1,
    category: 'Mục Đích & Định Vị',
    categoryEn: 'Purpose & Positioning',
    quote: 'Thương hiệu cá nhân không phải là biến mình thành người hoàn hảo, mà là dũng cảm mang giá trị thật ra ánh sáng.',
    quoteEn: 'Personal branding is not about faking perfection, but about courageously bringing your authentic value into the light.',
    author: 'ICF Master Coach Principle',
    bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80',
    outcome: 'La bàn Content: Xây dựng bài viết "Vì sao tôi chọn ngách này" (Authentic Story Hook)'
  },
  {
    id: 2,
    category: 'Giá Trị & Cam Kết',
    categoryEn: 'Core Value & Commitment',
    quote: 'Sự rõ ràng tạo ra niềm tin. Niềm tin tạo ra sự chuyển đổi.',
    quoteEn: 'Clarity breeds trust. Trust breeds transformation.',
    author: 'Strategic Positioning Rule',
    bgImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80',
    outcome: 'La bàn Content: Bài viết đóng gói Signature Offer & Giải thích giá trị cốt lõi'
  },
  {
    id: 3,
    category: 'Vượt Qua Rào Cản',
    categoryEn: 'Overcoming Friction',
    quote: 'Vùng an toàn là nơi nuôi dưỡng sự bình ổn, nhưng vùng phát triển mới là nơi trao đi giá trị lớn nhất.',
    quoteEn: 'Comfort yields stability, but your growth zone is where your maximum impact resides.',
    author: 'Executive Leadership Philosophy',
    bgImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&auto=format&fit=crop&q=80',
    outcome: 'La bàn Content: Bài viết phản biện (Contrarian View) về định kiến sai lầm'
  }
];

export default function SelfDiscoveryTab({ profile, updateProfile, lang = 'vi' }) {
  const isEn = lang === 'en';
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userReflection, setUserReflection] = useState('');
  const [actionCommitment, setActionCommitment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedJournal, setSavedJournal] = useState([]);

  const currentQuote = VISUAL_QUOTES[selectedIdx];

  const handleSubmitReflection = () => {
    if (!userReflection.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(isEn ? 'en-US' : 'vi-VN'),
      category: isEn ? currentQuote.categoryEn : currentQuote.category,
      quote: isEn ? currentQuote.quoteEn : currentQuote.quote,
      reflection: userReflection,
      commitment: actionCommitment,
      coachFeedback: isEn
        ? `Coach Acknowledgment: Your deep reflection on "${userReflection.slice(0, 40)}..." is a powerful compass anchor!`
        : `Ghi nhận từ Coach: Sự tự nhận thức sâu sắc của bạn về "${userReflection.slice(0, 40)}..." chính là kim chỉ nam sắc bén cho thương hiệu!`
    };

    setSavedJournal([newEntry, ...savedJournal]);
    syncReflectionToSupabase(newEntry);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* ── Visual Header Card ── */}
      <div className="flex items-center justify-between border-b border-silver/60 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#315CFF]" />
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {isEn ? 'Self-Discovery & Vision' : 'Hiểu Mình & Cảm Hứng Định Vị'}
          </h1>
        </div>
        <span className="text-xs font-mono text-ink/40">
          {new Date().toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
        </span>
      </div>

      {/* ── Quote Category Selector ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {VISUAL_QUOTES.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => { setSelectedIdx(idx); setIsSubmitted(false); setUserReflection(''); setActionCommitment(''); }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedIdx === idx ? 'bg-[#315CFF] text-white shadow-xs' : 'bg-white text-ink/60 hover:text-ink border border-silver/80'
            }`}
          >
            #{idx + 1} {isEn ? item.categoryEn : item.category}
          </button>
        ))}
      </div>

      {/* ── Inspiring Visual Quote Card with Rich Image Background ── */}
      <div className="relative rounded-3xl overflow-hidden min-h-[320px] flex flex-col justify-between p-6 sm:p-10 shadow-xl group transition-all">
        {/* Image Overlay */}
        <img 
          src={currentQuote.bgImage} 
          alt="Inspiring background" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />

        {/* Top Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-amber-300/30">
            ✨ {isEn ? currentQuote.categoryEn : currentQuote.category}
          </span>
          <span className="text-white/70 text-xs font-mono">ICF Coaching Mindset</span>
        </div>

        {/* Visual Quote Text Overlay */}
        <div className="relative z-10 my-6 space-y-3">
          <Quote className="w-8 h-8 text-amber-300/80" />
          <h2 className="font-serif text-xl sm:text-3xl font-normal text-white leading-relaxed tracking-tight italic">
            "{isEn ? currentQuote.quoteEn : currentQuote.quote}"
          </h2>
          <p className="text-xs text-white/70 font-mono text-right">— {currentQuote.author}</p>
        </div>

        {/* Outcome Tag */}
        <div className="relative z-10 pt-3 border-t border-white/20 flex items-center gap-2 text-xs text-amber-200/90 font-medium">
          <Compass className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{currentQuote.outcome}</span>
        </div>
      </div>

      {/* ── Reflection & 24h Action Commitment Form ── */}
      <div className="bg-white rounded-3xl border border-silver/80 p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="font-serif text-lg font-bold text-ink">
          {isEn ? 'Your Reflection & Action Commitment' : 'Suy Ngẫm & Cam Kết Hành Động'}
        </h3>

        {!isSubmitted ? (
          <div className="space-y-4">
            {/* 1. Reflection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink/70 block">
                1. Suy ngẫm của bạn về câu nói trên:
              </label>
              <textarea
                rows={4}
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                placeholder="Viết ra những suy ngẫm thật nhất từ trải nghiệm thực tế của bạn..."
                className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-4 rounded-2xl border border-silver/80 focus:border-ink resize-none"
              />
            </div>

            {/* 2. 24h Commitment */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink/70 block">
                2. Cam kết 1 hành động cụ thể trong 24h tới:
              </label>
              <input
                type="text"
                value={actionCommitment}
                onChange={(e) => setActionCommitment(e.target.value)}
                placeholder="Ví dụ: Đóng gói buổi chẩn đoán 1:1 và chia sẻ 1 câu chuyện trên LinkedIn..."
                className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-3.5 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>

            {/* Submit CTA */}
            <button
              onClick={handleSubmitReflection}
              disabled={!userReflection.trim()}
              className="w-full py-4 rounded-full bg-[#315CFF] text-white font-bold text-xs hover:bg-[#274bdb] transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{isEn ? 'Save Reflection & Lock Commitment' : 'Lưu Suy Ngẫm & Cam Kết Hành Động'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3 text-xs text-emerald-900 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Đã Lưu Suy Ngẫm & Cam Kết 24h!</span>
            </div>

            <p className="italic text-ink/80 bg-white/80 p-3 rounded-xl border border-emerald-100">
              "{savedJournal[0]?.coachFeedback}"
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="font-semibold text-emerald-700">
                Cam kết 24h: <strong>{actionCommitment || 'Đã ghi nhận'}</strong>
              </span>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-[#315CFF] hover:underline"
              >
                Viết thêm suy ngẫm mới
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Saved Journal History ── */}
      {savedJournal.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-serif text-base font-bold text-ink">Lịch sử Suy ngẫm & Cam kết:</h4>
          <div className="space-y-2.5">
            {savedJournal.map((j) => (
              <div key={j.id} className="bg-white rounded-2xl border border-silver/80 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-ink/40 text-[10px]">
                  <span>{j.date}</span>
                  <span className="font-bold text-[#315CFF]">{j.category}</span>
                </div>
                <p className="font-serif italic text-ink/80">"{j.quote}"</p>
                <p className="text-ink font-medium bg-cream/50 p-2.5 rounded-xl border border-silver/60">Suy ngẫm: "{j.reflection}"</p>
                {j.commitment && <p className="text-emerald-700 font-bold">🎯 Cam kết: {j.commitment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
