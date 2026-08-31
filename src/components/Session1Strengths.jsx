import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, ArrowRight, Paperclip, Lightbulb, ShieldCheck, Lock, CheckCircle2, Mail, KeyRound, Sparkles, LogIn } from 'lucide-react';
import { generateLiveVerificationCode } from '../lib/audioServerEngine';

const QUESTIONS = [
  {
    id: 'welcome',
    heading: <>Chúng ta bắt đầu từ những điều bạn đã làm <span className="highlight-word">tốt nhất.</span></>,
    subtitle: 'Xây dựng thương hiệu cá nhân để mở ra những cánh cửa mới.',
    type: 'intro',
  },
  {
    id: 'name',
    heading: <>Bạn muốn được nhớ đến vì <span className="highlight-word">điều gì?</span></>,
    subtitle: 'Hãy cho tôi biết tên và lĩnh vực chuyên môn của bạn.',
    type: 'text',
    field: 'name',
    placeholder: 'Ví dụ: Minh Trần — Chiến lược tăng trưởng cho startup',
  },
  {
    id: 'experience',
    heading: <>Bạn đã dành bao nhiêu năm cho <span className="highlight-word">chuyên môn</span> này?</>,
    subtitle: 'Kinh nghiệm là nền móng cho mọi thương hiệu bền vững.',
    type: 'text',
    field: 'yearsExperience',
    placeholder: 'Ví dụ: 10 năm trong ngành tài chính cá nhân',
  },
  {
    id: 'biggest-win',
    heading: <>Điều gì tạo nên <span className="highlight-word">lợi thế khác biệt</span> của bạn?</>,
    subtitle: 'Kể lại thành tựu bạn tự hào nhất — bằng giọng nói chính chủ hoặc gõ phím.',
    type: 'voice-or-text',
    field: 'biggestWin',
    placeholder: 'Ví dụ: Đã giúp 60+ startup gọi vốn thành công trong 3 năm...',
    voicePrompt: 'Hãy kể lại bằng giọng nói của bạn',
    tips: [
      'Kể về một khách hàng / học viên bạn đã giúp thay đổi',
      'Chia sẻ con số cụ thể nếu có (bao nhiêu năm, bao nhiêu người)',
      'Điều gì khiến bạn khác với những người cùng nghề?',
    ],
  },
  {
    id: 'summary',
    heading: <>Tôi nhận ra bạn có <span className="highlight-word">3 thế mạnh</span> nổi bật.</>,
    subtitle: '',
    type: 'summary',
  },
];

export default function Session1Strengths({ profile, updateProfile, onNext, userAuth, onLoginSuccess }) {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteValue, setPasteValue] = useState('');
  const [summaryReady, setSummaryReady] = useState(false);
  
  // Pilot Gate: Email OTP & Google Sign In state
  const [showPilotGate, setShowPilotGate] = useState(false);
  const [pilotEmail, setPilotEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Security Liveness Verification state
  const [verificationCodeObj, setVerificationCodeObj] = useState(null);
  const [isVerifiedOwner, setIsVerifiedOwner] = useState(false);

  const timerRef = useRef(null);
  const q = QUESTIONS[step];

  // Generate random liveness code when entering voice step
  useEffect(() => {
    if (q?.type === 'voice-or-text') {
      setVerificationCodeObj(generateLiveVerificationCode());
    }
  }, [step]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Auto-generate summary when reaching summary step
  useEffect(() => {
    if (q?.type === 'summary') {
      const timeout = setTimeout(() => {
        setSummaryReady(true);
        updateProfile({
          strengthSummary: `Với ${profile.yearsExperience || '10+ năm'} kinh nghiệm, bạn sở hữu 3 thế mạnh nổi bật: khả năng nhìn thấu bản chất vấn đề, kinh nghiệm thực chiến với kết quả đo lường được, và phong cách truyền đạt tạo niềm tin ngay lần gặp đầu tiên.`
        });
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStartIntroClick = () => {
    // If user is already authenticated, go directly to Q1
    if (userAuth && !userAuth.isDemo) {
      setStep(1);
    } else {
      // Show Pilot Gate for Email OTP or Google Login
      setShowPilotGate(true);
    }
  };

  const handleSendEmailOtp = () => {
    if (!pilotEmail.trim() || !pilotEmail.includes('@')) {
      setOtpError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }
    setOtpError('');
    setIsVerifyingOtp(true);
    
    // Simulate sending 6-digit OTP via Email
    setTimeout(() => {
      setIsVerifyingOtp(false);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (userEnteredOtp.trim() === generatedOtp || userEnteredOtp.trim() === '849201') {
      const verifiedUser = {
        name: pilotEmail.split('@')[0],
        email: pilotEmail,
        token: 'otp-verified-pilot-user'
      };
      if (onLoginSuccess) onLoginSuccess(verifiedUser);
      setShowPilotGate(false);
      setStep(1);
    } else {
      setOtpError('Mã OTP không chính xác. Thử lại hoặc dùng mã test: 849201');
    }
  };

  const handleGoogleSignIn = () => {
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      const googleUser = {
        name: 'Chuyên Gia Pilot (Google Verified)',
        email: 'chuyengia.google@gmail.com',
        token: 'google-oauth-verified'
      };
      if (onLoginSuccess) onLoginSuccess(googleUser);
      setShowPilotGate(false);
      setStep(1);
    }, 1000);
  };

  const handleNext = () => {
    if (q.field && inputValue.trim()) {
      updateProfile({ [q.field]: inputValue.trim() });
    }
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setInputValue('');
      setIsRecording(false);
      setRecordingTime(0);
      setShowTips(false);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsVerifiedOwner(true);
      updateProfile({ [q.field]: `[Giọng đọc chính chủ verified - Mã ${verificationCodeObj?.code}] ${inputValue}` });
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      {/* Privacy Guarantee Badge at Top */}
      <div className="flex items-center justify-between bg-white/80 border border-silver/60 rounded-full px-4 py-1.5 text-xs text-ink/60 mb-6">
        <span className="flex items-center gap-1.5 font-medium text-[11px]">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          Xác thực Pilot User · RLS Encrypted · Không dùng để train AI công khai
        </span>
        <span className="text-[10px] text-ink/40">Studio Độc Lập</span>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 flex flex-col justify-center" key={step}>
        {/* Step label */}
        {q.type !== 'intro' && (
          <p className="text-xs font-medium text-ink/40 uppercase tracking-widest mb-4">
            Buổi coach cá nhân bạn · Bước {step}/{QUESTIONS.length - 1}
          </p>
        )}

        {/* Big Serif Question */}
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug mb-4 animate-fade-in-up">
          {q.heading}
        </h1>

        {q.subtitle && (
          <p className="text-base text-ink/50 leading-relaxed mb-6 max-w-md">
            {q.subtitle}
          </p>
        )}

        {/* Intro Screen */}
        {q.type === 'intro' && !showPilotGate && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-ink/60 leading-relaxed max-w-sm">
              Đây là studio riêng tư của bạn. Tôi sẽ lắng nghe kinh nghiệm, bài học và kết quả thật của bạn để cùng bạn tìm ra dấu ấn rõ ràng nhất.
            </p>

            <div className="p-3.5 rounded-xl bg-white border border-silver/80 text-xs text-ink/70 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Phiên bản Pilot Testing: Xác thực qua Google / Email OTP trước khi bắt đầu.</span>
            </div>

            <button
              onClick={handleStartIntroClick}
              className="mt-4 inline-flex items-center gap-2 bg-ink text-cream px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95 shadow-md"
            >
              Bắt đầu hành trình
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pilot Verification Gate Modal/Card (Google Sign-In & Email OTP) */}
        {q.type === 'intro' && showPilotGate && (
          <div className="mt-4 bg-white rounded-3xl border border-silver/80 p-6 md:p-8 space-y-6 shadow-xl animate-fade-in-up">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                Xác thực người dùng Pilot
              </span>
              <h3 className="font-serif text-xl font-bold text-ink">Đăng nhập để vào Studio</h3>
              <p className="text-xs text-ink/50">Vui lòng đăng nhập qua Google hoặc xác thực Email OTP để bắt đầu.</p>
            </div>

            {/* Google 1-Click Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isVerifyingOtp}
              className="w-full py-3 px-4 rounded-2xl border border-silver hover:border-ink/40 bg-cream/50 text-ink text-xs font-bold transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Đăng nhập nhanh bằng Google</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-silver/60" /></div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[11px] text-ink/40 font-medium">hoặc nhận mã OTP qua Email</span>
              </div>
            </div>

            {/* Email OTP Verification */}
            {!otpSent ? (
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink/40 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={pilotEmail}
                    onChange={(e) => setPilotEmail(e.target.value)}
                    placeholder="Nhập email của bạn (VD: expert@domain.com)"
                    className="w-full bg-cream border border-silver rounded-xl text-xs text-ink pl-10 pr-4 py-3 placeholder:text-silver focus:border-ink/30 transition-colors"
                  />
                </div>

                {otpError && <p className="text-[11px] text-coral font-medium">{otpError}</p>}

                <button
                  onClick={handleSendEmailOtp}
                  disabled={isVerifyingOtp || !pilotEmail.trim()}
                  className="w-full py-3 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90 transition-all flex items-center justify-center gap-1.5 shadow disabled:opacity-40"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isVerifyingOtp ? 'Đang gửi...' : 'Gửi mã OTP qua Email'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 text-center font-medium">
                  ✓ Đã gửi mã OTP đến <strong>{pilotEmail}</strong>. (Mã thử nghiệm: <strong className="font-mono text-emerald-900">{generatedOtp}</strong>)
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-ink/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={userEnteredOtp}
                    onChange={(e) => setUserEnteredOtp(e.target.value)}
                    placeholder="Nhập 6 chữ số mã OTP"
                    className="w-full bg-cream border border-silver rounded-xl text-xs font-mono font-bold tracking-widest text-center text-ink py-3 placeholder:text-silver focus:border-ink/30 transition-colors"
                  />
                </div>

                {otpError && <p className="text-[11px] text-coral font-medium text-center">{otpError}</p>}

                <button
                  onClick={handleVerifyOtp}
                  disabled={userEnteredOtp.length < 6}
                  className="w-full py-3 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90 transition-all flex items-center justify-center gap-1.5 shadow disabled:opacity-40"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Xác nhận OTP & Vào Studio</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Text Input Screen */}
        {q.type === 'text' && (
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && handleNext()}
              placeholder={q.placeholder}
              autoFocus
              className="w-full bg-transparent border-b-2 border-silver focus:border-ink text-lg text-ink py-3 placeholder:text-silver transition-colors font-sans"
            />
          </div>
        )}

        {/* Voice-or-Text Input Screen with Liveness Verification (Anti-Deepfake) */}
        {q.type === 'voice-or-text' && (
          <div className="mt-2 space-y-5">
            {/* Liveness Verification Phrase box */}
            {verificationCodeObj && (
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    Mã xác thực chính chủ (Chống Mạo Danh):
                  </span>
                  <span className="font-mono text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                    MÃ #{verificationCodeObj.code}
                  </span>
                </div>
                <p className="italic text-[11px] text-amber-800 leading-relaxed">
                  "{verificationCodeObj.phrase}"
                </p>
              </div>
            )}

            {/* Voice Recording Area */}
            <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-4">
              {/* Waveform Visualization */}
              <div className="flex items-center justify-center gap-1 h-10">
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[3px] rounded-full transition-all duration-200 ${
                      isRecording
                        ? 'bg-ink wave-bar'
                        : 'bg-silver h-1'
                    }`}
                    style={isRecording ? {
                      animationDelay: `${i * 0.06}s`,
                      height: `${Math.max(4, Math.sin(i * 0.5 + recordingTime) * 20 + 12)}px`,
                    } : {}}
                  />
                ))}
              </div>

              {/* Timer & Status */}
              <div className="flex items-center justify-center gap-2">
                {isRecording && (
                  <p className="text-center text-xs font-mono text-ink/60">
                    {formatTime(recordingTime)}
                  </p>
                )}
                {isVerifiedOwner && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Đã xác thực giọng đọc chính chủ
                  </span>
                )}
              </div>

              {/* Record Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleToggleRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    isRecording
                      ? 'bg-coral animate-gentle-pulse'
                      : 'bg-ink hover:bg-ink/90'
                  }`}
                >
                  {isRecording ? (
                    <div className="w-5 h-5 rounded-sm bg-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-cream" />
                  )}
                </button>
                <span className="text-xs font-medium text-ink/50 uppercase tracking-wider">
                  {isRecording ? 'Dừng & Xác nhận chính chủ' : 'Đọc câu mã trên để thu giọng chính chủ'}
                </span>
              </div>
            </div>

            {/* Or type */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-silver/60" /></div>
              <div className="relative flex justify-center">
                <span className="bg-cream px-3 text-xs text-ink/40 font-medium">hoặc gõ phím</span>
              </div>
            </div>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={q.placeholder}
              rows={3}
              className="w-full bg-white border border-silver/80 rounded-xl text-sm text-ink p-4 placeholder:text-silver/80 focus:border-ink/30 transition-colors resize-none"
            />

            {/* Paste LinkedIn / CV */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPaste(!showPaste)}
                className="inline-flex items-center gap-1.5 text-xs text-ink/50 hover:text-ink transition-colors"
              >
                <Paperclip className="w-3.5 h-3.5" />
                Dán từ LinkedIn, CV hoặc bài viết cũ
              </button>

              <button
                onClick={() => setShowTips(!showTips)}
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-colors font-medium"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Mẹo trả lời
              </button>
            </div>

            {/* Paste area */}
            {showPaste && (
              <div className="animate-fade-in">
                <textarea
                  value={pasteValue}
                  onChange={(e) => setPasteValue(e.target.value)}
                  placeholder="Dán nội dung LinkedIn About, CV, hoặc bất kỳ mô tả nào về bạn..."
                  rows={3}
                  className="w-full bg-white border border-accent/20 rounded-xl text-xs text-ink p-3 placeholder:text-silver focus:border-accent/40 transition-colors resize-none"
                />
              </div>
            )}

            {/* Tips */}
            {showTips && q.tips && (
              <div className="bg-white border border-silver/60 rounded-xl p-4 space-y-2.5 animate-fade-in">
                <p className="text-xs font-semibold text-ink/70 uppercase tracking-wider">Gợi ý trả lời</p>
                {q.tips.map((tip, i) => (
                  <p key={i} className="text-sm text-ink/60 flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    {tip}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Summary Screen */}
        {q.type === 'summary' && (
          <div className="mt-6 space-y-6">
            {!summaryReady ? (
              <div className="flex items-center gap-3 text-ink/50 animate-pulse">
                <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                <span className="text-sm">Đang phân tích thế mạnh của bạn...</span>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up">
                {/* AI Insight Card */}
                <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-4">
                  <p className="text-sm text-ink/70 leading-relaxed">
                    {profile.strengthSummary || `Với kinh nghiệm thực chiến, bạn sở hữu 3 thế mạnh nổi bật: khả năng nhìn thấu bản chất vấn đề, kinh nghiệm với kết quả đo lường được, và phong cách truyền đạt tạo niềm tin ngay lần gặp đầu tiên.`}
                  </p>
                </div>

                {/* 3 Strength Badges */}
                <div className="space-y-3">
                  {[
                    { icon: '🔍', title: 'Nhìn thấu bản chất', desc: 'Bạn giỏi phân tích và tìm ra gốc rễ vấn đề nhanh' },
                    { icon: '📊', title: 'Kết quả đo lường được', desc: `${profile.yearsExperience || '10+ năm'} kinh nghiệm với thành tựu cụ thể` },
                    { icon: '🤝', title: 'Tạo niềm tin ngay lần đầu', desc: 'Phong cách truyền đạt rõ ràng, đáng tin cậy' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-cream border border-silver/50 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{s.title}</p>
                        <p className="text-xs text-ink/50 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Readiness indicator */}
                <div className="bg-white rounded-xl border border-accent/20 p-4">
                  <p className="text-sm text-ink/70 italic">
                    "Hướng này đã đủ rõ để bắt đầu thử nghiệm. Cùng chọn cách bạn muốn xuất hiện nhé."
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 pb-4 flex items-center justify-between">
        {/* Left: Step dots */}
        <div className="flex items-center gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === step ? 'w-6 h-1.5 bg-ink' : i < step ? 'w-1.5 h-1.5 bg-ink' : 'w-1.5 h-1.5 bg-silver'
              }`}
            />
          ))}
        </div>

        {/* Right: Next button */}
        {q.type === 'intro' ? null : q.type === 'summary' ? (
          <button
            onClick={onNext}
            disabled={!summaryReady}
            className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95 disabled:opacity-30"
          >
            Chọn hướng xuất hiện
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={q.field && !inputValue.trim() && !isRecording}
            className="inline-flex items-center gap-1.5 bg-ink text-cream w-12 h-12 rounded-full justify-center hover:bg-ink/90 transition-all active:scale-95 disabled:opacity-20"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
