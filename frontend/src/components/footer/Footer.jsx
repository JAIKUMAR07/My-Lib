import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* footer  */}
      <footer className="text-gray-600  flex   body-font bg-gradient-to-r from-cyan-600 to-blue-800">
        {/* main  */}
        <div className="container px-5 py-5 mx-auto flex items-center justify-center sm:flex-row flex-col">
          {/* logo  */}
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <span className="text-xl font-bold">Nex-Lib</span>
          </a>
          {/* para  */}
          <p className="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 Nex-Lib —
            <Link
              to={"/"}
              className="text-gray-100 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @Nex-Lib
            </Link>
          </p>

          {/* media icon  */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
