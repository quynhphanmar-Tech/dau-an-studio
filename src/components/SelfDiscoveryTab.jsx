import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Send, CheckCircle2, Award, Quote, Calendar, Lightbulb, Compass, Target, ArrowRight } from 'lucide-react';
import { syncReflectionToSupabase } from '../lib/supabaseClient';

const DAILY_ICF_QUESTIONS = [
  {
    id: 1,
    category: 'Mục Đích & Định Vị (Purpose & Positioning)',
    categoryEn: 'Purpose & Positioning',
    question: 'Điều gì trong trải nghiệm thật của bạn khiến bạn tin rằng mình là người phù hợp nhất để đồng hành cùng khách hàng này?',
    questionEn: 'What in your authentic journey makes you uniquely qualified to guide your target audience today?',
    compassOutcome: 'La bàn Content: Xây dựng bài viết "Vì sao tôi chọn ngách này" (Authority & Empathy Hook)',
    compassOutcomeEn: 'Content Compass: Create an "Authentic Story & Why Me" post',
    quote: 'Thương hiệu cá nhân không phải là biến mình thành một người hoàn hảo, mà là dũng cảm mang giá trị thật ra ánh sáng.',
    quoteEn: 'Personal branding is not about faking perfection, but about courageously bringing your authentic value into the light.',
    author: 'ICF Master Coach Principle'
  },
  {
    id: 2,
    category: 'Giá Trị & Cam Kết (Core Value & Commitment)',
    categoryEn: 'Core Value & Commitment',
    question: 'Nếu chỉ được trao cho khách hàng 1 kết quả lớn nhất trong 90 ngày, đó sẽ là thay đổi cụ thể nào?',
    questionEn: 'If you could deliver only ONE major transformation in 90 days, what exact result would it be?',
    compassOutcome: 'La bàn Content: Bài viết đóng gói Signature Offer & Giải thích giá trị cốt lõi',
    compassOutcomeEn: 'Content Compass: Signature Offer & Core Transformation Value post',
    quote: 'Sự rõ ràng tạo ra niềm tin. Niềm tin tạo ra sự chuyển đổi.',
    quoteEn: 'Clarity breeds trust. Trust breeds transformation.',
    author: 'Strategic Positioning Rule'
  },
  {
    id: 3,
    category: 'Vượt Qua Rào Cản (Overcoming Friction)',
    categoryEn: 'Overcoming Friction',
    question: 'Nỗi sợ hoặc điểm nghẽn lớn nhất đang giữ bạn lại chưa đóng gói chuyên môn thành giá trị cao hơn là gì?',
    questionEn: 'What single internal friction or limiting belief is holding you back from high-ticket packaging?',
    compassOutcome: 'La bàn Content: Bài viết phản biện (Contrarian view) về những định kiến sai lầm trong ngành',
    compassOutcomeEn: 'Content Compass: Contrarian view post dismantling industry myths',
    quote: 'Vùng an toàn là nơi nuôi dưỡng sự bình ổn, nhưng vùng phát triển mới là nơi trao đi giá trị lớn nhất.',
    quoteEn: 'Comfort yields stability, but your growth zone is where your maximum impact resides.',
    author: 'Executive Leadership Philosophy'
  }
];

export default function SelfDiscoveryTab({ profile, updateProfile, lang = 'vi' }) {
  const isEn = lang === 'en';
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [userReflection, setUserReflection] = useState('');
  const [actionCommitment, setActionCommitment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedJournal, setSavedJournal] = useState([]);

  const q = DAILY_ICF_QUESTIONS[selectedQuestionIdx];

  const handleSubmitReflection = () => {
    if (!userReflection.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(isEn ? 'en-US' : 'vi-VN'),
      category: isEn ? q.categoryEn : q.category,
      question: isEn ? q.questionEn : q.question,
      reflection: userReflection,
      commitment: actionCommitment,
      coachFeedback: isEn
        ? `Coach Acknowledgment: Your deep self-awareness on "${userReflection.slice(0, 40)}..." is a powerful compass anchor. Commit to taking your 24h action!`
        : `Ghi nhận từ Coach: Sự tự nhận thức sâu sắc của bạn về "${userReflection.slice(0, 40)}..." chính là kim chỉ nam sắc bén. Hãy giữ vững cam kết hành động 24h này!`
    };

    setSavedJournal([newEntry, ...savedJournal]);
    syncReflectionToSupabase(newEntry);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in-up">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-silver/80 p-6 md:p-8 space-y-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-silver/50 pb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-coral" />
            <span className="text-xs font-bold uppercase tracking-wider text-coral">
              {isEn ? 'ICF Executive Coaching & Strategic Compass' : 'Khai Vấn Tiêu Chuẩn ICF & La Bàn Định Vị'}
            </span>
          </div>
          <span className="text-xs font-mono text-ink/40">
            {new Date().toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink">
            {isEn ? 'Self-Discovery & Content Compass' : 'Hiểu Mình & La Bàn Nội Dung'}
          </h1>
          <p className="text-xs md:text-sm text-ink/60 leading-relaxed">
            {isEn
              ? 'Deep open questions empowering experts to clarify identity, positioning roles, and transform insights into a content compass.'
              : 'Mỗi ngày 1 câu hỏi khai vấn chiều sâu giúp Chuyên gia làm rõ vai trò, mục tiêu định vị và biến câu trả lời thành La Bàn Nội Dung sắc bén.'}
          </p>
        </div>

        {/* Question Selector Dots */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-ink/50 mr-2">
            {isEn ? 'Select prompt:' : 'Chọn chủ đề khai vấn:'}
          </span>
          {DAILY_ICF_QUESTIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { setSelectedQuestionIdx(idx); setIsSubmitted(false); setUserReflection(''); setActionCommitment(''); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedQuestionIdx === idx ? 'bg-coral text-white shadow-sm' : 'bg-cream text-ink/60 hover:text-ink border border-silver/80'
              }`}
            >
              #{idx + 1} {isEn ? item.categoryEn : item.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main ICF Question Card */}
      <div className="bg-white rounded-3xl border border-silver/80 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            {isEn ? q.categoryEn : q.category}
          </span>
          
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-ink leading-snug">
            "{isEn ? q.questionEn : q.question}"
          </h2>

          {/* Strategic Content Compass Outcome */}
          <div className="bg-cream/70 border border-silver/80 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-ink/80">
            <Target className="w-4 h-4 text-accent shrink-0" />
            <div>
              <span className="font-bold text-accent">{isEn ? 'Strategic Outcome:' : 'Outcome Vai Trò & La Bàn Content:'} </span>
              <span>{isEn ? q.compassOutcomeEn : q.compassOutcome}</span>
            </div>
          </div>
        </div>

        {/* Daily Motivation Quote */}
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
            <Quote className="w-4 h-4" />
            <span>{isEn ? 'Daily Growth Quote' : 'Quote Động Lực Khai Vấn'}</span>
          </div>
          <p className="font-serif italic text-sm text-ink/80 leading-relaxed">
            "{isEn ? q.quoteEn : q.quote}"
          </p>
          <p className="text-[10px] text-ink/40 text-right font-mono">— {q.author}</p>
        </div>

        {/* Expert Reflection & Commitment Form */}
        {!isSubmitted ? (
          <div className="space-y-4 pt-2 border-t border-silver/60">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink/70 block">
                1. {isEn ? 'Your deep reflection & answer:' : 'Suy ngẫm & Câu trả lời thật của bạn:'}
              </label>
              <textarea
                rows={4}
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                placeholder={isEn ? 'Write your authentic reflection here...' : 'Viết ra câu trả lời thật nhất từ trải nghiệm thực tế của bạn...'}
                className="w-full text-xs md:text-sm text-ink bg-cream/50 p-3.5 rounded-2xl border border-silver/80 focus:border-ink resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink/70 block">
                2. {isEn ? 'Your 24h action commitment:' : 'Cam kết 1 hành động trong 24h tới:'}
              </label>
              <input
                type="text"
                value={actionCommitment}
                onChange={(e) => setActionCommitment(e.target.value)}
                placeholder={isEn ? 'e.g., Post 1 story about my diagnosis session...' : 'Ví dụ: Đóng gói kịch bản buổi chẩn đoán 1:1 và đăng 1 bài trên LinkedIn...'}
                className="w-full text-xs text-ink bg-cream/50 p-3 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>

            <button
              onClick={handleSubmitReflection}
              disabled={!userReflection.trim()}
              className="w-full py-3.5 rounded-full bg-ink text-cream font-bold text-xs hover:bg-ink/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow"
            >
              <Send className="w-4 h-4" />
              <span>{isEn ? 'Save Reflection & Generate Content Compass' : 'Gửi Suy Ngẫm & Khóa La Bàn Nội Dung'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3 text-xs text-emerald-900 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{isEn ? 'Reflection Saved to Journal!' : 'Đã Ghi Nhận Bài Học Khai Vấn!'}</span>
            </div>

            <p className="italic text-ink/80 bg-white/80 p-3 rounded-xl border border-emerald-100">
              "{savedJournal[0]?.coachFeedback}"
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="font-semibold text-emerald-700">
                {isEn ? '24h Action Commitment: ' : 'Cam kết 24h: '}
                <strong>{actionCommitment || (isEn ? 'Taken' : 'Đã xác nhận')}</strong>
              </span>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-accent hover:underline"
              >
                {isEn ? 'Write another entry' : 'Viết thêm suy ngẫm mới'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Journal History */}
      {savedJournal.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{isEn ? 'Reflection Journal History' : 'Nhật Ký Tăng Trưởng Khai Vấn'}</span>
          </h3>

          <div className="space-y-2.5">
            {savedJournal.map((j) => (
              <div key={j.id} className="bg-white rounded-2xl border border-silver/80 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-ink/40 text-[10px]">
                  <span>{j.date}</span>
                  <span className="font-bold text-accent">{isEn ? 'ICF Journal' : 'Nhật ký ICF'}</span>
                </div>
                <p className="font-serif font-bold text-ink">{j.question}</p>
                <p className="text-ink/70 italic bg-cream/50 p-2.5 rounded-xl border border-silver/60">"{j.reflection}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
