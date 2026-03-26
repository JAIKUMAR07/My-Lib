import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/allproduct", label: "All Books" },
    { to: "/cartpage", label: `Saved (${cartItems.length})` },
    { to: "/bookmanagement", label: "Book Management" },
    { to: "/borrowermanagement", label: "Borrower Management" },
    { to: "/registration", label: "Registration" },
    { to: "/studentborrowedbooks", label: "Borrowed Books" },
    { to: "/adminprofile", label: "Admin Profile" },
    { to: "/studentprofile", label: "Student Profile" },
    { to: "/librarianprofile", label: "Librarian Profile" },
  ];

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-white/18 text-white shadow-sm"
        : "text-cyan-50 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="brand-gradient sticky top-0 z-50 border-b border-white/10 shadow-lg shadow-cyan-950/10">
      <div className="page-shell px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <h2 className="text-center text-2xl font-bold text-white">
              Nex-Lib
            </h2>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <SearchBar />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-xl border border-white/20 bg-white/10 p-2 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden lg:mt-4 lg:block">
          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 rounded-3xl border border-white/15 bg-slate-950/15 p-4 backdrop-blur-lg lg:hidden">
            <SearchBar />
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
