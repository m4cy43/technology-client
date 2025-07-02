import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainContent from '@/components/MainContent';
import Spinner from '@/components/ui/Spinner';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Suspense fallback={<Spinner />}>
          <MainContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
