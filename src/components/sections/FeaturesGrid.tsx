"use client"

import Card from "@/components/benchmark/Card"
import Badge from "@/components/benchmark/Badge"

const features = [
  {
    title: "Offline-First Scanning",
    description: "150+ vulnerability patterns across 20+ languages — zero dependencies, no API key needed. Works fully offline.",
  },
  {
    title: "65+ AI Models",
    description: "OpenRouter, Google Gemini, DeepSeek, Mistral, xAI Grok, Perplexity, DeepInfra, AI/ML API — single CLI, zero config.",
  },
  {
    title: "Config & Infrastructure Scanning",
    description: "Detects misconfigurations in Docker, Kubernetes (RBAC, pod security), YAML, and INI files.",
  },
  {
    title: "Dependency CVE Scanning",
    description: "Scans package.json, requirements.txt, pom.xml for known vulnerable dependency versions.",
  },
  {
    title: "SQL Injection & XSS Detection",
    description: "Detects f-string concatenation, unsafe innerHTML, raw SQL queries across Python, JS, TS, Java, Go, PHP.",
  },
  {
    title: "Secret & Credential Detection",
    description: "Catches hardcoded passwords, API keys, AWS tokens, private keys, JWT secrets across ALL file types.",
  },
  {
    title: "Multi-Agent Swarm",
    description: "OrchestratorAgent decomposes tasks into parallel subagents — 5 agents run concurrently via ThreadPoolExecutor.",
  },
  {
    title: "One-Click Fixes via AI Chat",
    description: "Type /explain, /fix, /scan naturally. AI auto-detects patterns, suggests fixes, and explains vulnerabilities.",
  },
]

export default function FeaturesGrid() {
  return (
    <section id="features" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Badge variant="cyan" className="mb-6">Features</Badge>
          <h2 className="font-heading text-5xl font-bold leading-tight text-[#111] md:text-7xl">
            Everything You Need
            <br />
            to Stay Secure
          </h2>
          <p className="mt-4 text-base text-black/40">
            Rakshak watches your code so you don&apos;t have to
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} hover className="p-8">
              <h3 className="font-heading text-xl font-bold text-[#111]">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/50">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
