import React from 'react';
import { Link } from 'react-router-dom';

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full">
      {/* Icon/Graphic */}
      {/* <div className="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l2 7h6l-5 4 2 7-5-4-5 4 2-7-5-4h6z" />
        </svg>
      </div> */}
 <div className="flex items-center text-lg font-semibold text-green-600 mb-5">
            <span className="bg-green-500 h-14 w-14 rounded-full flex justify-center items-center text-white">
              T
            </span>
            <span className="ml-2 font-2xl">Techzilo</span>
          </div>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4">
        This Page is Under Construction
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-6">
        We're working hard to bring this page to life. Please check back soon!
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default UnderConstruction;
