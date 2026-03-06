import type { Metadata } from 'next';
import {
  Faq,
  FinalCta,
  Footer,
  Header,
  Hero,
  Portfolio,
  PricingCalculator,
  ProblemSolution,
  Process,
  SocialProof,
  StickyCta,
  TechStack,
} from '@/widgets';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <Process />
        <PricingCalculator />
        <TechStack />
        <Portfolio />
        <Faq />
        <FinalCta />
        <Footer />
      </main>
      <StickyCta />
    </>
  );
}
