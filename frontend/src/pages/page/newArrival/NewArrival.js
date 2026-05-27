import { Fragment } from "react";
import { useState, useEffect } from "react";

import Lottie from "lottie-react";
import loadingAnimation from "../../../lottie/Animation - loading.json";

import NavigationBar from "../../../components/navBar/Navigation";
import HeaderBrandDeal from "./HeaderBrandDeal";
import ScrollToTop from "../../components/ScrollToTop";
import ProductItem from "../../components/ProductItem";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";

const NewArrival = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNewArrivalProducts = async (page) => {
    const category = "New Arrival";
    try {
      const response = await axios.get(
        `https://frambegtech-backend.onrender.com/products/homeApplianceProducts/${category}?page=${page}`,
      );
      const { products, totalPages } = response.data;
      setNewArrivalProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("ERROR FETCHING PRODUCTS", error);
    }
  };

  useEffect(() => {
    fetchNewArrivalProducts(currentPage + 1);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Fragment>
      <ScrollToTop />
      <NavigationBar />
      <div className="m-4 font-serif mt-44 lg:m-0 lg:pt-20">
        <HeaderBrandDeal />

        <div className="md:m-4 lg:w-4/5 lg:m-auto">
          <div className="py-4 bg-white border-2 md:p-4 lg:p-4">
            {newArrivalProducts.length === 0 ? (
              <div className="flex items-center justify-center w-full">
                <Lottie
                  className="w-[6rem]"
                  animationData={loadingAnimation}
                  loop={true}
                />
              </div>
            ) : (
              <Fragment>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-3 lg:mx-0">
                  {newArrivalProducts?.map((NewArrival) => (
                    <ProductItem
                      key={NewArrival._id}
                      productId={NewArrival._id}
                      productImage={NewArrival.productImage}
                      productImage2={NewArrival.productImage2}
                      productName={NewArrival.productName}
                      description={NewArrival.description}
                      price={NewArrival.price}
                      category={NewArrival.category}
                    />
                  ))}
                </div>
                <div>
                  <Pagination
                    totalPages={totalPages}
                    handlePageClick={handlePageClick}
                  />
                </div>
              </Fragment>
            )}
          </div>

          <div className="max-[767px]:grid max-[767px]:gap-4 max-[767px]:justify-center md:flex flex-wrap items-center justify-between gap-6 bg-sky-600 p-6 rounded-lg shadow-lg my-10 text-white">
            <div className="flex-1">
              <h1 className="mb-2 text-xl font-extrabold tracking-wider uppercase md:text-2xl lg:text-4xl">
                Create. Play.
              </h1>
              <p className="text-sm md:text-lg opacity-90">
                Adipiscing ultricies arey id
              </p>
            </div>

            <div className="flex justify-center flex-1 md:justify-start">
              <button className="px-4 py-2 text-sm font-medium transition-all bg-white rounded-md shadow-md text-sky-600 lg:hover:bg-sky-700 lg:hover:text-white md:text-lg">
                Order now
              </button>
            </div>

            <div className="flex justify-center flex-1 gap-3 lg:justify-start">
              <img
                className="object-contain w-16 h-16 rounded-md md:w-24 md:h-24"
                src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711549638/FrambegTech/NEW%20ARRIVALS/Laptop_1_grb0al.png"
                alt="Laptop 1"
              />
              <img
                className="object-contain w-16 h-16 rounded-md md:w-24 md:h-24"
                src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711549643/FrambegTech/NEW%20ARRIVALS/Laptop_5_ss489t.png"
                alt="Laptop 2"
              />
            </div>

            <div className="flex justify-center gap-2 md:justify-start">
              <img
                className="object-contain w-8 h-8 md:w-12 md:h-12"
                src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541651/FrambegTech/NEW%20ARRIVALS/intel_1_rfo5hu.png"
                alt="Intel Sticker 1"
              />
              <img
                className="object-contain w-8 h-8 md:w-12 md:h-12"
                src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541652/FrambegTech/NEW%20ARRIVALS/intel_2_psifxo.png"
                alt="Intel Sticker 2"
              />
            </div>
          </div>
        </div>
        <div className="mt-14">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default NewArrival;
