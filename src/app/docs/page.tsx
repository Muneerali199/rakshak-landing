"use client"

import { useState, useEffect } from "react"
import Badge from "@/components/benchmark/Badge"
import Card from "@/components/benchmark/Card"
import AnimatedArrow from "@/components/benchmark/AnimatedArrow"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "quick-start", label: "Quick Start" },
  { id: "commands", label: "Commands" },
  { id: "configuration", label: "Configuration" },
  { id: "architecture", label: "Architecture" },
  { id: "api", label: "API Reference" },
  { id: "faq", label: "FAQ" },
]

const cmdData = [
  { cmd: "/scan", desc: "Scan a single file for vulnerabilities", usage: "/scan <file>" },
  { cmd: "/scan-project", desc: "Full project vulnerability scan with AI priority ranking", usage: "/scan-project [directory]" },
  { cmd: "/batch", desc: "Scan entire directory with progress bar", usage: "/batch <dir>" },
  { cmd: "/watch", desc: "Real-time file watching with auto-scan on change", usage: "/watch [dir]" },
  { cmd: "/diff", desc: "Git diff scanning — only check changed lines", usage: "/diff [commit-hash]" },
  { cmd: "/precommit", desc: "Manage git pre-commit hook", usage: "/precommit [install|uninstall|status]" },
  { cmd: "/model", desc: "Switch AI model at runtime (65+ models)", usage: "/model <name>" },
  { cmd: "/models", desc: "List all available models", usage: "/models" },
  { cmd: "/parallel", desc: "Run multiple models on the same prompt", usage: "/parallel [model names]" },
  { cmd: "/agent", desc: "Run autonomous ReAct agent on a task", usage: "/agent <task>" },
  { cmd: "/swarm", desc: "Multi-agent swarm — parallel subagents", usage: "/swarm <task>" },
  { cmd: "/explain", desc: "Get AI explanation of source code", usage: "/explain <file>" },
  { cmd: "/fix", desc: "Generate security fix from description", usage: "/fix <description>" },
  { cmd: "/batch", desc: "Batch scan entire project directory", usage: "/batch <dir>" },
  { cmd: "/help", desc: "List all available commands", usage: "/help [command]" },
  { cmd: "/exit", desc: "Exit RakshakAI CLI", usage: "/exit" },
]

const configKeys = [
  { key: "rakshak.scanOnSave", type: "boolean", default: "true", desc: "Automatically scan files on save" },
  { key: "rakshak.aiProvider", type: "string", default: "ollama", desc: "AI provider: ollama, openai, anthropic, openrouter, gemini, deepseek, mistral, groq, together, fireworks, nebius, deepinfra, aiml" },
  { key: "rakshak.model", type: "string", default: "llama3", desc: "Model name for the AI provider" },
  { key: "rakshak.debounceMs", type: "number", default: "1000", desc: "Debounce delay in milliseconds" },
  { key: "rakshak.severityThreshold", type: "enum", default: "medium", desc: "Minimum severity: low, medium, high, critical" },
  { key: "rakshak.maxWorkers", type: "number", default: "4", desc: "Parallel scan worker count" },
  { key: "rakshak.excludePatterns", type: "string[]", default: "[]", desc: "Glob patterns to exclude from scanning" },
]

const faqData = [
  { q: "Is RakshakAI free?", a: "Yes. RakshakAI is fully open source under MIT License. You can use it for free, including the Ollama integration for local AI." },
  { q: "Does it work with any AI model?", a: "Yes. RakshakAI supports 65+ models across 9+ providers including OpenRouter, Google Gemini, DeepSeek, Mistral, xAI Grok, Perplexity, DeepInfra, AI/ML API, Ollama, OpenAI, Anthropic, Groq, Together, Fireworks, and NVIDIA NIM." },
  { q: "How is RakshakAI different from Semgrep or Snyk?", a: "RakshakAI combines traditional pattern matching with AI-powered analysis. This gives you ~20% false positive rate vs 60-80% for traditional SAST tools, while remaining free and open source." },
  { q: "Can I use it without sending code to the cloud?", a: "Yes. With the Ollama provider, everything runs locally on your machine. No code ever leaves your environment." },
  { q: "What languages are supported?", a: "RakshakAI supports 20+ languages: Python, JavaScript, TypeScript, Java, Go, Rust, C, C++, PHP, Ruby, C#, Swift, Kotlin, Solidity, Scala, Perl, Elixir, Erlang, Haskell, R — each with CWE-mapped vulnerability patterns." },
  { q: "How do I get an auth token?", a: "Register at /login or use the CLI: rakshak register. Tokens are free and only needed for cloud AI providers." },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px" }
    )

    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Top nav */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="/" className="font-heading text-lg font-bold tracking-wide text-[#111]">रक्षक</a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-sm text-black/50 md:hidden"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="/" className="text-sm text-black/40 transition-colors hover:text-[#111]">Home</a>
            <a href="/benchmark" className="text-sm text-black/40 transition-colors hover:text-[#111]">Benchmarks</a>
            <a href="/login" className="text-sm text-black/40 transition-colors hover:text-[#111]">Login</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl pt-14">
        {/* Sidebar */}
        <aside className={`fixed bottom-0 left-0 top-14 z-40 w-56 border-r border-black/5 bg-white transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <nav className="p-4">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-black/20">Documentation</p>
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${
                      activeSection === s.id
                        ? "bg-[#00e5ff]/10 font-medium text-[#00e5ff]"
                        : "text-black/50 hover:bg-black/[0.02] hover:text-[#111]"
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden px-6 py-12 md:ml-56 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-24">

            {/* Overview */}
            <section id="overview">
              <Badge variant="cyan" className="mb-4">Documentation</Badge>
              <h1 className="text-5xl font-bold leading-tight text-[#111] md:text-6xl">RakshakAI Docs</h1>
              <p className="mt-4 text-lg leading-relaxed text-black/50">
                Everything you need to know about RakshakAI — the open-source, AI-powered security scanner for VS Code.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { num: "16+", label: "Slash Commands" },
                  { num: "20+", label: "Languages" },
                  { num: "65+", label: "AI Models" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-black/10 bg-white p-5 text-center">
                    <div className="bg-gradient-to-b from-[#00e5ff] to-purple-500 bg-clip-text text-3xl font-bold text-transparent">{s.num}</div>
                    <div className="mt-1 text-sm text-black/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00e5ff]/10 text-sm font-bold text-[#00e5ff]">1</span>
                <h2 className="text-2xl font-bold text-[#111]">Quick Start</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-base font-semibold text-[#111]">Installation</h3>
                  <Card className="overflow-hidden">
                    <div className="border-b border-black/5 px-5 py-3">
                      <span className="text-xs font-medium uppercase tracking-wider text-black/30">VS Code Extension</span>
                    </div>
                    <div className="space-y-0 divide-y divide-black/5">
                      {[
                        { label: "VS Code Marketplace", cmd: "ext install rakshak" },
                        { label: "VSX (Open VSX)", cmd: "ext install rakshak --from-source" },
                        { label: "CLI (npm)", cmd: "npm install -g rakshak-cli" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                          <span className="text-sm text-black/60">{item.label}</span>
                          <code className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1 font-mono text-xs text-[#111]">{item.cmd}</code>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 text-base font-semibold text-[#111]">Your First Scan</h3>
                  <Card className="p-5">
                    <ol className="space-y-3 text-sm text-black/60">
                      <li className="flex gap-3"><span className="font-bold text-[#00e5ff]">1.</span> Install the extension from VS Code Marketplace</li>
                      <li className="flex gap-3"><span className="font-bold text-[#00e5ff]">2.</span> Open any Python, JS, or TS file</li>
                      <li className="flex gap-3"><span className="font-bold text-[#00e5ff]">3.</span> Run <code className="rounded border border-black/10 px-1.5 py-0.5 font-mono text-xs">/scan-project</code> in the command palette</li>
                      <li className="flex gap-3"><span className="font-bold text-[#00e5ff]">4.</span> View results inline — squiggly underlines with fix suggestions</li>
                      <li className="flex gap-3"><span className="font-bold text-[#00e5ff]">5.</span> Hover over a vulnerability and click <strong>Fix</strong></li>
                    </ol>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 text-base font-semibold text-[#111]">Quick Links</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="/login" className="group inline-flex items-center gap-1.5 rounded-full border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-5 py-2 text-sm font-medium text-[#00e5ff] transition-all hover:bg-[#00e5ff] hover:text-white">
                      Get Auth Token <AnimatedArrow />
                    </a>
                    <a href="/benchmark" className="group inline-flex items-center gap-1.5 rounded-full border border-black/10 px-5 py-2 text-sm text-black/50 transition-all hover:border-black/30 hover:text-[#111]">
                      View Benchmarks <AnimatedArrow />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Commands */}
            <section id="commands">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-600">2</span>
                <h2 className="text-2xl font-bold text-[#111]">Commands</h2>
              </div>
              <p className="mb-8 text-base text-black/50">Slash commands are RakshakAI&apos;s primary interface. Type <code className="rounded border border-black/10 px-1.5 py-0.5 font-mono text-xs">/</code> in the command palette to see all available commands.</p>

              <div className="space-y-3">
                {cmdData.map((c) => (
                  <Card key={c.cmd} hover className="p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <code className="rounded-lg border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-2.5 py-1 font-mono text-sm font-semibold text-[#00e5ff]">{c.cmd}</code>
                        <p className="mt-2 text-sm text-black/60">{c.desc}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-black/10 px-3 py-1 font-mono text-[11px] text-black/40">{c.usage}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm font-bold text-amber-600">3</span>
                <h2 className="text-2xl font-bold text-[#111]">Configuration</h2>
              </div>
              <p className="mb-8 text-base text-black/50">RakshakAI is configured via VS Code settings (<code className="rounded border border-black/10 px-1.5 py-0.5 font-mono text-xs">Cmd+,</code> → search &quot;rakshak&quot;).</p>

              <Card className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                      <th className="px-5 py-3.5">Setting</th>
                      <th className="px-5 py-3.5">Type</th>
                      <th className="px-5 py-3.5">Default</th>
                      <th className="px-5 py-3.5">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configKeys.map((c) => (
                      <tr key={c.key} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                        <td className="px-5 py-3.5 font-mono text-xs text-[#111]">{c.key}</td>
                        <td className="px-5 py-3.5"><Badge variant="neutral">{c.type}</Badge></td>
                        <td className="px-5 py-3.5 font-mono text-xs text-black/50">{c.default}</td>
                        <td className="px-5 py-3.5 text-black/60">{c.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>

            {/* Architecture */}
            <section id="architecture">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600">4</span>
                <h2 className="text-2xl font-bold text-[#111]">Architecture</h2>
              </div>
              <p className="mb-8 text-base text-black/50">RakshakAI uses a hybrid approach combining pattern matching with AI-powered analysis for maximum accuracy.</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Pattern Engine", desc: "Fast regex-based scanning for known vulnerability patterns. Covers 20+ languages with 500+ files/second throughput. 439 CWE definitions cached locally." },
                  { title: "AI Analyzer", desc: "Optional LLM-powered analysis with 65+ models across 9+ providers. Includes tiered model routing: free regex → cheap LLM → expensive LLM." },
                  { title: "Multi-Agent Orchestrator", desc: "OrchestratorAgent decomposes tasks into parallel subagents via ThreadPoolExecutor. Up to 5 agents running concurrently with result synthesis." },
                  { title: "Token Optimizer", desc: "CWE relevance pre-filter sends 5-8 IDs instead of 439. Regex pre-filter bypass skips LLM for 70% of scans (0 tokens). Batched scanning: 10 files per LLM call." },
                  { title: "Real-time Watcher", desc: "File system watcher with intelligent debouncing. Triggers scans on save with configurable delay (default 1s)." },
                  { title: "Diagnostic Provider", desc: "VS Code API integration that surfaces findings as inline squiggles, hover tooltips, and lightbulb quick-fixes." },
                ].map((item) => (
                  <Card key={item.title} hover className="p-5">
                    <h3 className="text-sm font-semibold text-[#111]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/50">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* API Reference */}
            <section id="api">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-500">5</span>
                <h2 className="text-2xl font-bold text-[#111]">API Reference</h2>
              </div>
              <p className="mb-8 text-base text-black/50">RakshakAI runs a local API server on port 3000 that the VS Code extension communicates with.</p>

              <div className="space-y-4">
                {[
                  { method: "POST", path: "/api/scan", desc: "Scan a file or directory for vulnerabilities", body: '{ "path": "/src/app.py" }' },
                  { method: "GET", path: "/api/status", desc: "Get scanner status and stats", body: null },
                  { method: "POST", path: "/api/fix", desc: "Apply an AI-suggested fix", body: '{ "file": "app.py", "line": 42 }' },
                  { method: "POST", path: "/api/login", desc: "Authenticate with the cloud backend", body: '{ "email": "...", "password": "..." }' },
                  { method: "POST", path: "/api/register", desc: "Create a new account", body: '{ "email": "...", "password": "..." }' },
                ].map((api) => (
                  <Card key={api.path} hover className="p-5">
                    <div className="flex items-start gap-4">
                      <span className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${
                        api.method === "GET" ? "bg-emerald-50 text-emerald-600" : "bg-[#00e5ff]/10 text-[#00e5ff]"
                      }`}>{api.method}</span>
                      <div className="min-w-0 flex-1">
                        <code className="font-mono text-sm font-semibold text-[#111]">{api.path}</code>
                        <p className="mt-1 text-sm text-black/50">{api.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">6</span>
                <h2 className="text-2xl font-bold text-[#111]">FAQ</h2>
              </div>

              <div className="space-y-3">
                {faqData.map((item) => (
                  <Card key={item.q} hover className="p-5">
                    <h3 className="text-sm font-semibold text-[#111]">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/50">{item.a}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-black/5 pt-10 pb-6 text-center text-xs text-black/30">
              RakshakAI Documentation &middot; MIT License &middot; Open Source
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
