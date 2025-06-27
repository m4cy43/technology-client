import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title:
    'Technology — Engineering, Construction & Consulting Solutions in Ukraine',
  description:
    'Technology offers integrated services in manufacturing, construction, engineering, trade, and business consulting for clients across Ukraine.',
  keywords: 'building, materials',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`theme-light ${robotoSlab.variable} flex h-full flex-col font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
