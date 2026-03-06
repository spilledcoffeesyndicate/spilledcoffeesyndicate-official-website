'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '@/entities/portfolio';
import { MVP_DELIVERY_HOURS } from '@/shared/config';
import { GradientText, PixelBlast, SpotlightCard } from '@/shared/ui';

export function Portfolio() {
  return (
    <PixelBlast id="portfolio" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Recent work
            </GradientText>
          </h2>
          <p className="text-white/70">Real projects. Real deadlines.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div key={project.title}>
                <SpotlightCard
                  spotlightColor="rgba(34, 197, 94, 0.15)"
                  className="group !p-6 !rounded-lg !border-white/10 hover:!border-accent-500/50 !bg-white/5 !transition-colors"
                >
                  <div className="aspect-video bg-white/5 rounded mb-4 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white/30 group-hover:text-accent-500/50 transition" strokeWidth={1.5} />
                  </div>
                  <div className="font-mono text-accent-400 text-xs mb-2">Built in {MVP_DELIVERY_HOURS} hours</div>
                  <h3 className="font-semibold font-mono tracking-tight mb-2">{project.title}</h3>
                  <p className="text-sm text-white/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span key={item} className="px-2 py-1 text-xs border border-white/20 rounded font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </motion.div>
      </div>
    </PixelBlast>
  );
}
