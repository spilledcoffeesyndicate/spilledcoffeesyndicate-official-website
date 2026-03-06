'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { FAQ_ITEMS } from '@/entities/faq';
import { GradientText, SpotlightCard } from '@/shared/ui';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Frequently asked questions
            </GradientText>
          </h2>
          <p className="text-white/70">Everything you need to know before we start.</p>
        </motion.div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <motion.div key={faq.question} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden">
              <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.1)" className="!p-0 !rounded-lg !border !border-white/10 !bg-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition"
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-accent-400">
                    {openIndex === index ? <Minus className="w-5 h-5" strokeWidth={2.5} /> : <Plus className="w-5 h-5" strokeWidth={2.5} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-4 text-white/70 text-sm">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
