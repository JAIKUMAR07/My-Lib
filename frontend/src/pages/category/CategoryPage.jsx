import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const books = useSelector((state) => state.books.items);
  const loading = useSelector((state) => state.books.loading);

  const navigate = useNavigate();
  const normalizedCategory = decodeURIComponent(categoryname || "")
    .toLowerCase()
    .trim();

  // Filter product
  const filterProduct = books.filter(
    (product) =>
      product.category.toLowerCase().trim() ===
      normalizedCategory
  );

  const cartItems = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item)); // Correctly call the action creator
    toast.success("Added to Save");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item)); // Correctly call the action creator
    toast.success("Removed from Save");
  };

  return (
    <Layout>
      <div className="page-shell px-4 md:px-6">
        <div className="page-section mt-2 rounded-[2rem] px-4 py-8 md:px-8">
          <h1 className="mb-3 text-center text-3xl font-semibold capitalize text-slate-900">
            {decodeURIComponent(categoryname || "")}
          </h1>
          <p className="mb-8 text-center text-slate-600">
            Filtered collection for this category.
          </p>

          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <section className="text-gray-600 body-font">
              <div className="mx-auto px-2 py-2">
                <div className="flex flex-wrap justify-center">
                  {filterProduct.length > 0 ? (
                    <>
                      {filterProduct.slice(0, 12).map((item) => {
                        const { id, title, description } = item;
                        return (
                          <div
                            key={id}
                            className="w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                          >
                            <div className="soft-card h-full overflow-hidden rounded-3xl cursor-pointer transition duration-300 hover:-translate-y-1">
                              <img
                                onClick={() => navigate(`/productinfo/${id}`)}
                                className="h-64 w-full object-cover lg:h-56"
                                src={item.image || item.productImageUrl}
                                alt={title}
                              />
                              <div className="p-6">
                                <h2 className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-cyan-700">
                                  Nex-Lib
                                </h2>
                                <h1 className="mb-3 text-lg font-semibold text-slate-900">
                                  {title.substring(0, 45)}
                                </h1>
                                <p className="mb-4 text-sm leading-6 text-slate-600">
                                  {description.substring(0, 80)}
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
                                      className="w-full rounded-full bg-cyan-600 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
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
                    <div className="py-8 text-center">
                      <div className="flex justify-center">
                        <img
                          className="mb-3"
                          src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                          alt="No products found"
                        />
                      </div>
                      <h1 className="text-xl font-semibold text-slate-900">
                        No {categoryname} Books found
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
