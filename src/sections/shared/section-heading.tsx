import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-left sm:text-center" : "text-left")}>
      <Badge variant="cyan">{eyebrow}</Badge>
      <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:mt-5 sm:text-3xl md:text-[40px]">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">{description}</p> : null}
    </div>
  );
}
