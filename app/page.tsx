import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainContent from '@/components/MainContent';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <MainContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
