import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const navigate = useNavigate();

  // Filter product
  const filterProduct = getAllProduct.filter(
    (product) =>
      product.category.toLowerCase().trim() ===
      categoryname.toLowerCase().trim()
  );

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item)); // Correctly call the action creator
    toast.success("Added to Save");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item)); // Correctly call the action creator
    toast.success("Removed from Save");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="mt-10">
        <div className="">
          <h1 className="text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  <>
                    {filterProduct.slice(0, 8).map((item, index) => {
                      const { id, title, description, productImageUrl } = item;
                      return (
                        <div key={index} className="p-4  w-1/4">
                          <div className="h-[100%] border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="lg:h-52 h-96 w-full"
                              src={productImageUrl}
                              alt="img"
                            />
                            <div className="p-6">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                Nex-Lib
                              </h2>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                {title.substring(0, 25)}
                              </h1>
                              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                {description}
                              </h1>

                              <div className="flex justify-center">
                                {cartItems.some((p) => p.id === item.id) ? (
                                  <button
                                    onClick={() => deleteCart(item)}
                                    className="bg-red-700 hover:bg-blue-700 w-full text-white py-[4px] rounded-lg font-bold"
                                  >
                                    Delete from Save
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addCart(item)}
                                    className="bg-cyan-600 hover:bg-blue-700 w-full text-white py-[4px] rounded-lg font-bold"
                                  >
                                    Add to Save
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <img
                        className="mb-2"
                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                        alt="No products found"
                      />
                    </div>
                    <h1 className="text-black text-xl">
                      No {categoryname} Books found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
