import { FileText, LayoutDashboard, Store, type LucideIcon } from 'lucide-react';
import { MVP_DELIVERY_HOURS } from '@/shared/config';

export type PortfolioProject = {
  title: string;
  icon: LucideIcon;
  description: string;
  tech: string[];
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: 'SaaS Dashboard MVP',
    icon: LayoutDashboard,
    description: `Admin panel with auth, user management, and analytics. Delivered in ${MVP_DELIVERY_HOURS}h.`,
    tech: ['React', 'Next.js', 'Supabase'],
  },
  {
    title: 'Marketplace MVP',
    icon: Store,
    description: 'Two-sided marketplace with payments and real-time messaging.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    title: 'Landing + Lead Gen',
    icon: FileText,
    description: 'High-conversion landing with calculator and Calendly integration.',
    tech: ['React', 'Tailwind', 'Vercel'],
  },
];
