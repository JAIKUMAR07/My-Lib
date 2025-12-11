import { useNavigate } from "react-router";

const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/128/10150/10150793.png",
    name: "CSE",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/389/389493.png",
    name: "Mechanical",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3500/3500690.png",
    name: "Story",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/2276/2276360.png",
    name: "Civil",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/2249/2249539.png",
    name: "Math",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/675/675795.png",
    name: "Electronics",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Explore Categories
        </h1>
        <p className="text-gray-600 mt-2">
          Choose a category to find your books
        </p>
      </div>

      {/* Horizontal scrolling wrapper on mobile */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 scrollbar-hide">
        {category.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${item.name}`)}
            className="flex-shrink-0 md:flex-shrink grid grid-cols-1 w-24 md:w-auto mx-2 md:mx-0 cursor-pointer group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-cyan-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 md:w-14 md:h-14"
              />
            </div>
            <h1 className="mt-3 text-sm md:text-lg font-medium text-center">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
