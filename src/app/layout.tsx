import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AuthGate } from '@/features/auth';
import { BRAND_NAME, FIXED_PRICE_NO_SURPRISES, FIXED_PRICE_SHORT, MVP_DELIVERY_HOURS, SITE_URL } from '@/shared/config';
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `MVP in ${MVP_DELIVERY_HOURS} Hours | ${BRAND_NAME} - Fixed Price Development`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    `Scope-fixed MVP in ${MVP_DELIVERY_HOURS} hours. ${FIXED_PRICE_NO_SURPRISES} We ship launch-ready web apps with React, Next.js. Trusted by founders worldwide.`,
  keywords: ['MVP development', 'rapid prototyping', `${MVP_DELIVERY_HOURS}-hour MVP`, 'startup development', 'fixed-price web app', 'React MVP'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `MVP in ${MVP_DELIVERY_HOURS} Hours | ${BRAND_NAME}`,
    description: `Scope-fixed MVP in ${MVP_DELIVERY_HOURS} hours. ${FIXED_PRICE_SHORT}`,
    url: `${SITE_URL}/`,
    siteName: BRAND_NAME,
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
