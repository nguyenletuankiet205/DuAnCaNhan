import { absoluteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "MIDIGI",
  fullName: "Công ty Giải pháp Marketing MIDIGI",
  description:
    "MIDIGI cung cấp giải pháp marketing tăng trưởng cho doanh nghiệp Việt Nam: website, landing page, quảng cáo đa nền tảng, thương hiệu và tối ưu chuyển đổi.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: absoluteUrl("/brand/og-cover.svg"),
  locale: "vi_VN",
  email: "hello@midigi.vn",
  phone: "0909 888 168",
  address: "Tầng 6, khu trung tâm kinh doanh, TP. Hồ Chí Minh",
  socials: {
    facebook: "https://facebook.com/midigi.vn",
    linkedin: "https://linkedin.com/company/midigi",
    youtube: "https://youtube.com/@midigi"
  }
} as const;

export const dashboardNav = [
  { title: "Tổng quan", href: "/dashboard" },
  { title: "Khách hàng tiềm năng", href: "/dashboard/leads" },
  { title: "Đơn dịch vụ", href: "/dashboard/orders" },
  { title: "Thanh toán", href: "/dashboard/payments" },
  { title: "Nội dung blog", href: "/dashboard/blog" },
  { title: "Doanh thu", href: "/dashboard/revenue" },
  { title: "Chiến dịch", href: "/dashboard/campaigns" },
  { title: "Ghi chú CRM", href: "/dashboard/crm" },
  { title: "Thư viện media", href: "/dashboard/media" }
] as const;

export const marketingNav = [
  { title: "Trang chủ", href: "/" },
  { title: "Giới thiệu", href: "/gioi-thieu" },
  { title: "Dịch vụ", href: "/dich-vu" },
  { title: "Dự án", href: "/du-an" },
  { title: "Bảng giá", href: "/bang-gia" },
  { title: "Blog", href: "/blog" },
  { title: "Liên hệ", href: "/lien-he" }
] as const;
