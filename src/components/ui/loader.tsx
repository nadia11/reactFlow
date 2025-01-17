import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
    </div>
  );
};

export default Loader;