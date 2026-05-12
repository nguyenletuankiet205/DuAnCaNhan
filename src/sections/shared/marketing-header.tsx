"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketingNav } from "@/lib/config";
import { useUiStore } from "@/hooks/use-ui-store";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  const mobileOpen = useUiStore((state) => state.mobileMenuOpen);
  const setMobileOpen = useUiStore((state) => state.setMobileMenuOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring rounded-md text-xl font-extrabold tracking-normal text-white sm:text-2xl" onClick={() => setMobileOpen(false)}>
          <span className="gradient-text">MIDIGI</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {marketingNav.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="gradient">
            <Link href="/lien-he">Tư vấn miễn phí</Link>
          </Button>
        </div>
        <button
          type="button"
          className="focus-ring inline-flex size-10 items-center justify-center rounded-md border border-border text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div className={cn("border-t border-white/10 px-4 pb-3 lg:hidden", mobileOpen ? "block" : "hidden")}>
        <nav className="mx-auto grid max-w-7xl gap-1.5 pt-3" aria-label="Điều hướng mobile">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <Button asChild variant="gradient" className="mt-2">
            <Link href="/lien-he" onClick={() => setMobileOpen(false)}>
              Tư vấn miễn phí
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
