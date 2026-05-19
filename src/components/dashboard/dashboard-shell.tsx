"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpenText, CreditCard, FileText, LayoutDashboard, LogOut, Menu, MessageSquareText, PanelLeftClose, PanelLeftOpen, UploadCloud, UsersRound } from "lucide-react";
import { signOutAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { dashboardNav } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/hooks/use-ui-store";
import type { AuthContext } from "@/lib/auth";

const navIcons = [LayoutDashboard, UsersRound, FileText, CreditCard, BookOpenText, BarChart3, BarChart3, MessageSquareText, UploadCloud];

export function DashboardShell({ children, auth }: { children: React.ReactNode; auth: AuthContext }) {
  const pathname = usePathname();
  const open = useUiStore((state) => state.dashboardSidebarOpen);
  const toggle = useUiStore((state) => state.toggleDashboardSidebar);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-slate-950/80 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" prefetch={false} className="text-xl font-extrabold text-white">
            <span className="gradient-text">MIDIGI</span>
          </Link>
          <button className="focus-ring rounded-md border border-border p-2" onClick={toggle} aria-label="Mở menu dashboard">
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-slate-950/95 p-4 transition-all lg:translate-x-0",
          open ? "translate-x-0 lg:w-72" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/dashboard" prefetch={false} className={cn("text-2xl font-extrabold text-white", !open && "lg:hidden")}>
            <span className="gradient-text">MIDIGI</span>
          </Link>
          <button className="focus-ring hidden rounded-md border border-border p-2 lg:inline-flex" onClick={toggle} aria-label="Thu gọn menu dashboard">
            {open ? <PanelLeftClose className="size-5" /> : <PanelLeftOpen className="size-5" />}
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {dashboardNav.map((item, index) => {
            const Icon = navIcons[index] ?? LayoutDashboard;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={cn(
                  "focus-ring flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition",
                  active ? "bg-primary text-white shadow-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className={cn(!open && "lg:hidden")}>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className={cn("rounded-lg border border-border bg-white/[0.03] p-3", !open && "lg:hidden")}>
            <p className="text-sm font-semibold text-white">{auth.fullName}</p>
            <p className="mt-1 text-xs text-muted-foreground">{auth.email}</p>
          </div>
          <form action={signOutAction} className="mt-3">
            <Button type="submit" variant="outline" className="w-full">
              <LogOut className="size-4" />
              <span className={cn(!open && "lg:hidden")}>Đăng xuất</span>
            </Button>
          </form>
        </div>
      </aside>

      <main className={cn("min-h-screen px-4 py-6 transition-all sm:px-6 sm:py-8 lg:px-8", open ? "lg:ml-72" : "lg:ml-20")}>
        {children}
      </main>
    </div>
  );
}
