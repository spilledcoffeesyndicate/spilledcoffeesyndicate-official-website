import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Spilled Coffee Syndicate.',
  alternates: {
    canonical: '/terms-of-use/',
  },
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold font-mono mb-4">Terms of Use</h1>
        <p className="text-white/60 mb-8">Last updated: 08 August 2025</p>

        <article className="prose prose-invert max-w-none">
          <p>
            These Terms of Use govern access to and use of services provided by Spilled Coffee Syndicate. By accessing the website, you agree
            to these terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>By using the website, you confirm that you have read and accepted these Terms of Use and applicable policies.</p>

          <h2>2. License and Restrictions</h2>
          <p>
            You are granted a non-exclusive, non-transferable, revocable license to use the website for personal or business informational
            purposes. You may not copy, resell, reverse engineer, or misuse the content.
          </p>

          <h2>3. User Content</h2>
          <p>You are solely responsible for content you submit and must ensure it does not violate laws or third-party rights.</p>

          <h2>4. Service Changes</h2>
          <p>We may modify, suspend, or discontinue any part of the service at any time without prior notice.</p>

          <h2>5. Limitation of Liability</h2>
          <p>
            The website and services are provided &quot;as is&quot;. To the maximum extent permitted by law, Spilled Coffee Syndicate is not
            liable for indirect or consequential damages.
          </p>

          <h2>6. Contact</h2>
          <p>
            For legal questions, contact us at{' '}
            <a className="text-accent-400" href="mailto:spilledcoffeesyndicate@gmail.com">
              spilledcoffeesyndicate@gmail.com
            </a>
            .
          </p>
        </article>
      </section>
    </main>
  );
}
