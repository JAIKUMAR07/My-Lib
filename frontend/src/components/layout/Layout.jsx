import Footer from "../footer/FooterBar";
import Navbar from "../navbar/Navbar";

const Layout = ({ children, contentClassName = "" }) => {
  return (
    <div className="min-h-screen text-slate-900">
      <Navbar />
      <main
        className={`main-content min-h-[calc(100vh-152px)] py-6 md:py-8 ${contentClassName}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
