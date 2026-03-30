import { Menu, X, ChevronDown, User, Settings, BookOpen, UserPlus, ShoppingCart, LogOut, LogIn } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, userRole, signOut, isAuthenticated, isAdmin, isLibrarian, isStudent } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart || []);
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Session Terminated Safely.");
      navigate("/login");
    } catch (error) {
      toast.error("Sign out failed.");
    }
  };

  const managementLinks = [
    { to: "/bookmanagement", label: "Books", icon: <BookOpen className="w-4 h-4" />, roles: ["admin", "librarian"] },
    { to: "/borrowermanagement", label: "Borrowers", icon: <Settings className="w-4 h-4" />, roles: ["admin", "librarian"] },
    { to: "/registration", label: "Registration", icon: <UserPlus className="w-4 h-4" />, roles: ["admin"] },
  ].filter(link => link.roles.includes(userRole));

  const getProfileLink = () => {
    if (isAdmin) return { to: "/adminprofile", label: "Admin Space" };
    if (isLibrarian) return { to: "/librarianprofile", label: "Staff Portal" };
    if (isStudent) return { to: "/studentprofile", label: "My Account" };
    return null;
  };

  const profileLink = getProfileLink();

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-5 py-2.5 text-base font-bold transition-all duration-300 ${
      isActive
        ? "bg-white/20 text-white shadow-sm ring-1 ring-white/30"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
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
            
            {/* Management Dropdown - Only for Staff */}
            {(isAdmin || isLibrarian) && managementLinks.length > 0 && (
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
            )}

            {isStudent && <NavLink to="/studentborrowedbooks" className={navLinkClass}>Borrowed</NavLink>}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
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

            {/* Profile Dropdown or Login */}
            {isAuthenticated ? (
              <div className="hidden lg:relative lg:block" ref={profileRef}>
                <button 
                  onClick={() => toggleDropdown('profile')}
                  className="flex items-center gap-2 p-1.5 pl-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all font-bold"
                >
                  <span className="text-sm">Account</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/30 flex items-center justify-center ring-1 ring-white/50">
                    <User className="w-4 h-4" />
                  </div>
                </button>
                
                {activeDropdown === 'profile' && (
                  <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 animate-fadeIn text-slate-900">
                    {profileLink && (
                      <NavLink
                        to={profileLink.to}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" /> {profileLink.label}
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-colors font-bold"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login" className="px-6 py-2.5 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all">Login</Link>
                <Link to="/signup" className="px-6 py-2.5 rounded-full bg-white text-slate-900 text-sm font-bold shadow-xl shadow-cyan-950/20 hover:scale-105 transition-all">Request Entry</Link>
              </div>
            )}

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
              
              {isStudent && <NavLink to="/studentborrowedbooks" onClick={() => setIsOpen(false)} className={navLinkClass}>Borrowed Books</NavLink>}
              
              {managementLinks.length > 0 && (
                <>
                  <div className="h-px bg-white/10 my-2 sm:col-span-2"></div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 px-4 mb-1 sm:col-span-2 font-bold">Management</p>
                  {managementLinks.map(link => (
                    <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/80 hover:bg-white/10">
                      {link.icon} {link.label}
                    </NavLink>
                  ))}
                </>
              )}

              <div className="h-px bg-white/10 my-2 sm:col-span-2"></div>
              {isAuthenticated ? (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 px-4 mb-1 sm:col-span-2 font-bold">Identity</p>
                  {profileLink && (
                    <NavLink to={profileLink.to} onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/80 hover:bg-white/10">
                      <User className="w-4 h-4" /> {profileLink.label}
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-rose-400 hover:bg-white/10 text-left">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="sm:col-span-2 flex flex-col gap-2 p-2">
                   <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-xl bg-white/10 text-center font-bold text-sm">Login</Link>
                   <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-xl bg-white text-slate-900 text-center font-bold text-sm">Join Nex-Lib</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
