type BadgeProps = {
  children: string
  variant?: "cyan" | "success" | "danger" | "warning" | "neutral"
  className?: string
}

const variants = {
  cyan: "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20",
  success: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  danger: "bg-red-50 text-red-600 border border-red-200",
  warning: "bg-amber-50 text-amber-600 border border-amber-200",
  neutral: "bg-black/5 text-black/60 border border-black/10",
}

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </span>
  )
}
