'use client';

import { useMemo, type HTMLAttributes, type ReactNode } from 'react';

type PixelBlastProps = HTMLAttributes<HTMLDivElement> & {
  color?: string;
  pixelCount?: number;
  children?: ReactNode;
};

export function PixelBlast({ className = '', color = 'rgba(34, 197, 94, 0.2)', pixelCount = 120, children, ...props }: PixelBlastProps) {
  const pixels = useMemo(() => {
    const hash = (value: number) => ((value * 2654435761) % 2147483647) / 2147483647;
    return Array.from({ length: pixelCount }, (_, index) => ({
      id: index,
      size: 2 + hash(index) * 3,
      x: hash(index + 1) * 100,
      y: hash(index + 2) * 100,
      delay: hash(index + 3) * 3,
      duration: 2 + hash(index + 4) * 4,
    }));
  }, [pixelCount]);

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 90% 60% at 50% 40%, ${color} 0%, transparent 60%)` }}
        />
        <div className="absolute inset-0">
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              className="absolute rounded-sm animate-pixel-pulse"
              style={{
                left: `${pixel.x}%`,
                top: `${pixel.y}%`,
                width: pixel.size,
                height: pixel.size,
                backgroundColor: color,
                animationDelay: `${pixel.delay}s`,
                animationDuration: `${pixel.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
