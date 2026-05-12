import type { BlogStatus, LeadStatus, OrderStatus, PaymentStatus, ServiceType, UserRole } from "@/types/database.types";

export const serviceTypeOptions: Array<{ value: ServiceType; label: string }> = [
  { value: "business_website", label: "Thiết kế Website doanh nghiệp" },
  { value: "conversion_landing_page", label: "Thiết kế Landing Page chuyển đổi" },
  { value: "facebook_ads", label: "Chạy Facebook Ads" },
  { value: "google_ads", label: "Chạy Google Ads" },
  { value: "fanpage_setup", label: "Setup Fanpage chuyên nghiệp" },
  { value: "facebook_group_setup", label: "Setup Facebook Group cộng đồng" },
  { value: "personal_branding", label: "Xây dựng thương hiệu cá nhân" },
  { value: "marketing_strategy", label: "Tư vấn chiến lược marketing" },
  { value: "growth_consulting", label: "Growth consulting" }
];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "Khách mới",
  contacted: "Đã liên hệ",
  quoted: "Đã gửi báo giá",
  won: "Đã chốt",
  lost: "Không thành công"
};

export const userRoleLabels: Record<UserRole, string> = {
  admin: "Quản trị viên",
  sale: "Nhân viên Sale",
  marketing: "Nhân viên Marketing"
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  draft: "Bản nháp",
  active: "Đang triển khai",
  paused: "Tạm dừng",
  completed: "Hoàn tất",
  cancelled: "Đã hủy"
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pending: "Chờ thanh toán",
  paid: "Đã thanh toán",
  overdue: "Quá hạn",
  refunded: "Đã hoàn tiền",
  cancelled: "Đã hủy"
};

export const blogStatusLabels: Record<BlogStatus, string> = {
  draft: "Bản nháp",
  published: "Đã xuất bản",
  archived: "Lưu trữ"
};

export const budgetOptions = [
  "Dưới 10 triệu",
  "10 - 30 triệu",
  "30 - 70 triệu",
  "70 - 150 triệu",
  "Trên 150 triệu",
  "Cần MIDIGI tư vấn"
] as const;
