'use client';

import { useEffect, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { useAnimationPerformanceGate } from '@/shared/lib';

type PixelBlastProps = HTMLAttributes<HTMLDivElement> & {
  color?: string;
  pixelCount?: number;
  children?: ReactNode;
};

export function PixelBlast({ className = '', color = 'rgba(34, 197, 94, 0.2)', pixelCount = 120, children, ...props }: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => (typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false)
  );
  const { shouldAnimate, isInView, isPageVisible, prefersReducedMotion, isLowPerformanceDevice } = useAnimationPerformanceGate({
    targetRef: containerRef,
    rootMargin: '200px',
    disableLowPerformanceGate: true,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const onChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  const effectivePixelCount = useMemo(() => {
    if (!isInView || !isPageVisible) return 0;
    if (prefersReducedMotion) return Math.min(pixelCount, 16);
    if (isLowPerformanceDevice) return Math.min(pixelCount, 40);
    if (isMobileViewport) return Math.min(pixelCount, 72);
    return pixelCount;
  }, [isInView, isLowPerformanceDevice, isMobileViewport, isPageVisible, pixelCount, prefersReducedMotion]);

  const pixels = useMemo(() => {
    const hash = (value: number) => ((value * 2654435761) % 2147483647) / 2147483647;
    return Array.from({ length: effectivePixelCount }, (_, index) => ({
      id: index,
      size: 2 + hash(index) * 3,
      x: hash(index + 1) * 100,
      y: hash(index + 2) * 100,
      delay: hash(index + 3) * 3,
      duration: 2 + hash(index + 4) * 4,
    }));
  }, [effectivePixelCount]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} {...props}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 90% 60% at 50% 40%, ${color} 0%, transparent 60%)` }}
        />
        <div className="absolute inset-0">
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              className={`absolute rounded-sm ${shouldAnimate ? 'animate-pixel-pulse' : ''}`}
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
