import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Mic, MicOff, Paperclip, Send, Check, Edit3, 
  HelpCircle, Sparkles, Shield, RefreshCw, X, FileText, ChevronDown, 
  ChevronUp, Lock, CheckCircle2, AlertCircle, Info, Eye, Layers
} from 'lucide-react';

/**
 * EXPERTPRINT — SESSION 1: GUIDED DISCOVERY EXPERIENCE
 * Exact Pixel-Perfect Match to Screenshot 1 & ExpertPrint_Session1_UIUX_Spec.md
 */

// 4 Core Discovery Question Stages
const DISCOVERY_STAGES = [
  {
    id: 1,
    title: 'Bối cảnh của bạn',
    titleEn: 'Your Context',
    eyebrow: 'CHẶNG 01 · BỐI CẢNH',
    eyebrowEn: 'STAGE 01 · CONTEXT',
    question: 'Điều gì khiến bạn muốn thị trường hiểu rõ hơn về chuyên môn của mình vào lúc này?',
    questionEn: 'What makes you want the market to clearly understand your expertise right now?',
    helper: 'Không cần trả lời hoàn hảo. Hãy kể bối cảnh hiện tại, số năm kinh nghiệm và động lực thật của bạn.',
    helperEn: 'No need for a perfect answer. Share your current role, years of experience, and authentic drive.',
    placeholder: 'Ví dụ: Tôi có 10+ năm kinh nghiệm trong ngành, hiện muốn đóng gói chuyên môn để chủ động hơn...',
    placeholderEn: 'e.g., I have 10+ years in the industry, currently wanting to package my expertise...',
    hints: [
      'Bạn đang ở vị trí nào và có bao nhiêu năm tích lũy chuyên môn?',
      'Tại sao việc xây dựng thương hiệu lại quan trọng với bạn ngay lúc này?'
    ],
    hintsEn: [
      'What is your current role and years of deep expertise?',
      'Why is building your authority crucial right now?'
    ],
    defaultSignals: ['Kinh nghiệm thực chiến', 'Mục tiêu vị thế mới']
  },
  {
    id: 2,
    title: 'Dấu ấn đã tạo ra',
    titleEn: 'Your Proof of Impact',
    eyebrow: 'CHẶNG 02 · DẤU ẤN',
    eyebrowEn: 'STAGE 02 · PROOF',
    question: 'Đâu là một kết quả hoặc sự thay đổi cụ thể mà bạn đã tạo ra và đến giờ vẫn thấy tự hào?',
    questionEn: 'What is ONE specific result or transformation you created that you are still proud of today?',
    helper: 'Kể lại một tình huống có thật: khách hàng hoặc dự án đã chuyển biến ra sao từ sự can thiệp của bạn.',
    helperEn: 'Describe a real situation: how did a client or project transform because of your involvement?',
    placeholder: 'Kể lại một tình huống cụ thể: bối cảnh lúc đó khó khăn thế nào, bạn đã làm gì và kết quả ra sao...',
    placeholderEn: 'Describe a specific case: what was the initial friction, what did you do, and what was the outcome...',
    hints: [
      'Vấn đề khó khăn nhất mà khách hàng/dự án gặp phải lúc đó là gì?',
      'Con số hoặc sự thay đổi rõ nhất sau khi bạn giải quyết?'
    ],
    hintsEn: [
      'What was the most difficult bottleneck they faced initially?',
      'What was the measurable metric or transformation after your solution?'
    ],
    defaultSignals: ['Giải quyết điểm nghẽn', 'Chuyển đổi đo lường được']
  },
  {
    id: 3,
    title: 'Năng lực đứng sau kết quả',
    titleEn: 'Core Capability',
    eyebrow: 'CHẶNG 03 · NĂNG LỰC ĐỨNG SAU',
    eyebrowEn: 'STAGE 03 · CAPABILITY',
    question: 'Khi nhìn lại kết quả đó, cách nghĩ hoặc nguyên tắc cốt lõi nào của bạn đã tạo ra sự khác biệt?',
    questionEn: 'Looking back at that result, what core principle or way of thinking set your approach apart?',
    helper: 'Người khác cũng có thể làm việc đó, nhưng điều gì trong cách tiếp cận của riêng bạn khiến kết quả thành công?',
    helperEn: 'Others might do similar work, but what unique principle in your approach ensured success?',
    placeholder: 'Ví dụ: Tôi luôn bắt đầu từ dữ liệu thực tế thay vì cảm tính, và tập trung vào 1 nút thắt duy nhất...',
    placeholderEn: 'e.g., I always anchor on empirical data rather than assumptions, focusing on the single linchpin...',
    hints: [
      'Nguyên tắc nào bạn không bao giờ thỏa hiệp khi làm việc?',
      'Góc nhìn phản biện nào của bạn khác với số đông trong ngành?'
    ],
    hintsEn: [
      'What non-negotiable principle do you stand by in your practice?',
      'What contrarian perspective do you hold compared to the industry consensus?'
    ],
    defaultSignals: ['Tư duy hệ thống', 'Nguyên tắc bất biến']
  },
  {
    id: 4,
    title: 'Điều bạn chưa nhìn thấy',
    titleEn: 'Unseen Growth Edge',
    eyebrow: 'CHẶNG 04 · ĐIỂM CHƯA NHÌN THẤY',
    eyebrowEn: 'STAGE 04 · GROWTH EDGE',
    question: 'Điều gì đang làm bạn băn khoăn hoặc giữ bạn lại chưa đóng gói chuyên môn này ra thị trường rộng hơn?',
    questionEn: 'What friction or inner hesitation is currently holding you back from packaging this expertise for a broader market?',
    helper: 'Sự e ngại về thời gian, nỗi sợ bị phán xét, hay chưa biết cách gọi tên giá trị của mình?',
    helperEn: 'Is it time constraints, fear of exposure, or uncertainty about how to articulate your premium value?',
    placeholder: 'Chia sẻ thật: điều gì bạn thấy khó khăn nhất khi nghĩ đến việc xuất hiện công khai...',
    placeholderEn: 'Share honestly: what feels most challenging when considering public positioning...',
    hints: [
      'Bạn đang lo lắng điều gì nhất khi chia sẻ chuyên môn công khai?',
      'Điểm nghẽn về cách đóng gói hay niềm tin cá nhân?'
    ],
    hintsEn: [
      'What concerns you most about publicly sharing your insights?',
      'Is the constraint about packaging framework or personal belief?'
    ],
    defaultSignals: ['Nhận diện rào cản', 'Vùng phát triển (Growth Edge)']
  }
];

export default function Session1Strengths({ profile, updateProfile, onNext, lang = 'vi' }) {
  const isEn = lang === 'en';

  // Navigation State: 'landing' | 'discovery' | 'blueprint'
  const [viewState, setViewState] = useState('landing');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  // User input text & audio state
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const recordIntervalRef = useRef(null);

  // History & answers storage
  const [answers, setAnswers] = useState({
    context: '',
    win: '',
    capability: '',
    blindSpot: ''
  });

  // Reflection states
  const [isReflecting, setIsReflecting] = useState(false);
  const [currentReflection, setCurrentReflection] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [showHistoryAccordion, setShowHistoryAccordion] = useState(false);

  // Modals
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentInputText, setDocumentInputText] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Emerging signals in Session Rail
  const [emergingSignals, setEmergingSignals] = useState([
    { id: 1, label: isEn ? 'Practical Authority' : 'Uy tín thực chiến', status: 'testing' },
    { id: 2, label: isEn ? 'Systemic Thinking' : 'Tư duy hệ thống', status: 'testing' },
    { id: 3, label: isEn ? 'Transformation Delivery' : 'Chuyển đổi đo lường được', status: 'testing' }
  ]);

  // Final Blueprint State
  const [blueprintStrengths, setBlueprintStrengths] = useState([
    {
      id: 1,
      title: isEn ? 'Systemic Diagnostic & Root-Cause Alignment' : 'Chẩn đoán có hệ thống & Giải quyết đúng nút thắt cốt lõi',
      description: isEn 
        ? 'You create value by seeing through surface noise, pinpointing the single strategic bottleneck that moves the entire business.'
        : 'Bạn tạo giá trị bằng cách nhìn thấu qua các triệu chứng bề mặt, tìm đúng một điểm nghẽn chiến lược duy nhất để xoay chuyển toàn bộ kết quả.',
      evidence: isEn 
        ? 'Evidenced from your career track record and transformation achievements.'
        : 'Trích xuất từ kinh nghiệm thực tế và các kết quả dự án cụ thể mà bạn đã dẫn dắt.',
      confidence: 'proven',
      isEditing: false
    },
    {
      id: 2,
      title: isEn ? 'Trust-Driven Strategy Execution' : 'Kết nối đúng nguồn lực để chiến lược được thực thi thực tế',
      description: isEn
        ? 'You create value by translating complex frameworks into pragmatic action steps that stakeholders willingly embrace.'
        : 'Bạn tạo giá trị bằng cách chuyển hóa chiến lược phức tạp thành hành động rõ ràng mà đội ngũ và khách hàng hoàn toàn tin tưởng đồng hành.',
      evidence: isEn
        ? 'Demonstrated through your ability to align teams and generate measurable outcome.'
        : 'Chứng minh qua năng lực tạo niềm tin tự nhiên và cam kết chuyển đổi từ khách hàng.',
      confidence: 'proven',
      isEditing: false
    },
    {
      id: 3,
      title: isEn ? 'Deep Domain Authority & Framework Ownership' : 'Đóng gói phương pháp luận thực chiến thành giải pháp độc bản',
      description: isEn
        ? 'You turn years of tacit experience into a structured Signature Offer that the market can readily recognize.'
        : 'Bạn tạo giá trị bằng việc biến kinh nghiệm tích lũy lâu năm thành một khung phương pháp có cấu trúc, giúp khách hàng đạt kết quả nhanh hơn.',
      evidence: isEn
        ? 'Derived from your willingness to articulate non-negotiable principles.'
        : 'Hình thành từ các nguyên tắc nghề nghiệp nhất quán mà bạn không bao giờ thỏa hiệp.',
      confidence: 'hypothesis',
      isEditing: false
    }
  ]);

  const [growthEdge, setGrowthEdge] = useState({
    title: isEn ? 'Owning Your Distinct Market Voice' : 'Chủ động sở hữu vị thế độc bản trên thị trường',
    description: isEn
      ? 'Your depth of expertise is established, but largely confined to your direct network. The growth zone is making your tacit frameworks visible to the broader industry without feeling promotional.'
      : 'Chiều sâu chuyên môn của bạn đã được chứng minh, nhưng vẫn chủ yếu nằm trong mạng lưới quen thuộc. Vùng tăng trưởng tiếp theo là mang khung tri thức này ra thị trường rộng lớn mà vẫn giữ trọn sự tinh tế, đĩnh đạc.'
  });

  const [contentCompassDomains, setContentCompassDomains] = useState([
    {
      id: 1,
      name: isEn ? '1. Strategic Breakdown & Methodology' : '1. Năng lực & Khung phương pháp',
      angle: isEn ? 'Debunking shallow industry fixes with deep diagnostic principles' : 'Phản biện các giải pháp chữa cháy tạm thời bằng phương pháp chẩn đoán gốc rễ',
      evidence: isEn ? 'Case studies from real consulting turnarounds' : 'Bài học thực tế từ những dự án đã xoay chuyển thành công',
      audience: isEn ? 'Decision makers looking for serious partners' : 'Khách hàng cao cấp đang tìm kiếm giải pháp có chiều sâu'
    },
    {
      id: 2,
      name: isEn ? '2. Authentic Lessons & Real Cost' : '2. Câu chuyện thật & Bài học đắt giá',
      angle: isEn ? 'The expensive mistakes most leaders make when scaling too fast' : 'Những cái giá phải trả khi đưa ra quyết định mà thiếu dữ liệu kiểm chứng',
      evidence: isEn ? 'First-hand experiences and lessons learned the hard way' : 'Những trải nghiệm xương máu tích lũy qua hơn 10 năm hành nghề',
      audience: isEn ? 'Experts and founders at transition crossroads' : 'Người đang gặp khó khăn tương tự cần sự đồng cảm và lối thoát'
    },
    {
      id: 3,
      name: isEn ? '3. Contrarian View & New Standards' : '3. Góc nhìn phản biện & Tiêu chuẩn mới',
      angle: isEn ? 'Why traditional advice fails in today’s landscape' : 'Tại sao những lời khuyên thông thường trong ngành không còn hiệu quả',
      evidence: isEn ? 'Comparative analysis and empirical data' : 'Phân tích so sánh và số liệu thực tế đo lường được',
      audience: isEn ? 'Forward-thinking peers & high-ticket clients' : 'Những đối tác chiến lược tôn trọng tư duy đổi mới'
    }
  ]);

  // Voice recording timer
  useEffect(() => {
    if (isRecording) {
      recordIntervalRef.current = setInterval(() => {
        setRecordTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(recordIntervalRef.current);
    }
    return () => clearInterval(recordIntervalRef.current);
  }, [isRecording]);

  const currentStage = DISCOVERY_STAGES[currentStageIdx];

  // Submit Answer & Generate Reflection
  const handleSendAnswer = () => {
    if (!inputText.trim()) return;

    const text = inputText.trim();
    const stageKey = currentStageIdx === 0 ? 'context' : currentStageIdx === 1 ? 'win' : currentStageIdx === 2 ? 'capability' : 'blindSpot';
    
    const updatedAnswers = { ...answers, [stageKey]: text };
    setAnswers(updatedAnswers);
    setInputText('');
    setShowHints(false);
    setIsReflecting(true);

    // AI Reflection generation
    setTimeout(() => {
      setIsReflecting(false);
      const quoteSnippet = text.slice(0, 45);

      if (currentStageIdx === 0) {
        setCurrentReflection({
          quote: `"${quoteSnippet}..."`,
          hypothesis: isEn 
            ? 'I observe a strong foundation of practical experience, but your authority is still waiting to be clearly packaged.'
            : 'ExpertPrint nhận thấy một nền tảng thực chiến rất dày dặn, nhưng giá trị của bạn vẫn đang chờ được gọi tên và đóng gói sắc nét.',
          nextQuestion: isEn
            ? 'Let’s explore the evidence: What is a specific milestone or project result you are proud of?'
            : 'Hãy cùng nhìn vào bằng chứng thực tế: Đâu là một kết quả hoặc dự án cụ thể mà bạn tự hào nhất?'
        });
      } else if (currentStageIdx === 1) {
        setCurrentReflection({
          quote: `"${quoteSnippet}..."`,
          hypothesis: isEn
            ? 'This result reveals that you naturally create tangible transformation, not just theoretical advice.'
            : 'Kết quả này cho thấy bạn có năng lực tạo ra chuyển đổi thực tế đo lường được, không dừng lại ở lý thuyết.',
          nextQuestion: isEn
            ? 'What core principle in your thinking made that specific outcome possible?'
            : 'Khi nhìn lại, nguyên tắc hay cách tiếp cận cốt lõi nào của bạn đã tạo nên sự khác biệt đó?'
        });
      } else if (currentStageIdx === 2) {
        setCurrentReflection({
          quote: `"${quoteSnippet}..."`,
          hypothesis: isEn
            ? 'You operate with a clear internal framework that separates high-leverage execution from generic work.'
            : 'Bạn sở hữu một phương pháp luận làm việc có tính chuẩn mực cao — đây chính là tài sản thương hiệu độc bản.',
          nextQuestion: isEn
            ? 'What is the friction currently holding you back from making this framework visible?'
            : 'Điều gì đang là rào cản khiến bạn chưa mang khung năng lực này ra thị trường rộng lớn?'
        });
      } else {
        // Reached end of 4 questions -> Move to Blueprint
        handleGenerateBlueprint(updatedAnswers);
      }
    }, 1200);
  };

  const handleNextStage = () => {
    setCurrentReflection(null);
    if (currentStageIdx < DISCOVERY_STAGES.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
    } else {
      setViewState('blueprint');
    }
  };

  const handleGenerateBlueprint = (finalAnswers) => {
    const winSnippet = finalAnswers.win || '';
    
    setBlueprintStrengths([
      {
        id: 1,
        title: isEn ? 'Strategic Diagnostic & Root-Cause Clarity' : 'Chẩn đoán chiến lược & Nhìn thấu bản chất vấn đề',
        description: isEn 
          ? 'You create value by uncovering the true constraint holding back businesses, eliminating wasted trial and error.'
          : 'Bạn tạo giá trị bằng việc bóc tách đúng điểm nghẽn cốt lõi, giúp khách hàng tiết kiệm thời gian và nguồn lực thử sai.',
        evidence: winSnippet ? `"${winSnippet.slice(0, 90)}..."` : 'Trích xuất từ câu chuyện thực tế bạn đã chia sẻ.',
        confidence: 'proven',
        isEditing: false
      },
      {
        id: 2,
        title: isEn ? 'Trust-Driven High-Stakes Execution' : 'Kiến tạo niềm tin vững chắc & Dẫn dắt chuyển đổi thực tế',
        description: isEn
          ? 'You build immediate authority through measurable track record, helping clients make decisive commitments.'
          : 'Bạn xây dựng vị thế qua kết quả thực chiến đo lường được, giúp khách hàng an tâm đưa ra quyết định chuyển đổi.',
        evidence: 'Dựa trên phương pháp tiếp cận và nguyên tắc không thỏa hiệp bạn đã chia sẻ.',
        confidence: 'proven',
        isEditing: false
      },
      {
        id: 3,
        title: isEn ? 'Proprietary Methodology & Value Packaging' : 'Đóng gói kinh nghiệm lâu năm thành giải pháp cố vấn độc bản',
        description: isEn
          ? 'You turn years of tacit experience into a structured Signature Offer that the market can readily recognize.'
          : 'Bạn chuyển hóa hơn 10 năm kinh nghiệm thành gói dịch vụ chẩn đoán 1:1 rõ ràng, minh bạch và có giá trị cao.',
        evidence: 'Phản ánh từ mục tiêu định vị và nhóm khách hàng bạn muốn phục vụ.',
        confidence: 'hypothesis',
        isEditing: false
      }
    ]);

    setViewState('blueprint');
  };

  const handleApproveBlueprint = () => {
    updateProfile({
      strengthSummary: blueprintStrengths.map(s => s.title).join('. '),
      brandBlueprint: {
        strengths: blueprintStrengths,
        growthEdge,
        contentCompass: contentCompassDomains,
        approvedAt: new Date().toISOString(),
        version: '1.0'
      }
    });
    onNext();
  };

  // -------------------------------------------------------------
  // VIEW 1: MÀN MỞ ĐẦU (EXACT MATCH TO SCREENSHOT 1)
  // -------------------------------------------------------------
  if (viewState === 'landing') {
    return (
      <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between max-w-4xl mx-auto px-6 py-6 md:py-10 animate-fade-in">
        {/* Rotated Right Watermark: "CHUYÊN MÔN TẠO NÊN DẤU ẤN" */}
        <div className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] font-mono tracking-[0.25em] text-ink/30 uppercase select-none pointer-events-none">
          {isEn ? 'EXPERTISE CREATES FOOTPRINT' : 'CHUYÊN MÔN TẠO NÊN DẤU ẤN'}
        </div>

        {/* Center Fingerprint Art Motif (Exact Match) */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-2 md:pt-6">
          {/* Fingerprint Arch Line Art */}
          <div className="w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
            <svg viewBox="0 0 200 220" fill="none" className="w-full h-full">
              {/* Outer Arc 1 - Left Blue, Right Black */}
              <path d="M40 180 A 60 70 0 0 1 100 30" stroke="#315CFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 30 A 60 70 0 0 1 160 180" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />

              {/* Arc 2 - Left Coral, Right Black */}
              <path d="M55 180 A 45 55 0 0 1 100 50" stroke="#FF5A47" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 50 A 45 55 0 0 1 145 180" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />

              {/* Arc 3 - Left Blue, Right Black */}
              <path d="M70 180 A 30 40 0 0 1 100 70" stroke="#315CFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 70 A 30 40 0 0 1 130 180" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />

              {/* Innermost Arc - Left Coral, Right Black */}
              <path d="M85 180 A 15 25 0 0 1 100 95" stroke="#FF5A47" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 95 A 15 25 0 0 1 115 180" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Eyebrow in Electric Blue */}
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-[#315CFF] uppercase block">
              {isEn ? 'GUIDED DISCOVERY SESSION · STEP 1/5' : 'PHIÊN KHÁM PHÁ CÓ HƯỚNG DẪN · BƯỚC 1/5'}
            </span>

            {/* Didone Big Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-[54px] font-normal text-ink leading-[1.12] tracking-tight">
              {isEn ? 'What makes your approach truly distinct?' : 'Điều gì khiến cách làm của bạn khác biệt?'}
            </h1>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-ink/70 font-sans leading-relaxed pt-1 max-w-xl mx-auto">
              {isEn
                ? 'Share your authentic experience. ExpertPrint will help you uncover the core capabilities behind your achievements.'
                : 'Hãy kể bằng trải nghiệm thật. ExpertPrint sẽ giúp bạn nhìn ra năng lực đứng sau những kết quả đó.'}
            </p>
          </div>

          {/* Action Buttons: Blue Pill & Cream Pill */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 w-full max-w-md">
            <button
              onClick={() => setViewState('discovery')}
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#315CFF] text-white font-sans text-sm font-semibold hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
            >
              <span>{isEn ? 'Start discovery' : 'Bắt đầu khám phá'}</span>
            </button>

            <button
              onClick={() => setShowDocumentModal(true)}
              className="w-full sm:w-auto h-12 px-7 rounded-full bg-cream border border-silver/90 text-ink font-sans text-sm font-medium hover:border-ink/40 transition-all flex items-center justify-center gap-2"
            >
              <span>{isEn ? 'Use existing document' : 'Dùng tài liệu có sẵn'}</span>
            </button>
          </div>

          {/* Bottom Meta Line */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-ink/50 pt-2 font-sans">
            <span>{isEn ? 'Approx. 8–12 mins' : 'Khoảng 8–12 phút'}</span>
            <span>•</span>
            <span>{isEn ? 'Can pause and resume anytime' : 'Có thể dừng và tiếp tục'}</span>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-ink/60 hover:text-ink underline underline-offset-2 ml-1"
            >
              {isEn ? 'How is this data used?' : 'Dữ liệu này được dùng thế nào?'}
            </button>
          </div>
        </div>

        {/* Document Paste Modal */}
        {showDocumentModal && (
          <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-silver max-w-lg w-full p-6 md:p-8 space-y-5 shadow-xl relative">
              <button
                onClick={() => setShowDocumentModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream text-ink/40 hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-ink">
                  {isEn ? 'Import from Existing Document' : 'Dùng thông tin từ tài liệu có sẵn'}
                </h3>
                <p className="text-xs text-ink/60">
                  {isEn
                    ? 'Paste your LinkedIn summary, CV, portfolio, or past case studies.'
                    : 'Dán phần giới thiệu LinkedIn, CV, bài viết hoặc case study cũ để trích xuất dữ liệu.'}
                </p>
              </div>

              <textarea
                rows={6}
                value={documentInputText}
                onChange={(e) => setDocumentInputText(e.target.value)}
                placeholder={isEn ? 'Paste content here...' : 'Dán nội dung hồ sơ, thành tích hoặc bài viết vào đây...'}
                className="w-full text-xs text-ink bg-cream p-4 rounded-2xl border border-silver/80 focus:border-ink resize-none font-sans"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="px-4 py-2 text-xs font-medium text-ink/60 hover:text-ink"
                >
                  {isEn ? 'Cancel' : 'Hủy'}
                </button>
                <button
                  onClick={() => {
                    if (!documentInputText.trim()) return;
                    setAnswers(prev => ({ ...prev, context: documentInputText.trim() }));
                    setShowDocumentModal(false);
                    setViewState('discovery');
                  }}
                  disabled={!documentInputText.trim()}
                  className="px-6 py-2.5 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all disabled:opacity-40"
                >
                  {isEn ? 'Analyze & Start' : 'Phân tích & Bắt đầu'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Modal */}
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-silver max-w-md w-full p-6 space-y-4 shadow-xl relative">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream text-ink/40 hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-emerald-700">
                <Shield className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-ink">
                  {isEn ? 'Privacy & Data Ownership' : 'Quyền riêng tư & Kiểm soát dữ liệu'}
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-ink/80 leading-relaxed font-sans">
                <p>• <strong>{isEn ? 'Private Workspace:' : 'Workspace riêng tư:'}</strong> {isEn ? 'Your answers and stories are strictly stored in your private workspace.' : 'Dữ liệu được lưu riêng tư trong workspace của bạn.'}</p>
                <p>• <strong>{isEn ? 'No Public Training:' : 'Không train AI công khai:'}</strong> {isEn ? 'Your expertise is never used to train public models without consent.' : 'Tri thức của bạn không bao giờ được dùng để huấn luyện mô hình chung.'}</p>
                <p>• <strong>{isEn ? 'Approval Gate:' : 'Chỉ lưu khi bạn duyệt:'}</strong> {isEn ? 'Nothing becomes approved Brand Memory until you explicitly review and save.' : 'Mọi phân tích chỉ là giả thuyết cho đến khi bạn bấm duyệt chính thức.'}</p>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-5 py-2 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90"
                >
                  {isEn ? 'Understood' : 'Đã hiểu'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: CONVERSATION CANVAS (720px) + SESSION RAIL (280px)
  // -------------------------------------------------------------
  if (viewState === 'discovery') {
    return (
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-4 min-h-[calc(100vh-140px)] animate-fade-in">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Conversation Canvas (720px max) */}
          <div className="lg:col-span-8 space-y-6 pb-28">
            
            {/* Active Question Box */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#315CFF] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
                  {currentStage.eyebrow} · {currentStage.title}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-normal text-ink leading-[1.18] tracking-tight">
                {isEn ? currentStage.questionEn : currentStage.question}
              </h1>

              <p className="text-xs sm:text-sm text-ink/60 font-sans leading-relaxed">
                {isEn ? currentStage.helperEn : currentStage.helper}
              </p>
            </div>

            {/* AI Reflection Block */}
            {isReflecting && (
              <div className="p-5 rounded-2xl bg-white border border-silver/80 space-y-3 animate-fade-in shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                    {isEn ? 'EXPERTPRINT IS REFLECTING' : 'EXPERTPRINT ĐANG PHẢN CHIẾU'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink/50 py-1 font-sans">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#315CFF]" />
                  <span>{isEn ? 'Reflecting on your real story...' : 'Đang phản chiếu câu trả lời...'}</span>
                </div>
              </div>
            )}

            {currentReflection && !isReflecting && (
              <div className="p-6 rounded-2xl bg-white border border-silver space-y-4 animate-fade-in shadow-xs">
                <div className="flex items-center justify-between border-b border-silver/40 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
                    {isEn ? 'EXPERTPRINT OBSERVATION' : 'PHẢN CHIẾU TỪ EXPERTPRINT'}
                  </span>
                  <span className="text-[10px] font-mono text-ink/40">
                    {isEn ? 'Working Hypothesis' : 'Giả thuyết đang nhận diện'}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="font-serif italic text-sm text-ink/70">
                    {currentReflection.quote}
                  </p>
                  <p className="text-xs sm:text-sm text-ink font-sans leading-relaxed">
                    {currentReflection.hypothesis}
                  </p>
                </div>

                {/* 3 Quick Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-silver/40">
                  <button
                    onClick={handleNextStage}
                    className="px-4 py-2 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isEn ? 'Accurate to me' : 'Đúng với tôi'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setInputText('');
                      setCurrentReflection(null);
                    }}
                    className="px-4 py-2 rounded-full bg-cream border border-silver text-xs font-medium text-ink hover:border-ink/40 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5 inline mr-1 text-ink/50" />
                    <span>{isEn ? 'Not quite right' : 'Chưa đúng ý'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowHints(true);
                      setCurrentReflection(null);
                    }}
                    className="px-4 py-2 rounded-full bg-cream border border-silver text-xs font-medium text-[#315CFF] hover:border-[#315CFF] transition-all"
                  >
                    <HelpCircle className="w-3.5 h-3.5 inline mr-1" />
                    <span>{isEn ? 'Dig deeper' : 'Đào sâu thêm'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Hint breakdown */}
            {showHints && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs text-amber-900 animate-fade-in font-sans">
                <p className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Helpful sub-questions to guide you:' : 'Gợi ý chia nhỏ câu hỏi:'}</span>
                </p>
                <ul className="space-y-1.5 list-disc list-inside">
                  {(isEn ? currentStage.hintsEn : currentStage.hints).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Collapsible Timeline History */}
            {currentStageIdx > 0 && (
              <div className="border-t border-silver/50 pt-4">
                <button
                  onClick={() => setShowHistoryAccordion(!showHistoryAccordion)}
                  className="text-xs text-ink/50 hover:text-ink flex items-center gap-1.5 transition-colors font-medium"
                >
                  <span>{isEn ? 'Previous answers' : 'Các câu trả lời trước'} ({currentStageIdx})</span>
                  {showHistoryAccordion ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showHistoryAccordion && (
                  <div className="space-y-3 pt-3">
                    {DISCOVERY_STAGES.slice(0, currentStageIdx).map((stage, idx) => {
                      const key = idx === 0 ? 'context' : idx === 1 ? 'win' : 'capability';
                      return (
                        <div key={stage.id} className="p-3.5 bg-white/70 rounded-xl border border-silver/70 text-xs space-y-1">
                          <span className="text-[10px] font-bold text-ink/40 uppercase">{stage.title}</span>
                          <p className="text-ink/80 italic line-clamp-2">"{answers[key]}"</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STICKY COMPOSER */}
            <div className="fixed sm:sticky bottom-16 sm:bottom-4 left-0 right-0 sm:left-auto sm:right-auto bg-white/95 sm:bg-white backdrop-blur-md border border-silver/80 rounded-t-3xl sm:rounded-2xl p-4 shadow-lg sm:shadow-sm space-y-3 z-30">
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isEn ? currentStage.placeholderEn : currentStage.placeholder}
                className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-3 rounded-xl border border-silver/60 focus:border-ink resize-none font-sans"
              />

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`h-9 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isRecording ? 'bg-coral text-white animate-pulse' : 'bg-cream border border-silver text-ink hover:border-ink/40'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#315CFF]" />}
                    <span>{isRecording ? `${recordTimer}s` : (isEn ? 'Voice' : 'Thu âm')}</span>
                  </button>

                  <button
                    onClick={() => setShowHints(true)}
                    className="text-[11px] text-ink/40 hover:text-ink transition-colors hidden sm:inline"
                  >
                    {isEn ? 'I haven’t thought of it' : 'Tôi chưa nghĩ ra'}
                  </button>
                </div>

                <button
                  onClick={handleSendAnswer}
                  disabled={!inputText.trim()}
                  className="h-9 px-5 rounded-full bg-[#315CFF] text-white text-xs font-bold hover:bg-[#274bdb] transition-all disabled:opacity-30 flex items-center gap-1.5 shadow-sm"
                >
                  <span>{isEn ? 'Send' : 'Gửi'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Session Rail (280px Sticky) */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            {/* Card 1: Progress */}
            <div className="p-4 rounded-2xl bg-white border border-silver/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-ink/50 text-[10px] font-mono">
                <span>{isEn ? 'STAGE' : 'TIẾN ĐỘ'}</span>
                <span>{currentStageIdx + 1}/4</span>
              </div>
              <p className="font-semibold text-ink">
                {isEn ? 'Discovering brand footprint' : 'Đang khám phá dấu ấn'}
              </p>
              <p className="text-[11px] text-ink/50">
                ~{Math.max(2, (4 - currentStageIdx) * 2.5)} {isEn ? 'mins remaining' : 'phút còn lại'}
              </p>
            </div>

            {/* Card 2: Emerging Signals */}
            <div className="p-4 rounded-2xl bg-white border border-silver/80 space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                {isEn ? 'EMERGING SIGNALS' : 'ĐIỀU ĐANG NỔI LÊN'}
              </span>

              <div className="space-y-2">
                {emergingSignals.map((signal) => (
                  <div key={signal.id} className="flex items-center justify-between p-2 rounded-xl bg-cream/70 border border-silver/60">
                    <span className="font-medium text-ink text-xs">{signal.label}</span>
                    <span className="text-[9px] font-bold text-[#315CFF] bg-[#315CFF]/10 px-2 py-0.5 rounded-full uppercase">
                      {isEn ? 'Testing' : 'Đang kiểm chứng'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Data Control */}
            <div className="p-4 rounded-2xl bg-white border border-silver/80 space-y-2 text-xs text-ink/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                {isEn ? 'DATA CONTROL' : 'QUYỀN KIỂM SOÁT'}
              </span>
              <p className="text-[11px] leading-relaxed">
                {isEn 
                  ? 'Only you see this working draft. Stored privately in your workspace.'
                  : 'Chỉ bạn thấy bản nháp này. Dữ liệu được lưu riêng tư trong workspace của bạn.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: MÀN KẾT QUẢ "BẢN ĐỒ DẤU ẤN"
  // -------------------------------------------------------------
  if (viewState === 'blueprint') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 min-h-[calc(100vh-140px)] space-y-8 animate-fade-in-up pb-24">
        {/* Header Art Hero */}
        <div className="space-y-2 border-b border-silver/60 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#315CFF] uppercase bg-[#315CFF]/10 px-2.5 py-0.5 rounded-full">
              {isEn ? 'BRAND BLUEPRINT · DRAFT 01' : 'BẢN ĐỒ DẤU ẤN · BẢN NHÁP 01'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink tracking-tight">
            {isEn ? 'Three capabilities the market should remember about you.' : 'Ba năng lực thị trường nên nhớ về bạn.'}
          </h1>

          <p className="text-xs sm:text-sm text-ink/60 font-sans">
            {isEn
              ? 'Synthesized from your real experience. Review and approve to save into your Brand Memory.'
              : 'Tổng hợp từ trải nghiệm thật của bạn. Bạn có thể sửa cách gọi và chỉ lưu khi bạn hoàn toàn hài lòng.'}
          </p>
        </div>

        {/* 3 STRENGTH CARDS */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/40 block">
            {isEn ? '1. CORE ACTIONABLE STRENGTHS' : '1. BA THẾ MẠNH CỐT LÕI (CÓ GIÁ TRỊ THỊ TRƯỜNG)'}
          </span>

          <div className="grid grid-cols-1 gap-4">
            {blueprintStrengths.map((st, idx) => (
              <div key={st.id} className="p-6 rounded-3xl bg-white border border-silver/80 space-y-3.5 shadow-xs hover:border-ink/40 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-mono text-[#315CFF] font-bold">0{idx + 1}</span>
                    
                    {st.isEditing ? (
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBlueprintStrengths(prev => prev.map(item => item.id === st.id ? { ...item, title: val } : item));
                        }}
                        className="w-full font-serif text-lg font-semibold text-ink bg-cream p-2 rounded-lg border border-silver focus:border-ink"
                      />
                    ) : (
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-ink leading-snug">
                        {st.title}
                      </h3>
                    )}
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                    st.confidence === 'proven'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {st.confidence === 'proven' 
                      ? (isEn ? 'Proven with evidence' : 'Đã có bằng chứng') 
                      : (isEn ? 'Working hypothesis' : 'Đang là giả thuyết')}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink/80 font-sans leading-relaxed">
                  {st.description}
                </p>

                <div className="p-3 bg-cream/70 rounded-xl border border-silver/60 text-xs text-ink/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
                    {isEn ? 'Evidence from your story:' : 'Bằng chứng từ câu chuyện của bạn:'}
                  </span>
                  <p className="italic font-serif">"{st.evidence}"</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-silver/40 text-xs">
                  <button
                    onClick={() => {
                      setBlueprintStrengths(prev => prev.map(item => item.id === st.id ? { ...item, confidence: 'proven', isEditing: false } : item));
                    }}
                    className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Accurate to me' : 'Đúng với tôi'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setBlueprintStrengths(prev => prev.map(item => item.id === st.id ? { ...item, isEditing: !item.isEditing } : item));
                    }}
                    className="text-[#315CFF] font-semibold hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{st.isEditing ? (isEn ? 'Save' : 'Lưu tên') : (isEn ? 'Rename' : 'Sửa cách gọi')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GROWTH EDGE SECTION */}
        <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-2 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-xs font-bold uppercase tracking-wider text-coral">
              {isEn ? '2. GROWTH EDGE' : '2. ĐIỂM CHƯA ĐƯỢC NHÌN THẤY (GROWTH EDGE)'}
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-ink">{growthEdge.title}</h3>
          <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-sans">{growthEdge.description}</p>
        </div>

        {/* CONTENT COMPASS SECTION */}
        <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#315CFF]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#315CFF]">
              {isEn ? '3. CONTENT COMPASS' : '3. LA BÀN NỘI DUNG (3 LÃNH ĐỊA BẠN CÓ QUYỀN LÊN TIẾNG)'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {contentCompassDomains.map((dom) => (
              <div key={dom.id} className="p-4 rounded-2xl bg-cream/60 border border-silver/70 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-ink text-sm">{dom.name}</h4>
                <p className="text-ink/80"><strong>{isEn ? 'Angle:' : 'Góc nhìn:'}</strong> {dom.angle}</p>
                <p className="text-ink/60"><strong>{isEn ? 'Audience:' : 'Dành cho:'}</strong> {dom.audience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-silver/60">
          <button
            onClick={() => setViewState('discovery')}
            className="text-xs text-ink/50 hover:text-ink font-medium transition-colors"
          >
            ← {isEn ? 'Refine answers' : 'Tiếp tục làm rõ câu trả lời'}
          </button>

          <button
            onClick={handleApproveBlueprint}
            className="h-12 px-8 rounded-full bg-[#315CFF] text-white font-bold text-sm hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
          >
            <span>{isEn ? 'Approve & Save into My Brand' : 'Duyệt & lưu vào thương hiệu của tôi'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
