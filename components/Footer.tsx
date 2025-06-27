'use client';

import { FaInstagram } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { useGetMainPageQuery } from '@/store/features/mainPageApi';

const Footer = () => {
  const { data } = useGetMainPageQuery();
  console.log(data);
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact-us" className="mt-auto bg-(--ming) py-4">
      <div className="container mx-auto flex flex-col justify-between px-1 text-white md:px-4">
        <div className="mb-4 flex flex-row flex-wrap justify-around md:mb-0">
          <div>
            <h2 className="text-lg font-bold tracking-[0.8px] text-(--golden-fizz)">
              Contact us:
            </h2>
            <ul className="flex flex-col space-x-4 py-3">
              <li>+3800000000</li>
              <li>+3800000000</li>
              <li>user@gmail.com</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-[0.8px] text-(--golden-fizz)">
              Social media:
            </h2>
            <ul className="flex flex-row items-center justify-evenly gap-x-2 space-x-4 py-3">
              <li>
                <a href="https://www.instagram.com/">
                  <FaInstagram className="h-8 w-8" />
                </a>
              </li>
              <li>
                <FaFacebookSquare className="h-8 w-8" />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-md mt-2">
            &copy; {currentYear} Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
