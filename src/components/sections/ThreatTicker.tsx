"use client"

import ScrollingMarquee from "@/components/benchmark/ScrollingMarquee"

const items = [
  "SQL Injection Blocked",
  "XSS Patched",
  "Hardcoded Secret Found",
  "Command Injection Fixed",
  "Path Traversal Detected",
  "Weak Crypto Replaced",
]

export default function ThreatTicker() {
  return (
    <section className="border-y border-black/5 bg-white py-2.5">
      <ScrollingMarquee speed={30}>
        <div className="mx-12 flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-black/20">
          {items.map((item) => (
            <span key={item} className="flex items-center gap-6">
              <span className="h-1 w-1 rounded-full bg-[#00e5ff]/40" />
              {item}
            </span>
          ))}
        </div>
      </ScrollingMarquee>
    </section>
  )
}
