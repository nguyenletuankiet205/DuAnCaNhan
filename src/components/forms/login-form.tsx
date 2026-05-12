"use client";

import { useActionState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { signInAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = { ok: false, message: "" };

export function LoginForm({ csrfToken }: { csrfToken: string }) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <div className="space-y-2">
        <Label htmlFor="email">Email ADMIN</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-3 size-5 text-slate-500" />
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="ten@midigi.vn" className="pl-10" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-3 size-5 text-slate-500" />
          <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="Nhập mật khẩu" className="pl-10" required />
        </div>
      </div>
      {state.message ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-red-100">{state.message}</p> : null}
      <Button type="submit" variant="gradient" disabled={pending} className="w-full">
        {pending ? "Đang đăng nhập..." : "Đăng nhập dashboard"}
      </Button>
    </form>
  );
}
