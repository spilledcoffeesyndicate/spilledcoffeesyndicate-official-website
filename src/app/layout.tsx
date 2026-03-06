import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AuthGate } from '@/features/auth';
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from '@/shared/lib/seo/json-ld';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spilledcoffeesyndicate.com'),
  title: {
    default: 'MVP in 48 Hours | Spilled Coffee Syndicate - Fixed Price Development',
    template: '%s | Spilled Coffee Syndicate',
  },
  description:
    'Scope-fixed MVP in 48 hours. Fixed price, no surprises. We ship launch-ready web apps with React, Next.js. Trusted by founders worldwide.',
  keywords: ['MVP development', 'rapid prototyping', '48-hour MVP', 'startup development', 'fixed-price web app', 'React MVP'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MVP in 48 Hours | Spilled Coffee Syndicate',
    description: 'Scope-fixed MVP in 48 hours. Fixed price. No surprises.',
    url: 'https://spilledcoffeesyndicate.com/',
    siteName: 'Spilled Coffee Syndicate',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
