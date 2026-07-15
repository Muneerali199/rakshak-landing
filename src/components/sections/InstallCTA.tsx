"use client"

import { useState } from "react"
import GridPattern from "@/components/benchmark/GridPattern"
import AnimatedArrow from "@/components/benchmark/AnimatedArrow"

const commands = [
  { label: "curl", cmd: "curl -fsSL https://rakshakai.ai/install.sh | bash", key: "curl" },
  { label: "npm", cmd: "npm install -g rakshakai --force", key: "npm" },
  { label: "bun", cmd: "bun add -g rakshakai", key: "bun" },
  { label: "brew", cmd: "brew install rakshakai", key: "brew" },
  { label: "pip", cmd: "pip3 install rakshakai", key: "pip" },
]

const cmdInfo: Record<string, { bin: string, desc: string }> = {
  curl: { bin: "rakshak", desc: "Standalone binary — no deps needed" },
  npm: { bin: "rakshak", desc: "Node package — JS scanner + Python AI CLI" },
  bun: { bin: "rakshak", desc: "Bun package — fast install" },
  brew: { bin: "rakshak", desc: "Homebrew — macOS only" },
  pip: { bin: "rakshak", desc: "Python package — full AI CLI" },
}

export default function InstallCTA() {
  const [activeTab, setActiveTab] = useState("npm")
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const activeCommand = commands.find((c) => c.key === activeTab)?.cmd || ""
  const info = cmdInfo[activeTab]

  const copyCommand = async () => {
    await navigator.clipboard.writeText(activeCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="install" className="relative overflow-hidden bg-[#111] px-4 py-32 md:px-6">
      <GridPattern gridSize={80} dark />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#00e5ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
          Pre-Release — Launching July 22
        </span>
        <h2 className="mt-6 font-heading text-5xl font-bold leading-tight text-white md:text-7xl">
          Get Early Access
        </h2>
        <p className="mt-4 text-base text-white/40">
          First 1,000 users get <span className="text-[#00e5ff] font-medium">free AI credits</span> — no credit card required
        </p>

        {/* Email signup */}
        <div className="mx-auto mt-10 max-w-md">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#00e5ff]/50"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#00e5ff] px-6 py-3 font-body text-sm font-semibold text-black transition-all hover:bg-[#00e5ff]/80"
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="rounded-xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-6 py-5">
              <p className="text-[#00e5ff] font-medium">✓ You&apos;re on the list!</p>
              <p className="mt-1 text-sm text-white/40">
                We&apos;ll notify you on July 22 with your free credits.
              </p>
            </div>
          )}
          <p className="mt-3 text-xs text-white/20">
            {submitted ? "Share with your team:" : "First 1,000 signups — 500 free AI scans each"}
          </p>
        </div>

        {/* Install methods (available now) */}
        <div className="mx-auto mt-16 max-w-lg">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-white/20">
            Already have access? Install now:
          </p>
          <div className="mb-3 flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            {commands.map((c) => (
              <button
                key={c.key}
                onClick={() => { setActiveTab(c.key); setCopied(false) }}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  activeTab === c.key
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1">
            <div className="flex items-center justify-between px-5 py-3 font-mono text-sm">
              <span>
                <span className="text-[#00e5ff]">$</span>{" "}
                <span className="text-white/80">{activeCommand}</span>
              </span>
              <button
                onClick={copyCommand}
                className="rounded-full border border-white/20 px-4 py-1 font-mono text-xs text-white/50 transition-all hover:bg-white hover:text-black"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-white/30">
            Run <span className="font-mono text-white/50">{info.bin} scan app.py</span> — {info.desc}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="https://github.com/Muneerali199/RakshakAI"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 font-body text-sm text-white/60 transition-all duration-300 hover:bg-white hover:text-black"
          >
            Star on GitHub
            <AnimatedArrow />
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {[
            ["rakshak scan app.py", "Scan a file (150+ patterns, 0 deps)"],
            ["rakshak chat", "AI chat with 65+ models via OpenRouter"],
            ["rakshak server", "Launch web-based scanner UI"],
            ["rakshak --models", "Browse all available AI models"],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <code className="text-sm text-[#00e5ff]">$ {cmd}</code>
              <p className="mt-1 text-xs text-white/30">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 font-heading text-2xl text-white/10">
          रक्षक — Protector of Code
        </p>
      </div>
    </section>
  )
}
