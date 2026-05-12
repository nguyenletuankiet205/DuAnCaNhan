"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const buckets = [
  ["blog-covers", "Ảnh bìa blog"],
  ["case-study-logos", "Logo dự án"],
  ["case-study-media", "Media dự án"],
  ["testimonial-avatars", "Avatar đánh giá"],
  ["brand-assets", "Tài sản thương hiệu"]
] as const;

export function MediaUpload({ csrfToken }: { csrfToken: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Vui lòng chọn file cần tải lên");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/media/upload", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        body: formData
      });
      const result = (await response.json()) as { ok: boolean; message: string };
      if (result.ok) {
        toast.success(result.message);
        if (fileRef.current) {
          fileRef.current.value = "";
        }
      } else {
        toast.error(result.message);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={onSubmit} className="glass-card grid gap-4 rounded-lg p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Nhóm lưu trữ</Label>
          <select name="bucket" className="focus-ring h-11 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm text-white">
            {buckets.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Mô tả ảnh</Label>
          <Input name="altText" placeholder="Mô tả ngắn cho SEO và accessibility" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>File</Label>
        <Input ref={fileRef} name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf" />
      </div>
      <Button type="submit" variant="gradient" disabled={pending}>
        <UploadCloud className="size-4" />
        {pending ? "Đang tải lên..." : "Tải file lên"}
      </Button>
    </form>
  );
}
