"use client";

import { useState } from "react";

interface LiveCodeDemoClientProps {
  vulnerableHtml: string;
  fixedHtml: string;
}

export default function LiveCodeDemoClient({
  vulnerableHtml,
  fixedHtml,
}: LiveCodeDemoClientProps) {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <section className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-body text-sm uppercase tracking-widest text-black/30">
            Demo
          </p>
          <h2 className="mt-4 font-heading text-5xl font-bold leading-tight text-[#111] md:text-7xl">
            See Rakshak in Action
          </h2>
        </div>

        <div className="relative min-h-[400px]">
          <div
            className="rounded-[20px] border border-dashed p-6 transition-all duration-500"
            style={{
              borderColor: isFixed ? "rgba(0,255,135,0.3)" : "rgba(255,59,48,0.3)",
              backgroundColor: isFixed ? "rgba(0,255,135,0.02)" : "rgba(255,59,48,0.02)",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-[#111]">
                {isFixed ? "Fixed by Rakshak" : "Vulnerable Code"}
              </h3>
              <span
                className={`rounded-full px-3 py-1 font-mono text-xs ${
                  isFixed
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {isFixed ? "✓ Secured" : "⚠ SQL Injection — Line 2"}
              </span>
            </div>
            <div
              className="shiki-wrapper [&_pre]:!bg-transparent"
              dangerouslySetInnerHTML={{
                __html: isFixed ? fixedHtml : vulnerableHtml,
              }}
            />
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsFixed(!isFixed)}
              className="btn-dotted"
            >
              {isFixed ? "Show Vulnerable" : "Apply Fix"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
