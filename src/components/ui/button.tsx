import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition duration-200 disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-secondary hover:shadow-cyan",
        secondary: "bg-muted text-white hover:bg-slate-700",
        outline: "border border-border bg-transparent text-white hover:border-accent hover:bg-accent/10",
        ghost: "text-muted-foreground hover:bg-white/5 hover:text-white",
        destructive: "bg-destructive text-destructive-foreground hover:bg-red-600",
        gradient:
          "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-glow hover:-translate-y-0.5 hover:shadow-cyan"
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-7 text-base",
        icon: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
