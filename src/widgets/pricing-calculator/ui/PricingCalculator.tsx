'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from 'react-countup';
import { CheckCircle2, XCircle } from 'lucide-react';
import { BASE_PRICE, EXCLUDED_ITEMS, INCLUDED_ITEMS, PRICING_FEATURES } from '@/entities/pricing';
import { GradientText, PixelBlast, SpotlightCard } from '@/shared/ui';

function PriceCountUp({ value }: { value: number }) {
  const countUpRef = useRef<HTMLSpanElement>(null);
  const { update } = useCountUp({
    ref: countUpRef,
    start: BASE_PRICE,
    end: value,
    duration: 0.5,
    separator: ',',
    prefix: '$',
    decimals: 0,
  });

  useEffect(() => {
    update(value);
  }, [update, value]);

  return <span ref={countUpRef} />;
}

export function PricingCalculator() {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});

  const total = BASE_PRICE + PRICING_FEATURES.reduce((sum, feature) => (selectedFeatures[feature.id] ? sum + feature.price : sum), 0);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PixelBlast id="calculator" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            <GradientText colors={['#4ade80', '#22c55e', '#16a34a']} className="!cursor-default">
              Transparent pricing
            </GradientText>
          </h2>
          <p className="text-white/70">Base MVP + add features as needed. Fixed price, no surprises.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.15)" className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5">
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Base MVP</span>
                <span className="font-mono text-accent-400">${BASE_PRICE.toLocaleString()}</span>
              </div>
              <p className="text-sm text-white/60 mb-6">Landing + auth + core flow + basic admin/reporting</p>
              <div className="space-y-3">
                {PRICING_FEATURES.map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center justify-between p-3 rounded border border-white/10 cursor-pointer hover:border-accent-500/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={Boolean(selectedFeatures[feature.id])}
                        onChange={() => toggleFeature(feature.id)}
                        className="w-4 h-4 accent-accent-500"
                      />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                    <span className="font-mono text-accent-400 text-sm">+${feature.price}</span>
                  </label>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.25)" className="!p-6 !rounded-lg !border-2 !border-accent-500 !bg-accent-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-mono text-2xl text-accent-400">
                  <PriceCountUp value={total} />
                </span>
              </div>
              <a
                id="estimate"
                href="https://forms.gle/bsRtUgfBr8dYNaGr7"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 mt-4 bg-white text-black font-mono text-center hover:bg-white/90 transition"
              >
                Request This Package
              </a>
            </SpotlightCard>
          </div>

          <div className="space-y-6">
            <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.15)" className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5">
              <h3 className="font-mono tracking-tight text-accent-400 mb-4">What&apos;s included</h3>
              <ul className="space-y-2 text-sm text-white/80">
                {INCLUDED_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-accent-400 shrink-0 w-4 h-4" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(239, 68, 68, 0.1)" className="!p-6 !rounded-lg !border !border-white/10 !bg-white/5">
              <h3 className="font-mono tracking-tight text-red-400/90 mb-4">What&apos;s NOT included</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {EXCLUDED_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <XCircle className="text-red-400 shrink-0 w-4 h-4" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            <p className="text-xs text-white/50">
              Change requests after scope freeze: quoted separately. Scope growth = phase 2 with separate estimate.
            </p>
          </div>
        </motion.div>
      </div>
    </PixelBlast>
  );
}
