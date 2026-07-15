"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const AUTH_URL = "http://localhost:8888";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register" | "success">("login");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "login" ? "/api/login" : "/api/register";
      const body: Record<string, string> = { email, password };
      if (mode === "register") body.name = name;

      const res = await fetch(`${AUTH_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong");
        setLoading(false);
        return;
      }

      setToken(data.token);
      setMode("success");
    } catch {
      setError("Cannot connect to auth server at " + AUTH_URL);
    }
    setLoading(false);
  };

  const copyToken = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (mode === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="rounded-[20px] border border-dashed border-black/10 bg-white p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className="font-heading text-2xl font-bold text-[#111]">Authenticated</h1>
              <p className="mt-2 text-sm text-black/40">
                Use this token in the CLI
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-mono text-xs text-black/30">TOKEN</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={token}
                  className="flex-1 rounded-[10px] border border-dashed border-black/10 bg-[#FAFAFA] px-3 py-2.5 font-mono text-xs text-rakshak-cyan outline-none"
                />
                <button
                  onClick={copyToken}
                  className="btn-dotted text-xs"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="rounded-[10px] border border-dashed border-black/5 bg-[#FAFAFA] p-4 font-mono text-xs text-black/40">
              <p className="mb-2 text-black/60">Then in your terminal:</p>
              <code className="block text-rakshak-cyan">rakshak token set {token.slice(0, 16)}...{token.slice(-8)}</code>
              <p className="mt-2 text-black/60">Or use the CLI login:</p>
              <code className="block text-rakshak-cyan">cd ~/Desktop/RakshakAI && python3 -m v2.cli.main</code>
              <code className="block text-rakshak-cyan mt-1">/login</code>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-[20px] border border-dashed border-black/10 bg-white p-8">
          <div className="mb-6 text-center">
            <h1 className="font-heading text-5xl font-bold text-[#111]">
              {mode === "login" ? "Sign In" : "Register"}
            </h1>
            <p className="mt-2 text-sm text-black/40">
              {mode === "login"
                ? "Connect your Rakshak account"
                : "Create a new account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="mb-1 block font-mono text-xs text-black/30">NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[10px] border border-dashed border-black/10 bg-[#FAFAFA] px-3 py-2.5 font-mono text-sm text-[#111] outline-none focus:border-black/30"
                  placeholder="Optional"
                />
              </div>
            )}
            <div>
              <label className="mb-1 block font-mono text-xs text-black/30">EMAIL</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[10px] border border-dashed border-black/10 bg-[#FAFAFA] px-3 py-2.5 font-mono text-sm text-[#111] outline-none focus:border-black/30"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-black/30">PASSWORD</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[10px] border border-dashed border-black/10 bg-[#FAFAFA] px-3 py-2.5 font-mono text-sm text-[#111] outline-none focus:border-black/30"
                placeholder="Min 8 characters"
              />
            </div>

            {error && (
              <div className="rounded-[10px] border border-dashed border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full border border-dotted border-black/30 px-6 py-3 font-body text-sm text-black/60 transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50"
            >
              {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              className="font-mono text-xs text-black/30 underline transition-colors hover:text-black"
            >
              {mode === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-4 border-t border-dashed border-black/5 pt-4 text-center">
            <a
              href={`${AUTH_URL}/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black/20 transition-colors hover:text-black/40"
            >
              Open auth server directly →
            </a>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-xs text-black/20">
          Auth server at {AUTH_URL}
        </p>
      </motion.div>
    </div>
  );
}
