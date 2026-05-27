import { Fragment } from "react";
import {
  FaCcVisa,
  FaCcStripe,
  FaCcPaypal,
  FaCcMastercard,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-gray-100 text-gray-800">
        <div className=" max-[767px]:text-center grid gap-8 px-6 py-12 md:px-16 md:text-center lg:text-start lg:grid-cols-4 lg:w-4/5 lg:mx-auto">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <img
              className="w-16 h-16 mb-4"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542176/FrambegTech/HOME%20PAGE/logo_ddmofy.png"
              alt="Frambeg Tech Logo"
            />
            <h1 className="text-xl font-bold text-blue-600">Frambeg Tech</h1>
            <p className="text-sm text-gray-600 mt-2">
              Your one-stop shop for premium products and tech solutions.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-4">Shop</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Hot Deals</li>
              <li>Categories</li>
              <li>Brands</li>
              <li>Rebates</li>
              <li>Weekly Deals</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-4">Need Help?</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Contact</li>
              <li>Order Tracking</li>
              <li>FAQs</li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-4">Contact</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Pankrono, Kumasi</li>
              <li>+233 596 498 006 | +233 257 272 627</li>
              <li>NathanielOwus01 @gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 text-white text-sm">
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left opacity-75">
              © 2023 Frambeg Tech | Powered by Frambeg Industries
            </p>

            <div className="flex items-center justify-center gap-4 text-2xl mt-4 md:mt-0">
              <FaCcVisa className="text-gray-400 hover:text-gray-300 transition duration-300" />
              <FaCcStripe className="text-gray-400 hover:text-gray-300 transition duration-300" />
              <FaCcPaypal className="text-gray-400 hover:text-gray-300 transition duration-300" />
              <FaCcMastercard className="text-gray-400 hover:text-gray-300 transition duration-300" />
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
