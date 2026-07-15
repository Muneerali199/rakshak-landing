import type { ReactNode } from "react"

type CardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-black/10 bg-white ${
        hover ? "transition-all duration-300 hover:border-rakshak-cyan/30 hover:shadow-lg hover:shadow-rakshak-cyan/5" : ""
      } ${className ?? ""}`}
    >
      {children}
    </div>
  )
}
