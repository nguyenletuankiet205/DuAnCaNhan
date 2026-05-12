import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { marketingNav, siteConfig } from "@/lib/config";
import { fallbackServices } from "@/lib/content";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-8">
        <div>
          <Link href="/" className="text-2xl font-extrabold text-white">
            <span className="gradient-text">MIDIGI</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Đối tác marketing tăng trưởng cho SME, startup, chủ shop online, local business và thương hiệu cá nhân tại Việt Nam.
          </p>
          <div className="mt-5 flex gap-3">
            <Link className="focus-ring rounded-md text-slate-300 hover:text-white" href={siteConfig.socials.facebook} aria-label="Facebook MIDIGI">
              <Facebook className="size-5" />
            </Link>
            <Link className="focus-ring rounded-md text-slate-300 hover:text-white" href={siteConfig.socials.linkedin} aria-label="LinkedIn MIDIGI">
              <Linkedin className="size-5" />
            </Link>
            <Link className="focus-ring rounded-md text-slate-300 hover:text-white" href={siteConfig.socials.youtube} aria-label="YouTube MIDIGI">
              <Youtube className="size-5" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-slate-300">Điều hướng</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {marketingNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-slate-300">Dịch vụ</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {fallbackServices.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/dich-vu/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-slate-300">Liên hệ</h3>
          <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 text-accent" />
              <span>{siteConfig.phone}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 text-accent" />
              <span>{siteConfig.email}</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 text-accent" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MIDIGI. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
