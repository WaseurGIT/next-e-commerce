"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface TrendingProducts {
  _id:string
  name: string;
  price: string;
  image: string;
  rating?: number;
}

const Trending = () => {

  const [trendingProducts, setTrendingProducts] = useState<TrendingProducts[]>([]);
  useEffect(()=>{
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/trendings");
        const data = await response.json();
        setTrendingProducts(data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };
    fetchTrendingProducts();
  },[])

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Trending Products
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {trendingProducts.map((product) => (
            <div
              key={product._id}
              className="relative flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-3 sm:p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl mb-4"
                />
              </div>

              <div className="flex-grow px-3 sm:px-4 pb-16 sm:pb-18">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-[#005AC2] font-semibold text-sm sm:text-base">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>

              <Link href={`/pages/ProductDetailsPage?id=${product._id}&type=trendings`}>
              <button className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 border border-gray-300 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors duration-200">
                Quick Add
              </button></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
