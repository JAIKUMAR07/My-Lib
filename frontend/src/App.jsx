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
import BorrowerManagement from "./components/borrowerManagement/BorrowerManagement";
import BookManagement from "./pages/booksManagement/BookManagement";
import StudentBorrowedBooks from "./components/studentBorrowedBooks/StudentBorrowedBooks";
// Import your existing context
import MyState from "./context/myState";

import StudentProfile from "./pages/profile/StudentProfile";
import LibrarianProfile from "./pages/profile/LibrarianProfile";
import AdminProfile from "./pages/profile/AdminProfile";
import Registration from "./components/registration/Registration";
import Layout from "./components/layout/Layout";

const renderWithLayout = (element, contentClassName = "") => (
  <Layout contentClassName={contentClassName}>{element}</Layout>
);

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />

          {/* Public Routes (formerly protected) */}
          <Route
            path="/studentprofile"
            element={renderWithLayout(
              <div className="page-shell px-4 md:px-6">
                <StudentProfile />
              </div>
            )}
          />
          <Route
            path="/librarianprofile"
            element={renderWithLayout(
              <div className="page-shell px-4 md:px-6">
                <LibrarianProfile />
              </div>
            )}
          />
          <Route
            path="/adminprofile"
            element={renderWithLayout(
              <div className="page-shell px-4 md:px-6">
                <AdminProfile />
              </div>
            )}
          />
          <Route
            path="/registration"
            element={renderWithLayout(<Registration />, "px-0")}
          />
          <Route
            path="/bookmanagement"
            element={renderWithLayout(<BookManagement />, "px-0")}
          />
          <Route
            path="/borrowermanagement"
            element={renderWithLayout(<BorrowerManagement />, "px-0")}
          />
          <Route
            path="/studentborrowedbooks"
            element={renderWithLayout(<StudentBorrowedBooks />, "px-0")}
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </MyState>
  );
};

export default App;
