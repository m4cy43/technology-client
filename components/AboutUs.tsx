import Image from 'next/image';

const data = {
  title: 'Main page',
  aboutUs: {
    title: 'About us',
    body: [
      'We are a dynamic, multi-sector company with a strong foundation in manufacturing, construction, engineering services, trade, and strategic consulting. With years of experience and a dedication to excellence, we offer a comprehensive range of solutions for both individuals and businesses across Ukraine.',
      'Our operations are rooted in reliability, innovation, and precision — values that define our brand and shape every project we deliver.',
    ],
  },
};

const AboutUs = () => {
  return (
    <section className="mb-16 flex flex-col items-center justify-center md:flex-row">
      <div className="h-fit w-full rounded-2xl bg-white p-8 shadow-xl md:w-[60%]">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          {data.aboutUs.title}
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-gray-700">
          {data.aboutUs.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center md:w-[40%]">
        <Image
          className="sm:w-[470px]"
          src="business-deal-pana.svg"
          alt="about us image"
          width={570}
          height={570}
        />
      </div>
    </section>
  );
};

export default AboutUs;
