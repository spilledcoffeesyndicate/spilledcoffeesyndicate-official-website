import { type HTMLAttributes, type ReactNode, useEffect } from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FinalCta } from './FinalCta';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      whileInView: _whileInView,
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      viewport: _viewport,
      ...props
    }: HTMLAttributes<HTMLDivElement> & {
      whileInView?: unknown;
      initial?: unknown;
      animate?: unknown;
      exit?: unknown;
      transition?: unknown;
      viewport?: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

vi.mock('next/script', () => ({
  default: function MockScript({ onLoad }: { onLoad?: () => void }) {
    useEffect(() => {
      onLoad?.();
    }, [onLoad]);
    return null;
  },
}));

vi.mock('@/shared/ui', () => ({
  PixelBlast: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  GradientText: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);

  static triggerAll(isIntersecting: boolean) {
    const entry = { isIntersecting } as IntersectionObserverEntry;
    for (const instance of MockIntersectionObserver.instances) {
      instance.callback([entry], instance as unknown as IntersectionObserver);
    }
  }

  static reset() {
    MockIntersectionObserver.instances = [];
  }
}

describe('FinalCta', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    MockIntersectionObserver.reset();
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      value: MockIntersectionObserver,
    });
    Object.assign(window, {
      Calendly: {
        initInlineWidget: vi.fn(),
      },
    });
    Object.defineProperty(window, 'requestAnimationFrame', {
      configurable: true,
      writable: true,
      value: (callback: FrameRequestCallback) => setTimeout(() => callback(0), 0),
    });
    Object.defineProperty(window, 'cancelAnimationFrame', {
      configurable: true,
      writable: true,
      value: (id: number) => clearTimeout(id),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('starts Calendly only after section enters viewport and only once', () => {
    render(<FinalCta />);

    const initInlineWidget = (window as unknown as { Calendly: { initInlineWidget: ReturnType<typeof vi.fn> } }).Calendly.initInlineWidget;
    const widget = screen.getByTestId('calendly-widget');
    expect(initInlineWidget).not.toHaveBeenCalled();
    expect(widget).toHaveStyle({ height: '160px' });

    act(() => {
      MockIntersectionObserver.triggerAll(true);
      MockIntersectionObserver.triggerAll(true);
      vi.advanceTimersByTime(0);
    });

    expect(initInlineWidget).toHaveBeenCalledTimes(1);
    expect(widget).toHaveStyle({ height: '160px' });
  });

  it('keeps compact height until Calendly message and minimum delay pass', async () => {
    render(<FinalCta />);
    const widget = screen.getByTestId('calendly-widget');

    act(() => {
      MockIntersectionObserver.triggerAll(true);
      vi.advanceTimersByTime(0);
    });

    expect(widget).toHaveStyle({ height: '160px' });

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          origin: 'https://calendly.com',
          data: { event: 'calendly.profile_page_viewed' },
        })
      );
      vi.advanceTimersByTime(899);
    });

    expect(widget).toHaveStyle({ height: '160px' });

    act(() => {
      vi.advanceTimersByTime(1);
      vi.runOnlyPendingTimers();
    });

    expect(widget).toHaveStyle({ height: '980px' });
  });

  it('ignores irrelevant message and expands only by fallback timeout', async () => {
    render(<FinalCta />);
    const widget = screen.getByTestId('calendly-widget');
    const initInlineWidget = (window as unknown as { Calendly: { initInlineWidget: ReturnType<typeof vi.fn> } }).Calendly.initInlineWidget;

    act(() => {
      MockIntersectionObserver.triggerAll(true);
      vi.advanceTimersByTime(0);
    });

    expect(initInlineWidget).toHaveBeenCalledTimes(1);
    expect(widget).toHaveStyle({ height: '160px' });

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          origin: 'https://example.com',
          data: { event: 'calendly.profile_page_viewed' },
        })
      );
      vi.advanceTimersByTime(4999);
    });

    expect(widget).toHaveStyle({ height: '160px' });

    act(() => {
      vi.advanceTimersByTime(1);
      vi.runOnlyPendingTimers();
    });

    expect(widget).toHaveStyle({ height: '980px' });
  });

  it('renders #calendly anchor at section container with scroll offset class', () => {
    render(<FinalCta />);

    const anchorTarget = document.getElementById('calendly');
    expect(anchorTarget).toBeInTheDocument();
    expect(anchorTarget).toHaveClass('scroll-mt-24');
  });
});
