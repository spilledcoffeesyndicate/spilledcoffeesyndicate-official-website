'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import GradientText from './GradientText';
import SpotlightCard from './SpotlightCard';

const faqs = [
  {
    q: 'Is 48 hours really enough?',
    a: 'Yes, for an MVP with 5–7 core features and pre-agreed scope. We define everything upfront during Discovery, so development is focused and efficient.',
  },
  {
    q: 'What if I need changes later?',
    a: '30-day support is included for bug fixes. After that, we offer hourly rates or phased updates. Change requests after scope freeze are quoted separately.',
  },
  {
    q: 'Who owns the code?',
    a: 'You get full ownership and repository access. Clean, documented code—yours to keep and extend.',
  },
  {
    q: 'What if the project takes longer?',
    a: 'Fixed scope. We define features upfront in the Discovery call. If scope grows, we split: v1 in 48h, the rest as phase 2 with a separate estimate.',
  },
  {
    q: 'Do you provide design?',
    a: 'Yes. We use modern UI with Tailwind and component libraries. Custom design beyond standard patterns can be quoted as an add-on.',
  },
  {
    q: 'What exactly can be built in 48 hours?',
    a: 'Landing + auth + core flow + basic admin/reporting. With a clear, agreed scope. Complex integrations or heavy custom logic may extend the timeline.',
  },
  {
    q: 'What happens if scope grows?',
    a: 'Scope split: v1 in 48h, the rest as phase 2 with a separate estimate. No surprise invoices.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#a78bfa', '#c4b5fd', '#8b5cf6']} className="!cursor-default">
              Frequently asked questions
            </GradientText>
          </h2>
          <p className="text-white/70">
            Everything you need to know before we start.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <SpotlightCard
                spotlightColor="rgba(139, 92, 246, 0.1)"
                className="!p-0 !rounded-lg !border !border-white/10 !bg-white/5 overflow-hidden"
              >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition"
              >
                <span className="font-medium">{faq.q}</span>
                <span className="text-accent-400">{open === i ? <Minus className="w-5 h-5" strokeWidth={2.5} /> : <Plus className="w-5 h-5" strokeWidth={2.5} />}</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-white/70 text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
