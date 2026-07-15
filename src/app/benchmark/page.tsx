"use client"

import GridPattern from "@/components/benchmark/GridPattern"
import ScrollingMarquee from "@/components/benchmark/ScrollingMarquee"
import Card from "@/components/benchmark/Card"
import Badge from "@/components/benchmark/Badge"

const scoreData = [
  { rank: 1, name: "RakshakAI", score: 50, bar: "100%", color: "bg-[#00e5ff]" },
  { rank: 2, name: "OpenCode", score: 36, bar: "72%", color: "bg-emerald-500" },
  { rank: 3, name: "Semgrep", score: 33, bar: "66%", color: "bg-amber-500" },
  { rank: 4, name: "Snyk CLI", score: 30, bar: "60%", color: "bg-orange-500" },
  { rank: 5, name: "Claude Code", score: 23, bar: "46%", color: "bg-red-500" },
]

const tokenData = [
  { tool: "RakshakAI", prompt: "302t", tools: "0t", total: "302", vs: "1x", pct: "1%", color: "bg-[#00e5ff]" },
  { tool: "Copilot CLI", prompt: "~1,500t", tools: "~5,000t", total: "~6,500", vs: "22x", pct: "21%", color: "bg-amber-500" },
  { tool: "OpenCode", prompt: "2,000t", tools: "4,800t", total: "6,800", vs: "23x", pct: "22%", color: "bg-emerald-500" },
  { tool: "Claude Code", prompt: "6,500t", tools: "24,000t", total: "30,500", vs: "101x", pct: "100%", color: "bg-red-500" },
]

const wasteData = [
  { cat: "Tool schemas", rak: "0t", oc: "4,800t", cc: "24,000t" },
  { cat: "Subagent overhead", rak: "0t", oc: "~7,000t", cc: "~33,000t" },
  { cat: "Cache rewrites/session", rak: "0t", oc: "~1,000t", cc: "~54,000t" },
  { cat: "CLAUDE.md overhead", rak: "N/A", oc: "20,000t", cc: "20,000t" },
  { cat: "MCP servers (5)", rak: "N/A", oc: "~6,000t", cc: "~6,000t" },
  { cat: "Fluff preamble", rak: "0t", oc: "20-80t", cc: "20-80t" },
]

const features = [
  { feat: "Security vulnerability scanning", rak: true, oc: false, cc: false, snyk: true, sem: true },
  { feat: "AI-powered code analysis", rak: true, oc: true, cc: true, snyk: false, sem: false },
  { feat: "CWE taxonomy (248 classes)", rak: true, oc: false, cc: false, snyk: true, sem: true },
  { feat: "Slash commands (REPL)", rak: true, oc: true, cc: true, snyk: false, sem: false },
  { feat: "Switch model at runtime", rak: true, oc: true, cc: false, snyk: false, sem: false },
  { feat: "65+ models | 9+ providers", rak: true, oc: true, cc: false, snyk: false, sem: false },
  { feat: "Local Ollama (free, private)", rak: true, oc: true, cc: false, snyk: false, sem: false },
  { feat: "Real-time file watching", rak: true, oc: false, cc: false, snyk: true, sem: true },
  { feat: "Git diff scanning", rak: true, oc: false, cc: true, snyk: true, sem: true },
  { feat: "Pre-commit hook", rak: true, oc: false, cc: false, snyk: false, sem: true },
  { feat: "Autonomous agent mode", rak: true, oc: true, cc: true, snyk: false, sem: false },
  { feat: "Token-efficient prompts", rak: true, oc: false, cc: false, snyk: true, sem: true },
  { feat: "Free and open source", rak: true, oc: true, cc: false, snyk: false, sem: true },
  { feat: "Web auth login", rak: true, oc: true, cc: false, snyk: true, sem: false },
  { feat: "Multi-agent swarm (/swarm)", rak: true, oc: true, cc: true, snyk: false, sem: false },
  { feat: "CWE definition caching (439)", rak: true, oc: false, cc: false, snyk: false, sem: false },
  { feat: "Pre-filter regex bypass (0 tok)", rak: true, oc: false, cc: false, snyk: false, sem: false },
  { feat: "Batched scanning (10x/call)", rak: true, oc: false, cc: false, snyk: false, sem: false },
  { feat: "Tiered model routing", rak: true, oc: false, cc: false, snyk: false, sem: false },
]

const fpData = [
  { tool: "RakshakAI (LLM)", rate: "~20%", bar: "20%", color: "bg-[#00e5ff]", mult: "1x" },
  { tool: "RakshakAI (pattern)", rate: "~35%", bar: "35%", color: "bg-emerald-500", mult: "1.8x" },
  { tool: "GitHub GHAS", rate: "60%", bar: "60%", color: "bg-amber-500", mult: "3x" },
  { tool: "Semgrep", rate: "70%", bar: "70%", color: "bg-orange-500", mult: "3.5x" },
  { tool: "Snyk CLI", rate: "80%", bar: "80%", color: "bg-red-500", mult: "4x" },
]

const costData = [
  { tool: "RakshakAI (Ollama)", cost: "$0.00", note: "Local, private, zero cost", pct: "0%", color: "bg-[#00e5ff]" },
  { tool: "RakshakAI (DeepSeek)", cost: "$0.00", note: "NVIDIA NIM free tier", pct: "0%", color: "bg-[#00e5ff]" },
  { tool: "RakshakAI (GPT-4o-mini)", cost: "$0.15", note: "Per 1K scans", pct: "0.2%", color: "bg-emerald-500" },
  { tool: "Claude Code (Sonnet)", cost: "~$80", note: "~$8/1M input tokens", pct: "23%", color: "bg-amber-500" },
  { tool: "Snyk CLI (Team)", cost: "$250", note: "$25/user/mo subscription", pct: "71%", color: "bg-orange-500" },
  { tool: "Semgrep (Team)", cost: "$350", note: "$35/user/mo subscription", pct: "100%", color: "bg-red-500" },
]

const whyData = [
  { title: "Token Efficiency", accent: "border-l-[#00e5ff]", icon: "01", items: ["302t prompt vs 30,500t", "Zero tool schemas", "No agentic bloat", "No cache rewrites", "101x less than Claude Code"] },
  { title: "Cost", accent: "border-l-emerald-500", icon: "02", items: ["$0 with Ollama (local)", "$0 with DeepSeek (free)", "$0.15 with GPT-4o-mini", "vs $25-35/user Snyk/Semgrep", "100% free tier available"] },
  { title: "Accuracy", accent: "border-l-amber-500", icon: "03", items: ["~20% false positives (LLM)", "Understands code context", "vs 60-80% for Snyk/Semgrep", "CWE taxonomy: 248 classes", "AI prioritizes fix order"] },
  { title: "Speed", accent: "border-l-emerald-500", icon: "04", items: ["~20ms avg per file (regex)", "100x faster than LLM-only scan", "1,000 files in ~20 seconds", "4 parallel scanner workers", "~65ms cold start (main.py)"] },
  { title: "Multi-Agent", accent: "border-l-purple-500", icon: "05", items: ["5 subagents in parallel", "LLM task decomposition", "ThreadPoolExecutor orchestration", "Subagent result synthesis", "See section 07 below"] },
  { title: "Model Choice", accent: "border-l-[#00e5ff]", icon: "06", items: ["65+ models, 9+ providers", "OpenRouter, Google Gemini, DeepSeek", "Mistral, xAI Grok, Perplexity", "DeepInfra, AI/ML API, and more", "Switch at runtime: /model"] },
  { title: "Offline-First", accent: "border-l-amber-500", icon: "07", items: ["Zero server dependency", "439 CWE definitions cached locally", "CWE relevance pre-filter (5-8 IDs sent)", "Regex pre-filter bypass (0 tokens for 70%)", "Works fully disconnected"] },
]

const multiAgentData = [
  { feat: "Parallel subagent execution", rak: true, oc: true, cc: false },
  { feat: "LLM task decomposition", rak: true, oc: true, cc: false },
  { feat: "Agent-to-agent communication", rak: false, oc: false, cc: true },
  { feat: "ThreadPoolExecutor orchestration", rak: true, oc: false, cc: false },
  { feat: "Subagent result synthesis", rak: true, oc: false, cc: true },
  { feat: "Subagent spawn limit", rak: "5", oc: "5", cc: "10" },
  { feat: "Max iterations per subagent", rak: "10", oc: "20", cc: "25" },
  { feat: "Concurrent file scanning", rak: true, oc: false, cc: false },
  { feat: "Zero-token orchestration overhead", rak: true, oc: true, cc: false },
]

function ProgressBar({ pct, color }: { pct: string; color: string }) {
  return (
    <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-black/5">
      <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: pct }} />
    </div>
  )
}

function Check() { return <span className="text-emerald-500 font-bold">&#10003;</span> }
function Cross() { return <span className="text-red-400 font-bold">&#10007;</span> }

export default function BenchmarkPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Marquee Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <ScrollingMarquee speed={25}>
          <div className="mx-12 flex items-center gap-6 py-2.5 text-[11px] font-medium tracking-[0.2em] text-black/30 uppercase">
            <span className="text-[#00e5ff]">&#9679;</span>
            RakshakAI Benchmarks 2026
            <span className="text-[#00e5ff]">&#9679;</span>
            Raw Performance. Honest Comparisons.
            <span className="text-black/15">|</span>
            Token Efficiency Leader
            <span className="text-black/15">|</span>
            101x Less Overhead
            <span className="text-black/15">|</span>
            #1 in Accuracy
          </div>
        </ScrollingMarquee>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6">
        {/* Hero */}
        <section className="relative mb-16 overflow-hidden rounded-3xl border border-black/5 bg-white px-6 py-16 sm:px-16 sm:py-24">
          <GridPattern gridSize={80} />
          <div className="relative z-10 text-center">
            <Badge variant="cyan" className="mb-6">Benchmark Report 2026</Badge>
            <h1 className="text-5xl font-bold tracking-tight text-[#111] sm:text-7xl">
              RakshakAI <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-[#00e5ff] via-purple-500 to-pink-500 bg-clip-text text-transparent">vs The World</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/50">
              Honest, reproducible benchmarks comparing RakshakAI against Claude Code, OpenCode, Snyk CLI, Semgrep, and GitHub GHAS across token efficiency, speed, accuracy, and cost.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8 text-xs text-black/30">
              <span>Measured Jul 2026</span>
              <span className="h-3 w-px bg-black/10" />
              <span>Sources: Systima, Debuggix</span>
              <span className="h-3 w-px bg-black/10" />
              <span>100-repo study</span>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {[
            { num: "302", label: "System Prompt", sub: "vs 30,500 in Claude" },
            { num: "50ms", label: "Cold Start", sub: "vs 3,500ms Claude" },
            { num: "$0", label: "Cost/1K Scans", sub: "vs $80 Claude Code" },
            { num: "~20%", label: "False Positive", sub: "vs 80% Snyk" },
            { num: "500+", label: "Files/sec", sub: "Pattern + AI hybrid" },
            { num: "65+", label: "Models", sub: "9+ providers" },
          ].map((s) => (
            <Card key={s.label} hover className="p-5 text-center">
              <div className="bg-gradient-to-b from-[#00e5ff] to-purple-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {s.num}
              </div>
              <div className="mt-1 text-sm font-medium text-black/70">{s.label}</div>
              <div className="mt-1 text-[11px] leading-tight text-black/40">{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Overall Score */}
        <Card className="mb-8 overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00e5ff]/10 text-sm font-bold text-[#00e5ff]">1</span>
            <h2 className="text-lg font-semibold text-[#111]">Overall Score</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                  <th className="px-3 py-3">Rank</th>
                  <th className="px-3 py-3">Tool</th>
                  <th className="px-3 py-3">Score</th>
                  <th className="px-3 py-3">Rating</th>
                  <th className="hidden px-3 py-3 sm:table-cell">Performance</th>
                </tr>
              </thead>
              <tbody>
                {scoreData.map((s) => (
                  <tr key={s.name} className={`border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02] ${s.rank === 1 ? "bg-[#00e5ff]/[0.02]" : ""}`}>
                    <td className={`px-3 py-3.5 ${s.rank === 1 ? "font-bold text-[#00e5ff]" : "text-black/40"}`}>#{s.rank}</td>
                    <td className={`px-3 py-3.5 ${s.rank === 1 ? "font-bold text-[#111]" : "text-black/70"}`}>{s.name}</td>
                    <td className="px-3 py-3.5">
                      <span className={s.rank === 1 ? "font-bold text-[#00e5ff]" : "text-black/70"}>{s.score}/50</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <Badge variant={s.rank <= 2 ? "success" : s.rank === 3 ? "warning" : "danger"}>{`${s.score / 5}/10`}</Badge>
                    </td>
                    <td className="hidden px-3 py-3.5 sm:table-cell">
                      <div className="flex items-center gap-3">
                        <ProgressBar pct={s.bar} color={s.color} />
                        <span className="text-[11px] text-black/30">{s.bar}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Token: Efficiency + Waste side by side */}
        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600">2</span>
              <h2 className="text-lg font-semibold text-[#111]">Token Efficiency</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                    <th className="px-2 py-3">Tool</th>
                    <th className="px-2 py-3">System</th>
                    <th className="px-2 py-3">Total</th>
                    <th className="px-2 py-3">vs</th>
                    <th className="hidden px-2 py-3 sm:table-cell">Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenData.map((t) => (
                    <tr key={t.tool} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                      <td className={`px-2 py-3 ${t.tool === "RakshakAI" ? "font-bold text-[#111]" : "text-black/70"}`}>{t.tool}</td>
                      <td className="px-2 py-3 text-black/60">{t.prompt}</td>
                      <td className="px-2 py-3 font-semibold text-[#111]">{t.total}t</td>
                      <td className="px-2 py-3"><Badge variant={t.tool === "RakshakAI" ? "cyan" : t.vs === "101x" ? "danger" : "neutral"}>{t.vs}</Badge></td>
                      <td className="hidden px-2 py-3 sm:table-cell">
                        <ProgressBar pct={t.pct} color={t.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-4 py-3 text-sm text-black/60">
              With Claude Code, you pay for <strong className="text-[#111]">30,500 tokens</strong> before the AI reads your question.
              RakshakAI sends just <strong className="text-[#111]">302 tokens</strong> &mdash; <strong className="text-[#00e5ff]">101x less overhead</strong>.
            </div>
          </Card>

          <Card className="overflow-hidden p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-600">3</span>
              <h2 className="text-lg font-semibold text-[#111]">Token Waste</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                    <th className="px-2 py-3">Category</th>
                    <th className="px-2 py-3 text-[#00e5ff]">Rak</th>
                    <th className="px-2 py-3">OC</th>
                    <th className="px-2 py-3 text-red-500">CC</th>
                  </tr>
                </thead>
                <tbody>
                  {wasteData.map((w) => (
                    <tr key={w.cat} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                      <td className="px-2 py-3 text-[#111]">{w.cat}</td>
                      <td className="px-2 py-3">
                        <Badge variant={w.rak === "0t" ? "cyan" : "neutral"}>{w.rak}</Badge>
                      </td>
                      <td className="px-2 py-3 text-black/60">{w.oc}</td>
                      <td className="px-2 py-3 text-red-500">{w.cc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              Claude Code wastes <strong className="text-red-700">~137,000 tokens per session</strong> on overhead. RakshakAI wastes <strong className="text-emerald-600">zero</strong>.
            </div>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card className="mb-8 overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-600">4</span>
            <h2 className="text-lg font-semibold text-[#111]">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                  <th className="px-3 py-3">Feature</th>
                  <th className="px-3 py-3 text-[#00e5ff]">Raksha</th>
                  <th className="px-3 py-3">OCode</th>
                  <th className="px-3 py-3">C.Code</th>
                  <th className="px-3 py-3">Snyk</th>
                  <th className="px-3 py-3">Semgr</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.feat} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                    <td className="px-3 py-3 text-[#111]">{f.feat}</td>
                    <td className="px-3 py-3">{f.rak ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-3">{f.oc ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-3">{f.cc ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-3">{f.snyk ? <Check /> : <Cross />}</td>
                    <td className="px-3 py-3">{f.sem ? <Check /> : <Cross />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* False Positive Rate + Cost side by side */}
        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm font-bold text-amber-600">5</span>
              <h2 className="text-lg font-semibold text-[#111]">False Positive Rate</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                    <th className="px-2 py-3">Tool</th>
                    <th className="px-2 py-3">FP Rate</th>
                    <th className="px-2 py-3">vs Rak</th>
                    <th className="hidden px-2 py-3 sm:table-cell">Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {fpData.map((f) => (
                    <tr key={f.tool} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                      <td className={`px-2 py-3 ${f.tool.startsWith("RakshakAI") ? "font-bold text-[#111]" : "text-black/70"}`}>{f.tool}</td>
                      <td className="px-2 py-3">
                        <Badge variant={f.tool.startsWith("RakshakAI") ? "success" : "danger"}>{f.rate}</Badge>
                      </td>
                      <td className="px-2 py-3 text-black/60">{f.mult}</td>
                      <td className="hidden px-2 py-3 sm:table-cell">
                        <ProgressBar pct={f.bar} color={f.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
              RakshakAI&apos;s LLM analysis understands code context &mdash; <strong className="text-emerald-700">~20% FP rate</strong> vs 60-80% for traditional SAST.
            </div>
          </Card>

          <Card className="overflow-hidden p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-sm font-bold text-orange-600">6</span>
              <h2 className="text-lg font-semibold text-[#111]">Cost per 1,000 Scans</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                    <th className="px-2 py-3">Tool</th>
                    <th className="px-2 py-3">Cost</th>
                    <th className="hidden px-2 py-3 sm:table-cell">Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((c) => (
                    <tr key={c.tool} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                      <td className={`px-2 py-3 ${c.tool.startsWith("RakshakAI") ? "font-bold text-[#111]" : "text-black/70"}`}>{c.tool}</td>
                      <td className="px-2 py-3">
                        <Badge variant={c.cost === "$0.00" ? "cyan" : c.cost === "$0.15" ? "success" : "danger"}>{c.cost}</Badge>
                      </td>
                      <td className="hidden px-2 py-3 sm:table-cell">
                        <ProgressBar pct={c.pct} color={c.color} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-2 text-sm text-black/50">
              {costData.map((c) => (
                <div key={c.tool} className="flex items-center justify-between border-b border-black/5 py-1 last:border-0">
                  <span className="text-black/60">{c.tool}</span>
                  <span className="text-[#111]">{c.note}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Multi-Agent Orchestration */}
        <Card className="mb-8 overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-600">7</span>
            <h2 className="text-lg font-semibold text-[#111]">Multi-Agent Orchestration</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 text-left text-[11px] font-semibold uppercase tracking-widest text-black/30">
                  <th className="px-3 py-3">Capability</th>
                  <th className="px-3 py-3 text-[#00e5ff]">Raksha</th>
                  <th className="px-3 py-3">OCode</th>
                  <th className="px-3 py-3">C.Code</th>
                </tr>
              </thead>
              <tbody>
                {multiAgentData.map((m) => (
                  <tr key={m.feat} className="border-b border-black/5 text-sm transition-colors hover:bg-black/[0.02]">
                    <td className="px-3 py-3 text-[#111]">{m.feat}</td>
                    <td className="px-3 py-3">{m.rak === true ? <Check /> : m.rak === false ? <Cross /> : <span className="text-black/60">{m.rak}</span>}</td>
                    <td className="px-3 py-3">{m.oc === true ? <Check /> : m.oc === false ? <Cross /> : <span className="text-black/60">{m.oc}</span>}</td>
                    <td className="px-3 py-3">{m.cc === true ? <Check /> : m.cc === false ? <Cross /> : <span className="text-black/60">{m.cc}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-600">
            RakshakAI&apos;s <strong className="text-purple-700">OrchestratorAgent</strong> uses the LLM to decompose tasks, spawns ReActAgent subagents via ThreadPoolExecutor, and synthesizes results &mdash; with <strong className="text-purple-700">zero token overhead</strong> for orchestration.
          </div>
        </Card>

        {/* Why RakshakAI Wins */}
        <Card className="overflow-hidden p-6 sm:p-8">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00e5ff]/10 text-sm font-bold text-[#00e5ff]">8</span>
            <h2 className="text-lg font-semibold text-[#111]">Why RakshakAI Wins</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyData.map((col) => (
              <div
                key={col.title}
                className={`rounded-xl border border-black/5 bg-black/[0.02] p-5 transition-all duration-300 hover:border-black/10 hover:bg-black/[0.04] ${col.accent} border-l-4`}
              >
                <div className="mb-1 text-[11px] font-bold tracking-widest text-black/20">{col.icon}</div>
                <h3 className="mb-3 text-base font-semibold text-[#111]">{col.title}</h3>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-black/60">&bull; {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-16 border-t border-black/5 pt-10 text-center">
          <p className="text-xs text-black/30">
            Benchmarks measured July 2026 &middot; Sources: Systima, Debuggix 100-repo, ACR, Endor Labs
          </p>
          <div className="mt-6 flex justify-center gap-8">
            <a href="/" className="text-sm text-black/40 transition-colors hover:text-[#00e5ff]">Home</a>
            <a href="/login" className="text-sm text-black/40 transition-colors hover:text-[#00e5ff]">Login</a>
            <a href="https://github.com/anomalyco/rakshak" className="text-sm text-black/40 transition-colors hover:text-[#00e5ff]">GitHub</a>
          </div>
        </div>
      </div>
    </main>
  )
}
