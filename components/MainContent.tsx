'use client';

import Hero from '@/components/Hero';
import { useGetMainPageQuery } from '@/store/features/mainPageApi';
import Spinner from './ui/Spinner';

import CompanyInterface from '@/components/strapi-company-interface';

const MainContent = () => {
  const { data, isLoading } = useGetMainPageQuery();

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  const {
    data: { hero },
  } = data!;

  return (
    <>
      <Hero
        title={hero.title}
        content={hero.content}
        image={hero.image}
        id={hero.id}
      />
      <div className="background-gradient mt-22 mb-10 px-10 py-26">
        <CompanyInterface />
      </div>
    </>
  );
};

export default MainContent;
