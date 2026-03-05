import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Spilled Coffee Syndicate.',
  alternates: {
    canonical: '/privacy-policy/',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold font-mono mb-4">Privacy Policy</h1>
        <p className="text-white/60 mb-8">Last updated: 08 August 2025</p>

        <article className="prose prose-invert max-w-none">
          <p>This Privacy Policy explains how personal data is collected, used, and protected when you use Spilled Coffee Syndicate services.</p>

          <h2>1. Information We Collect</h2>
          <p>We may collect basic technical data (such as IP address, browser, device info) and information you submit via forms or email.</p>

          <h2>2. How We Use Information</h2>
          <p>Data is used to provide services, improve the website, communicate updates, and maintain platform security.</p>

          <h2>3. Data Sharing</h2>
          <p>We do not sell personal information. Data may be shared with processors or authorities only where legally required.</p>

          <h2>4. Data Retention</h2>
          <p>We retain data only for as long as necessary to deliver services, comply with legal obligations, or resolve disputes.</p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of personal data. Requests
            can be sent by email.
          </p>

          <h2>6. Contact</h2>
          <p>
            For privacy requests, contact{' '}
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
