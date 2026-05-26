"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axiosSecure from "../auth/axiosSecure";

const ShopCategoris = () => {
  const [watchCounts, setWatchCounts] = useState(0);
  const [clockCounts, setClockCounts] = useState(0);
  const [fanCounts, setFanCounts] = useState(0);

  useEffect(()=>{
    const fetchCounts = async()=>{
      try {
        await axiosSecure.get("/products?category=watch").then(res=>setWatchCounts(res.data.length))
        await axiosSecure.get("/products?category=clock").then(res=>setClockCounts(res.data.length))
        await axiosSecure.get("/products?category=fan").then(res=>setFanCounts(res.data.length))
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }
    }
    fetchCounts()
  },[])

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
              src="https://i.ibb.co.com/C3bgdrSY/watch-1.png"
              alt="Shop Categories"
              className="w-full h-60 object-cover rounded-t-lg mb-6"
            />
            <h1 className="text-lg font-semibold px-3">Wrist Watches</h1>
            <p className="text-gray-600 px-3 text-sm">{watchCounts} Items</p>
          </div>
        </Link>

        <Link href="/pages/LuxuryClocks">
          <div className="flex flex-col bg-white rounded-lg shadow-md pb-4">
            <img
              src="https://i.ibb.co.com/xKxgndMm/watch-2.png"
              alt="Shop Categories"
              className="w-full h-60 object-cover rounded-t-lg mb-6"
            />
            <h1 className="text-lg font-semibold px-3">Luxury Clocks</h1>
            <p className="text-gray-600 px-3 text-sm">{clockCounts} Items</p>
          </div>
        </Link>

        <Link href="/pages/Fans">
          <div className="flex flex-col bg-white rounded-lg shadow-md pb-4">
            <img
              src="https://i.ibb.co.com/b4qnvVn/fan-1.png"
              alt="Shop Categories"
              className="w-full h-60 object-cover rounded-t-lg mb-6"
            />
            <h1 className="text-lg font-semibold px-3">Cooling Fan</h1>
            <p className="text-gray-600 px-3 text-sm">{fanCounts} Items</p>
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
