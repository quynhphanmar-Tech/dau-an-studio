import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Users, Wrench, GraduationCap, Mic, Briefcase, Package, 
  Sparkles, CheckCircle2, Award, Edit3, Shield, Info, ArrowUpRight 
} from 'lucide-react';

/**
 * EXPERTPRINT — SESSION 3: ĐÓNG GÓI GIÁ TRỊ (SIGNATURE OFFER PACKAGING)
 * Matching 100% Master Specs & Brand Kit v1.1 Approved
 */

const OFFER_TYPES = [
  { 
    id: 'diagnostic', 
    icon: Users, 
    title: 'Buổi chẩn đoán 1:1', 
    titleEn: '1:1 Diagnostic Session',
    desc: 'Rà soát 60 phút chẩn đoán đúng điểm nghẽn chiến lược cốt lõi của khách hàng.',
    tag: 'Đề xuất cao nhất'
  },
  { 
    id: 'workshop', 
    icon: GraduationCap, 
    title: 'Workshop nhóm chuyên sâu', 
    titleEn: 'Expert Group Workshop',
    desc: 'Đào tạo & thực hành phương pháp luận cho một nhóm nhỏ 5-10 người.',
    tag: 'Tăng sức ảnh hưởng'
  },
  { 
    id: 'done-for-you', 
    icon: Wrench, 
    title: 'Dịch vụ triển khai (Done-For-You)', 
    titleEn: 'Done-For-You Execution',
    desc: 'Trực tiếp thực hiện và chuyển giao giải pháp cho doanh nghiệp khách hàng.',
    tag: 'Giá trị hợp đồng cao'
  },
  { 
    id: 'mentoring', 
    icon: Package, 
    title: 'Chương trình Mentoring 90 ngày', 
    titleEn: '90-Day Mentoring Program',
    desc: 'Đồng hành 1:1 trong 3 tháng giúp khách hàng đạt kết quả đo lường được.',
    tag: 'Chuyển đổi dài hạn'
  },
  { 
    id: 'keynote', 
    icon: Mic, 
    title: 'Bài nói Keynote / Diễn giả', 
    titleEn: 'Keynote & Executive Speech',
    desc: 'Chia sẻ góc nhìn phản biện và phương pháp luận độc bản tại sự kiện ngành.',
    tag: 'Xây dựng vị thế'
  },
  { 
    id: 'retainer', 
    icon: Briefcase, 
    title: 'Gói cố vấn dài hạn (Retainer)', 
    titleEn: 'Executive Advisory Retainer',
    desc: 'Đóng vai trò Cố vấn chiến lược đồng hành hàng tháng cùng CEO/Founder.',
    tag: 'Dòng tiền ổn định'
  },
];

export default function Session3Packaging({ profile, updateProfile, onNext, onBack, lang = 'vi' }) {
  const isEn = lang === 'en';

  const [selectedOfferId, setSelectedOfferId] = useState(profile.offerTypeId || 'diagnostic');
  const [offerName, setOfferName] = useState(profile.offerName || 'Buổi Chẩn Đón Chiến Lược 1:1 trong 60 Phút');
  const [offerOutcome, setOfferOutcome] = useState(profile.offerOutcome || 'Rà soát và chỉ ra 3 điểm nghẽn lớn nhất cản trở tăng trưởng dòng tiền.');
  const [offerTargetAudience, setOfferTargetAudience] = useState(profile.whoHelp || 'Chuyên gia & Founder 30-45 tuổi');
  const [showOfferCard, setShowOfferCard] = useState(true);

  const selectedOffer = OFFER_TYPES.find(o => o.id === selectedOfferId) || OFFER_TYPES[0];

  const handleApproveSignatureOffer = () => {
    const formattedOffer = `${selectedOffer.title}: ${offerName} — ${offerOutcome}`;
    updateProfile({
      offerTypeId: selectedOffer.id,
      offerType: selectedOffer.title,
      offerName: offerName,
      offerOutcome: offerOutcome,
      firstOffer: formattedOffer,
      offerPackagedAt: new Date().toISOString()
    });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-140px)] flex flex-col justify-between animate-fade-in font-sans pb-24">
      
      {/* Header & Stepper */}
      <div className="space-y-3 border-b border-silver/60 pb-4 mb-6">
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
            GIÁ TRỊ · BƯỚC 3/5
          </span>
          <span className="font-mono text-[11px] text-ink/40">
            SESSION 3
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-4xl font-normal text-ink tracking-tight">
            {isEn ? 'After believing in you, how can clients start working with you?' : 'Sau khi tin bạn, khách hàng có thể bắt đầu với sản phẩm nào?'}
          </h1>
          <p className="text-xs sm:text-sm text-ink/60 leading-relaxed font-sans">
            {isEn
              ? 'Don’t start with complicated pricing tiers. Package your core expertise into a clear Signature Offer.'
              : 'Đừng bắt đầu bằng danh sách giá phức tạp. Hãy đóng gói chuyên môn thành một Signature Offer đơn giản, sắc bén.'}
          </p>
        </div>
      </div>

      {/* Main Form & Cards */}
      <div className="space-y-8 flex-1">
        
        {/* 1. Offer Type Selection Grid */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink/40 block">
            1. CHỌN HÌNH THỨC SẢN PHẨM ĐẦU TIÊN (SIGNATURE OFFER FORMAT)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OFFER_TYPES.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedOfferId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedOfferId(item.id);
                    if (!offerName) setOfferName(`${item.title}: Dịch vụ cố vấn chuyên sâu`);
                  }}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all space-y-2 shadow-xs ${
                    isSelected
                      ? 'bg-white border-[#315CFF] ring-2 ring-[#315CFF]/15'
                      : 'bg-white/70 border-silver/80 hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#315CFF] text-white' : 'bg-cream text-ink/70'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-sm font-bold text-ink">
                        {isEn ? item.titleEn : item.title}
                      </h3>
                    </div>

                    <span className="text-[9px] font-bold bg-cream text-ink/60 px-2 py-0.5 rounded-full border border-silver/60">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs text-ink/70 font-sans leading-relaxed pl-1">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Offer Customization Form */}
        <div className="p-6 rounded-3xl bg-white border border-silver/80 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-silver/40 pb-3">
            <Sparkles className="w-4 h-4 text-[#315CFF]" />
            <h3 className="font-serif text-base font-bold text-ink">
              2. ĐÓNG GÓI CHI TIẾT SẢN PHẨM GIÁ TRỊ (SIGNATURE OFFER DETAILS)
            </h3>
          </div>

          <div className="space-y-4 text-xs font-sans">
            {/* Offer Title Input */}
            <div className="space-y-1.5">
              <label className="font-bold text-ink/70 uppercase text-[10px] tracking-wider block">
                Tên sản phẩm / Gói giá trị:
              </label>
              <input
                type="text"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
                placeholder="Ví dụ: Buổi chẩn đoán 1:1 — Rà soát 3 điểm nghẽn chiến lược"
                className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-3 rounded-xl border border-silver/80 focus:border-ink"
              />
            </div>

            {/* Promised Outcome */}
            <div className="space-y-1.5">
              <label className="font-bold text-ink/70 uppercase text-[10px] tracking-wider block">
                Kết quả đo lường được cho khách hàng (Promised Outcome):
              </label>
              <textarea
                rows={2}
                value={offerOutcome}
                onChange={(e) => setOfferOutcome(e.target.value)}
                placeholder="Ví dụ: Giúp khách hàng tìm ra nguyên nhân gốc rễ và lộ trình 90 ngày khắc phục..."
                className="w-full text-xs sm:text-sm text-ink bg-cream/50 p-3 rounded-xl border border-silver/80 focus:border-ink resize-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Signature Offer Preview Card */}
        <div className="p-6 rounded-3xl bg-[#111111] text-white space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#315CFF]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#315CFF]">
                THẺ GIÁ TRỊ SIGNATURE OFFER ĐÃ ĐÓNG GÓI
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              ✓ Ready to Launch
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-cream leading-snug">
              {offerName || 'Buổi Chẩn Đón Chiến Lược 1:1'}
            </h3>

            <p className="text-xs sm:text-sm text-cream/70 font-sans leading-relaxed">
              "{offerOutcome}"
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans text-white/60">
            <span>Dành cho: <strong className="text-white">{profile.whoHelp || 'Chuyên gia & CEO'}</strong></span>
            <span>Cung cấp bởi: <strong className="text-white">{profile.name || 'Chuyên gia'}</strong></span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 flex items-center justify-between border-t border-silver/60">
        <button
          onClick={onBack}
          className="text-xs text-ink/50 hover:text-ink font-medium transition-colors"
        >
          ← {isEn ? 'Back to Positioning' : 'Quay lại Định vị'}
        </button>

        <button
          onClick={handleApproveSignatureOffer}
          className="h-12 px-8 rounded-full bg-[#315CFF] text-white font-bold text-sm hover:bg-[#274bdb] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
        >
          <span>{isEn ? 'Package Approved — Enter Content Studio' : 'Đã đóng gói — Tiến vào Xưởng sáng tạo'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
