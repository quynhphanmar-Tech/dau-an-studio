/**
 * Thư viện Hình Mẫu, Văn Phong & Phong Cách Visual (Pinterest Moodboard & Tone System)
 */

export const BRAND_ARCHETYPES = [
  {
    id: 'sage-mentor',
    name: 'The Sage & Mentor (Người Cố Vấn Tri Thức)',
    tagline: 'Sâu sắc, điềm tĩnh, lấy dữ liệu và trải nghiệm thực tế làm gốc',
    vibe: 'Editorial Luxury / Apple Minimalist',
    colors: ['#F7F7F5', '#111111', '#315CFF', '#D9DADC'],
    colorNames: 'Kem ấm, Đen mực, Xanh cố vấn, Ghi sương',
    fonts: { display: 'Playfair Display (Didone Serif)', body: 'Inter (Neo-Grotesk)' },
    pinterestTag: 'Editorial Confidence, Minimalist Studio, Warm Light Serif',
    toneDo: ['Dùng từ dứt khoát, đi thẳng vào bản chất', 'Đưa ra bằng chứng con số thực tế', 'Tông giọng thấu hiểu, điềm tĩnh'],
    toneDont: ['Không dùng từ giật gân rẻ tiền', 'Không tự tâng bốc bản thân', 'Không viết quá dài dòng không mục đích']
  },
  {
    id: 'visionary-leader',
    name: 'The Visionary Leader (Lãnh Đạo Tiên Phong)',
    tagline: 'Sắc bén, bản lĩnh, dẫn dắt xu hướng và tầm nhìn tương lai',
    vibe: 'High-Contrast Executive / Dark Mode Tech',
    colors: ['#0A0A0C', '#FFFFFF', '#FF5A47', '#315CFF'],
    colorNames: 'Đêm sâu, Trắng tinh, Cam nhiệt huyết, Xanh công nghệ',
    fonts: { display: 'Syne / Cormorant Garamond', body: 'Plus Jakarta Sans' },
    pinterestTag: 'Executive Leadership, Dark Editorial, Bold Monochrome',
    toneDo: ['Khẳng định vị thế, đưa ra góc nhìn phản biện (Contrarian)', 'Thách thức lối tư duy cũ'],
    toneDont: ['Không dùng giọng ngập ngừng', 'Không chiều theo số đông']
  },
  {
    id: 'caregiver-coach',
    name: 'The Caregiver Coach (Người Khai Vấn Ân Cần)',
    tagline: 'Ấm áp, thấu cảm, an toàn và đồng hành cùng sự tăng trưởng',
    vibe: 'Warm Organic / Soft Aesthetic',
    colors: ['#FAF6F0', '#2C2A29', '#E0A96D', '#7C9070'],
    colorNames: 'Giấy cũ, Đất nung, Vàng ấm, Xanh ô liu',
    fonts: { display: 'Cinzel / Lora', body: 'Outfit / SF Pro' },
    pinterestTag: 'Warm Coaching, Soft Minimalist, Natural Texture',
    toneDo: ['Lắng nghe và thấu hiểu nỗi đau', 'Truyền cảm hứng và sự an tâm'],
    toneDont: ['Không dùng từ ngữ phán xét', 'Không tạo áp lực tiêu cực']
  }
];

export const SOCIAL_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: 'text-[#0A66C2]' },
  { id: 'facebook', name: 'Facebook Page', icon: 'Facebook', color: 'text-[#1877F2]' },
  { id: 'tiktok', name: 'TikTok', icon: 'Video', color: 'text-[#000000]' },
  { id: 'instagram', name: 'Instagram', icon: 'Camera', color: 'text-[#E4405F]' }
];
