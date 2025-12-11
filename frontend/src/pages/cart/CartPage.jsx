import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import { deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Remove From Save");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
          Saved Books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const { id, title, productImageUrl, description, category } =
                item;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="flex justify-center items-center h-[200px] bg-gray-100">
                    <img
                      src={productImageUrl}
                      alt={title}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{category}</p>
                    <p className="text-gray-700 mb-4">
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
            <h1 className="col-span-full text-center text-xl font-medium text-gray-500">
              No saved books found
            </h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
