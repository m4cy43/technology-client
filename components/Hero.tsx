import { parseRichText } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import Image from 'next/image';
import React from 'react';

const Hero: React.FC<Service> = ({ title, content, image }) => {
  const imgHost = process.env.NEXT_PUBLIC_STRAPI_HOST;

  const htmlContent = parseRichText(content);

  return (
    <div className="flex h-full flex-col p-4 md:p-10">
      <div className="hero-title-block h-60 w-[60%] pt-4 pb-4 pl-6 lg:pt-7">
        <h1 className="main-title text-5xl leading-[1.5em] font-semibold">
          {title}
        </h1>
      </div>
      <div className="hero-media-block flex h-[400px] flex-col rounded-3xl bg-(--hero-bg) px-5 py-6 md:flex-row">
        <div
          className="w-[50%] text-xl leading-[1.6em]"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
        <div className="hero-image-wrapper relative flex w-[50%] items-start justify-center">
          <Image
            id="hero-image"
            src={`${imgHost}${image?.url}`}
            alt="hero image"
            width={570}
            height={570}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
