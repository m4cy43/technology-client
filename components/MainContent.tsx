'use client';

import Hero from '@/components/Hero';
import { useGetMainPageQuery } from '@/store/features/mainPageApi';
import Spinner from './ui/Spinner';
import { Service } from '@/types/strapi';

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
  } = data;

  return (
    <>
      <Hero {...(hero as Service)} />
    </>
  );
};

export default MainContent;
