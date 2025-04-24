"use client";

import { useEffect, useRef } from "react";

interface MathDisplayProps {
  math: string;
}

export default function MathDisplay({ math }: MathDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // This is where you would render math expressions
      // In a real app, you'd use a library like KaTeX or MathJax
      // For this example, we'll just display the raw text
      containerRef.current.innerHTML = math;
    }
  }, [math]);

  return <div ref={containerRef} className="math-display" />;
}
