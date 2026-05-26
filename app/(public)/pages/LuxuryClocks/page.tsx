"use client";

import { useEffect, useState } from "react";
import { PiWatch } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/auth/AuthProvider";
import axiosSecure from "@/app/auth/axiosSecure";

interface Clocks {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const Page = () => {
  const { user } = useAuth();
  const [clocks, setClocks] = useState<Clocks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/products?category=clock");
        const data = await response.data;
        setClocks(data);
      } catch (error) {
        console.error("Error fetching clocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <MdOutlineKeyboardDoubleArrowLeft className="text-2xl text-gray-800 mb-8" />
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
            Luxury Clocks
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="inline-block">
                    <div className="w-12 h-12 border-4 border-[#2573E6] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600 mt-4">
                    Loading premium clocks...
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {clocks.map((clock) => (
                  <div
                    key={clock._id}
                    className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200"
                  >
                    <div className="relative rounded-t-xl sm:rounded-t-2xl w-full h-48 sm:h-72 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={clock.image}
                        alt={clock.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        priority={false}
                      />
                    </div>

                    <div className="px-4 sm:px-5 py-2 sm:py-2">
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                        {clock.name}
                      </h2>
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-bold text-[#2573E6]">
                          ${clock.price.toLocaleString()}
                        </span>
                      </div>
                      {user ? (
                        <Link
                          href={`/pages/ProductDetailsPage?id=${clock._id}&type=clocks`}
                        >
                          <button className="border mt-2 w-full text-[#2573E6] font-semibold py-2 sm:py-2 px-2 sm:px-2 rounded-lg text-sm sm:text-base active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
                            <FaShoppingCart className="text-base sm:text-lg" />
                            Add to Cart
                          </button>
                        </Link>
                      ) : (
                        <Link href="/login"></Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && clocks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 sm:p-8 rounded-xl sm:rounded-2xl mb-6">
                  <PiWatch className="text-5xl sm:text-6xl lg:text-7xl text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg sm:text-xl font-semibold">
                  No clocks available
                </p>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  Check back soon for new arrivals
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
