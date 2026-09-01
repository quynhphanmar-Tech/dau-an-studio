import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Sparkles, User, Heart, ArrowRight, Send } from 'lucide-react';

/**
 * ICF COACHING FLOW ARCHITECTURE WITH CUSTOMIZED COGNITIVE TWIST
 * 
 * Persona: "Dấu Ấn Coach (ICF Partner)" - Warm, profound, human, deeply respectful.
 * 
 * Dynamic Cognitive Twist Generator:
 * - Detects if Expert is in "Comfort Zone / High Income / Senior Role" vs "Career Transition / Challenge"
 * - Tailors the Content Compass to:
 *    A) Senior / Comfortable Expert: Legacy, Knowledge Monopoly & Freedom of Choice ("Di sản & Quyền Chọn Hợp Tác")
 *    B) Transitioning Expert: Value Independence & Safety Net ("Tự Do Tài Chính & Đóng Gói Chuyên Môn")
 */

const COACHING_PHASES = [
  {
    id: 'welcome',
    coachMessage: 'Chào mừng bạn đến với buổi khai vấn 1:1. Tôi là Người Đồng Hành Khai Vấn từ Dấu Ấn Studio — vai trò của tôi không phải đưa lời khuyên hay giảng giải, mà là lắng nghe và cùng bạn nhìn thấy những góc nhìn mới mà có thể bạn chưa từng gọi tên.\n\nHãy thoải mái chia sẻ, đây là khoảng không gian hoàn toàn riêng tư của bạn.',
    coachMessageEn: 'Welcome to your 1:1 coaching session. I am your ICF Partner from Dấu Ấn Studio — my role is not to give generic advice, but to listen deeply and help you uncover powerful new perspectives.\n\nFeel free to share openly, this is your private space.',
    type: 'intro'
  },
  {
    id: 'q1_context',
    coachMessage: 'Để tôi có thể đi cùng bạn một cách sâu sắc nhất, hãy chia sẻ cho tôi biết:\n\nHiện tại bạn đang làm công việc gì, có bao nhiêu năm tích lũy chuyên môn, và điều gì thực sự thôi thúc bạn nghĩ đến việc xây dựng thương hiệu cá nhân ở thời điểm này?',
    coachMessageEn: 'To accompany you meaningfully, please share:\n\nWhat is your current role, how many years of expertise have you accumulated, and what truly prompts you to build your personal brand at this moment?',
    placeholder: 'Chia sẻ tự do về công việc, trải nghiệm và động lực thực sự của bạn...',
    placeholderEn: 'Share freely about your work, experience, and real motivation...',
    field: 'contextAnswer',
    type: 'open'
  },
  {
    id: 'q2_biggest_win',
    coachMessage: null, // Dynamic
    coachMessageEn: null,
    placeholder: 'Kể cho tôi nghe về kết quả hoặc sự thay đổi thật mà bạn tự hào nhất...',
    placeholderEn: 'Tell me about the real result or transformation you are most proud of...',
    field: 'biggestWinAnswer',
    type: 'open'
  },
  {
    id: 'q3_blind_spot',
    coachMessage: null, // Dynamic
    coachMessageEn: null,
    placeholder: 'Nói thật với lòng mình — điều gì đang làm bạn băn khoăn...',
    placeholderEn: 'Be honest with yourself — what is really making you hesitate...',
    field: 'blindSpotAnswer',
    type: 'open'
  },
  {
    id: 'q4_challenge',
    coachMessage: null, // Dynamic
    coachMessageEn: null,
    placeholder: 'Nếu nhìn từ góc nhìn di sản hoặc giá trị 3-5 năm tới...',
    placeholderEn: 'Looking from the perspective of legacy or value 3-5 years out...',
    field: 'challengeAnswer',
    type: 'open'
  },
  {
    id: 'synthesis',
    coachMessage: null, // Dynamic — Custom Cognitive Twist & Content Compass
    type: 'synthesis'
  }
];

// Helper to detect if user is in "Comfortable / Senior" profile
function isComfortableSeniorProfile(text = '') {
  const t = text.toLowerCase();
  return (
    t.includes('10 năm') || t.includes('15 năm') || t.includes('20 năm') ||
    t.includes('giám đốc') || t.includes('director') || t.includes('ceo') ||
    t.includes('quản lý') || t.includes('manager') || t.includes('ổn định') ||
    t.includes('thu nhập tốt') || t.includes('chuyên gia') || t.includes('lâu năm') ||
    t.includes('kinh nghiệm')
  );
}

function generateDynamicCoachResponse(phaseId, answers, profile, isEn) {
  const name = profile.name || (isEn ? 'Expert' : 'Chuyên gia');
  const ctx = answers.contextAnswer || '';
  const win = answers.biggestWinAnswer || '';
  const blind = answers.blindSpotAnswer || '';
  const isSenior = isComfortableSeniorProfile(ctx + ' ' + win + ' ' + blind);

  switch (phaseId) {
    case 'q2_biggest_win':
      if (isEn) {
        return `Thank you for sharing, ${name}. I hear years of dedication and deep domain mastery in your story.\n\nNow, let's look closer: Among all the projects and milestones, what is ONE specific transformation you brought to a client or team that still gives you immense fulfillment when you recall it?`;
      }
      return `Cảm ơn bạn đã chia sẻ, ${name}. Tôi lắng nghe và cảm nhận được sự tích lũy cùng chiều sâu trải nghiệm trong câu chuyện của bạn.\n\nBây giờ, hãy cùng nhìn sâu hơn: Trong tất cả những cột mốc đã qua, đâu là MỘT sự thay đổi cụ thể mà bạn đã mang lại cho khách hàng hoặc tổ chức mà đến tận bây giờ, mỗi khi nhớ lại, bạn vẫn thấy tràn đầy tự hào?`;

    case 'q3_blind_spot':
      if (isEn) {
        return `"${win.slice(0, 80)}..."\n\nThat is a remarkable footprint. You don't just execute — you create genuine impact.\n\nNow, let me ask you something honest: Many professionals with your level of experience are in a comfortable position. Income is fine, reputation is established within their immediate circle.\n\n🔍 But what is the hidden constraint or inner hesitation that has kept you from packaging this expertise into a standalone Personal Brand for the broader market?`;
      }
      return `"${win.slice(0, 80)}..."\n\nĐó là một dấu ấn thật sự ấn tượng. Bạn không chỉ làm việc — bạn tạo ra giá trị chuyển đổi thật.\n\nBởi vậy, tôi muốn hỏi bạn một câu hỏi rất thật: Nhìn từ bên ngoài, một người có bề dày kinh nghiệm như bạn thường đã có vị trí và thu nhập tương đối ổn định. Mọi thứ đều đang "tốt".\n\n🔍 Vậy điều gì thực sự đang làm bạn băn khoăn hoặc giữ bạn lại, khiến bạn chưa đóng gói tri thức này thành một Thương Hiệu Cá Nhân độc bản ra thị trường rộng lớn hơn?`;

    case 'q4_challenge':
      if (isSenior) {
        if (isEn) {
          return `I respect your reflection deeply. When things are working well, building a brand isn't about survival — and that's precisely why most experts delay it until it's too late.\n\n💡 Consider this cognitive shift:\nIf you remain invisible behind your current company or routine for another 3 to 5 years, what happens to your personal monopoly on expertise? When you step out, will you own your authority, or will you have to start from scratch?`;
        }
        return `Tôi rất trân trọng sự chiêm nghiệm này của bạn. Khi cuộc sống và công việc đang ổn định, xây dựng thương hiệu không phải để kiếm sống qua ngày — và đó chính là lý do vì sao nhiều chuyên gia giỏi thường trì hoãn nó cho đến khi quá muộn.\n\n💡 Hãy thử cùng tôi nhìn vào một cú xoay nhận thức (Cognitive Twist):\nNếu 3-5 năm nữa bạn vẫn ẩn mình phía sau tổ chức hay guồng quay hiện tại, điều gì sẽ xảy ra với "quyền sở hữu di sản tri thức" của riêng bạn? Khi bước ra ngoài, bạn sẽ là người nắm thế chủ động định giá và chọn đối tác, hay lại phải chứng minh năng lực từ đầu?`;
      } else {
        if (isEn) {
          return `I appreciate your truth. "${blind.slice(0, 60)}..." — that is a very real friction.\n\n💡 But consider this:\nWhat if building your brand isn't an extra burden, but your ultimate safety net and freedom ticket? Who specifically is missing out right now because your framework isn't packaged yet?`;
        }
        return `Tôi trân trọng sự chân thật của bạn. "${blind.slice(0, 60)}..." — đó là một điểm nghẽn rất thực tế.\n\n💡 Nhưng hãy thử nhìn từ góc độ này cùng tôi:\nNếu việc xây dựng thương hiệu cá nhân không phải là một "gánh nặng làm thêm", mà chính là chiếc "quỹ an toàn và tấm vé tự do" giúp bạn hoàn toàn làm chủ thu nhập và thời gian thì sao?`;
      }

    case 'synthesis':
      if (isSenior) {
        if (isEn) {
          return `## 🪞 Phản Chiếu Từ Người Đồng Hành Khai Vấn\n\nSau khi lắng nghe sâu bối cảnh và trải nghiệm của bạn, đây là những điểm sáng và góc nhìn mới tôi nhận thấy:\n\n**✨ 3 Thế Mạnh Cốt Lõi Độc Bản:**\n1. **Uy Tín Thực Chiến (Authority)** — Tri thức tích lũy qua trải nghiệm thật, không thể làm giả.\n2. **Năng Lực Tạo Chuyển Đổi (Impact)** — "${win.slice(0, 50)}..." chứng minh giá trị tạo ra đo lường được.\n3. **Tầm Nhìn Vượt Khỏi Vùng An Toàn (Legacy Mindset)** — Sẵn sàng nhìn lại bản thân để xây dựng vị thế dài hạn.\n\n**🔍 Cú Twist Nhận Thức (Cognitive Shift):**\nĐối với một chuyên gia đã có sự ổn định, thương hiệu cá nhân **không phải để kiếm thêm thu nhập lẻ**, mà là để **SỞ HỮU QUYỀN CHỌN** (Freedom of Choice): Quyền chọn làm việc với ai, theo mức giá nào, và để lại di sản tri thức riêng vượt khỏi bất kỳ tổ chức nào.\n\n**🧭 La Bàn Nội Dung Custom Cho Bạn:**\n*Mỗi bài viết/video bạn tạo ra sẽ xoay quanh kim chỉ nam:* **"Đóng gói 10+ năm tri thức thành Di Sản Độc Bản — Chuyển từ người làm thuê cao cấp sang Chủ Sở Hữu Vị Thế."**`;
        }
        return `## 🪞 Gương Phản Chiếu Từ Người Đồng Hành Khai Vấn\n\nSau khi lắng nghe sâu bối cảnh và trải nghiệm của bạn, đây là những điểm sáng và góc nhìn mới tôi nhìn thấy ở bạn:\n\n**✨ 3 Thế Mạnh Cốt Lõi Độc Bản:**\n1. **Uy Tín Thực Chiến (Authority)** — Tri thức tích lũy qua trải nghiệm thật, sâu sắc và có trọng lượng.\n2. **Năng Lực Tạo Chuyển Đổi (Impact)** — "${win.slice(0, 50)}..." chứng minh giá trị tạo ra đo lường được.\n3. **Sự Dũng Cảm Nhìn Vào Điểm Mù (Self-Awareness)** — Dám nhìn thẳng vào vùng an toàn để định hình lại bước đi tương lai.\n\n**🔍 Cú Twist Trong Nhận Thức (Cognitive Twist):**\nVới một chuyên gia đã có sự ổn định như bạn, thương hiệu cá nhân **KHÔNG PHẢI để kiếm thêm thu nhập vặt**, mà là để **SỞ HỮU QUYỀN CHỌN (Freedom of Choice)**: Quyền chọn hợp tác với ai, trên điều kiện nào, định giá chuyên môn xứng đáng và để lại một **Di Sản Tri Thức Độc Bản** không phụ thuộc vào bất kỳ danh xưng công ty nào.\n\n**🧭 La Bàn Nội Dung Định Hướng Riêng Cho Bạn:**\n*Mỗi ấn phẩm nội dung bạn tạo ra từ hôm nay sẽ là một viên gạch xây dựng:* **"Di sản tri thức thực chiến — Chuyển hóa kinh nghiệm lâu năm thành Quyền Lực Thương Hiệu Độc Bản."**`;
      } else {
        if (isEn) {
          return `## 🪞 Phản Chiếu Từ Người Đồng Hành Khai Vấn\n\n**✨ 3 Thế Mạnh Cốt Lõi:**\n1. **Năng Lực Tạo Niềm Tin** — Trải nghiệm thực chiến sâu sắc.\n2. **Kết Quả Thực Tế** — "${win.slice(0, 50)}..." chứng minh năng lực.\n3. **Tinh Thần Đổi Mới** — Khát khao tự do và làm chủ con đường riêng.\n\n**🔍 Cú Twist Trong Nhận Thức:**\nThương hiệu cá nhân chính là chiếc **Quỹ An Toàn & Động Cơ Tự Do** giúp bạn rút ngắn khoảng cách chuyển đổi và chủ động làm chủ sự nghiệp.\n\n**🧭 La Bàn Nội Dung Định Hướng:**\n*Mỗi bài viết bạn tạo ra từ hôm nay sẽ xoay quanh:* **"Giải quyết 1 nỗi đau cụ thể cho đúng tệp khách hàng mục tiêu bằng phương pháp thực chiến."**`;
        }
        return `## 🪞 Gương Phản Chiếu Từ Người Đồng Hành Khai Vấn\n\n**✨ 3 Thế Mạnh Cốt Lõi Của Bạn:**\n1. **Năng Lực Tạo Niềm Tin Chân Thật** — Trải nghiệm thực chiến giúp bạn thấu hiểu nỗi đau khách hàng sâu sắc.\n2. **Chuyển Đổi Thực Tế** — "${win.slice(0, 50)}..." chứng minh năng lực mang lại kết quả rõ ràng.\n3. **Khao Khát Tự Do Sự Nghiệp** — Dũng cảm bước ra khỏi lối mòn để tự đóng gói giá trị bản thân.\n\n**🔍 Cú Twist Trong Nhận Thức (Cognitive Twist):**\nXây dựng thương hiệu cá nhân **không phải là tạo sự chú ý hào nhoáng**, mà là xây dựng **Tấm Vé Tự Do & Quỹ An Toàn** giúp bạn rút ngắn thời gian chuyển đổi, có ngay 3 khách hàng đầu tiên mà không bị kiệt sức.\n\n**🧭 La Bàn Nội Dung Định Hướng Riêng Cho Bạn:**\n*Mỗi ấn phẩm nội dung bạn tạo ra từ hôm nay sẽ tập trung vào:* **"Đóng gói 1 giải pháp cụ thể giúp khách hàng mục tiêu vượt qua điểm nghẽn lớn nhất."**`;
      }

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
    const timer = setTimeout(() => {
      const q1 = COACHING_PHASES[1];
      setChatHistory(prev => [...prev, {
        role: 'coach',
        message: isEn ? q1.coachMessageEn : q1.coachMessage,
        phase: 'q1_context'
      }]);
      setCurrentPhase(1);
    }, 1500);

    return () => clearTimeout(timer);
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

        // If synthesis phase, update profile with extracted strengths and content compass
        if (nextPhase.type === 'synthesis') {
          const isSenior = isComfortableSeniorProfile((newAnswers.contextAnswer || '') + ' ' + (newAnswers.biggestWinAnswer || ''));
          updateProfile({
            contextAnswer: newAnswers.contextAnswer,
            biggestWin: newAnswers.biggestWinAnswer,
            blindSpot: newAnswers.blindSpotAnswer,
            challengeInsight: newAnswers.challengeAnswer,
            strengthSummary: isSenior
              ? (isEn ? 'Authority & Track Record, Measurable Transformation, Strategic Self-Awareness.' : 'Uy Tín Thực Chiến, Năng Lực Tạo Chuyển Đổi, Tầm Nhìn Di Sản Tri Thức.')
              : (isEn ? 'Trust Architecture, Practical Impact, Career Transformation Drive.' : 'Năng Lực Tạo Niềm Tin, Chuyển Đổi Thực Tế, Tự Do Sự Nghiệp.'),
            contentCompass: isSenior
              ? 'Đóng gói 10+ năm tri thức thành Di Sản Độc Bản — Chuyển từ người làm thuê cao cấp sang Chủ Sở Hữu Vị Thế.'
              : 'Đóng gói 1 giải pháp cụ thể giúp khách hàng mục tiêu vượt qua điểm nghẽn lớn nhất.'
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
            <Heart className="w-4 h-4 text-coral fill-current" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral block">
              {isEn ? '1:1 Executive ICF Coaching · Step 1/5' : 'Buổi Khai Vấn 1:1 Chuẩn ICF · Bước 1/5'}
            </span>
            <span className="text-[10px] text-ink/40">
              {isEn ? 'Discovering Strengths, Blind Spots & Content Compass' : 'Khai phá Thế mạnh, Điểm mù & La bàn Nội dung'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3" />
          <span>{isEn ? 'Confidential' : 'Bảo mật riêng tư'}</span>
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
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
                      <Heart className="w-2.5 h-2.5 text-amber-700 fill-current" />
                    </div>
                    <span className="text-amber-900 font-serif">Dấu Ấn Coach (ICF Partner)</span>
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
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
                  <Heart className="w-2.5 h-2.5 text-amber-700 fill-current" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 font-serif">Dấu Ấn Coach (ICF Partner)</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-ink/40">
                <div className="w-2 h-2 bg-coral/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-coral/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-coral/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs ml-1 font-serif italic">{isEn ? 'Listening deeply to your story...' : 'Đang lắng nghe sâu câu chuyện của bạn...'}</span>
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
              <span>{isEn ? 'Send' : 'Gửi suy ngẫm'}</span>
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
