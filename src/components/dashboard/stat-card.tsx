import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({ title, value, description, icon: Icon }: { title: string; value: string; description: string; icon: LucideIcon }) {
  return (
    <Card className="p-6">
      <Icon className="size-6 text-accent" />
      <p className="mt-5 text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
    </Card>
  );
}
