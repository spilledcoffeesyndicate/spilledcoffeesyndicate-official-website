'use client';

import { motion } from 'framer-motion';

export function SocialProof() {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-12 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">How we work</p>
            <p className="text-white/90 text-lg">Transparent scope · Fixed deliverables · No surprise charges</p>
          </div>
          <div className="flex items-center gap-6 text-white/50">
            <span className="font-mono text-accent-400">React</span>
            <span>·</span>
            <span className="font-mono text-accent-400">Next.js</span>
            <span>·</span>
            <span className="font-mono text-accent-400">TypeScript</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
