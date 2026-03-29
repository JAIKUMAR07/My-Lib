import { createSlice } from '@reduxjs/toolkit';

const normalizeValue = (value = "") => value.trim().toLowerCase();
const toSafeInt = (value, fallback = 0) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
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
  items: savedState?.items || [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      total_copies: 25,
      available_copies: 18,
      borrowed_copies: 7,
      status: "in-stock",
      price: 1200,
      description: "A comprehensive guide to algorithm design and implementation.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Computer Science",
      total_copies: 15,
      available_copies: 5,
      borrowed_copies: 10,
      status: "in-stock",
      price: 850,
      description: "A handbook of agile software craftsmanship.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      isbn: "978-0201616224",
      category: "Computer Science",
      total_copies: 20,
      available_copies: 0,
      borrowed_copies: 20,
      status: "out-of-stock",
      price: 900,
      description: "Your journey to mastery in software development.",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Design Patterns",
      author: "Erich Gamma",
      isbn: "978-0201633610",
      category: "Computer Science",
      total_copies: 12,
      available_copies: 12,
      borrowed_copies: 0,
      status: "in-stock",
      price: 1100,
      description: "Elements of reusable object-oriented software.",
      image: "https://images.unsplash.com/photo-1532012197367-9b597ec7532d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "Structure and Interpretation",
      author: "Harold Abelson",
      isbn: "978-0262510875",
      category: "Computer Science",
      total_copies: 10,
      available_copies: 0,
      borrowed_copies: 10,
      status: "out-of-stock",
      price: 780,
      description: "Classic text on functional programming and Lisp.",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      title: "Code Complete",
      author: "Steve McConnell",
      isbn: "978-0735619678",
      category: "Software Engineering",
      total_copies: 8,
      available_copies: 6,
      borrowed_copies: 2,
      status: "in-stock",
      price: 950,
      description: "A practical guide to software construction.",
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      title: "The Art of Computer Programming",
      author: "Donald Knuth",
      isbn: "978-0201896831",
      category: "Computer Science",
      total_copies: 5,
      available_copies: 3,
      borrowed_copies: 2,
      status: "in-stock",
      price: 2500,
      description: "The multi-volume fundamental work on algorithms.",
      image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      title: "Artificial Intelligence",
      author: "Stuart Russell",
      isbn: "978-0136042594",
      category: "Computer Science",
      total_copies: 15,
      available_copies: 0,
      borrowed_copies: 15,
      status: "out-of-stock",
      price: 1450,
      description: "A modern approach to AI and intelligent systems.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 9,
      title: "Database Systems",
      author: "Hector Garcia-Molina",
      isbn: "978-0131873254",
      category: "Database",
      total_copies: 12,
      available_copies: 8,
      borrowed_copies: 4,
      status: "in-stock",
      price: 1050,
      description: "Core concepts of database management and storage.",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 10,
      title: "Computer Networks",
      author: "Andrew Tanenbaum",
      isbn: "978-0132126953",
      category: "Networking",
      total_copies: 10,
      available_copies: 7,
      borrowed_copies: 3,
      status: "in-stock",
      price: 890,
      description: "Protocols and architectures for computer communication.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
  ],
  categories: savedState?.categories || [
    { name: "Computer Science", icon: "https://img.icons8.com/isometric/512/laptop--v1.png" },
    { name: "Software Engineering", icon: "https://img.icons8.com/isometric/512/code.png" },
    { name: "Database", icon: "https://img.icons8.com/isometric/512/database.png" },
    { name: "Networking", icon: "https://img.icons8.com/isometric/512/network-cable.png" },
    { name: "Mathematics", icon: "https://img.icons8.com/isometric/512/math.png" }
  ],
  languages: savedState?.languages || ["English", "Hindi", "French", "German", "Spanish"],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
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
      const { name, icon } = action.payload || {};
      const trimmedName = name?.trim();
      if (!trimmedName) return;
      
      const exists = state.categories.some(
        (item) => normalizeValue(item.name) === normalizeValue(trimmedName)
      );
      if (!exists) {
        state.categories.push({ 
          name: trimmedName, 
          icon: icon || "https://img.icons8.com/isometric/512/add-folder.png" 
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
      const language = action.payload?.trim();
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
