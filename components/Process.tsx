'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GradientText from './GradientText';
import SpotlightCard from './SpotlightCard';

const steps = [
  {
    day: 'Day 1',
    title: 'Discovery (2 hours)',
    items: ['Brief call to understand your vision', 'Define core features', 'Tech stack confirmation'],
    accent: true,
  },
  {
    day: 'Day 1–2',
    title: 'Development (46 hours)',
    items: ['Real-time progress updates', 'Daily check-ins', 'Live deployment'],
    accent: true,
  },
  {
    day: 'Day 2',
    title: 'Handoff',
    items: ['Code walkthrough', 'Documentation', '30-day support included'],
    accent: false,
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#a78bfa', '#c4b5fd', '#8b5cf6']} className="!cursor-default">
              How it works
            </GradientText>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            3-step process from brief to launch
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.15)"
                className={`!p-6 !rounded-lg !border !bg-transparent ${
                  step.accent ? '!border-accent-500/50 !bg-accent-950/20' : '!border-white/10 !bg-white/5'
                }`}
              >
                <div className="font-mono text-accent-400 text-sm mb-2">{step.day}</div>
                <h3 className="text-xl font-semibold font-mono tracking-tight mb-4">{step.title}</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <ArrowRight className="text-accent-400 w-4 h-4 shrink-0" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-white/20" />
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
