import React, { useEffect, useState } from 'react';
import { Settings, Layers, Globe, Plus, Trash2, Loader2, Languages, Pencil } from 'lucide-react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { apiService } from '../../services/api';
import { setCategories as setStoreCategories, setLanguages as setStoreLanguages } from '../../redux/booksSlice';

const DEFAULT_ICON = 'https://img.icons8.com/isometric/512/add-folder.png';

const CatalogSettings = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catName, setCatName] = useState('');
  const [catLink, setCatLink] = useState('');
  const [langName, setLangName] = useState('');
  const [isSavingCat, setIsSavingCat] = useState(false);
  const [isSavingLang, setIsSavingLang] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryLink, setEditingCategoryLink] = useState('');
  const [updatingCategoryId, setUpdatingCategoryId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [catRes, langRes] = await Promise.all([
        apiService.getCategories(),
        apiService.getLanguages(),
      ]);

      if (catRes.success) {
        setCategories(catRes.data);
        dispatch(setStoreCategories(catRes.data));
      }

      if (langRes.success) {
        setLanguages(langRes.data);
        dispatch(setStoreLanguages(langRes.data));
      }
    } catch (err) {
      toast.error(`Failed to load: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveCategory = async () => {
    const name = catName.trim();
    const link = catLink.trim();
    if (!name) {
      toast.error('Category name is required');
      return;
    }

    setIsSavingCat(true);
    try {
      const res = await apiService.addCategory(name, link || null);
      if (!res.success) {
        toast.error(`Server error: ${res.error || 'Unknown'}`);
        return;
      }

      setCatName('');
      setCatLink('');
      await loadData();
      toast.success(`"${name}" saved to Supabase`);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsSavingCat(false);
    }
  };

  const openCategoryEditor = (category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryLink(category.link || '');
  };

  const updateCategoryLink = async () => {
    if (!editingCategoryId) return;

    setUpdatingCategoryId(editingCategoryId);
    try {
      const res = await apiService.updateCategoryLink(editingCategoryId, editingCategoryLink.trim());
      if (!res.success) {
        toast.error(`Server error: ${res.error || 'Unknown'}`);
        return;
      }

      setEditingCategoryId(null);
      setEditingCategoryLink('');
      await loadData();
      toast.success('Category icon link updated');
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    } finally {
      setUpdatingCategoryId(null);
    }
  };

  const saveLanguage = async () => {
    const name = langName.trim();
    if (!name) {
      toast.error('Language name is required');
      return;
    }

    setIsSavingLang(true);
    try {
      const res = await apiService.addLanguage(name);
      if (!res.success) {
        toast.error(`Server error: ${res.error || 'Unknown'}`);
        return;
      }

      setLangName('');
      await loadData();
      toast.success(`"${name}" saved to Supabase`);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsSavingLang(false);
    }
  };

  const deleteCategory = async (id, name) => {
    if (!window.confirm(`Remove "${name}"?`)) return;

    try {
      await apiService.deleteCategory(id);
      await loadData();
      toast.success('Category removed');
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    }
  };

  const deleteLanguage = async (id, name) => {
    if (!window.confirm(`Remove "${name}"?`)) return;

    try {
      await apiService.deleteLanguage(id);
      await loadData();
      toast.success('Language removed');
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <h1 className="flex items-center gap-4 text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
            <span className="bg-gradient-to-br from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Catalog Architecture</span>
            <Settings className="h-8 w-8 animate-pulse text-slate-900" />
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-slate-500">
            Manage your library taxonomy: categories and languages.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <section>
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Category Registry</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{categories.length} categories</p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <input
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveCategory()}
                  placeholder="Category Name"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold text-slate-900 outline-none transition-all focus:ring-4 focus:ring-indigo-100"
                />
                <input
                  type="text"
                  value={catLink}
                  onChange={(e) => setCatLink(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveCategory()}
                  placeholder="Icon Link (optional)"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold text-slate-900 outline-none transition-all focus:ring-4 focus:ring-indigo-100"
                />
                <button
                  onClick={saveCategory}
                  disabled={isSavingCat}
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-slate-900 text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-slate-700 active:scale-95 disabled:opacity-50"
                >
                  {isSavingCat ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving to Supabase...</>
                  ) : (
                    <><Plus className="h-5 w-5" /> Add Category</>
                  )}
                </button>
              </div>

              <div className="max-h-[400px] space-y-3 overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="py-8 text-center font-medium text-slate-400">No categories yet. Add one above.</p>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="rounded-2xl border border-transparent bg-slate-50 p-4 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={cat.link || DEFAULT_ICON}
                            alt={cat.name}
                            className="h-10 w-10 rounded-xl border border-slate-100 bg-white object-cover p-1"
                            onError={(e) => { e.currentTarget.src = DEFAULT_ICON; }}
                          />
                          <div>
                            <p className="text-sm font-black text-slate-900">{cat.name}</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{cat.link || 'No icon link'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openCategoryEditor(cat)}
                            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition-all hover:text-indigo-700"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteCategory(cat.id, cat.name)}
                            className="rounded-xl p-2 text-rose-300 transition-all hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {editingCategoryId === cat.id && (
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            value={editingCategoryLink}
                            onChange={(e) => setEditingCategoryLink(e.target.value)}
                            placeholder="Update icon link"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-300"
                          />
                          <button
                            onClick={updateCategoryLink}
                            disabled={updatingCategoryId === cat.id}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white disabled:opacity-60"
                          >
                            {updatingCategoryId === cat.id ? 'Updating' : 'Update'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section>
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Language Registry</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{languages.length} languages</p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <input
                  type="text"
                  value={langName}
                  onChange={(e) => setLangName(e.target.value)}
                  placeholder="Language Name"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 font-bold text-slate-900 outline-none transition-all focus:ring-4 focus:ring-emerald-100"
                />
                <button
                  onClick={saveLanguage}
                  disabled={isSavingLang}
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-600 text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
                >
                  {isSavingLang ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving to Supabase...</>
                  ) : (
                    <><Plus className="h-5 w-5" /> Add Language</>
                  )}
                </button>
              </div>

              <div className="max-h-[400px] space-y-3 overflow-y-auto">
                {languages.length === 0 ? (
                  <p className="py-8 text-center font-medium text-slate-400">No languages yet. Add one above.</p>
                ) : (
                  languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="group flex items-center justify-between rounded-2xl border border-transparent bg-slate-50 p-4 transition-all hover:border-emerald-100 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white p-2 text-emerald-600 shadow-sm">
                          <Languages className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{lang.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteLanguage(lang.id, lang.name)}
                        className="rounded-xl p-2 text-rose-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CatalogSettings;
