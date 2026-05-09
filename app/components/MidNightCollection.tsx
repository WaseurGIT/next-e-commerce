import React from "react";
import { ShoppingBag } from "lucide-react";

const MidNightCollection = () => {
  const timerBlocks = [
    { value: "04", label: "Hours" },
    { value: "22", label: "Minutes" },
    { value: "45", label: "Seconds" },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto bg-[#005AC2] rounded-2xl sm:rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12">
          
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="inline-block text-center text-[#ce0b42] font-semibold bg-[#ddb7c2] px-4 py-1.5 rounded-full mb-4 text-xs sm:text-sm w-fit">
              Flash Sale
            </p>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              The Midnight Collection
            </h1>
            
            <p className="text-gray-200 text-sm sm:text-base mb-6 sm:mb-8">
              Limited quantities available. Ends strictly at midnight.
            </p>

            {/* Timer Section */}
            <div className="flex items-center justify-start gap-2 sm:gap-3 md:gap-4 flex-wrap">
              {timerBlocks.map((block, index) => (
                <div
                  key={index}
                  className="text-white bg-[#2573E6] flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg min-w-[70px] sm:min-w-[80px] md:min-w-[100px]"
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{block.value}</h1>
                  <p className="text-xs sm:text-sm mt-1">{block.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Product Card Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg w-full sm:max-w-sm md:max-w-md p-4 sm:p-6">
              <div className="flex flex-col items-center">
                <img
                  src="/images/watch_4.png"
                  alt="Midnight Collection"
                  className="w-40 sm:w-48 h-40 sm:h-48 object-cover rounded-lg mb-4 sm:mb-6"
                />
                
                <div className="w-full mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    Midnight Stealth Chrono
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg sm:text-xl text-red-600">$299</span>
                    <del className="text-gray-400 text-sm sm:text-base">$450</del>
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-4 text-center">
                  Ceramic bezel, 100m water resistant, Swiss movement.
                </p>
              </div>
              
              <button className="w-full bg-black text-white py-2.5 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base font-medium">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MidNightCollection;
