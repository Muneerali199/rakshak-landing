"use client";

import { useEffect, useState } from "react";

const strings = [
  "Scanning 1,247 source files...",
  "SQL Injection — CWE-89 detected in auth.py:42",
  "Hardcoded Secret — CWE-798 exposed in config.yml",
  "XSS — CWE-79 vulnerability found in render.js:118",
  "Auto-patching 3 vulnerabilities with AI fix...",
  "All clear. 0 critical, 2 low, 1 info.",
];

export default function Typewriter() {
  const [stringIndex, setStringIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 50);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 20);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, stringIndex]);

  return (
    <p className="font-mono text-sm text-white/90 md:text-base leading-relaxed">
      {displayText}
      <span className="cursor-blink ml-0.5 text-rakshak-cyan font-light">_</span>
    </p>
  );
}
