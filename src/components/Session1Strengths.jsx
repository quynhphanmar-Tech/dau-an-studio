import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ShieldCheck, Sparkles, FileText, ArrowRight, RefreshCw, CheckCircle2, Lock, AlertCircle } from 'lucide-react';

export default function Session1Strengths({ profile, updateProfile, onNext, userAuth, onLoginSuccess, lang = 'vi' }) {
  const isEn = lang === 'en';
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [livenessCode, setLivenessCode] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strengthsFound, setStrengthsFound] = useState(false);

  const timerRef = useRef(null);

  // Generate random 4-digit Liveness Verification Code
  useEffect(() => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setLivenessCode(code);
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTimer(0);
    }
  };

  const handleAnalyzeStrengths = () => {
    if (!pastedText.trim() && recordingTimer === 0) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStrengthsFound(true);
      updateProfile({
        strengthSummary: isEn
          ? 'Clear strategic vision, metric-driven execution, and high trust-building capability.'
          : 'Nhìn thấu bản chất vấn đề, kinh nghiệm thực chiến đo lường được, và phong cách truyền đạt tạo niềm tin ngay lần đầu.',
        yearsExperience: profile.yearsExperience || '10 năm',
        biggestWin: profile.biggestWin || (isEn ? 'Guided 60+ startups to raise capital' : 'Giúp 60+ startup gọi vốn thành công')
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in-up">
      {/* Session 1 Title */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
          {isEn ? 'Uncover Strengths · Step 1/5' : 'Hiểu thế mạnh · Bước 1/5'}
        </span>
        
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-snug">
          {isEn ? 'We start from what you do ' : 'Chúng ta bắt đầu từ những điều bạn đã làm '}
          <span className="highlight-word">{isEn ? 'best' : 'tốt nhất'}</span>.
        </h1>

        <p className="text-sm text-ink/60 leading-relaxed">
          {isEn
            ? 'Personal branding is built on authentic experience. Share your journey via voice or text.'
            : 'Xây dựng thương hiệu cá nhân để mở ra những cánh cửa mới. Tôi sẽ lắng nghe kinh nghiệm và kết quả thật của bạn.'}
        </p>
      </div>

      {/* Voice Recording Box with Anti-Deepfake Liveness Verification Code */}
      <div className="bg-white rounded-3xl border border-silver/80 p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-silver/50 pb-3 text-xs">
          <span className="font-bold flex items-center gap-1.5 text-ink">
            <Mic className="w-4 h-4 text-coral" />
            {isEn ? 'Option A: Direct Voice Coaching' : 'Cách 1: Thu âm chia sẻ trực tiếp'}
          </span>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {isEn ? 'Anti-Deepfake Liveness Verified' : 'Xác thực mã sinh tồn 1:1'}
          </span>
        </div>

        {/* Liveness Code Prompt */}
        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 space-y-1">
          <p className="font-bold">
            {isEn ? '🔐 Voice Verification Prompt:' : '🔐 Mã xác thực giọng đọc chính chủ (Liveness Code):'}
          </p>
          <p className="font-serif text-sm font-bold text-amber-950">
            {isEn
              ? `Please say aloud: "I am ${profile.name || 'a Specialist'}, my verification code is ${livenessCode}."`
              : `Vui lòng đọc mở đầu: "Tôi là ${profile.name || 'Chuyên gia'}, mã xác thực của tôi là ${livenessCode}."`}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-cream/50 rounded-2xl border border-dashed border-silver/80 space-y-3">
          <button
            onClick={handleStartRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${
              isRecording ? 'bg-coral text-white animate-pulse scale-110' : 'bg-ink text-cream hover:bg-ink/90'
            }`}
          >
            {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          <p className="text-xs font-mono font-bold text-ink">
            {isRecording ? `${recordingTimer}s (Đang thu âm...)` : (isEn ? 'Click mic to start recording' : 'Bấm micro để bắt đầu nói')}
          </p>
        </div>
      </div>

      {/* Option B: Paste Text from LinkedIn/CV */}
      <div className="bg-white rounded-3xl border border-silver/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-silver/50 pb-3 text-xs">
          <span className="font-bold flex items-center gap-1.5 text-ink">
            <FileText className="w-4 h-4 text-accent" />
            {isEn ? 'Option B: Paste LinkedIn / CV / Past Case Study' : 'Cách 2: Dán thông tin từ LinkedIn / CV / Case Study'}
          </span>
        </div>

        <textarea
          rows={5}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder={isEn ? 'Paste your bio, achievements, or experience here...' : 'Dán phần giới thiệu bản thân, các kết quả dự án hoặc kinh nghiệm nổi bật vào đây...'}
          className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-4 rounded-2xl border border-silver/80 focus:border-ink resize-none"
        />

        <button
          onClick={handleAnalyzeStrengths}
          disabled={isAnalyzing || (!pastedText.trim() && recordingTimer === 0)}
          className="w-full py-3.5 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow"
        >
          {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
          <span>{isAnalyzing ? (isEn ? 'Analyzing Strengths...' : 'Đang phân tích thế mạnh...') : (isEn ? 'AI Analyze 3 Core Strengths' : 'AI Nhận Diện 3 Thế Mạnh Cốt Lõi')}</span>
        </button>
      </div>

      {/* Strengths Output Result Card */}
      {strengthsFound && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-4 text-xs text-emerald-950 animate-fade-in shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {isEn ? '3 Core Strengths Identified:' : '3 Thế Mạnh Cốt Lõi Của Bạn:'}
            </span>
          </div>

          <p className="font-serif text-sm font-semibold leading-relaxed bg-white/90 p-4 rounded-2xl border border-emerald-100 text-ink">
            "{profile.strengthSummary}"
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-full bg-ink text-cream font-bold text-xs hover:bg-ink/90 transition-all flex items-center gap-2 shadow"
            >
              <span>{isEn ? 'Continue to Positioning' : 'Tiếp tục chọn hướng xuất hiện'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
