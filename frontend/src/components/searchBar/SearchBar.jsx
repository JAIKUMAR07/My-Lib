import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const books = useSelector((state) => state.books.items);
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();

  const filterSearchData = books
    .filter((obj) => obj.title.toLowerCase().includes(normalizedSearch))
    .slice(0, 8);

  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <div className="relative flex justify-center">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          placeholder="Search books by title"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white px-10 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {normalizedSearch && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
          <div className="max-h-80 overflow-y-auto p-2">
            {filterSearchData.length > 0 ? (
              filterSearchData.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-sky-50"
                  onClick={() => {
                    navigate(`/productinfo/${item.id}`);
                    setSearch("");
                  }}
                >
                  <img
                    className="h-12 w-10 rounded-lg object-cover"
                    src={item.image || item.productImageUrl}
                    alt={item.title}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      Open details page
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No books matched your search.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
