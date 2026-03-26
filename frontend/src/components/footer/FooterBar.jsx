import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const FooterBar = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/50 backdrop-blur-xl">
      <div className="page-shell px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                  Nex<span className="text-cyan-600">Lib</span>
                </h2>
            </Link>
            <p className="text-slate-600 font-medium text-base leading-relaxed mb-6">
              Empowering readers and librarians with a modern, digital-first approach to library management. Join our community of lifelong learners.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-cyan-600 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-all"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-700 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Discovery</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">Home</Link></li>
              <li><Link to="/allproduct" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">Book Catalog</Link></li>
              <li><Link to="/studentborrowedbooks" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">Recently Borrowed</Link></li>
              <li><Link to="/cartpage" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">My Collection</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Management</h4>
            <ul className="space-y-4">
              <li><Link to="/bookmanagement" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">Manage Books</Link></li>
              <li><Link to="/borrowermanagement" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">Member Directory</Link></li>
              <li><Link to="/registration" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">New Registration</Link></li>
              <li><Link to="/librarianprofile" className="text-base font-medium text-slate-600 hover:text-cyan-600 transition-colors">Staff Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-base font-medium text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-600 shrink-0" />
                <span>123 Library Lane, Knowledge City, EDU 45678</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-600 shrink-0" />
                <span>+1 (555) 000-LIB-123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-600 shrink-0" />
                <span>support@nexlib.app</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <p>© {currentYear} Nex-Lib Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
