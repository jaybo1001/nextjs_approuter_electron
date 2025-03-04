import React from "react";

const Switch = () => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input className="sr-only peer" value={true} type="checkbox" />
      <div className="peer ring-2 ring-gray-500 bg-gradient-to-r from-rose-400 to-red-900 rounded-full outline-none duration-500 after:duration-300 w-20 h-8  shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900 shadow-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-500  after:content-[''] after:rounded-full after:absolute after:outline-none after:h-12 after:w-12 after:bg-gray-900 after:-top-2 after:-left-2 after:flex after:justify-center after:items-center after:border-4 after:border-gray-500  peer-checked:after:translate-x-14"></div>
    </label>
  );
};

export default Switch;
