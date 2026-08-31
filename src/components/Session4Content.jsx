import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Target, Heart, MessageCircle, Handshake, FileText, Video, LayoutGrid, Sparkles } from 'lucide-react';

const CONTENT_GOALS = [
  { id: 'awareness', icon: Target, label: 'Để đúng khách hàng biết đến tôi', color: 'text-accent' },
  { id: 'trust', icon: Heart, label: 'Tạo niềm tin với người đang theo dõi', color: 'text-coral' },
  { id: 'explain', icon: MessageCircle, label: 'Giải thích rõ giá trị dịch vụ', color: 'text-ink' },
  { id: 'connect', icon: Handshake, label: 'Mở ra một cuộc trò chuyện / hợp tác', color: 'text-accent' },
];

const FORMAT_ICONS = {
  'Bài viết': FileText,
  'Video ngắn': Video,
  'Carousel': LayoutGrid,
};

// Content ideas per goal (simulated AI output)
const CONTENT_IDEAS = {
  awareness: [
    { title: 'Sai lầm #1 khi chuyển sang làm tự do', why: 'Chạm vào nỗi sợ phổ biến nhất, dễ thu hút người cùng hoàn cảnh', audience: 'Chuyên gia 30-45 tuổi đang cân nhắc nghỉ việc', result: 'Tăng nhận diện với đúng tệp khách hàng mục tiêu', format: 'Bài viết' },
    { title: '3 dấu hiệu bạn đã sẵn sàng ra riêng', why: 'Giúp người đọc tự đánh giá, tạo kết nối cá nhân', audience: 'Người đang bế tắc trong công việc hiện tại', result: 'Thu hút tin nhắn hỏi thăm về dịch vụ', format: 'Carousel' },
    { title: 'Câu chuyện: Ngày đầu tiên tôi không còn nhận lương', why: 'Câu chuyện cá nhân tạo sự đồng cảm mạnh mẽ', audience: 'Bất kỳ ai quan tâm đến tự do tài chính', result: 'Xây dựng hình ảnh chuyên gia đáng tin cậy', format: 'Video ngắn' },
  ],
  trust: [
    { title: 'Hậu trường một buổi tư vấn 1:1 của tôi', why: 'Cho thấy quy trình làm việc thật, tạo niềm tin', audience: 'Người đang theo dõi nhưng chưa quyết định', result: 'Chuyển đổi người theo dõi thành khách hàng tiềm năng', format: 'Video ngắn' },
    { title: 'Kết quả sau 90 ngày đồng hành cùng khách hàng X', why: 'Bằng chứng thực tế tạo uy tín, không cần quảng cáo', audience: 'Người đã biết đến bạn nhưng cần thêm bằng chứng', result: 'Tăng tỷ lệ đặt lịch tư vấn', format: 'Carousel' },
    { title: 'Điều tôi ước mình biết sớm hơn 10 năm trước', why: 'Thể hiện chiều sâu kinh nghiệm, tạo giá trị miễn phí', audience: 'Người mới bắt đầu trong lĩnh vực', result: 'Xây dựng vị thế mentor đáng tin cậy', format: 'Bài viết' },
  ],
  explain: [
    { title: 'Tại sao buổi chẩn đoán 1:1 không phải "tư vấn miễn phí"', why: 'Giải thích giá trị rõ ràng, loại bỏ hiểu nhầm', audience: 'Người đang cân nhắc đặt lịch', result: 'Tăng nhận thức về giá trị dịch vụ, giảm từ chối', format: 'Bài viết' },
    { title: '5 bước trong quy trình đồng hành của tôi', why: 'Minh bạch quy trình tạo niềm tin', audience: 'Khách hàng tiềm năng đang so sánh lựa chọn', result: 'Giúp khách hàng ra quyết định nhanh hơn', format: 'Carousel' },
    { title: 'Ai phù hợp (và ai KHÔNG phù hợp) làm việc với tôi', why: 'Bộ lọc rõ ràng tạo cảm giác chuyên nghiệp', audience: 'Tất cả người theo dõi', result: 'Thu hút đúng người, tiết kiệm thời gian cho cả hai bên', format: 'Video ngắn' },
  ],
  connect: [
    { title: 'Tôi đang tìm 3 chuyên gia để hợp tác trong dự án này', why: 'Trực tiếp mở cửa, thu hút phản hồi ngay', audience: 'Chuyên gia cùng lĩnh vực hoặc bổ trợ', result: 'Mở ra cơ hội hợp tác và mở rộng mạng lưới', format: 'Bài viết' },
    { title: 'AMA: Hỏi tôi bất cứ điều gì về [lĩnh vực]', why: 'Tạo tương tác hai chiều, hiểu rõ nhu cầu thị trường', audience: 'Tất cả người theo dõi', result: 'Thu thập câu hỏi thực tế để tạo nội dung tiếp theo', format: 'Video ngắn' },
    { title: 'Bài học từ cuộc gặp với [người ấn tượng nhất năm nay]', why: 'Kết nối cộng đồng, thể hiện mạng lưới chất lượng', audience: 'Người quan tâm đến tăng trưởng cá nhân', result: 'Xây dựng hình ảnh người kết nối đáng giá', format: 'Carousel' },
  ],
};

export default function Session4Content({ profile, updateProfile, onNext, onBack }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showIdeas, setShowIdeas] = useState(false);

  const ideas = selectedGoal ? CONTENT_IDEAS[selectedGoal] : [];

  const handleSelectGoal = (goalId) => {
    setSelectedGoal(goalId);
    setSelectedIdea(null);
    // Simulate AI thinking
    setShowIdeas(false);
    setTimeout(() => setShowIdeas(true), 800);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 min-h-[calc(100vh-80px)] flex flex-col justify-between animate-fade-in-up">
      <div className="flex-1">
        <p className="text-xs font-medium text-ink/40 uppercase tracking-widest mb-6">
          Biến thành nội dung · Bước 4/5
        </p>

        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-snug mb-3">
          Tuần này bạn muốn <span className="highlight-word">nội dung</span> giúp mình điều gì?
        </h1>

        <p className="text-sm text-ink/50 mb-8">
          Chọn một mục tiêu, tôi sẽ gợi ý ý tưởng phù hợp với thương hiệu của bạn.
        </p>

        {/* Content Goal Cards */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          {CONTENT_GOALS.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                  isSelected
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-white border-silver/80 hover:border-ink/30'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isSelected ? 'text-cream' : goal.color}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-cream' : 'text-ink'}`}>{goal.label}</span>
              </button>
            );
          })}
        </div>

        {/* AI Content Ideas */}
        {selectedGoal && (
          <div className="space-y-4">
            {!showIdeas ? (
              <div className="flex items-center gap-3 text-ink/50 animate-pulse py-4">
                <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                <span className="text-sm">Đang tạo ý tưởng phù hợp với thương hiệu của bạn...</span>
              </div>
            ) : (
              <>
                <p className="text-xs font-medium text-ink/40 uppercase tracking-widest">
                  3 ý tưởng gợi ý
                </p>

                {ideas.map((idea, i) => {
                  const FormatIcon = FORMAT_ICONS[idea.format] || FileText;
                  const isSelected = selectedIdea === i;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedIdea(i)}
                      className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all animate-fade-in ${
                        isSelected ? 'border-ink ring-1 ring-ink/10' : 'border-silver/80 hover:border-ink/30'
                      }`}
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      <h3 className="font-serif text-base font-semibold text-ink mb-3">"{idea.title}"</h3>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-ink/40 shrink-0 w-28">Vì sao hợp với bạn</span>
                          <span className="text-ink/70">{idea.why}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-ink/40 shrink-0 w-28">Dành cho ai</span>
                          <span className="text-ink/70">{idea.audience}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <span className="text-ink/40 shrink-0 w-28">Kết quả mong đợi</span>
                          <span className="text-ink/70">{idea.result}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-silver/50">
                        <div className="flex items-center gap-1.5 text-xs text-ink/50">
                          <FormatIcon className="w-3.5 h-3.5" />
                          <span>{idea.format}</span>
                        </div>

                        {isSelected && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateProfile({
                                contentGoal: CONTENT_GOALS.find(g => g.id === selectedGoal)?.label,
                                contentIdeas: [...(profile.contentIdeas || []), idea],
                              });
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ink text-cream text-xs font-semibold hover:bg-ink/90 transition-all active:scale-95"
                          >
                            <Sparkles className="w-3 h-3" />
                            Tạo nội dung này
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
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

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-ink/90 transition-all active:scale-95"
        >
          Theo dõi cơ hội
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
