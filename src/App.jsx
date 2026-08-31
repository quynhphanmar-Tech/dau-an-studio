import React, { useState } from 'react';
import './index.css';
import Session1Strengths from './components/Session1Strengths';
import Session2Positioning from './components/Session2Positioning';
import Session3Packaging from './components/Session3Packaging';
import Session4Content from './components/Session4Content';
import Session5Opportunities from './components/Session5Opportunities';
import AuthModal from './components/AuthModal';
import { syncBrandProfileToSupabase } from './lib/supabaseClient';
import { BRAND_ARCHETYPES } from './data/brandVibes';
import { ShieldCheck, Award, X, Copy, Check, FileText, User, LogIn, Edit3, Save, Sparkles, Image, Palette } from 'lucide-react';

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
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
    archetypeId: 'sage-mentor',
    archetypeName: 'The Sage & Mentor (Người Cố Vấn Tri Thức)',
    brandVibe: 'Editorial Luxury / Apple Minimalist',
    brandColors: ['#F7F7F5', '#111111', '#315CFF', '#D9DADC'],
    pinterestTag: 'Editorial Confidence, Minimalist Studio, Warm Light Serif',
    contentGoal: 'Để đúng khách hàng biết đến tôi',
    contentIdeas: [],
    opportunities: [],
  });

  const updateProfile = (updates) => {
    setBrandProfile(prev => {
      const newProf = { ...prev, ...updates };
      // Sync in background to Supabase
      syncBrandProfileToSupabase(newProf);
      return newProf;
    });
  };

  const goToSession = (n) => {
    if (n >= 1 && n <= 5) setCurrentSession(n);
  };

  const handleCopyProfile = () => {
    const text = `HỒ SƠ THƯƠNG HIỆU CÁ NHÂN (BRAND BLUEPRINT)\n\nChuyên gia: ${brandProfile.name}\nKinh nghiệm: ${brandProfile.yearsExperience}\nHình mẫu thương hiệu: ${brandProfile.archetypeName}\nVisual Style: ${brandProfile.brandVibe}\n\nĐỊNH VỊ THƯƠNG HIỆU:\n"${brandProfile.positioningStatement}"\n\nSẢN PHẨM KHỞI ĐẦU:\n${brandProfile.firstOffer}`;
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
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-ink/60 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {s.shortLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Auth & Profile Actions */}
          <div className="flex items-center gap-2">
            {userAuth ? (
              <span className="text-xs font-semibold text-ink bg-white px-2.5 py-1 rounded-full border border-silver flex items-center gap-1">
                <User className="w-3 h-3 text-emerald-600" />
                {userAuth.name}
              </span>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-xs font-semibold text-ink hover:text-accent transition-colors flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-silver/80"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}

            <button
              className="text-xs font-medium text-ink/60 hover:text-ink transition-colors flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-silver/80"
              onClick={() => setShowProfileDrawer(true)}
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Hồ sơ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen">
        {renderSession()}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(user) => {
          setUserAuth(user);
          updateProfile({ name: user.name });
        }}
      />

      {/* Brand Profile Drawer (Full Editable Central Memory Store) */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-cream h-full border-l border-silver p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-silver/60 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif text-lg font-bold text-ink">Hồ Sơ Thương Hiệu</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="px-3 py-1 bg-white border border-silver rounded-full text-xs font-bold text-ink flex items-center gap-1 hover:border-ink"
                  >
                    {isEditingProfile ? <Save className="w-3 h-3 text-emerald-600" /> : <Edit3 className="w-3 h-3" />}
                    <span>{isEditingProfile ? 'Lưu chỉnh sửa' : 'Chỉnh sửa'}</span>
                  </button>

                  <button
                    onClick={() => setShowProfileDrawer(false)}
                    className="p-1.5 rounded-full hover:bg-silver/40 text-ink/60 hover:text-ink"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Fields (Editable View) */}
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">Chuyên gia & Kinh nghiệm</span>
                  {isEditingProfile ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={brandProfile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="w-full bg-cream border border-silver rounded p-2 text-xs font-bold text-ink"
                      />
                      <input
                        type="text"
                        value={brandProfile.yearsExperience}
                        onChange={(e) => updateProfile({ yearsExperience: e.target.value })}
                        className="w-full bg-cream border border-silver rounded p-2 text-xs text-ink"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-serif text-base font-bold text-ink">{brandProfile.name}</p>
                      <p className="text-ink/60">{brandProfile.yearsExperience} kinh nghiệm</p>
                    </>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">Hình mẫu & Visual Moodboard (Pinterest)</span>
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-ink text-xs">{brandProfile.archetypeName}</p>
                    <div className="flex gap-1">
                      {brandProfile.brandColors?.map((c, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-full border border-silver" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-ink/50 text-[10px]">Vibe: {brandProfile.brandVibe}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">Định vị thương hiệu</span>
                  {isEditingProfile ? (
                    <textarea
                      rows={3}
                      value={brandProfile.positioningStatement}
                      onChange={(e) => updateProfile({ positioningStatement: e.target.value })}
                      className="w-full bg-cream border border-silver rounded p-2 text-xs text-ink resize-none"
                    />
                  ) : (
                    <p className="font-serif text-sm font-semibold text-ink">"{brandProfile.positioningStatement}"</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">Sản phẩm giá trị (Signature Offer)</span>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={brandProfile.firstOffer}
                      onChange={(e) => updateProfile({ firstOffer: e.target.value })}
                      className="w-full bg-cream border border-silver rounded p-2 text-xs text-ink"
                    />
                  ) : (
                    <p className="font-medium text-ink">{brandProfile.firstOffer}</p>
                  )}
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
