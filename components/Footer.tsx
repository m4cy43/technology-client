'use client';

import { FaFacebookSquare, FaPhone, FaInstagram } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { useGetGlobalDataQuery } from '@/store/features/mainPageApi';

const Footer = () => {
  const listElementStyles = 'flex flex-row items-center';
  const currentYear = new Date().getFullYear();

  const { data, isLoading } = useGetGlobalDataQuery();

  if (isLoading) {
    return <></>;
  }

  const {
    data: { email, phone, phone2, instagram, facebook, address, addressLink },
  } = data!;

  return (
    <footer id="contact-us" className="mt-auto bg-(--ming) py-4">
      <div className="container mx-auto flex flex-col justify-between px-1 text-white md:px-4">
        <div className="mb-4 flex flex-row flex-wrap justify-around md:mb-0">
          <div>
            <h2 className="text-lg font-bold tracking-[0.8px] text-(--golden-fizz)">
              Contact us:
            </h2>
            <ul className="flex flex-col gap-y-2 py-3">
              <li className={listElementStyles}>
                <FaPhone className="mr-2.5" />
                {phone || phone2 || '+380000000000'}
              </li>
              <li className={listElementStyles}>
                <MdOutlineMail className="mr-2.5" />
                {email || 'example@gmail.com'}
              </li>
              <li className={listElementStyles}>
                <FiMapPin className="mr-2.5" />
                <a
                  href={
                    addressLink || 'https://maps.app.goo.gl/vRLQTbnhWwefz4Uu6'
                  }
                  target="_blank"
                  className="hover:text-(--golden-fizz)"
                >
                  {address || 'Address'}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-[0.8px] text-(--golden-fizz)">
              Social media:
            </h2>
            <ul className="flex flex-row items-center justify-evenly gap-x-2 space-x-4 py-3">
              <li>
                <a href={instagram || 'https://www.instagram.com/'}>
                  <FaInstagram className="h-8 w-8" />
                </a>
              </li>
              <li>
                <a href={facebook || 'https://www.facebook.com/'}>
                  <FaFacebookSquare className="h-8 w-8" />
                </a>
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
