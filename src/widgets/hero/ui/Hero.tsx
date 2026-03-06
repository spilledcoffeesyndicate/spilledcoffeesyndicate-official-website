'use client';

import { motion } from 'framer-motion';
import { BOOK_CALL_CTA, GET_FREE_ESTIMATE_CTA, MVP_DELIVERY_HOURS } from '@/shared/config';
import { ElectricBorder, Lightning } from '@/shared/ui';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Lightning hue={130} speed={0.5} intensity={0.5} size={0.8} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-accent-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-600/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent-400 font-mono text-sm uppercase tracking-wider mb-4"
        >
          Lightning Fast
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight mb-6"
        >
          MVP Development in <span className="text-accent-400 font-mono">{MVP_DELIVERY_HOURS} Hours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
        >
          We ship a launch-ready MVP with pre-agreed scope in {MVP_DELIVERY_HOURS} hours, so you can validate fast. Fixed price. No surprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <ElectricBorder color="#22c55e" borderRadius={4} className="inline-block">
            <a href="#calendly" className="block px-6 py-3 bg-transparent text-white font-mono font-medium hover:bg-white/10 transition border-0">
              {BOOK_CALL_CTA}
            </a>
          </ElectricBorder>
          <ElectricBorder color="#ffffff" borderRadius={4} className="inline-block">
            <a href="#calculator" className="block px-6 py-3 bg-white text-black font-mono font-medium hover:bg-white/90 transition">
              {GET_FREE_ESTIMATE_CTA}
            </a>
          </ElectricBorder>
        </motion.div>

      </div>
    </section>
  );
}
