'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BOOK_CALL_SHORT_CTA, EXTERNAL_LINKS } from '@/shared/config';
import { useScrollThreshold } from '@/shared/lib';

export function StickyCta() {
  const isVisible = useScrollThreshold(400);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-black/95 border-t border-white/10 backdrop-blur"
        >
          <div className="flex gap-3">
            <a href="#calculator" className="flex-1 py-3 bg-white text-black font-mono text-sm text-center hover:bg-white/90 transition">
              Get Estimate
            </a>
            <a href={EXTERNAL_LINKS.calendly} className="flex-1 py-3 border border-white text-white font-mono text-sm text-center hover:border-white transition">
              {BOOK_CALL_SHORT_CTA}
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
