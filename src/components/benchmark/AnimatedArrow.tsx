type AnimatedArrowProps = {
  className?: string
  direction?: "left" | "right" | "down" | "up"
}

const arrows = {
  right: { out: "group-hover:translate-x-full", enter: "-translate-x-full group-hover:translate-x-0" },
  left: { out: "group-hover:-translate-x-full", enter: "translate-x-full group-hover:translate-x-0" },
  down: { out: "group-hover:translate-y-full", enter: "-translate-y-full group-hover:translate-y-0" },
  up: { out: "group-hover:-translate-y-full", enter: "translate-y-full group-hover:translate-y-0" },
}

export default function AnimatedArrow({ className, direction = "right" }: AnimatedArrowProps) {
  const { out, enter } = arrows[direction]
  const cls = "size-3.5 transition-transform duration-500 ease-out"

  return (
    <span className="relative inline-block overflow-hidden align-middle leading-none">
      <svg className={`${cls} ${out} ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
      <svg className={`${cls} absolute inset-0 ${enter} ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  )
}
