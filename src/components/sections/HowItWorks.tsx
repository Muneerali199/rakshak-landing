"use client"

import Badge from "@/components/benchmark/Badge"

const vulnerableCode = `def get_user(username):
    query = f"SELECT * FROM users WHERE name = {username}"
    db.execute(query)`

const fixedCode = `def get_user(username):
    query = "SELECT * FROM users WHERE name = ?"
    db.execute(query, (username,))`

function CodeBlock({ code, variant }: { code: string; variant: "bad" | "good" }) {
  const lines = code.split("\n")
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#111]">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 font-mono text-xs text-white/30">app.py</span>
      </div>
      <div className="p-4 font-mono text-sm">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-6 text-white/20">{i + 1}</span>
            <span className={variant === "bad" && i === 1 ? "text-red-300" : "text-white/80"}>
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Badge variant="cyan" className="mb-6">Workflow</Badge>
          <h2 className="font-heading text-5xl font-bold leading-tight text-[#111] md:text-7xl">
            How It Works
          </h2>
          <p className="mt-4 text-base text-black/40">
            From vulnerable code to secure in three steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 text-xs font-bold text-black/30">01</span>
              <h3 className="font-heading text-xl font-bold text-[#111]">Write Code</h3>
            </div>
            <p className="text-sm leading-relaxed text-black/50">
              Write your code normally in any supported language. Rakshak watches every keystroke.
            </p>
            <CodeBlock code={vulnerableCode} variant="bad" />
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-500">02</span>
              <h3 className="font-heading text-xl font-bold text-[#111]">AI Scans</h3>
            </div>
            <p className="text-sm leading-relaxed text-black/50">
              Rakshak detects SQL injection, XSS, hardcoded secrets, and more in real-time.
            </p>
            <CodeBlock code={vulnerableCode} variant="bad" />
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
              <span className="text-red-500">&#9888;</span> 3 vulnerabilities found
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-600">03</span>
              <h3 className="font-heading text-xl font-bold text-[#111]">Fix Instantly</h3>
            </div>
            <p className="text-sm leading-relaxed text-black/50">
              One-click fix with AI-suggested patches. Press Cmd+. and you&apos;re done.
            </p>
            <CodeBlock code={fixedCode} variant="good" />
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-600">
              &#10003; All vulnerabilities patched
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
