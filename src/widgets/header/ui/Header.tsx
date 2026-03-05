'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/shared/config';
import { useScrollThreshold } from '@/shared/lib';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollThreshold(80);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-lg tracking-tight">
          Spilled Coffee Syndicate
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('calculator')} className="text-sm text-white/80 hover:text-white transition">
            Pricing
          </button>
          <button onClick={() => scrollTo('process')} className="text-sm text-white/80 hover:text-white transition">
            Process
          </button>
          <button onClick={() => scrollTo('portfolio')} className="text-sm text-white/80 hover:text-white transition">
            Portfolio
          </button>
          <button onClick={() => scrollTo('faq')} className="text-sm text-white/80 hover:text-white transition">
            FAQ
          </button>
          <a href="#estimate" className="px-4 py-2 bg-white text-black font-mono text-sm hover:bg-white/90 transition">
            GET FREE ESTIMATE
          </a>
          <a href={EXTERNAL_LINKS.calendly} className="px-4 py-2 border border-white/50 text-white font-mono text-sm hover:border-white transition">
            BOOK CALL
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <a href="#estimate" className="px-4 py-2 bg-white text-black font-mono text-xs hover:bg-white/90 transition">
            ESTIMATE
          </a>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 text-white rounded-md hover:bg-white/10 transition"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10"
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              <button onClick={() => scrollTo('calculator')} className="text-left text-white/80">
                Pricing
              </button>
              <button onClick={() => scrollTo('process')} className="text-left text-white/80">
                Process
              </button>
              <button onClick={() => scrollTo('portfolio')} className="text-left text-white/80">
                Portfolio
              </button>
              <button onClick={() => scrollTo('faq')} className="text-left text-white/80">
                FAQ
              </button>
              <a href={EXTERNAL_LINKS.calendly} className="text-left text-white/80">
                Book 15-min Call
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
