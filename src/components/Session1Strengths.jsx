import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, ShieldCheck, Sparkles, FileText, ArrowRight, RefreshCw, CheckCircle2, MessageCircle, User, Heart, Target, Eye, Lightbulb, Send } from 'lucide-react';

/**
 * ICF COACHING FLOW ARCHITECTURE:
 * 
 * Phase 0: Welcome & Rapport (Build Trust)
 * Phase 1: Powerful Opening Question → Expert answers freely
 * Phase 2: AI Coach reflects back + asks deeper follow-up (Blind Spot Mirror)
 * Phase 3: Challenge Question → Uncover limiting beliefs
 * Phase 4: Strengths Synthesis + Blind Spot Awareness Card
 * Phase 5: Action Commitment → Move to Session 2
 * 
 * ICF Principles applied:
 * - Coach does NOT give advice, only asks questions
 * - Coach reflects what was said, highlighting patterns
 * - Coach challenges gently ("What if the opposite were true?")
 * - Coach acknowledges courage and authenticity
 * - Coach holds silence (waits for real answers)
 */

const COACHING_PHASES = [
  {
    id: 'welcome',
    coachMessage: 'Chào mừng bạn đến với buổi coaching 1:1. Tôi là Coach AI của Dấu Ấn Studio — vai trò của tôi không phải tư vấn, mà là đặt câu hỏi để giúp bạn tự nhìn thấy điều mà có thể bạn chưa nhìn ra.\n\nMọi câu trả lời của bạn đều đúng. Không có đáp án sai ở đây.',
    coachMessageEn: 'Welcome to your 1:1 coaching session. I am your AI Coach at Dấu Ấn Studio — my role is not to advise, but to ask questions that help you see what you might not yet see.\n\nEvery answer you give is valid. There are no wrong answers here.',
    type: 'intro'
  },
  {
    id: 'q1_context',
    coachMessage: 'Trước khi bắt đầu, tôi muốn hiểu bối cảnh của bạn.\n\nBạn có thể chia sẻ: Bạn đang làm gì, có bao nhiêu năm kinh nghiệm, và điều gì khiến bạn quan tâm đến việc xây dựng thương hiệu cá nhân vào lúc này?',
    coachMessageEn: 'Before we begin, I want to understand your context.\n\nCould you share: What do you do, how many years of experience do you have, and what made you interested in personal branding right now?',
    placeholder: 'Chia sẻ tự do về bản thân, công việc và lý do bạn ở đây...',
    placeholderEn: 'Share freely about yourself, your work, and why you are here...',
    field: 'contextAnswer',
    type: 'open'
  },
  {
    id: 'q2_biggest_win',
    coachMessage: null, // Dynamic — generated from previous answer
    coachMessageEn: null,
    placeholder: 'Mô tả kết quả cụ thể nhất mà bạn tự hào...',
    placeholderEn: 'Describe the most specific result you are proud of...',
    field: 'biggestWinAnswer',
    type: 'open'
  },
  {
    id: 'q3_blind_spot',
    coachMessage: null, // Dynamic — blind spot mirror
    coachMessageEn: null,
    placeholder: 'Chia sẻ thật — điều gì đang giữ bạn lại...',
    placeholderEn: 'Share honestly — what is holding you back...',
    field: 'blindSpotAnswer',
    type: 'open'
  },
  {
    id: 'q4_challenge',
    coachMessage: null, // Dynamic — challenge question
    coachMessageEn: null,
    placeholder: 'Nếu điều đó không còn đúng thì sao...',
    placeholderEn: 'If that were no longer true, then what...',
    field: 'challengeAnswer',
    type: 'open'
  },
  {
    id: 'synthesis',
    coachMessage: null, // Dynamic — strengths synthesis + blind spot awareness
    type: 'synthesis'
  }
];

function generateDynamicCoachResponse(phaseId, answers, profile, isEn) {
  const name = profile.name || (isEn ? 'Expert' : 'Chuyên gia');
  const ctx = answers.contextAnswer || '';
  const win = answers.biggestWinAnswer || '';
  const blind = answers.blindSpotAnswer || '';

  switch (phaseId) {
    case 'q2_biggest_win':
      if (isEn) {
        return `Thank you for sharing, ${name}. I heard something important in what you said.\n\nNow I want to go deeper: In your entire career, what is the ONE result you created that still makes you proud when you think about it? Not the title, not the role — the actual transformation you helped someone achieve.`;
      }
      return `Cảm ơn bạn đã chia sẻ, ${name}. Tôi nghe thấy điều quan trọng trong câu trả lời của bạn.\n\nBây giờ tôi muốn đi sâu hơn: Trong toàn bộ sự nghiệp, đâu là MỘT kết quả mà đến bây giờ nghĩ lại bạn vẫn tự hào? Không phải chức danh, không phải vai trò — mà là sự thay đổi thực sự bạn đã tạo ra cho ai đó.`;

    case 'q3_blind_spot':
      if (isEn) {
        return `"${win.slice(0, 80)}..."\n\nThat's powerful. Most people would overlook this, but what you just described reveals a pattern: You naturally create trust and transformation.\n\nNow here's my real question — and I ask because I care about your growth:\n\n🔍 If this capability is so strong, what is the ONE thing that has been stopping you from packaging it into something that reaches more people? What's the friction you haven't said out loud yet?`;
      }
      return `"${win.slice(0, 80)}..."\n\nĐiều đó rất mạnh mẽ. Hầu hết mọi người sẽ bỏ qua, nhưng điều bạn vừa mô tả cho thấy một mẫu hình rõ ràng: Bạn có năng lực tạo niềm tin và chuyển đổi một cách tự nhiên.\n\nBây giờ đây là câu hỏi thật sự của tôi — và tôi hỏi vì tôi quan tâm đến sự phát triển của bạn:\n\n🔍 Nếu năng lực này mạnh đến vậy, thì ĐIỀU GÌ đang giữ bạn lại chưa đóng gói nó thành thứ có thể chạm tới nhiều người hơn? Điểm nghẽn nào bạn chưa nói ra?`;

    case 'q4_challenge':
      if (isEn) {
        return `I appreciate your honesty. "${blind.slice(0, 60)}..." — I hear that.\n\nBut I want to challenge you with love:\n\n💡 What if that belief is actually protecting you from something, rather than stopping you? What if the real question isn't "Am I ready?" but "Who am I NOT serving by staying invisible?"\n\nTake a moment. Who specifically is waiting for exactly your experience right now?`;
      }
      return `Tôi trân trọng sự thành thật của bạn. "${blind.slice(0, 60)}..." — tôi nghe thấy điều đó.\n\nNhưng tôi muốn thách thức bạn bằng sự quan tâm:\n\n💡 Nếu niềm tin đó thực ra đang bảo vệ bạn khỏi điều gì đó, thay vì ngăn cản bạn thì sao? Nếu câu hỏi thật sự không phải "Tôi đã sẵn sàng chưa?" mà là "Ai đang KHÔNG ĐƯỢC phục vụ vì tôi còn ẩn mình?"\n\nHãy dừng lại một chút. Cụ thể AI đang cần chính xác trải nghiệm của bạn ngay lúc này?`;

    case 'synthesis':
      if (isEn) {
        return `## 🪞 Coach's Mirror — What I See In You\n\nAfter listening deeply, here is what I observe:\n\n**Your 3 Core Strengths:**\n1. **Trust Architecture** — You naturally build confidence in others through real experience, not theory.\n2. **Transformation Delivery** — "${win.slice(0, 50)}..." proves you create measurable change.\n3. **Authentic Depth** — Your willingness to name your friction ("${blind.slice(0, 40)}...") shows rare self-awareness.\n\n**🔍 Your Blind Spot (Growth Edge):**\nYou may be undervaluing the very experience that makes you irreplaceable. The gap isn't capability — it's visibility. The world needs your voice packaged clearly.\n\n**🧭 Your Content Compass Direction:**\nEvery piece of content you create should answer: "Who am I NOT serving by staying silent today?"`;
      }
      return `## 🪞 Gương Phản Chiếu Từ Coach — Điều Tôi Nhìn Thấy Ở Bạn\n\nSau khi lắng nghe sâu, đây là điều tôi quan sát được:\n\n**3 Thế Mạnh Cốt Lõi Của Bạn:**\n1. **Kiến tạo Niềm tin** — Bạn tự nhiên tạo được sự tin tưởng từ trải nghiệm thực chiến, không phải lý thuyết.\n2. **Chuyển đổi Đo lường được** — "${win.slice(0, 50)}..." chứng minh bạn tạo ra thay đổi thực sự.\n3. **Chiều sâu Chân thực** — Việc bạn dám gọi tên điểm nghẽn ("${blind.slice(0, 40)}...") cho thấy năng lực tự nhận thức hiếm có.\n\n**🔍 Điểm Mù Của Bạn (Cạnh Tăng Trưởng):**\nBạn có thể đang đánh giá thấp chính trải nghiệm khiến bạn không thể thay thế. Khoảng cách không phải năng lực — mà là sự hiện diện. Thế giới cần giọng nói của bạn được đóng gói rõ ràng.\n\n**🧭 La Bàn Nội Dung Của Bạn:**\nMỗi bài nội dung bạn tạo ra nên trả lời: "Ai đang KHÔNG được phục vụ vì hôm nay tôi còn im lặng?"`;

    default:
      return '';
  }
}

export default function Session1Strengths({ profile, updateProfile, onNext, userAuth, onLoginSuccess, lang = 'vi' }) {
  const isEn = lang === 'en';
  const [currentPhase, setCurrentPhase] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [isCoachTyping, setIsCoachTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isCoachTyping]);

  // Initialize with welcome message
  useEffect(() => {
    const welcome = COACHING_PHASES[0];
    setChatHistory([{
      role: 'coach',
      message: isEn ? welcome.coachMessageEn : welcome.coachMessage,
      phase: 'welcome'
    }]);
    
    // Auto-advance to first question after welcome
    setTimeout(() => {
      const q1 = COACHING_PHASES[1];
      setChatHistory(prev => [...prev, {
        role: 'coach',
        message: isEn ? q1.coachMessageEn : q1.coachMessage,
        phase: 'q1_context'
      }]);
      setCurrentPhase(1);
    }, 1500);
  }, [isEn]);

  const handleSendAnswer = () => {
    if (!currentInput.trim()) return;

    const phase = COACHING_PHASES[currentPhase];
    const newAnswers = { ...answers, [phase.field]: currentInput.trim() };
    setAnswers(newAnswers);

    // Add user message to chat
    setChatHistory(prev => [...prev, {
      role: 'user',
      message: currentInput.trim(),
      phase: phase.id
    }]);
    setCurrentInput('');

    // Coach "thinking" delay
    setIsCoachTyping(true);

    const nextPhaseIndex = currentPhase + 1;

    setTimeout(() => {
      setIsCoachTyping(false);

      if (nextPhaseIndex < COACHING_PHASES.length) {
        const nextPhase = COACHING_PHASES[nextPhaseIndex];
        let coachMsg;

        if (nextPhase.coachMessage) {
          coachMsg = isEn ? nextPhase.coachMessageEn : nextPhase.coachMessage;
        } else {
          coachMsg = generateDynamicCoachResponse(nextPhase.id, newAnswers, profile, isEn);
        }

        setChatHistory(prev => [...prev, {
          role: 'coach',
          message: coachMsg,
          phase: nextPhase.id
        }]);

        setCurrentPhase(nextPhaseIndex);

        // If synthesis phase, update profile with extracted strengths
        if (nextPhase.type === 'synthesis') {
          updateProfile({
            contextAnswer: newAnswers.contextAnswer,
            biggestWin: newAnswers.biggestWinAnswer,
            blindSpot: newAnswers.blindSpotAnswer,
            challengeInsight: newAnswers.challengeAnswer,
            strengthSummary: isEn
              ? 'Trust Architecture, Measurable Transformation Delivery, and Authentic Depth of Self-Awareness.'
              : 'Kiến tạo Niềm tin, Chuyển đổi Đo lường được, và Chiều sâu Tự nhận thức Chân thực.',
          });
        }
      }
    }, 1800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendAnswer();
    }
  };

  const currentPhaseData = COACHING_PHASES[currentPhase];
  const isSynthesisPhase = currentPhaseData?.type === 'synthesis';
  const isInputPhase = currentPhaseData?.type === 'open';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-120px)] flex flex-col animate-fade-in-up">
      {/* Session Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-silver/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
            <Heart className="w-4 h-4 text-coral" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral block">
              {isEn ? 'ICF 1:1 Coaching Session · Step 1/5' : 'Buổi Coach 1:1 Tiêu Chuẩn ICF · Bước 1/5'}
            </span>
            <span className="text-[10px] text-ink/40">
              {isEn ? 'Discovering Strengths & Blind Spots' : 'Khai phá Thế mạnh & Điểm mù'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3" />
          <span>{isEn ? 'Confidential' : 'Bảo mật tuyệt đối'}</span>
        </div>
      </div>

      {/* Chat Conversation Area */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-4 custom-scrollbar">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[88%] rounded-3xl p-4 sm:p-5 space-y-2 ${
              msg.role === 'coach'
                ? 'bg-white border border-silver/80 shadow-sm'
                : 'bg-ink text-cream'
            }`}>
              {/* Avatar & Label */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                {msg.role === 'coach' ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center">
                      <Heart className="w-2.5 h-2.5 text-coral fill-current" />
                    </div>
                    <span className="text-coral">Coach AI</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full bg-cream/20 flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-cream" />
                    </div>
                    <span className="text-cream/70">{profile.name || (isEn ? 'You' : 'Bạn')}</span>
                  </>
                )}
              </div>

              {/* Message Content */}
              <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'coach' ? 'text-ink/80' : 'text-cream/90'
              }`}>
                {msg.message}
              </div>
            </div>
          </div>
        ))}

        {/* Coach Typing Indicator */}
        {isCoachTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white border border-silver/80 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center">
                  <Heart className="w-2.5 h-2.5 text-coral fill-current" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-coral">Coach AI</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-ink/40">
                <div className="w-2 h-2 bg-coral/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-coral/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-coral/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs ml-1">{isEn ? 'Listening deeply...' : 'Đang lắng nghe sâu...'}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area — visible only during open question phases */}
      {isInputPhase && !isCoachTyping && (
        <div className="bg-white border-t border-silver/60 pt-4 pb-2 space-y-3">
          <textarea
            rows={3}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isEn ? currentPhaseData.placeholderEn : currentPhaseData.placeholder}
            autoFocus
            className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-4 rounded-2xl border border-silver/80 focus:border-ink focus:ring-1 focus:ring-ink/10 resize-none transition-all"
          />

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-ink/30 italic">
              {isEn ? 'Press Enter to send · Shift+Enter for new line' : 'Nhấn Enter để gửi · Shift+Enter để xuống dòng'}
            </span>

            <button
              onClick={handleSendAnswer}
              disabled={!currentInput.trim()}
              className="px-5 py-2.5 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90 transition-all disabled:opacity-30 flex items-center gap-2 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isEn ? 'Send' : 'Gửi câu trả lời'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Synthesis Phase — CTA to move to Session 2 */}
      {isSynthesisPhase && (
        <div className="bg-white border-t border-silver/60 pt-5 pb-2">
          <button
            onClick={onNext}
            className="w-full py-4 rounded-full bg-ink text-cream text-sm font-bold hover:bg-ink/90 transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isEn ? 'Continue to Positioning & Visual Vibe' : 'Tiếp tục chọn hướng xuất hiện & Phong cách Visual'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
