'use client';

import { motion } from 'framer-motion';
import { TECH_STACK_GROUPS } from '@/entities/tech-stack';
import { GradientText, SpotlightCard } from '@/shared/ui';

export function TechStack() {
  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Enterprise-grade tech stack
            </GradientText>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">Same technologies used by Netflix, Uber, Airbnb. No shortcuts.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.15)" className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5">
            <div className="flex flex-wrap justify-center gap-4">
              {TECH_STACK_GROUPS.flatMap((group) =>
                group.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 border border-white/20 rounded-full text-sm font-mono text-white/90 hover:border-accent-500/50 hover:text-accent-400 transition"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
