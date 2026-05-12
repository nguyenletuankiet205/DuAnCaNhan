import "server-only";
import { createHash } from "node:crypto";

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function hashRequestValue(value: string | null | undefined) {
  const salt = process.env.CSRF_SECRET ?? "midigi-local-development-salt";
  return sha256(`${salt}:${value ?? "unknown"}`);
}
