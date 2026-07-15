"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import GridPattern from "@/components/benchmark/GridPattern"
import AnimatedArrow from "@/components/benchmark/AnimatedArrow"

export default function HeroCanvas() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(`${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`)
    }
    update()
    const iv = setInterval(update, 60000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FAFAFA]">
      <GridPattern gridSize={80} />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Center content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#00e5ff]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            CLI · Web · VS Code — Pre-Release · July 22
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-heading text-[14vw] font-bold leading-none tracking-tight text-[#111] md:text-[10vw]"
          >
            Security That
            <br />
            <span className="bg-gradient-to-r from-[#00e5ff] via-purple-500 to-pink-500 bg-clip-text text-transparent">Watches</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-black/40 md:text-lg"
          >
            150+ vulnerability patterns, 65+ AI models, offline scanner, multi-agent swarm — all from a single CLI
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <a
              href="#install"
              className="group inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/5 px-7 py-2.5 font-body text-sm font-medium text-[#00e5ff] transition-all duration-300 hover:bg-[#00e5ff] hover:text-white"
            >
              Install Now
              <AnimatedArrow />
            </a>
            <a
              href="/benchmark"
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-2.5 font-body text-sm text-black/50 transition-all duration-300 hover:border-black/30 hover:text-[#111]"
            >
              View Benchmarks
              <AnimatedArrow />
            </a>
            <a
              href="/scanner"
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-2.5 font-body text-sm text-black/50 transition-all duration-300 hover:border-black/30 hover:text-[#111]"
            >
              Try Web Scanner
              <AnimatedArrow />
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-black/5 px-8 py-4 text-xs text-black/25">
          <span>{time}</span>
          <span className="hidden sm:inline">MIT License — Open Source</span>
          <span>v1.4.x</span>
        </div>
      </div>
    </section>
  )
}
