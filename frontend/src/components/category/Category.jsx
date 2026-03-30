import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const iconPool = [
  "https://cdn-icons-png.flaticon.com/128/10150/10150793.png",
  "https://cdn-icons-png.flaticon.com/128/389/389493.png",
  "https://cdn-icons-png.flaticon.com/128/3500/3500690.png",
  "https://cdn-icons-png.flaticon.com/128/2276/2276360.png",
  "https://cdn-icons-png.flaticon.com/128/2249/2249539.png",
  "https://cdn-icons-png.flaticon.com/128/675/675795.png",
];

const colorPool = [
  "bg-blue-50 text-blue-600",
  "bg-orange-50 text-orange-600",
  "bg-purple-50 text-purple-600",
  "bg-emerald-50 text-emerald-600",
  "bg-rose-50 text-rose-600",
  "bg-amber-50 text-amber-600",
  "bg-indigo-50 text-indigo-600",
  "bg-cyan-50 text-cyan-600",
];

const Category = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const categories = useSelector((state) => state.books.categories || []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="page-shell px-4 py-12 md:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Browse by <span className="brand-gradient-text">Category</span>
          </h2>
          <p className="mt-2 text-slate-500 max-w-md text-sm md:text-base">
            Find specialized knowledge across disciplines. Slide to explore
            more.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-cyan-600 hover:border-cyan-100 transition-all active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-cyan-600 hover:border-cyan-100 transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => navigate("/allproduct")}
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors group"
          >
            All Departments{" "}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4"
      >
        {categories.map((category, index) => (
          <div
            key={category.name}
            onClick={() => navigate(`/category/${encodeURIComponent(category.name.toLowerCase())}`)}
            className="group cursor-pointer shrink-0 w-[160px] md:w-[200px] snap-start"
          >
            <div className="soft-card relative overflow-hidden p-6 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-100/50 flex flex-col items-center justify-center aspect-square border-none bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/20">
              <div
                className={`w-14 h-14 md:w-20 md:h-20 rounded-3xl ${colorPool[index % colorPool.length].split(" ")[0]} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
              >
                <img
                  src={category.icon || category.link || iconPool[index % iconPool.length]}
                  alt={category.name}
                  className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md object-contain"
                  onError={(e) => {
                    e.target.src = iconPool[index % iconPool.length];
                  }}
                />
              </div>
              <h3 className="text-xs md:text-base font-bold text-slate-800 text-center tracking-tight">
                {category.name}
              </h3>

              {/* Decorative background element */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-100 rounded-full group-hover:scale-[3] transition-transform duration-700 opacity-20"></div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/allproduct")}
        className="sm:hidden w-full mt-6 py-4 rounded-2xl bg-white border border-slate-100 font-bold text-cyan-600 text-sm flex items-center justify-center gap-2 shadow-sm"
      >
        View All Departments <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Category;
