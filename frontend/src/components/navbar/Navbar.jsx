import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // navList Data
  const navList = (
    <ul className="flex space-x-3   text-white font-bold text-md px-5 ">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {/* All Product */}
      <li>
        <Link to={"/allproduct"}>All Books</Link>
      </li>
      {/* Save */}
      <li>
        <Link to={"/cartpage"}>Save({cartItems.length})</Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-gradient-to-r from-cyan-600 to-blue-800 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              Nex-Lib
            </h2>
          </Link>
        </div>
        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
        {/* Search Bar  */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
