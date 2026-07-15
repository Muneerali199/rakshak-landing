"use client"

export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-bold text-[#111]">रक्षक</p>
            <p className="mt-2 text-sm leading-relaxed text-black/40">AI-Powered Security Scanner for VS Code. Open source, free, and built for every developer.</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/20">Product</p>
            <div className="flex flex-col gap-2 text-sm text-black/50">
              <a href="#features" className="transition-colors hover:text-[#00e5ff]">Features</a>
              <a href="/docs" className="transition-colors hover:text-[#00e5ff]">Documentation</a>
              <a href="/benchmark" className="transition-colors hover:text-[#00e5ff]">Benchmarks</a>
              <a href="#install" className="transition-colors hover:text-[#00e5ff]">Install</a>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/20">Community</p>
            <div className="flex flex-col gap-2 text-sm text-black/50">
              <a href="https://github.com" className="transition-colors hover:text-[#00e5ff]">GitHub</a>
              <a href="#" className="transition-colors hover:text-[#00e5ff]">Issues</a>
              <a href="/docs" className="transition-colors hover:text-[#00e5ff]">Documentation</a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-black/5 pt-6 text-center text-xs text-black/30">
          MIT License — Open Source
        </div>
      </div>
    </footer>
  )
}
