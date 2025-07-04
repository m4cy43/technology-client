import { parseSimpleRichText } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import { FaCheckCircle } from 'react-icons/fa';

interface Props {
  data: Service;
}

const WhyChooseUs: React.FC<Props> = ({ data }) => {
  const { content } = data;

  const parsedContent = parseSimpleRichText(content);
  return (
    <section id="why-us" className="mb-22">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {parsedContent.map((item, itemIndex) =>
            item.type === 'list' ? (
              item.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
                  <span className="text-lg">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-xl leading-[1.6em]" key={itemIndex}>
                {item.text}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
