'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="relative flex flex-row items-center justify-between px-4 py-3 md:px-8">
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
          <ul className="flex flex-row gap-x-10 capitalize">
            <li className="nav-link">
              <a href="#about">About us</a>
            </li>
            <li className="nav-link">
              <a href="#what-we-do">What we do</a>
            </li>
            <li className="nav-link">
              <a href="#why-us">Why choose us</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row items-center gap-x-5">
        <a
          href="#contact-us"
          className="inline-flex rounded-4xl border-2 border-(--te-papa-green) bg-transparent px-2.5 py-2 text-sm font-[500] text-(--te-papa-green) transition-colors hover:border-white hover:bg-(--denim) hover:text-white md:text-base"
        >
          Contact us
        </a>
        <button
          className="inline-block cursor-pointer md:hidden"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Open menu</span>
          <GiHamburgerMenu className="h-9 w-9 text-(--denim)" />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed top-0 right-0 z-99 h-fit min-h-fit w-full bg-(--mobile-menu) transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} `}
      >
        <div className="flex flex-col items-end px-8 pt-6 pb-10">
          <button
            className="inline-block cursor-pointer"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Close menu</span>
            <IoMdCloseCircleOutline className="m-0 h-12 w-12 text-(--pampas)" />
          </button>

          <nav className="w-full px-6 pt-5">
            <ul className="flex w-full flex-col items-center gap-y-7.5 capitalize">
              <li className="nav-link-mobile">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                  About us
                </a>
              </li>
              <li className="nav-link-mobile">
                <a
                  href="#what-we-do"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  What we do
                </a>
              </li>
              <li className="nav-link-mobile">
                <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)}>
                  Why choose us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
