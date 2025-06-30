import { serviceToHtml } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import React from 'react';

const Hero: React.FC<Service> = ({ ...data }) => {
  const { title, content, image } = serviceToHtml(data);

  console.log(image);
  return (
    <div className="flex h-full flex-col p-10">
      <div className="h-60 w-[70%] pt-4 pb-4 pl-6 lg:pt-7">
        <h1 className="main-title text-5xl leading-[1.5em] font-semibold">
          {title}
        </h1>
      </div>
      <div className="flex h-[200px] flex-col rounded-3xl bg-(--hero-bg) px-5 py-6 md:h-[300px] md:flex-row lg:h-[400px]">
        <div className="w-[50%]">
          <p
            className="text-xl leading-[1.6em]"
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
        <div
          className="relative flex w-[50%] items-center justify-end"
          dangerouslySetInnerHTML={{ __html: image }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
