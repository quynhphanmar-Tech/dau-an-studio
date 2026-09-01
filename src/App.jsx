import React, { useState } from 'react';
import './index.css';
import Session1Strengths from './components/Session1Strengths';
import Session2Positioning from './components/Session2Positioning';
import Session3Packaging from './components/Session3Packaging';
import Session4Content from './components/Session4Content';
import Session5Opportunities from './components/Session5Opportunities';
import SelfDiscoveryTab from './components/SelfDiscoveryTab';
import AuthModal from './components/AuthModal';
import { DauAnLogoWordmark, DauAnAppIcon, FingerprintMark } from './components/DauAnLogo';
import { syncBrandProfileToSupabase } from './lib/supabaseClient';
import { TRANSLATIONS } from './data/translations';
import { 
  Sparkles, Award, X, Copy, Check, FileText, User, LogIn, Edit3, 
  Save, LogOut, Heart, Compass, Globe, Box, Handshake, CheckCircle2, ChevronDown, Bell, Upload, Link as LinkIcon 
} from 'lucide-react';

/**
 * EXPERTPRINT — APP SHELL (DẤU ẤN STUDIO)
 * Featuring Auto-Save Brand Profile & Custom/Google Avatar Upload
 */

const NAVIGATION_AREAS = [
  { id: 1, label: 'Hiểu mình', labelEn: 'Self-Discovery', icon: Sparkles },
  { id: 2, label: 'Thương hiệu', labelEn: 'Brand', icon: FingerprintNavIcon },
  { id: 3, label: 'Giá trị', labelEn: 'Value', icon: Box },
  { id: 4, label: 'Nội dung', labelEn: 'Content', icon: Edit3 },
  { id: 5, label: 'Cơ hội', labelEn: 'Leads', icon: Handshake },
];

function FingerprintNavIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a9 9 0 0 0-9 9" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      <path d="M12 7a5 5 0 0 0-5 5" />
      <path d="M12 7a5 5 0 0 1 5 5" />
      <path d="M12 11a1 1 0 0 0-1 1" />
      <path d="M12 11a1 1 0 0 1 1 1" />
    </svg>
  );
}

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

  // Active Navigation Area (1 to 5) - Default area 2: "Thương hiệu"
  const [currentArea, setCurrentArea] = useState(2);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [googleAvatarUrl, setGoogleAvatarUrl] = useState('');

  // User Profile
  const [userAuth, setUserAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('dauan_user_session');
      return saved ? JSON.parse(saved) : { 
        name: 'Trần Thị Phương Hà', 
        email: 'phuongha@dauan.studio', 
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' 
      };
    } catch (e) {
      return { 
        name: 'Trần Thị Phương Hà', 
        email: 'phuongha@dauan.studio',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
      };
    }
  });

  const [brandProfile, setBrandProfile] = useState(() => {
    try {
      const savedProf = localStorage.getItem('dauan_brand_profile');
      if (savedProf) return JSON.parse(savedProf);
    } catch (e) {}
    return {
      name: 'Trần Thị Phương Hà',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      yearsExperience: '10 năm',
      biggestWin: 'Giúp 60+ chuyên gia xây quỹ dòng tiền và đóng gói Signature Offer',
      strengthSummary: 'Nhìn thấu bản chất vấn đề, chẩn đoán đúng nút thắt chiến lược, và đóng gói giải pháp có giá trị chuyển đổi cao.',
      whoHelp: 'chuyên gia 30-45 tuổi đang chuyển đổi sang tư vấn độc lập',
      whatChange: 'xây quỹ an toàn 12 tháng & có 3 khách hàng đầu tiên',
      whyTrust: '10+ năm kinh nghiệm thực chiến đồng hành cùng 60+ dự án',
      positioningStatement: 'Bạn giúp chuyên gia đang chuyển sang làm tự do xây quỹ an toàn 12 tháng trước khi rời công việc.',
      firstOffer: 'Buổi chẩn đoán 1:1: Rà soát 3 điểm nghẽn chiến lược trong 60 phút',
      archetypeName: 'The Sage & Mentor (Người Cố Vấn Tri Thức)',
      brandVibe: 'Editorial Luxury / Apple Minimalist',
      brandColors: ['#F7F7F5', '#111111', '#315CFF', '#D9DADC'],
      contentGoal: 'Để đúng khách hàng biết đến tôi',
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

  const handleUpdateAvatar = (newAvatarSrc) => {
    if (!newAvatarSrc) return;
    const updatedUser = { ...userAuth, avatar: newAvatarSrc };
    setUserAuth(updatedUser);
    try {
      localStorage.setItem('dauan_user_session', JSON.stringify(updatedUser));
    } catch (e) {}
    updateProfile({ avatar: newAvatarSrc });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        handleUpdateAvatar(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLoginSuccess = (user) => {
    setUserAuth(user);
    try {
      localStorage.setItem('dauan_user_session', JSON.stringify(user));
    } catch (e) {}
    updateProfile({ name: user.name, avatar: user.avatar || brandProfile.avatar });
  };

  const handleLogout = () => {
    setUserAuth(null);
    try {
      localStorage.removeItem('dauan_user_session');
    } catch (e) {}
  };

  const renderCurrentArea = () => {
    switch (currentArea) {
      case 1:
        return <SelfDiscoveryTab profile={brandProfile} updateProfile={updateProfile} lang={lang} />;
      case 2:
        return <Session1Strengths profile={brandProfile} updateProfile={updateProfile} onNext={() => setCurrentArea(3)} lang={lang} />;
      case 3:
        return <Session3Packaging profile={brandProfile} updateProfile={updateProfile} onNext={() => setCurrentArea(4)} onBack={() => setCurrentArea(2)} lang={lang} />;
      case 4:
        return <Session4Content profile={brandProfile} updateProfile={updateProfile} onNext={() => setCurrentArea(5)} onBack={() => setCurrentArea(3)} lang={lang} />;
      case 5:
        return <Session5Opportunities profile={brandProfile} updateProfile={updateProfile} onBack={() => setCurrentArea(4)} lang={lang} />;
      default:
        return <Session1Strengths profile={brandProfile} updateProfile={updateProfile} onNext={() => setCurrentArea(3)} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink font-sans flex flex-col justify-between selection:bg-[#315CFF]/15 selection:text-ink">
      
      {/* Top Header Bar with DẤU ẤN STUDIO Logo Wordmark */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-silver/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          
          {/* Left: DẤU ẤN STUDIO Logo Wordmark */}
          <div 
            onClick={() => setCurrentArea(2)} 
            className="cursor-pointer hover:opacity-90 transition-opacity shrink-0"
          >
            <DauAnLogoWordmark size="normal" showTagline={false} />
          </div>

          {/* Center Breadcrumbs Area Info */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-ink/60 uppercase">
              {currentArea === 2 && (lang === 'en' ? 'MY BRAND · DISCOVERY 01' : 'THƯƠNG HIỆU CỦA TÔI · KHÁM PHÁ 01')}
              {currentArea === 4 && (lang === 'en' ? 'Create Content / Video' : 'Tạo nội dung / Video')}
              {currentArea === 1 && (lang === 'en' ? 'Today / Reflection Compass' : 'Hôm nay / La Bàn Khai Vấn')}
              {currentArea === 3 && (lang === 'en' ? 'Package Value / Signature Offer' : 'Đóng gói giá trị / Signature Offer')}
              {currentArea === 5 && (lang === 'en' ? 'Opportunities / Pipeline CRM' : 'Cơ hội / Pipeline CRM')}
            </span>
          </div>

          {/* Right: Autosave, Language & User Profile Avatar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink/60 font-sans hidden sm:flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'Saved' : 'Đã lưu'}</span>
            </span>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-[10px] font-semibold text-ink bg-white hover:bg-cream px-2.5 py-1 rounded-full border border-silver/80 shadow-xs flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#315CFF]" />
              <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            {/* User Profile Pill with Avatar Dropdown */}
            {userAuth && (
              <button 
                onClick={() => setShowProfileDrawer(true)}
                className="flex items-center gap-2 bg-white pl-1.5 pr-2.5 py-1 rounded-full border border-silver/80 hover:border-ink/40 transition-all shadow-xs"
              >
                <img 
                  src={userAuth.avatar || brandProfile.avatar} 
                  alt="Avatar" 
                  className="w-5.5 h-5.5 rounded-full object-cover border border-silver"
                />
                <span className="text-xs font-semibold text-ink max-w-[120px] truncate hidden sm:inline">{userAuth.name}</span>
                <ChevronDown className="w-3 h-3 text-ink/40" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentArea()}
      </main>

      {/* Fixed Black Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] text-white shadow-2xl border-t border-white/10">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-around">
          {NAVIGATION_AREAS.map((item) => {
            const Icon = item.icon;
            const isActive = currentArea === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentArea(item.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-all py-1 px-3 rounded-xl ${
                  isActive ? 'text-white font-bold scale-105' : 'text-white/40 hover:text-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#315CFF]' : 'text-current'}`} />
                <span className="text-[10px] tracking-tight">{lang === 'en' ? item.labelEn : item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Brand Profile Drawer with Custom & Google Avatar Upload */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-cream h-full border-l border-silver p-5 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-silver/60 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#315CFF]" />
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {lang === 'en' ? 'Brand Profile & Avatar' : 'Hồ Sơ Thương Hiệu & Avatar'}
                  </h3>
                </div>

                <button
                  onClick={() => setShowProfileDrawer(false)}
                  className="p-1.5 rounded-full hover:bg-silver/40 text-ink/60 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar Section: Upload or Link Google Avatar */}
              <div className="bg-white p-5 rounded-3xl border border-silver/80 space-y-4 shadow-xs text-xs">
                <span className="text-[10px] text-[#315CFF] font-bold uppercase tracking-wider block">
                  ẢNH ĐẠI DIỆN CHUYÊN GIA (PROFILE AVATAR)
                </span>

                <div className="flex items-center gap-4">
                  <img 
                    src={userAuth?.avatar || brandProfile.avatar} 
                    alt="Avatar" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#315CFF]/30 shadow-xs"
                  />

                  <div className="space-y-2 flex-1">
                    {/* File Upload Button */}
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream border border-silver hover:border-ink/40 text-xs font-semibold text-ink cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-[#315CFF]" />
                      <span>Upload ảnh từ máy</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                    <p className="text-[10px] text-ink/40">Hỗ trợ JPG, PNG, WEBP</p>
                  </div>
                </div>

                {/* Link Google Avatar URL input */}
                <div className="space-y-1.5 pt-2 border-t border-silver/40">
                  <label className="text-[10px] text-ink/60 font-bold uppercase tracking-wider flex items-center gap-1">
                    <LinkIcon className="w-3 h-3 text-[#315CFF]" />
                    <span>Hoặc dán Link ảnh Google Avatar:</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <input 
                      type="url"
                      value={googleAvatarUrl}
                      onChange={(e) => setGoogleAvatarUrl(e.target.value)}
                      placeholder="https://lh3.googleusercontent.com/..."
                      className="flex-1 bg-cream/60 border border-silver rounded-xl px-3 py-2 text-xs text-ink font-mono"
                    />
                    <button
                      onClick={() => {
                        if (googleAvatarUrl.trim()) {
                          handleUpdateAvatar(googleAvatarUrl.trim());
                          setGoogleAvatarUrl('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-[#315CFF] text-white font-bold text-xs hover:bg-[#274bdb]"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">Chuyên gia</span>
                  <p className="font-serif text-base font-bold text-ink">{brandProfile.name}</p>
                  <p className="text-ink/60">{brandProfile.yearsExperience} kinh nghiệm</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-[#315CFF] font-bold uppercase tracking-wider block">Định vị</span>
                  <p className="font-serif text-sm font-semibold text-ink leading-snug">"{brandProfile.positioningStatement}"</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-silver/80 space-y-2">
                  <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider block">Sản phẩm giá trị</span>
                  <p className="font-medium text-ink">{brandProfile.firstOffer}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-silver/60">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`HỒ SƠ THƯƠNG HIỆU: ${brandProfile.name}\nĐịnh vị: ${brandProfile.positioningStatement}`);
                  alert("Đã sao chép hồ sơ thương hiệu!");
                }}
                className="w-full h-11 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all shadow-sm"
              >
                Sao chép toàn bộ hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
