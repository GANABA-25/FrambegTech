import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import axios from "axios";

import NavigationBar from "../../components/navBar/Navigation";
import ProductItem from "../components/ProductItem";
import loadingAnimation from "../../lottie/Animation - loading.json";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const payload = state?.payload || {};

  const [currentImage, setCurrentImage] = useState(payload.productImage || "");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = [
    payload.productImage,
    payload.productImage2,
    payload.productImage3,
  ].filter(Boolean);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `https://frambegtech-backend.onrender.com/products/relatedProducts/${payload.category}`,
        );
        setRelatedProduct(response.data.relatedProducts);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (payload.category) {
      fetchRelatedProducts();
    }
  }, [payload.category]);

  return (
    <Fragment>
      <NavigationBar />
      <div className="max-[767px]:w-[95%] m-auto mt-[10rem] md:mt-[10rem] md:w-[90%] lg:w-[80%] lg:mt-[11rem]">
        <div className="flex flex-col max-[767px]:gap-8 md:gap-8 lg:flex-row lg:gap-16">
          <div className="flex flex-col items-center md:items-start lg:items-start lg:mr-8">
            <div className="flex justify-center w-full mb-4 md:justify-start lg:justify-centers">
              <img
                className="w-full h-[15rem] max-[767px]:py-4 md:w-[40rem] md:h-[25rem] lg:h-[21rem] p-4 rounded-lg object-contain border"
                src={currentImage}
                alt="Product"
              />
            </div>
            <div className="flex justify-center gap-2 md:justify-start lg:justify-start">
              {images.map((image, index) => (
                <img
                  key={index}
                  className={`w-[7rem] h-[7rem] md:w-[12rem] md:h-[6rem] p-1 border rounded-lg cursor-pointer object-contain lg:w-[14rem] lg:h-[6rem] ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onMouseEnter={() => {
                    setCurrentImage(image);
                    setSelectedImageIndex(index);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold text-blue-600 md:text-3xl">
              {payload.productName || "Product Name"}
            </h1>
            <p className="text-gray-600">
              {payload.description || "No description available."}
            </p>
            <div>
              <h5 className="mb-2 text-lg font-bold">Key Features:</h5>
              <ul className="space-y-1 text-gray-700 list-disc list-inside">
                <li>Newest Technology</li>
                <li>Best in class components</li>
                <li>Dimensions - 69.5 × 750 × 169.0</li>
                <li>Maintenance free</li>
                <li>12 months warranty</li>
              </ul>
            </div>
            <h2 className="text-xl font-bold">
              <span className="text-blue-600">Price:</span> ¢
              {payload.price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"}
            </h2>
          </div>
        </div>

        <div className="my-16">
          <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <Lottie
                className="w-24 h-24"
                animationData={loadingAnimation}
                loop={true}
              />
            </div>
          ) : relatedProduct.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {relatedProduct.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  productImage={product.productImage}
                  productImage2={product.productImage2}
                  productName={product.productName}
                  description={product.description}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No related products found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
