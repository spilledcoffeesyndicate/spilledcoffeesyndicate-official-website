'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { BOOK_CALL_CTA, CALL_DURATION_MINUTES, EXTERNAL_LINKS } from '@/shared/config';
import { GradientText, PixelBlast } from '@/shared/ui';

export function FinalCta() {
  const calendlyUrl = `${EXTERNAL_LINKS.calendly}?background_color=1a1a1a&hide_gdpr_banner=1&text_color=4ade80&primary_color=22c55e`;
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);
  const calendlyWidgetRef = useRef<HTMLDivElement | null>(null);
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null);
  const skeletonShownAtRef = useRef<number>(0);

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

  useEffect(() => {
    const container = calendlyContainerRef.current;
    if (!container) {
      return;
    }
    skeletonShownAtRef.current = Date.now();
    let revealTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let iframeFallbackTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let activeIframe: HTMLIFrameElement | null = null;

    const revealCalendly = () => {
      const elapsedMs = Date.now() - skeletonShownAtRef.current;
      const minimumSkeletonMs = 600;
      const remainingMs = Math.max(minimumSkeletonMs - elapsedMs, 0);
      if (revealTimeoutId) {
        clearTimeout(revealTimeoutId);
      }
      revealTimeoutId = setTimeout(() => {
        setIsCalendlyReady(true);
      }, remainingMs);
    };

    const attachIframeListeners = () => {
      const iframe = container.querySelector('iframe');
      if (!iframe || iframe === activeIframe) {
        return;
      }
      activeIframe = iframe;
      activeIframe.addEventListener('load', revealCalendly, { once: true });
      if (iframeFallbackTimeoutId) {
        clearTimeout(iframeFallbackTimeoutId);
      }
      iframeFallbackTimeoutId = setTimeout(revealCalendly, 2500);
    };

    const observer = new MutationObserver(() => {
      attachIframeListeners();
    });

    observer.observe(container, { childList: true, subtree: true });
    initializeCalendlyWidget();
    attachIframeListeners();

    return () => {
      observer.disconnect();
      if (activeIframe) {
        activeIframe.removeEventListener('load', revealCalendly);
      }
      if (revealTimeoutId) {
        clearTimeout(revealTimeoutId);
      }
      if (iframeFallbackTimeoutId) {
        clearTimeout(iframeFallbackTimeoutId);
      }
    };
  }, [initializeCalendlyWidget]);

  return (
    <PixelBlast className="py-24">
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

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="calendly" className="mt-12">
        <div className="w-full max-w-6xl mx-auto">
          <div ref={calendlyContainerRef} className="relative">
            {isCalendlyReady ? null : (
              <div className="absolute inset-0 z-10 rounded-md border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="h-6 w-44 rounded bg-white/10 animate-pulse" />
                <div className="mt-8 h-10 w-full rounded bg-white/10 animate-pulse" />
                <div className="mt-5 h-10 w-full rounded bg-white/10 animate-pulse" />
                <div className="mt-5 h-40 w-full rounded bg-white/10 animate-pulse" />
              </div>
            )}
            <div
              ref={calendlyWidgetRef}
              className="calendly-inline-widget"
              data-url={calendlyUrl}
              style={{ width: '100%', minWidth: '0', height: '980px' }}
            />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" onLoad={initializeCalendlyWidget} />
          </div>
        </div>
      </motion.div>
    </PixelBlast>
  );
}
