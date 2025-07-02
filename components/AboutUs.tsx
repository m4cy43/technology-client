import { parseRichText } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import Image from 'next/image';

const AboutUs: React.FC<Service> = ({ title, content, image }) => {
  const imgHost = process.env.NEXT_PUBLIC_STRAPI_HOST;

  const htmlContent = parseRichText(content);

  return (
    <section
      id="about"
      className="mb-22 flex flex-col items-center justify-center md:flex-row"
    >
      <div className="h-fit w-full rounded-2xl bg-white p-8 shadow-xl md:w-[60%]">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          {title}
        </h2>
        <div
          className="space-y-4 text-lg leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      </div>
      <div className="flex items-center justify-center md:w-[40%]">
        <Image
          className="sm:w-[470px]"
          src={`${imgHost}${image?.url}`}
          alt="about us image"
          width={570}
          height={570}
        />
      </div>
    </section>
  );
};

export default AboutUs;
