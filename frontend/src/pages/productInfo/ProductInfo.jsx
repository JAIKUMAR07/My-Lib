import { useContext, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const { id } = useParams();
  const product = useMemo(
    () => getAllProduct.find((p) => p.id === id),
    [getAllProduct, id]
  );

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

  return (
    <Layout>
      <section className="page-shell px-4 py-6 md:px-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="page-section rounded-[2rem] px-4 py-8 md:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex w-full items-center justify-center md:w-1/2">
                <img
                  className="max-h-[420px] w-full max-w-md rounded-3xl bg-slate-50 object-contain p-4"
                  src={product?.productImageUrl}
                  alt={product?.title}
                />
              </div>
              <div className="w-full md:w-1/2 md:pt-4">
                <div className="md:pl-4 lg:pl-10">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-700">
                    Book Details
                  </p>
                  <h2 className="mb-6 text-3xl font-semibold leading-tight text-slate-900">
                    {product?.title}
                  </h2>
                  <h2 className="mb-2 text-lg font-bold text-slate-700">
                    Description:
                  </h2>
                  <p className="mb-6 leading-7 text-slate-600">
                    {product?.description || "No description available yet."}
                  </p>
                  {cartItems.some((p) => p.id === product?.id) ? (
                    <button
                      onClick={() => deleteCart(product)}
                      className="w-full rounded-full border border-rose-500 bg-rose-50 px-4 py-3 text-center font-bold text-rose-600 transition hover:bg-rose-500 hover:text-white"
                    >
                      Delete from Save
                    </button>
                  ) : (
                    <button
                      onClick={() => addCart(product)}
                      className="w-full rounded-full bg-cyan-600 px-4 py-3 text-center font-bold text-white transition hover:bg-blue-700"
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
