"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-destructive">Lỗi hệ thống</p>
      <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Có sự cố khi tải nội dung</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Dữ liệu tạm thời chưa sẵn sàng. Vui lòng thử lại, nếu lỗi còn tiếp diễn đội ngũ MIDIGI sẽ kiểm tra ngay.
      </p>
      <Button className="mt-8" onClick={reset}>
        Tải lại trang
      </Button>
    </main>
  );
}
