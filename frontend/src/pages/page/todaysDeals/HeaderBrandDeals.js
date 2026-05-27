import { Fragment } from "react";

const HeaderBrandDeals = () => {
  return (
    <Fragment>
      <div className="mt-32 border-b-2">
        <div className="mx-4 my-8 pb-7 md:flex lg:w-4/5 lg:m-auto">
          <div className="md:w-3/6 md:mt-3 md:border-r-2">
            <h1 className="mb-4 text-4xl font-bold opacity-80 md:text-5xl lg:text-6xl">
              Today's deals
            </h1>
          </div>
          <div className="opacity-75 md:w-3/6 md:text-xl md:border-l-2 md:p-6">
            <p>
              Find the best discounts on products available today! Discover
              incredible deals and savings on a selection of items, and grab
              your favorites at unbeatable prices.
            </p>
          </div>
        </div>
      </div>
      <div className="md:m-4 lg:w-4/5 lg:m-auto">
        <div className="flex flex-col items-center justify-around gap-6 p-6 my-10 text-white transition-shadow duration-300 bg-blue-600 rounded-lg shadow-lg md:flex-row hover:shadow-2xl">
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              className="object-contain w-16 h-16 md:w-20 md:h-20"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542008/FrambegTech/TODAYS%20DEALS/card_yum6hv.png"
              alt="Card "
            />
          </div>

          <div className="text-center md:text-left md:text-xl">
            <h4 className="font-medium">Apply today and get</h4>
            <h1 className="text-2xl font-extrabold text-yellow-400 md:text-4xl">
              10% back
            </h1>
          </div>

          <div className="text-center md:text-left md:text-base lg:text-lg">
            <p className="opacity-90">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit. Turpis.
            </p>
          </div>

          <div className="text-center">
            <button className="px-6 py-2 text-sm font-medium text-black transition-all duration-300 bg-white rounded-lg shadow-md md:px-8 md:py-3 md:text-base lg:hover:bg-yellow-400 lg:hover:text-black lg:hover:-translate-y-1 lg:hover:scale-110">
              Order now
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderBrandDeals;
