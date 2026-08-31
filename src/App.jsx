import React, { useState, useEffect } from 'react';
import './index.css';
import Session1Strengths from './components/Session1Strengths';
import Session2Positioning from './components/Session2Positioning';
import Session3Packaging from './components/Session3Packaging';
import Session4Content from './components/Session4Content';
import Session5Opportunities from './components/Session5Opportunities';
import SelfDiscoveryTab from './components/SelfDiscoveryTab';
import AuthModal from './components/AuthModal';
import { syncBrandProfileToSupabase } from './lib/supabaseClient';
import { BRAND_ARCHETYPES } from './data/brandVibes';
import { TRANSLATIONS } from './data/translations';
import { ShieldCheck, Award, X, Copy, Check, FileText, User, LogIn, Edit3, Save, LogOut, Heart, Sparkles, Compass, RefreshCw, Globe, Unlock } from 'lucide-react';

const SESSIONS = [
  { id: 1, label: 'Hiểu thế mạnh', shortLabel: 'Thế mạnh', labelEn: 'Strengths', shortLabelEn: 'Strengths' },
  { id: 2, label: 'Chọn hướng xuất hiện', shortLabel: 'Định vị', labelEn: 'Positioning', shortLabelEn: 'Position' },
  { id: 3, label: 'Đóng gói giá trị', shortLabel: 'Giá trị', labelEn: 'Packaging', shortLabelEn: 'Package' },
  { id: 4, label: 'Biến thành nội dung', shortLabel: 'Nội dung', labelEn: 'Content Studio', shortLabelEn: 'Content' },
  { id: 5, label: 'Theo dõi cơ hội', shortLabel: 'Cơ hội', labelEn: 'Opportunities', shortLabelEn: 'Leads' },
];

export default function App() {
  // Bilingual Language State: 'vi' | 'en'
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('dauan_lang') || 'vi';
    } catch (e) {
      return 'vi';
    }
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const toggleLanguage = () => {
    const nextLang = lang === 'vi' ? 'en' : 'vi';
    setLang(nextLang);
    try {
      localStorage.setItem('dauan_lang', nextLang);
    } catch (e) {}
  };

  // Default starting session: Set to 1 by default, but ALL sessions are 100% unlocked & clickable anytime!
  const [currentSession, setCurrentSession] = useState(1);
  const [activeMainTab, setActiveMainTab] = useState('studio'); // 'studio' | 'self-discovery'
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Persistent Auth State
  const [userAuth, setUserAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('dauan_user_session');
      return saved ? JSON.parse(saved) : { name: 'Minh Trần (Demo Expert)', email: 'demo@dauan.studio', isDemo: true };
    } catch (e) {
      return { name: 'Minh Trần (Demo Expert)', email: 'demo@dauan.studio', isDemo: true };
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);

  const [brandProfile, setBrandProfile] = useState(() => {
    try {
      const savedProf = localStorage.getItem('dauan_brand_profile');
      if (savedProf) return JSON.parse(savedProf);
    } catch (e) {}
    return {
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
    };
  });

  const updateProfile = (updates) => {
    setBrandProfile(prev => {
      const newProf = { ...prev, ...updates };
      try {
        localStorage.setItem('dauan_brand_profile', JSON.stringify(newProf));
      } catch (e) {}
      syncBrandProfileToSupabase(newProf);
      return newProf;
    });
  };

  const handleLoginSuccess = (user) => {
    setUserAuth(user);
    try {
      localStorage.setItem('dauan_user_session', JSON.stringify(user));
    } catch (e) {}
    updateProfile({ name: user.name });
  };

  const handleLogout = () => {
    setUserAuth(null);
    try {
      localStorage.removeItem('dauan_user_session');
    } catch (e) {}
  };

  const goToSession = (n) => {
    setActiveMainTab('studio');
    if (n >= 1 && n <= 5) setCurrentSession(n);
  };

  const handleCopyProfile = () => {
    const text = `HỒ SƠ THƯƠNG HIỆU CÁ NHÂN (BRAND BLUEPRINT)\n\nChuyên gia: ${brandProfile.name}\nKinh nghiệm: ${brandProfile.yearsExperience}\nHình mẫu thương hiệu: ${brandProfile.archetypeName}\nVisual Style: ${brandProfile.brandVibe}\n\nĐỊNH VỊ THƯƠNG HIỆU:\n"${brandProfile.positioningStatement}"\n\nSẢN PHẨM KHỞI ĐẦU:\n${brandProfile.firstOffer}`;
    navigator.clipboard.writeText(text);
    setCopiedProfile(true);
    setTimeout(() => setCopiedProfile(false), 2000);
  };

  const renderContent = () => {
    if (activeMainTab === 'self-discovery') {
      return <SelfDiscoveryTab profile={brandProfile} updateProfile={updateProfile} lang={lang} />;
    }

    switch (currentSession) {
      case 1: return <Session1Strengths profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(2)} userAuth={userAuth} onLoginSuccess={handleLoginSuccess} lang={lang} />;
      case 2: return <Session2Positioning profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(3)} onBack={() => goToSession(1)} lang={lang} />;
      case 3: return <Session3Packaging profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(4)} onBack={() => goToSession(2)} lang={lang} />;
      case 4: return <Session4Content profile={brandProfile} updateProfile={updateProfile} onNext={() => goToSession(5)} onBack={() => goToSession(3)} lang={lang} />;
      case 5: return <Session5Opportunities profile={brandProfile} updateProfile={updateProfile} onBack={() => goToSession(4)} lang={lang} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Top Main Responsive Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-silver/60">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-1.5">
          {/* Brand Logo & Main Tab Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              onClick={() => setActiveMainTab('studio')}
              className="flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="opacity-90">
                <circle cx="20" cy="20" r="18" stroke="#111111" strokeWidth="1.5" fill="none"/>
                <circle cx="20" cy="20" r="13" stroke="#111111" strokeWidth="1.2" fill="none"/>
                <circle cx="20" cy="20" r="8" stroke="#111111" strokeWidth="1" fill="none"/>
                <circle cx="20" cy="20" r="3.5" fill="#111111"/>
              </svg>
              <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-ink hidden xs:inline">{t.appTitle}</span>
            </div>

            {/* TAB SWITCHER: Studio vs Hiểu Mình */}
            <div className="flex items-center bg-white p-0.5 sm:p-1 rounded-full border border-silver text-[11px] sm:text-xs">
              <button
                onClick={() => setActiveMainTab('studio')}
                className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
                  activeMainTab === 'studio' ? 'bg-ink text-cream shadow-sm' : 'text-ink/60 hover:text-ink'
                }`}
              >
                <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{t.studio5Steps}</span>
              </button>

              <button
                onClick={() => setActiveMainTab('self-discovery')}
                className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
                  activeMainTab === 'self-discovery' ? 'bg-coral text-white shadow-sm' : 'text-coral hover:bg-coral/10'
                }`}
              >
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>{t.selfDiscovery}</span>
              </button>
            </div>
          </div>

          {/* Language Switcher, Auth & Profile Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Bilingual VI / EN Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="text-[10px] sm:text-xs font-bold text-ink bg-white hover:bg-cream px-2 sm:px-2.5 py-1 rounded-full border border-silver shadow-sm flex items-center gap-1"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-accent" />
              <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            {userAuth ? (
              <div className="flex items-center gap-1 bg-white px-2 sm:px-2.5 py-1 rounded-full border border-silver shadow-sm text-[11px] sm:text-xs">
                <User className="w-3 h-3 text-emerald-600" />
                <span className="font-bold text-ink max-w-[65px] sm:max-w-[100px] truncate">{userAuth.name}</span>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-0.5 hover:text-coral text-ink/40 transition-colors ml-0.5"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-[11px] sm:text-xs font-bold text-white bg-ink hover:bg-ink/90 transition-all flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full shadow-sm"
              >
                <LogIn className="w-3 h-3 text-cream" />
                <span>{t.login}</span>
              </button>
            )}

            <button
              className="text-[11px] sm:text-xs font-bold text-ink bg-white hover:bg-cream transition-colors flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full border border-silver shadow-sm"
              onClick={() => setShowProfileDrawer(true)}
            >
              <FileText className="w-3 h-3 text-accent" />
              <span className="hidden xs:inline">{t.profile}</span>
            </button>
          </div>
        </div>

        {/* PROMINENT & 100% UNLOCKED STEP NAVIGATION BAR */}
        {activeMainTab === 'studio' && (
          <div className="bg-white border-t border-silver/60 py-2 shadow-sm">
            <div className="max-w-2xl mx-auto px-4 flex items-center justify-between overflow-x-auto custom-scrollbar gap-2">
              {SESSIONS.map((s) => {
                const isActive = currentSession === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToSession(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-ink text-cream shadow-md scale-105 ring-2 ring-ink/20'
                        : 'bg-cream text-ink/80 hover:bg-ink hover:text-cream border border-silver/80'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-silver/60 text-ink/70'
                    }`}>
                      {s.id}
                    </span>
                    <span>{lang === 'en' ? s.shortLabelEn : s.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="pt-28 min-h-screen">
        {renderContent()}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Brand Profile Drawer */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-cream h-full border-l border-silver p-5 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-silver/60 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {lang === 'en' ? 'Brand Profile Blueprint' : 'Hồ Sơ Thương Hiệu'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="px-3 py-1 bg-white border border-silver rounded-full text-xs font-bold text-ink flex items-center gap-1 hover:border-ink"
                  >
                    {isEditingProfile ? <Save className="w-3 h-3 text-emerald-600" /> : <Edit3 className="w-3 h-3" />}
                    <span>{isEditingProfile ? (lang === 'en' ? 'Save' : 'Lưu chỉnh sửa') : (lang === 'en' ? 'Edit' : 'Chỉnh sửa')}</span>
                  </button>

                  <button
                    onClick={() => setShowProfileDrawer(false)}
                    className="p-1.5 rounded-full hover:bg-silver/40 text-ink/60 hover:text-ink"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">
                    {lang === 'en' ? 'Expert Name & Experience' : 'Chuyên gia & Kinh nghiệm'}
                  </span>
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
                      <p className="text-ink/60">{brandProfile.yearsExperience} {lang === 'en' ? 'experience' : 'kinh nghiệm'}</p>
                    </>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">
                    {lang === 'en' ? 'Brand Archetype & Pinterest Moodboard' : 'Hình mẫu & Visual Moodboard (Pinterest)'}
                  </span>
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
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">
                    {lang === 'en' ? 'Brand Positioning Statement' : 'Định vị thương hiệu'}
                  </span>
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
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">
                    {lang === 'en' ? 'Signature Offer' : 'Sản phẩm giá trị (Signature Offer)'}
                  </span>
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
                <span>{copiedProfile ? (lang === 'en' ? 'Blueprint Copied' : 'Đã sao chép hồ sơ') : (lang === 'en' ? 'Copy Full Blueprint' : 'Sao chép toàn bộ hồ sơ')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
