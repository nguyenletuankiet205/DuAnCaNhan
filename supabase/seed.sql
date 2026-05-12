insert into public.services (service_type, slug, title, short_description, description, icon, starting_price, display_order)
values
  ('business_website', 'thiet-ke-website-doanh-nghiep', 'Thiết kế Website doanh nghiệp', 'Xây dựng website chuyên nghiệp, tốc độ tốt, rõ hành trình chuyển đổi và dễ quản trị.', 'MIDIGI thiết kế website doanh nghiệp với cấu trúc nội dung thuyết phục, tối ưu SEO kỹ thuật, biểu mẫu chuyển đổi và hệ thống đo lường đầy đủ để đội ngũ bán hàng khai thác lead hiệu quả.', 'monitor-smartphone', 18000000, 1),
  ('conversion_landing_page', 'thiet-ke-landing-page-chuyen-doi', 'Thiết kế Landing Page chuyển đổi', 'Landing page tập trung vào một mục tiêu: thu lead, đặt lịch hoặc bán sản phẩm.', 'Chúng tôi kết hợp nghiên cứu khách hàng, copywriting, bố cục UI và tracking để tạo landing page có khả năng thử nghiệm A/B và tối ưu liên tục.', 'mouse-pointer-click', 8500000, 2),
  ('facebook_ads', 'chay-facebook-ads', 'Chạy Facebook Ads', 'Thiết lập phễu quảng cáo Facebook phù hợp cho shop online, local business và thương hiệu cá nhân.', 'Dịch vụ bao gồm nghiên cứu tệp khách hàng, xây campaign, quản lý ngân sách, tối ưu creative, theo dõi CPL và báo cáo minh bạch theo tuần.', 'facebook', 12000000, 3),
  ('google_ads', 'chay-google-ads', 'Chạy Google Ads', 'Khai thác nhu cầu có sẵn từ tìm kiếm Google, YouTube và mạng hiển thị.', 'MIDIGI xây bộ từ khóa, cấu trúc tài khoản, trang đích, tracking chuyển đổi và quy trình tối ưu CPA cho doanh nghiệp cần lead chất lượng.', 'search-check', 15000000, 4),
  ('fanpage_setup', 'setup-fanpage-chuyen-nghiep', 'Setup Fanpage chuyên nghiệp', 'Chuẩn hóa hình ảnh, thông tin, CTA và nền tảng nội dung cho Fanpage bán hàng.', 'Phù hợp cho doanh nghiệp mới bắt đầu hoặc cần tái định vị hình ảnh trên Facebook trước khi chạy quảng cáo.', 'badge-check', 4500000, 5),
  ('facebook_group_setup', 'setup-facebook-group-cong-dong', 'Setup Facebook Group cộng đồng', 'Xây nền cộng đồng có quy tắc, lịch nội dung và cơ chế nuôi dưỡng thành viên.', 'MIDIGI hỗ trợ định vị cộng đồng, cấu trúc chuyên mục, kế hoạch tăng trưởng và hệ thống chuyển đổi từ thành viên sang khách hàng.', 'users-round', 7000000, 6),
  ('personal_branding', 'xay-dung-thuong-hieu-ca-nhan', 'Xây dựng thương hiệu cá nhân', 'Định vị chuyên gia, xây nội dung nhất quán và tăng niềm tin với thị trường mục tiêu.', 'Dịch vụ dành cho founder, chuyên gia, nhà bán hàng và creator muốn phát triển sự hiện diện chuyên nghiệp trên đa kênh.', 'sparkles', 16000000, 7),
  ('marketing_strategy', 'tu-van-chien-luoc-marketing', 'Tư vấn chiến lược marketing', 'Xây bản đồ tăng trưởng, phân bổ kênh và kế hoạch triển khai theo nguồn lực thực tế.', 'MIDIGI phân tích thị trường, chân dung khách hàng, lợi thế cạnh tranh, phễu chuyển đổi và KPI để doanh nghiệp ra quyết định rõ ràng hơn.', 'route', 22000000, 8),
  ('growth_consulting', 'growth-consulting', 'Growth consulting', 'Đồng hành tối ưu tăng trưởng, thử nghiệm kênh và cải thiện tỷ lệ chuyển đổi.', 'Gói tư vấn tăng trưởng dành cho startup và SME cần một đối tác chiến lược theo sát dữ liệu, sản phẩm, thị trường và doanh thu.', 'trending-up', 30000000, 9)
on conflict (service_type) do update
set slug = excluded.slug,
    title = excluded.title,
    short_description = excluded.short_description,
    description = excluded.description,
    icon = excluded.icon,
    starting_price = excluded.starting_price,
    display_order = excluded.display_order;

update public.services
set is_active = false
where service_type = 'marketing_audit';

insert into public.pricing_plans (name, slug, description, monthly_price, setup_fee, features, is_recommended, display_order)
values
  ('Starter', 'starter', 'Phù hợp cho shop online, cá nhân kinh doanh và doanh nghiệp mới cần nền tảng marketing chỉn chu.', 9000000, 4000000, '["Audit nhanh kênh hiện tại","01 landing page hoặc tối ưu trang chính","Thiết lập tracking cơ bản","02 mẫu quảng cáo khởi động","Báo cáo hiệu suất hàng tháng"]', false, 1),
  ('Growth', 'growth', 'Dành cho SME muốn tăng lead đều đặn, tối ưu quảng cáo và cải thiện tỷ lệ chuyển đổi.', 22000000, 8000000, '["Chiến lược marketing 90 ngày","Quản lý Facebook Ads hoặc Google Ads","Tối ưu landing page chuyển đổi","Dashboard KPI theo tuần","Tư vấn nội dung và creative"]', true, 2),
  ('Premium', 'premium', 'Giải pháp đồng hành toàn diện cho startup, thương hiệu cá nhân và doanh nghiệp cần mở rộng đa kênh.', 48000000, 15000000, '["Chiến lược tăng trưởng đa kênh","Quản lý quảng cáo đa nền tảng","Website hoặc funnel nâng cao","Báo cáo doanh thu và ROI","Workshop hàng tháng với đội ngũ"]', false, 3)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    monthly_price = excluded.monthly_price,
    setup_fee = excluded.setup_fee,
    features = excluded.features,
    is_recommended = excluded.is_recommended,
    display_order = excluded.display_order;

insert into public.faq_items (question, answer, category, display_order)
values
  ('MIDIGI có cam kết doanh thu hoặc kết quả SEO lên top không?', 'MIDIGI không đưa ra cam kết tuyệt đối vì kết quả phụ thuộc vào thị trường, ngân sách, sản phẩm và năng lực vận hành. Chúng tôi cam kết quy trình minh bạch, đo lường rõ ràng và tối ưu dựa trên dữ liệu thực tế.', 'pricing', 1),
  ('Doanh nghiệp nhỏ mới bắt đầu nên chọn dịch vụ nào?', 'Nếu bạn chưa có nền tảng số, hãy bắt đầu với website hoặc landing page chuyển đổi kèm tracking. Nếu đã có sẵn kênh bán hàng, gói audit marketing sẽ giúp xác định điểm nghẽn trước khi tăng ngân sách quảng cáo.', 'service', 2),
  ('MIDIGI có nhận quản lý quảng cáo Facebook Ads và Google Ads cùng lúc không?', 'Có. Với các doanh nghiệp cần tăng trưởng đa kênh, chúng tôi xây cấu trúc campaign riêng cho từng nền tảng nhưng thống nhất chỉ số đo lường để đánh giá lead, chi phí và doanh thu.', 'ads', 3),
  ('Bao lâu thì có thể thấy tín hiệu cải thiện?', 'Thông thường website hoặc landing page có thể đo tín hiệu trong 2 đến 4 tuần sau khi có traffic đủ lớn. Với quảng cáo, giai đoạn học và tối ưu ban đầu thường cần 7 đến 14 ngày.', 'timeline', 4),
  ('Tôi đã có đội marketing nội bộ, MIDIGI có thể hỗ trợ theo vai trò tư vấn không?', 'Có. MIDIGI có thể làm đối tác tư vấn chiến lược, audit định kỳ, đào tạo đội ngũ và hỗ trợ các hạng mục chuyên sâu như tracking, funnel, creative hoặc tối ưu chuyển đổi.', 'consulting', 5)
on conflict do nothing;

insert into public.testimonials (customer_name, role, company, quote, rating, display_order)
values
  ('Nguyễn Thảo Vy', 'Founder', 'Vy Home Decor', 'MIDIGI giúp chúng tôi nhìn lại toàn bộ hành trình mua hàng, không chỉ chạy quảng cáo. Sau khi tối ưu landing page và nội dung tư vấn, đội sale xử lý lead dễ hơn rất nhiều.', 5, 1),
  ('Trần Minh Quân', 'Giám đốc kinh doanh', 'An Phát Logistics', 'Điều tôi đánh giá cao là báo cáo rõ ràng, nói đúng vấn đề và có kế hoạch hành động cụ thể. Website mới mang lại hình ảnh chuyên nghiệp hơn khi gặp khách B2B.', 5, 2),
  ('Lê Hoàng Nam', 'Chủ cửa hàng', 'Nam Sneaker', 'Trước đây tôi tăng ngân sách quảng cáo nhưng đơn không ổn định. MIDIGI audit lại phễu, chỉnh thông điệp và setup lại tracking nên tôi biết tiền đang hiệu quả ở đâu.', 5, 3),
  ('Phạm Hồng Anh', 'Chuyên gia đào tạo', 'Hồng Anh Academy', 'Dự án thương hiệu cá nhân được triển khai rất bài bản, từ định vị, lịch nội dung đến trang đăng ký tư vấn. Mọi thứ đúng giọng thương hiệu và dễ vận hành.', 5, 4)
on conflict do nothing;

insert into public.blog_categories (name, slug, description)
values
  ('Chiến lược Marketing', 'chien-luoc-marketing', 'Góc nhìn chiến lược, phễu tăng trưởng và vận hành marketing cho SME.'),
  ('Quảng cáo chuyển đổi', 'quang-cao-chuyen-doi', 'Kinh nghiệm tối ưu Facebook Ads, Google Ads và đo lường hiệu suất.'),
  ('Website & SEO', 'website-seo', 'Kiến thức về website, landing page, SEO kỹ thuật và nội dung.')
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description;

insert into public.blog_tags (name, slug)
values
  ('SME', 'sme'),
  ('Landing Page', 'landing-page'),
  ('Facebook Ads', 'facebook-ads'),
  ('Google Ads', 'google-ads'),
  ('Tối ưu chuyển đổi', 'toi-uu-chuyen-doi')
on conflict (slug) do update set name = excluded.name;

with category as (
  select id from public.blog_categories where slug = 'chien-luoc-marketing'
)
insert into public.blog_posts (category_id, title, slug, excerpt, content_html, cover_image_url, seo_title, meta_description, og_image_url, status, published_at)
select
  category.id,
  '5 dấu hiệu doanh nghiệp cần audit marketing tổng thể',
  '5-dau-hieu-can-audit-marketing-tong-the',
  'Nếu ngân sách tăng nhưng lead giảm, dữ liệu rời rạc và đội sale khó chốt, đã đến lúc doanh nghiệp cần audit marketing một cách có hệ thống.',
  '<h2>Khi nào nên audit marketing?</h2><p>Audit marketing không chỉ dành cho doanh nghiệp gặp khủng hoảng. Đây là cách nhìn lại toàn bộ hành trình khách hàng, từ thông điệp, kênh triển khai, website, quảng cáo đến quy trình xử lý lead.</p><h2>Những tín hiệu cần chú ý</h2><p>Doanh nghiệp nên audit khi chi phí lead tăng liên tục, tỷ lệ chuyển đổi giảm, dữ liệu tracking thiếu tin cậy hoặc các kênh marketing hoạt động rời rạc. Một bản audit tốt sẽ chỉ ra điểm nghẽn có tác động lớn nhất đến doanh thu.</p><h2>Cách MIDIGI tiếp cận</h2><p>Chúng tôi bắt đầu từ mục tiêu kinh doanh, sau đó rà soát dữ liệu, nội dung, trang đích và vận hành nội bộ để đưa ra lộ trình ưu tiên rõ ràng.</p>',
  '/brand/og-cover.svg',
  '5 dấu hiệu doanh nghiệp cần audit marketing tổng thể',
  'Nhận biết thời điểm cần audit marketing để tối ưu chi phí, dữ liệu và tỷ lệ chuyển đổi cho doanh nghiệp SME.',
  '/brand/og-cover.svg',
  'published',
  now() - interval '12 days'
from category
on conflict (slug) do update
set excerpt = excluded.excerpt,
    content_html = excluded.content_html,
    status = excluded.status,
    published_at = excluded.published_at;

with category as (
  select id from public.blog_categories where slug = 'website-seo'
)
insert into public.blog_posts (category_id, title, slug, excerpt, content_html, cover_image_url, seo_title, meta_description, og_image_url, status, published_at)
select
  category.id,
  'Landing page chuyển đổi tốt cần những thành phần nào?',
  'landing-page-chuyen-doi-can-thanh-phan-nao',
  'Một landing page hiệu quả cần thông điệp rõ, bằng chứng tin cậy, form gọn và tracking đầy đủ để tối ưu liên tục.',
  '<h2>Thông điệp đầu trang phải rõ</h2><p>Khách hàng cần hiểu ngay bạn giúp họ giải quyết vấn đề gì, bằng cách nào và vì sao nên tin. Tiêu đề, mô tả và CTA đầu trang cần thống nhất với quảng cáo.</p><h2>Bằng chứng tạo niềm tin</h2><p>Logo khách hàng, kết quả dự án, đánh giá thật và quy trình làm việc giúp giảm rủi ro cảm nhận trước khi khách để lại thông tin.</p><h2>Form nên đủ ngắn để hoàn thành</h2><p>Form cần thu đủ dữ liệu cho đội sale nhưng không gây áp lực. Những trường quan trọng như số điện thoại, dịch vụ cần tư vấn và ngân sách giúp phân loại lead tốt hơn.</p>',
  '/brand/og-cover.svg',
  'Landing page chuyển đổi tốt cần những thành phần nào?',
  'Các thành phần quan trọng giúp landing page tăng tỷ lệ chuyển đổi và tạo lead chất lượng hơn.',
  '/brand/og-cover.svg',
  'published',
  now() - interval '7 days'
from category
on conflict (slug) do update
set excerpt = excluded.excerpt,
    content_html = excluded.content_html,
    status = excluded.status,
    published_at = excluded.published_at;

insert into public.case_studies (title, slug, client_name, client_logo_url, cover_image_url, industry, challenge, solution, result_summary, content_html, revenue_growth, lead_growth, conversion_rate, status, published_at)
values
  ('Tăng trưởng lead cho thương hiệu nội thất địa phương', 'tang-truong-lead-thuong-hieu-noi-that', 'Vy Home Decor', '/brand/og-cover.svg', '/brand/og-cover.svg', 'Nội thất', 'Doanh nghiệp có sản phẩm tốt nhưng website cũ thiếu điểm nhấn, quảng cáo chưa đo được chất lượng lead và đội sale mất nhiều thời gian lọc khách.', 'MIDIGI xây landing page mới, thiết lập tracking chuyển đổi, tái cấu trúc Facebook Ads và tạo bộ nội dung tập trung vào nhu cầu cải tạo nhà ở.', 'Lead tăng 168%, doanh thu từ kênh digital tăng 82% sau 90 ngày triển khai.', '<h2>Bối cảnh</h2><p>Vy Home Decor cần tăng nguồn khách tư vấn thiết kế nội thất nhưng không muốn phụ thuộc hoàn toàn vào giới thiệu truyền miệng.</p><h2>Triển khai</h2><p>MIDIGI tối ưu thông điệp, tạo landing page chuyển đổi, thiết lập tracking và quản lý quảng cáo theo từng nhóm nhu cầu.</p><h2>Kết quả</h2><p>Sau 90 ngày, đội sale nhận được lead rõ nhu cầu hơn, chi phí trên mỗi lịch hẹn giảm và doanh thu kênh digital tăng ổn định.</p>', 82, 168, 12.4, 'published', now() - interval '20 days'),
  ('Chuẩn hóa website B2B cho doanh nghiệp logistics', 'chuan-hoa-website-b2b-logistics', 'An Phát Logistics', '/brand/og-cover.svg', '/brand/og-cover.svg', 'Logistics', 'Website cũ thiếu nội dung ngành, tốc độ chậm và không hỗ trợ tốt cho đội kinh doanh khi gửi hồ sơ năng lực.', 'MIDIGI thiết kế lại website, viết lại cấu trúc nội dung B2B, tối ưu biểu mẫu báo giá và triển khai SEO kỹ thuật nền tảng.', 'Tỷ lệ gửi yêu cầu báo giá tăng 64%, thời gian tải trang cải thiện rõ rệt.', '<h2>Bối cảnh</h2><p>An Phát Logistics cần một website đáng tin cậy hơn để phục vụ bán hàng B2B và tạo lead từ tìm kiếm.</p><h2>Triển khai</h2><p>Dự án tập trung vào cấu trúc dịch vụ, bằng chứng năng lực, form báo giá và tốc độ tải trang.</p><h2>Kết quả</h2><p>Website mới giúp đội kinh doanh gửi thông tin chuyên nghiệp hơn và tăng số yêu cầu báo giá từ khách hàng phù hợp.</p>', 41, 64, 8.7, 'published', now() - interval '34 days')
on conflict (slug) do update
set result_summary = excluded.result_summary,
    content_html = excluded.content_html,
    revenue_growth = excluded.revenue_growth,
    lead_growth = excluded.lead_growth,
    conversion_rate = excluded.conversion_rate;

insert into public.campaign_metrics (campaign_name, channel, report_date, impressions, clicks, leads, spend, revenue, conversion_rate)
values
  ('Growth Q2 - Nội thất', 'Facebook Ads', current_date - 6, 120000, 5400, 186, 42000000, 156000000, 3.44),
  ('Search Lead - Logistics', 'Google Ads', current_date - 5, 64000, 3100, 92, 36000000, 112000000, 2.97),
  ('Brand Founder Launch', 'Content', current_date - 4, 42000, 2100, 68, 12000000, 58000000, 3.24),
  ('Landing Page Test', 'Website', current_date - 3, 18000, 1300, 74, 6000000, 44000000, 5.69)
on conflict (campaign_name, channel, report_date) do update
set impressions = excluded.impressions,
    clicks = excluded.clicks,
    leads = excluded.leads,
    spend = excluded.spend,
    revenue = excluded.revenue,
    conversion_rate = excluded.conversion_rate;
