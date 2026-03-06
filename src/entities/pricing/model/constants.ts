import type { PricingFeature } from './types';
import { BASE_MVP_PRICE_USD, SUPPORT_DAYS } from '@/shared/config';

export const BASE_PRICE = BASE_MVP_PRICE_USD;

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
  `${SUPPORT_DAYS}-day bug fixes included`,
  '2 rounds of revisions',
];

export const EXCLUDED_ITEMS: string[] = [
  'Major changes after scope freeze',
  'Unspecified third-party integrations',
  `Support after ${SUPPORT_DAYS} days (available as separate package)`,
];
