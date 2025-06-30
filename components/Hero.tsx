import Image from 'next/image';

const Hero = () => {
  return (
    <div className="flex h-full flex-col p-4 md:p-10">
      <div className="hero-title-block h-60 w-[60%] pt-4 pb-4 pl-6 lg:pt-7">
        <h1 className="main-title text-5xl leading-[1.5em] font-semibold">
          Your Partner in Construction, Engineering & Business Growth
        </h1>
      </div>
      <div className="hero-media-block flex h-[400px] flex-col rounded-3xl bg-(--hero-bg) px-5 py-6 md:flex-row">
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
        <div className="hero-image-wrapper relative flex w-[50%] items-start justify-center">
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
