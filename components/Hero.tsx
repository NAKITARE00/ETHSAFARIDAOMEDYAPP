/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center h-[80vh] justify-center w-full">
      <div className="absolute  right-0 top-0 w-1/3 h-1/3">
        <img src="11.png" className="" />
      </div>
      <div className="flex flex-col text-left mr-96 relative px-4 ">
      <h1 className="text-[55px] sm:text-[45px] font-bold leading-none ">
      Bridging the Distance in Healthcare
          </h1>

          <h1 className="text-3xl font-semibold flex flex-col my-4 ">
          Your health data is precious, and we treat it as such
          </h1>
          <p className="max-w-lg ">
          With blockchain technology, we ensure the utmost security and data privacy, 
          adhering to the highest healthcare standards.Take control of your health. With our platform, you have the power to choose the medical expert who best suits your needs. 
          It's your health, your choice.{" "}
          </p>
        <div className="flex justify-around max-w-sm py-10">
          <button
            type="button"
            className=" relative bg-gradient-to-r mx-1 sm:mx-0 p-[3px] flex flex-col items-center from-[#73E0A9] to-[#5B68DF] w-[170px] h-[50px] text-black rounded-full text-2xl "
          >
            <div className="bg-white w-full h-full text-center pt-1 rounded-full ">
              Explore
            </div>
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-[#73E0A9] to-[#5B68DF] w-[170px] h-[50px] text-white rounded-full text-2xl "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
