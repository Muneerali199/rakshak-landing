"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GridPattern from "@/components/benchmark/GridPattern";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#111] px-6 overflow-hidden">
      <GridPattern gridSize={80} dark />
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-8">
            <h1 className="font-heading text-5xl font-bold text-white">
              रक्षक
            </h1>
            <p className="mt-2 text-sm text-white/40">
              {submitted ? "You're on the list!" : "Get early access to RakshakAI"}
            </p>
          </div>

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
                First 1,000 users get 500 free AI scans — launching July 22.
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-white/20">
            No spam. We&apos;ll only email you about the launch.
          </p>

          <div className="mt-12">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-2.5 font-body text-sm text-white/40 transition-all hover:border-white/30 hover:text-white"
            >
              ← Back to home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
