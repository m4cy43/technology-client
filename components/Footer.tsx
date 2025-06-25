const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--ming) py-4 mt-auto">
      <div className="text-white container mx-auto flex flex-col justify-between px-4">
        <div className="px-3 flex flex-wrap flex-col md:flex-row justify-around mb-4 md:mb-0">
          <div>
            <h2 className="text-lg font-bold text-(--golden-fizz) tracking-[0.8px]">
              Contact us:
            </h2>
            <ul className="py-3 flex space-x-4 flex-col">
              <li>+3800000000</li>
              <li>+3800000000</li>
              <li>user@gmail.com</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-(--golden-fizz) tracking-[0.8px]">
              Social media:
            </h2>
            <ul className="py-3 flex space-x-4 flex-col">
              <li>insta</li>
              <li>facebook</li>
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
