import Image from 'next/image';

const Hero = () => {
  return (
    <div className="flex h-full flex-col p-10">
      <div className="h-60 w-[70%] pt-4 pb-4 pl-6 lg:pt-7">
        <h1 className="main-title text-5xl leading-[1.5em] font-semibold">
          Your Partner in Construction, Engineering & Business Growth
        </h1>
      </div>
      <div className="flex h-[200px] flex-col rounded-3xl bg-(--hero-bg) px-5 py-6 md:h-[300px] md:flex-row lg:h-[400px]">
        <div className="w-[50%]">
          <p className="text-xl leading-[1.6em]">
            At Technology, we combine manufacturing excellence, innovative
            engineering, and expert consulting to deliver comprehensive
            solutions for businesses and individuals in Ukraine. From precision
            industrial production and modern construction to strategic market
            insights, we ensure quality, efficiency, and sustainable progress in
            every project.
          </p>
        </div>
        <div className="relative flex w-[50%] items-center justify-end">
          <Image
            id="hero-image"
            src="/сollab-bro.svg"
            alt="hero image"
            width={570}
            height={570}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
