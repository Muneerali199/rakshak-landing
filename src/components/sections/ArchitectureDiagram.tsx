"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Badge from "@/components/benchmark/Badge"
import Card from "@/components/benchmark/Card"

const nodes = [
  { id: "editor", label: "VS Code Editor", x: 200, y: 40, description: "Your development environment where code is written in real-time." },
  { id: "scanner", label: "Real-time Scanner", x: 80, y: 180, description: "Analyzes code on every keystroke with intelligent debouncing." },
  { id: "diagnostic", label: "Diagnostic Provider", x: 320, y: 180, description: "Surfaces vulnerabilities as inline warnings and squiggles." },
  { id: "hover", label: "Hover Provider", x: 520, y: 180, description: "Shows detailed fix suggestions on hover over flagged code." },
  { id: "api", label: "Backend API :3000", x: 200, y: 320, description: "Local REST API that coordinates scanning and fix application." },
  { id: "ai", label: "Rakshak AI Engine", x: 200, y: 460, description: "ML-powered vulnerability detection trained on millions of code samples." },
]

const connections = [
  { from: "editor", to: "scanner", path: "M200,80 L80,160" },
  { from: "scanner", to: "diagnostic", path: "M130,180 L290,180" },
  { from: "diagnostic", to: "hover", path: "M390,180 L490,180" },
  { from: "scanner", to: "api", path: "M110,210 L180,300" },
  { from: "api", to: "ai", path: "M200,360 L200,440" },
]

export default function ArchitectureDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNode = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <section className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Badge variant="cyan" className="mb-6">System</Badge>
          <h2 className="font-heading text-5xl font-bold leading-tight text-[#111] md:text-7xl">
            Architecture
          </h2>
          <p className="mt-4 text-base text-black/40">
            How Rakshak fits into your development workflow
          </p>
        </div>

        <Card className="p-6 md:p-10">
          <svg viewBox="0 0 640 540" className="mx-auto w-full max-w-2xl" style={{ minWidth: 320 }}>
            {connections.map((conn, i) => (
              <g key={i}>
                <path d={conn.path} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" strokeDasharray="8 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
                </path>
                <circle r="4" fill="#111">
                  <animateMotion dur="2s" repeatCount="indefinite" path={conn.path} />
                </circle>
              </g>
            ))}
            {nodes.map((node) => (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x - 90}
                  y={node.y - 24}
                  width="180"
                  height="48"
                  rx="12"
                  fill={hoveredNode === node.id ? "#00e5ff" : "#FAFAFA"}
                  stroke={hoveredNode === node.id ? "#00e5ff" : "rgba(0,0,0,0.1)"}
                  strokeWidth={hoveredNode === node.id ? 2 : 1}
                  style={{ transition: "all 0.3s" }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={hoveredNode === node.id ? "#fff" : "#111"}
                  fontSize="11"
                  fontFamily="var(--font-jetbrains-mono)"
                  style={{ transition: "color 0.3s" }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-6 max-w-md rounded-xl border border-black/10 bg-[#FAFAFA] p-4 text-center"
            >
              <p className="font-semibold text-[#111]">{getNode(hoveredNode).label}</p>
              <p className="mt-1 text-sm text-black/40">{getNode(hoveredNode).description}</p>
            </motion.div>
          )}
        </Card>
      </div>
    </section>
  )
}
