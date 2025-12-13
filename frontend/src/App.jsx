import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// Import Pages
import Homepage from "./pages/home/Homepage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrolltop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import CategoryPage from "./pages/category/CategoryPage";

import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import IssueProduct from "./pages/admin/IssueProduct";

// Import your existing context
import MyState from "./context/myState";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <MyState>
      <AuthProvider>
        <Router>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/allproduct" element={<AllProduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category/:categoryname" element={<CategoryPage />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRouteForUser>
                  <Profile />
                </ProtectedRouteForUser>
              }
            />

            <Route
              path="/addproduct"
              element={
                <ProtectedRouteForAdmin>
                  <AddProductPage />
                </ProtectedRouteForAdmin>
              }
            />
            <Route
              path="/updateproduct/:id"
              element={
                <ProtectedRouteForAdmin>
                  <UpdateProductPage />
                </ProtectedRouteForAdmin>
              }
            />
            <Route
              path="/issueproduct"
              element={
                <ProtectedRouteForAdmin>
                  <IssueProduct />
                </ProtectedRouteForAdmin>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </MyState>
  );
};

export default App;
