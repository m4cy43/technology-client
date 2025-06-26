import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  return (
    <header className="flex flex-row items-center justify-between px-4 py-3 md:px-8">
      <div>
        <Link
          id="logo-link"
          className="flex w-fit items-center"
          aria-label="logo"
          href="/"
        >
          <Image
            className="h-8 w-auto md:h-10"
            src="/logo.png"
            alt="Technology logo"
            width={216}
            height={48}
          />
        </Link>
      </div>
      <div className="hidden md:inline-block">
        <nav>
          <ul className="row flex gap-x-10 capitalize">
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
          className="inline-flex rounded-4xl border-2 border-(--te-papa-green) bg-transparent px-2.5 py-2 text-center font-[500] text-(--te-papa-green) transition-colors hover:border-white hover:bg-(--denim) hover:text-white"
        >
          Contact us
        </a>
        <div className="inline-block md:hidden">
          <GiHamburgerMenu className="cursor-pointer text-[2em] text-(--denim)" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
