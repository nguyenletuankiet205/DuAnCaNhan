"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "border border-border bg-card text-white shadow-glass",
          description: "text-slate-300",
          actionButton: "bg-primary text-white",
          cancelButton: "bg-muted text-white"
        }
      }}
    />
  );
}
