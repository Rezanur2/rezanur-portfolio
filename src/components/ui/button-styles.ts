import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-solid text-white shadow-[0_10px_24px_-14px_rgba(37,99,235,0.9)] hover:bg-[#1d4ed8] hover:shadow-[0_14px_28px_-14px_rgba(37,99,235,0.9)]",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-accent/60 hover:text-accent",
  ghost: "text-muted hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3.5 py-2 text-xs active:scale-[0.98]",
  md: "min-h-11 px-5 py-2.5 text-sm active:scale-[0.98]",
  lg: "min-h-12 px-6 py-3 text-sm active:scale-[0.98]",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}
