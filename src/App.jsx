import React, { useState } from 'react';
import './index.css';
import Session1Strengths from './components/Session1Strengths';
import Session2Positioning from './components/Session2Positioning';
import Session3Packaging from './components/Session3Packaging';
import Session4Content from './components/Session4Content';
import Session5Opportunities from './components/Session5Opportunities';
import { ShieldCheck, Award, X, Copy, Check, FileText } from 'lucide-react';

const SESSIONS = [
  { id: 1, label: 'Hiểu thế mạnh', shortLabel: 'Thế mạnh' },
  { id: 2, label: 'Chọn hướng xuất hiện', shortLabel: 'Định vị' },
  { id: 3, label: 'Đóng gói giá trị', shortLabel: 'Giá trị' },
  { id: 4, label: 'Biến thành nội dung', shortLabel: 'Nội dung' },
  { id: 5, label: 'Theo dõi cơ hội', shortLabel: 'Cơ hội' },
];

export default function App() {
  const [currentSession, setCurrentSession] = useState(1);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);

  const [brandProfile, setBrandProfile] = useState({
    name: 'Minh Trần',
    yearsExperience: '10 năm',
    biggestWin: 'Giúp 60+ startup gọi vốn thành công',
    strengthSummary: 'Nhìn thấu bản chất vấn đề, kinh nghiệm thực chiến đo lường được, và phong cách truyền đạt tạo niềm tin ngay lần đầu.',
    whoHelp: 'chuyên gia 30-45 tuổi đang chuyển đổi sang làm tự do',
    whatChange: 'xây quỹ an toàn 12 tháng & có 3 khách hàng đầu tiên',
    whyTrust: '10+ năm kinh nghiệm thực chiến đồng hành cùng 60+ chuyên gia',
    positioningStatement: 'Bạn giúp chuyên gia đang chuyển sang làm tự do xây quỹ an toàn 12 tháng trước khi rời công việc.',
    firstOffer: 'Buổi chẩn đoán 1:1: Rà soát 3 điểm nghẽn chiến lược trong 60 phút',
    offerType: 'Buổi chẩn đoán 1:1',
    offerDescription: 'Rà soát 3 điểm nghẽn chiến lược trong 60 phút',
    contentGoal: 'Để đúng khách hàng biết đến tôi',
    contentIdeas: [],
    opportunities: [],
  });

  const updateProfile = (updates) => {
    setBrandProfile(prev => ({ ...prev, ...updates }));
  };

  const goToSession = (n) => {
    if (n >= 1 && n <= 5) setCurrentSession(n);
  };

  const handleCopyProfile = () => {
    const text = `HỒ SƠ THƯƠNG HIỆU CÁ NHÂN (BRAND BLUEPRINT)\n\nChuyên gia: ${brandProfile.name}\nSố năm kinh nghiệm: ${brandProfile.yearsExperience}\nThế mạnh cốt lõi: ${brandProfile.strengthSummary}\n\nĐỊNH VỊ THƯƠNG HIỆU:\n"${brandProfile.positioningStatement}"\n\nSẢN PHẨM KHỞI ĐẦU (SIGNATURE OFFER):\n${brandProfile.firstOffer}`;
    navigator.clipboard.writeText(text);
    setCopiedProfile(true);
    setTimeout(() => setCopiedProfile(false), 2000);
  };

  const renderSession = () => {
    switch (currentSession) {
      case 1: return <Session1Strengths profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(2)} />;
      case 2: return <Session2Positioning profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(3)} onBack={() => goToSession(1)} />;
      case 3: return <Session3Packaging profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(4)} onBack={() => goToSession(2)} />;
      case 4: return <Session4Content profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(5)} onBack={() => goToSession(3)} />;
      case 5: return <Session5Opportunities profile={brandProfile} updateProfile={updateProfile} onBack={() => goToSession(4)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-md border-b border-silver/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="opacity-90">
              <circle cx="20" cy="20" r="18" stroke="#111111" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="20" r="13" stroke="#111111" strokeWidth="1.2" fill="none"/>
              <circle cx="20" cy="20" r="8" stroke="#111111" strokeWidth="1" fill="none"/>
              <circle cx="20" cy="20" r="3.5" fill="#111111"/>
            </svg>
            <span className="font-serif text-lg font-semibold tracking-tight text-ink">Dấu Ấn</span>
          </div>

          {/* Session Steps (Dots) */}
          <div className="flex items-center gap-2">
            {SESSIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSession(s.id)}
                className="group relative flex items-center"
                title={s.label}
              >
                <div className={`step-dot ${
                  currentSession === s.id
                    ? 'w-7 bg-ink'
                    : s.id < currentSession
                    ? 'bg-ink'
                    : 'bg-silver'
                }`} />
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-ink/60 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {s.shortLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Hồ sơ thương hiệu Button */}
          <button
            className="text-xs font-medium text-ink/60 hover:text-ink transition-colors flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-silver/80"
            onClick={() => setShowProfileDrawer(true)}
          >
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span>Hồ sơ</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen">
        {renderSession()}
      </main>

      {/* Brand Profile Drawer (Central Memory Store) */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-cream h-full border-l border-silver p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-silver/60 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif text-lg font-bold text-ink">Hồ Sơ Thương Hiệu</h3>
                </div>
                <button
                  onClick={() => setShowProfileDrawer(false)}
                  className="p-1.5 rounded-full hover:bg-silver/40 text-ink/60 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Verified Owner Tag */}
              <div className="p-3 rounded-xl bg-white border border-silver/80 text-xs text-ink/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bộ nhớ trung tâm AI · Mã xác thực RLS Encrypted</span>
              </div>

              {/* Profile Fields */}
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-1">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">Chuyên gia</span>
                  <p className="font-serif text-base font-bold text-ink">{brandProfile.name || 'Minh Trần'}</p>
                  <p className="text-ink/60">{brandProfile.yearsExperience || '10+ năm'} kinh nghiệm</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-1">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">3 Thế mạnh cốt lõi</span>
                  <p className="text-ink/80 leading-relaxed">{brandProfile.strengthSummary}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-1">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Định vị thương hiệu</span>
                  <p className="font-serif text-sm font-semibold text-ink">"{brandProfile.positioningStatement}"</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-1">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">Sản phẩm giá trị khởi đầu (Offer)</span>
                  <p className="font-medium text-ink">{brandProfile.firstOffer}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-silver/60 flex items-center justify-between">
              <button
                onClick={handleCopyProfile}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all"
              >
                {copiedProfile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedProfile ? 'Đã sao chép hồ sơ' : 'Sao chép toàn bộ hồ sơ'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
