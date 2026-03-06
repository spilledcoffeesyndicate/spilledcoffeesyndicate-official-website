'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { BOOK_CALL_CTA, CALL_DURATION_MINUTES, EXTERNAL_LINKS } from '@/shared/config';
import { GradientText, PixelBlast } from '@/shared/ui';

const CALENDLY_MINIMUM_COMPACT_MS = 900;
const CALENDLY_REVEAL_FALLBACK_MS = 5000;
const CALENDLY_VIEWPORT_PRELOAD_MARGIN = '200px 0px';
const CALENDLY_COMPACT_HEIGHT_PX = 160;
const CALENDLY_READY_HEIGHT_PX = 980;

type CalendlyMessagePayload = {
  event?: string;
};

const CALENDLY_READY_EVENTS = new Set([
  'calendly.profile_page_viewed',
  'calendly.event_type_viewed',
  'calendly.page_height',
]);

function isCalendlyMessageOrigin(origin: string) {
  try {
    const parsedOrigin = new URL(origin);
    return parsedOrigin.hostname === 'calendly.com' || parsedOrigin.hostname.endsWith('.calendly.com');
  } catch {
    return false;
  }
}

function runOnNextFrame(callback: () => void) {
  const requestAnimationFrame = typeof window.requestAnimationFrame === 'function' ? window.requestAnimationFrame.bind(window) : null;
  const cancelAnimationFrame = typeof window.cancelAnimationFrame === 'function' ? window.cancelAnimationFrame.bind(window) : null;

  if (requestAnimationFrame && cancelAnimationFrame) {
    const frameId = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(frameId);
  }

  const timeoutId = window.setTimeout(callback, 0);
  return () => window.clearTimeout(timeoutId);
}

export function FinalCta() {
  const calendlyUrl = `${EXTERNAL_LINKS.calendly}?background_color=1a1a1a&hide_gdpr_banner=1&text_color=4ade80&primary_color=22c55e`;
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);
  const [isCalendlyScriptLoaded, setIsCalendlyScriptLoaded] = useState(false);
  const calendlyWidgetRef = useRef<HTMLDivElement | null>(null);
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null);
  const compactShownAtRef = useRef<number>(0);
  const hasCalendlyStartedRef = useRef(false);
  const hasCalendlyEnteredViewportRef = useRef(false);
  const revealTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealFallbackTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initializeCalendlyWidget = useCallback(() => {
    const calendlyWidget = calendlyWidgetRef.current;
    const calendly = (window as Window & { Calendly?: { initInlineWidget: (options: { url: string; parentElement: Element }) => void } }).Calendly;
    if (!calendlyWidget || !calendly) {
      return;
    }

    calendlyWidget.innerHTML = '';
    calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendlyWidget,
    });
  }, [calendlyUrl]);

  const revealCalendly = useCallback(() => {
    if (compactShownAtRef.current === 0 || isCalendlyReady) {
      return;
    }

    const elapsedMs = Date.now() - compactShownAtRef.current;
    const remainingMs = Math.max(CALENDLY_MINIMUM_COMPACT_MS - elapsedMs, 0);
    if (revealTimeoutIdRef.current) {
      clearTimeout(revealTimeoutIdRef.current);
    }

    revealTimeoutIdRef.current = setTimeout(() => {
      setIsCalendlyReady(true);
    }, remainingMs);
  }, [isCalendlyReady]);

  const startCalendlyLoading = useCallback(() => {
    if (!isCalendlyScriptLoaded || hasCalendlyStartedRef.current) {
      return;
    }

    hasCalendlyStartedRef.current = true;
    compactShownAtRef.current = Date.now();
    initializeCalendlyWidget();

    if (revealFallbackTimeoutIdRef.current) {
      clearTimeout(revealFallbackTimeoutIdRef.current);
    }
    revealFallbackTimeoutIdRef.current = setTimeout(revealCalendly, CALENDLY_REVEAL_FALLBACK_MS);
  }, [initializeCalendlyWidget, isCalendlyScriptLoaded, revealCalendly]);

  useEffect(() => {
    const container = calendlyContainerRef.current;
    if (!container) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      hasCalendlyEnteredViewportRef.current = true;
      return runOnNextFrame(() => {
        startCalendlyLoading();
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        hasCalendlyEnteredViewportRef.current = true;
        startCalendlyLoading();
        observer.disconnect();
      },
      { rootMargin: CALENDLY_VIEWPORT_PRELOAD_MARGIN }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [startCalendlyLoading]);

  useEffect(() => {
    if (!hasCalendlyEnteredViewportRef.current) {
      return;
    }
    return runOnNextFrame(() => {
      startCalendlyLoading();
    });
  }, [isCalendlyScriptLoaded, startCalendlyLoading]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<CalendlyMessagePayload>) => {
      if (!isCalendlyMessageOrigin(event.origin)) {
        return;
      }

      const calendlyEvent = event.data?.event;
      if (!calendlyEvent || !CALENDLY_READY_EVENTS.has(calendlyEvent)) {
        return;
      }

      revealCalendly();
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [revealCalendly]);

  useEffect(() => {
    return () => {
      if (revealTimeoutIdRef.current) {
        clearTimeout(revealTimeoutIdRef.current);
      }
      if (revealFallbackTimeoutIdRef.current) {
        clearTimeout(revealFallbackTimeoutIdRef.current);
      }
    };
  }, []);

  return (
    <PixelBlast id="calendly" className="py-24 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-6">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Ready to launch your MVP?
            </GradientText>
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Get a free estimate or book a {CALL_DURATION_MINUTES}-min call. No upfront payment required. Cancel anytime before we start.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#calculator" className="px-6 py-3 bg-white text-black font-mono font-medium hover:bg-white/90 transition">
              Calculate Price
            </a>
            <a href="#calendly" className="px-6 py-3 border-2 border-white text-white font-mono font-medium hover:bg-white/10 transition">
              {BOOK_CALL_CTA}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span>No upfront payment required</span>
            <span>·</span>
            <span>Cancel anytime before we start</span>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
        <div className="w-full max-w-6xl mx-auto">
          <div ref={calendlyContainerRef} className="relative">
            <div
              ref={calendlyWidgetRef}
              data-testid="calendly-widget"
              className="calendly-inline-widget"
              data-url={calendlyUrl}
              style={{ width: '100%', minWidth: '0', height: `${isCalendlyReady ? CALENDLY_READY_HEIGHT_PX : CALENDLY_COMPACT_HEIGHT_PX}px` }}
            />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" onLoad={() => setIsCalendlyScriptLoaded(true)} />
          </div>
        </div>
      </motion.div>
    </PixelBlast>
  );
}
