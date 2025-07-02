/* eslint-disable react/jsx-key */
import { serviceToHtml } from '@/lib/strapi-parser';
import { Service } from '@/types/strapi';
import { FaBuilding, FaWrench, FaCog, FaUsers } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoIosMegaphone } from 'react-icons/io';

interface Props {
  data: Service[];
}

const WhatWeDo: React.FC<Props> = ({ data }) => {
  const htmlContent = data.map((chunk) => serviceToHtml(chunk, {}));

  const icons = [
    <FaBuilding />,
    <FaWrench />,
    <FaCog />,
    <FiPackage />,
    <IoIosMegaphone />,
    <FaUsers />,
  ];

  // const data = {
  //   whatWeDo: [
  //     {
  //       title: 'Manufacturing & Industrial Production',
  //       icon: <FaBuilding />,
  //       items: [
  //         'Sheet glass for windows and facades',
  //         'Metal constructions and prefabricated parts',
  //         'Wood elements for interior and exterior use',
  //         'Construction materials tailored to industry standards',
  //       ],
  //     },
  //     {
  //       title: 'Construction & Installation Works',
  //       icon: <FaWrench />,
  //       items: [
  //         'Window and door installation (including custom orders)',
  //         'Plastering, painting, and finishing services',
  //         'Decorative interior solutions',
  //         'Thermal insulation and energy-efficient materials',
  //       ],
  //     },
  //     {
  //       title: 'Engineering Systems',
  //       icon: <FaCog />,
  //       items: [
  //         'Installation and servicing of plumbing and heating systems',
  //         'Sanitary equipment for residential and commercial buildings',
  //         'Maintenance of indoor climate systems',
  //       ],
  //     },
  //     {
  //       title: 'Trade & Distribution',
  //       icon: <FiPackage />,
  //       items: [
  //         'Retail and wholesale of construction materials and tools',
  //         'Logistic coordination and supply for building projects',
  //       ],
  //     },
  //     {
  //       title: 'Marketing & Advertising',
  //       icon: <IoIosMegaphone />,
  //       items: [
  //         'Development of advertising campaigns and promotional strategies',
  //         'Media placement, visual branding, and targeted outreach',
  //         'Market research and analytics',
  //       ],
  //     },
  //     {
  //       title: 'Business Consulting & Public Expertise',
  //       icon: <FaUsers />,
  //       items: [
  //         'Independent expert reviews and industry insights',
  //         'Support for tenders, documentation, and local regulations',
  //         'Surveys, social research, and community engagement initiatives',
  //       ],
  //     },
  //   ],
  // };
  return (
    <section id="what-we-do" className="mb-22">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        What We Do
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {htmlContent.map((service, index) => {
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
              <div dangerouslySetInnerHTML={{ __html: service.content }}></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatWeDo;
