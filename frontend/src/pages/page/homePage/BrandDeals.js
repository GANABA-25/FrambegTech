import { Fragment } from "react";

const dummyData = [
  {
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541583/FrambegTech/HOME%20PAGE/cover_oo5vyp.jpg",
    label: "The only case you need",
    text: "Shop now",
    id: "Deal 1",
  },
  {
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711541577/FrambegTech/HOME%20PAGE/airPod_jax7jp.jpg",
    label: "Get 30% OFF",
    text: "Shop now",
    id: "Deal 2",
    extraText: "BRAND DAY",
  },
];

const BrandDeals = () => {
  return (
    <Fragment>
      <section className="px-4 mt-8 lg:px-0 lg:mt-16 lg:w-4/5 lg:m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          {dummyData.map((deal) => (
            <div
              key={deal.id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden group"
            >
              <img
                src={deal.image}
                alt={deal.label}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
              <div className="absolute bottom-4 left-4 text-white">
                {deal.extraText && (
                  <p className="text-sm font-bold uppercase mb-1">
                    {deal.extraText}
                  </p>
                )}
                <h1 className="text-lg font-semibold">{deal.label}</h1>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                  {deal.text}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default BrandDeals;
