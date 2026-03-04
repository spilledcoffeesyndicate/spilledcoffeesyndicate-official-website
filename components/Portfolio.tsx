'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Store, FileText } from 'lucide-react';
import GradientText from './GradientText';
import { PixelBlast } from './PixelBlast';
import SpotlightCard from './SpotlightCard';

const projects = [
  {
    title: 'SaaS Dashboard MVP',
    icon: LayoutDashboard,
    desc: 'Admin panel with auth, user management, and analytics. Delivered in 48h.',
    tech: ['React', 'Next.js', 'Supabase'],
    built: true,
  },
  {
    title: 'Marketplace MVP',
    icon: Store,
    desc: 'Two-sided marketplace with payments and real-time messaging.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    built: true,
  },
  {
    title: 'Landing + Lead Gen',
    icon: FileText,
    desc: 'High-conversion landing with calculator and Calendly integration.',
    tech: ['React', 'Tailwind', 'Vercel'],
    built: true,
  },
];

export function Portfolio() {
  return (
    <PixelBlast id="portfolio" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#a78bfa', '#c4b5fd', '#8b5cf6']} className="!cursor-default">
              Recent work
            </GradientText>
          </h2>
          <p className="text-white/70">
            Real projects. Real deadlines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.15)"
                className="group !p-6 !rounded-lg !border-white/10 hover:!border-accent-500/50 !bg-white/5 !transition-colors"
              >
                <div className="aspect-video bg-white/5 rounded mb-4 flex items-center justify-center">
                  <Icon className="w-16 h-16 text-white/30 group-hover:text-accent-500/50 transition" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-accent-400 text-xs mb-2">Built in 48 hours</div>
                <h3 className="font-semibold font-mono tracking-tight mb-2">{p.title}</h3>
                <p className="text-sm text-white/70 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs border border-white/20 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
          })}
        </div>
      </div>
    </PixelBlast>
  );
}
