'use client';

import Hero from '@/components/Hero';
import { useGetMainPageQuery } from '@/store/features/mainPageApi';
import Spinner from './ui/Spinner';

const MainContent = () => {
  const { data, isLoading } = useGetMainPageQuery();

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  const {
    data: { title, hero, aboutUs, whatWeDo, whyChooseUs, closing },
  } = data!;

  return (
    <>
      <Hero title={hero.title} content={hero.content} image={hero.image} />
    </>
  );
};

export default MainContent;
