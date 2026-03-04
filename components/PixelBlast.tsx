'use client';

import { useMemo } from 'react';

interface PixelBlastProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  pixelCount?: number;
  children?: React.ReactNode;
}

export function PixelBlast({ className = '', color = 'rgba(139, 92, 246, 0.2)', pixelCount = 120, children, ...props }: PixelBlastProps) {
  const pixels = useMemo(() => {
    const hash = (n: number) => ((n * 2654435761) % 2147483647) / 2147483647;
    return Array.from({ length: pixelCount }, (_, i) => ({
      id: i,
      size: 2 + hash(i) * 3,
      x: hash(i + 1) * 100,
      y: hash(i + 2) * 100,
      delay: hash(i + 3) * 3,
      duration: 2 + hash(i + 4) * 4,
    }));
  }, [pixelCount]);

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 60% at 50% 40%, ${color} 0%, transparent 60%)` }} />
        <div className="absolute inset-0">
          {pixels.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-sm animate-pixel-pulse"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
