import { Link } from "react-router-dom";

const ImageWithText = (props) => {
  return (
    <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg group">
      <img
        src={props.image}
        alt="Description"
        className="w-full h-36 md:h-48 lg:h-64 object-cover transition-transform duration-300 lg:group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 lg:group-hover:opacity-90 transition-opacity duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
        {props.extraText && (
          <h1 className="text-sm font-semibold uppercase tracking-wide mb-1 md:mb-2 lg:text-base">
            {props.extraText}
          </h1>
        )}
        <p className="text-lg font-bold mb-4 md:text-xl lg:text-2xl">
          {props.label}
        </p>
        <Link
          to="/AllProducts"
          className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium lg:hover:bg-blue-700 lg:hover:-translate-y-1 lg:hover:scale-105 transition-all duration-300"
        >
          {props.text}
        </Link>
      </div>
    </div>
  );
};

export default ImageWithText;
