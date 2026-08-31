import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, HelpCircle } from 'lucide-react';

export default function Session2Positioning({ profile, updateProfile, onNext, onBack }) {
  const [subStep, setSubStep] = useState(0); // 0: positioning statement, 1: 3 cards confirm, 2: readiness

  // Card states: 'pending' | 'correct' | 'needs-help'
  const [cardStates, setCardStates] = useState({
    who: 'pending',
    what: 'pending',
    why: 'pending',
  });

  const [editingCard, setEditingCard] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Generate positioning statement from profile
  const defaultStatement = profile.name
    ? `Bạn giúp ${profile.whoHelp || 'chuyên gia đang chuyển sang làm tự do'} ${profile.whatChange || 'xây quỹ an toàn trước khi rời công việc'}.`
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
        <p className="text-xs font-medium text-ink/40 uppercase tracking-widest mb-6">
          Chọn hướng xuất hiện · Bước 2/5
        </p>

        {/* Sub-step 0: Positioning Statement */}
        {subStep === 0 && (
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug">
              Đây là cách người khác sẽ <span className="highlight-word">nhớ đến</span> bạn.
            </h1>

            {/* Big Statement Card */}
            <div className="bg-white rounded-2xl border border-silver/80 p-8">
              <p className="font-serif text-xl md:text-2xl text-ink leading-relaxed font-medium">
                "{defaultStatement}"
              </p>
            </div>

            <p className="text-sm text-ink/50">
              Cùng kiểm tra xem định vị này đã đúng chưa nhé.
            </p>

            <button
              onClick={() => setSubStep(1)}
              className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95"
            >
              Xác nhận từng phần
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sub-step 1: 3 Confirmation Cards */}
        {subStep === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="font-serif text-3xl font-semibold text-ink leading-snug mb-2">
              Xác nhận <span className="highlight-word">3 trụ cột</span> định vị.
            </h1>
            <p className="text-sm text-ink/50 mb-6">
              Mỗi thẻ bên dưới đúng chưa? Nếu chưa, tôi sẽ gợi tên giúp bạn.
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
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                    {card.question}
                  </p>

                  {editingCard === card.key ? (
                    <div className="space-y-3">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Gõ lại cho đúng ý bạn..."
                        rows={2}
                        autoFocus
                        className="w-full bg-cream border border-silver rounded-xl text-sm text-ink p-3 placeholder:text-silver resize-none focus:border-ink/30 transition-colors"
                      />
                      <button
                        onClick={() => handleSaveEdit(card.key)}
                        className="text-xs font-semibold text-accent hover:underline"
                      >
                        Lưu lại
                      </button>
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
                            onClick={() => handleCardAction(card.key, 'wrong')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-silver text-xs font-medium text-ink/60 hover:border-ink/40 transition-all"
                          >
                            Chưa đúng
                          </button>
                          <span className="text-ink/20">·</span>
                          <button
                            onClick={() => handleCardAction(card.key, 'needs-help')}
                            className="inline-flex items-center gap-1.5 text-xs text-accent font-medium hover:underline"
                          >
                            Gọi tên giúp tôi
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-ink/50">
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã xác nhận</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {allConfirmed && (
              <div className="bg-white rounded-xl border border-accent/20 p-4 animate-fade-in">
                <p className="text-sm text-ink/70 italic">
                  "Tuyệt vời. 3 trụ cột đã rõ ràng — cùng đóng gói thành giá trị cụ thể nhé."
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
