import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  return (
    <header className="py-3 px-4 md:px-8 flex flex-row justify-between items-center">
      <div>
        <Link
          id="logo-link"
          className="w-fit flex items-center"
          aria-label="logo"
          href="/"
        >
          <Image
            className="h-8 md:h-10 w-auto"
            src="/logo.png"
            alt="Technology logo"
            width={216}
            height={48}
          />
        </Link>
      </div>
      <div className="hidden md:inline-block">
        <nav>
          <ul className="flex row gap-x-10 capitalize">
            <li className="nav-link-custom">
              <a href="#about">About us</a>
            </li>
            <li className="nav-link-custom">
              <a href="#what-we-do">What we do</a>
            </li>
            <li className="nav-link-custom">
              <a href="#why-us">Why choose us</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row items-center gap-x-4.5">
        <a
          href="#contact-us"
          className="font-[500] inline-flex bg-transparent border-2 border-(--te-papa-green) text-(--te-papa-green) px-2.5 py-2 rounded-4xl text-center hover:bg-(--denim) transition-colors hover:text-white hover:border-white"
        >
          Contact us
        </a>
        <div className="inline-block md:hidden">
          <GiHamburgerMenu className="text-(--denim) text-[2em] cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
