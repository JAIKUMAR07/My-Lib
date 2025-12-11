import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct } = context;

  const [product, setProduct] = useState("");

  const { id } = useParams();

  // getProductData
  const getProductData = async () => {
    setLoading(true);
    try {
      // Find product from local state
      const productTemp = getAllProduct.find((p) => p.id === id);
      if (productTemp) {
        setProduct(productTemp);
      } else {
        // toast.error("Product not found");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to Save");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from Save");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (getAllProduct.length > 0) {
      getProductData();
    }
  }, [getAllProduct, id]); // Re-run when products are loaded

  return (
    <Layout>
      <section className="py-16 justify-center items-center  font-poppins dark:bg-gray-100">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="max-w-6xl px-4  mx-auto justify-center align-middle items-center ">
            <div className="justify-center items-  flex flex-col md:flex-row md:items-start md:justify-between mb-24 -mx-4">
              <div className="justify-center items-center w-full md:w-1/2 px-4 mb-8 md:mb-0 flex">
                <img
                  className="w-full h-auto max-w-md rounded-lg"
                  src={product?.productImageUrl}
                  alt={product?.title}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 justify-center items-center">
                <div className="lg:pl-20">
                  <h2 className="text-xl md:text-2xl font-semibold leading-loose tracking-wide text-gray-800 dark:text-gray-800 mb-6">
                    {product?.title}
                  </h2>
                  <h2 className="text-lg font-bold text-gray-700 mb-2">
                    Description:
                  </h2>
                  <p className="mb-6">{product?.description}</p>
                  {cartItems.some((p) => p.id === product.id) ? (
                    <button
                      onClick={() => deleteCart(product)}
                      className="w-full px-4 py-3 text-center text-pink-600 bg-pink-100 border border-pink-600 hover:bg-pink-600 hover:text-gray-100 rounded-xl"
                    >
                      Delete from Save
                    </button>
                  ) : (
                    <button
                      onClick={() => addCart(product)}
                      className="w-full px-4 py-3  rounded-xl
                      bg-cyan-600 hover:bg-blue-700  text-white text-center font-bold "
                    >
                      Add to Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
