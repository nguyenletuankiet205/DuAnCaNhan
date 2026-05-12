import type { BlogPostDetail, CaseStudy, FaqItem, PricingPlan, Service, Testimonial } from "@/types/domain";

export const fallbackServices: Service[] = [
  {
    id: "svc-website",
    service_type: "business_website",
    slug: "thiet-ke-website-doanh-nghiep",
    title: "Thiết kế Website doanh nghiệp",
    short_description: "Website chuyên nghiệp, tải nhanh, rõ thông điệp và tối ưu chuyển đổi cho đội bán hàng.",
    description:
      "MIDIGI thiết kế website doanh nghiệp theo hành trình khách hàng, tối ưu SEO kỹ thuật, biểu mẫu lead và hệ thống đo lường để doanh nghiệp tăng độ tin cậy ngay từ lần chạm đầu tiên.",
    icon: "monitor-smartphone",
    starting_price: 18000000,
    display_order: 1
  },
  {
    id: "svc-landing",
    service_type: "conversion_landing_page",
    slug: "thiet-ke-landing-page-chuyen-doi",
    title: "Thiết kế Landing Page chuyển đổi",
    short_description: "Landing page tập trung thu lead, đặt lịch tư vấn hoặc bán sản phẩm với CTA rõ ràng.",
    description:
      "Chúng tôi kết hợp nghiên cứu khách hàng, copywriting, bố cục UI, bằng chứng tin cậy và tracking để landing page sẵn sàng tối ưu liên tục sau khi chạy traffic.",
    icon: "mouse-pointer-click",
    starting_price: 8500000,
    display_order: 2
  },
  {
    id: "svc-facebook",
    service_type: "facebook_ads",
    slug: "chay-facebook-ads",
    title: "Chạy Facebook Ads",
    short_description: "Thiết lập phễu quảng cáo Facebook phù hợp shop online, local business và thương hiệu cá nhân.",
    description:
      "Dịch vụ bao gồm nghiên cứu tệp khách hàng, xây campaign, tối ưu creative, quản lý ngân sách, theo dõi CPL và báo cáo minh bạch theo tuần.",
    icon: "facebook",
    starting_price: 12000000,
    display_order: 3
  },
  {
    id: "svc-google",
    service_type: "google_ads",
    slug: "chay-google-ads",
    title: "Chạy Google Ads",
    short_description: "Khai thác nhu cầu có sẵn từ Google Search, YouTube và mạng hiển thị.",
    description:
      "MIDIGI xây bộ từ khóa, cấu trúc tài khoản, trang đích, tracking chuyển đổi và quy trình tối ưu CPA cho doanh nghiệp cần lead chất lượng.",
    icon: "search-check",
    starting_price: 15000000,
    display_order: 4
  },
  {
    id: "svc-fanpage",
    service_type: "fanpage_setup",
    slug: "setup-fanpage-chuyen-nghiep",
    title: "Setup Fanpage chuyên nghiệp",
    short_description: "Chuẩn hóa hình ảnh, thông tin, CTA và nền tảng nội dung cho Fanpage bán hàng.",
    description:
      "Phù hợp cho doanh nghiệp mới bắt đầu hoặc cần tái định vị hình ảnh trên Facebook trước khi triển khai quảng cáo và chăm sóc cộng đồng.",
    icon: "badge-check",
    starting_price: 4500000,
    display_order: 5
  },
  {
    id: "svc-group",
    service_type: "facebook_group_setup",
    slug: "setup-facebook-group-cong-dong",
    title: "Setup Facebook Group cộng đồng",
    short_description: "Xây nền cộng đồng có quy tắc, lịch nội dung và cơ chế nuôi dưỡng thành viên.",
    description:
      "MIDIGI hỗ trợ định vị cộng đồng, cấu trúc chuyên mục, kế hoạch tăng trưởng và hệ thống chuyển đổi thành viên thành khách hàng.",
    icon: "users-round",
    starting_price: 7000000,
    display_order: 6
  },
  {
    id: "svc-personal",
    service_type: "personal_branding",
    slug: "xay-dung-thuong-hieu-ca-nhan",
    title: "Xây dựng thương hiệu cá nhân",
    short_description: "Định vị chuyên gia, xây nội dung nhất quán và tăng niềm tin với thị trường mục tiêu.",
    description:
      "Dành cho founder, chuyên gia, nhà bán hàng và creator muốn phát triển sự hiện diện chuyên nghiệp trên nhiều kênh mà vẫn giữ giọng thương hiệu riêng.",
    icon: "sparkles",
    starting_price: 16000000,
    display_order: 7
  },
  {
    id: "svc-strategy",
    service_type: "marketing_strategy",
    slug: "tu-van-chien-luoc-marketing",
    title: "Tư vấn chiến lược marketing",
    short_description: "Xây bản đồ tăng trưởng, phân bổ kênh và kế hoạch triển khai theo nguồn lực thực tế.",
    description:
      "MIDIGI phân tích thị trường, chân dung khách hàng, lợi thế cạnh tranh, phễu chuyển đổi và KPI để doanh nghiệp ra quyết định rõ ràng hơn.",
    icon: "route",
    starting_price: 22000000,
    display_order: 8
  },
  {
    id: "svc-growth",
    service_type: "growth_consulting",
    slug: "growth-consulting",
    title: "Growth consulting",
    short_description: "Đồng hành tối ưu tăng trưởng, thử nghiệm kênh và cải thiện tỷ lệ chuyển đổi.",
    description:
      "Gói tư vấn tăng trưởng dành cho startup và SME cần một đối tác chiến lược theo sát dữ liệu, sản phẩm, thị trường và doanh thu.",
    icon: "trending-up",
    starting_price: 30000000,
    display_order: 9
  }
];

export const fallbackPricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    slug: "starter",
    description: "Dành cho shop online, cá nhân kinh doanh và doanh nghiệp mới cần nền tảng marketing chỉn chu.",
    monthly_price: 9000000,
    setup_fee: 4000000,
    features: ["Audit nhanh kênh hiện tại", "01 landing page hoặc tối ưu trang chính", "Thiết lập tracking cơ bản", "02 mẫu quảng cáo khởi động", "Báo cáo hiệu suất hàng tháng"],
    is_recommended: false
  },
  {
    id: "growth",
    name: "Growth",
    slug: "growth",
    description: "Dành cho SME muốn tăng lead đều đặn, tối ưu quảng cáo và cải thiện tỷ lệ chuyển đổi.",
    monthly_price: 22000000,
    setup_fee: 8000000,
    features: ["Chiến lược marketing 90 ngày", "Quản lý Facebook Ads hoặc Google Ads", "Tối ưu landing page chuyển đổi", "Dashboard KPI theo tuần", "Tư vấn nội dung và creative"],
    is_recommended: true
  },
  {
    id: "premium",
    name: "Premium",
    slug: "premium",
    description: "Giải pháp đồng hành toàn diện cho startup, thương hiệu cá nhân và doanh nghiệp cần mở rộng đa kênh.",
    monthly_price: 48000000,
    setup_fee: 15000000,
    features: ["Chiến lược tăng trưởng đa kênh", "Quản lý quảng cáo đa nền tảng", "Website hoặc funnel nâng cao", "Báo cáo doanh thu và ROI", "Workshop hàng tháng với đội ngũ"],
    is_recommended: false
  }
];

export const fallbackFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "MIDIGI có cam kết doanh thu hoặc kết quả SEO lên top không?",
    answer:
      "MIDIGI không đưa ra cam kết tuyệt đối vì kết quả phụ thuộc vào thị trường, ngân sách, sản phẩm và năng lực vận hành. Chúng tôi cam kết quy trình minh bạch, đo lường rõ ràng và tối ưu dựa trên dữ liệu thực tế.",
    category: "pricing",
    display_order: 1
  },
  {
    id: "faq-2",
    question: "Doanh nghiệp nhỏ mới bắt đầu nên chọn dịch vụ nào?",
    answer:
      "Nếu bạn chưa có nền tảng số, hãy bắt đầu với website hoặc landing page chuyển đổi kèm tracking. Nếu đã có sẵn kênh bán hàng, gói audit marketing sẽ giúp xác định điểm nghẽn trước khi tăng ngân sách quảng cáo.",
    category: "service",
    display_order: 2
  },
  {
    id: "faq-3",
    question: "MIDIGI có nhận quản lý quảng cáo Facebook Ads và Google Ads cùng lúc không?",
    answer:
      "Có. Với các doanh nghiệp cần tăng trưởng đa kênh, chúng tôi xây cấu trúc campaign riêng cho từng nền tảng nhưng thống nhất chỉ số đo lường để đánh giá lead, chi phí và doanh thu.",
    category: "ads",
    display_order: 3
  },
  {
    id: "faq-4",
    question: "Bao lâu thì có thể thấy tín hiệu cải thiện?",
    answer:
      "Thông thường website hoặc landing page có thể đo tín hiệu trong 2 đến 4 tuần sau khi có traffic đủ lớn. Với quảng cáo, giai đoạn học và tối ưu ban đầu thường cần 7 đến 14 ngày.",
    category: "timeline",
    display_order: 4
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "tes-1",
    customer_name: "Nguyễn Thảo Vy",
    role: "Founder",
    company: "Vy Home Decor",
    avatar_url: null,
    quote:
      "MIDIGI giúp chúng tôi nhìn lại toàn bộ hành trình mua hàng, không chỉ chạy quảng cáo. Sau khi tối ưu landing page và nội dung tư vấn, đội sale xử lý lead dễ hơn rất nhiều.",
    rating: 5
  },
  {
    id: "tes-2",
    customer_name: "Trần Minh Quân",
    role: "Giám đốc kinh doanh",
    company: "An Phát Logistics",
    avatar_url: null,
    quote:
      "Điều tôi đánh giá cao là báo cáo rõ ràng, nói đúng vấn đề và có kế hoạch hành động cụ thể. Website mới mang lại hình ảnh chuyên nghiệp hơn khi gặp khách B2B.",
    rating: 5
  },
  {
    id: "tes-3",
    customer_name: "Lê Hoàng Nam",
    role: "Chủ cửa hàng",
    company: "Nam Sneaker",
    avatar_url: null,
    quote:
      "Trước đây tôi tăng ngân sách quảng cáo nhưng đơn không ổn định. MIDIGI audit lại phễu, chỉnh thông điệp và setup lại tracking nên tôi biết tiền đang hiệu quả ở đâu.",
    rating: 5
  }
];

export const fallbackCaseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Tăng trưởng lead cho thương hiệu nội thất địa phương",
    slug: "tang-truong-lead-thuong-hieu-noi-that",
    client_name: "Vy Home Decor",
    client_logo_url: "/brand/og-cover.svg",
    cover_image_url: "/brand/og-cover.svg",
    industry: "Nội thất",
    challenge: "Website cũ thiếu điểm nhấn, quảng cáo chưa đo được chất lượng lead và đội sale mất nhiều thời gian lọc khách.",
    solution: "MIDIGI xây landing page mới, thiết lập tracking chuyển đổi, tái cấu trúc Facebook Ads và tạo bộ nội dung tập trung vào nhu cầu cải tạo nhà ở.",
    result_summary: "Lead tăng 168%, doanh thu từ kênh digital tăng 82% sau 90 ngày triển khai.",
    content_html:
      "<h2>Bối cảnh</h2><p>Vy Home Decor cần tăng nguồn khách tư vấn thiết kế nội thất nhưng không muốn phụ thuộc hoàn toàn vào giới thiệu truyền miệng.</p><h2>Triển khai</h2><p>MIDIGI tối ưu thông điệp, tạo landing page chuyển đổi, thiết lập tracking và quản lý quảng cáo theo từng nhóm nhu cầu.</p><h2>Kết quả</h2><p>Sau 90 ngày, đội sale nhận được lead rõ nhu cầu hơn, chi phí trên mỗi lịch hẹn giảm và doanh thu kênh digital tăng ổn định.</p>",
    revenue_growth: 82,
    lead_growth: 168,
    conversion_rate: 12.4,
    published_at: new Date().toISOString()
  },
  {
    id: "case-2",
    title: "Chuẩn hóa website B2B cho doanh nghiệp logistics",
    slug: "chuan-hoa-website-b2b-logistics",
    client_name: "An Phát Logistics",
    client_logo_url: "/brand/og-cover.svg",
    cover_image_url: "/brand/og-cover.svg",
    industry: "Logistics",
    challenge: "Website cũ thiếu nội dung ngành, tốc độ chậm và chưa hỗ trợ tốt cho đội kinh doanh khi gửi hồ sơ năng lực.",
    solution: "MIDIGI thiết kế lại website, viết lại cấu trúc nội dung B2B, tối ưu biểu mẫu báo giá và triển khai SEO kỹ thuật nền tảng.",
    result_summary: "Tỷ lệ gửi yêu cầu báo giá tăng 64%, thời gian tải trang cải thiện rõ rệt.",
    content_html:
      "<h2>Bối cảnh</h2><p>An Phát Logistics cần một website đáng tin cậy hơn để phục vụ bán hàng B2B và tạo lead từ tìm kiếm.</p><h2>Triển khai</h2><p>Dự án tập trung vào cấu trúc dịch vụ, bằng chứng năng lực, form báo giá và tốc độ tải trang.</p><h2>Kết quả</h2><p>Website mới giúp đội kinh doanh gửi thông tin chuyên nghiệp hơn và tăng số yêu cầu báo giá từ khách hàng phù hợp.</p>",
    revenue_growth: 41,
    lead_growth: 64,
    conversion_rate: 8.7,
    published_at: new Date().toISOString()
  }
];

export const fallbackBlogPosts: BlogPostDetail[] = [
  {
    id: "blog-1",
    title: "5 dấu hiệu doanh nghiệp cần audit marketing tổng thể",
    slug: "5-dau-hieu-can-audit-marketing-tong-the",
    excerpt:
      "Nếu ngân sách tăng nhưng lead giảm, dữ liệu rời rạc và đội sale khó chốt, đã đến lúc doanh nghiệp cần audit marketing một cách có hệ thống.",
    content_html:
      "<h2>Khi nào nên audit marketing?</h2><p>Audit marketing không chỉ dành cho doanh nghiệp gặp khủng hoảng. Đây là cách nhìn lại toàn bộ hành trình khách hàng, từ thông điệp, kênh triển khai, website, quảng cáo đến quy trình xử lý lead.</p><h2>Những tín hiệu cần chú ý</h2><p>Doanh nghiệp nên audit khi chi phí lead tăng liên tục, tỷ lệ chuyển đổi giảm, dữ liệu tracking thiếu tin cậy hoặc các kênh marketing hoạt động rời rạc.</p><h2>Cách MIDIGI tiếp cận</h2><p>Chúng tôi bắt đầu từ mục tiêu kinh doanh, sau đó rà soát dữ liệu, nội dung, trang đích và vận hành nội bộ để đưa ra lộ trình ưu tiên rõ ràng.</p>",
    cover_image_url: "/brand/og-cover.svg",
    seo_title: "5 dấu hiệu doanh nghiệp cần audit marketing tổng thể",
    meta_description: "Nhận biết thời điểm cần audit marketing để tối ưu chi phí, dữ liệu và tỷ lệ chuyển đổi cho doanh nghiệp SME.",
    og_image_url: "/brand/og-cover.svg",
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { name: "Chiến lược Marketing", slug: "chien-luoc-marketing" }
  },
  {
    id: "blog-2",
    title: "Landing page chuyển đổi tốt cần những thành phần nào?",
    slug: "landing-page-chuyen-doi-can-thanh-phan-nao",
    excerpt: "Một landing page hiệu quả cần thông điệp rõ, bằng chứng tin cậy, form gọn và tracking đầy đủ để tối ưu liên tục.",
    content_html:
      "<h2>Thông điệp đầu trang phải rõ</h2><p>Khách hàng cần hiểu ngay bạn giúp họ giải quyết vấn đề gì, bằng cách nào và vì sao nên tin. Tiêu đề, mô tả và CTA đầu trang cần thống nhất với quảng cáo.</p><h2>Bằng chứng tạo niềm tin</h2><p>Logo khách hàng, kết quả dự án, đánh giá thật và quy trình làm việc giúp giảm rủi ro cảm nhận trước khi khách để lại thông tin.</p><h2>Form nên đủ ngắn để hoàn thành</h2><p>Form cần thu đủ dữ liệu cho đội sale nhưng không gây áp lực. Những trường quan trọng như số điện thoại, dịch vụ cần tư vấn và ngân sách giúp phân loại lead tốt hơn.</p>",
    cover_image_url: "/brand/og-cover.svg",
    seo_title: "Landing page chuyển đổi tốt cần những thành phần nào?",
    meta_description: "Các thành phần quan trọng giúp landing page tăng tỷ lệ chuyển đổi và tạo lead chất lượng hơn.",
    og_image_url: "/brand/og-cover.svg",
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { name: "Website & SEO", slug: "website-seo" }
  }
];
