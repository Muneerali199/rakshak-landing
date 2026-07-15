"use client"

import { useEffect, useState } from "react"

const links = [
  { href: "#features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/benchmark", label: "Benchmarks" },
  { href: "/login", label: "Login" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-white/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className={`font-heading text-lg font-bold tracking-wide transition-colors ${
            scrolled ? "text-[#111]" : "text-[#111]"
          }`}
        >
          रक्षक
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full border px-4 py-1.5 font-body text-sm transition-all duration-300 ${
                scrolled
                  ? "border-black/10 text-black/50 hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/5 hover:text-[#00e5ff]"
                  : "border-black/10 text-black/50 hover:border-black/30 hover:text-[#111]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#install"
          className={`rounded-full border px-5 py-1.5 font-body text-sm font-medium transition-all duration-300 ${
            scrolled
              ? "border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-white"
              : "border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-white"
          }`}
        >
          Install
        </a>
      </div>
    </nav>
  )
}
