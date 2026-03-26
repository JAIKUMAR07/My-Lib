import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const NoPage = () => {
  return (
    <Layout>
      <div className="page-shell px-4 md:px-6">
        <div className="page-section rounded-[2rem] px-6 py-16 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            This page is not available.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            The route may be missing, renamed, or still under construction.
            Use the navigation to jump back into the library experience.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
            >
              Return Home
            </Link>
            <Link
              to="/allproduct"
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Browse All Books
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoPage;
