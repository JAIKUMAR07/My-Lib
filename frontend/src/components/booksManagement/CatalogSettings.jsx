import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addCategory, updateCategory, addLanguage, removeCategory, removeLanguage } from "../../redux/booksSlice";
import { Layers, Languages, Plus, Trash2, BookOpen, Edit2 } from "lucide-react";

const normalize = (value = "") => value.trim().toLowerCase();

const CatalogSettings = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.books.categories || []);
  const languages = useSelector((state) => state.books.languages || []);
  const books = useSelector((state) => state.books.items || []);

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");
  const [editingCategory, setEditingCategory] = useState(null); // { name, icon }
  const [newLanguage, setNewLanguage] = useState("");

  const categoryUsage = useMemo(() => {
    const usage = {};
    books.forEach((book) => {
      const key = normalize(book.category);
      usage[key] = (usage[key] || 0) + 1;
    });
    return usage;
  }, [books]);

  const languageUsage = useMemo(() => {
    const usage = {};
    books.forEach((book) => {
      const key = normalize(book.language || "");
      usage[key] = (usage[key] || 0) + 1;
    });
    return usage;
  }, [books]);

  const handleAddCategory = () => {
    const name = newCategory.trim();
    const icon = newCategoryIcon.trim();
    if (!name) return;
    const alreadyExists = categories.some((item) => normalize(item.name) === normalize(name));
    if (alreadyExists) {
      toast.error("Category already exists.");
      return;
    }
    dispatch(addCategory({ name, icon }));
    setNewCategory("");
    setNewCategoryIcon("");
    toast.success("Category added.");
  };

  const handleUpdateCategoryIcon = () => {
    if (!editingCategory) return;
    dispatch(updateCategory(editingCategory));
    setEditingCategory(null);
    toast.success("Category icon updated.");
  };

  const handleAddLanguage = () => {
    const value = newLanguage.trim();
    if (!value) return;
    const alreadyExists = languages.some((item) => normalize(item) === normalize(value));
    if (alreadyExists) {
      toast.error("Language already exists.");
      return;
    }
    dispatch(addLanguage(value));
    setNewLanguage("");
    toast.success("Language added.");
  };

  const handleRemoveCategory = (catName) => {
    if ((categoryUsage[normalize(catName)] || 0) > 0) {
      toast.error("Cannot delete category used by books.");
      return;
    }
    dispatch(removeCategory(catName));
    toast.success("Category removed.");
  };

  const handleRemoveLanguage = (language) => {
    if ((languageUsage[normalize(language)] || 0) > 0) {
      toast.error("Cannot delete language used by books.");
      return;
    }
    dispatch(removeLanguage(language));
    toast.success("Language removed.");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Category Management</h3>
          </div>

          <div className="mb-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name..."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-cyan-400"
              />
              <input
                value={newCategoryIcon}
                onChange={(e) => setNewCategoryIcon(e.target.value)}
                placeholder="Icon URL (Optional)"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-cyan-400"
              />
            </div>
            <button
              onClick={handleAddCategory}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" /> Finalize Registry
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((category) => {
              const usage = categoryUsage[normalize(category.name)] || 0;
              const isEditing = editingCategory?.name === category.name;

              return (
                <div key={category.name} className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center">
                          <img src={isEditing ? editingCategory.icon : category.icon} alt="" className="w-8 h-8 object-contain" onError={(e) => e.target.src="https://img.icons8.com/isometric/512/add-folder.png"} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{category.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Used by {usage} book{usage === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingCategory(isEditing ? null : { ...category })}
                          className={`p-2 rounded-xl transition-all ${isEditing ? 'bg-cyan-600 text-white' : 'bg-white text-slate-400 hover:text-cyan-600 border border-slate-100'}`}
                        >
                          <Plus className={`h-4 w-4 transform transition-transform ${isEditing ? 'rotate-45' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleRemoveCategory(category.name)}
                          className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={usage > 0}
                          title={usage > 0 ? "Used by books" : "Delete"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                   </div>

                   {isEditing && (
                     <div className="flex gap-2 animate-fadeIn">
                       <input
                        value={editingCategory.icon}
                        onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                        placeholder="New Icon URL..."
                        className="flex-1 bg-white rounded-xl border border-slate-200 px-3 py-2 text-[10px] outline-none focus:border-cyan-400 font-mono"
                       />
                       <button 
                        onClick={handleUpdateCategoryIcon}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800"
                       >
                        Save
                       </button>
                     </div>
                   )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
              <Languages className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Language Management</h3>
          </div>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add new language"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-cyan-400"
            />
            <button
              onClick={handleAddLanguage}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>

          <div className="space-y-2">
            {languages.map((language) => {
              const usage = languageUsage[normalize(language)] || 0;
              return (
                <div key={language} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{language}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Used by {usage} book{usage === 1 ? "" : "s"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveLanguage(language)}
                    className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={usage > 0}
                    title={usage > 0 ? "Used by books" : "Delete"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Catalog Tips</h3>
        </div>
        <p className="text-sm text-slate-600">
          Keep category names short and consistent, and only remove categories/languages that are not currently assigned to books.
        </p>
      </section>
    </div>
  );
};

export default CatalogSettings;
