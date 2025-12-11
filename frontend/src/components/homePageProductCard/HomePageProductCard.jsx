import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const HomePageProductCard = () => {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { getAllProduct, getAllUser } = context;

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <div>
        <h1 className="text-center mb-5 text-2xl font-semibold">
          Available In Library
        </h1>
      </div>

      {/* Main */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, productImageUrl, description } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer flex flex-col justify-between">
                    <div className="flex justify-center items-center h-[150px]">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="object-contain h-full"
                        src={productImageUrl}
                        alt={title}
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        Nex-Lib
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {description.substring(0, 25)}
                      </h1>

                      <div className="flex justify-center">
                        {cartItems.some((p) => p.id === item.id) ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="bg-red-700 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Remove from Save
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
  );
};

export default HomePageProductCard;
