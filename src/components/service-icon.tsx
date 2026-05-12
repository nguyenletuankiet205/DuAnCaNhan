import {
  BadgeCheck,
  Facebook,
  MonitorSmartphone,
  MousePointerClick,
  Route,
  ScanSearch,
  SearchCheck,
  Sparkles,
  TrendingUp,
  UsersRound
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  "monitor-smartphone": MonitorSmartphone,
  "mouse-pointer-click": MousePointerClick,
  facebook: Facebook,
  "search-check": SearchCheck,
  "badge-check": BadgeCheck,
  "users-round": UsersRound,
  sparkles: Sparkles,
  route: Route,
  "scan-search": ScanSearch,
  "trending-up": TrendingUp
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <Icon className={cn("size-5", className)} aria-hidden="true" />;
}
