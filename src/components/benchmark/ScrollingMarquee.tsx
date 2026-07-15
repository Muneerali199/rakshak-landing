"use client"

import type { ReactNode } from "react"

type ScrollingMarqueeProps = {
  className?: string
  speed?: number
  children: ReactNode
}

export default function ScrollingMarquee({
  className,
  speed = 20,
  children,
}: ScrollingMarqueeProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
