import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, Upload, Camera, Play, Pause, RefreshCw, Sparkles, Layers, Volume2, Download, Eye, EyeOff, Layout, FileText, CheckCircle2, Film, Radio, Sliders } from 'lucide-react';

const BROLL_PRESETS = [
  { id: 1, scene: 'Cảnh 1 (Hook 0-6s)', title: 'Bàn làm việc ban đêm', desc: 'Ánh đèn ấm, góc quay cinematic', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-working-late-at-the-office-4340-large.mp4' },
  { id: 2, scene: 'Cảnh 2 (Tension 6-20s)', title: 'Bút viết ghi chú & Rà soát', desc: 'Phân tích số liệu, góc cận cảnh', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-writing-on-a-notebook-42790-large.mp4' },
  { id: 3, scene: 'Cảnh 3 (Core Insight 20-45s)', title: 'Bình minh thành phố & Bước đi', desc: 'Góc nhìn mở, tự tin tiến bước', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-skyscrapers-at-sunrise-41551-large.mp4' },
  { id: 4, scene: 'Cảnh 4 (Soft CTA 45-55s)', title: 'Màn hình điện thoại kết nối', desc: 'Mời nhận bản đồ chẩn đoán 1:1', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-holding-a-smartphone-with-green-screen-41554-large.mp4' }
];

export default function VideoStudioEngine({ ideaTitle, ideaWhy, profile }) {
  // Input Modes: 'faceless' | 'camera' | 'voiceover' | 'upload'
  const [inputMode, setInputMode] = useState('faceless');
  
  // Presence Modes: 'faceless' | 'avatar' | 'pip'
  const [presenceMode, setPresenceMode] = useState('faceless');

  // Teleprompter & Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [isPlayingScript, setIsPlayingScript] = useState(false);
  const [autoAssembleProgress, setAutoAssembleProgress] = useState(0);
  const [isAssembling, setIsAssembling] = useState(false);
  const [activeBrollIndex, setActiveBrollIndex] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordTimer(t => (t < 55 ? t + 1 : 55));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleStartAutoAssemble = () => {
    setIsAssembling(true);
    setAutoAssembleProgress(10);
    const interval = setInterval(() => {
      setAutoAssembleProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsAssembling(false);
          return 100;
        }
        return p + 15;
      });
    }, 400);
  };

  const currentBroll = BROLL_PRESETS[activeBrollIndex];

  return (
    <div className="bg-white rounded-3xl border border-silver/80 p-6 md:p-8 space-y-6 animate-fade-in-up">
      {/* Module Title */}
      <div className="flex items-center justify-between border-b border-silver/60 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
            Full AI Video Studio Engine 9:16
          </span>
          <h3 className="font-serif text-xl font-bold text-ink">Xưởng Sản Xuất Video Dọc & Máy Nhắc Chữ</h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Chuẩn TikTok / Reels 0-55s</span>
        </div>
      </div>

      {/* 4 Chế Độ Đưa Dữ Liệu Đầu Vào (Input Modes) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ink/70 block">1. Chọn chế độ dữ liệu đầu vào:</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'faceless', icon: Film, label: 'B-Roll Tự Động', sub: 'Faceless 100%' },
            { id: 'camera', icon: Camera, label: 'Quay Camera', sub: 'Máy nhắc chữ nổi' },
            { id: 'voiceover', icon: Mic, label: 'Thu Âm Mic', sub: 'Sóng âm & Cảm xúc' },
            { id: 'upload', icon: Upload, label: 'Tải File Lên', sub: 'MP4, MOV, MP3' },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = inputMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setInputMode(mode.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected ? 'bg-ink text-cream border-ink shadow-sm' : 'bg-cream/50 border-silver/80 text-ink hover:border-ink/30'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-cream' : 'text-accent'}`} />
                <p className="text-xs font-bold">{mode.label}</p>
                <p className={`text-[10px] ${isSelected ? 'text-cream/70' : 'text-ink/40'}`}>{mode.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Chế Độ Hiển Thị Diện (Presence Options) */}
      <div className="space-y-2 pt-1">
        <label className="text-xs font-semibold text-ink/70 block">2. Chọn mức độ hiện diện của Chuyên gia:</label>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { id: 'faceless', label: 'Ẩn danh 100%', desc: '100% B-Roll & Kinetic Text' },
            { id: 'avatar', label: 'Nhân bản AI Avatar', desc: 'Bản sao số Lip-sync' },
            { id: 'pip', label: 'Hybrid PiP (Khung tròn)', desc: 'Avatar góc + B-Roll nền' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPresenceMode(p.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                presenceMode === p.id ? 'bg-white border-ink ring-1 ring-ink/10 shadow-sm font-bold text-ink' : 'bg-cream border-silver/60 text-ink/60'
              }`}
            >
              <p className="text-xs">{p.label}</p>
              <p className="text-[10px] text-ink/40 mt-0.5">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Storyboard 4 Cảnh B-Roll Matcher (Smart Footage Matcher) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-accent" />
            Phân cảnh Storyboard & Khớp Footage 4K:
          </span>
          <span className="text-[11px] text-ink/50">Cảnh hiện tại: {currentBroll.scene}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {BROLL_PRESETS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveBrollIndex(idx)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeBrollIndex === idx ? 'bg-white border-ink ring-1 ring-ink/10 shadow-md' : 'bg-cream/40 border-silver/70 hover:border-ink/30'
              }`}
            >
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">{item.scene}</span>
              <p className="text-xs font-bold text-ink mt-0.5 line-clamp-1">{item.title}</p>
              <p className="text-[10px] text-ink/50 line-clamp-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Teleprompter & Live Recording Area */}
      {inputMode === 'camera' && (
        <div className="bg-ink rounded-2xl p-5 text-white space-y-3 animate-fade-in relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/20 pb-2 text-xs">
            <span className="font-bold flex items-center gap-1.5 text-amber-300">
              <Camera className="w-4 h-4" /> Máy Nhắc Chữ Nổi (Floating Teleprompter)
            </span>
            <span className="font-mono">{recordTimer}s / 55s</span>
          </div>

          <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center font-serif text-sm md:text-base leading-relaxed text-amber-100">
            "{ideaTitle || 'Nhiều người nghĩ rằng có 10+ năm kinh nghiệm thì cứ ra làm tự do là có khách...'}"
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                isRecording ? 'bg-coral text-white animate-pulse' : 'bg-white text-ink hover:bg-cream'
              }`}
            >
              {isRecording ? 'Dừng thu camera' : 'Bắt đầu quay với Teleprompter'}
            </button>
          </div>
        </div>
      )}

      {/* Auto-Assembly Engine Trigger */}
      <div className="pt-2 border-t border-silver/60 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-ink">Trình Dựng Phim Tự Động (AI Auto-Assembly Engine)</p>
            <p className="text-[11px] text-ink/50">Tự động ghép 4 cảnh B-Roll, phủ chữ Kinetic Subtitle & hòa âm Ambient Piano 12%</p>
          </div>

          <button
            onClick={handleStartAutoAssemble}
            disabled={isAssembling}
            className="px-5 py-2.5 rounded-full bg-ink text-cream text-xs font-bold hover:bg-ink/90 transition-all flex items-center gap-1.5 shadow"
          >
            {isAssembling ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
            <span>{isAssembling ? `Đang dựng ${autoAssembleProgress}%` : 'Tự Động Dựng Video Theo Kịch Bản'}</span>
          </button>
        </div>

        {/* Progress Bar */}
        {isAssembling && (
          <div className="w-full bg-cream rounded-full h-2 overflow-hidden border border-silver/60">
            <div className="bg-accent h-full transition-all duration-300" style={{ width: `${autoAssembleProgress}%` }} />
          </div>
        )}
      </div>

      {/* 9:16 Mobile Player Preview & MP4 Export */}
      <div className="flex flex-col items-center pt-2">
        <div className="w-full max-w-[280px] aspect-[9/16] bg-ink rounded-[32px] border-4 border-silver/80 relative overflow-hidden flex flex-col justify-between p-4 shadow-2xl">
          {/* B-Roll Video Background Simulation */}
          <video
            src={currentBroll.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

          {/* Top Info */}
          <div className="relative z-10 flex items-center justify-between text-white pt-1">
            <span className="text-[9px] font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded-full">9:16 TikTok / Reels</span>
            <span className="text-[9px] text-amber-300 font-bold">Ambient BGM 12%</span>
          </div>

          {/* Picture-in-Picture Avatar Mode */}
          {presenceMode === 'pip' && (
            <div className="relative z-10 w-12 h-12 rounded-full border-2 border-amber-400 overflow-hidden shadow-lg ml-auto">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Kinetic Caption in Middle */}
          <div className="relative z-10 my-auto text-center px-2 space-y-1.5">
            <div className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-lg uppercase tracking-tight shadow">
              {currentBroll.scene}
            </div>
            <p className="text-[11px] text-white font-bold bg-black/70 backdrop-blur p-2 rounded-xl border border-white/20 leading-snug">
              "{ideaTitle || 'Nội dung thương hiệu chuyên gia sắc bén'}"
            </p>
          </div>

          {/* Bottom Author Tag */}
          <div className="relative z-10 flex items-center justify-between text-white text-[10px] pb-1">
            <div>
              <p className="font-bold">{profile.name || 'Chuyên gia'}</p>
              <p className="text-white/60 text-[9px]">Dấu Ấn Studio Verified</p>
            </div>
            <button
              onClick={() => alert("Đang xuất file Video MP4 chuẩn HD 9:16!")}
              className="px-3 py-1 rounded-full bg-accent text-white font-bold text-[10px] shadow"
            >
              Tải MP4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
