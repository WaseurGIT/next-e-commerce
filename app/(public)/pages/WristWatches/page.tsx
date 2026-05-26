"use client";

import { useEffect, useState } from "react";
import { PiWatch } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { getWatches } from "@/app/api/productsApi";
import { useAuth } from "@/app/auth/AuthProvider";

interface Watch {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const Page = () => {
  const { user } = useAuth();
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWatches();
        setWatches(data);
      } catch (error) {
        console.error("Error fetching watches:", error);
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
            Wrist Watches
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
                    Loading premium watches...
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {watches.map((watch) => (
                  <div
                    key={watch._id}
                    className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200"
                  >
                    <div className="relative rounded-t-xl sm:rounded-t-2xl w-full h-48 sm:h-72 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        priority={false}
                      />
                    </div>

                    <div className="px-4 sm:px-5 py-2 sm:py-2">
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                        {watch.name}
                      </h2>
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-bold text-[#2573E6]">
                          ${watch.price.toLocaleString()}
                        </span>
                      </div>
                      {user ? (
                        <Link
                          href={`/pages/ProductDetailsPage?id=${watch._id}&type=watches`}
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

            {!loading && watches.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 sm:p-8 rounded-xl sm:rounded-2xl mb-6">
                  <PiWatch className="text-5xl sm:text-6xl lg:text-7xl text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg sm:text-xl font-semibold">
                  No watches available
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
