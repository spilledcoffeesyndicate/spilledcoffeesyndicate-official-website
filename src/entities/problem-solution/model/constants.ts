export type ProblemSolutionItem = {
  title: string;
  description: string;
};

export const PROBLEM_ITEMS: ProblemSolutionItem[] = [
  { title: 'Development agencies take months', description: 'Weeks of discovery, months of waiting' },
  { title: 'Freelancers are unreliable', description: 'Ghosted mid-project, quality varies' },
  { title: 'Hiring developers is expensive', description: 'Full-time salaries, long hiring cycles' },
  { title: 'No-code tools are limited', description: 'Custom logic? Good luck' },
];

export const SOLUTION_ITEMS: ProblemSolutionItem[] = [
  { title: '48-hour delivery', description: 'Pre-agreed scope, delivered on time' },
  { title: 'Fixed-price packages', description: 'No hidden fees, zero surprises' },
  { title: 'Production-ready code', description: 'Clean, documented, maintainable' },
  { title: 'Scalable architecture', description: 'Built for growth from day one' },
];
