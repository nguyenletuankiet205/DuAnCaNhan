"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { submitLeadAction } from "@/actions/lead-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetOptions, serviceTypeOptions } from "@/db/enums";
import { leadInputSchema, type LeadInput } from "@/lib/validation";

export function LeadForm({ csrfToken, compact = false }: { csrfToken: string; compact?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadInputSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      industry: "",
      serviceInterest: "business_website",
      budgetRange: "Cần MIDIGI tư vấn",
      message: "",
      csrfToken
    }
  });

  function onSubmit(values: LeadInput) {
    startTransition(async () => {
      const result = await submitLeadAction(values);
      if (result.ok) {
        toast.success(result.message);
        reset({ ...values, fullName: "", phone: "", email: "", industry: "", message: "", csrfToken });
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <form className="grid gap-3.5 sm:gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="hidden" {...register("csrfToken")} value={csrfToken} />
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label="Họ và tên" error={errors.fullName?.message}>
          <Input placeholder="Ví dụ: Nguyễn Minh Anh" autoComplete="name" {...register("fullName")} />
        </Field>
        <Field label="Số điện thoại" error={errors.phone?.message}>
          <Input placeholder="Ví dụ: 0909888168" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label="Email" error={errors.email?.message}>
          <Input placeholder="ban@congty.vn" autoComplete="email" {...register("email")} />
        </Field>
        <Field label="Ngành nghề" error={errors.industry?.message}>
          <Input placeholder="Ví dụ: Nội thất, mỹ phẩm, giáo dục" {...register("industry")} />
        </Field>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label="Dịch vụ cần tư vấn" error={errors.serviceInterest?.message}>
          <select className="focus-ring h-11 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm text-white" {...register("serviceInterest")}>
            {serviceTypeOptions.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Ngân sách dự kiến" error={errors.budgetRange?.message}>
          <select className="focus-ring h-11 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm text-white" {...register("budgetRange")}>
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Nội dung" error={errors.message?.message}>
        <Textarea className="min-h-28 sm:min-h-32" placeholder="Chia sẻ mục tiêu, kênh hiện tại hoặc vấn đề bạn muốn MIDIGI hỗ trợ" {...register("message")} />
      </Field>
      <Button type="submit" variant="gradient" size="lg" disabled={isPending} className="w-full">
        <Send className="size-4" />
        {isPending ? "Đang gửi yêu cầu..." : "Nhận tư vấn ngay"}
      </Button>
      <p className="text-center text-xs leading-5 text-muted-foreground">
        MIDIGI chỉ sử dụng thông tin để tư vấn giải pháp phù hợp và không chia sẻ cho bên thứ ba.
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
