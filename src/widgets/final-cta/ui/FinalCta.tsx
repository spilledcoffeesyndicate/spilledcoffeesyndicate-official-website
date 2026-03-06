'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BOOK_CALL_CTA, CALL_DURATION_MINUTES, EXTERNAL_LINKS } from '@/shared/config';
import { GradientText, PixelBlast } from '@/shared/ui';

export function FinalCta() {
  return (
    <PixelBlast className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-6">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Ready to launch your MVP?
            </GradientText>
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Get a free estimate or book a {CALL_DURATION_MINUTES}-min call. No upfront payment required. Cancel anytime before we start.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#calculator" className="px-6 py-3 bg-white text-black font-mono font-medium hover:bg-white/90 transition">
              Calculate Price
            </a>
            <a href="#calendly" className="px-6 py-3 border-2 border-white text-white font-mono font-medium hover:bg-white/10 transition">
              {BOOK_CALL_CTA}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span>No upfront payment required</span>
            <span>·</span>
            <span>Cancel anytime before we start</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="calendly" className="mt-16 flex justify-center">
          <div className="aspect-[4/3] w-full max-w-xl max-h-[500px] bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mx-auto">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <p className="text-white/70 mb-4">Calendly widget placeholder</p>
              <p className="text-sm text-white/50 mb-6">Add your Calendly embed URL or iframe here</p>
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-accent-500 text-accent-400 font-mono hover:bg-accent-500/20 transition"
              >
                <span className="inline-flex items-center gap-2">
                  Book via Calendly <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </PixelBlast>
  );
}
