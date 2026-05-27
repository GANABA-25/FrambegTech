import { Fragment } from "react";

const TopBrands = () => {
  return (
    <Fragment>
      <div className="py-8 pb-20 lg:w-4/5 lg:m-auto m-4">
        <h1 className="text-3xl font-semibold mb-8 text-center">Top Brands</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <div className="flex justify-center items-center p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              className="max-w-full h-auto"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541603/FrambegTech/HOME%20PAGE/tcl_uvzcor.png"
              alt="tclImage"
            />
          </div>
          <div className="flex justify-center items-center p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              className="max-w-full h-auto"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541602/FrambegTech/HOME%20PAGE/sony_srac5z.png"
              alt="sonyImage"
            />
          </div>
          <div className="flex justify-center items-center p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              className="max-w-full h-auto"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541581/FrambegTech/HOME%20PAGE/brother_izfpd6.png"
              alt="brotherImage"
            />
          </div>
          <div className="flex justify-center items-center p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              className="max-w-full h-auto"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541586/FrambegTech/HOME%20PAGE/hisense_rwp53q.png"
              alt="hisenseImage"
            />
          </div>
          <div className="flex justify-center items-center p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              className="max-w-full h-auto"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541593/FrambegTech/HOME%20PAGE/panasonic_xoedkr.png"
              alt="panasonicImage"
            />
          </div>
          <div className="flex justify-center items-center p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              className="max-w-full h-auto"
              src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541598/FrambegTech/HOME%20PAGE/samsung_txsaim.png"
              alt="samsungImage"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopBrands;
