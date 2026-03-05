export type ProcessStep = {
  day: string;
  title: string;
  items: string[];
  isAccent: boolean;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    day: 'Day 1',
    title: 'Discovery (2 hours)',
    items: ['Brief call to understand your vision', 'Define core features', 'Tech stack confirmation'],
    isAccent: true,
  },
  {
    day: 'Day 1-2',
    title: 'Development (46 hours)',
    items: ['Real-time progress updates', 'Daily check-ins', 'Live deployment'],
    isAccent: true,
  },
  {
    day: 'Day 2',
    title: 'Handoff',
    items: ['Code walkthrough', 'Documentation', '30-day support included'],
    isAccent: false,
  },
];
