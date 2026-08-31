import React, { useState } from 'react';
import { ArrowLeft, Plus, MessageSquare, Mail, Linkedin, Globe, X, TrendingUp, ShieldCheck, Sparkles, Award } from 'lucide-react';

const SAMPLE_OPPORTUNITIES = [
  {
    id: 1,
    source: 'LinkedIn',
    sourceIcon: Linkedin,
    person: 'Nguyễn Minh Anh',
    message: 'Chị ơi, em đọc bài "3 dấu hiệu sẵn sàng ra riêng" — đúng hoàn cảnh em quá. Em muốn đặt lịch tư vấn 1:1 ạ.',
    status: 'new',
    date: '2 ngày trước',
  },
  {
    id: 2,
    source: 'Facebook',
    sourceIcon: MessageSquare,
    person: 'Trần Đức Huy',
    message: 'Anh có thể tổ chức workshop cho team startup 12 người bên em được không? Dự kiến tháng tới.',
    status: 'talking',
    date: '5 ngày trước',
  },
  {
    id: 3,
    source: 'Email',
    sourceIcon: Mail,
    person: 'VietStartup Conference',
    message: 'Kính mời anh/chị làm diễn giả keynote tại hội nghị VietStartup 2026 chủ đề "Solo Expert Economy".',
    status: 'converted',
    date: '1 tuần trước',
  },
  {
    id: 4,
    source: 'Website',
    sourceIcon: Globe,
    person: 'Lê Thị Hồng',
    message: 'Đăng ký nhận buổi chẩn đoán 1:1 qua form trên website.',
    status: 'new',
    date: 'Hôm nay',
  },
];

const STATUS_MAP = {
  new: { label: 'Mới', className: 'bg-accent/10 text-accent' },
  talking: { label: 'Đang trao đổi', className: 'bg-amber-50 text-amber-700' },
  converted: { label: 'Đã chuyển đổi', className: 'bg-emerald-50 text-emerald-700' },
};

export default function Session5Opportunities({ profile, updateProfile, onBack }) {
  const [opportunities, setOpportunities] = useState(SAMPLE_OPPORTUNITIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOpp, setNewOpp] = useState({ person: '', message: '', source: 'LinkedIn' });

  const handleAdd = () => {
    if (!newOpp.person.trim()) return;
    const opp = {
      id: Date.now(),
      source: newOpp.source,
      sourceIcon: { LinkedIn: Linkedin, Facebook: MessageSquare, Email: Mail, Website: Globe }[newOpp.source] || Globe,
      person: newOpp.person,
      message: newOpp.message,
      status: 'new',
      date: 'Vừa xong',
    };
    setOpportunities([opp, ...opportunities]);
    setNewOpp({ person: '', message: '', source: 'LinkedIn' });
    setShowAddForm(false);
  };

  const totalNew = opportunities.filter(o => o.status === 'new').length;
  const totalConverted = opportunities.filter(o => o.status === 'converted').length;

  return (
    <div className="max-w-xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)] flex flex-col animate-fade-in-up">
      <p className="text-xs font-medium text-ink/40 uppercase tracking-widest mb-4">
        Theo dõi cơ hội · Bước 5/5
      </p>

      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug mb-3">
        Nội dung nào đang mở ra <span className="highlight-word">cơ hội</span> cho bạn?
      </h1>

      <p className="text-sm text-ink/50 mb-6">
        Theo dõi những cuộc trò chuyện, lời mời hợp tác và khách hàng đến từ nội dung bạn tạo ra.
      </p>

      {/* Mode & Anti-Loophole Guarantee Banner */}
      <div className="bg-white rounded-2xl border border-silver/80 p-4 mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink">
            <Award className="w-4 h-4 text-amber-500" />
            Studio Độc Lập (Single-Player Mode Active)
          </span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium border border-emerald-200">
            ✓ Trực tiếp 100% · Không trung gian
          </span>
        </div>
        <p className="text-xs text-ink/60 leading-relaxed">
          Tất cả cơ hội và khách hàng là của riêng bạn. App không thu bất kỳ khoản phí hoa hồng giao dịch nào.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-silver/80 p-4 text-center">
          <p className="font-serif text-2xl font-bold text-ink">{opportunities.length}</p>
          <p className="text-xs text-ink/40 mt-1">Tổng cơ hội</p>
        </div>
        <div className="bg-white rounded-2xl border border-silver/80 p-4 text-center">
          <p className="font-serif text-2xl font-bold text-accent">{totalNew}</p>
          <p className="text-xs text-ink/40 mt-1">Mới</p>
        </div>
        <div className="bg-white rounded-2xl border border-silver/80 p-4 text-center">
          <p className="font-serif text-2xl font-bold text-emerald-600">{totalConverted}</p>
          <p className="text-xs text-ink/40 mt-1">Chuyển đổi</p>
        </div>
      </div>

      {/* Add New Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm cơ hội mới
        </button>

        {showAddForm && (
          <div className="mt-4 bg-white rounded-2xl border border-silver/80 p-5 space-y-3 animate-fade-in">
            <input
              type="text"
              value={newOpp.person}
              onChange={(e) => setNewOpp({ ...newOpp, person: e.target.value })}
              placeholder="Tên người / tổ chức"
              className="w-full bg-cream border border-silver rounded-xl text-sm text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors"
            />
            <textarea
              value={newOpp.message}
              onChange={(e) => setNewOpp({ ...newOpp, message: e.target.value })}
              placeholder="Họ nói gì / yêu cầu gì?"
              rows={2}
              className="w-full bg-cream border border-silver rounded-xl text-sm text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors resize-none"
            />
            <div className="flex items-center gap-2">
              {['LinkedIn', 'Facebook', 'Email', 'Website'].map(src => (
                <button
                  key={src}
                  onClick={() => setNewOpp({ ...newOpp, source: src })}
                  className={`tag-pill text-xs ${newOpp.source === src ? 'active' : ''}`}
                >
                  {src}
                </button>
              ))}
            </div>
            <button
              onClick={handleAdd}
              disabled={!newOpp.person.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all disabled:opacity-30"
            >
              Lưu lại
            </button>
          </div>
        )}
      </div>

      {/* Opportunity List */}
      <div className="space-y-3 flex-1">
        {opportunities.map((opp) => {
          const Icon = opp.sourceIcon;
          const status = STATUS_MAP[opp.status];
          return (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-silver/80 p-5 transition-all hover:border-ink/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cream border border-silver/80 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-ink/50" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{opp.person}</p>
                    <p className="text-xs text-ink/40">{opp.source} · {opp.date}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${status.className}`}>
                  {status.label}
                </span>
              </div>

              <p className="text-sm text-ink/60 leading-relaxed">
                "{opp.message}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        <p className="text-xs text-ink/30 italic">Từ trải nghiệm đến cơ hội.</p>
      </div>
    </div>
  );
}
