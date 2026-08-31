import React, { useState } from 'react';
import { ArrowLeft, Plus, MessageSquare, Mail, Linkedin, Globe, X, TrendingUp, ShieldCheck, Sparkles, Award, ChevronRight, DollarSign, Calendar, Clock, Send, CheckCircle2, UserCheck, MessageCircle, FileText } from 'lucide-react';

const SAMPLE_OPPORTUNITIES = [
  {
    id: 1,
    source: 'LinkedIn',
    sourceIcon: Linkedin,
    person: 'Nguyễn Minh Anh',
    role: 'Co-founder @ FinTech Startup',
    message: 'Chị ơi, em đọc bài "3 dấu hiệu sẵn sàng ra riêng" — đúng hoàn cảnh em quá. Em muốn đặt lịch tư vấn 1:1 ạ.',
    status: 'new',
    stage: 'Chưa liên hệ',
    date: '2 ngày trước',
    value: '1.500.000đ',
    notes: 'Đang chuẩn bị nghỉ việc ngân hàng sau 8 năm. Cần xây quỹ sinh tồn.',
    timeline: [
      { date: '2 ngày trước', text: 'Nhắn tin qua LinkedIn Inbox sau khi đọc bài viết Carousel 5-Slide' }
    ]
  },
  {
    id: 2,
    source: 'Facebook',
    sourceIcon: MessageSquare,
    person: 'Trần Đức Huy',
    role: 'Managing Director @ EduTech',
    message: 'Anh có thể tổ chức workshop cho team startup 12 người bên em được không? Dự kiến tháng tới.',
    status: 'talking',
    stage: 'Đã gửi báo giá',
    date: '5 ngày trước',
    value: '15.000.000đ',
    notes: 'Muốn đào tạo tư duy tư vấn cho đội ngũ Account Lead.',
    timeline: [
      { date: '5 ngày trước', text: 'Gửi lời mời hợp tác qua Facebook Messenger' },
      { date: '3 ngày trước', text: 'Đã gửi đề xuất Buổi Workshop 3 giờ' }
    ]
  },
  {
    id: 3,
    source: 'Email',
    sourceIcon: Mail,
    person: 'VietStartup Conference',
    role: 'Ban Tổ Chức Sự Kiện',
    message: 'Kính mời anh/chị làm diễn giả keynote tại hội nghị VietStartup 2026 chủ đề "Solo Expert Economy".',
    status: 'converted',
    stage: 'Đã chốt hợp đồng',
    date: '1 tuần trước',
    value: '20.000.000đ',
    notes: 'Sự kiện 300 tham dự tại TP.HCM ngày 25 tháng sau.',
    timeline: [
      { date: '1 tuần trước', text: 'Nhận thư mời làm diễn giả chính' },
      { date: '4 ngày trước', text: 'Xác nhận chủ đề & Ký xác nhận tham dự' }
    ]
  },
  {
    id: 4,
    source: 'Website',
    sourceIcon: Globe,
    person: 'Lê Thị Hồng',
    role: 'Project Manager @ B2B Agency',
    message: 'Đăng ký nhận buổi chẩn đoán 1:1 qua form trên website.',
    status: 'new',
    stage: 'Chưa liên hệ',
    date: 'Hôm nay',
    value: '1.500.000đ',
    notes: 'Quan tâm đến chương trình Mentoring 90 ngày.',
    timeline: [
      { date: 'Hôm nay', text: 'Điền form đăng ký trên landing page cá nhân' }
    ]
  },
];

const STATUS_MAP = {
  new: { label: 'Mới nhận', className: 'bg-accent/10 text-accent border border-accent/20' },
  talking: { label: 'Đang trao đổi', className: 'bg-amber-50 text-amber-800 border border-amber-200' },
  converted: { label: 'Đã chuyển đổi', className: 'bg-emerald-50 text-emerald-800 border border-emerald-200' },
};

export default function Session5Opportunities({ profile, updateProfile, onBack }) {
  const [opportunities, setOpportunities] = useState(SAMPLE_OPPORTUNITIES);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOpp, setNewOpp] = useState({ person: '', role: '', message: '', value: '1.500.000đ', source: 'LinkedIn' });
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  const handleAdd = () => {
    if (!newOpp.person.trim()) return;
    const opp = {
      id: Date.now(),
      source: newOpp.source,
      sourceIcon: { LinkedIn: Linkedin, Facebook: MessageSquare, Email: Mail, Website: Globe }[newOpp.source] || Globe,
      person: newOpp.person,
      role: newOpp.role || 'Khách hàng tiềm năng',
      message: newOpp.message,
      status: 'new',
      stage: 'Chưa liên hệ',
      date: 'Vừa xong',
      value: newOpp.value || '1.500.000đ',
      notes: 'Được ghi nhận từ Studio',
      timeline: [{ date: 'Vừa xong', text: 'Thêm mới vào quản lý cơ hội' }]
    };
    setOpportunities([opp, ...opportunities]);
    setNewOpp({ person: '', role: '', message: '', value: '1.500.000đ', source: 'LinkedIn' });
    setShowAddForm(false);
  };

  const handleGenerateReply = (opp) => {
    setIsGeneratingResponse(true);
    setTimeout(() => {
      setIsGeneratingResponse(false);
      setGeneratedResponse(
        `Chào ${opp.person.split(' ')[0] || opp.person},\n\nCảm ơn bạn đã quan tâm. Đúng như bạn chia sẻ, thách thức lớn nhất khi chuyển sang làm tự do là việc xây dựng định vị và dòng tiền ổn định.\n\nTôi có thể xếp lịch cho bạn một Buổi Chẩn Đoán 1:1 (60 phút) để cùng rà soát 3 điểm nghẽn của bạn. Bạn tiện lịch vào chiều thứ Ba hay sáng thứ Năm tuần này?`
      );
    }, 1000);
  };

  const totalNew = opportunities.filter(o => o.status === 'new').length;
  const totalConverted = opportunities.filter(o => o.status === 'converted').length;
  const totalPipelineValue = opportunities.reduce((acc, curr) => {
    const val = parseInt(curr.value.replace(/[^0-9]/g, '')) || 0;
    return acc + val;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-ink/40 uppercase tracking-widest">
            Theo dõi cơ hội · Bước 5/5
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              Tổng Giá Trị Cơ Hội: {(totalPipelineValue / 1000000).toFixed(1)} triệu VNĐ
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug">
          Nội dung nào đang mở ra <span className="highlight-word">cơ hội</span> cho bạn?
        </h1>

        {/* Studio Guarantee Banner */}
        <div className="bg-white rounded-2xl border border-silver/80 p-4 space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink">
              <Award className="w-4 h-4 text-amber-500" />
              Single-Player Studio CRM (Độc Lập 100%)
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium border border-emerald-200">
              ✓ Không hoa hồng trung gian
            </span>
          </div>
          <p className="text-xs text-ink/60 leading-relaxed">
            Mọi thông tin liên hệ và cuộc trò chuyện là tài sản riêng của bạn. Dấu Ấn Studio giúp bạn phản hồi chuẩn vị thế chuyên gia.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-silver/80 p-4 text-center">
            <p className="font-serif text-2xl font-bold text-ink">{opportunities.length}</p>
            <p className="text-xs text-ink/40 mt-0.5">Tổng cuộc hội thoại</p>
          </div>
          <div className="bg-white rounded-2xl border border-silver/80 p-4 text-center">
            <p className="font-serif text-2xl font-bold text-accent">{totalNew}</p>
            <p className="text-xs text-ink/40 mt-0.5">Chưa phản hồi</p>
          </div>
          <div className="bg-white rounded-2xl border border-silver/80 p-4 text-center">
            <p className="font-serif text-2xl font-bold text-emerald-600">{totalConverted}</p>
            <p className="text-xs text-ink/40 mt-0.5">Đã chốt hợp đồng</p>
          </div>
        </div>

        {/* Add Opportunity Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-accent transition-colors bg-white px-4 py-2 rounded-full border border-silver/80 shadow-sm"
          >
            <Plus className="w-4 h-4 text-accent" />
            Ghi nhận cơ hội mới
          </button>
        </div>

        {/* Add Opportunity Inline Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-silver/80 p-5 space-y-3 animate-fade-in shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newOpp.person}
                onChange={(e) => setNewOpp({ ...newOpp, person: e.target.value })}
                placeholder="Tên người / Khách hàng"
                className="bg-cream border border-silver rounded-xl text-xs text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors"
              />
              <input
                type="text"
                value={newOpp.role}
                onChange={(e) => setNewOpp({ ...newOpp, role: e.target.value })}
                placeholder="Vị trí / Công ty (VD: CEO @ Startup)"
                className="bg-cream border border-silver rounded-xl text-xs text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors"
              />
            </div>

            <textarea
              value={newOpp.message}
              onChange={(e) => setNewOpp({ ...newOpp, message: e.target.value })}
              placeholder="Họ đã nhắn tin hay nói gì với bạn?"
              rows={2}
              className="w-full bg-cream border border-silver rounded-xl text-xs text-ink p-3 placeholder:text-silver focus:border-ink/30 transition-colors resize-none"
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                {['LinkedIn', 'Facebook', 'Email', 'Website'].map(src => (
                  <button
                    key={src}
                    onClick={() => setNewOpp({ ...newOpp, source: src })}
                    className={`tag-pill text-[11px] ${newOpp.source === src ? 'active' : ''}`}
                  >
                    {src}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAdd}
                disabled={!newOpp.person.trim()}
                className="px-5 py-2 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all disabled:opacity-30"
              >
                Lưu vào hệ thống
              </button>
            </div>
          </div>
        )}

        {/* Main Opportunity Pipeline List */}
        <div className="space-y-3">
          {opportunities.map((opp) => {
            const Icon = opp.sourceIcon;
            const status = STATUS_MAP[opp.status];
            const isSelected = selectedOpp?.id === opp.id;

            return (
              <div
                key={opp.id}
                onClick={() => { setSelectedOpp(opp); setGeneratedResponse(''); }}
                className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all ${
                  isSelected ? 'border-ink ring-1 ring-ink/10 shadow-md' : 'border-silver/80 hover:border-ink/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cream border border-silver/80 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-ink/60" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-ink">{opp.person}</p>
                        <span className="text-[10px] text-ink/40">({opp.role})</span>
                      </div>
                      <p className="text-xs text-ink/40">{opp.source} · {opp.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${status.className}`}>
                      {status.label}
                    </span>
                    <p className="text-xs font-bold text-ink mt-1">{opp.value}</p>
                  </div>
                </div>

                <p className="text-xs text-ink/70 leading-relaxed bg-cream/50 p-3 rounded-xl border border-silver/40">
                  "{opp.message}"
                </p>

                {/* Expanded Detail View */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-silver/60 space-y-3 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink/40 font-medium">Giai đoạn: <strong className="text-ink">{opp.stage}</strong></span>
                      <span className="text-ink/40 font-medium">Ghi chú: <strong className="text-ink">{opp.notes}</strong></span>
                    </div>

                    {/* AI Response Assistant Generator */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          Trợ Lý AI Gợi Ý Mẫu Phản Hồi Chuẩn Vị Thế
                        </span>
                        <button
                          onClick={() => handleGenerateReply(opp)}
                          disabled={isGeneratingResponse}
                          className="px-3 py-1 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all flex items-center gap-1"
                        >
                          {isGeneratingResponse ? 'Đang soạn...' : 'Soạn phản hồi'}
                        </button>
                      </div>

                      {generatedResponse && (
                        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-ink/80 space-y-2 animate-fade-in">
                          <p className="whitespace-pre-line leading-relaxed font-sans">{generatedResponse}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generatedResponse);
                              alert("Đã sao chép tin nhắn phản hồi!");
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline pt-1"
                          >
                            Sao chép tin nhắn này
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
