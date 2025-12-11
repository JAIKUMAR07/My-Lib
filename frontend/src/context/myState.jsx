import { useEffect, useState } from "react";
import MyContext from "./myContext";

function MyState({ children }) {
  // Loading State
  const [loading, setLoading] = useState(false);

  // User State
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);
  const [getIssue, setGetIssueBooks] = useState([]);

  // Helper to persist data to localStorage
  const persistData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Helper to load data from localStorage
  const loadData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  /**========================================================================
   *                          GET All Product Function
   *========================================================================**/
  const getAllProductFunction = () => {
    setLoading(true);
    try {
      // Load from local storage or use default empty array
      const products = loadData("products");
      setGetAllProduct(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      item.id === updatedProduct.id ? updatedProduct : item
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
  const getAllOrderFunction = () => {
    setLoading(true);
    try {
      const orders = loadData("orders");
      setGetAllOrder(orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /**========================================================================
   *                          GET All User Function
   *========================================================================**/
  const getAllUserFunction = () => {
    setLoading(true);
    try {
      const users = loadData("users");
      setGetAllUser(users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /**========================================================================
   *                          GET Issued Books Function
   *========================================================================**/

  const getIssueFunction = () => {
    setLoading(true);
    try {
      const issues = loadData("issues");
      setGetIssueBooks(issues);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Dummy Timestamp for compatibility
  const Timestamp = {
    now: () => new Date().toISOString(),
    seconds: Date.now() / 1000,
  };

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
    getIssueFunction();
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
