import { Fragment, useState, useEffect } from "react";
import Lottie from "lottie-react";
import axios from "axios";

import ProductItem from "../../components/ProductItem";
import ScrollToTop from "../../components/ScrollToTop";
import NavigationBar from "../../../components/navBar/Navigation";
import HeaderBrandDeals from "./HeaderBrandDeals";
import loadingAnimation from "../../../lottie/Animation - loading.json";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";

const TodaysDeals = () => {
  const [bestDealsProducts, setBestDealsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBestDealsProducts = async (page) => {
    const category = "Best-Deals";
    try {
      const response = await axios.get(
        `https://frambegtech-backend.onrender.com/products/BestDealsProducts/${category}?page=${page}`,
      );

      const { products, totalPages } = response.data;
      setBestDealsData(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error Fetching Products", error);
    }
  };

  useEffect(() => {
    fetchBestDealsProducts(currentPage + 1);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Fragment>
      <ScrollToTop />
      <NavigationBar />
      <div className="m-4 font-serif mt-44 lg:m-0 lg:pt-20">
        <HeaderBrandDeals />

        <div className="md:m-4 lg:w-4/5 lg:m-auto">
          <div className="py-4 bg-white border-2 shadow-md md:p-4 lg:p-4">
            {bestDealsProducts.length === 0 ? (
              <div className="flex items-center justify-center w-full">
                <Lottie
                  className="w-[6rem]"
                  animationData={loadingAnimation}
                  loop={true}
                />
              </div>
            ) : (
              <Fragment>
                <div className="grid grid-cols-2 mx-4 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-3 lg:mx-0">
                  {bestDealsProducts?.map((todaysDeals) => (
                    <ProductItem
                      key={todaysDeals._id}
                      productId={todaysDeals._id}
                      productImage={todaysDeals.productImage}
                      productImage2={todaysDeals.productImage2}
                      productName={todaysDeals.productName}
                      description={todaysDeals.description}
                      price={todaysDeals.price}
                      discount={todaysDeals.discount}
                      category={todaysDeals.category}
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

          <div className="items-center my-8 overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg md:flex lg:flex lg:justify-between bg-gray-50 hover:shadow-2xl">
            <div className="p-6 bg-white md:w-1/2 md:pt-16 lg:pt-20 lg:pl-10">
              <h1 className="font-bold text-gray-500 uppercase opacity-70 md:mb-6 lg:text-2xl">
                Brand's Deal
              </h1>
              <h1 className="mt-2 text-2xl font-bold md:text-4xl lg:text-5xl lg:leading-snug">
                Save up to GH¢200 on Select Samsung Washing Machines
              </h1>
              <p className="mt-4 text-gray-700 md:text-lg lg:text-xl">
                Tortor purus et quis aenean tempus tellus <br /> fames
              </p>

              <button className="max-[767px]:bg-blue-600 max-[767px]:text-white mt-6 text-lg md:text-xl lg:text-2xl font-bold text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-md lg:hover:bg-blue-600 lg:hover:text-white lg:hover:scale-105 transition-all duration-300">
                Shop now
              </button>
            </div>

            <div className="md:w-1/2">
              <img
                className="object-cover w-full h-full transition-transform duration-300 md:p-4 md:mt-4 lg:mt-0 lg:p-0 hover:scale-105"
                src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542073/FrambegTech/TODAYS%20DEALS/samsung_vuvucg.jpg"
                alt="Samsung Washing Machine"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default TodaysDeals;
