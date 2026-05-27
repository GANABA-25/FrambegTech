import { Fragment } from "react";

const HomeProducts = [
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541575/FrambegTech/HOME%20PAGE/air-conditioner_bmp6ng.png",
    title: "Air Conditioner",
    description: "5 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541606/FrambegTech/HOME%20PAGE/tv_pvkezp.png",
    title: "Audio & Video",
    description: "6 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541596/FrambegTech/HOME%20PAGE/Phone_tbjy1a.png",
    title: "Gadgets",
    description: "5 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541608/FrambegTech/HOME%20PAGE/washing-machine_lluqxz.png",
    title: "Home Appliance",
    description: "9 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541591/FrambegTech/HOME%20PAGE/Microwave_rfkgcr.png",
    title: "Kitchen Appliance",
    description: "6 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541590/FrambegTech/HOME%20PAGE/Laptop_ybu2rq.png",
    title: "Pcs & Laptops",
    description: "7 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541584/FrambegTech/HOME%20PAGE/Fridge_cx0ymj.png",
    title: "Refrigerators",
    description: "5 products",
  },
  {
    productImage:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541599/FrambegTech/HOME%20PAGE/Smart_renbjk.png",
    title: "Smart Home",
    description: "8 products",
  },
];

const AvailableProducts = () => {
  return (
    <Fragment>
      <section className="mt-8 px-4 lg:mt-24 lg:px-0 lg:w-4/5 lg:m-auto md:mt-40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
          {HomeProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center"
            >
              <div className="h-40 w-full flex items-center justify-center bg-gray-100 pt-2">
                <img
                  src={product.productImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4">
                <h1 className="text-lg font-semibold">{product.title}</h1>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default AvailableProducts;
