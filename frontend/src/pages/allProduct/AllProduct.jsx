import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const sanitizeItem = (item) => {
    // Clone the item and remove or transform non-serializable fields
    const { time, ...serializableItem } = item;
    // Remove 'time' or any other non-serializable properties
    return serializableItem;
  };

  const addCart = (item) => {
    const sanitizedItem = sanitizeItem(item);
    dispatch(addToCart(sanitizedItem));
    toast.success("Added to Save");
  };

  const deleteCart = (item) => {
    const sanitizedItem = sanitizeItem(item);
    dispatch(deleteFromCart(sanitizedItem));
    toast.error("Deleted From Save");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-8">
        <div>
          <h1 className="text-center mb-5 text-2xl font-bold">All Books</h1>
        </div>

        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">{loading && <Loader />}</div>
            <div className="flex flex-wrap -m-4">
              {getAllProduct.map((item, index) => {
                const { id, title, price, productImageUrl, description } = item;
                return (
                  <div
                    key={index}
                    className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
                  >
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer flex flex-col justify-between">
                      <div className="flex justify-center items-center h-[150px] bg-gray-100">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="object-contain h-full"
                          src={productImageUrl}
                          alt={title}
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          Nex-Lib
                        </h2>
                        <h1 className="title-font text-sm font-medium text-gray-900 mb-2">
                          {title.substring(0, 25)}
                        </h1>
                        <p className="text-sm text-gray-600 mb-3">
                          {description.substring(0, 30)}
                        </p>

                        <div className="flex justify-center">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Delete from Save
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="bg-cyan-600 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
