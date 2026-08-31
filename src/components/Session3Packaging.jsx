import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Users, Wrench, GraduationCap, Mic, Briefcase, Package, Sparkles } from 'lucide-react';

const OFFER_TYPES = [
  { id: 'diagnostic', icon: Users, title: 'Buổi chẩn đoán 1:1', desc: 'Gặp gỡ cá nhân, giải quyết một vấn đề cụ thể.' },
  { id: 'workshop', icon: GraduationCap, title: 'Workshop nhóm', desc: 'Đào tạo và chia sẻ kiến thức cho một nhóm nhỏ.' },
  { id: 'done-for-you', icon: Wrench, title: 'Dịch vụ triển khai', desc: 'Thực hiện công việc chuyên môn cho khách hàng.' },
  { id: 'mentoring', icon: Package, title: 'Chương trình mentoring', desc: 'Đồng hành và hướng dẫn dài hạn.' },
  { id: 'keynote', icon: Mic, title: 'Bài nói / Keynote', desc: 'Chia sẻ góc nhìn và truyền cảm hứng tại sự kiện.' },
  { id: 'retainer', icon: Briefcase, title: 'Gói tư vấn dài hạn', desc: 'Cố vấn chuyên sâu cho doanh nghiệp theo tháng.' },
];

export default function Session3Packaging({ profile, updateProfile, onNext, onBack }) {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerDescription, setOfferDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const selectedOfferData = OFFER_TYPES.find(o => o.id === selectedOffer);

  const handleFinish = () => {
    updateProfile({
      offerType: selectedOfferData?.title || '',
      offerDescription: offerDescription,
      firstOffer: `${selectedOfferData?.title}: ${offerDescription}`,
    });
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs font-medium text-ink/40 uppercase tracking-widest mb-6">
          Đóng gói giá trị · Bước 3/5
        </p>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug mb-3">
          Sau khi tin bạn, khách hàng có thể <span className="highlight-word">bắt đầu</span> với điều gì?
        </h1>

        <p className="text-sm text-ink/50 mb-8">
          Chọn hình thức phù hợp nhất với khả năng hiện tại của bạn.
        </p>

        {/* Offer Type Cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {OFFER_TYPES.map((offer) => {
            const Icon = offer.icon;
            const isSelected = selectedOffer === offer.id;
            return (
              <button
                key={offer.id}
                onClick={() => { setSelectedOffer(offer.id); setShowPreview(false); }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-white border-silver/80 hover:border-ink/30'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-cream' : 'text-ink/40'}`} />
                <p className={`text-sm font-semibold ${isSelected ? 'text-cream' : 'text-ink'}`}>{offer.title}</p>
                <p className={`text-xs mt-1 ${isSelected ? 'text-cream/70' : 'text-ink/40'}`}>{offer.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Describe Your Offer */}
        {selectedOffer && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm text-ink/60">
              Mô tả ngắn về {selectedOfferData?.title.toLowerCase()} của bạn:
            </p>
            <textarea
              value={offerDescription}
              onChange={(e) => setOfferDescription(e.target.value)}
              placeholder={`Ví dụ: Buổi chẩn đoán 60 phút giúp ${profile.whoHelp || 'chuyên gia'} tìm ra 3 điểm nghẽn chính...`}
              rows={3}
              className="w-full bg-white border border-silver/80 rounded-xl text-sm text-ink p-4 placeholder:text-silver/70 focus:border-ink/30 transition-colors resize-none"
            />

            {offerDescription.trim().length > 10 && !showPreview && (
              <button
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Xem thử thẻ giá trị
              </button>
            )}

            {/* Preview Card */}
            {showPreview && (
              <div className="bg-white rounded-2xl border border-silver/80 p-6 space-y-3 animate-fade-in-up">
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider">Thẻ giá trị của bạn</p>
                <h3 className="font-serif text-xl font-semibold text-ink">{selectedOfferData?.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{offerDescription}</p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-ink/40">Bởi</span>
                  <span className="text-xs font-semibold text-ink">{profile.name || 'Chuyên gia'}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        {selectedOffer && offerDescription.trim().length > 5 && (
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95"
          >
            Biến thành nội dung
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
