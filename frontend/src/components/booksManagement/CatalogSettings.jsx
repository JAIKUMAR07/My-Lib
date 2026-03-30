import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Layers, Languages, Plus, Trash2, Globe, Loader2, RefreshCcw, Pencil } from "lucide-react";
import { apiService } from "../../services/api";
import { setCategories, setLanguages } from "../../redux/booksSlice";

const normalize = (value = "") => value.trim().toLowerCase();
const DEFAULT_ICON = "https://img.icons8.com/isometric/512/add-folder.png";

const CatalogSettings = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items || []);

  const [categories, setCategoryRows] = useState([]);
  const [languages, setLanguageRows] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryLink, setNewCategoryLink] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingCategory, setSavingCategory] = useState(false);
  const [savingLanguage, setSavingLanguage] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryLink, setEditingCategoryLink] = useState("");
  const [updatingCategoryId, setUpdatingCategoryId] = useState(null);

  const categoryUsage = useMemo(() => {
    const usage = {};
    books.forEach((book) => {
      const key = normalize(book.category || "");
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

  const loadCatalog = async (withSpinner = true) => {
    if (withSpinner) setLoading(true);
    try {
      const [catRes, langRes] = await Promise.all([
        apiService.getCategories(),
        apiService.getLanguages(),
      ]);

      if (catRes.success) {
        setCategoryRows(catRes.data || []);
        dispatch(setCategories(catRes.data || []));
      }

      if (langRes.success) {
        setLanguageRows(langRes.data || []);
        dispatch(setLanguages(langRes.data || []));
      }
    } catch (err) {
      toast.error(`Failed to sync catalog: ${err.message}`);
    } finally {
      if (withSpinner) setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalog();

    const intervalId = setInterval(() => {
      loadCatalog(false);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddCategory = async () => {
    const name = newCategory.trim();
    const link = newCategoryLink.trim();

    if (!name) {
      toast.error("Category name is required.");
      return;
    }

    const exists = categories.some((item) => normalize(item.name) === normalize(name));
    if (exists) {
      toast.error("Category already exists.");
      return;
    }

    setSavingCategory(true);
    try {
      const res = await apiService.addCategory(name, link || null);
      if (!res.success) throw new Error(res.error || "Save failed");

      setNewCategory("");
      setNewCategoryLink("");
      await loadCatalog(false);
      toast.success("Category saved to Supabase.");
    } catch (err) {
      toast.error(`Category save failed: ${err.message}`);
    } finally {
      setSavingCategory(false);
    }
  };

  const openCategoryEditor = (category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryLink(category.link || "");
  };

  const handleUpdateCategoryLink = async () => {
    if (!editingCategoryId) return;

    setUpdatingCategoryId(editingCategoryId);
    try {
      const res = await apiService.updateCategoryLink(editingCategoryId, editingCategoryLink.trim());
      if (!res.success) throw new Error(res.error || "Update failed");

      setEditingCategoryId(null);
      setEditingCategoryLink("");
      await loadCatalog(false);
      toast.success("Category icon link updated.");
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    } finally {
      setUpdatingCategoryId(null);
    }
  };

  const handleAddLanguage = async () => {
    const name = newLanguage.trim();

    if (!name) {
      toast.error("Language name is required.");
      return;
    }

    const exists = languages.some((item) => normalize(item.name) === normalize(name));
    if (exists) {
      toast.error("Language already exists.");
      return;
    }

    setSavingLanguage(true);
    try {
      const res = await apiService.addLanguage(name);
      if (!res.success) throw new Error(res.error || "Save failed");

      setNewLanguage("");
      await loadCatalog(false);
      toast.success("Language saved to Supabase.");
    } catch (err) {
      toast.error(`Language save failed: ${err.message}`);
    } finally {
      setSavingLanguage(false);
    }
  };

  const handleRemoveCategory = async (category) => {
    const usage = categoryUsage[normalize(category.name)] || 0;
    if (usage > 0) {
      toast.error("Cannot delete category used by books.");
      return;
    }

    if (!window.confirm(`Delete category \"${category.name}\"?`)) return;

    try {
      await apiService.deleteCategory(category.id);
      await loadCatalog(false);
      toast.success("Category removed.");
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    }
  };

  const handleRemoveLanguage = async (language) => {
    const usage = languageUsage[normalize(language.name)] || 0;
    if (usage > 0) {
      toast.error("Cannot delete language used by books.");
      return;
    }

    if (!window.confirm(`Delete language \"${language.name}\"?`)) return;

    try {
      await apiService.deleteLanguage(language.id);
      await loadCatalog(false);
      toast.success("Language removed.");
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-end">
        <button
          onClick={() => loadCatalog()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700"
        >
          <RefreshCcw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Category Management</h3>
          </div>

          <div className="mb-5 space-y-3">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-cyan-400"
            />
            <input
              value={newCategoryLink}
              onChange={(e) => setNewCategoryLink(e.target.value)}
              placeholder="Icon link (optional)"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-cyan-400"
            />
            <button
              onClick={handleAddCategory}
              disabled={savingCategory}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingCategory ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Category
            </button>
          </div>

          <div className="space-y-2">
            {categories.map((category) => {
              const usage = categoryUsage[normalize(category.name)] || 0;
              const isEditing = editingCategoryId === category.id;
              return (
                <div key={category.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={category.link || DEFAULT_ICON}
                        alt={category.name}
                        className="h-10 w-10 rounded-xl border border-slate-100 bg-white object-cover p-1"
                        onError={(e) => { e.currentTarget.src = DEFAULT_ICON; }}
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{category.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Used by {usage} book{usage === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openCategoryEditor(category)}
                        className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition-all hover:text-cyan-700"
                        title="Edit icon link"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveCategory(category)}
                        disabled={usage > 0}
                        className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        value={editingCategoryLink}
                        onChange={(e) => setEditingCategoryLink(e.target.value)}
                        placeholder="Category icon link"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-cyan-400"
                      />
                      <button
                        onClick={handleUpdateCategoryLink}
                        disabled={updatingCategoryId === category.id}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white disabled:opacity-60"
                      >
                        {updatingCategoryId === category.id ? "Updating" : "Update"}
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

          <div className="mb-5 space-y-3">
            <input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Language name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-cyan-400"
            />
            <button
              onClick={handleAddLanguage}
              disabled={savingLanguage}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingLanguage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Language
            </button>
          </div>

          <div className="space-y-2">
            {languages.map((language) => {
              const usage = languageUsage[normalize(language.name)] || 0;
              return (
                <div key={language.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-slate-100 bg-white p-2 text-blue-700">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{language.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Used by {usage} book{usage === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveLanguage(language)}
                    disabled={usage > 0}
                    className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CatalogSettings;
