import { createSlice } from '@reduxjs/toolkit';

const normalizeValue = (value = "") => value.trim().toLowerCase();
const DEFAULT_CATEGORY_ICON = "https://img.icons8.com/isometric/512/add-folder.png";
const toSafeInt = (value, fallback = 0) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const normalizeCategories = (categories = []) => {
  const mapped = (Array.isArray(categories) ? categories : [])
    .map((item) => {
      if (typeof item === "string") {
        return {
          name: item.trim(),
          icon: DEFAULT_CATEGORY_ICON,
        };
      }
      if (!item || typeof item !== "object") return null;
      const normalizedLink = (item.link || "").trim();
      return {
        ...item,
        name: (item.name || "").trim(),
        link: normalizedLink,
        icon: item.icon || normalizedLink || DEFAULT_CATEGORY_ICON,
      };
    })
    .filter((item) => item?.name);

  const seen = new Set();
  return mapped.filter((item) => {
    const key = normalizeValue(item.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const normalizeLanguages = (languages = []) => {
  const mapped = (Array.isArray(languages) ? languages : [])
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") return (item.name || "").trim();
      return "";
    })
    .filter(Boolean);

  const seen = new Set();
  return mapped.filter((item) => {
    const key = normalizeValue(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const safeReadBooks = () => {
  try {
    const raw = localStorage.getItem("books");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Validate we have the properties we expect
    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

const savedState = safeReadBooks();

const initialState = {
  items: savedState?.items || [],
  categories: normalizeCategories(savedState?.categories),
  languages: normalizeLanguages(savedState?.languages),
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = normalizeCategories(action.payload);
    },
    setLanguages: (state, action) => {
      state.languages = normalizeLanguages(action.payload);
    },
    addBook: (state, action) => {
      const totalCopies = Math.max(0, toSafeInt(action.payload.total_copies, 1));
      const requestedAvailable = Math.max(0, toSafeInt(action.payload.available_copies, totalCopies));
      const availableCopies = Math.min(requestedAvailable, totalCopies);
      const newBook = {
        ...action.payload,
        id: state.items.length > 0 ? Math.max(...state.items.map(b => b.id)) + 1 : 1,
        total_copies: totalCopies,
        available_copies: availableCopies,
        borrowed_copies: Math.max(0, totalCopies - availableCopies),
        image:
          action.payload.image ||
          action.payload.imageUrl ||
          action.payload.productImageUrl ||
          "https://images.unsplash.com/photo-1543005139-85e883804825?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        status: availableCopies > 0 ? 'in-stock' : 'out-of-stock',
      };
      state.items.unshift(newBook);
    },
    updateBook: (state, action) => {
      const index = state.items.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        const currentBook = state.items[index];
        const totalCopies = Math.max(0, toSafeInt(action.payload.total_copies, currentBook.total_copies));
        const requestedAvailable = Math.max(0, toSafeInt(action.payload.available_copies, currentBook.available_copies));
        const availableCopies = Math.min(requestedAvailable, totalCopies);
        state.items[index] = {
           ...currentBook, 
           ...action.payload,
           total_copies: totalCopies,
           available_copies: availableCopies,
           borrowed_copies: Math.max(0, totalCopies - availableCopies),
           image:
            action.payload.image ||
            action.payload.imageUrl ||
            action.payload.productImageUrl ||
            currentBook.image,
           status: availableCopies > 0 ? 'in-stock' : 'out-of-stock'
        };
      }
    },
    deleteBook: (state, action) => {
      state.items = state.items.filter(book => book.id !== action.payload);
    },
    adjustStock: (state, action) => {
      const { id, delta } = action.payload;
      const book = state.items.find(b => b.id === id);
      if (book) {
        if (delta < 0 && book.available_copies < Math.abs(delta)) return;
        book.total_copies += delta;
        book.available_copies += delta;
        book.status = book.available_copies > 0 ? 'in-stock' : 'out-of-stock';
      }
    },
    addCategory: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === "string" ? payload : payload?.name;
      const icon = typeof payload === "string" ? undefined : payload?.icon;
      const trimmedName = name?.trim();
      if (!trimmedName) return;
      
      const exists = state.categories.some(
        (item) => normalizeValue(item.name) === normalizeValue(trimmedName)
      );
      if (!exists) {
        state.categories.push({ 
          name: trimmedName, 
          icon: icon || DEFAULT_CATEGORY_ICON
        });
      }
    },
    updateCategory: (state, action) => {
       const { name, icon } = action.payload || {};
       const index = state.categories.findIndex(c => normalizeValue(c.name) === normalizeValue(name));
       if (index !== -1) {
         state.categories[index].icon = icon;
       }
    },
    addLanguage: (state, action) => {
      const payload = action.payload;
      const rawLanguage = typeof payload === "string" ? payload : payload?.name;
      const language = rawLanguage?.trim();
      if (!language) return;
      const exists = state.languages.some(
        (item) => normalizeValue(item) === normalizeValue(language)
      );
      if (!exists) {
        state.languages.push(language);
      }
    },
    removeCategory: (state, action) => {
      const nameToRemove = action.payload?.trim();
      if (!nameToRemove) return;
      const isUsedByBooks = state.items.some(
        (book) => normalizeValue(book.category) === normalizeValue(nameToRemove)
      );
      if (isUsedByBooks) return;
      state.categories = state.categories.filter(
        (item) => normalizeValue(item.name) !== normalizeValue(nameToRemove)
      );
    },
    removeLanguage: (state, action) => {
      const languageToRemove = action.payload?.trim();
      if (!languageToRemove) return;
      const isUsedByBooks = state.items.some(
        (book) => normalizeValue(book.language || "") === normalizeValue(languageToRemove)
      );
      if (isUsedByBooks) return;
      state.languages = state.languages.filter(
        (item) => normalizeValue(item) !== normalizeValue(languageToRemove)
      );
    }
  },
});

export const {
  setCategories,
  setLanguages,
  addBook,
  updateBook,
  deleteBook,
  adjustStock,
  addCategory,
  updateCategory,
  addLanguage,
  removeCategory,
  removeLanguage,
} = booksSlice.actions;
export default booksSlice.reducer;
