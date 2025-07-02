'use client';

import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import { useGetMainPageQuery } from '@/store/features/mainPageApi';
import Spinner from './ui/Spinner';
import WhatWeDo from '@/components/WhatWeDo';
import WhyChooseUs from '@/components/WhyChooseUs';
import Closing from '@/components/Closing';

const MainContent = () => {
  const { data, isLoading } = useGetMainPageQuery();

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  const {
    data: { hero, aboutUs },
  } = data!;

  return (
    <>
      <Hero
        title={hero.title}
        content={hero.content}
        image={hero.image}
        id={hero.id}
      />
      <div className="background-gradient px-4 py-26 md:px-10">
        <AboutUs
          title={aboutUs.title}
          content={aboutUs.content}
          image={aboutUs.image}
          id={aboutUs.id}
        />
        <WhatWeDo />
        <WhyChooseUs />
        <Closing />
      </div>
    </>
  );
};

export default MainContent;
