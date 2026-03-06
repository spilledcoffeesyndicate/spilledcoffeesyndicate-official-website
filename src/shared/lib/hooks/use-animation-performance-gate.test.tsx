import { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAnimationPerformanceGate } from './use-animation-performance-gate';

type TestIntersectionObserverEntry = Pick<IntersectionObserverEntry, 'isIntersecting'>;

class MockIntersectionObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe() {
    this.callback([{ isIntersecting: true } as TestIntersectionObserverEntry as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }

  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

function setupBrowserMocks({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? prefersReducedMotion : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => 'visible',
  });

  Object.defineProperty(window.navigator, 'hardwareConcurrency', {
    configurable: true,
    value: 8,
  });

  Object.defineProperty(window.navigator, 'deviceMemory', {
    configurable: true,
    value: 8,
  });

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    configurable: true,
    value: MockIntersectionObserver,
  });
}

function HookProbe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useAnimationPerformanceGate({ targetRef: ref });

  return (
    <div ref={ref}>
      <span data-testid="should-animate">{String(state.shouldAnimate)}</span>
      <span data-testid="prefers-reduced-motion">{String(state.prefersReducedMotion)}</span>
    </div>
  );
}

describe('useAnimationPerformanceGate', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('enables animation when element is visible and no reduction is requested', async () => {
    setupBrowserMocks({ prefersReducedMotion: false });
    render(<HookProbe />);

    await waitFor(() => {
      expect(screen.getByTestId('should-animate')).toHaveTextContent('true');
      expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('false');
    });
  });

  it('disables animation when reduced motion is requested', async () => {
    setupBrowserMocks({ prefersReducedMotion: true });
    render(<HookProbe />);

    await waitFor(() => {
      expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('true');
      expect(screen.getByTestId('should-animate')).toHaveTextContent('false');
    });
  });
});
