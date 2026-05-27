import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";
import {
  removeCartItem,
  sendCartData,
  removeItemCompletely,
} from "../../store/cart-actions";

import { IoMdAdd } from "react-icons/io";
import { HiOutlineMinus } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";

const CartItem = (props) => {
  const {
    title,
    price,
    total,
    description,
    quantity,
    totalPrice,
    productImage,
    productId,
  } = props.item;

  const dispatch = useDispatch();

  const removeItemHandler = () => {
    const itemToRemove = {
      productId,
      price,
      quantity,
    };

    const itemToDelete = {
      ...itemToRemove,
      quantity: 1,
      totalPrice: price,
    };

    dispatch(cartAction.removeItemFromCart(productId));
    dispatch(removeCartItem(itemToDelete));
  };

  const addItemHandler = () => {
    const itemToAdd = {
      productId,
      title,
      price,
      total,
      description,
      productImage,
    };

    dispatch(
      cartAction.addItemToCart({
        productId,
        price,
        description,
      })
    );

    const itemToSend = {
      ...itemToAdd,
      quantity: 1,
      totalPrice: price,
    };

    dispatch(sendCartData(itemToSend));
  };

  const removeItemCompletelyHandler = () => {
    const itemToDelete = {
      productId,
      price,
      quantity,
    };

    dispatch(cartAction.removeItemCompletely(productId));
    dispatch(removeItemCompletely(itemToDelete));
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-6 p-4 border rounded-md shadow-sm md:flex-row md:items-center bg-white">
        <div className="flex-shrink-0 flex justify-center items-center">
          <img
            className="w-full h-[10rem] object-contain md:w-32 md:h-32 lg:w-[8rem] lg:h-[8rem] lg:object-contain rounded-md"
            src={productImage}
            alt={title}
          />
        </div>

        <div className="flex-grow space-y-3">
          <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={removeItemHandler}
                className="p-2 text-sm border rounded-full hover:bg-gray-100"
              >
                <HiOutlineMinus className="text-gray-600" />
              </button>
              <span className="px-4 py-2 border rounded-md text-gray-700">
                {quantity}
              </span>
              <button
                onClick={addItemHandler}
                className="p-2 text-sm border rounded-full hover:bg-gray-100"
              >
                <IoMdAdd className="text-gray-600" />
              </button>
            </div>

            <h4 className="text-lg font-bold text-gray-800">
              ¢
              {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h4>

            <button
              onClick={removeItemCompletelyHandler}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <FaRegTimesCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartItem;
