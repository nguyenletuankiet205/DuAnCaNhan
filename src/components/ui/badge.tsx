import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition", {
  variants: {
    variant: {
      default: "border-primary/30 bg-primary/15 text-blue-100",
      cyan: "border-accent/30 bg-accent/15 text-cyan-100",
      success: "border-success/30 bg-success/15 text-green-100",
      warning: "border-warning/30 bg-warning/15 text-amber-100",
      destructive: "border-destructive/30 bg-destructive/15 text-red-100",
      outline: "border-border bg-transparent text-muted-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div suppressHydrationWarning className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
