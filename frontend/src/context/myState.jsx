import { useState, useCallback } from "react";
import MyContext from "./myContext";

// Dummy Timestamp for compatibility (defined at top to avoid reference errors)
const Timestamp = {
  now: () => new Date().toISOString(),
  seconds: Date.now() / 1000,
};

function MyState({ children }) {
  const persistData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Helper to load data from localStorage
  const loadData = (key) => {
    try {
      const data = localStorage.getItem(key);
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [loading, setLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState(() => loadData("products"));
  const [getAllOrder, setGetAllOrder] = useState(() => loadData("orders"));
  const [getAllUser, setGetAllUser] = useState(() => loadData("users"));
  const [getIssue, setGetIssueBooks] = useState(() => loadData("issues"));

  /**========================================================================
   *                          GET All Product Function
   *========================================================================**/
  const getAllProductFunction = useCallback(() => {
    try {
      setGetAllProduct(loadData("products"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Function to add a product (for use in AddProductPage)
  const addProduct = (product) => {
    const updatedProducts = [
      ...getAllProduct,
      { ...product, id: Date.now().toString(), time: Timestamp.now() },
    ];
    setGetAllProduct(updatedProducts);
    persistData("products", updatedProducts);
  };

  // Function to update a product
  const updateProduct = (updatedProduct) => {
    const updatedProducts = getAllProduct.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item,
    );
    setGetAllProduct(updatedProducts);
    persistData("products", updatedProducts);
  };

  // Function to delete a product
  const deleteProduct = (id) => {
    const updatedProducts = getAllProduct.filter((item) => item.id !== id);
    setGetAllProduct(updatedProducts);
    persistData("products", updatedProducts);
  };

  /**========================================================================
   *                           GET All Order Function
   *========================================================================**/
  const getAllOrderFunction = useCallback(() => {
    try {
      setGetAllOrder(loadData("orders"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**========================================================================
   *                          GET All User Function
   *========================================================================**/
  const getAllUserFunction = useCallback(() => {
    try {
      setGetAllUser(loadData("users"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**========================================================================
   *                          GET Issued Books Function
   *========================================================================**/

  const getIssueFunction = useCallback(() => {
    try {
      setGetIssueBooks(loadData("issues"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        addProduct,
        updateProduct,
        deleteProduct,
        getAllUser,
        getAllUserFunction,
        getAllOrder,
        getAllOrderFunction,
        getIssueFunction,
        getIssue,
        setGetIssueBooks, // Exposed for adding issues
        setGetAllProduct, // Exposed for flexibility
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
