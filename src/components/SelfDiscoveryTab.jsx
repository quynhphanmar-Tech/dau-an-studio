import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Heart, CheckCircle2, ArrowRight, BookOpen, Quote, ShieldCheck, Send } from 'lucide-react';
import { ICF_COACHING_QUESTIONS, MOTIVATIONAL_QUOTES } from '../data/coachingQuotes';
import { syncReflectionToSupabase } from '../lib/supabaseClient';

export default function SelfDiscoveryTab({ profile, updateProfile }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [userReflection, setUserReflection] = useState('');
  const [actionCommitment, setActionCommitment] = useState('');
  const [savedReflections, setSavedReflections] = useState(() => {
    try {
      const saved = localStorage.getItem('dauan_reflections');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [showCoachAcknowledgement, setShowCoachAcknowledgement] = useState(false);

  const activeQuestion = ICF_COACHING_QUESTIONS[currentQuestionIndex];
  const activeQuote = MOTIVATIONAL_QUOTES[currentQuoteIndex];

  const handleRandomize = () => {
    setShowCoachAcknowledgement(false);
    setUserReflection('');
    setActionCommitment('');
    setCurrentQuestionIndex((prev) => (prev + 1) % ICF_COACHING_QUESTIONS.length);
    setCurrentQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const handleSaveReflection = () => {
    if (!userReflection.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      category: activeQuestion.category,
      question: activeQuestion.question,
      reflection: userReflection,
      commitment: actionCommitment || 'Tập trung hoàn thành mục tiêu hôm nay.',
    };

    const updated = [newEntry, ...savedReflections];
    setSavedReflections(updated);
    try {
      localStorage.setItem('dauan_reflections', JSON.stringify(updated));
    } catch (e) {}

    // Sync to Supabase Database
    syncReflectionToSupabase(newEntry);

    setShowCoachAcknowledgement(true);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      <div className="space-y-6">
        {/* ICF Coach Identity Banner */}
        <div className="flex items-center justify-between border-b border-silver/60 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-coral fill-current" />
            <span className="text-xs font-bold text-ink uppercase tracking-wider">
              Góc "Hiểu Mình" · Khai Vấn Tiêu Chuẩn ICF
            </span>
          </div>
          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-silver text-xs font-semibold text-ink/70 hover:text-ink hover:border-ink/40 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-accent" />
            <span>Đổi câu hỏi ngẫu nhiên</span>
          </button>
        </div>

        {/* Daily Motivational Quote Card */}
        <div className="bg-white rounded-2xl border border-silver/80 p-5 space-y-2 relative overflow-hidden shadow-sm">
          <Quote className="w-8 h-8 text-accent/15 absolute right-3 top-3 pointer-events-none" />
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-0.5 rounded-full">
            Cảm hứng hôm nay
          </span>
          <p className="font-serif italic text-sm text-ink leading-relaxed pt-1">
            "{activeQuote.quote}"
          </p>
          <p className="text-[11px] font-semibold text-ink/40 text-right">— {activeQuote.author}</p>
        </div>

        {/* Powerful ICF Coaching Question */}
        <div className="bg-white rounded-3xl border border-silver/80 p-6 md:p-8 space-y-5 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">
              Câu hỏi gợi mở ({activeQuestion.category})
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-ink leading-snug">
              "{activeQuestion.question}"
            </h2>
            <p className="text-xs text-accent italic pt-1">{activeQuestion.insightTip}</p>
          </div>

          {/* User Reflection Textarea */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1">Suy ngẫm & câu trả lời chân thật của bạn:</label>
              <textarea
                rows={3}
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                placeholder={activeQuestion.reflectionPrompt}
                className="w-full bg-cream border border-silver rounded-2xl text-xs text-ink p-4 placeholder:text-silver focus:border-ink/30 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1">Cam kết 1 hành động cụ thể hôm nay:</label>
              <input
                type="text"
                value={actionCommitment}
                onChange={(e) => setActionCommitment(e.target.value)}
                placeholder="Ví dụ: Đăng 1 bài viết chia sẻ bài học thật lên LinkedIn trước 20h"
                className="w-full bg-cream border border-silver rounded-xl text-xs text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors"
              />
            </div>

            <button
              onClick={handleSaveReflection}
              disabled={!userReflection.trim()}
              className="w-full py-3 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90 transition-all flex items-center justify-center gap-1.5 shadow disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ghi nhận suy ngẫm & Cam kết hành động</span>
            </button>
          </div>
        </div>

        {/* Empathetic ICF Coach Acknowledgement Modal/Card */}
        {showCoachAcknowledgement && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-fade-in shadow-sm">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ghi nhận từ Coach Đồng Hành:</span>
            </div>
            <p className="leading-relaxed">
              "Tôi lắng nghe và ghi nhận sự dũng cảm, chân thật của {profile.name || 'bạn'}. Việc bạn dám nhìn thẳng vào suy nghĩ và đưa ra cam kết hành động hôm nay đã là một bước tiến lớn cho thương hiệu cá nhân của bạn!"
            </p>
          </div>
        )}

        {/* History of Personal Growth Reflections */}
        {savedReflections.length > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-ink/40" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink/50">Nhật ký tăng trưởng cá nhân ({savedReflections.length})</h3>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {savedReflections.map((entry) => (
                <div key={entry.id} className="bg-white p-4 rounded-2xl border border-silver/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-ink/40">
                    <span className="font-bold text-accent uppercase">{entry.category}</span>
                    <span>{entry.date}</span>
                  </div>
                  <p className="font-serif font-bold text-ink text-xs">"{entry.question}"</p>
                  <p className="text-ink/80 bg-cream p-2.5 rounded-xl border border-silver/50 italic">"{entry.reflection}"</p>
                  {entry.commitment && (
                    <p className="text-[11px] text-emerald-800 font-medium pt-0.5">⚡ Cam kết: {entry.commitment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-8 pb-4 text-center">
        <p className="text-xs text-ink/30 italic">Đồng hành & Tôn trọng bản sắc của bạn theo tiêu chuẩn ICF.</p>
      </div>
    </div>
  );
}
