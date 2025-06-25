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
  title: 'Techonology',
  description: 'Come up with description later ;)',
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
        className={`theme-light ${robotoSlab.variable} font-[family-name:var(--font-geist-sans)] antialiased h-full flex flex-col`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

//  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
//    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
//  </div>
