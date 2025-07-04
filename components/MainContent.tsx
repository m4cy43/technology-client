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
    data: { hero, aboutUs, whatWeDo, whyChooseUs, closing },
  } = data!;

  return (
    <>
      <Hero data={hero} />
      <div className="background-gradient px-4 py-26 md:px-10">
        <AboutUs data={aboutUs} />
        <WhatWeDo data={whatWeDo} />
        <WhyChooseUs data={whyChooseUs} />
        <Closing data={closing} />
      </div>
    </>
  );
};

export default MainContent;
