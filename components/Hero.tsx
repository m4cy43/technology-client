import { parseSimpleRichText } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import Image from 'next/image';
import React from 'react';

interface Props {
  data: Service;
}

const Hero: React.FC<Props> = ({ data }) => {
  const { title, content, image } = data;

  const parsedContent = parseSimpleRichText(content);

  return (
    <div className="px-4 py-5 md:px-10 md:py-15">
      <div className="hero-title-block h-60 w-[60%] pt-4 pb-4 pl-6 lg:pt-7">
        <h1 className="main-title text-5xl leading-[1.5em] font-semibold">
          {title}
        </h1>
      </div>
      <div className="hero-media-block flex h-[400px] flex-col rounded-3xl bg-(--hero-bg) px-5 py-6 md:flex-row">
        <div className="w-[50%]">
          {parsedContent.map((item, itemIndex) =>
            item.type === 'list' ? (
              <ul className="space-y-2" key={itemIndex}>
                {item.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl leading-[1.6em]" key={itemIndex}>
                {item.text}
              </p>
            )
          )}
        </div>
        <div className="hero-image-wrapper relative flex w-[50%] items-start justify-center">
          {image && (
            <Image
              id="hero-image"
              src={`${image?.url}`}
              alt="hero image"
              width={570}
              height={570}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
