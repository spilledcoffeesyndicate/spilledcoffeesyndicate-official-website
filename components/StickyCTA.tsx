'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-black/95 border-t border-white/10 backdrop-blur"
        >
          <div className="flex gap-3">
            <a
              href="#calculator"
              className="flex-1 py-3 bg-white text-black font-mono text-sm text-center hover:bg-white/90 transition"
            >
              Get Estimate
            </a>
            <a
              href="#calendly"
              className="flex-1 py-3 border border-white text-white font-mono text-sm text-center hover:border-white transition"
            >
              Book Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
