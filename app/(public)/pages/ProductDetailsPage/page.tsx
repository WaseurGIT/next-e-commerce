"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import {
  getFans,
  getWatches,
  getClocks,
  getTrendings,
} from "@/app/api/productsApi";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
  description?: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = searchParams.get("id");
        const productType = searchParams.get("type");

        if (!productId || !productType) {
          setLoading(false);
          return;
        }

        let dataFile: Promise<Product[]>;

        switch (productType) {
          case "watches":
            dataFile = getWatches();
            break;
          case "clocks":
            dataFile = getClocks();
            break;
          case "fans":
            dataFile = getFans();
            break;
          case "trendings":
            dataFile = getTrendings();
            break;
          default:
            dataFile = getWatches();
        }

        const data = await dataFile;

        const foundProduct = data.find(
          (item: Product) => item._id === productId,
        );

        setProduct(foundProduct || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        userId: "123",
        productId: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.image,
        quantity: quantity,
      };

      const res = await axios.post("http://localhost:5000/carts", cartItem);
      alert("Product added to cart!");
      console.log("Added to cart:", res.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-[#2573E6] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link href="/">
            <button className="flex items-center gap-2 text-[#2573E6] font-semibold mb-8 hover:text-blue-700 transition">
              <MdOutlineKeyboardDoubleArrowLeft className="text-2xl" />
              Back to Home
            </button>
          </Link>
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl font-semibold">
              Product not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/">
          <button className="flex items-center gap-2 text-[#2573E6] font-semibold mb-8 hover:text-blue-700 transition">
            <MdOutlineKeyboardDoubleArrowLeft className="text-2xl" />
            Back to Home
          </button>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Left Side*/}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-64 sm:h-72 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-600 text-sm sm:text-base">
                    {product.rating || 4}
                  </span>
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-600 text-sm sm:text-base mb-2">
                    Price
                  </p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2573E6]">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                {/* Description */}
                {/* <div className="mb-6 sm:mb-8">
                  <p className="text-gray-600 text-sm sm:text-base mb-3">
                    {product.description ||
                      "Premium quality product with exceptional craftsmanship and attention to detail. Perfect for those who appreciate fine design and durability."}
                  </p>
                </div> */}

                <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-600 text-sm sm:text-base mb-3">
                    Quantity
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                    >
                      −
                    </button>
                    <span className="text-xl font-semibold text-gray-800 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-[#2573E6] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaShoppingCart className="text-lg sm:text-xl" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
