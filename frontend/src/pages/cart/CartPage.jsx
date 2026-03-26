import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import { deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Remove From Save");
  };

  return (
    <Layout>
      <div className="page-shell px-4 md:px-6">
        <div className="page-section rounded-[2rem] px-4 py-8 md:px-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900">
            Saved Books
          </h1>
          <p className="mb-8 text-slate-600">
            Your quick access list for books you want to revisit.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const { title, productImageUrl, description, category } = item;
              return (
                <div
                  key={index}
                  className="soft-card overflow-hidden rounded-3xl flex flex-col"
                >
                  <div className="flex h-[220px] items-center justify-center bg-slate-50 p-4">
                    <img
                      src={productImageUrl}
                      alt={title}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="mb-1 text-lg font-semibold text-slate-800">
                      {title}
                    </h3>
                    <p className="mb-2 text-sm text-slate-500">{category}</p>
                    <p className="mb-4 text-slate-700">
                      {description.substring(0, 40)}
                    </p>
                    <button
                      onClick={() => deleteCart(item)}
                      className="flex items-center text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash size={16} className="mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="col-span-full text-center text-xl font-medium text-slate-500">
              No saved books found
            </h1>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
