import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Trang bạn tìm không tồn tại</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Đường dẫn có thể đã được thay đổi hoặc nội dung không còn khả dụng. Hãy quay lại trang chủ để tiếp tục khám phá MIDIGI.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Về trang chủ</Link>
      </Button>
    </main>
  );
}
