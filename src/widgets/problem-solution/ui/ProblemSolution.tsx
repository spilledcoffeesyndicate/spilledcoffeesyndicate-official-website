'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { PROBLEM_ITEMS, SOLUTION_ITEMS } from '@/entities/problem-solution';
import { GradientText, PixelBlast, SpotlightCard } from '@/shared/ui';

export function ProblemSolution() {
  return (
    <PixelBlast className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Built for founders who move fast
            </GradientText>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">The old way of building MVPs is broken. We fixed it.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col">
            <h3 className="text-xl font-mono tracking-tight text-red-400/90 mb-4">The problem</h3>
            <SpotlightCard
              spotlightColor="rgba(239, 68, 68, 0.1)"
              className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5 flex-1 min-h-[280px] flex flex-col"
            >
              <ul className="space-y-5 flex-1">
                {PROBLEM_ITEMS.map((problem) => (
                  <li key={problem.title} className="flex items-start gap-3">
                    <XCircle className="text-red-400 mt-0.5 shrink-0 w-5 h-5" strokeWidth={2} />
                    <div>
                      <span className="font-medium text-white">{problem.title}</span>
                      <p className="text-white/70 text-sm mt-0.5">{problem.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col">
            <h3 className="text-xl font-mono tracking-tight text-accent-400 mb-4">Our solution</h3>
            <SpotlightCard
              spotlightColor="rgba(34, 197, 94, 0.15)"
              className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5 flex-1 min-h-[280px] flex flex-col"
            >
              <ul className="space-y-5 flex-1">
                {SOLUTION_ITEMS.map((solution) => (
                  <li key={solution.title} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent-400 mt-0.5 shrink-0 w-5 h-5" strokeWidth={2} />
                    <div>
                      <span className="font-medium text-white">{solution.title}</span>
                      <p className="text-white/70 text-sm mt-0.5">{solution.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </PixelBlast>
  );
}
