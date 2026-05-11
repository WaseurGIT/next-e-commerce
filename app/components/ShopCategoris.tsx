import Link from "next/link";
import React from "react";

const ShopCategoris = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div>
        <h1 className="text-2xl font-semibold">Shop Categories</h1>
        <p className="text-gray-600 text-sm">
          Explore our premium departments curated for your lifestyle.
        </p>
      </div>

      <div className="my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Link href="/pages/WristWatches">
          <div className="flex flex-col bg-white rounded-lg shadow-md pb-4">
            <img
              src="/images/watch_1.png"
              alt="Shop Categories"
              className="w-full h-60 object-cover rounded-t-lg mb-6"
            />
            <h1 className="text-lg font-semibold px-3">Wrist Watches</h1>
            <p className="text-gray-600 px-3 text-sm">7 Items</p>
          </div>
        </Link>

        <Link href="/pages/LuxuryClocks">
          <div className="flex flex-col bg-white rounded-lg shadow-md pb-4">
            <img
              src="/images/watch_2.png"
              alt="Shop Categories"
              className="w-full h-60 object-cover rounded-t-lg mb-6"
            />
            <h1 className="text-lg font-semibold px-3">Luxury Clocks</h1>
            <p className="text-gray-600 px-3 text-sm">3 Items</p>
          </div>
        </Link>

        <Link href="/pages/Fans">
          <div className="flex flex-col bg-white rounded-lg shadow-md pb-4">
            <img
              src="/images/fan_1.png"
              alt="Shop Categories"
              className="w-full h-60 object-cover rounded-t-lg mb-6"
            />
            <h1 className="text-lg font-semibold px-3">Cooling Fan</h1>
            <p className="text-gray-600 px-3 text-sm">4 Items</p>
          </div>
        </Link>

        {/* <div className="flex flex-col bg-white rounded-lg shadow-md pb-4">
          <img
            src="/images/watch_3.png"
            alt="Shop Categories"
            className="w-full h-60 object-cover rounded-t-lg mb-6"
          />
          <h1 className="text-lg font-semibold px-3">Accessories</h1>
          <p className="text-gray-600 px-3 text-sm">89 Items</p>
        </div> */}
      </div>
    </div>
  );
};

export default ShopCategoris;
