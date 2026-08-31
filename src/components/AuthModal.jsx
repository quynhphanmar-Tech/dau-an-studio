import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        email,
        name: name || email.split('@')[0],
        token: 'auth-token-user-verified'
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-cream border border-silver rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-white border border-silver/80 text-ink/60 hover:text-ink transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
            Dấu Ấn Studio Auth
          </span>
          <h3 className="font-serif text-2xl font-semibold text-ink">
            {isSignUp ? 'Tạo tài khoản Studio mới' : 'Đăng nhập Dấu Ấn Studio'}
          </h3>
          <p className="text-xs text-ink/50 leading-relaxed">
            Lưu trữ không giới hạn Hồ sơ thương hiệu & Đồng bộ đa thiết bị.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink/70">Họ và tên chuyên gia</label>
              <div className="relative">
                <User className="w-4 h-4 text-ink/40 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Minh Trần"
                  className="w-full bg-white border border-silver rounded-xl text-xs text-ink pl-10 pr-4 py-3 placeholder:text-silver focus:border-ink/30 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ink/70">Email làm việc</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink/40 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chuyen-gia@domain.com"
                className="w-full bg-white border border-silver rounded-xl text-xs text-ink pl-10 pr-4 py-3 placeholder:text-silver focus:border-ink/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ink/70">Mật khẩu bảo mật</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink/40 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-silver rounded-xl text-xs text-ink pl-10 pr-4 py-3 placeholder:text-silver focus:border-ink/30 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all flex items-center justify-center gap-2 shadow active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Đang xác thực...' : isSignUp ? 'Tạo tài khoản & Bắt đầu' : 'Đăng nhập Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center border-t border-silver/60">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-accent font-semibold hover:underline"
          >
            {isSignUp ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
          </button>
        </div>
      </div>
    </div>
  );
}
