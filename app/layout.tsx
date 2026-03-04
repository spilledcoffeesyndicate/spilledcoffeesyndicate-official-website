import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AuthGate } from '@/components/AuthGate';
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
  title: 'MVP in 48 Hours | Spilled Coffee Syndicate - Fixed Price Development',
  description:
    'Scope-fixed MVP in 48 hours. Fixed price, no surprises. We ship launch-ready web apps with React, Next.js. Trusted by founders worldwide.',
  keywords: [
    'MVP development',
    'rapid prototyping',
    '48-hour MVP',
    'startup development',
    'fixed-price web app',
    'React MVP',
  ],
  openGraph: {
    title: 'MVP in 48 Hours | Spilled Coffee Syndicate',
    description: 'Scope-fixed MVP in 48 hours. Fixed price. No surprises.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
