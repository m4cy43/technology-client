import {
  FaBuilding,
  FaWrench,
  FaCog,
  FaUsers,
  FaCheckCircle,
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoIosMegaphone } from 'react-icons/io';

const CompanyInterface = () => {
  // Mock data from your Strapi response
  const data = {
    title: 'Main page',
    aboutUs: {
      title: 'About us',
      body: [
        'We are a dynamic, multi-sector company with a strong foundation in manufacturing, construction, engineering services, trade, and strategic consulting. With years of experience and a dedication to excellence, we offer a comprehensive range of solutions for both individuals and businesses across Ukraine.',
        'Our operations are rooted in reliability, innovation, and precision — values that define our brand and shape every project we deliver.',
      ],
    },
    whatWeDo: [
      {
        title: 'Manufacturing & Industrial Production',
        icon: <FaBuilding />,
        items: [
          'Sheet glass for windows and facades',
          'Metal constructions and prefabricated parts',
          'Wood elements for interior and exterior use',
          'Construction materials tailored to industry standards',
        ],
      },
      {
        title: 'Construction & Installation Works',
        icon: <FaWrench />,
        items: [
          'Window and door installation (including custom orders)',
          'Plastering, painting, and finishing services',
          'Decorative interior solutions',
          'Thermal insulation and energy-efficient materials',
        ],
      },
      {
        title: 'Engineering Systems',
        icon: <FaCog />,
        items: [
          'Installation and servicing of plumbing and heating systems',
          'Sanitary equipment for residential and commercial buildings',
          'Maintenance of indoor climate systems',
        ],
      },
      {
        title: 'Trade & Distribution',
        icon: <FiPackage />,
        items: [
          'Retail and wholesale of construction materials and tools',
          'Logistic coordination and supply for building projects',
        ],
      },
      {
        title: 'Marketing & Advertising',
        icon: <IoIosMegaphone />,
        items: [
          'Development of advertising campaigns and promotional strategies',
          'Media placement, visual branding, and targeted outreach',
          'Market research and analytics',
        ],
      },
      {
        title: 'Business Consulting & Public Expertise',
        icon: <FaUsers />,
        items: [
          'Independent expert reviews and industry insights',
          'Support for tenders, documentation, and local regulations',
          'Surveys, social research, and community engagement initiatives',
        ],
      },
    ],
    whyChooseUs: [
      'Professional Team: Experienced specialists across multiple industries',
      'Integrated Approach: From manufacturing to installation — all under one roof',
      'Certified Quality: All services meet national and international standards',
      'Flexible Cooperation: We adapt to client needs, deadlines, and budget',
      'Sustainable Perspective: Eco-friendly materials and energy-efficient solutions',
      'Reliable Partnership: Transparent communication and long-term relationships',
    ],
    closing: [
      'We are proud to serve our clients with integrity and passion, continuously evolving to meet the challenges of modern business and construction.',
      "Let's build your vision — together.",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <section className="mb-16">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              {data.aboutUs.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              {data.aboutUs.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            What We Do
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.whatWeDo.map((service, index) => {
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 rounded-lg bg-blue-100 p-3">
                      <span className="h-6 w-6 text-blue-600">
                        {service.icon}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {data.whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start">
                  <FaCheckCircle className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
                  <span className="text-lg">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section>
          <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
            <div className="space-y-4 text-lg text-gray-700">
              {data.closing.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === data.closing.length - 1
                      ? 'text-2xl font-semibold text-blue-600'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <button className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-colors duration-300 hover:bg-blue-700 hover:shadow-xl">
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyInterface;
