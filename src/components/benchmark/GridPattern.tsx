"use client"

import { useRef, type ComponentRef } from "react"

type GridPatternProps = {
  className?: string
  gridSize?: number
  strokeWidth?: number
  dark?: boolean
}

export default function GridPattern({
  className,
  gridSize = 120,
  strokeWidth = 1.5,
  dark = false,
}: GridPatternProps) {
  const size = Math.ceil(1000 / gridSize) * gridSize
  const patternId = `grid-${gridSize}-${strokeWidth}`
  const cols = Math.ceil(size / gridSize)
  const totalCells = cols * cols
  const svgRef = useRef<ComponentRef<"svg">>(null)

  const flash = () => {
    const svg = svgRef.current
    if (!svg) return

    for (let i = 0; i < totalCells; i++) {
      if (Math.random() > 0.5) continue
      const col = i % cols
      const row = Math.floor(i / cols)
      const delay = Math.random() * 140

      setTimeout(() => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", String(col * gridSize))
        rect.setAttribute("y", String(row * gridSize))
        rect.setAttribute("width", String(gridSize))
        rect.setAttribute("height", String(gridSize))
        rect.setAttribute("fill", "#00e5ff")
        rect.setAttribute("opacity", "0.03")
        svg.appendChild(rect)
        setTimeout(() => rect.remove(), 100 + Math.random() * 100)
      }, delay)
    }
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox={`1 1 ${size - 1} ${size - 1}`}
      onMouseEnter={flash}
    >
      <defs>
        <pattern id={patternId} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path
            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
            fill="none"
            stroke={dark ? "#222" : "#e5e5e5"}
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width={size} height={size} fill={`url(#${patternId})`} />
    </svg>
  )
}
