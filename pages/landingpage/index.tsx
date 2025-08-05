import React from "react";
import Image from "next/image";
import Truck from "@/public/Truck.jpg";
// import { DebitCard, GlobeCard } from '../component'

const HeaderBanner = () => {
  return (
    <div className="container-lg overflow-hidden relative min-h-screen h-[800px] w-full bg-gradient-to-b from-[#d9dbda] to-[#a8b2d3] ">
      {/* Main Content Container */}
      <div className="relative w-full flex flex-col items-center justify-center px-4 h-[70vh]">
        {/* Logo Text - Responsive sizing */}
        <h1
          className="font-heading text-5xl sm:text-8xl md:text-[120px] lg:text-[180px]
             tracking-[5px] sm:tracking-[15px] lg:tracking-[30px]
             text-center relative z-10 
             bg-gradient-to-b from-white via-gray-100 to-[#a8b2d3]
             bg-clip-text text-transparent"
        >
          CARGOCORE
        </h1>

        {/* Truck Image - Responsive positioning */}
        <div
          className="absolute w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[500px] 
                       bottom-[-30%]  md:bottom-[-200px] transform -translate-x-1/2 left-1/2 z-20"
        >
          <Image
            src={Truck}
            alt="Cargo Truck"
            width={500}
            height={500}
            className="w-full h-auto object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* Globe Card - Responsive positioning */}
        <div className="hidden sm:block absolute bottom-[-230px] left-4 z-30 w-[160px] sm:w-[200px] md:w-auto">
          {/* <GlobeCard /> */}
        </div>

        {/* Debit Card - Responsive positioning */}
        <div className="hidden sm:block absolute top-[55%] right-4 z-30 w-[160px] sm:w-[200px] md:w-auto">
          {/* <DebitCard /> */}
        </div>
      </div>

      <div className="hidden sm:block absolute bottom-10 w-screen h-screen z-70 bg-transparent overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 452 512"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 480 H128 
       Q140 480, 140 468 V360 
       Q140 348, 152 348 H288 
       Q300 348, 300 336 V228 
       Q300 216, 312 216 H448 
       Q460 215, 472 215 H512"
            stroke="white"
            strokeWidth="1"
            fill="transparent"
          />
        </svg>
        <div className="flex m-auto justify-center items-center mx-auto">
          <div className="absolute bottom-45 mx-auto flex justify-center items-center m-auto p-7 bg-transparent outline-1 outline-white rounded-full">
            <div className="absolute h-[50px] w-[50px] bg-slate-600 opacity-80 rounded-full flex justify-center items-center m-auto ">
              <span className="h-[20px] w-[20px] bg-white opacity-100 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[33.6%] h-[70%] bg-white/10 backdrop-filter backdrop-blur-[10px] absolute right-0 top-[50%] -translate-y-[17%] rounded-tl-3xl"></div>

      <div className="w-[35.5%] h-[40%] bg-white/10 backdrop-filter backdrop-blur-[10px] absolute right-[33.5%] top-[70%] -translate-y-[16%] rounded-tl-3xl z-50"></div>

      <div className="w-[31%] h-[10.4%] bg-white/10 backdrop-filter backdrop-blur-[10px] absolute left-0 bottom-0    "></div>

      {/* Glassy UI */}
    </div>
  );
};

export default HeaderBanner;
