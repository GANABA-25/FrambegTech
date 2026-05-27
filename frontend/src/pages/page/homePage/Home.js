import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import axios from "axios";

import NavigationBar from "../../../components/navBar/Navigation";

import Carousel from "../../components/Carousel";
import Offers from "./Offers";
import BrandDeals from "./BrandDeals";
import AvailableProducts from "./AvailableProducts";
import TopBrands from "./TopBrands";
import CustomerComments from "./CustomerComments";
import ProductItem from "../../components/ProductItem";
import loadingAnimation from "../../../lottie/Animation - loading.json";
import Footer from "../../components/Footer";

const Home = () => {
  const [bestDealsProducts, setBestDealsData] = useState([]);

  const fetchBestDealsProducts = async (page) => {
    const category = "Home";
    try {
      const response = await axios.get(
        `https://frambegtech-backend.onrender.com/products/BestDealsProducts/${category}?page=${page}`,
      );

      const { products } = response.data;
      setBestDealsData(products);
    } catch (error) {
      console.log("Error Fetching Products", error);
    }
  };

  useEffect(() => {
    fetchBestDealsProducts();
  }, []);

  return (
    <Fragment>
      <NavigationBar />

      <section className="font-serif">
        <Carousel />

        <Offers />

        <AvailableProducts />

        <BrandDeals />

        {bestDealsProducts.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <Lottie
              className="w-[6rem]"
              animationData={loadingAnimation}
              loop={true}
            />
          </div>
        ) : (
          <div className="lg:w-4/5 lg:m-auto max-[767px]:mt-8 md:mt-12 lg:mt-16">
            <div className="m-4 mb-8 font-bold lg:flex lg:mx-0 lg:my-4">
              <h1 className="text-2xl opacity-75">Today's best deal</h1>
              <Link
                to="/TodaysDeals"
                className="text-xl text-blue-600 duration-300 hover:-translate-x-1 hover:scale-110 lg:ml-5 lg:text-xl"
              >
                see more
              </Link>
            </div>
            <div className="grid grid-cols-2 mb-8 gap-x-2 gap-y-8 md:grid-cols-2 md:mx-4 lg:grid-cols-4 lg:mx-0">
              {bestDealsProducts?.map((todaysDeals) => (
                <ProductItem
                  key={todaysDeals._id}
                  id={todaysDeals._id}
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
          </div>
        )}

        <TopBrands />

        <CustomerComments />

        <Footer />
      </section>
    </Fragment>
  );
};

export default Home;
