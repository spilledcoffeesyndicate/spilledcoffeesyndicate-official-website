import type { PricingFeature } from './types';

export const BASE_PRICE = 999;

export const PRICING_FEATURES: PricingFeature[] = [
  { id: 'auth', name: 'User authentication', price: 199 },
  { id: 'payment', name: 'Payment integration', price: 299 },
  { id: 'admin', name: 'Admin dashboard', price: 499 },
  { id: 'api', name: 'API integration', price: 199 },
  { id: 'realtime', name: 'Real-time features', price: 499 },
];

export const INCLUDED_ITEMS: string[] = [
  'Responsive design (mobile + desktop)',
  'Clean, documented code',
  'GitHub repository access',
  'Deployed to production',
  'Basic SEO setup',
  '30-day bug fixes included',
  '2 rounds of revisions',
];

export const EXCLUDED_ITEMS: string[] = [
  'Major changes after scope freeze',
  'Unspecified third-party integrations',
  'Support after 30 days (available as separate package)',
];
