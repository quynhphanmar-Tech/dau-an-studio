import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Mic, MicOff, Paperclip, Send, Check, Edit3, 
  HelpCircle, Sparkles, Shield, RefreshCw, X, FileText, ChevronDown, 
  ChevronUp, Lock, CheckCircle2, AlertCircle, Info, Eye, Layers, User, Award
} from 'lucide-react';

/**
 * DẤU ẤN STUDIO — SESSION 1: BRAND COACHING & SNAPSHOT
 * Matching 100% personal_brand_app_uiux_update_spec.md & New Visual Moodboard (media_1788254706490.jpg)
 */

// 7 Guided Coaching Steps according to Spec Section 4.2
const COACHING_STEPS = [
  {
    id: 1,
    title: 'Vai trò & Mục tiêu',
    titleEn: 'Role & 12-Month Goal',
    eyebrow: 'BƯỚC 1/6 · CONTEXT',
    question: 'Vai trò hiện tại của bạn là gì và mục tiêu thương hiệu lớn nhất trong 12 tháng tới của bạn là gì?',
    questionEn: 'What is your current role and your biggest personal brand goal for the next 12 months?',
    helper: 'Ví dụ: Thu hút khách hàng cao cấp, tạo uy tín ngành, nhận lời mời làm diễn giả, hay chuyển đổi từ làm thuê sang tư vấn tự do.',
    helperEn: 'e.g., Attract high-ticket leads, build industry authority, land keynote speaking, or transition to independent consulting.',
    placeholder: 'Tôi là Giám đốc Chiến lược / Chuyên gia Tư vấn 10+ năm kinh nghiệm. Mục tiêu 12 tháng tới là...',
    placeholderEn: 'I am a Strategy Director / Consultant with 10+ years. My 12-month goal is to...',
    options: [
      'Thu hút khách hàng & hợp đồng tư vấn mới (Leads & Revenue)',
      'Xây dựng uy tín chuyên môn dẫn đầu ngành (Industry Authority)',
      'Tạo bệ phóng chuyển đổi sự nghiệp độc lập (Career Transition)',
      'Trở thành Diễn giả / Author được mời trong ngành (Keynote & Media)'
    ]
  },
  {
    id: 2,
    title: 'Năng lực cốt lõi',
    titleEn: 'Core Expertise',
    eyebrow: 'BƯỚC 2/6 · EXPERTISE',
    question: 'Mọi người hoặc khách hàng thường tìm đến bạn để giải quyết điểm nghẽn khó khăn nào nhất?',
    questionEn: 'What is the single most difficult bottleneck people or clients come to you to solve?',
    helper: 'Hãy kể bằng vấn đề thực tế mà bạn xử lý nhanh gọn và hiệu quả nhất.',
    helperEn: 'Describe the real problem you solve most efficiently and effectively.',
    placeholder: 'Họ tìm đến tôi khi gặp bế tắc về chiến lược dòng tiền, tái cấu trúc đội ngũ hoặc...',
    placeholderEn: 'They come to me when stuck on cash flow strategy, team restructuring, or...',
    options: [
      'Chẩn đoán & bóc tách nút thắt chiến lược cốt lõi',
      'Tái cấu trúc hệ thống & tối ưu hóa vận hành',
      'Xây dựng chiến lược tăng trưởng & dòng tiền an toàn',
      'Đào tạo & phát triển năng lực lãnh đạo thực chiến'
    ]
  },
  {
    id: 3,
    title: 'Bằng chứng & Kết quả',
    titleEn: 'Proof & Impact Case',
    eyebrow: 'BƯỚC 3/6 · PROOF',
    question: 'Đâu là một kết quả hoặc câu chuyện dự án cụ thể khiến bạn tự hào nhất khi nhắc đến?',
    questionEn: 'What is ONE specific project result or transformation that makes you proudest?',
    helper: 'Một con số, một sự chuyển đổi cụ thể từ bối cảnh ban đầu đến kết quả đạt được.',
    helperEn: 'A specific metric or before/after transformation you delivered.',
    placeholder: 'Ví dụ: Đã đồng hành giúp 60+ chuyên gia xây quỹ an toàn 12 tháng và có 3 khách hàng đầu tiên...',
    placeholderEn: 'e.g., Helped 60+ experts build a 12-month safety runway and secure their first 3 clients...',
    options: []
  },
  {
    id: 4,
    title: 'Góc nhìn phản biện (POV)',
    titleEn: 'Contrarian Belief & POV',
    eyebrow: 'BƯỚC 4/6 · CONTRARIAN POV',
    question: 'Điều gì trong ngành mà bạn KHÔNG đồng ý hoặc muốn làm khác với suy nghĩ của số đông?',
    questionEn: 'What common industry belief do you strongly disagree with or want to approach differently?',
    helper: 'Đây chính là góc nhìn tạo nên sự khác biệt (Differentiator) giúp thương hiệu của bạn không bị lẫn vào đám đông.',
    helperEn: 'This unique stance is your key differentiator that sets you apart from noisy creators.',
    placeholder: 'Ví dụ: Tôi không tin vào việc làm nội dung viral giật gân; tôi tin vào uy tín tạo ra từ bằng chứng thực tế...',
    placeholderEn: 'e.g., I don’t believe in chasing viral hype; I believe authority comes from verified proof...',
    options: [
      'Tập trung vào giải pháp gốc rễ thay vì chữa cháy tạm thời',
      'Xây dựng uy tín dựa trên bằng chứng thật thay vì phô trương truyền thông',
      'Ưu tiên chất lượng & chiều sâu thay vì chạy theo số lượng bề nổi',
      'Chuyên môn giỏi phải đi kèm đóng gói giá trị rõ ràng để định giá đúng'
    ]
  },
  {
    id: 5,
    title: 'Đối tượng mục tiêu',
    titleEn: 'Target Audience',
    eyebrow: 'BƯỚC 5/6 · AUDIENCE',
    question: 'Ai là nhóm người cụ thể nhất mà bạn muốn trao giá trị và đồng hành trong giai đoạn này?',
    questionEn: 'Who is the specific target audience you want to impact and work with most right now?',
    helper: 'Họ là ai, đang gặp khó khăn gì và khao khát đạt được kết quả nào?',
    helperEn: 'Who are they, what is their core pain point, and what desired outcome do they seek?',
    placeholder: 'Chuyên gia / Founder 30-45 tuổi có chuyên môn giỏi nhưng chưa biết đóng gói thương hiệu...',
    placeholderEn: 'Experts / Founders 30-45 with deep skills but unsure how to package their personal brand...',
    options: [
      'CEO / Founder doanh nghiệp SME đang cần tái cấu trúc',
      'Chuyên gia 30+ đang chuyển đổi sang công việc tư vấn tự do',
      'Quản lý cấp cao muốn xây dựng vị thế chuyên môn dẫn đầu',
      'Nhà đầu tư & Đối tác chiến lược tìm kiếm giải pháp có chiều sâu'
    ]
  },
  {
    id: 6,
    title: 'Giọng văn & Phong cách',
    titleEn: 'Voice & Expression Style',
    eyebrow: 'BƯỚC 6/6 · BRAND VOICE',
    question: 'Bạn muốn thương hiệu của mình mang sắc thái giao tiếp chính nào khi xuất hiện trên thị trường?',
    questionEn: 'What tone of voice best represents your authentic presence in the market?',
    helper: 'Chọn 1-2 phong cách phù hợp nhất với con người thật của bạn.',
    helperEn: 'Select 1-2 tones that match your natural communication style.',
    options: [
      '🏛️ Authority (Sắc bén, đĩnh đạc, chuyên môn cao, dẫn dắt thị trường)',
      '🌿 Mentor (Ấm áp, thấu hiểu, đồng hành, chia sẻ bài học sâu sắc)',
      '💡 Provocative (Thách thức lối mòn, thẳng thắn, phản biện sắc sảo)',
      '📖 Storyteller (Chân thật, giàu trải nghiệm, kể chuyện truyền cảm hứng)'
    ]
  }
];

export default function Session1Strengths({ profile, updateProfile, onNext, lang = 'vi' }) {
  const isEn = lang === 'en';

  // State: 'welcome' | 'coaching' | 'snapshot'
  const [viewState, setViewState] = useState('welcome');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // User input
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const recordIntervalRef = useRef(null);

  // Storage of answers
  const [answers, setAnswers] = useState({
    roleGoal: '',
    expertise: '',
    proof: '',
    pov: '',
    audience: '',
    voice: ''
  });

  // Micro-reward coaching insights
  const [microInsight, setMicroInsight] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Final Brand Snapshot Output State
  const [brandSnapshot, setBrandSnapshot] = useState(null);

  // Voice recording interval
  useEffect(() => {
    if (isRecording) {
      recordIntervalRef.current = setInterval(() => setRecordTimer(t => t + 1), 1000);
    } else {
      clearInterval(recordIntervalRef.current);
    }
    return () => clearInterval(recordIntervalRef.current);
  }, [isRecording]);

  const currentStep = COACHING_STEPS[currentStepIdx];

  // Submit response & generate micro-reward
  const handleSendAnswer = (overrideText = null) => {
    const textToSend = overrideText || selectedOption || inputText;
    if (!textToSend.trim()) return;

    const keys = ['roleGoal', 'expertise', 'proof', 'pov', 'audience', 'voice'];
    const currentKey = keys[currentStepIdx];

    const updatedAnswers = { ...answers, [currentKey]: textToSend.trim() };
    setAnswers(updatedAnswers);
    setInputText('');
    setSelectedOption('');
    setIsAnalyzing(true);

    // Micro-reward Coaching Reflection after 2-3 questions
    setTimeout(() => {
      setIsAnalyzing(false);

      if (currentStepIdx === 1) {
        setMicroInsight(isEn
          ? '💡 Coach Reflection: I observe a strong practical authority in your answers. You create value through root-cause problem solving.'
          : '💡 Phản chiếu từ Coach: Dấu Ấn Coach nhận thấy một nền tảng uy tín thực chiến rất mạnh. Bạn tạo giá trị từ năng lực chẩn đoán tận gốc vấn đề.');
      } else if (currentStepIdx === 3) {
        setMicroInsight(isEn
          ? '💡 Differentiator Insight: Your contrarian perspective provides a sharp competitive moat in a noisy market.'
          : '💡 Nhận định Khác biệt: Góc nhìn phản biện của bạn chính là rào cản cạnh tranh sắc bén giúp thương hiệu không bị lẫn vào số đông.');
      } else {
        setMicroInsight(null);
      }

      if (currentStepIdx < COACHING_STEPS.length - 1) {
        setCurrentStepIdx(prev => prev + 1);
      } else {
        // Synthesize Brand Snapshot
        generateBrandSnapshot(updatedAnswers);
      }
    }, 1000);
  };

  const generateBrandSnapshot = (finalAnswers) => {
    const role = finalAnswers.roleGoal || 'Chuyên gia / Advisor';
    const audience = finalAnswers.audience || 'khách hàng mục tiêu cao cấp';
    const proof = finalAnswers.proof || 'kinh nghiệm thực chiến 10+ năm';
    const pov = finalAnswers.pov || 'tập trung vào giải pháp gốc rễ và bằng chứng thật';
    const voice = finalAnswers.voice || 'Authority & Mentor (Sắc bén & Thấu hiểu)';

    const snapshot = {
      positioningStatement: isEn
        ? `You are not just a ${role.slice(0, 30)}. You help ${audience.slice(0, 40)} achieve transformational results anchored on ${pov.slice(0, 50)}.`
        : `Bạn không chỉ là ${role.slice(0, 35)}. Bạn giúp ${audience.slice(0, 45)} tạo chuyển đổi thực tế bằng phương pháp kiểm chứng với góc nhìn sắc bén: ${pov.slice(0, 50)}.`,
      coreAssets: [
        isEn ? 'Systemic Diagnostic & Bottleneck Removal' : 'Năng lực Chẩn đoán Chiến lược & Giải quyết đúng Nút thắt',
        isEn ? 'Trust-Driven Execution & Real Proof Track Record' : 'Uy tín Thực chiến & Năng lực Tạo Niềm tin qua Kết quả',
        isEn ? 'Proprietary Value Packaging & Signature Offer' : 'Phương pháp luận Độc bản & Khả năng Đóng gói Giá trị'
      ],
      ownedTopics: [
        isEn ? '1. Diagnostic Methodology & Root-Cause Strategy' : '1. Năng lực Chẩn đoán & Phương pháp luận Thực chiến',
        isEn ? '2. Lessons Learned & Real Cost of Mistakes' : '2. Câu chuyện thật & Bài học Đắt giá trong Ngành',
        isEn ? '3. Contrarian POV & New Quality Standards' : '3. Góc nhìn Phản biện & Tiêu chuẩn Uy tín Mới'
      ],
      recommendedVoice: voice,
      firstOpportunity: isEn ? 'Short Authority Video Script on cash flow runway & positioning' : 'Kịch bản Video Authority 60s về Định vị & Đóng gói Giá trị'
    };

    setBrandSnapshot(snapshot);
    setViewState('snapshot');
  };

  const handleConfirmSnapshot = () => {
    updateProfile({
      positioningStatement: brandSnapshot.positioningStatement,
      strengthSummary: brandSnapshot.coreAssets.join('. '),
      brandSnapshot: {
        ...brandSnapshot,
        confirmedAt: new Date().toISOString(),
        status: 'confirmed'
      }
    });
    onNext();
  };

  // -------------------------------------------------------------
  // VIEW 1: WELCOME SCREEN (IMPRINT COCOON — MOODBOARD MATCH)
  // -------------------------------------------------------------
  if (viewState === 'welcome') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 min-h-[calc(100vh-140px)] flex flex-col justify-between items-center text-center animate-fade-in font-sans">
        
        {/* Top Branding Pill */}
        <div className="space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#315CFF]/10 text-[#315CFF] text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IMPRINT COCOON — BẢN SẮC ĐƯỢC KHAI MỜ</span>
          </div>
        </div>

        {/* Center Logo & Fingerprint Line Art (Exact Moodboard Match) */}
        <div className="space-y-6 max-w-2xl py-6 flex flex-col items-center">
          {/* Oval Fingerprint Logo Mark */}
          <div className="w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center relative">
            <svg viewBox="0 0 200 240" fill="none" className="w-full h-full text-ink stroke-current">
              <path d="M100 20 C50 20, 20 60, 20 120 C20 180, 50 220, 100 220 C150 220, 180 180, 180 120 C180 60, 150 20, 100 20" strokeWidth="2.5" strokeDasharray="4 4" />
              <path d="M100 35 C62 35, 35 70, 35 120 C35 170, 62 205, 100 205 C138 205, 165 170, 165 120 C165 70, 138 35, 100 35" strokeWidth="3" />
              <path d="M100 50 C75 50, 50 80, 50 120 C50 160, 75 190, 100 190 C125 190, 150 160, 150 120 C150 80, 125 50, 100 50" strokeWidth="3.5" className="text-[#315CFF] stroke-[#315CFF]" />
              <path d="M100 68 C84 68, 68 90, 68 120 C68 150, 84 172, 100 172 C116 172, 132 150, 132 120 C132 90, 116 68, 100 68" strokeWidth="4" />
              <path d="M100 85 C90 85, 82 98, 82 120 C82 142, 90 155, 100 155 C110 155, 118 142, 118 120 C118 98, 110 85, 100 85" strokeWidth="4.5" className="text-[#315CFF] stroke-[#315CFF]" />
              <circle cx="100" cy="120" r="7" fill="#111111" />
            </svg>
          </div>

          {/* DẤU ẤN STUDIO Wordmark */}
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight">
              DẤU ẤN STUDIO
            </h1>
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] text-ink/60 uppercase font-medium">
              Chuyên môn tạo nên dấu ấn.
            </p>
          </div>

          {/* Main Description */}
          <p className="text-sm sm:text-base text-ink/80 font-sans leading-relaxed max-w-lg pt-2">
            {isEn
              ? 'In 7 minutes of guided coaching, we will uncover your authentic Brand Snapshot — turning your real experience into a distinct authority.'
              : 'Trong 7 phút đối thoại cùng Dấu Ấn Coach, ta sẽ cùng bóc tách và gọi tên vị thế độc bản của bạn — chuyển hóa kinh nghiệm thực chiến thành uy tín được dẫn dắt.'}
          </p>
        </div>

        {/* Start Button & Meta */}
        <div className="space-y-3 w-full max-w-sm pb-4">
          <button
            onClick={() => setViewState('coaching')}
            className="w-full h-13 rounded-full bg-[#315CFF] text-white font-sans text-sm font-semibold hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
          >
            <span>{isEn ? 'Start 7-Minute Coaching' : 'Bắt đầu Khai mở Bản sắc (7 Phút)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-ink/40 font-mono">
            ⏱ {isEn ? 'Progress autosaves · Can resume anytime' : 'Tự động lưu tiến độ · Có thể dừng và tiếp tục'}
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: GUIDED COACHING SHELL (SPEC SECTION 4.2)
  // -------------------------------------------------------------
  if (viewState === 'coaching') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-140px)] flex flex-col justify-between animate-fade-in font-sans">
        
        {/* Top Progress & Eyebrow */}
        <div className="space-y-2 border-b border-silver/60 pb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
              {currentStep.eyebrow}
            </span>
            <span className="font-mono text-[11px] text-ink/40">
              {currentStepIdx + 1}/6
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-silver/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#315CFF] transition-all duration-500"
              style={{ width: `${((currentStepIdx + 1) / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Active Question Canvas */}
        <div className="py-6 space-y-6 flex-1 flex flex-col justify-center">
          
          {/* Question Title */}
          <div className="space-y-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-snug tracking-tight">
              {isEn ? currentStep.questionEn : currentStep.question}
            </h1>

            <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
              {isEn ? currentStep.helperEn : currentStep.helper}
            </p>
          </div>

          {/* Optional Pre-set Option Cards */}
          {currentStep.options.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                {isEn ? 'Select an option or write your own:' : 'Gợi ý lựa chọn nhanh (hoặc tự nhập bên dưới):'}
              </span>

              <div className="grid grid-cols-1 gap-2">
                {currentStep.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedOption(opt);
                      handleSendAnswer(opt);
                    }}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition-all ${
                      selectedOption === opt
                        ? 'bg-ink text-cream border-ink shadow-sm'
                        : 'bg-white border-silver/80 text-ink/80 hover:border-ink/40 hover:bg-cream/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Micro-Reward Insight Banner */}
          {isAnalyzing && (
            <div className="p-4 rounded-2xl bg-white border border-silver/80 text-xs flex items-center gap-2 text-ink/60 animate-fade-in shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#315CFF]" />
              <span>Dấu Ấn Coach đang nhận diện tín hiệu năng lực...</span>
            </div>
          )}

          {microInsight && !isAnalyzing && (
            <div className="p-4 rounded-2xl bg-[#315CFF]/10 border border-[#315CFF]/30 text-xs text-[#315CFF] font-medium leading-relaxed animate-fade-in shadow-xs">
              {microInsight}
            </div>
          )}
        </div>

        {/* Input Composer (Sticky Bottom) */}
        <div className="bg-white border border-silver/80 rounded-2xl p-4 space-y-3 shadow-md">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isEn ? currentStep.placeholderEn : currentStep.placeholder}
            className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-3 rounded-xl border border-silver/60 focus:border-ink resize-none font-sans"
          />

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`h-9 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isRecording ? 'bg-coral text-white animate-pulse' : 'bg-cream border border-silver text-ink hover:border-ink/40'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#315CFF]" />}
              <span>{isRecording ? `${recordTimer}s` : (isEn ? 'Voice' : 'Thu âm')}</span>
            </button>

            <div className="flex items-center gap-2">
              {currentStepIdx > 0 && (
                <button
                  onClick={() => setCurrentStepIdx(prev => prev - 1)}
                  className="px-3 py-2 text-xs text-ink/50 hover:text-ink font-medium"
                >
                  {isEn ? 'Back' : 'Quay lại'}
                </button>
              )}

              <button
                onClick={() => handleSendAnswer()}
                disabled={!inputText.trim() && !selectedOption}
                className="h-9 px-5 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all disabled:opacity-30 flex items-center gap-1.5 shadow-sm"
              >
                <span>{isEn ? 'Continue' : 'Tiếp tục'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: BRAND SNAPSHOT REVEAL (SPEC SECTION 4.3)
  // -------------------------------------------------------------
  if (viewState === 'snapshot' && brandSnapshot) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 min-h-[calc(100vh-140px)] space-y-8 animate-fade-in-up font-sans pb-24">
        
        {/* Header Hero */}
        <div className="space-y-3 border-b border-silver/60 pb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold tracking-wider uppercase">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>BRAND SNAPSHOT LEVEL 1 · XÁC NHẬN</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink tracking-tight">
            {isEn ? 'Your Brand Foundations Are Clear.' : 'Nền Móng Thương Hiệu Của Bạn Đã Rõ Nét.'}
          </h1>

          <p className="text-xs sm:text-sm text-ink/60 font-sans">
            {isEn
              ? 'Review your confirmed Brand Snapshot below before creating your first content piece.'
              : 'Hãy xem lại Brand Snapshot được tổng hợp từ trải nghiệm thật của bạn trước khi bắt đầu tạo ấn phẩm đầu tiên.'}
          </p>
        </div>

        {/* Snapshot Core Cards */}
        <div className="space-y-6">
          
          {/* 1. Core Positioning Statement */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-3 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF] block">
              1. ĐỊNH VỊ THƯƠNG HIỆU CỐT LÕI (CORE POSITIONING)
            </span>
            <p className="font-serif text-lg sm:text-xl font-bold text-ink leading-relaxed">
              "{brandSnapshot.positioningStatement}"
            </p>
          </div>

          {/* 2. Three Core Brand Assets */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
              2. BA TÀI SẢN THƯƠNG HIỆU ĐỘC BẢN
            </span>
            <div className="space-y-2.5">
              {brandSnapshot.coreAssets.map((asset, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-cream/70 rounded-2xl border border-silver/60 text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#315CFF] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-medium text-ink font-sans pt-0.5">{asset}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Three Owned Topics */}
          <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
              3. BA CHỦ ĐỀ BẠN NÊN SỞ HỮU (OWNED TOPICS)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {brandSnapshot.ownedTopics.map((topic, i) => (
                <div key={i} className="p-4 rounded-2xl bg-cream/60 border border-silver/70 text-xs space-y-1">
                  <p className="font-serif font-bold text-ink">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Voice & First Opportunity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">Giọng thương hiệu đề xuất</span>
              <p className="font-serif font-bold text-ink text-sm">{brandSnapshot.recommendedVoice}</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-silver/80 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#315CFF] block">Nội dung đầu tiên nên làm</span>
              <p className="font-medium text-ink">{brandSnapshot.firstOpportunity}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-silver/60">
          <button
            onClick={() => setViewState('coaching')}
            className="text-xs text-ink/50 hover:text-ink font-medium transition-colors"
          >
            ← {isEn ? 'Refine with Coach' : 'Chỉnh lại cùng Coach'}
          </button>

          <button
            onClick={handleConfirmSnapshot}
            className="h-12 px-8 rounded-full bg-[#315CFF] text-white font-bold text-sm hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
          >
            <span>{isEn ? 'Approve & Create First Content' : 'Đúng với tôi — Tạo nội dung đầu tiên'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
