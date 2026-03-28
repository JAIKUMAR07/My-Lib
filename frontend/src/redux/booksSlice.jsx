import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
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
      price: 1200, // Added price for the store view
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
  categories: ["Computer Science", "Software Engineering", "Database", "Networking", "Mathematics"],
  languages: ["English", "Hindi", "French", "German", "Spanish"],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: state.items.length > 0 ? Math.max(...state.items.map(b => b.id)) + 1 : 1,
        borrowed_copies: 0,
        status: action.payload.available_copies > 0 ? 'in-stock' : 'out-of-stock',
      };
      state.items.unshift(newBook);
    },
    updateBook: (state, action) => {
      const index = state.items.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
           ...state.items[index], 
           ...action.payload,
           status: action.payload.available_copies > 0 ? 'in-stock' : 'out-of-stock'
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
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    addLanguage: (state, action) => {
      if (!state.languages.includes(action.payload)) {
        state.languages.push(action.payload);
      }
    }
  },
});

export const { addBook, updateBook, deleteBook, adjustStock, addCategory, addLanguage } = booksSlice.actions;
export default booksSlice.reducer;
