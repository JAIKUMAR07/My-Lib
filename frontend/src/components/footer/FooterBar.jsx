import { Link } from "react-router-dom";

const FooterBar = () => {
  return (
    <footer className="brand-gradient mt-8 text-white">
      <div className="page-shell flex flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="max-w-xl">
          <Link
            to="/"
            className="inline-flex items-center text-2xl font-bold tracking-tight"
          >
            Nex-Lib
          </Link>
          <p className="mt-2 text-sm text-cyan-50/90 md:text-base">
            A cleaner, more focused library workspace for browsing, managing,
            and tracking books across all frontend features.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-cyan-50/90 md:items-end">
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/allproduct" className="transition hover:text-white">
              All Books
            </Link>
            <Link to="/bookmanagement" className="transition hover:text-white">
              Manage Books
            </Link>
          </div>
          <p>Copyright 2026 Nex-Lib. Built for a modern library workflow.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
