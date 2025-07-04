import { parseSimpleRichText } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import Image from 'next/image';

interface Props {
  data: Service;
}

const AboutUs: React.FC<Props> = ({ data }) => {
  const { title, content, image } = data;

  const parsedContent = parseSimpleRichText(content);

  return (
    <section
      id="about"
      className="mb-22 flex flex-col items-center justify-center md:flex-row"
    >
      <div className="h-fit w-full rounded-2xl bg-white p-8 shadow-xl md:w-[60%]">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          {title}
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-gray-700">
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
        </div>
      </div>
      <div className="flex items-center justify-center md:w-[40%]">
        {image && (
          <Image
            className="sm:w-[470px]"
            src={`${image?.url}`}
            alt="about us image"
            width={570}
            height={570}
          />
        )}
      </div>
    </section>
  );
};

export default AboutUs;
