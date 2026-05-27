import { Fragment } from "react";

const HeaderBrandDeals = () => {
  return (
    <Fragment>
      <div className="border-b-2 mt-32">
        <div className="mx-4 my-8 pb-7 md:flex lg:w-4/5 lg:m-auto">
          <div className="md:w-3/6 md:mt-3 md:border-r-2">
            <h1 className="text-4xl mb-4 font-bold opacity-80 md:text-5xl lg:text-6xl">
              Today's deals
            </h1>
          </div>
          <div className="md:w-3/6 opacity-75 md:text-xl md:border-l-2 md:p-6">
            <p>
              Find the best discounts on products available today! Discover
              incredible deals and savings on a selection of items, and grab
              your favorites at unbeatable prices.
            </p>
          </div>
        </div>
      </div>
      <div className="md:m-4 lg:w-4/5 lg:m-auto">
        <div className="flex flex-col md:flex-row justify-around items-center gap-6 bg-blue-600 p-6 my-10 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Image Section */}
          <div className="hover:scale-105 transition-transform duration-300">
            <img
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542008/FrambegTech/TODAYS%20DEALS/card_yum6hv.png"
              alt="Card "
            />
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left md:text-xl">
            <h4 className="font-medium">Apply today and get</h4>
            <h1 className="text-yellow-400 text-2xl font-extrabold md:text-4xl">
              10% back
            </h1>
          </div>

          {/* Description Section */}
          <div className="text-center md:text-left md:text-base lg:text-lg">
            <p className="opacity-90">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit. Turpis.
            </p>
          </div>

          {/* Button Section */}
          <div className="text-center">
            <button className="bg-white text-black rounded-lg px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-medium lg:hover:bg-yellow-400 lg:hover:text-black lg:hover:-translate-y-1 lg:hover:scale-110 transition-all duration-300 shadow-md">
              Order now
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderBrandDeals;
