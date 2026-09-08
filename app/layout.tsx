import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Kam Buy & Rent Property Sierra Leone | Hamilton Peninsula, Freetown',
  description: 'Modern real estate platform for Kam Buy & Rent Property in Hamilton Peninsula, Freetown, Sierra Leone. Explore properties for sale, executive rentals, town lots, and verified diaspora land deals.',
  openGraph: {
    title: 'Kam Buy & Rent Property Sierra Leone | Hamilton Peninsula, Freetown',
    description: 'Modern real estate platform for Kam Buy & Rent Property in Hamilton Peninsula, Freetown, Sierra Leone. Explore properties for sale, executive rentals, town lots, and verified diaspora land deals.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kam Buy & Rent Property Sierra Leone | Hamilton Peninsula, Freetown',
    description: 'Modern real estate platform for Kam Buy & Rent Property in Hamilton Peninsula, Freetown, Sierra Leone.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
