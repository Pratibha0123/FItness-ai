// components/ui/tooltip.tsx
"use client";

import { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 text-white text-xs px-2 py-1 shadow-lg pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
}
