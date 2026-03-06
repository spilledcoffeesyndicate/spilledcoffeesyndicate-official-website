import { MVP_DELIVERY_HOURS, SUPPORT_DAYS } from '@/shared/config';

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: `Is ${MVP_DELIVERY_HOURS} hours really enough?`,
    answer:
      'Yes, for an MVP with 5-7 core features and pre-agreed scope. We define everything upfront during Discovery, so development is focused and efficient.',
  },
  {
    question: 'What if I need changes later?',
    answer:
      `${SUPPORT_DAYS}-day support is included for bug fixes. After that, we offer hourly rates or phased updates. Change requests after scope freeze are quoted separately.`,
  },
  {
    question: 'Who owns the code?',
    answer: 'You get full ownership and repository access. Clean, documented code-yours to keep and extend.',
  },
  {
    question: 'What if the project takes longer?',
    answer:
      `Fixed scope. We define features upfront in the Discovery call. If scope grows, we split: v1 in ${MVP_DELIVERY_HOURS}h, the rest as phase 2 with a separate estimate.`,
  },
  {
    question: 'Do you provide design?',
    answer:
      'Yes. We use modern UI with Tailwind and component libraries. Custom design beyond standard patterns can be quoted as an add-on.',
  },
  {
    question: `What exactly can be built in ${MVP_DELIVERY_HOURS} hours?`,
    answer:
      'Landing + auth + core flow + basic admin/reporting. With a clear, agreed scope. Complex integrations or heavy custom logic may extend the timeline.',
  },
  {
    question: 'What happens if scope grows?',
    answer: `Scope split: v1 in ${MVP_DELIVERY_HOURS}h, the rest as phase 2 with a separate estimate. No surprise invoices.`,
  },
];
