import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart || []); // Added fallback to prevent undefined
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to Save");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from Save");
  };

  return (
    <div className="page-shell mt-10 px-4 md:px-6">
      <div className="page-section rounded-[2rem] px-4 py-8 md:px-8">
        <div>
          <h1 className="mb-2 text-center text-3xl font-semibold text-slate-900">
            Available In Library
          </h1>
          <p className="mb-8 text-center text-slate-600">
            Hand-picked highlights from the current catalog.
          </p>
        </div>

        <section className="text-gray-600 body-font">
          <div className="mx-auto px-2 py-2">
            <div className="flex flex-wrap">
              {getAllProduct.slice(0, 8).map((item, index) => {
                const { id, title, productImageUrl, description } = item;
                return (
                  <div key={index} className="w-full p-3 sm:w-1/2 xl:w-1/4">
                    <div className="soft-card h-full cursor-pointer overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1">
                      <div className="flex h-[220px] items-center justify-center bg-slate-50 p-4">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="h-full object-contain"
                          src={productImageUrl}
                          alt={title}
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-700">
                          Nex-Lib
                        </h2>
                        <h1 className="mb-3 text-lg font-semibold text-slate-900">
                          {title.substring(0, 25)}
                        </h1>
                        <p className="mb-4 text-sm leading-6 text-slate-600">
                          {description.substring(0, 25)}
                        </p>

                        <div className="flex justify-center">
                          {cartItems.some((p) => p.id === item.id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="w-full rounded-full bg-rose-500 py-2 text-sm font-bold text-white transition hover:bg-rose-600"
                            >
                              Remove from Save
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
  );
};

export default HomePageProductCard;
