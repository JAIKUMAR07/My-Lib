import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import Pages
import Homepage from "./pages/home/Homepage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrolltop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";

import CategoryPage from "./pages/category/CategoryPage";

import BookManagement from "./components/booksManagement/BookManagement";
import BookInventory from "./components/booksManagement/BookInventory";
import AddBook from "./components/booksManagement/AddBook";
import EditBook from "./components/booksManagement/EditBook";
// Import your existing context
import MyState from "./context/myState";

import StudentProfile from "./pages/profile/StudentProfile";
import LibrarianProfile from "./pages/profile/LibrarianProfile";
import AdminProfile from "./pages/profile/AdminProfile";

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />

          {/* Public Routes (formerly protected) */}
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/librarianprofile" element={<LibrarianProfile />} />
          <Route path="/adminprofile" element={<AdminProfile />} />

          <Route path="/bookmanagement" element={<BookManagement />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
