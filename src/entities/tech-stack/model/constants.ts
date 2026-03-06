export type TechStackGroup = {
  category: string;
  items: string[];
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'Supabase'] },
  { category: 'Deployment', items: ['Vercel', 'AWS'] },
  { category: 'Standards', items: ['ESLint', 'Testing', 'CI/CD'] },
];
