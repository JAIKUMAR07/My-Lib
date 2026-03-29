import { createSlice } from "@reduxjs/toolkit";

const safeReadIssues = () => {
  try {
    const raw = localStorage.getItem("issues");
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

const defaultIssues = [
  {
    id: 1,
    transactionId: "TRX-2024-001",
    userId: 1,
    userLibId: "LIB-2024-001",
    userName: "John Doe",
    userEmail: "john@university.edu",
    bookId: 1,
    bookIsbn: "978-0134685991",
    bookTitle: "Effective Java",
    issueDate: "2024-03-01",
    dueDate: "2024-03-31",
    returnDate: null,
    status: "borrowed", // borrowed, returned, overdue
    fineAmount: 0,
    paidAmount: 0,
    condition: "good",
    issuedBy: "Admin001",
  },
  {
    id: 2,
    transactionId: "TRX-2024-002",
    userId: 2,
    userLibId: "LIB-2024-002",
    userName: "Jane Smith",
    userEmail: "jane@university.edu",
    bookId: 3,
    bookIsbn: "978-0321125217",
    bookTitle: "Domain-Driven Design",
    issueDate: "2024-02-15",
    dueDate: "2024-03-15",
    returnDate: null,
    status: "overdue",
    fineAmount: 150,
    paidAmount: 0,
    condition: "good",
    issuedBy: "Admin002",
  },
];

const savedState = safeReadIssues();

const initialState = {
  items: savedState?.items || defaultIssues,
  fineHistory: savedState?.fineHistory || [],
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    addIssue(state, action) {
      state.items.unshift({ 
        ...action.payload, 
        id: Date.now(), 
        transactionId: `TRX-${Date.now()}` 
      });
    },
    updateIssue(state, action) {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    markAsReturned(state, action) {
      const { id, returnDate, finePaidAmount, condition } = action.payload;
      const index = state.items.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.items[index].returnDate = returnDate;
        state.items[index].status = "returned";
        state.items[index].paidAmount += finePaidAmount;
        state.items[index].condition = condition;
      }
    },
    resolveOverdue(state, action) {
       // logic to check system dates and update statuses
    }
  },
});

export const { addIssue, updateIssue, markAsReturned } = issuesSlice.actions;

export default issuesSlice.reducer;
