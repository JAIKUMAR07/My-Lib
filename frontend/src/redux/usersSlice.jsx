import { createSlice } from "@reduxjs/toolkit";

const safeReadUsers = () => {
  try {
    const raw = localStorage.getItem("users");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

const defaultUsers = [
  {
    id: 1,
    libId: "LIB-2024-001",
    name: "John Doe",
    fullName: "John Doe",
    email: "john@university.edu",
    phone: "+91 9876543210",
    role: "student",
    department: "Computer Science",
    currentBorrowed: 2,
    maxBooksAllowed: 5,
    outstandingFines: 500,
    registrationDate: "2024-01-15",
    status: "active",
    active: true,
  },
  {
    id: 2,
    libId: "LIB-2024-002",
    name: "Jane Smith",
    fullName: "Jane Smith",
    email: "jane@university.edu",
    phone: "+91 9876543211",
    role: "librarian",
    department: "Electronics",
    currentBorrowed: 1,
    maxBooksAllowed: 5,
    outstandingFines: 0,
    registrationDate: "2024-01-16",
    status: "active",
    active: true,
  },
  {
    id: 3,
    libId: "LIB-2024-003",
    name: "Mike Wilson",
    fullName: "Mike Wilson",
    email: "mike@university.edu",
    phone: "+91 9876543212",
    role: "student",
    department: "Mechanical",
    currentBorrowed: 3,
    maxBooksAllowed: 3,
    outstandingFines: 250,
    registrationDate: "2024-01-18",
    status: "active",
    active: true,
  },
  {
    id: 4,
    libId: "DEMO-001",
    name: "Demo Student",
    fullName: "Demo Student",
    email: "demo@university.edu",
    phone: "+91 9876543213",
    role: "student",
    department: "General",
    currentBorrowed: 0,
    maxBooksAllowed: 3,
    outstandingFines: 0,
    registrationDate: "2024-03-20",
    status: "pending",
    active: true,
  }
];

const savedState = safeReadUsers();

const initialState = {
  items: savedState?.items || defaultUsers,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        libId: action.payload.libId || `LIB-${Date.now().toString().slice(-4)}`,
        registrationDate: new Date().toISOString().split("T")[0],
        currentBorrowed: 0,
        outstandingFines: 0,
        active: true,
        status: action.payload.status || "pending",
      };
      state.items.unshift(newUser);
    },
    updateUser(state, action) {
      const index = state.items.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteUser(state, action) {
      state.items = state.items.filter((u) => u.id !== action.payload);
    },
    sendInvite(state, action) {
       const user = state.items.find(u => u.id === action.payload);
       if (user) {
         user.inviteSent = true;
         user.status = "pending";
       }
    }
  },
});

export const { addUser, updateUser, deleteUser, sendInvite } = usersSlice.actions;

export default usersSlice.reducer;
