import React, { useState } from 'react';
import './index.css';
import Session1Strengths from './components/Session1Strengths';
import Session2Positioning from './components/Session2Positioning';
import Session3Packaging from './components/Session3Packaging';
import Session4Content from './components/Session4Content';
import Session5Opportunities from './components/Session5Opportunities';

const SESSIONS = [
  { id: 1, label: 'Hiểu thế mạnh', shortLabel: 'Thế mạnh' },
  { id: 2, label: 'Chọn hướng xuất hiện', shortLabel: 'Định vị' },
  { id: 3, label: 'Đóng gói giá trị', shortLabel: 'Giá trị' },
  { id: 4, label: 'Biến thành nội dung', shortLabel: 'Nội dung' },
  { id: 5, label: 'Theo dõi cơ hội', shortLabel: 'Cơ hội' },
];

export default function App() {
  const [currentSession, setCurrentSession] = useState(1);
  const [brandProfile, setBrandProfile] = useState({
    // Session 1: Strengths
    name: '',
    yearsExperience: '',
    biggestWin: '',
    strengthSummary: '',
    voiceRecordings: [],
    linkedinUrl: '',
    // Session 2: Positioning
    whoHelp: '',
    whatChange: '',
    whyTrust: '',
    positioningStatement: '',
    readinessNote: '',
    // Session 3: Packaging
    firstOffer: '',
    offerType: '',
    offerDescription: '',
    // Session 4: Content
    contentGoal: '',
    contentIdeas: [],
    // Session 5: Opportunities
    opportunities: [],
  });

  const updateProfile = (updates) => {
    setBrandProfile(prev => ({ ...prev, ...updates }));
  };

  const goToSession = (n) => {
    if (n >= 1 && n <= 5) setCurrentSession(n);
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-silver/50">
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
            className="text-xs font-medium text-ink/60 hover:text-ink transition-colors flex items-center gap-1.5"
            onClick={() => {}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Hồ sơ
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen">
        {renderSession()}
      </main>
    </div>
  );
}
