import Image from 'next/image';

const Closing = () => {
  return (
    <section>
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="flex flex-col items-center space-y-4 text-lg text-gray-700">
          <p>
            We are proud to serve our clients with integrity and passion,
            continuously evolving to meet the challenges of modern business and
            construction.
          </p>
          <div className="flex w-full justify-center">
            <Image
              className="w-[32%] min-w-[300px]"
              src="business-deal-pana.svg"
              alt="about us image"
              width={484}
              height={484}
            />
          </div>
          <p className="text-2xl font-semibold text-blue-600">
            Let`s build your vision — together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Closing;
