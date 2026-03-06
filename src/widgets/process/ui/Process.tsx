'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '@/entities/process';
import { GradientText, SpotlightCard } from '@/shared/ui';

export function Process() {
  return (
    <section id="process" className="py-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              How it works
            </GradientText>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">3-step process from brief to launch</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.title} className="relative">
              <SpotlightCard
                spotlightColor="rgba(34, 197, 94, 0.15)"
                className={`!p-6 !rounded-lg !border !bg-transparent ${
                  step.isAccent ? '!border-accent-500/50 !bg-accent-950/20' : '!border-white/10 !bg-white/5'
                }`}
              >
                <div className="font-mono text-accent-400 text-sm mb-2">{step.day}</div>
                <h3 className="text-xl font-semibold font-mono tracking-tight mb-4">{step.title}</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ArrowRight className="text-accent-400 w-4 h-4 shrink-0" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
                {index < PROCESS_STEPS.length - 1 ? <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/20" /> : null}
              </SpotlightCard>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
