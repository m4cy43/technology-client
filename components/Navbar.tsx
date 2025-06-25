import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  return (
    <header className="bg-(--denim) py-3 px-5 rounded-b-xl flex flex-row justify-between items-center">
      <div>
        <Link
          id="logo-link"
          className="w-fit flex items-center"
          aria-label="logo"
          href="/"
        >
          <Image
            className=" h-9 md:h-12 w-auto"
            src="/logo.png"
            alt="Technology logo"
            width={216}
            height={48}
          />
        </Link>
      </div>
      <div>
        <nav>
          <GiHamburgerMenu className="text-white text-[2em] cursor-pointer" />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
