import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAuth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireAuth();
  return <DashboardShell auth={auth}>{children}</DashboardShell>;
}
