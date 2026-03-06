import { DEVELOPMENT_HOURS, DISCOVERY_HOURS, SUPPORT_DAYS } from '@/shared/config';

export type ProcessStep = {
  day: string;
  title: string;
  items: string[];
  isAccent: boolean;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    day: 'Day 1',
    title: `Discovery (${DISCOVERY_HOURS} hours)`,
    items: ['Brief call to understand your vision', 'Define core features', 'Tech stack confirmation'],
    isAccent: true,
  },
  {
    day: 'Day 1-2',
    title: `Development (${DEVELOPMENT_HOURS} hours)`,
    items: ['Real-time progress updates', 'Daily check-ins', 'Live deployment'],
    isAccent: true,
  },
  {
    day: 'Day 2',
    title: 'Handoff',
    items: ['Code walkthrough', 'Documentation', `${SUPPORT_DAYS}-day support included`],
    isAccent: false,
  },
];
