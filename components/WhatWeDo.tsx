import { serviceToSimple } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import { FaBuilding, FaWrench, FaCog, FaUsers } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoIosMegaphone } from 'react-icons/io';

interface Props {
  data: Service[];
}

const WhatWeDo: React.FC<Props> = ({ data }) => {
  const parsedData = data.map((chunk) => serviceToSimple(chunk));

  const icons = [
    <FaBuilding key={0} />,
    <FaWrench key={1} />,
    <FaCog key={2} />,
    <FiPackage key={3} />,
    <IoIosMegaphone key={4} />,
    <FaUsers key={5} />,
  ];

  return (
    <section id="what-we-do" className="mb-22">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        What We Do
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {parsedData.map((service, index) => {
          return (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-lg bg-blue-100 p-3">
                  <span className="h-6 w-6 text-blue-600">{icons[index]}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>
              {service.content.map((item, itemIndex) =>
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
          );
        })}
      </div>
    </section>
  );
};

export default WhatWeDo;
