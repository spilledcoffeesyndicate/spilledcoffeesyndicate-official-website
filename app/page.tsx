import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SocialProof } from '@/components/SocialProof';
import { ProblemSolution } from '@/components/ProblemSolution';
import { Process } from '@/components/Process';
import { PricingCalculator } from '@/components/PricingCalculator';
import { TechStack } from '@/components/TechStack';
import { Portfolio } from '@/components/Portfolio';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { StickyCTA } from '@/components/StickyCTA';

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
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <StickyCTA />
    </>
  );
}
