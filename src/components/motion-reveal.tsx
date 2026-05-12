"use client";

import type { PropsWithChildren } from "react";

export function MotionReveal({ children }: PropsWithChildren<{ delay?: number }>) {
  return <>{children}</>;
}