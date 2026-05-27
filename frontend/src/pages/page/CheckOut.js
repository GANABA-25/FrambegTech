import NavigationBar from "../../components/navBar/Navigation";

import { BsMinecart } from "react-icons/bs";

import { useSelector } from "react-redux";
import CartItem from "../../components/cart/CartItems";

import Footer from "../components/Footer";

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = useSelector((state) => state.cart.subtotal);
  return (
    <>
      <NavigationBar />
      <div className="grid gap-8 font-serif">
        <section className="grid gap-4 m-auto  max-[767px]:w-[90%] max-[767px]:mt-[9rem] md:mt-[10rem] md:w-[95%] lg:w-[90%] lg:mt-[12rem]">
          <>
            <div className="max-[767px]:justify-center max-[767px]:grid max-[767px]:gap-4 flex justify-between items-center">
              <h1 className="max-[767px]:text-2xl max-[767px]:text-center font-bold text-gray-800 md:text-xl lg:text-3xl">
                Your Cart
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold text-gray-600">
                  Subtotal:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  GH¢
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <div className="grid gap-4 rounded-lg shadow-md">
              <div className="flex justify-center items-center gap-4 bg-gray-100 border-t-2 border-blue-700 p-4">
                {cartItems.length === 0 ? (
                  <div className="grid gap-4 py-8">
                    <div className="flex items-center gap-4">
                      <BsMinecart className="text-6xl text-gray-400" />
                      <h2 className="text-lg text-gray-500">
                        Your cart is currently empty.
                      </h2>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg lg:hover:bg-blue-700 transition">
                        Return to Shop
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="block">
                    <ul
                      className={`grid max-[767px]:grid-col-1 gap-4 ${
                        cartItems.length === 1
                          ? "lg:grid-cols-3"
                          : cartItems.length === 2
                          ? "lg:grid-cols-2"
                          : "lg:grid-cols-3"
                      }`}
                    >
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

                    <div className="mt-6 flex max-[767px]:justify-center justify-end">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg lg:hover:bg-blue-700 transition cursor-not-allowed">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default CheckOut;
