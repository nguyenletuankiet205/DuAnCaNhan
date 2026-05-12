"use client";

import { useTransition } from "react";
import { Archive } from "lucide-react";
import { toast } from "sonner";
import { deleteBlogPostAction } from "@/actions/dashboard-actions";
import { Button } from "@/components/ui/button";

export function DeleteBlogButton({ id, csrfToken }: { id: string; csrfToken: string }) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    const confirmed = window.confirm("Bạn muốn lưu trữ bài viết này?");
    if (!confirmed) return;
    startTransition(async () => {
      const result = await deleteBlogPostAction({ id, csrfToken });
      if (result.ok) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <Button type="button" size="sm" variant="outline" disabled={pending} onClick={onClick}>
      <Archive className="size-4" />
      Lưu trữ
    </Button>
  );
}
