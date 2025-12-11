import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
  {
    name: "Mechanical",
  },
  {
    name: "CSE",
  },
  {
    name: "Story",
  },
  {
    name: "Religions",
  },
  {
    name: "Civil",
  },
  {
    name: "Electronics",
  },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const {
    loading,
    setLoading,
    getAllProduct,
    updateProduct: updateProductContext,
  } = context;

  // navigate
  const navigate = useNavigate();
  // url se  product le lega uska id
  const { id } = useParams();
  console.log(id);

  // product state
  const [product, setProduct] = useState({
    title: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: "",
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get Single Product Function
  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = getAllProduct.find((p) => p.id === id);
      if (productTemp) {
        setProduct(productTemp);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      // Use context function
      updateProductContext(product);
      toast.success("Book Updated successfully");
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Book Update Failed");
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [getAllProduct, id]); // Depend on getAllProduct to ensure it runs when data is loaded

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        {/* Login Form  */}
        <div className="login_Form bg-cyan-400 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-blue-900 ">
              Update Book
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Product Title"
              className=" border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-400"
            />
          </div>

          {/* Input Two  */}

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              placeholder="Product Image Url"
              className="border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-400"
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-400  "
            >
              <option disabled>Select Book Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-400 "
            ></textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              onClick={updateProduct}
              type="button"
              className="bg-blue-700 hover:bg-pink-500 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
