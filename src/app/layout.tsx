import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { WebVitalsReporter } from "@/hooks/use-web-vitals";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createMetadata({
    title: "MIDIGI - Giải pháp Marketing tăng trưởng cho doanh nghiệp Việt",
    description: siteConfig.description
  }),
  applicationName: siteConfig.name,
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
    apple: "/brand/apple-touch-icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
