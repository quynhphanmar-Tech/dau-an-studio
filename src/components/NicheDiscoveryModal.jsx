import React, { useState } from 'react';
import { Compass, Sparkles, Check, ArrowRight, ArrowLeft, Target, AlertCircle, Briefcase, Shield, X } from 'lucide-react';

export default function NicheDiscoveryModal({ isOpen, onClose, onSaveNewProfile }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const [yearsExp, setYearsExp] = useState('10');
  const [field, setField] = useState('Tài chính & Khai vấn');
  const [who, setWho] = useState('');
  const [pain, setPain] = useState('');
  const [context, setContext] = useState('');
  const [starterOffer, setStarterOffer] = useState('');
  const [signatureOffer, setSignatureOffer] = useState('');

  if (!isOpen) return null;

  const handleFinish = () => {
    const newProf = {
      id: `custom-${Date.now()}`,
      name: name || "Chuyên Gia Mới",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      title: `${field} (${yearsExp} năm kinh nghiệm)`,
      background: background || `${yearsExp} năm kinh nghiệm chuyên sâu trong lĩnh vực ${field}, mong muốn đóng gói giá trị và giúp đỡ đúng tệp khách hàng.`,
      archetype: "The Sage & Mentor (Nhà Thông Thái & Người Dẫn Dắt)",
      who: who || "Nhóm khách hàng cá nhân/doanh nghiệp đang có nhu cầu giải quyết bài toán cấp bách nhưng chưa tìm được chuyên gia tin cậy.",
      pain: pain || "Bế tắc vì thiếu định hướng chuẩn xác, tốn thời gian và tiền bạc vào các giải pháp không hiệu quả.",
      context: context || "Rất bận rộn, cần một giải pháp thực chiến, đo lường được kết quả rõ ràng.",
      tone: "Trầm tĩnh, thực chiến, thấu cảm và đúc kết thành các bài học giá trị.",
      coreOffer: {
        starter: starterOffer || "Buổi Chẩn đoán & Thẩm định Vấn đề 1:1 trong 60 phút (1.500.000đ)",
        signature: signatureOffer || "Chương trình Đồng hành Signature 90 ngày (15.000.000đ)",
        group: "Workshop / Masterclass Chia sẻ Quy trình Tinh gọn"
      },
      voiceRules: {
        dos: ["Dẫn chứng từ kinh nghiệm thật", "Tập trung giải quyết Paid Pain của 1 WHO", "Ngôn từ trong sáng, thực tế"],
        donts: ["Không hứa hẹn viển vông", "Không dùng từ ngữ sáo rỗng"]
      },
      proofPoints: [
        `${yearsExp} năm kinh nghiệm thực chiến trong ngành`,
        "Đã tư vấn và chuyển giao phương pháp cho nhiều khách hàng thực tế",
        "Có quy trình và framework đúc kết độc bản"
      ]
    };

    onSaveNewProfile(newProf);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Wizard Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Quy Trình Định Vị 1-1-1 & Đóng Gói Brand Blueprint (4 Bước)</span>
          </div>
          <h2 className="text-xl font-bold text-white">Khám Phá Bản Thể & Định Vị Ngách Đắt Giá</h2>
          
          {/* Step Progress Bar */}
          <div className="flex items-center gap-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step >= i ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Chuyên Môn & Năng Lực Thật */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                Bước 1: Bạn đã tích lũy chuyên môn gì trong 5–15 năm qua?
              </h3>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Họ và tên của bạn:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Lĩnh vực chuyên sâu:</label>
                  <input
                    type="text"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="Ví dụ: Giáo dục, Tài chính, B2B Marketing..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Số năm kinh nghiệm:</label>
                  <input
                    type="text"
                    value={yearsExp}
                    onChange={(e) => setYearsExp(e.target.value)}
                    placeholder="Ví dụ: 12 năm"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Mô tả ngắn về hành trình và năng lực nổi bật nhất:</label>
                <textarea
                  rows={3}
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Từng làm việc ở đâu? Đã giải quyết vấn đề lớn nào cho khách hàng hoặc tổ chức cũ?"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Tìm 1 WHO, 1 PAID PAIN */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                Bước 2: Xác định Mũi Khoan 1-1-1 (1 WHO & 1 PAID PAIN)
              </h3>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block text-indigo-300">
                  1 WHO — Nhóm người cụ thể nào sẵn sàng trả tiền cho chuyên môn của bạn?
                </label>
                <textarea
                  rows={2}
                  value={who}
                  onChange={(e) => setWho(e.target.value)}
                  placeholder="Ví dụ: Phụ nữ 30-45 tuổi làm công sở chuẩn bị ra làm Solo..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block text-red-300">
                  1 PAID PAIN — Nỗi đau cấp bách nào đang khiến họ mất tiền / mất thời gian / mắc kẹt?
                </label>
                <textarea
                  rows={2}
                  value={pain}
                  onChange={(e) => setPain(e.target.value)}
                  placeholder="Ví dụ: Sợ hoảng loạn tài chính khi mất nguồn lương cố định..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block text-amber-300">
                  1 CONTEXT — Bối cảnh và giới hạn của họ (Vì sao giải pháp cũ thất bại?):
                </label>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Ví dụ: Bận 10h/ngày, có con nhỏ, không có kiến thức đầu tư..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Đóng Gói Offer */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Bước 3: Đóng Gói 2 Sản Phẩm Tri Thức Cốt Lõi
              </h3>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block text-indigo-300">
                  Gói Khởi Động (Starter 1:1 - Dễ chốt, giá 1-3 triệu):
                </label>
                <input
                  type="text"
                  value={starterOffer}
                  onChange={(e) => setStarterOffer(e.target.value)}
                  placeholder="Ví dụ: Buổi Chẩn đoán & Lên Lộ trình Tài chính 60 phút (1.500.000đ)"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block text-amber-300">
                  Gói Signature (Chương trình đồng hành chuyển đổi, giá 10-30 triệu):
                </label>
                <input
                  type="text"
                  value={signatureOffer}
                  onChange={(e) => setSignatureOffer(e.target.value)}
                  placeholder="Ví dụ: Chương trình 90 ngày 'Vững Vàng Dòng Tiền Ra Làm Solo' (18.000.000đ)"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Khởi Tạo Blueprint */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white">Sẵn Sàng Khởi Tạo Brand Blueprint</h3>
              <p className="text-slate-300 max-w-md mx-auto leading-relaxed">
                Chúc mừng bạn! AI đã tổng hợp đầy đủ hồ sơ năng lực, tệp 1 WHO, 1 PAID PAIN và các Offer chiến lược của bạn. Từ giờ, mọi bài viết, kịch bản video và postcard sẽ được tự động đồng bộ hóa với định vị này!
              </p>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Lưu & Kích Hoạt Brand Blueprint</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
