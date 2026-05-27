import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";
import { logout } from "../../store/authentication-slice";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { FaCartFlatbed } from "react-icons/fa6";

import CartFile from "../cart/CartFile";
import SearchInput from "./SearchInput";
import CartItem from "../cart/CartItems";
import ScrollToTop from "../../pages/components/ScrollToTop";

import "../offcanvas/Offcanvas.css";
import "../offcanvas/Offcanvas2.css";
import axios from "axios";

const NavigationBar = () => {
  const [HomePageColor, setHomePageColor] = useState("text-white");
  const [AllProductsPageColor, setAllProductsPageColor] =
    useState("text-white");
  const [HomeApplianceColor, setHomeApplianceColor] = useState("text-white");
  const [AudioAndVideoColor, setAudioAndVideoColor] = useState("text-white");
  const [RefrigeratorsPageColor, setRefrigeratorsPageColor] =
    useState("text-white");
  const [NewArrivalPageColor, setNewArrivalPageColor] = useState("text-white");
  const [TodaysDealsPageColor, setTodaysDealsPageColor] =
    useState("text-white");
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const subtotal = useSelector((state) => state.cart.subtotal);

  const cartItems = useSelector((state) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    location.pathname === "/"
      ? setHomePageColor("underline underline-offset-4")
      : setHomePageColor("");

    location.pathname === "/AllProducts"
      ? setAllProductsPageColor("underline underline-offset-4")
      : setAllProductsPageColor("");

    location.pathname === "/HomeAppliance"
      ? setHomeApplianceColor("underline underline-offset-4")
      : setHomeApplianceColor("");

    location.pathname === "/AudioAndVideo"
      ? setAudioAndVideoColor("underline underline-offset-4")
      : setAudioAndVideoColor("");

    location.pathname === "/Refrigerators"
      ? setRefrigeratorsPageColor("underline underline-offset-4")
      : setRefrigeratorsPageColor("");

    location.pathname === "/NewArrival"
      ? setNewArrivalPageColor("underline underline-offset-4")
      : setNewArrivalPageColor("");

    location.pathname === "/TodaysDeals"
      ? setTodaysDealsPageColor("underline underline-offset-4")
      : setTodaysDealsPageColor("");
  }, [location.pathname]);

  const toggleOffcanvas2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  const checkOutHandler = async () => {
    if (!isLoggedIn) {
      navigate("/SignIn");
    }
    try {
      const response = await axios.post(
        "https://rest-api-backend-for-frambeg-tech.onrender.com/user/Authentication",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        navigate("/CheckOut");
      }
    } catch (error) {
      navigate("/SignIn");
    }
  };

  const signOutHandler = () => {
    sessionStorage.removeItem("user");
    dispatch(
      cartAction.replaceCart({ items: [], totalQuantity: 0, subtotal: 0 })
    );
    dispatch(logout());
  };

  return (
    <Fragment>
      <ScrollToTop />
      {/*--------------------------------------- CART OFFCANVAS CONTENT ------------------------------------------*/}
      <div>
        <div className={`offcanvas ${isOpen ? "open" : ""}`}>
          <div className="text-sm flex flex-wrap items-center justify-between bg-blue-600 text-white w-full px-4 py-2 font-serif overflow-hidden border">
            <h1 className="truncate md:text-xl lg:text-xl max-w-[50%]">
              Shopping Cart
            </h1>
            <div className="flex items-center gap-2 max-w-[40%] flex-shrink-0">
              <h1 className="whitespace-nowrap md:text-xl lg:text-xl">
                Subtotal:
              </h1>
              <h1 className="text-xs md:text-xl lg:text-xl truncate">
                GH¢
                {subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
            <button onClick={toggleOffcanvas} className="p-2 flex-shrink-0">
              <FaTimes className="active:text-white text-xl font-bold lg:hover:text-red-600" />
            </button>
          </div>

          <div className="offcanvas-content font-serif">
            <div className="block">
              <ul className="grid gap-2">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={{
                      productId: item.productId,
                      price: item.price,
                      totalPrice: item.totalPrice,
                      quantity: item.quantity,
                      description: item.description,
                      productImage: item.productImage,
                    }}
                  />
                ))}
              </ul>
            </div>
          </div>
          {cartItems.length === 0 ? (
            <span className="flex justify-center items-center gap-4 text-xl mt-24">
              <FaCartFlatbed className="text-blue-600" />
              <p>Your cart is empty</p>
            </span>
          ) : (
            <>
              <button
                onClick={checkOutHandler}
                className="mt-8 m-2 w-full bg-blue-10006 p-2 text-center text-white font-bold text-xl md:text-xl md:p-2 lg:hover:bg-blue-600"
              >
                Check Out
              </button>
            </>
          )}
        </div>
        <div
          onClick={toggleOffcanvas}
          className={`overlay ${isOpen ? "open" : ""}`}
        />
      </div>

      <header className="mt-5 lg:mt-0 relative">
        {/*---------------------------------- SMALL SCREEN & MEDIUM SCREEN NAVBAR ----------------------------------*/}
        {/*----------- SMALL & MEDIUM SCREEN NAVBAR ICONS -------------*/}
        <div className="py-5 px-2 bg-blue-600 lg:hidden fixed w-full top-0 z-10">
          <div className="flex justify-between">
            <div className="flex lg:hidden">
              <div
                onClick={toggleOffcanvas2}
                className="border p-3 mr-3 md:mx-2"
              >
                <GiHamburgerMenu className="text-white text-xl opacity-50" />
              </div>

              <h1 className="font-serif uppercase text-white text-xl ml-3 pt-2">
                Frambeg Tech
              </h1>
            </div>
            {/* SMALL & MEDUIM SCREEN CART */}
            <CartFile onClick={toggleOffcanvas} />
          </div>
          <div className="mt-4 lg:hidden">
            <SearchInput />
          </div>
        </div>

        <div>
          <div className={`offcanvas2 ${isOpen2 ? "open2" : ""}`}>
            {/*------------- Close Icon -------------*/}
            <div className="flex justify-end p-4 ">
              <LiaTimesSolid
                onClick={toggleOffcanvas2}
                className="text-3xl text-white bg-blue-600"
              />
            </div>

            {/*------------- Offcanvas Content -------------*/}
            <div className="offcanvas-content2">
              <nav>
                <ul className="list-none text-lg font-medium text-gray-800 space-y-4 md:text-xl">
                  <li className={`${HomePageColor}`}>
                    <NavLink
                      to="/"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className={`${AllProductsPageColor}`}>
                    <NavLink
                      to="/AllProducts"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      All Products
                    </NavLink>
                  </li>
                  <li className={`${HomeApplianceColor}`}>
                    <NavLink
                      to="/HomeAppliance"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      Home Appliances
                    </NavLink>
                  </li>
                  <li className={`${AudioAndVideoColor}`}>
                    <NavLink
                      to="/AudioAndVideo"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      Audio & Video
                    </NavLink>
                  </li>
                  <li className={`${RefrigeratorsPageColor}`}>
                    <NavLink
                      to="/Refrigerators"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      Refrigerators
                    </NavLink>
                  </li>
                  <li className={`${NewArrivalPageColor}`}>
                    <NavLink
                      to="/NewArrival"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      New Arrivals
                    </NavLink>
                  </li>
                  <li className={`${TodaysDealsPageColor}`}>
                    <NavLink
                      to="/TodaysDeals"
                      className="block py-2 px-4 bg-gray-100 rounded-lg"
                    >
                      Today's Deals
                    </NavLink>
                  </li>

                  {/* Authentication Section */}
                  <li>
                    {isLoggedIn ? (
                      <button
                        onClick={signOutHandler}
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-lg"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link
                        to="/Login"
                        className="w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg block"
                      >
                        Sign In
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Overlay */}
          <div
            onClick={toggleOffcanvas2}
            className={`overlay2 ${isOpen2 ? "open2" : ""}`}
          />
        </div>

        {/*---------------------------------- LARGE SCREEN NAVIGATION BARS ---------------------------------- */}
        <nav className="font-serif hidden lg:block bg-blue-600 fixed w-full top-0 z-10">
          <div className="flex justify-center text-white lg:block">
            <div className="flex justify-between text-sm py-2 lg:w-4/5 lg:m-auto">
              <h1 className=" text-white mx-2">
                24/7 Customer Service +233 596498006
              </h1>
              <div className="flex mx-2">
                <h1 className=" text-white mr-2">Shipping & return</h1>
                <h1 className="uppercase text-white ml-2">Track order</h1>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="bg-blue-1000 p-2">
              <div className="flex justify-between py-2 lg:w-4/5 lg:m-auto">
                <div className="flex">
                  <img
                    className="w-8 object-cover"
                    src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542176/FrambegTech/HOME%20PAGE/logo_ddmofy.png"
                    alt="logoImage"
                  />
                  <h1 className="font-serif uppercase text-white text-2xl pt-2 mx-2">
                    Frambeg Tech
                  </h1>
                </div>
                <SearchInput />
              </div>
            </div>

            <nav>
              <ul className=" flex justify-between list-none text-base lg:w-4/5 lg:m-auto">
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${HomePageColor}`}
                >
                  <NavLink to="/" end>
                    Home
                  </NavLink>
                </li>
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${AllProductsPageColor}`}
                >
                  <NavLink to="/AllProducts">All Products</NavLink>
                </li>
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${HomeApplianceColor}`}
                >
                  <NavLink to="/HomeAppliance">Home Appliances</NavLink>
                </li>
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${AudioAndVideoColor}`}
                >
                  <NavLink to="/AudioAndVideo">Audio & Video</NavLink>
                </li>
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${RefrigeratorsPageColor}`}
                >
                  <NavLink to="/Refrigerators">Refrigerator</NavLink>
                </li>
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${NewArrivalPageColor}`}
                >
                  <NavLink to="/NewArrival">New Arrivals</NavLink>
                </li>
                <li
                  className={`p-2 lg:hover:opacity-50 lg:text-lg ${TodaysDealsPageColor}`}
                >
                  <NavLink to="/TodaysDeals">Today's Deals</NavLink>
                </li>

                {/* LARGE SCREEN CART */}
                <li>
                  <CartFile onClick={toggleOffcanvas} />
                </li>
                {isLoggedIn ? (
                  <button
                    onClick={signOutHandler}
                    className="flex items-center active:text-red-600 p-2 lg:hover:opacity-50 lg:text-lg"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/SignIn"
                    className="flex items-center active:text-red-600 p-2 lg:hover:opacity-50 lg:text-lg"
                  >
                    Sign in
                  </Link>
                )}
              </ul>
            </nav>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default NavigationBar;
