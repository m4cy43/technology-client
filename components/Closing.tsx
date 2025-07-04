import { parseSimpleRichText } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  data: Service;
}

const Closing: FC<Props> = ({ data }) => {
  const { title, content, image } = data;

  const parsedContent = parseSimpleRichText(content);

  return (
    <section>
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="flex flex-col items-center space-y-4 text-lg text-gray-700">
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
              <p key={itemIndex}>{item.text}</p>
            )
          )}
          <div className="flex w-full justify-center">
            {image && (
              <Image
                className="w-[32%] min-w-[300px]"
                src={`${image?.url}`}
                alt="about us image"
                width={484}
                height={484}
              />
            )}
          </div>
          <p className="text-2xl font-semibold text-blue-600">{title}</p>
        </div>
      </div>
    </section>
  );
};

export default Closing;
