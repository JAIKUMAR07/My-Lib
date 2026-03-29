import { Menu, X, ChevronDown, User, Settings, BookOpen, UserPlus, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart || []);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeRole, setActiveRole] = useState(
    () => localStorage.getItem("nexlib_role") || "guest"
  );
  const mgmtRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (mgmtRef.current && !mgmtRef.current.contains(event.target)) &&
        (profileRef.current && !profileRef.current.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const syncRole = () => {
      setActiveRole(localStorage.getItem("nexlib_role") || "guest");
    };
    window.addEventListener("storage", syncRole);
    window.addEventListener("nexlib-role-change", syncRole);
    return () => {
      window.removeEventListener("storage", syncRole);
      window.removeEventListener("nexlib-role-change", syncRole);
    };
  }, []);

  const managementLinks = [
    { to: "/bookmanagement", label: "Books", icon: <BookOpen className="w-4 h-4" /> },
    { to: "/borrowermanagement", label: "Borrowers", icon: <Settings className="w-4 h-4" /> },
    { to: "/registration", label: "Registration", icon: <UserPlus className="w-4 h-4" /> },
  ];

  const profileLinks = [
    { to: "/adminprofile", label: "Admin Profile" },
    { to: "/librarianprofile", label: "Librarian Profile" },
    { to: "/studentprofile", label: "Student Profile" },
  ];

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-5 py-2.5 text-base font-bold transition-all duration-300 ${
      isActive
        ? "bg-white/20 text-white shadow-sm ring-1 ring-white/30"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleRoleChange = (nextRole) => {
    setActiveRole(nextRole);
    localStorage.setItem("nexlib_role", nextRole);
    window.dispatchEvent(new Event("nexlib-role-change"));
  };

  return (
    <nav className="brand-gradient sticky top-0 z-50 border-b border-white/10 shadow-lg shadow-cyan-950/10 backdrop-blur-xl">
      <div className="page-shell px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter text-white">
              Nex<span className="text-cyan-200">Lib</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/allproduct" className={navLinkClass}>Catalog</NavLink>
            
            {/* Management Dropdown */}
            <div className="relative" ref={mgmtRef}>
              <button 
                onClick={() => toggleDropdown('mgmt')}
                className={`flex items-center gap-1 rounded-full px-5 py-2.5 text-base font-bold transition-all duration-300 ${activeDropdown === 'mgmt' ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
              >
                Management <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'mgmt' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'mgmt' && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 animate-fadeIn text-slate-900">
                  {managementLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
                    >
                      {link.icon} {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/studentborrowedbooks" className={navLinkClass}>Borrowed</NavLink>
          </div>



          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <select
                value={activeRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white outline-none backdrop-blur-md"
                title="Frontend access role"
              >
                <option value="guest" className="text-slate-900">Guest</option>
                <option value="student" className="text-slate-900">Student</option>
                <option value="librarian" className="text-slate-900">Librarian</option>
                <option value="admin" className="text-slate-900">Admin</option>
              </select>
            </div>

            <Link 
              to="/cartpage" 
              className="relative p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-slate-950 ring-2 ring-cyan-600">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="hidden lg:relative lg:block" ref={profileRef}>
              <button 
                onClick={() => toggleDropdown('profile')}
                className="flex items-center gap-2 p-1.5 pl-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all font-bold"
              >
                <span className="text-sm">Profiles</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/30 flex items-center justify-center ring-1 ring-white/50">
                  <User className="w-4 h-4" />
                </div>
              </button>
              
              {activeDropdown === 'profile' && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 animate-fadeIn text-slate-900">
                  {profileLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" /> {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-white/20 bg-white/10 p-2 text-white lg:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 rounded-3xl border border-white/15 bg-slate-950/20 p-4 backdrop-blur-2xl animate-scaleIn lg:hidden">

            
            <div className="grid gap-2 sm:grid-cols-2 text-white">
              <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/allproduct" onClick={() => setIsOpen(false)} className={navLinkClass}>Catalog</NavLink>
              <NavLink to="/studentborrowedbooks" onClick={() => setIsOpen(false)} className={navLinkClass}>Borrowed Books</NavLink>
              
              <div className="h-px bg-white/10 my-2 sm:col-span-2"></div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 px-4 mb-1 sm:col-span-2 font-bold">Management</p>
              {managementLinks.map(link => (
                <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/80 hover:bg-white/10">
                  {link.icon} {link.label}
                </NavLink>
              ))}

              <div className="h-px bg-white/10 my-2 sm:col-span-2"></div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 px-4 mb-1 sm:col-span-2 font-bold">Profiles</p>
              {profileLinks.map(link => (
                <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/80 hover:bg-white/10">
                  <User className="w-4 h-4" /> {link.label}
                </NavLink>
              ))}

              <div className="h-px bg-white/10 my-2 sm:col-span-2"></div>
              <div className="px-4 sm:col-span-2">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/50">Access Role</p>
                <select
                  value={activeRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white outline-none"
                >
                  <option value="guest" className="text-slate-900">Guest</option>
                  <option value="student" className="text-slate-900">Student</option>
                  <option value="librarian" className="text-slate-900">Librarian</option>
                  <option value="admin" className="text-slate-900">Admin</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
