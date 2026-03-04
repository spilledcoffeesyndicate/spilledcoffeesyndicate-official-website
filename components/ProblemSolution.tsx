'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import GradientText from './GradientText';
import { PixelBlast } from './PixelBlast';
import SpotlightCard from './SpotlightCard';

const problems = [
  { title: 'Development agencies take months', desc: 'Weeks of discovery, months of waiting' },
  { title: 'Freelancers are unreliable', desc: 'Ghosted mid-project, quality varies' },
  { title: 'Hiring developers is expensive', desc: 'Full-time salaries, long hiring cycles' },
  { title: 'No-code tools are limited', desc: 'Custom logic? Good luck' },
];

const solutions = [
  { title: '48-hour delivery', desc: 'Pre-agreed scope, delivered on time' },
  { title: 'Fixed-price packages', desc: 'No hidden fees, zero surprises' },
  { title: 'Production-ready code', desc: 'Clean, documented, maintainable' },
  { title: 'Scalable architecture', desc: 'Built for growth from day one' },
];

export function ProblemSolution() {
  return (
    <PixelBlast className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#a78bfa', '#c4b5fd', '#8b5cf6']} className="!cursor-default">
              Built for founders who move fast
            </GradientText>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The old way of building MVPs is broken. We fixed it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-xl font-mono tracking-tight text-red-400/90 mb-4">The problem</h3>
            <SpotlightCard
              spotlightColor="rgba(239, 68, 68, 0.1)"
              className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5 flex-1 min-h-[280px] flex flex-col"
            >
              <ul className="space-y-5 flex-1">
                {problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="text-red-400 mt-0.5 shrink-0 w-5 h-5" strokeWidth={2} />
                    <div>
                      <span className="font-medium text-white">{p.title}</span>
                      <p className="text-white/70 text-sm mt-0.5">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-xl font-mono tracking-tight text-accent-400 mb-4">Our solution</h3>
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.15)"
              className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5 flex-1 min-h-[280px] flex flex-col"
            >
              <ul className="space-y-5 flex-1">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent-400 mt-0.5 shrink-0 w-5 h-5" strokeWidth={2} />
                    <div>
                      <span className="font-medium text-white">{s.title}</span>
                      <p className="text-white/70 text-sm mt-0.5">{s.desc}</p>
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
