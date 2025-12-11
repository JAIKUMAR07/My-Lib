/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";

import Loader from "../../components/loader/Loader";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const user = registeredUsers.find(
        (u) => u.email === userLogin.email && u.password === userLogin.password
      );

      if (user) {
        localStorage.setItem("users", JSON.stringify(user));
        setUserLogin({
          email: "",
          password: "",
        });
        toast.success("Login Successfully");
        setLoading(false);
        if (user.role === "user") {
          navigate("/user-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      } else {
        // Fallback just for testing if no users registered: allow admin if email contains 'admin'
        if (userLogin.email.includes("admin") && registeredUsers.length === 0) {
          const adminUser = {
            name: "Admin User",
            email: userLogin.email,
            uid: "admin123",
            role: "admin",
            time: new Date().toISOString(),
          };
          localStorage.setItem("users", JSON.stringify(adminUser));
          toast.success("Login Successfully (Admin Mode)");
          setLoading(false);
          navigate("/admin-dashboard");
          return;
        }

        toast.error("Invalid Email or Password");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="login_Form bg-gradient-to-r from-cyan-400 to-cyan-500 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-white ">Login</h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            className="bg-pink-50 border  px-2 py-2 w-96 rounded-md outline-none placeholder-blue-500"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="bg-pink-50 border  px-2 py-2 w-96 rounded-md outline-none placeholder-blue-500"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction}
            className="bg-blue-700 hover:bg-blue-800 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-blue-800 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
