import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
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

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, addProduct } = context;

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: "", // managed in context or here
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Add Product Function
  const addProductFunction = async () => {
    if (
      product.title == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);
    try {
      // Use local context function
      addProduct(product);
      toast.success("Add Book successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add Book failed");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        {/* Login Form  */}
        <div className="login_Formb bg-cyan-400 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-blue-900 ">
              Add Book
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
              placeholder="Book Title"
              className="border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-500"
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
              placeholder="Book Image Url"
              className="border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-500"
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
              className=" py-2border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-500  "
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
              placeholder="Book Description"
              rows="5"
              className=" border text-blue-700  px-2 py-2 w-96 rounded-md outline-none placeholder-cyan-500 "
            ></textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              onClick={addProductFunction}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
