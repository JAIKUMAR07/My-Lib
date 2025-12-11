import Layout from "../../components/layout/Layout";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
];

const UserDashboard = () => {
  // User getting from the storage
  const user = JSON.parse(localStorage.getItem("users"));

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="container mx-auto px-4 py-5 lg:py-8">
          {/* Top */}
          <div className="top">
            {/* Main */}
            <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 py-5 rounded-xl border border-pink-100">
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="User Avatar"
                />
              </div>
              {/* Text */}
              <div className="">
                {/* Name */}
                <h1 className="text-center text-blue-900 text-lg">
                  <span className="font-bold">Name :</span> {user?.name}
                </h1>
                {/* Email */}
                <h1 className="text-center text-lg text-blue-900">
                  <span className="font-bold">Email :</span> {user?.email}
                </h1>
                {/* Date */}
                <h1 className="text-center text-lg text-blue-900">
                  <span className="font-bold">Date :</span> {user?.date}
                </h1>
                {/* Role */}
                <h1 className="text-center text-lg text-blue-900">
                  <span className="font-bold">Role :</span> {user?.role}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
