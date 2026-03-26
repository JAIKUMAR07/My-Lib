import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
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
    // eslint-disable-next-line no-unused-vars
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

  return (
    <Layout>
      <div className="page-shell px-4 py-4 md:px-6">
        <div className="page-section rounded-[2rem] px-4 py-8 md:px-8">
          <div>
            <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">
              All Books
            </h1>
            <p className="mb-8 text-center text-slate-600">
              Browse the full library collection and save books for later.
            </p>
          </div>

          <section className="text-gray-600 body-font">
            <div className="mx-auto px-2 py-2">
              <div className="flex justify-center">{loading && <Loader />}</div>
              <div className="flex flex-wrap">
                {getAllProduct.map((item, index) => {
                  const { id, title, productImageUrl, description } = item;
                  return (
                    <div
                      key={index}
                      className="w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                    >
                      <div className="soft-card h-full overflow-hidden rounded-3xl cursor-pointer transition duration-300 hover:-translate-y-1">
                        <div className="flex h-[220px] items-center justify-center bg-slate-50 p-4">
                          <img
                            onClick={() => navigate(`/productinfo/${id}`)}
                            className="h-full object-contain"
                            src={productImageUrl}
                            alt={title}
                          />
                        </div>
                        <div className="p-5">
                          <h2 className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-700">
                            Nex-Lib
                          </h2>
                          <h1 className="mb-2 text-lg font-semibold text-slate-900">
                            {title.substring(0, 25)}
                          </h1>
                          <p className="mb-4 text-sm leading-6 text-slate-600">
                            {description.substring(0, 30)}
                          </p>

                          <div className="flex justify-center">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deleteCart(item)}
                                className="w-full rounded-full bg-rose-500 py-2 text-sm font-bold text-white transition hover:bg-rose-600"
                              >
                                Delete from Save
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(item)}
                                className="w-full rounded-full bg-cyan-600 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
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
      </div>
    </Layout>
  );
};

export default AllProduct;
